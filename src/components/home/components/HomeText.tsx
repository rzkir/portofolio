import React from 'react'

import { motion } from 'framer-motion'

import BlurText from '@/components/ui/BlurText'

export default function HomeText({ text, span, isInitialLoading }: HomeTextProps) {
    return (
        <div className='block space-y-4'>
            <BlurText
                text={text}
                delay={150}
                animateBy="words"
                direction="top"
                as="h1"
                loading={isInitialLoading}
                initialDelay={isInitialLoading ? 0 : 0.4}
                className="text-4xl md:text-7xl font-extrabold leading-tight text-[color:var(--foreground)] tracking-tight"
                stepDuration={0.5}
            />

            <div className="flex flex-wrap items-center justify-start gap-[0.4em] md:gap-[0.6em]">
                {span.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        className="text-4xl md:text-7xl font-extrabold leading-tight text-[color:var(--muted-foreground)] tracking-tight inline-block cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isInitialLoading ? 0 : 1,
                            y: isInitialLoading ? 20 : 0
                        }}
                        whileHover={{
                            scale: isInitialLoading ? 1 : 1.2,
                            color: "var(--color-primary)",
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 10
                            }
                        }}
                        transition={{
                            duration: 0.5,
                            delay: isInitialLoading ? 0 : 0.6 + (index * 0.1),
                            ease: "easeOut"
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </div>
    )
}
