import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function SkillsSkeleton() {
    return (
        <section className="w-full py-10 bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <Skeleton className="h-12 w-48 mx-auto mb-12 md:mb-20" />

                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    {[...Array(14)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-10 sm:h-12 w-32 sm:w-40 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
