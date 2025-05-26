"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { HomeContentProps } from '@/components/content/Home/types/home'

import { Button } from '@/components/ui/button'

import Link from 'next/link'

export default function HomeContent({ homeData }: { homeData: HomeContentProps[] }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <section
            className="min-h-screen flex flex-col items-center justify-center -mt-24 py-16 relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="absolute -z-10 w-[300px] h-[300px] rounded-full pointer-events-none"
                animate={{
                    x: mousePosition.x - 100,
                    y: mousePosition.y - 100,
                    scale: isHovered ? [1, 1.2, 1] : 0,
                    opacity: isHovered ? 0.15 : 0,
                }}
                transition={{
                    x: { type: "spring", stiffness: 200, damping: 20 },
                    y: { type: "spring", stiffness: 200, damping: 20 },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.2 }
                }}
                style={{
                    background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
                }}
            />
            <div className="container px-4 md:px-6">
                {homeData.map((item) => (
                    <div key={item._id} className="flex flex-col gap-8 md:gap-10">
                        <h3 className="text-lg md:text-xl font-medium mb-2 text-[color:var(--foreground)] tracking-wide">
                            {item.title}
                        </h3>

                        <div className='block space-y-4'>
                            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight text-[color:var(--foreground)] tracking-tight">
                                {item.text}
                            </h1>

                            <div className="flex flex-wrap items-center justify-start gap-[0.4em] md:gap-[0.6em]">
                                {item.span.split('').map((char, index) => (
                                    <motion.span
                                        key={index}
                                        className="text-4xl md:text-7xl font-extrabold leading-tight text-[color:var(--muted-foreground)] tracking-tight inline-block cursor-pointer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        whileHover={{
                                            scale: 1.2,
                                            color: "var(--primary)",
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 10
                                            }
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            ease: "easeOut"
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12'>
                            <Button
                                className="rounded-full px-8 py-6 bg-[color:var(--primary)] hover:bg-[color:var(--primary)]/90 
                                text-[color:var(--primary-foreground)] text-lg font-semibold shadow-lg 
                                transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <Link href={item.href} className="flex items-center gap-2">
                                    {item.label}
                                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                                </Link>
                            </Button>

                            <p className="text-base md:text-lg text-[color:var(--muted-foreground)] max-w-2xl md:text-right leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
