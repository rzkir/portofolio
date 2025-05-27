"use client"

import React, { useState, useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'

import { ChevronRight } from "lucide-react"

import { Input } from '@/components/ui/input'

import { toast } from 'sonner'

import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Achievement {
    _id?: string;
    imageUrl: string;
    title: string;
}

export default function AchievementLayout() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<Achievement>({
        imageUrl: '',
        title: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const getFilterOptions = () => {
        const options = new Set(achievements.map(achievement => {
            const parts = achievement.title.split(' - ');
            return parts[0].trim(); // Get the part before the hyphen
        }));
        return Array.from(options).sort();
    };

    const filteredAchievements = achievements.filter(achievement => {
        if (selectedFilter === 'all') return true;
        const parts = achievement.title.split(' - ');
        return parts[0].trim() === selectedFilter;
    });

    const totalPages = Math.ceil(filteredAchievements.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAchievements = filteredAchievements.slice(startIndex, endIndex);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/achievements');
            const data = await response.json();
            setAchievements(data);
        } catch (error) {
            toast.error('Failed to fetch achievements');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();

            // Get file name without extension and format it
            const fileName = file.name.split('.')[0];
            const formattedTitle = fileName
                .split(/[-_]/) // Split by hyphen or underscore
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
                .join(' '); // Join with spaces

            setFormData(prev => ({
                ...prev,
                imageUrl: data.url,
                title: formattedTitle
            }));
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `/api/achievements?id=${formData._id}` : '/api/achievements';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save data');
            }

            const result = await response.json();
            console.log('Server response:', result);

            toast.success(isEditing ? 'Achievement updated successfully' : 'Achievement created successfully');
            setIsEditing(false);
            setIsDialogOpen(false);
            setFormData({
                imageUrl: '',
                title: ''
            });
            fetchAchievements();
        } catch (error) {
            console.error('Submit error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to save achievement');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setIsDeleting(true);
            const response = await fetch(`/api/achievements?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete achievement');

            toast.success('Achievement deleted successfully');
            fetchAchievements();
            setIsDeleteDialogOpen(false);
            setDeleteId(null);
        } catch (error) {
            toast.error('Failed to delete achievement');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEdit = (data: Achievement) => {
        setFormData(data);
        setIsEditing(true);
    };

    const openDeleteDialog = (id: string) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    return (
        <section className="p-4 sm:p-8 bg-muted/30 rounded-2xl">
            <div className='flex flex-col gap-8'>
                {/* Header Section */}
                <div className='flex flex-col gap-4 p-4 sm:p-8 border rounded-2xl border-border bg-card shadow-sm'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                                Achievement
                            </h3>

                            <ol className='flex flex-wrap gap-2 items-center text-sm text-muted-foreground'>
                                <li className='flex items-center hover:text-primary transition-colors'>
                                    <span>Dashboard</span>
                                    <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                                </li>
                                <li className='flex items-center hover:text-primary transition-colors'>
                                    <span>Pages</span>
                                    <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                                </li>
                                <li className='flex items-center text-primary font-medium'>
                                    <span>Achievement</span>
                                </li>
                            </ol>
                        </div>

                        <Button
                            variant="default"
                            className="px-8 py-3 font-medium shadow-sm hover:shadow-md transition-all bg-primary hover:bg-primary/90"
                            onClick={() => {
                                setIsEditing(false);
                                setIsDialogOpen(true);
                            }}
                        >
                            Create Content
                        </Button>
                    </div>

                    {/* Filter Section */}
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-border'>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium text-muted-foreground'>Filter by:</span>
                            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                                <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Achievements</SelectItem>
                                    {getFilterOptions().map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="p-4 sm:p-6 border rounded-xl bg-card shadow-sm">
                                <div className="flex flex-col gap-4 sm:gap-6">
                                    <Skeleton className="w-full h-48 rounded-xl" />
                                    <div className="flex-1">
                                        <div className="flex flex-col justify-between items-start gap-4">
                                            <div className="space-y-3 w-full">
                                                <Skeleton className="h-7 w-40" />
                                            </div>
                                            <div className="flex gap-3 w-full">
                                                <Skeleton className="h-10 flex-1" />
                                                <Skeleton className="h-10 flex-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : achievements.length === 0 ? (
                        <div className="col-span-full p-8 text-center border rounded-xl bg-card shadow-sm">
                            <div className="flex flex-col items-center gap-4">
                                <svg
                                    className="w-16 h-16 text-muted-foreground/50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                    <path d="M4 22h16" />
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Achievements Found</h3>
                                <p className="text-muted-foreground">Start by creating your first achievement using the "Create Content" button above.</p>
                            </div>
                        </div>
                    ) : (
                        currentAchievements.map((achievement) => (
                            <div key={achievement._id} className="p-4 sm:p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
                                <div className="flex flex-col gap-4 sm:gap-6">
                                    <div className="relative w-full h-64 sm:h-72 flex-shrink-0">
                                        {achievement.imageUrl ? (
                                            <Image
                                                src={achievement.imageUrl}
                                                alt={achievement.title}
                                                fill
                                                className="object-cover rounded-xl shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                                                <span className="text-muted-foreground text-sm">No image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col justify-between items-start gap-4">
                                            <div className="space-y-2 w-full">
                                                <h4 className="text-lg sm:text-xl font-bold">{achievement.title}</h4>
                                            </div>
                                            <div className="flex gap-3 w-full">
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    onClick={() => {
                                                        handleEdit(achievement);
                                                        setIsDialogOpen(true);
                                                    }}
                                                    className="flex-1"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="lg"
                                                    onClick={() => achievement._id && openDeleteDialog(achievement._id)}
                                                    className="flex-1"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Section */}
                {!isLoading && achievements.length > 0 && (
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <div className="w-full flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4"
                                >
                                    Previous
                                </Button>
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            onClick={() => setCurrentPage(page)}
                                            className="w-10 h-10"
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] p-4 sm:p-6">
                    <DialogHeader className="mb-4 sm:mb-6">
                        <DialogTitle className="text-xl sm:text-2xl font-bold">{isEditing ? 'Edit Achievement' : 'Create Achievement'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                <div className="relative w-full h-64 sm:h-72">
                                    {formData.imageUrl ? (
                                        <Image
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            fill
                                            className="object-cover rounded-xl shadow-sm"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border relative">
                                            <span className="text-muted-foreground text-sm">No image</span>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={isUploading}
                                                className="absolute inset-0 m-auto w-fit h-fit px-6 py-3 border-2 border-dashed hover:border-primary/50 transition-colors"
                                            >
                                                {isUploading ? 'Uploading...' : 'Upload Image'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {!formData.imageUrl && (
                                    <div className="flex-1">
                                    </div>
                                )}
                            </div>
                            <Input
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="h-12"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-lg sm:text-xl font-bold">Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-muted-foreground">Are you sure you want to delete this achievement?</p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setDeleteId(null);
                            }}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteId && handleDelete(deleteId)}
                            className="px-6"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
