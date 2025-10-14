import React, { useState } from 'react'

import { motion } from 'framer-motion'

import Image from 'next/image'

import { Badge } from "@/components/ui/badge"

export default function TechSkill({ skillsData, isInView }: TechSkillProps) {
    const [showAllSkills, setShowAllSkills] = useState(false)
    const skillsToShow = showAllSkills ? skillsData : skillsData.slice(0, 20)
    const hasMoreSkills = skillsData.length > 20

    return (
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
                        transition={{ duration: 0.2 }}
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
                        transition={{ duration: 0.3 }}
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
                    transition={{ duration: 0.2 }}
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
                        transition={{ duration: 0.2 }}
                        title="Show Less"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    )
}
