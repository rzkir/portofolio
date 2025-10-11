'use client'

import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'

export default function MangcodingStyleSplash({
    isLoading,
    message = "Loading...",
    className = ""
}: MangcodingStyleSplashProps) {
    const [progress, setProgress] = useState(0)
    const [startTime] = useState(Date.now())
    const [isCompleting, setIsCompleting] = useState(false)

    useEffect(() => {
        if (!isLoading) return

        // Progress animation - synchronized with time
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const targetDuration = 3000 // 3 seconds to reach 100%
            const newProgress = Math.min((elapsed / targetDuration) * 100, 100)

            setProgress(newProgress)

            // Mark as completing when progress reaches 100%
            if (newProgress >= 100 && !isCompleting) {
                setIsCompleting(true)
            }
        }, 50)

        return () => {
            clearInterval(progressInterval)
        }
    }, [isLoading, startTime, isCompleting])

    useEffect(() => {
        if (!isLoading && !isCompleting) {
            // Ensure progress reaches 100% before hiding
            if (progress < 100) {
                setProgress(100)
                setIsCompleting(true)
                // Small delay to show 100% completion
                setTimeout(() => {
                    setProgress(0)
                    setIsCompleting(false)
                }, 500)
            } else {
                setProgress(0)
                setIsCompleting(false)
            }
        }
    }, [isLoading, progress, isCompleting])

    // Don't hide until progress is complete
    if (!isLoading && !isCompleting) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)] ${className}`}
        >
            <div className="flex flex-col items-center space-y-8 max-w-md">
                {/* Logo/Brand Section */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                    className="text-center"
                >
                    {/* Main Logo/Brand */}
                    <motion.div
                        className="text-4xl md:text-5xl font-bold mb-3 text-gray-300"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        RIZKI RAMADHAN
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                        className="text-lg text-gray-500"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Fullstack Developer
                    </motion.div>
                </motion.div>

                {/* Elegant Loading Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="relative"
                >
                    {/* Outer Ring */}
                    <motion.div
                        className="w-20 h-20 border-2 border-gray-300 rounded-full"
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Middle Ring */}
                    <motion.div
                        className="absolute inset-1 w-18 h-18 border-2 border-transparent border-t-gray-400 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Inner Ring */}
                    <motion.div
                        className="absolute inset-2 w-16 h-16 border-2 border-transparent border-t-blue-500 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Center Dot */}
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
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </motion.div>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="w-full max-w-xs"
                >
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <motion.div
                        className="text-center text-gray-500 text-sm mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                    >
                        {Math.round(Math.min(progress, 100))}% Complete
                    </motion.div>
                </motion.div>

                {/* Loading Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-center text-gray-600 text-sm"
                >
                    {message}
                </motion.div>

                {/* Elegant Animated Dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="flex space-x-2"
                >
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                delay: index * 0.3,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="text-center text-gray-500 text-xs"
                >
                    <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        Preparing your experience...
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
} 