import React from 'react'

import { Skeleton } from "@/components/ui/skeleton"

import { Card } from '@/components/ui/card'

export default function ProjectsSkeleton() {
    return (
        <section className="py-16 bg-gradient-to-b from-background to-background/95">
            <div className="container px-4 md:px-6">
                {/* Header and Category Toggle */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-10'>
                    <div className="relative mb-5">
                        <Skeleton className="h-10 w-48" />
                    </div>
                    <div className="overflow-x-auto flex items-center justify-center mb-2 md:mb-5">
                        <div className="flex items-center justify-start gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit sm:min-w-0">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-10 w-24 rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='md:flex flex-col gap-8 hidden'>
                    {/* Top Project - Full Width */}
                    <div className="w-full">
                        <Card className="relative overflow-hidden border-border/50 p-0">
                            <div className="relative aspect-[16/9] md:aspect-[19/9] w-full">
                                <Skeleton className="w-full h-full" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Skeleton className="h-6 w-12" />
                                        <Skeleton className="h-8 w-64" />
                                    </div>
                                    <Skeleton className="h-4 w-full max-w-2xl mb-4" />
                                    <div className="flex gap-3">
                                        <Skeleton className="h-10 w-32" />
                                        <Skeleton className="h-10 w-32" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Middle Projects - 3 Cards */}
                    <div className='flex flex-wrap gap-4 justify-center'>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="w-full md:w-[calc(33.333%-15px)]">
                                <Card className="relative overflow-hidden border-border/50 p-0">
                                    <div className="relative aspect-[16/9] w-full">
                                        <Skeleton className="w-full h-full" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Skeleton className="h-6 w-12" />
                                                <Skeleton className="h-6 w-48" />
                                            </div>
                                            <Skeleton className="h-4 w-full mb-4" />
                                            <div className="flex gap-3">
                                                <Skeleton className="h-8 w-28" />
                                                <Skeleton className="h-8 w-28" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Projects - 2 Cards */}
                    <div className='flex flex-wrap gap-4 justify-center'>
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="w-full md:w-[calc(50%-16px)]">
                                <Card className="relative overflow-hidden border-border/50 p-0">
                                    <div className="relative aspect-[16/9] w-full">
                                        <Skeleton className="w-full h-full" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Skeleton className="h-6 w-12" />
                                                <Skeleton className="h-6 w-48" />
                                            </div>
                                            <Skeleton className="h-4 w-full mb-4" />
                                            <div className="flex gap-3">
                                                <Skeleton className="h-8 w-28" />
                                                <Skeleton className="h-8 w-28" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className='md:hidden'>
                    <div className='flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory'>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="w-[85vw] flex-shrink-0 snap-center">
                                <Card className="relative overflow-hidden border-border/50 p-0">
                                    <div className="relative aspect-[16/9] w-full">
                                        <Skeleton className="w-full h-full" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Skeleton className="h-6 w-12" />
                                                <Skeleton className="h-6 w-48" />
                                            </div>
                                            <Skeleton className="h-4 w-full mb-4" />
                                            <div className="flex gap-3">
                                                <Skeleton className="h-8 w-28" />
                                                <Skeleton className="h-8 w-28" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Skeleton */}
                <div className="mt-8 flex justify-center">
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, index) => (
                            <Skeleton key={index} className="h-10 w-10 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
