"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useScrollTo } from '@/lib/useLenis'

export default function Footer() {
    const router = useRouter();
    const scrollTo = useScrollTo();

    const handleSmoothScroll = (path: string) => {
        if (path === '/') {
            if (typeof window !== 'undefined' && window.location.pathname === '/') {
                scrollTo('html', { duration: 1.5 });
            } else {
                router.push('/');
            }
        } else if (path.startsWith('#')) {
            if (typeof window !== 'undefined' && window.location.pathname === '/') {
                scrollTo(path, { offset: -80, duration: 1.5 });
            } else {
                router.push(`/${path}`);
            }
        } else {
            router.push(path);
        }
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity
            }
        }
    }

    const socialVariants = {
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                duration: 0.2
            }
        },
        tap: {
            scale: 0.95
        }
    }

    const navVariants = {
        hover: {
            y: -2,
            color: "hsl(var(--primary))",
            transition: {
                duration: 0.2
            }
        }
    }

    return (
        <motion.footer
            className="w-full bg-gradient-to-t from-background/90 via-background/80 to-background/60 border-t border-border/30 pt-16 pb-8 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            {/* Animated Decorative Blobs */}
            <motion.div
                className="pointer-events-none absolute -top-10 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-0"
                variants={floatingVariants}
                animate="animate"
            />
            <motion.div
                className="pointer-events-none absolute bottom-0 right-0 w-56 h-56 bg-secondary/10 rounded-full blur-2xl z-0"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 2 }}
            />

            <div className="container px-4 relative z-10">
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between gap-10"
                    variants={containerVariants}
                >
                    {/* Brand / Logo */}
                    <motion.div
                        className="flex flex-col items-center md:items-start gap-2"
                        variants={itemVariants}
                    >
                        <motion.span
                            className="text-2xl font-extrabold text-primary tracking-tight"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            Rizki Ramadhan
                        </motion.span>
                        <motion.span
                            className="text-muted-foreground text-xs font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            © 2024 - {new Date().getFullYear()} All rights reserved.
                        </motion.span>
                    </motion.div>

                    {/* Navigation */}
                    <motion.nav
                        className="flex flex-wrap gap-6 text-sm font-medium justify-center"
                        variants={itemVariants}
                    >
                        {[
                            { href: '#home', label: 'Home' },
                            { href: '#about', label: 'About' },
                            { href: '#skills', label: 'Skills' },
                            { href: '#projects', label: 'Projects' },
                            { href: '#contact', label: 'Contact' }
                        ].map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleSmoothScroll(link.href); }}
                                className="hover:text-primary/90 transition-colors duration-200 cursor-pointer"
                                variants={navVariants}
                                whileHover="hover"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.nav>

                    {/* Socials */}
                    <motion.div
                        className="flex gap-5"
                        variants={itemVariants}
                    >
                        {[
                            {
                                href: "https://github.com/Rizkiramadhan20",
                                label: "GitHub",
                                icon: (
                                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                                        />
                                    </svg>
                                )
                            },
                            {
                                href: "https://www.linkedin.com/in/rizki-ramadhan12",
                                label: "LinkedIn",
                                icon: (
                                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                                    </svg>
                                )
                            },
                            {
                                href: "mailto:rr8027896@gmail.com",
                                label: "Email",
                                icon: (
                                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm-16 12V8.99l7.88 6.99c.36.32.88.32 1.24 0L20 8.99V18H4z" />
                                    </svg>
                                )
                            }
                        ].map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="group rounded-full p-2 bg-background/70 border border-border/30 hover:bg-primary/10 transition-all"
                                variants={socialVariants}
                                whileHover="hover"
                                whileTap="tap"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-12 border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <motion.div
                        className="text-xs text-muted-foreground text-center md:text-left"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        Built with <span className="text-primary font-semibold">Next.js</span> &amp; <motion.span
                            className="text-red-500"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >♥</motion.span> by <span className="font-semibold">Rizki Ramadhan</span>
                    </motion.div>
                    <motion.div
                        className="text-xs text-muted-foreground text-center md:text-right"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span>
                            Inspired by modern web design &middot; <motion.a
                                href="https://github.com/Rizkiramadhan20"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary/80"
                                whileHover={{ color: "hsl(var(--primary))" }}
                                transition={{ duration: 0.2 }}
                            >
                                Source
                            </motion.a>
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.footer>
    )
}
