import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function YoutubeSkeleton() {
    return (
        <section className='py-8 md:py-12 lg:py-16 bg-transparent'>
            <div className="container px-4 md:px-6">
                <div className='flex flex-col gap-4 items-center justify-center mb-10'>
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-6 w-32" />
                </div>

                {/* Category Toggle Skeleton */}
                <div className="mb-6 sm:mb-12 overflow-x-auto pb-2 flex items-center justify-center">
                    <div className="flex items-center justify-start gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit sm:min-w-0">
                        {[1, 2, 3].map((index) => (
                            <Skeleton key={index} className="h-10 w-24 rounded-lg" />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
                    {[1, 2, 3, 4].map((index) => (
                        <Card
                            key={index}
                            className="group overflow-hidden rounded-xl bg-gray-900 text-white border border-gray-800/70 flex-shrink-0 transition-all duration-300 w-full p-0"
                        >
                            <div className={`flex flex-col h-full lg:grid lg:grid-cols-2 lg:gap-0 ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                                <div className={`relative w-full aspect-video overflow-hidden lg:w-full lg:aspect-video lg:h-auto ${index % 2 !== 0 ? 'lg:order-last' : 'lg:order-first'}`}>
                                    <Skeleton className="w-full h-full" />
                                </div>
                                <CardContent className={`p-4 md:p-6 flex flex-col flex-grow lg:col-span-1 lg:gap-4 ${index % 2 !== 0 ? 'lg:order-first' : 'lg:order-last'}`}>
                                    <div className="flex flex-col flex-grow">
                                        <CardHeader className="p-0 mb-2 md:mb-3">
                                            <Skeleton className="h-6 w-3/4 mb-2" />
                                            <Skeleton className="h-6 w-1/2" />
                                        </CardHeader>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-5/6" />
                                            <Skeleton className="h-4 w-4/6" />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4 mb-3 md:mb-4">
                                        {[1, 2, 3].map((frameworkIndex) => (
                                            <Skeleton
                                                key={frameworkIndex}
                                                className="h-6 w-20 rounded-md"
                                            />
                                        ))}
                                    </div>

                                    <Skeleton className="h-10 w-full md:w-32 mt-4" />
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="mt-8 flex justify-center gap-2">
                    {[1, 2, 3].map((index) => (
                        <Skeleton key={index} className="h-10 w-10 rounded-md" />
                    ))}
                </div>
            </div>
        </section>
    )
}
