"use client"

import React from 'react'

import { Button } from "@/components/ui/button"

import { Switch } from "@/components/ui/switch"

import { useTheme } from "next-themes"

import { useRouter } from 'next/navigation'

import { motion, AnimatePresence } from "framer-motion";

import { navLink, SocialMedia } from "@/components/layout/header/data/Header"

import { useScrollTo } from '@/lib/useLenis'

export default function Header() {
    const { theme, setTheme } = useTheme()

    const [mounted, setMounted] = React.useState(false)

    const router = useRouter();
    const scrollTo = useScrollTo();

    // State untuk modal menu
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const handleSmoothScroll = (path: string) => {
        setIsMenuOpen(false);

        if (path === '/') {
            // Check if we're already on the home page
            if (window.location.pathname === '/') {
                // Scroll to top using Lenis
                scrollTo('html', { duration: 1.5 });
            } else {
                // Navigate to home page
                router.push('/');
            }
        } else if (path.startsWith('#')) {
            // Check if we're on the home page
            if (window.location.pathname === '/') {
                // Scroll to section using Lenis
                scrollTo(path, {
                    offset: -80, // Account for header height
                    duration: 1.5
                });
            } else {
                // Navigate to home page with hash
                router.push(`/${path}`);
            }
        } else {
            // Regular navigation
            router.push(path);
        }
    }

    const text = "rizki ramadhan.";

    return (
        <>
            <motion.header
                className="w-full px-4 sm:px-6 py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='container mx-auto flex justify-between items-center'>
                    <motion.div
                        className="text-base sm:text-lg font-medium tracking-wide relative group cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleSmoothScroll('/')}
                    >
                        <motion.div className="w-full flex flex-col items-center justify-center py-2">
                            <div className="font-light text-2xl sm:text-3xl select-none tracking-wide text-foreground flex">
                                {text.split('').map((char, index) => (
                                    <motion.span
                                        key={index}
                                        onHoverStart={() => setHoveredIndex(index)}
                                        onHoverEnd={() => setHoveredIndex(null)}
                                        animate={{
                                            y: hoveredIndex === index ? -5 : 0,
                                            scale: hoveredIndex === index ? 1.2 : 1,
                                            color: hoveredIndex === index ? theme === 'dark' ? '#60A5FA' : '#2563EB' : 'inherit'
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10
                                        }}
                                        className="inline-block"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="flex items-center">
                            {/* Dark mode toggle */}
                            {mounted && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Switch
                                            id="theme-toggle"
                                            checked={theme === 'dark'}
                                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                            thumbContent={
                                                theme === 'light' ? (
                                                    <motion.svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        key="light-icon"
                                                        initial={{ rotate: 0, opacity: 0 }}
                                                        animate={{ rotate: -360, opacity: 1 }}
                                                        exit={{ rotate: 0, opacity: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <circle cx="12" cy="12" r="4" />
                                                        <path d="M12 2v2m0 16v2m9-9h-2M5 12H3m14.85-6.85L16.4 7.6M7.6 16.4l-1.45 1.45m0-9.9L7.6 7.6M16.4 16.4l1.45 1.45" />
                                                    </motion.svg>
                                                ) : (
                                                    <motion.svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                        viewBox="0 0 24 24"
                                                        key="dark-icon"
                                                        initial={{ rotate: 0, opacity: 0 }}
                                                        animate={{ rotate: 360, opacity: 1 }}
                                                        exit={{ rotate: 0, opacity: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <circle cx="12" cy="12" r="11" fill="#60A5FA" />
                                                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="#FCD34D" />
                                                    </motion.svg>
                                                )
                                            }
                                        />
                                    </motion.div>
                                </>
                            )}
                        </div>
                        {/* Menu button */}
                        <Button variant="outline" onClick={() => setIsMenuOpen(true)} className="p-2 sm:p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </Button>
                    </div>
                </div>

            </motion.header>
            {/* Modal Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                        onClick={() => setIsMenuOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-background w-full h-full mx-auto flex flex-col justify-center items-center relative gap-8 sm:gap-12 px-4 sm:px-10 py-6 sm:py-16 rounded-none sm:rounded-2xl shadow-2xl"
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                        >
                            {/* Close button */}
                            <motion.button
                                className="absolute top-4 right-4 sm:top-8 sm:right-10 text-foreground text-2xl sm:text-4xl hover:text-muted-foreground z-10 focus:outline-none focus:ring-2 focus:ring-ring"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Close"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                &times;
                            </motion.button>
                            {/* Main menu */}
                            <nav className="flex flex-col gap-6 sm:gap-8 w-full mt-8 sm:mt-10">
                                {navLink.map((item, index) => (
                                    <motion.div
                                        key={item.number}
                                        className="flex items-center justify-between group cursor-pointer"
                                        onClick={() => handleSmoothScroll(item.path)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.3
                                        }}
                                    >
                                        <motion.div
                                            className="text-2xl sm:text-5xl font-bold text-foreground transition-all duration-200 group-hover:tracking-wide"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            {item.label} <span className="text-muted-foreground text-base sm:text-lg align-top">({item.number})</span>
                                        </motion.div>
                                        <motion.button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSmoothScroll(item.path);
                                            }}
                                            className="border border-border rounded-full p-1.5 sm:p-3 group-hover:bg-accent transition-colors duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="sr-only">Go to {item.label}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </nav>
                            {/* Footer menu modal */}
                            <motion.div
                                className="border-t border-border pt-6 sm:pt-8 flex flex-col md:flex-row justify-between gap-6 sm:gap-8 w-full mt-6 sm:mt-10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="font-semibold text-muted-foreground mb-2">Follow me.</div>
                                    <div className="flex flex-wrap gap-3 sm:gap-4 text-foreground text-xs sm:text-sm">
                                        {SocialMedia.map((social, index) => (
                                            <motion.a
                                                key={social.label}
                                                href={social.path}
                                                className="hover:underline flex items-center gap-1 transition-colors duration-200 hover:text-primary"
                                                whileHover={{ x: 5 }}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                            >
                                                {social.label} <span>↗</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="w-full md:max-w-xs"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <div className="font-semibold text-muted-foreground mb-2">Stay connected w/ me.</div>
                                    <form className="flex items-center gap-2">
                                        <motion.input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="bg-transparent border-b border-border text-foreground px-2 py-1 outline-none w-full placeholder-muted-foreground text-sm sm:text-base"
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                        <motion.div
                                            className="text-foreground text-lg sm:text-xl hover:text-primary transition-colors duration-200"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            ↗
                                        </motion.div>
                                    </form>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
