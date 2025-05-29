"use client"

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Upload, X, FileText, Link, Tag, Image as ImageIcon, Code, List } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"

import { toast } from "sonner"

import QuillEditor from '@/base/helper/QuillEditor'

import { cn } from "@/lib/utils"

interface Framework {
    title: string;
    imageUrl: string;
}

interface Youtube {
    _id?: string;
    title: string;
    href: string;
    description: string;
    content: string;
    category: string;
    thumbnail: string;
    frameworks: Framework[];
}

interface ModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    isEditing: boolean;
    formData: Youtube;
    setFormData: React.Dispatch<React.SetStateAction<Youtube>>;
    categories: string[];
    frameworks: Framework[];
    onSubmit: (e: React.FormEvent) => Promise<void>;
    isUploading: boolean;
    isSubmitting: boolean;
}

export default function Modal({
    isOpen,
    onOpenChange,
    isEditing,
    formData,
    setFormData,
    categories,
    frameworks,
    onSubmit,
    isUploading,
    isSubmitting
}: ModalProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            category: value
        }));
    };

    const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/youtube/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload thumbnail');
            }

            const data = await response.json();
            setFormData(prev => ({
                ...prev,
                thumbnail: data.url
            }));
            toast.success('Thumbnail uploaded successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to upload thumbnail');
        }
    };

    const handleFrameworkChange = (framework: Framework) => {
        setFormData(prev => {
            const isSelected = prev.frameworks.some(f => f.title === framework.title);
            if (isSelected) {
                return {
                    ...prev,
                    frameworks: prev.frameworks.filter(f => f.title !== framework.title)
                };
            } else {
                return {
                    ...prev,
                    frameworks: [...prev.frameworks, framework]
                };
            }
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file || !file.type.startsWith('image/')) {
            toast.error('Please drop an image file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/youtube/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload thumbnail');
            }

            const data = await response.json();
            setFormData(prev => ({
                ...prev,
                thumbnail: data.url
            }));
            toast.success('Thumbnail uploaded successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to upload thumbnail');
        }
    };

    const handleRemoveThumbnail = () => {
        setFormData(prev => ({
            ...prev,
            thumbnail: ''
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        {isEditing ? 'Edit' : 'Create'} YouTube Content
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        {isEditing ? 'Update' : 'Fill in'} the details below to {isEditing ? 'update' : 'create new'} YouTube content
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-6 overflow-y-auto pr-2 py-4">
                    {/* Left Column - Basic Information */}
                    <div className='space-y-6'>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
                                <FileText className="w-5 h-5 text-primary" />
                                <h3>Basic Information</h3>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                        Title
                                    </Label>

                                    <Input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter content title"
                                        required
                                        className="w-full transition-colors focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="href" className="text-sm font-medium flex items-center gap-2">
                                        <Link className="w-4 h-4 text-muted-foreground" />
                                        Video URL
                                    </Label>
                                    <Input
                                        id="href"
                                        name="href"
                                        value={formData.href}
                                        onChange={handleChange}
                                        placeholder="Enter YouTube video URL"
                                        required
                                        className="w-full transition-colors focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-muted-foreground" />
                                        Category
                                    </Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={handleCategoryChange}
                                        required
                                    >
                                        <SelectTrigger className="w-full transition-colors focus:ring-2 focus:ring-primary/20">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category, index) => (
                                                <SelectItem key={`${category}-${index}`} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
                                <Code className="w-5 h-5 text-primary" />
                                <h3>Content Details</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter content description"
                                        required
                                        className="min-h-[100px] transition-colors focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-sm font-medium flex items-center gap-2">
                                        <Code className="w-4 h-4 text-muted-foreground" />
                                        Content
                                    </Label>
                                    <QuillEditor
                                        value={formData.content}
                                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                        placeholder="Enter content details"
                                        height="200px"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <List className="w-4 h-4 text-muted-foreground" />
                                Frameworks
                            </Label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border rounded-lg bg-muted/50">
                                {frameworks.map((framework) => (
                                    <div
                                        key={framework.title}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={framework.title}
                                            checked={formData.frameworks.some(f => f.title === framework.title)}
                                            onChange={() => handleFrameworkChange(framework)}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary transition-colors"
                                        />
                                        <label
                                            htmlFor={framework.title}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {framework.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {formData.frameworks.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.frameworks.map((framework) => (
                                        <Badge
                                            key={framework.title}
                                            variant="secondary"
                                            className="flex items-center gap-1 hover:bg-primary/10 transition-colors"
                                        >
                                            {framework.title}
                                            <button
                                                type="button"
                                                onClick={() => handleFrameworkChange(framework)}
                                                className="ml-1 hover:text-destructive transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Media */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
                                <ImageIcon className="w-5 h-5 text-primary" />
                                <h3>Thumbnail</h3>
                            </div>

                            <div className="space-y-2">
                                {formData.thumbnail ? (
                                    <div className="relative group">
                                        <div className="border rounded-lg overflow-hidden">
                                            <img
                                                src={formData.thumbnail}
                                                alt="Thumbnail preview"
                                                className="w-full h-32 object-cover"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={handleRemoveThumbnail}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div
                                        className={cn(
                                            "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                                            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                                            "relative"
                                        )}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <Input
                                            id="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleThumbnailUpload}
                                            className="hidden"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="w-8 h-8 text-muted-foreground" />
                                            <div className="text-sm text-muted-foreground">
                                                <p>Drag and drop your image here, or</p>
                                                <Button
                                                    type="button"
                                                    variant="link"
                                                    onClick={() => document.getElementById('thumbnail')?.click()}
                                                    disabled={isUploading}
                                                    className="text-primary hover:text-primary/80"
                                                >
                                                    browse
                                                </Button>
                                            </div>
                                            {isUploading && (
                                                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Uploading...</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="border-t pt-4 mt-6">
                        <Button
                            type="submit"
                            disabled={isUploading || isSubmitting}
                            className="w-full sm:w-auto hover:scale-105 transition-all duration-300"
                        >
                            {isSubmitting ? `${isEditing ? 'Updating' : 'Creating'}...` : `${isEditing ? 'Update' : 'Create'} Content`}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
