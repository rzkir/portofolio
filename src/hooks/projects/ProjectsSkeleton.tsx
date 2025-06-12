"use client"

import React from 'react'
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsSkeleton() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
            <div className="container px-4 py-4">
                {/* Hero Section Skeleton */}
                <div className="mb-8 sm:mb-12">
                    <Card className="relative overflow-hidden border-border/50 p-0 rounded-2xl sm:rounded-3xl">
                        <div className="relative aspect-[16/9] md:aspect-[19/9] w-full">
                            <Skeleton className="absolute inset-0" />
                        </div>
                    </Card>
                </div>

                {/* Frameworks Skeleton */}
                <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        {[1, 2, 3, 4].map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-14 w-32 rounded-xl sm:rounded-2xl"
                            />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-2">
                        <div className="space-y-8 sm:space-y-12">
                            {/* Gallery Skeleton */}
                            <div className="space-y-6 sm:space-y-8">
                                <Skeleton className="h-8 w-48" />
                                <div className="flex overflow-x-auto gap-4 sm:gap-6 lg:grid lg:grid-cols-2 lg:overflow-visible">
                                    {[1, 2, 3, 4].map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            className="aspect-video w-[280px] sm:w-[400px] lg:w-full rounded-xl sm:rounded-2xl flex-shrink-0"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Content Skeleton */}
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/6" />
                                <Skeleton className="h-6 w-1/2 mt-8" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 sm:top-8">
                            <div className="space-y-6 sm:space-y-8">
                                <Skeleton className="h-8 w-40" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                        <Card key={index} className="rounded-lg sm:rounded-xl overflow-hidden p-0">
                                            <Skeleton className="aspect-video w-full" />
                                            <div className="p-3 sm:p-4 space-y-2">
                                                <Skeleton className="h-5 w-3/4" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-5/6" />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
