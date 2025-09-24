import React from 'react'

import Image from 'next/image'

import { Code, ExternalLink, Calendar } from "lucide-react"

import { format } from "date-fns"

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function Preview({ previewProject, setPreviewProject }: PreviewProps) {
    return (
        <Dialog open={!!previewProject} onOpenChange={() => setPreviewProject(null)}>
            <DialogContent className="sm:max-w-7xl max-h-[100vh] md:max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-b from-background to-background/95 backdrop-blur-sm p-4 sm:p-6">
                {previewProject && (
                    <>
                        <DialogHeader className="border-b border-border/50 pb-3 sm:pb-4">
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <div className="space-y-1">
                                    <DialogTitle className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient">
                                        {previewProject.title}
                                    </DialogTitle>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-mono text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                                        {previewProject.category}
                                    </span>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="space-y-6 sm:space-y-8 overflow-y-auto pr-1 sm:pr-2 py-4 sm:py-6">
                            {/* Thumbnail with Gradient Overlay */}
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl group">
                                <Image
                                    src={previewProject.thumbnail}
                                    alt={previewProject.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Additional Images Grid */}
                            <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-x-visible gap-3 sm:gap-4 pb-2 sm:pb-4 lg:pb-0 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                                {previewProject.imageUrl.map((image, index) => (
                                    <div key={index} className="relative aspect-video min-w-[280px] sm:min-w-[320px] lg:min-w-0 overflow-hidden rounded-lg sm:rounded-xl group flex-shrink-0 lg:flex-shrink">
                                        <Image
                                            src={image}
                                            alt={`${previewProject.title} - Image ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                ))}
                            </div>

                            {/* Project Details */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Description moved here */}
                                <DialogDescription className="text-sm sm:text-base text-muted-foreground/80">
                                    {previewProject.description}
                                </DialogDescription>

                                {/* Frameworks Section */}
                                <div className="space-y-3 sm:space-y-4">
                                    <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                                        <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        Frameworks & Technologies
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                                        {previewProject.frameworks.map((framework, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-200"
                                            >
                                                <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-primary/10">
                                                    <Image
                                                        src={framework.imageUrl}
                                                        alt={framework.title}
                                                        fill
                                                        className="object-contain p-1 sm:p-1.5"
                                                    />
                                                </div>
                                                <span className="text-xs sm:text-sm font-medium truncate">{framework.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Dates Section */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
                                    {previewProject.createdAt && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary/50" />
                                            <p>Created: {format(new Date(previewProject.createdAt), "d MMMM yyyy 'at' HH:mm")}</p>
                                        </div>
                                    )}
                                    {previewProject.updatedAt && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary/50" />
                                            <p>Updated: {format(new Date(previewProject.updatedAt), "d MMMM yyyy 'at' HH:mm")}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-3 sm:pt-4 border-t border-border/50">
                                <Button
                                    variant="secondary"
                                    className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                                    asChild
                                >
                                    <a href={previewProject.previewLink} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Live Demo
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
