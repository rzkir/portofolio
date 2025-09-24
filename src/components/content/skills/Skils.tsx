"use client"

import React from 'react'

import { motion, useMotionValue, useTransform, useInView } from 'framer-motion'

import Image from 'next/image'

import { Badge } from "@/components/ui/badge"

export default function SkillsContent({ skillsData }: { skillsData: SkillsContentProps[] }) {
    return (
        <section id="skills" className="w-full py-10 bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center uppercase tracking-tight mb-14'>
                    Tech Skills
                </h2>

                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    {skillsData.map((item) => {
                        const x = useMotionValue(0)
                        const y = useMotionValue(0)
                        const ref = React.useRef(null)
                        const isInView = useInView(ref, { once: true })

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
                                ref={ref}
                                key={item._id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{
                                    perspective: 1000,
                                    rotateX,
                                    rotateY,
                                }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
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
                                    <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            className="object-contain drop-shadow-sm"
                                        />
                                    </div>
                                    <span className="text-sm sm:text-base font-medium drop-shadow-sm">
                                        {item.title}
                                    </span>
                                </Badge>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
