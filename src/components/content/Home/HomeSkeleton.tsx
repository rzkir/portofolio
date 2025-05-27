import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function HomeSkeleton() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center -mt-24 py-28 relative overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col gap-8 md:gap-10">
                    <Skeleton className="h-6 w-48 md:w-64" />

                    <div className='block space-y-4'>
                        <Skeleton className="h-16 md:h-24 w-full max-w-3xl" />

                        <div className="flex flex-wrap items-center justify-start gap-[0.4em] md:gap-[0.6em]">
                            {[...Array(10)].map((_, index) => (
                                <Skeleton key={index} className="h-10 md:h-16 w-8 md:w-12" />
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12'>
                        <Skeleton className="h-14 w-40" />
                        <Skeleton className="h-20 w-full max-w-2xl" />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        </section>
    )
}
