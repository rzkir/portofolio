import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { ArrowUpRight } from "lucide-react"

import { Button } from '@/components/ui/button'

import { formatRelativeTime } from '@/lib/formatTime'

export default function Articles({ articlesData }: { articlesData: Article[] }) {
    return (
        <section className='py-10'>
            <div className="container space-y-16 px-6">
                <div className='flex justify-between items-center'>
                    <h1
                        className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center uppercase'
                    >
                        From my blog post
                    </h1>

                    <Link href={"/articles"} className='rounded-full overflow-hidden'>
                        <Button>See All</Button>
                    </Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {
                        articlesData.map((item, idx) => {
                            return (
                                <Link href={`/articles/${item.slug}`} key={idx} className='group cursor-pointer'>
                                    <div className='relative aspect-[16/9] overflow-hidden rounded-lg'>
                                        <Image src={item.thumbnail} alt={item.title} fill className='object-cover group-hover:scale-105 transition-transform duration-300' />

                                        <div className='absolute bottom-0 right-0 bg-background h-20 w-20 p-4 rounded-tl-4xl transition-colors duration-300'>
                                            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-foreground group-hover:bg-gray-900 transition-all duration-300 shadow-lg group-hover:shadow-xl'>
                                                <ArrowUpRight className='w-7 h-7 text-background group-hover:text-foreground group-hover:-translate-y-1 group-hover:translate-x-1 stroke-2 transition-all duration-300' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='space-y-6 mt-6 py-2'>
                                        <div className='inline-block'>
                                            <span className='px-3 py-1 capitalize text-sm font-medium text-muted-foreground bg-muted rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300'>
                                                {item.category}
                                            </span>
                                        </div>

                                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                            <span className='w-1 h-1 bg-primary rounded-full'></span>
                                            <span className='font-medium group-hover:text-foreground transition-colors duration-300'>Rizki</span>
                                            <span className='w-1 h-1 bg-primary rounded-full'></span>
                                            <span className='group-hover:text-foreground transition-colors duration-300'>{formatRelativeTime(item.createdAt)}</span>
                                        </div>

                                        <h1 className='text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300'>
                                            {item.title}
                                        </h1>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
