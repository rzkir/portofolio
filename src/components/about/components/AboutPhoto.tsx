import React from 'react'

import { motion } from 'framer-motion'

import Image from 'next/image'

import PixelTransition from '@/components/ui/PixelTransition'

export default function AboutPhoto({ imageUrl, name, status, isInView }: AboutPhotoProps) {
    return (
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
                    <PixelTransition
                        trigger="hover"
                        firstContent={
                            <Image
                                src={imageUrl}
                                alt={name}
                                className="w-full h-full object-cover"
                                fill
                                unoptimized={true}
                                draggable={false}
                            />
                        }
                        secondContent={
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-background to-surface/20 backdrop-blur-sm">
                                <p className="font-black text-5xl text-white text-center capitalize">{status} <br /> for freelance</p>
                            </div>
                        }
                        gridSize={12}
                        pixelColor='#ffffff'
                        animationStepDuration={0.4}
                        className="w-full h-full"
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}
