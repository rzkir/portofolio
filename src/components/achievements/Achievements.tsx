"use client"

import React, { useState } from 'react'

import Marquee from 'react-fast-marquee'

import { motion, useInView } from 'framer-motion'

import { achievementsAnimations } from '@/base/animations/animation'

import AchievementsModal from '@/components/achievements/modal/AchievementsModal'

import AchievementsCard from '@/components/achievements/components/AchievementsCard'

export default function AchievementsContent({ achievementsData }: { achievementsData: AchievementsContentProps[] }) {
    const [selectedAchievement, setSelectedAchievement] = useState<AchievementsContentProps | null>(null);

    const headingRef = React.useRef(null);

    const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });

    const containerRef = React.useRef(null);
    const isCardsInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="w-full py-10 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-background/95">
            <div className="container relative">
                <motion.h2
                    ref={headingRef}
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center mb-20 uppercase"
                    initial={achievementsAnimations.title.initial}
                    animate={achievementsAnimations.title.animate(isHeadingInView)}
                    transition={achievementsAnimations.title.transition}
                >
                    Achievements
                </motion.h2>

                <div className="relative w-full overflow-hidden">
                    {/* Left fade overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* Right fade overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* React Marquee Container */}
                    <motion.div
                        ref={containerRef}
                    >
                        <Marquee
                            speed={30}
                            gradient={false}
                            pauseOnHover={true}
                            className="py-4"
                        >
                            {achievementsData.map((achievement, index) => (
                                <AchievementsCard
                                    key={`${achievement._id}-${index}`}
                                    achievement={achievement}
                                    index={index}
                                    isCardsInView={isCardsInView}
                                    onCardClick={setSelectedAchievement}
                                />
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