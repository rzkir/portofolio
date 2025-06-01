"use client"

import React, { useState, useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'

import { ChevronRight } from "lucide-react"

import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'

import { toast } from 'sonner'

import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface AboutData {
    _id?: string;
    card: {
        imageUrl: string;
        name: string;
        work: string;
        location: string;
        status: string;
    };
    description: string;
}

export default function AboutLayout() {
    const [aboutData, setAboutData] = useState<AboutData[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<AboutData>({
        card: {
            imageUrl: '',
            name: '',
            work: '',
            location: '',
            status: ''
        },
        description: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAboutData();
    }, []);

    const fetchAboutData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/about');
            const data = await response.json();
            setAboutData(data);
        } catch (error) {
            toast.error('Failed to fetch data');
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

            const response = await fetch('/api/about/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            setFormData(prev => ({
                ...prev,
                card: {
                    ...prev.card,
                    imageUrl: data.url
                }
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
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `/api/about?id=${formData._id}` : '/api/about';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to save data');

            toast.success(isEditing ? 'Data updated successfully' : 'Data created successfully');
            setIsEditing(false);
            setIsDialogOpen(false);
            setFormData({
                card: {
                    imageUrl: '',
                    name: '',
                    work: '',
                    location: '',
                    status: ''
                },
                description: ''
            });
            fetchAboutData();
        } catch (error) {
            toast.error('Failed to save data');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/about?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete data');

            toast.success('Data deleted successfully');
            fetchAboutData();
            setIsDeleteDialogOpen(false);
            setDeleteId(null);
        } catch (error) {
            toast.error('Failed to delete data');
        }
    };

    const handleEdit = (data: AboutData) => {
        setFormData(data);
        setIsEditing(true);
    };

    const openDeleteDialog = (id: string) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    return (
        <section className="p-4 sm:p-8 bg-muted/30 rounded-2xl" id="about">
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-8 border rounded-2xl border-border bg-card shadow-sm mb-8 gap-4 sm:gap-0'>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                        About
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
                            <span>About</span>
                        </li>
                    </ol>
                </div>

                {aboutData.length === 0 && (
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
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] p-4 sm:p-6">
                    <DialogHeader className="mb-4 sm:mb-6">
                        <DialogTitle className="text-xl sm:text-2xl font-bold">{isEditing ? 'Edit Content' : 'Create Content'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                <div className="relative w-full sm:w-32 h-32">
                                    {formData.card.imageUrl ? (
                                        <Image
                                            src={formData.card.imageUrl}
                                            alt="Preview"
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
                                        className="w-full py-6 border-2 border-dashed hover:border-primary/50 transition-colors"
                                    >
                                        {isUploading ? 'Uploading...' : 'Upload Image'}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <Input
                                    placeholder="Name"
                                    value={formData.card.name}
                                    onChange={(e) => setFormData({ ...formData, card: { ...formData.card, name: e.target.value } })}
                                    className="h-12"
                                />
                                <Input
                                    placeholder="Work"
                                    value={formData.card.work}
                                    onChange={(e) => setFormData({ ...formData, card: { ...formData.card, work: e.target.value } })}
                                    className="h-12"
                                />
                                <Input
                                    placeholder="Location"
                                    value={formData.card.location}
                                    onChange={(e) => setFormData({ ...formData, card: { ...formData.card, location: e.target.value } })}
                                    className="h-12"
                                />
                                <Input
                                    placeholder="Status"
                                    value={formData.card.status}
                                    onChange={(e) => setFormData({ ...formData, card: { ...formData.card, status: e.target.value } })}
                                    className="h-12"
                                />
                            </div>
                        </div>
                        <Textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="min-h-[150px] resize-none"
                        />
                        <Button type="submit" className="w-full h-12 text-base font-medium">
                            {isEditing ? 'Update' : 'Create'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-lg sm:text-xl font-bold">Konfirmasi Hapus</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-muted-foreground">Apakah Anda yakin ingin menghapus konten ini?</p>
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
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteId && handleDelete(deleteId)}
                            className="px-6"
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="mt-8 space-y-4 sm:space-y-6">
                {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="p-4 sm:p-6 border rounded-xl bg-card shadow-sm">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <Skeleton className="w-full sm:w-32 h-32 rounded-xl" />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                                        <div className="space-y-3 w-full sm:w-auto">
                                            <Skeleton className="h-7 w-40" />
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-5 w-36" />
                                            <Skeleton className="h-5 w-28" />
                                            <Skeleton className="h-20 w-full mt-4" />
                                        </div>
                                        <div className="space-x-3">
                                            <Skeleton className="h-10 w-20" />
                                            <Skeleton className="h-10 w-20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    aboutData.map((data) => (
                        <div key={data._id} className="p-4 sm:p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                                    {data.card.imageUrl ? (
                                        <Image
                                            src={data.card.imageUrl}
                                            alt={data.card.name}
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
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                                        <div className="space-y-2 w-full sm:w-auto">
                                            <h4 className="text-lg sm:text-xl font-bold">{data.card.name}</h4>
                                            <p className="text-sm sm:text-base text-muted-foreground">{data.card.work}</p>
                                            <p className="text-sm sm:text-base text-muted-foreground">{data.card.location}</p>
                                            <p className="text-sm sm:text-base text-muted-foreground">{data.card.status}</p>
                                            <p className="mt-4 text-sm sm:text-base text-muted-foreground">{data.description}</p>
                                        </div>
                                        <div className="flex flex-row sm:flex-row gap-3 w-full sm:w-auto">
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                onClick={() => {
                                                    handleEdit(data);
                                                    setIsDialogOpen(true);
                                                }}
                                                className="flex-1 sm:flex-none px-4 sm:px-6"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="lg"
                                                onClick={() => data._id && openDeleteDialog(data._id)}
                                                className="flex-1 sm:flex-none px-4 sm:px-6"
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
        </section>
    )
}
