'use client'

import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'

export default function ContactsLoadingOverlay({
    isLoading = true,
    message = "Loading contact form...",
    className = ""
}: ContactsLoadingOverlayProps) {
    const [dots, setDots] = useState('')

    useEffect(() => {
        if (!isLoading) return

        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.')
        }, 500)

        return () => clearInterval(interval)
    }, [isLoading])

    if (!isLoading) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}
        >
            {/* Background with subtle pattern */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-md">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative flex flex-col items-center space-y-8">
                {/* Elegant Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative rounded-xl p-8"
                >
                    <div className="flex flex-col items-center space-y-6">
                        {/* Contact-themed Spinner */}
                        <div className="relative">
                            {/* Outer ring - represents communication */}
                            <motion.div
                                className="w-16 h-16 border-2 border-muted/50 rounded-full"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Spinning ring - represents sending message */}
                            <motion.div
                                className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-primary rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            {/* Inner ring - represents receiving */}
                            <motion.div
                                className="absolute inset-1 w-14 h-14 border-2 border-transparent border-t-ring rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            {/* Center - represents connection */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-2 h-2 bg-primary rounded-full" />
                            </motion.div>
                        </div>

                        {/* Loading Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="text-foreground text-lg font-medium mb-1">
                                {message}{dots}
                            </div>
                            <div className="text-muted-foreground text-sm">
                                Preparing contact form
                            </div>
                        </motion.div>

                        {/* Communication-themed Progress Dots */}
                        <div className="flex space-x-2">
                            {[0, 1, 2].map((index) => (
                                <motion.div
                                    key={index}
                                    className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.4, 1, 0.4]
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: index * 0.2,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Contact-themed decorative elements */}
                        <motion.div
                            className="flex space-x-4 opacity-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.div
                                className="w-8 h-8 border border-muted-foreground/30 rounded-full flex items-center justify-center"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 0.5,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                            </motion.div>
                            <motion.div
                                className="w-8 h-8 border border-muted-foreground/30 rounded-full flex items-center justify-center"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 1,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                            </motion.div>
                            <motion.div
                                className="w-8 h-8 border border-muted-foreground/30 rounded-full flex items-center justify-center"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 1.5,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
