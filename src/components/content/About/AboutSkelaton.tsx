import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from '@/components/ui/card'

export default function AboutSkeleton() {
    return (
        <>
            <section className="py-6 md:py-10">
                <div className="container px-4 md:px-6">
                    <div className="w-full max-w-4xl mx-auto flex-col flex space-y-2 md:space-y-3">
                        <Card className="relative overflow-hidden">
                            <div className="absolute inset-0 rounded-lg">
                                <div className="absolute inset-0 border-2 border-transparent" />
                                <div className="absolute inset-0">
                                    <div className="absolute w-[2px] h-[2px] bg-primary rounded-full animate-neon-flow" />
                                    <div className="absolute w-[2px] h-[2px] bg-accent rounded-full animate-neon-flow-reverse" />
                                </div>
                            </div>
                            <div className="absolute inset-[2px] bg-background rounded-lg" />
                            <CardContent className="p-3 md:p-4 px-4 md:px-10 relative z-10">
                                <div className="flex items-center gap-2 md:gap-4">
                                    <Skeleton className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full" />
                                    <div className="flex-1 flex flex-col gap-4">
                                        <Skeleton className="h-8 w-48" />
                                        <div className="flex flex-wrap gap-1.5 md:gap-2 items-center">
                                            <Skeleton className="h-6 w-32" />
                                            <span className="text-muted-foreground/40">•</span>
                                            <Skeleton className="h-6 w-32" />
                                            <span className="text-muted-foreground/40">•</span>
                                            <Skeleton className="h-6 w-32" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="text-sm md:text-base lg:text-lg text-muted-foreground text-center mt-3 md:mt-4 max-w-3xl mx-auto leading-relaxed">
                            <div className="flex flex-wrap justify-center gap-1">
                                {[...Array(15)].map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-4 w-16 md:w-20 inline-block"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-10 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-background/95">
                <div className="container relative">
                    <Skeleton className="h-10 w-48 mx-auto mb-20" />

                    <div className="relative w-full overflow-hidden">
                        {/* Left fade overlay */}
                        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

                        {/* Right fade overlay */}
                        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

                        {/* Marquee Container */}
                        <div className="relative w-full overflow-hidden">
                            <div className="flex">
                                {[...Array(6)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="mx-4 flex-shrink-0 w-[380px] h-[220px] relative overflow-hidden rounded-2xl bg-background/40 backdrop-blur-sm border border-primary/10"
                                    >
                                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                            <div>
                                                <Skeleton className="h-8 w-48 mb-3" />
                                                <Skeleton className="h-1 w-24" />
                                            </div>
                                            <div className="self-end">
                                                <Skeleton className="h-6 w-32" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
