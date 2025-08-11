"use client"

import React, { useCallback } from 'react'

import { ProjectsContentProps } from "@/types/projects";

import Image from 'next/image';

import Link from 'next/link';

import { Card, CardTitle, CardDescription } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { useRouter } from 'next/navigation';

import { useLoading } from '@/context/LoadingContext';
interface ProjectsLayoutProps {
    slug: string;
    productsData: ProjectsContentProps;
    allProjects: ProjectsContentProps[];
}

export default function ProjectsLayout({ productsData, allProjects }: ProjectsLayoutProps) {
    const router = useRouter();
    const { showLoading, hideLoading } = useLoading();

    const handleProjectNavigation = useCallback(async (slug: string) => {
        try {
            showLoading("Navigating to project...");
            // Simulate a small delay for better UX
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push(`/${slug}`);
            // Hide loading after a short delay to ensure navigation has started
            setTimeout(() => {
                hideLoading();
            }, 1000);
        } catch (error) {
            hideLoading();
            console.error("Navigation error:", error);
        }
    }, [router, showLoading, hideLoading]);

    return (
        <section className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
            {/* Hero Section */}
            <div className="container px-4 py-4">
                <div className="group mb-8 sm:mb-12">
                    <Card className="relative overflow-hidden border-border/50 transition-all duration-500 hover:border-primary/50 p-0 hover:bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl sm:rounded-3xl">
                        <div className="relative aspect-[16/9] md:aspect-[19/9] w-full overflow-hidden">
                            <Image
                                src={productsData.thumbnail}
                                alt={productsData.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <div className="max-w-4xl">
                                    <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6 text-card-foreground drop-shadow-lg">
                                        {productsData.title}
                                    </CardTitle>
                                    <CardDescription className="text-base sm:text-lg md:text-xl lg:text-2xl line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6 md:mb-8 max-w-3xl text-card-foreground/90 drop-shadow-md">
                                        {productsData.description}
                                    </CardDescription>
                                    <div className="flex flex-wrap gap-3 sm:gap-4">
                                        {productsData.previewLink && (
                                            <Button
                                                variant="secondary"
                                                size="lg"
                                                className="gap-2 sm:gap-3 bg-primary/20 hover:bg-primary/30 text-primary-foreground border-0 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl"
                                                asChild
                                            >
                                                <Link href={productsData.previewLink} rel="noopener noreferrer">
                                                    View Project
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {productsData.frameworks && productsData.frameworks.length > 0 && (
                    <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            {productsData.frameworks.map((framework, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-2 px-4 py-2 h-auto cursor-pointer 
                                    bg-secondary/80 hover:bg-secondary
                                    text-secondary-foreground
                                    shadow-[0_4px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_0_rgb(0,0,0,0.1)]
                                    active:shadow-[0_2px_0_rgb(0,0,0,0.1)] active:translate-y-[2px]
                                    transition-all duration-200 ease-out
                                    border border-border/50
                                    rounded-lg hover:border-primary/50"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src={framework.imageUrl}
                                            alt={framework.title}
                                            fill
                                            className="object-contain drop-shadow-sm"
                                            sizes="(max-width: 768px) 24px, 24px"
                                        />
                                    </div>
                                    <span className="text-sm font-medium drop-shadow-sm">
                                        {framework.title}
                                    </span>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="space-y-8 sm:space-y-12">
                            {productsData.imageUrl && productsData.imageUrl.length > 0 && (
                                <div className="space-y-6 sm:space-y-8">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Project Gallery</h2>
                                    <div className="flex overflow-x-auto gap-4 sm:gap-6 lg:grid lg:grid-cols-2 lg:overflow-visible">
                                        {productsData.imageUrl.map((image, index) => (
                                            <div key={index} className="group relative aspect-video w-[280px] sm:w-[400px] lg:w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/50 flex-shrink-0">
                                                <Image
                                                    src={image}
                                                    alt={`${productsData.title} - Image ${index + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="prose prose-lg max-w-none">
                                <div>
                                    <div dangerouslySetInnerHTML={{ __html: productsData.content }} className="prose prose-invert max-w-none text-sm md:text-base
                                            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3 md:[&_p]:mb-4 [&_p:last-child]:mb-0 
                                            [&_span]:text-muted-foreground [&_span]:leading-relaxed
                                            [&_strong]:text-foreground [&_strong]:font-semibold
                                            [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-4 md:[&_h3]:mt-6 [&_h3]:mb-3 md:[&_h3]:mb-4
                                            [&_ol]:list-decimal [&_ol]:pl-4 md:[&_ol]:pl-6 [&_ol]:space-y-1.5 md:[&_ol]:space-y-2 [&_ol]:mb-3 md:[&_ol]:mb-4
                                            [&_li]:text-muted-foreground [&_li]:leading-relaxed
                                            [&_.ql-ui]:hidden
                                            prose-headings:text-foreground
                                            prose-strong:text-foreground
                                            prose-p:text-muted-foreground
                                            prose-li:text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 sm:top-8">
                            {/* Related Projects */}
                            {allProjects.length > 0 && (
                                <div className="space-y-6 sm:space-y-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Other Projects</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                        {allProjects
                                            .filter(project => project.slug !== productsData.slug)
                                            .sort((a, b) => {
                                                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                                                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                                                return dateB - dateA;
                                            })
                                            .slice(0, 6)
                                            .map((project, index) => (
                                                <div key={index} className="group block">
                                                    <div
                                                        className="block h-full cursor-pointer"
                                                        onClick={() => handleProjectNavigation(project.slug)}
                                                    >
                                                        <Card className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 p-0 border-border/50 hover:border-primary/50 bg-card">
                                                            <div className="relative aspect-video w-full overflow-hidden">
                                                                <Image
                                                                    src={project.thumbnail}
                                                                    alt={project.title}
                                                                    fill
                                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                            </div>
                                                            <div className="p-3 sm:p-4 bg-card h-full flex flex-col">
                                                                <CardTitle className="text-sm sm:text-base font-bold text-card-foreground group-hover:text-primary transition-colors mb-1 sm:mb-2 line-clamp-1">
                                                                    {project.title}
                                                                </CardTitle>
                                                                <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-auto line-clamp-2">
                                                                    {project.description}
                                                                </CardDescription>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
