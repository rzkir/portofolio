"use client"

import React from 'react'

import { motion, useInView } from 'framer-motion'

export function AnimatedDescription({ description }: AnimatedDescriptionProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm md:text-base lg:text-lg text-muted-foreground mt-3 md:mt-4 leading-relaxed"
        >
            {description.split(' ').map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        duration: 0.3,
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