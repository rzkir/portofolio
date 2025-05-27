"use client"

import React, { useState } from 'react'

import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'

import { Card, CardContent } from '@/components/ui/card'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { Badge } from '@/components/ui/badge'

import Image from 'next/image'

import bgCard from "@/base/assets/bg-card.png"

import { AnimatedCardProps } from '@/components/content/About/types/about'

export function AnimatedCard({ data }: AnimatedCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    const rotateX = useTransform(mouseY, [-150, 150], [5, -5]);
    const rotateY = useTransform(mouseX, [-150, 150], [-5, 5]);

    const springConfig = { damping: 30, stiffness: 80, mass: 1.5 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set((e.clientX - centerX) / 2);
        mouseY.set((e.clientY - centerY) / 2);
    };

    return (
        <motion.div
            ref={ref}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                mouseX.set(0);
                mouseY.set(0);
            }}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
        >
            <motion.div
                style={{
                    rotateX: isHovered ? springRotateX : 0,
                    rotateY: isHovered ? springRotateY : 0,
                    transition: "transform 0.2s ease-out"
                }}
            >
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 rounded-lg">
                        <div className="absolute inset-0 border-2 border-transparent" />
                        <div className="absolute inset-0">
                            <div className="absolute w-[2px] h-[2px] bg-primary rounded-full animate-neon-flow" />
                            <div className="absolute w-[2px] h-[2px] bg-accent rounded-full animate-neon-flow-reverse" />
                        </div>
                    </div>
                    <div className="absolute inset-[2px] bg-background rounded-lg" />
                    <CardContent className="p-2 sm:p-3 md:p-4 px-3 sm:px-4 md:px-10 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 md:gap-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className="flex justify-center md:justify-start"
                            >
                                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-background shadow-lg">
                                    <AvatarImage
                                        src={data.card.imageUrl}
                                        alt={data.card.name}
                                        className="object-cover"
                                    />
                                    <AvatarFallback>{data.card.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            </motion.div>

                            <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="flex items-center gap-1 flex-wrap justify-center md:justify-start"
                                >
                                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-primary text-center md:text-left">
                                        {data.card.name}
                                    </h3>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 items-center justify-center md:justify-start"
                                >
                                    <Badge variant="secondary" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-secondary-foreground">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                        </svg>
                                        {data.card.work}
                                    </Badge>
                                    <span className="text-muted-foreground/40">•</span>
                                    <Badge variant="secondary" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-secondary-foreground">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        {data.card.location}
                                    </Badge>
                                    <span className="text-muted-foreground/40">•</span>
                                    <Badge variant="success" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-accent-foreground">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        {data.card.status}
                                    </Badge>
                                </motion.div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 opacity-40 pointer-events-none select-none">
                            <Image src={bgCard} alt="bg-card" className="object-cover w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
} 