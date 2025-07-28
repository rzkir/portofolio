'use client'

import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'

import ThreeJSRobot from '@/base/Loading/ThreeJSRobot'

interface InitialLoadingOverlayProps {
    isLoading: boolean
    message?: string
    className?: string
}

export default function InitialLoadingOverlay({
    isLoading,
    message = "Loading My Portfolio...",
    className = ""
}: InitialLoadingOverlayProps) {
    const [dots, setDots] = useState('')
    const [progress, setProgress] = useState(0)
    const [startTime] = useState(Date.now())
    const [isCompleting, setIsCompleting] = useState(false)

    useEffect(() => {
        if (!isLoading) return

        // Animated dots
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.')
        }, 500)

        // Progress animation - synchronized with time
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const targetDuration = 2500 // 2.5 seconds to reach 100%
            const newProgress = Math.min((elapsed / targetDuration) * 100, 100)

            setProgress(newProgress)

            // Mark as completing when progress reaches 100%
            if (newProgress >= 100 && !isCompleting) {
                setIsCompleting(true)
            }
        }, 50) // Update more frequently for smoother animation

        return () => {
            clearInterval(dotsInterval)
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
                    setDots('')
                    setIsCompleting(false)
                }, 500)
            } else {
                setProgress(0)
                setDots('')
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
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-sm px-4 ${className}`}
        >
            <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                {/* 3D Text Section */}
                <div className="text-center">
                    {/* 3D Name Text */}
                    <div className="mb-1 sm:mb-2">
                        {'RIZKI RAMADHAN'.split('').map((letter, index) => (
                            <motion.span
                                key={index}
                                className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mx-0.5 sm:mx-1"
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                    rotateX: -60,
                                    scale: 0.8
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    rotateX: 0,
                                    scale: 1
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.08,
                                    ease: "easeOut",
                                    type: "spring",
                                    stiffness: 80,
                                    damping: 12
                                }}
                                style={{
                                    textShadow: `
                                        0 0 15px rgba(255,255,255,0.4),
                                        0 0 30px rgba(255,255,255,0.2),
                                        1px 1px 2px rgba(0,0,0,0.3)
                                    `,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </div>

                    {/* 3D Subtitle Text */}
                    <div>
                        {'My Portfolio'.split('').map((letter, index) => (
                            <motion.span
                                key={index}
                                className="inline-block text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mx-0.5"
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                    rotateX: -30,
                                    scale: 0.7
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    rotateX: 0,
                                    scale: 1
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 1.2 + (index * 0.06),
                                    ease: "easeOut",
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                }}
                                style={{
                                    textShadow: `
                                        0 0 10px rgba(156,163,175,0.3),
                                        0 0 20px rgba(156,163,175,0.1),
                                        1px 1px 1px rgba(0,0,0,0.2)
                                    `,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Three.js Robot Loading Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                    className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
                >
                    <ThreeJSRobot />
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center w-full"
                >
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <motion.div
                        className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {Math.round(Math.min(progress, 100))}% Complete
                    </motion.div>
                </motion.div>

                {/* Animated dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex space-x-2 sm:space-x-3"
                >
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Loading steps */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-center text-gray-400 text-xs sm:text-sm px-2"
                >
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="leading-tight"
                    >
                        Fullstack Developer • Freelancer • Preparing Experience
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
} 