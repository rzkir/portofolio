"use client"

import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { ChevronRight, Pencil, Trash2, FileQuestion, ArrowRight } from "lucide-react"

import { HomeContent } from './types/home'

import { toast } from 'sonner'

import { HomeSkeleton } from "@/hooks/dashboard/pages/home/HomeSkeleton"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'

export default function HomeLayout() {
    const [contents, setContents] = useState<HomeContent[]>([])
    const [selectedContent, setSelectedContent] = useState<HomeContent | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState<HomeContent>({
        title: '',
        description: '',
        span: '',
        label: '',
        href: '',
        text: ''
    })

    // Fetch contents on component mount
    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/home', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
                },
            });
            const data = await response.json();
            setContents(data);
        } catch (error) {
            toast.error('Failed to fetch contents');
        } finally {
            setIsLoading(false)
        }
    };

    const handleCreate = () => {
        setSelectedContent(null)
        setFormData({
            title: '',
            description: '',
            span: '',
            label: '',
            href: '',
            text: ''
        })
        setIsOpen(true)
    }

    const handleEdit = (content: HomeContent) => {
        setSelectedContent(content)
        setFormData(content)
        setIsOpen(true)
    }

    const handleDelete = (content: HomeContent) => {
        setSelectedContent(content)
        setIsDeleteOpen(true)
    }

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            if (selectedContent) {
                // Update content
                const response = await fetch('/api/home', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
                    },
                    body: JSON.stringify({
                        id: selectedContent._id,
                        ...formData
                    }),
                });

                if (!response.ok) throw new Error('Failed to update content');
                toast.success('Content updated successfully');
            } else {
                // Create content
                const response = await fetch('/api/home', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error('Failed to create content');
                toast.success('Content created successfully');
            }
            setIsOpen(false);
            fetchContents(); // Refresh the list
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteConfirm = async () => {
        try {
            setIsSubmitting(true)
            if (selectedContent?._id) {
                const response = await fetch(`/api/home?id=${selectedContent._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to delete content');

                toast.success('Content deleted successfully');
                setIsDeleteOpen(false);
                fetchContents(); // Refresh the list
            }
        } catch (error) {
            toast.error('Failed to delete content');
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="p-4 sm:p-6 bg-muted/30 rounded-2xl">
            <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border rounded-2xl border-border bg-card shadow-sm gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-2 sm:gap-3'>
                        <h3 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                            Home Sections
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
                                <span>Home</span>
                            </li>
                        </ol>
                    </div>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="px-6 py-2.5 font-medium shadow-sm hover:shadow-md transition-all"
                                onClick={handleCreate}
                            >
                                Add Section
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedContent ? 'Edit Section' : 'Add New Section'}
                                </DialogTitle>
                                <DialogDescription>
                                    {selectedContent
                                        ? 'Update the details below to modify this section.'
                                        : 'Fill in the details below to create a new section for your home page.'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="grid gap-2">
                                    <label htmlFor="title">Title</label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="span">Span</label>
                                    <Input
                                        id="span"
                                        value={formData.span}
                                        onChange={(e) => setFormData({ ...formData, span: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="label">Label</label>
                                    <Input
                                        id="label"
                                        value={formData.label}
                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="href">Href</label>
                                    <Input
                                        id="href"
                                        value={formData.href}
                                        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2 col-span-2">
                                    <label htmlFor="text">Text</label>
                                    <Input
                                        id="text"
                                        value={formData.text}
                                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2 col-span-2">
                                    <label htmlFor="description">Description</label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full px-6 py-2.5 font-medium shadow-sm hover:shadow-md transition-all"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                {selectedContent ? 'Updating...' : 'Creating...'}
                                            </div>
                                        ) : (
                                            selectedContent ? 'Update' : 'Create'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Delete Modal */}
                <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Section</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this section? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Deleting...
                                    </div>
                                ) : (
                                    'Delete'
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Sections List */}
                <div className='p-4 sm:p-6 border rounded-2xl border-border bg-card shadow-sm'>
                    {isLoading ? (
                        <HomeSkeleton />
                    ) : contents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                            <FileQuestion className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">No Sections Found</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4">Start by adding your first section using the button above.</p>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {contents.map((section) => (
                                <div
                                    key={section._id}
                                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-8 p-4 sm:p-8 rounded-2xl shadow-lg"
                                >
                                    {/* Kiri: Headline */}
                                    <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                                        <div className="text-xl sm:text-2xl font-extrabold leading-tight">
                                            {section.title}
                                        </div>

                                        <div className='block text-3xl sm:text-5xl font-extrabold leading-tight'>
                                            <span className='mr-2'>{section.text}</span>
                                            <span className="text-gray-400">{section.span}</span>
                                        </div>

                                        <div className="mt-4 sm:mt-6">
                                            <Button
                                                className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold shadow-md"
                                            >
                                                {section.label} <ArrowRight className='w-4 h-4 ml-1' />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Kanan: Deskripsi */}
                                    <div className="flex-1 mt-4 md:mt-0">
                                        <p className="text-base sm:text-lg text-gray-500">{section.description}</p>
                                        <div className="flex gap-2 mt-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(section)}
                                            >
                                                <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(section)}
                                            >
                                                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
