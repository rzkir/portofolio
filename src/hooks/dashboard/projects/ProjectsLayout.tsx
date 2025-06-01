"use client"

import React, { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'

import { ChevronRight, FileText, Link } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

import Image from "next/image"

import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"

import Modal from './modal/Modal'

import Delete from './modal/Delete'

interface Framework {
    title: string;
    imageUrl: string;
}

interface projects {
    _id?: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    thumbnail: string;
    imageUrl: string[];
    frameworks: Framework[];
}

export default function ProjectsLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteContentId, setDeleteContentId] = useState<string | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>([]);
    const [frameworks, setFrameworks] = useState<Framework[]>([]);
    const [projectsContent, setProjectsContent] = useState<projects[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<projects>({
        _id: '',
        title: '',
        slug: '',
        description: '',
        content: '',
        category: '',
        thumbnail: '',
        imageUrl: [],
        frameworks: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch categories
                const categoriesResponse = await fetch('/api/projects/categories');
                if (!categoriesResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categoriesData = await categoriesResponse.json() as string[];
                const uniqueCategories = [...new Set(categoriesData)];
                setCategories(uniqueCategories);

                // Fetch frameworks
                const frameworksResponse = await fetch('/api/projects/frameworks');
                if (!frameworksResponse.ok) {
                    throw new Error('Failed to fetch frameworks');
                }
                const frameworksData = await frameworksResponse.json() as Framework[];
                setFrameworks(frameworksData);

                // Fetch Projects content
                const projectsResponse = await fetch('/api/projects');
                if (!projectsResponse.ok) {
                    throw new Error('Failed to fetch Projects content');
                }
                const projectsData = await projectsResponse.json() as projects[];
                setProjectsContent(projectsData);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (content: projects) => {
        setFormData({
            _id: content._id,
            title: content.title,
            slug: content.slug,
            description: content.description,
            content: content.content,
            category: content.category,
            thumbnail: content.thumbnail,
            imageUrl: content.imageUrl || [],
            frameworks: content.frameworks
        });
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = isEditing ? `/api/projects?id=${formData._id}` : '/api/projects';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...(isEditing && { id: formData._id }),
                    ...formData,
                    frameworks: formData.frameworks.map(framework => ({
                        title: framework.title,
                        imageUrl: framework.imageUrl
                    }))
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} content`);
            }

            const data = await response.json();

            if (isEditing) {
                setProjectsContent(prev =>
                    prev.map(content =>
                        content._id === data._id ? data : content
                    )
                );
            } else {
                setProjectsContent(prev => [...prev, data]);
            }

            toast.success(`Content ${isEditing ? 'updated' : 'created'} successfully`);

            // Reset form and close modal
            setFormData({
                _id: '',
                title: '',
                slug: '',
                description: '',
                content: '',
                category: '',
                thumbnail: '',
                imageUrl: [],
                frameworks: []
            });
            setIsEditing(false);
            setIsOpen(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : `Failed to ${isEditing ? 'update' : 'create'} content`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteClick = (id: string | undefined) => {
        setDeleteContentId(id);
        setIsDeleteOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteContentId) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/projects?id=${deleteContentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete content');
            }

            setProjectsContent(prev => prev.filter(content => content._id !== deleteContentId));
            toast.success('Content deleted successfully');
            setIsDeleteOpen(false);
            setDeleteContentId(undefined);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to delete content');
        } finally {
            setIsDeleting(false);
        }
    };

    const renderSkeletonCards = () => {
        return Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
                <div className="relative w-full h-48">
                    <Skeleton className="w-full h-full" />
                </div>
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-6 w-16" />
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2 border-t pt-4">
                    <Skeleton className="h-9 w-full" />
                </CardFooter>
            </Card>
        ));
    };

    return (
        <section className="p-4 md:p-6 bg-muted/30 rounded-2xl">
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 border rounded-2xl border-border bg-card shadow-sm gap-4'>
                <div className='flex flex-col gap-3'>
                    <h3 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                        Projects
                    </h3>

                    <ol className='flex gap-2 items-center text-sm text-muted-foreground'>
                        <li className='flex items-center hover:text-primary transition-colors'>
                            <span>Dashboard</span>
                            <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                        </li>
                        <li className='flex items-center text-primary font-medium'>
                            <span>Projects</span>
                        </li>
                    </ol>
                </div>

                <Button
                    variant="default"
                    className="w-full md:w-auto px-6 py-2.5 font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                    onClick={() => setIsOpen(true)}
                >
                    Create Content
                </Button>
            </div>

            {/* Project Content Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                {isLoading ? (
                    renderSkeletonCards()
                ) : projectsContent.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/50">
                        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Content Found</h3>
                        <p className="text-muted-foreground mb-4">There are no projects available at the moment.</p>
                        <Button
                            variant="default"
                            onClick={() => setIsOpen(true)}
                            className="hover:scale-105 transition-all duration-300"
                        >
                            Create Your First Project
                        </Button>
                    </div>
                ) : (
                    projectsContent.map((content) => (
                        <Card key={content._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                            <div className="relative w-full h-48 overflow-hidden">
                                {content.thumbnail ? (
                                    <Image
                                        src={content.thumbnail}
                                        alt={content.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        <span className="text-muted-foreground">No thumbnail</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <a
                                        href={`/projects/${content.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        <Link className="w-4 h-4" />
                                        <span className="text-sm font-medium">View Project</span>
                                    </a>
                                </div>
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary" className="hover:bg-primary/10 transition-colors">
                                        {content.category}
                                    </Badge>
                                </div>
                                <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{content.title}</CardTitle>
                                <CardDescription className="line-clamp-2">{content.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {content.frameworks.map((framework) => (
                                        <Badge
                                            key={framework.title}
                                            variant="outline"
                                            className="hover:bg-muted transition-colors"
                                        >
                                            {framework.title}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between gap-2 border-t pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(content)}
                                    className="flex-1 hover:bg-primary/10 transition-colors"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteClick(content._id)}
                                    className="flex-1 hover:bg-destructive/90 transition-colors"
                                >
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>

            {/* Form Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={(open) => {
                    setIsOpen(open);
                    if (!open) {
                        setIsEditing(false);
                        setFormData({
                            _id: '',
                            title: '',
                            slug: '',
                            description: '',
                            content: '',
                            category: '',
                            thumbnail: '',
                            imageUrl: [],
                            frameworks: []
                        });
                    }
                }}
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                frameworks={frameworks}
                onSubmit={handleSubmit}
                isUploading={isUploading}
                isSubmitting={isSubmitting}
            />

            {/* Delete Dialog */}
            <Delete
                isOpen={isDeleteOpen}
                onOpenChange={(open) => {
                    setIsDeleteOpen(open);
                    if (!open) {
                        setDeleteContentId(undefined);
                    }
                }}
                onDelete={handleDelete}
                isDeleting={isDeleting}
            />
        </section>
    );
}




