"use client"

import React from 'react'

import { motion, useMotionValue, useTransform, useInView } from 'framer-motion'

import Image from 'next/image'

import { Badge } from "@/components/ui/badge"

import { skillsAnimations } from '@/base/animations/animation'

export default function SkillsContent({ skillsData }: { skillsData: SkillsContentProps[] }) {
    const containerRef = React.useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.3 })

    return (
        <section id="skills" className="w-full py-10 bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <motion.h2
                    className='text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center uppercase tracking-tight mb-14'
                    initial={skillsAnimations.title.initial}
                    animate={skillsAnimations.title.animate(isInView)}
                    transition={skillsAnimations.title.transition}
                >
                    Tech Skills
                </motion.h2>

                <motion.div
                    ref={containerRef}
                    className="flex flex-wrap gap-3 sm:gap-4 justify-center"
                    initial={skillsAnimations.container.initial}
                    animate={skillsAnimations.container.animate(isInView)}
                    transition={skillsAnimations.container.transition}
                >
                    {skillsData.map((item, index) => {
                        const x = useMotionValue(0)
                        const y = useMotionValue(0)

                        const rotateX = useTransform(y, [-100, 100], [30, -30])
                        const rotateY = useTransform(x, [-100, 100], [-30, 30])

                        const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
                            const rect = event.currentTarget.getBoundingClientRect()
                            const centerX = rect.left + rect.width / 2
                            const centerY = rect.top + rect.height / 2

                            x.set(event.clientX - centerX)
                            y.set(event.clientY - centerY)
                        }

                        const handleMouseLeave = () => {
                            x.set(0)
                            y.set(0)
                        }

                        return (
                            <motion.div
                                key={item._id}
                                initial={skillsAnimations.skill.initial}
                                animate={skillsAnimations.skill.animate(isInView)}
                                transition={skillsAnimations.skill.transition(index)}
                                style={{
                                    perspective: 1000,
                                    rotateX,
                                    rotateY,
                                }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                whileHover={skillsAnimations.skill.whileHover}
                                whileTap={skillsAnimations.skill.whileTap}
                            >
                                <Badge
                                    variant="secondary"
                                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 h-auto cursor-pointer 
                                    bg-gradient-to-br from-secondary to-secondary/80
                                    shadow-[0_4px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_0_rgb(0,0,0,0.1)]
                                    active:shadow-[0_2px_0_rgb(0,0,0,0.1)] active:translate-y-[2px]
                                    transition-all duration-200 ease-out
                                    border border-black/10
                                    hover:bg-secondary/90"
                                >
                                    <motion.div
                                        className="relative w-6 h-6 sm:w-8 sm:h-8"
                                        initial={skillsAnimations.skillIcon.initial}
                                        animate={skillsAnimations.skillIcon.animate(isInView)}
                                        transition={skillsAnimations.skillIcon.transition(index)}
                                    >
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            className="object-contain drop-shadow-sm"
                                        />
                                    </motion.div>
                                    <motion.span
                                        className="text-sm sm:text-base font-medium drop-shadow-sm"
                                        initial={skillsAnimations.skillText.initial}
                                        animate={skillsAnimations.skillText.animate(isInView)}
                                        transition={skillsAnimations.skillText.transition(index)}
                                    >
                                        {item.title}
                                    </motion.span>
                                </Badge>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
