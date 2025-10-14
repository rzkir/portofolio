"use client"

import React from 'react'

import { motion } from 'framer-motion'

import { youtubeAnimations } from '@/base/animations/animation'

interface YoutubeHeaderProps {
    headingRef: React.RefObject<HTMLDivElement | null>
    isHeadingInView: boolean
}

const YoutubeHeader = React.memo(function YoutubeHeader({
    headingRef,
    isHeadingInView
}: YoutubeHeaderProps) {
    return (
        <div ref={headingRef} className='flex flex-col gap-4 items-center justify-center mb-10'>
            <motion.h2
                initial={youtubeAnimations.heading.initial}
                animate={youtubeAnimations.heading.animate(isHeadingInView)}
                transition={youtubeAnimations.heading.transition}
                className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center uppercase'
            >
                Youtube Content
            </motion.h2>
            <motion.p
                initial={youtubeAnimations.subtitle.initial}
                animate={youtubeAnimations.subtitle.animate(isHeadingInView)}
                transition={youtubeAnimations.subtitle.transition}
                className='text-md font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center capitalize'
            >
                Watch Now
            </motion.p>
        </div>
    )
})

export default YoutubeHeader
