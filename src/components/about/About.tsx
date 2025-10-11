"use client"

import React, { useState } from 'react'

import { motion, useInView } from 'framer-motion'

import Image from 'next/image'

import { Badge } from "@/components/ui/badge"

import { AnimatedDescription } from '@/components/about/components/AnimatedDescription'

export default function AboutContent({ aboutData, skillsData }: { aboutData: AboutContentProps, skillsData: SkillsContentProps[] }) {
    const [showAllSkills, setShowAllSkills] = useState(false)
    const skillsToShow = showAllSkills ? skillsData : skillsData.slice(0, 20)
    const hasMoreSkills = skillsData.length > 20

    const containerRef = React.useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    return (
        <section id="about" className="py-16 md:py-20 overflow-hidden bg-gradient-to-b from-background to-surface/20">
            <div className="container px-4 md:px-6">
                <motion.div
                    ref={containerRef}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Photo Section - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex justify-center lg:justify-start"
                    >
                        <div className="relative w-full h-full aspect-6/5">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                            <motion.div
                                className="relative w-full h-full rounded-2xl overflow-hidden shadow-elevation-high border-4 border-white/20 card-modern"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Image
                                    src={aboutData.card.imageUrl}
                                    alt={aboutData.card.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Status Badge on Image */}
                                <motion.div
                                    className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 shadow-lg"
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                                    transition={{ duration: 0.4, delay: 0.8 }}
                                >
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-medium text-white drop-shadow-sm">{aboutData.card.status}</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Section - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Information Section */}
                        <div className="space-y-6">
                            {/* Name and Title */}
                            <motion.div
                                className="text-center lg:text-left"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <motion.h2
                                    className="text-3xl lg:text-4xl font-bold text-gradient mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    {aboutData.card.name}
                                </motion.h2>

                                {/* Work and Location combined */}
                                <motion.div
                                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <motion.div
                                        className="flex items-center gap-2 text-lg text-muted-foreground"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4, delay: 1.0 }}
                                    >
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                        </svg>
                                        <span>{aboutData.card.work}</span>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center gap-2 text-lg text-muted-foreground/80"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4, delay: 1.2 }}
                                    >
                                        <svg className="w-5 h-5 text-primary/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{aboutData.card.location}</span>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.3, delay: 1.4 }}
                            >
                                <AnimatedDescription description={aboutData.description} />
                            </motion.div>
                        </div>

                        {/* Skills Section */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 1.8 }}
                            >
                                <h3 className="text-xl font-semibold text-foreground">Technical Skills</h3>
                                <p className="text-muted-foreground text-sm">
                                    Technologies and tools I work with to bring ideas to life
                                </p>
                            </motion.div>

                            <motion.div
                                className="relative"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.3, delay: 2.0 }}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {skillsToShow.map((item, index) => (
                                        <motion.div
                                            key={item._id}
                                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: "easeOut",
                                                delay: 2.2 + (index * 0.05)
                                            }}
                                            whileHover={{
                                                scale: 1.05,
                                                rotateX: 5,
                                                rotateY: 5,
                                                transition: { duration: 0.2 }
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ perspective: 1000 }}
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="flex items-center gap-2 px-4 py-2 h-auto cursor-pointer 
                                                    bg-gradient-to-br from-secondary to-secondary/80
                                                    shadow-[0_4px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_0_rgb(0,0,0,0.1)]
                                                    active:shadow-[0_2px_0_rgb(0,0,0,0.1)] active:translate-y-[2px]
                                                    transition-all duration-200 ease-out
                                                    border border-black/10
                                                    hover:bg-secondary/90"
                                            >
                                                <motion.div
                                                    className="relative w-6 h-6"
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: 2.4 + (index * 0.05),
                                                        ease: "backOut"
                                                    }}
                                                >
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        fill
                                                        className="object-contain drop-shadow-sm"
                                                    />
                                                </motion.div>
                                                <motion.span
                                                    className="text-sm font-medium drop-shadow-sm"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: 2.6 + (index * 0.05)
                                                    }}
                                                >
                                                    {item.title}
                                                </motion.span>
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Overlay gradient untuk efek fade - hanya saat collapsed */}
                                {!showAllSkills && hasMoreSkills && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.5 }}
                                    />
                                )}

                                {/* View More Button - Absolute positioned saat collapsed */}
                                {!showAllSkills && hasMoreSkills && (
                                    <motion.button
                                        onClick={() => setShowAllSkills(!showAllSkills)}
                                        className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10
                                            flex items-center justify-center w-12 h-12 rounded-full
                                            bg-primary/10 hover:bg-primary/20 backdrop-blur-sm
                                            border border-primary/20 shadow-lg
                                            transition-all duration-300 text-primary
                                            hover:shadow-xl hover:scale-105 active:scale-95`}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 3.0 }}
                                        title="View More"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.button>
                                )}
                            </motion.div>

                            {/* Show Less Button - Normal positioned saat expanded */}
                            {showAllSkills && hasMoreSkills && (
                                <motion.div
                                    className="flex justify-center pt-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <motion.button
                                        onClick={() => setShowAllSkills(!showAllSkills)}
                                        className={`flex items-center justify-center w-12 h-12 rounded-full
                                            bg-primary/10 hover:bg-primary/20 backdrop-blur-sm
                                            border border-primary/20 shadow-lg
                                            transition-all duration-300 text-primary
                                            hover:shadow-xl hover:scale-105 active:scale-95`}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        title="Show Less"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </motion.button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}