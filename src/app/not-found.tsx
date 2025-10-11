'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    const [currentDigit, setCurrentDigit] = useState(0)

    const digits = ['4', '0', '4']
    const messages = [
        "Oops! This page went on vacation",
        "Looks like this page got lost in cyberspace",
        "This page seems to have disappeared",
        "The page you're looking for is playing hide and seek"
    ]
    const [currentMessage, setCurrentMessage] = useState(0)

    useEffect(() => {

        // Cycle through digits
        const digitInterval = setInterval(() => {
            setCurrentDigit((prev) => (prev + 1) % digits.length)
        }, 1000)

        // Cycle through messages
        const messageInterval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length)
        }, 3000)

        return () => {
            clearInterval(digitInterval)
            clearInterval(messageInterval)
        }
    }, [])

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center relative overflow-hidden py-8 sm:py-16"
        >
            <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
                <div className="text-center space-y-8 sm:space-y-12 md:space-y-16">
                    {/* Animated 404 Display */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
                            {digits.map((digit, index) => (
                                <motion.div
                                    key={index}
                                    className="relative"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                >
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-accent rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                                        {/* Glowing effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/20 to-transparent rounded-xl sm:rounded-2xl" />

                                        {/* Digit */}
                                        <motion.span
                                            className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary-foreground relative z-10"
                                            key={currentDigit}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {digit}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Dynamic Message */}
                    <motion.div
                        className="space-y-4 sm:space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={currentMessage}
                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {messages[currentMessage]}
                            </motion.h2>
                        </AnimatePresence>

                        <motion.p
                            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            Don't worry, even the best explorers sometimes take a wrong turn.
                            Let's get you back on track!
                        </motion.p>
                    </motion.div>

                    {/* Interactive Navigation */}
                    <motion.div
                        className="space-y-6 sm:space-y-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        {/* Main Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                            <Link href="/">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <span className="flex items-center gap-2">
                                            <motion.span
                                                animate={{ x: [-2, 2, -2] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                🏠
                                            </motion.span>
                                            Take Me Home
                                        </span>
                                    </Button>
                                </motion.div>
                            </Link>

                            <Link href="/projects">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300"
                                    >
                                        <span className="flex items-center gap-2">
                                            View My Work
                                            <motion.span
                                                animate={{ x: [-2, 2, -2] }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                            >
                                                🚀
                                            </motion.span>
                                        </span>
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>

                        {/* Quick Links */}
                        <motion.div
                            className="flex flex-wrap gap-4 sm:gap-6 justify-center px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                        >
                            {[
                                { href: "/articles", label: "Articles", icon: "📚" },
                                { href: "/contacts", label: "Contact", icon: "💬" },
                                { href: "/about", label: "About", icon: "👋" }
                            ].map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 px-3 sm:px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-lg hover:bg-accent text-sm sm:text-base"
                                    >
                                        <span className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-300">
                                            {link.icon}
                                        </span>
                                        <span className="font-medium">{link.label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Fun Interactive Element */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                    >
                        <motion.div
                            className="text-muted-foreground text-xs sm:text-sm cursor-pointer px-4"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.location.reload()}
                        >
                            <motion.span
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="inline-block mr-2"
                            >
                                🔄
                            </motion.span>
                            Click to refresh the page
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
