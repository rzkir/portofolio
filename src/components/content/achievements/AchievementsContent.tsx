"use client"

import React, { useState, useEffect } from 'react'
import { AchievementsContentProps } from '@/types/achievements'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { MoveUpRight } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function AchievementsContent({ achievementsData }: { achievementsData: AchievementsContentProps[] }) {
    const fullMarqueeData = [...achievementsData, ...achievementsData];
    const [isHovered, setIsHovered] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState<AchievementsContentProps | null>(null);
    const x = useMotionValue(0);

    useEffect(() => {
        if (!isHovered && !selectedAchievement) {
            const animation = animate(x, -100, {
                duration: 30,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
                onUpdate: (latest) => {
                    x.set(latest);
                }
            });

            return () => animation.stop();
        }
    }, [isHovered, x, selectedAchievement]);

    return (
        <section className="w-full py-10 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-background/95">
            <div className="container relative">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center mb-20 uppercase">
                    Achievements
                </h3>

                <div className="relative w-full overflow-hidden">
                    {/* Left fade overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* Right fade overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* Marquee Container */}
                    <div
                        className="relative w-full overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <motion.div
                            className="flex"
                            style={{
                                width: "200%",
                                x: useTransform(x, (value) => `${value}%`)
                            }}
                        >
                            {fullMarqueeData.map((achievement, index) => (
                                <div
                                    key={`${achievement._id}-${index}`}
                                    className="group mx-4 flex-shrink-0 w-[380px] h-[220px] relative overflow-hidden rounded-2xl bg-background/40 hover:bg-background/60 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-500 shadow-lg hover:shadow-xl"
                                >
                                    {/* Background Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Text Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                                        <div>
                                            <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                                                {achievement.title}
                                            </h2>
                                            <div className="h-1 w-24 bg-primary/30 group-hover:w-40 transition-all duration-500 ease-out" />
                                        </div>
                                        <button
                                            onClick={() => setSelectedAchievement(achievement)}
                                            className="flex items-center gap-2 text-primary/60 group-hover:text-primary transition-colors duration-300 self-end cursor-pointer"
                                        >
                                            <span className="text-sm font-medium">View Details</span>
                                            <MoveUpRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Achievement Details Modal */}
            <Dialog open={!!selectedAchievement} onOpenChange={(open) => !open && setSelectedAchievement(null)}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{selectedAchievement?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedAchievement?.imageUrl && (
                        <div className="relative w-full h-[300px] mt-4 rounded-lg overflow-hidden">
                            <Image
                                src={selectedAchievement.imageUrl}
                                alt={selectedAchievement.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}