"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { useLoading } from '@/context/LoadingContext'

import HomeTitle from '@/components/home/components/HomeTitle'

import HomeText from '@/components/home/components/HomeText'

import HomeButton from '@/components/home/components/HomeButton'

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

    return (
        <section
            className="md:min-h-screen min-h-full flex flex-col items-center justify-center py-16 -mt-0 md:-mt-16 relative overflow-hidden bg-gradient-to-br from-background via-background to-surface/30"
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
                        {/* Home Title */}
                        <HomeTitle
                            title={item.title}
                            isInitialLoading={isInitialLoading}
                        />

                        {/* Home Text */}
                        <HomeText
                            text={item.text}
                            span={item.span}
                            isInitialLoading={isInitialLoading}
                        />

                        {/* Home Button */}
                        <HomeButton
                            href={item.href}
                            label={item.label}
                            description={item.description}
                            isInitialLoading={isInitialLoading}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}