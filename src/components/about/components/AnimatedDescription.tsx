"use client"

import React from 'react'

import { motion, useInView } from 'framer-motion'

import { descriptionAnimations } from '@/base/animations/animation'

export function AnimatedDescription({ description }: AnimatedDescriptionProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={descriptionAnimations.container.initial}
            animate={isInView ? descriptionAnimations.container.animate : descriptionAnimations.container.initial}
            transition={descriptionAnimations.container.transition}
            className="text-sm md:text-base lg:text-lg text-muted-foreground mt-3 md:mt-4 leading-relaxed"
        >
            {description.split(' ').map((word, index) => (
                <motion.span
                    key={index}
                    initial={descriptionAnimations.word.initial}
                    animate={isInView ? descriptionAnimations.word.animate : descriptionAnimations.word.initial}
                    transition={{
                        ...descriptionAnimations.word.transition,
                        delay: 0.4 + (index * 0.1),
                    }}
                    className="inline-block mr-1"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    )
} 