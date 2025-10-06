"use client"

import React from 'react'

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlesSkeleton() {
    return (
        <section className='py-4 sm:py-6 md:py-8 lg:py-10'>
            <div className="container px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-10 md:space-y-12">
                {/* Hero Image Section Skeleton */}
                <div className='relative aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl'>
                    <Skeleton className="absolute inset-0" />
                </div>

                {/* Article Header Skeleton */}
                <div className='space-y-4 sm:space-y-6'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <span className='hidden sm:inline'>•</span>
                        <Skeleton className="h-4 w-32" />
                    </div>

                    <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-full max-w-4xl" />
                </div>

                {/* Article Content Skeleton */}
                <div className='space-y-4 sm:space-y-6'>
                    {/* Paragraph skeletons */}
                    <div className="space-y-3 sm:space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>

                    {/* Heading skeleton */}
                    <Skeleton className="h-6 sm:h-7 md:h-8 w-2/3 mt-6 sm:mt-8" />

                    {/* More paragraph skeletons */}
                    <div className="space-y-3 sm:space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>

                    {/* Another heading skeleton */}
                    <Skeleton className="h-5 sm:h-6 md:h-7 w-1/2 mt-6 sm:mt-8" />

                    {/* More content skeletons */}
                    <div className="space-y-3 sm:space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                    </div>

                    {/* Code block skeleton */}
                    <div className="bg-muted border border-border rounded-lg p-3 sm:p-4">
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    {/* More content */}
                    <div className="space-y-3 sm:space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                </div>

                {/* Related Articles Section Skeleton */}
                <div className='space-y-6 sm:space-y-8'>
                    <div className='border-t border-border pt-6 sm:pt-8'>
                        <Skeleton className="h-6 sm:h-7 md:h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-80" />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                        {[1, 2, 3].map((_, index) => (
                            <Card key={index} className='relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 p-0'>
                                <CardContent className='relative aspect-[16/9] overflow-hidden p-0'>
                                    <Skeleton className="absolute inset-0" />
                                    <div className='absolute top-2 sm:top-3 left-2 sm:left-3'>
                                        <Skeleton className="h-5 w-16 rounded-md" />
                                    </div>
                                </CardContent>

                                <CardHeader className='p-3 sm:p-4 -mt-4 sm:-mt-5 space-y-2'>
                                    <Skeleton className="h-4 sm:h-5 w-3/4" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 sm:h-4 w-full" />
                                        <Skeleton className="h-3 sm:h-4 w-5/6" />
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
