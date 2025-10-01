"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'

import ShinyText from '@/components/ui/shiny-text'

import Link from 'next/link'

import { useLoading } from '@/context/LoadingContext'

import BlurText from '@/components/ui/BlurText'

export default function HomeContent({ homeData }: { homeData: HomeContentProps[] }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const { isInitialLoading } = useLoading();

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    return (
        <section
            className="md:min-h-screen min-h-full flex flex-col items-center justify-center py-10 -mt-0 md:-mt-16 relative overflow-hidden"
            onMouseMove={handleMouseMove}
            id="home"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isInitialLoading && (
                <>
                    <motion.div
                        className="absolute -z-10 w-[180px] h-[180px] rounded-full pointer-events-none"
                        animate={{
                            x: mousePosition.x - 800,
                            y: mousePosition.y - 400,
                            scale: isHovered ? [0.8, 1.1, 0.8] : 0,
                            opacity: isHovered ? 0.15 : 0,
                        }}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 25 },
                            y: { type: "spring", stiffness: 300, damping: 25 },
                            scale: { duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
                            opacity: { duration: 0.4 }
                        }}
                        style={{
                            background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
                            filter: "blur(12px)",
                        }}
                    />
                    <motion.div
                        className="absolute -z-10 w-[120px] h-[120px] rounded-full pointer-events-none"
                        animate={{
                            x: mousePosition.x - 650,
                            y: mousePosition.y - 350,
                            scale: isHovered ? [0.6, 0.9, 0.6] : 0,
                            opacity: isHovered ? 0.1 : 0,
                        }}
                        transition={{
                            x: { type: "spring", stiffness: 250, damping: 20 },
                            y: { type: "spring", stiffness: 250, damping: 20 },
                            scale: { duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
                            opacity: { duration: 0.4 }
                        }}
                        style={{
                            background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
                            filter: "blur(8px)",
                        }}
                    />
                    <motion.div
                        className="absolute -z-10 w-[80px] h-[80px] rounded-full pointer-events-none"
                        animate={{
                            x: mousePosition.x - 750,
                            y: mousePosition.y - 450,
                            scale: isHovered ? [0.4, 0.7, 0.4] : 0,
                            opacity: isHovered ? 0.08 : 0,
                        }}
                        transition={{
                            x: { type: "spring", stiffness: 200, damping: 15 },
                            y: { type: "spring", stiffness: 200, damping: 15 },
                            scale: { duration: 3, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
                            opacity: { duration: 0.4 }
                        }}
                        style={{
                            background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
                            filter: "blur(6px)",
                        }}
                    />
                </>
            )}
            <div className="container px-4 md:px-6">
                {homeData.map((item) => (
                    <div key={item._id} className="flex flex-col gap-8 md:gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: isInitialLoading ? 0 : 1,
                                y: isInitialLoading ? 20 : 0
                            }}
                            transition={{ duration: 0.5, delay: isInitialLoading ? 0 : 0.2 }}
                        >
                            <ShinyText
                                text={item.title}
                                disabled={isInitialLoading}
                                speed={3}
                                className="text-lg md:text-xl font-medium mb-2 tracking-wide"
                            />
                        </motion.div>

                        <div className='block space-y-4'>
                            <BlurText
                                text={item.text}
                                delay={150}
                                animateBy="words"
                                direction="top"
                                as="h1"
                                loading={isInitialLoading}
                                initialDelay={isInitialLoading ? 0 : 0.4}
                                onAnimationComplete={handleAnimationComplete}
                                className="text-4xl md:text-7xl font-extrabold leading-tight text-[color:var(--foreground)] tracking-tight"
                                stepDuration={0.5}
                            />

                            <div className="flex flex-wrap items-center justify-start gap-[0.4em] md:gap-[0.6em]">
                                {item.span.split('').map((char, index) => (
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

                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12'>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isInitialLoading ? 0 : 1,
                                    y: isInitialLoading ? 20 : 0
                                }}
                                transition={{ duration: 0.5, delay: isInitialLoading ? 0 : 0.8 }}
                            >
                                <Button
                                    className="group relative rounded-full px-8 py-6 bg-[color:var(--color-primary)] 
                                    text-[color:var(--color-primary-foreground)] text-lg font-semibold 
                                    overflow-hidden transition-all duration-300 hover:shadow-xl
                                    min-h-[44px] min-w-[44px]
                                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                                    before:via-white/40 before:to-transparent before:translate-x-[-100%] 
                                    before:transition-transform before:duration-300 hover:before:translate-x-[100%]
                                    after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent 
                                    after:via-white/30 after:to-transparent after:translate-x-[-100%] 
                                    after:transition-transform after:duration-300 after:delay-50 hover:after:translate-x-[100%]"
                                >
                                    <Link href={item.href} className="flex items-center gap-3 px-2 py-1 min-h-[44px] min-w-[44px]">
                                        {item.label}
                                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isInitialLoading ? 0 : 1,
                                    y: isInitialLoading ? 20 : 0
                                }}
                                transition={{ duration: 0.5, delay: isInitialLoading ? 0 : 1.0 }}
                                className="max-w-2xl md:text-right text-base text-muted-foreground leading-relaxed"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

