"use client"

import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { ArrowUpRight } from "lucide-react"

import { Button } from '@/components/ui/button'

import { formatRelativeTime } from '@/lib/formatTime'

import { useLoadingOverlay } from '@/base/Loading/useLoadingOverlay'

import { motion } from 'framer-motion'

import { articlesAnimations } from '@/base/animations/animation'

export default function Articles({ articlesData }: { articlesData: Article[] }) {
    const { withNavigationLoading } = useLoadingOverlay()

    const handleViewDetails = React.useCallback(async (slug: string) => {
        await withNavigationLoading(`/articles/${slug}`, 'articles')
    }, [withNavigationLoading])

    return (
        <section className='py-10'>
            <div className="container space-y-16 px-6">
                <div className='flex justify-between items-center'>
                    <motion.h1
                        className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center uppercase'
                        initial={articlesAnimations.title.initial}
                        whileInView={articlesAnimations.title.animate}
                        viewport={{ once: true }}
                        transition={articlesAnimations.title.transition}
                    >
                        From my blog post
                    </motion.h1>

                    <motion.div
                        initial={articlesAnimations.seeAll.initial}
                        whileInView={articlesAnimations.seeAll.animate}
                        viewport={{ once: true }}
                        transition={articlesAnimations.seeAll.transition}
                    >
                        <Link href={"/articles"} className='rounded-full overflow-hidden'>
                            <Button>See All</Button>
                        </Link>
                    </motion.div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {
                        articlesData.map((item, idx) => {
                            return (
                                <motion.div
                                    key={idx}
                                    className='group cursor-pointer'
                                    onClick={() => handleViewDetails(item.slug)}
                                    initial={articlesAnimations.article.initial}
                                    whileInView={articlesAnimations.article.animate}
                                    viewport={{ once: true }}
                                    transition={articlesAnimations.article.transition(idx)}
                                    whileHover={articlesAnimations.article.whileHover}
                                >
                                    <motion.div
                                        className='relative aspect-[16/9] overflow-hidden rounded-lg'
                                        initial={articlesAnimations.articleImage.initial}
                                        whileInView={articlesAnimations.articleImage.animate}
                                        viewport={{ once: true }}
                                        transition={articlesAnimations.articleImage.transition(idx)}
                                    >
                                        <Image src={item.thumbnail} alt={item.title} fill className='object-cover group-hover:scale-105 transition-transform duration-300' />

                                        <motion.div
                                            className='absolute bottom-0 right-0 bg-background h-20 w-20 p-4 rounded-tl-4xl transition-colors duration-300'
                                            initial={articlesAnimations.articleIcon.initial}
                                            whileInView={articlesAnimations.articleIcon.animate}
                                            viewport={{ once: true }}
                                            transition={articlesAnimations.articleIcon.transition(idx)}
                                        >
                                            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-foreground group-hover:bg-gray-900 transition-all duration-300 shadow-lg group-hover:shadow-xl'>
                                                <ArrowUpRight className='w-7 h-7 text-background group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 stroke-2 transition-all duration-300' />
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        className='space-y-6 mt-6 py-2'
                                        initial={articlesAnimations.articleContent.initial}
                                        whileInView={articlesAnimations.articleContent.animate}
                                        viewport={{ once: true }}
                                        transition={articlesAnimations.articleContent.transition(idx)}
                                    >
                                        <motion.div
                                            className='inline-block'
                                            initial={articlesAnimations.articleCategory.initial}
                                            whileInView={articlesAnimations.articleCategory.animate}
                                            viewport={{ once: true }}
                                            transition={articlesAnimations.articleCategory.transition(idx)}
                                        >
                                            <span className='px-3 py-1 capitalize text-sm font-medium text-muted-foreground bg-muted rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300'>
                                                {item.category}
                                            </span>
                                        </motion.div>

                                        <motion.div
                                            className='flex items-center gap-2 text-sm text-muted-foreground'
                                            initial={articlesAnimations.articleMeta.initial}
                                            whileInView={articlesAnimations.articleMeta.animate}
                                            viewport={{ once: true }}
                                            transition={articlesAnimations.articleMeta.transition(idx)}
                                        >
                                            <span className='w-1 h-1 bg-primary rounded-full'></span>
                                            <span className='font-medium group-hover:text-foreground transition-colors duration-300'>Rizki</span>
                                            <span className='w-1 h-1 bg-primary rounded-full'></span>
                                            <span className='group-hover:text-foreground transition-colors duration-300'>{formatRelativeTime(item.createdAt)}</span>
                                        </motion.div>

                                        <motion.h1
                                            className='text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300'
                                            initial={articlesAnimations.articleTitle.initial}
                                            whileInView={articlesAnimations.articleTitle.animate}
                                            viewport={{ once: true }}
                                            transition={articlesAnimations.articleTitle.transition(idx)}
                                        >
                                            {item.title}
                                        </motion.h1>
                                    </motion.div>
                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
