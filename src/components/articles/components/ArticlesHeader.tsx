"use client"

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { motion } from 'framer-motion'

import { articlesAnimations } from '@/base/animations/animation'

export default function ArticlesHeader() {
    return (
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
    )
}