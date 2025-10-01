"use client"

import React, { useState } from 'react'

import Marquee from 'react-fast-marquee'

import { MoveUpRight } from 'lucide-react'

import { motion, useInView } from 'framer-motion'

import AchievementsModal from '@/components/achievements/modal/AchievementsModal'

export default function AchievementsContent({ achievementsData }: { achievementsData: AchievementsContentProps[] }) {
    const [selectedAchievement, setSelectedAchievement] = useState<AchievementsContentProps | null>(null);

    const headingRef = React.useRef(null);
    const cardsRef = React.useRef(null);

    const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
    const isCardsInView = useInView(cardsRef, { once: true, margin: "-50px" });

    return (
        <section className="w-full py-10 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-background/95">
            <div className="container relative">
                <motion.h2
                    ref={headingRef}
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center mb-20 uppercase"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Achievements
                </motion.h2>

                <div ref={cardsRef} className="relative w-full overflow-hidden">
                    {/* Left fade overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* Right fade overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* React Marquee Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Marquee
                            speed={30}
                            gradient={false}
                            pauseOnHover={true}
                            className="py-4"
                        >
                            {achievementsData.map((achievement, index) => (
                                <div
                                    key={`${achievement._id}-${index}`}
                                    className="group mx-4 flex-shrink-0 w-[380px] h-[220px] relative overflow-hidden rounded-2xl bg-background/40 hover:bg-background/60 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-500 shadow-lg hover:shadow-xl"
                                >
                                    {/* Background Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Text Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                                        <div>
                                            <motion.h2
                                                className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                {achievement.title}
                                            </motion.h2>
                                            <div className="h-1 w-24 bg-primary/30 group-hover:w-40 transition-all duration-500 ease-out" />
                                        </div>
                                        <motion.button
                                            onClick={() => setSelectedAchievement(achievement)}
                                            className="flex items-center gap-2 text-primary/60 group-hover:text-primary transition-colors duration-300 self-end cursor-pointer"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={isCardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="text-sm font-medium">View Details</span>
                                            <MoveUpRight className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            ))}
                        </Marquee>
                    </motion.div>
                </div>
            </div>

            {/* Achievement Details Modal */}
            <AchievementsModal
                selectedAchievement={selectedAchievement}
                onClose={() => setSelectedAchievement(null)}
            />
        </section>
    )
}