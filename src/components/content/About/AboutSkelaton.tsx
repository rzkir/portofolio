import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from '@/components/ui/card'

export default function AboutSkeleton() {
    return (
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
    )
}
