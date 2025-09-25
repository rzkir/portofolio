"use client"

import React from 'react'

import { motion } from 'framer-motion'

import { useFooterState } from '@/components/layout/footer/lib/useStateFooter'

export default function Footer() {
    const {
        handleSmoothScroll,
        containerVariants,
        itemVariants,
        floatingVariants,
        socialVariants,
        navVariants,
        navigationLinks,
        socialLinks
    } = useFooterState()

    return (
        <motion.footer
            className="w-full bg-gradient-to-t from-background/90 via-background/80 to-background/60 border-t border-border/30 pt-16 pb-8 relative overflow-hidden rounded-t-2xl"
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
                        {navigationLinks.map((link, index) => (
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
                        {socialLinks.map((social, index) => (
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
                    >
                        Built with <span className="text-primary font-semibold">Next.js</span> &amp; <motion.span
                            className="text-red-500"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >♥</motion.span> by <span className="font-semibold">Rizki Ramadhan</span>
                    </motion.div>
                    <motion.div
                        className="text-xs text-muted-foreground text-center md:text-right"
                    >
                        <span>
                            User Terms & Conditions | Privacy Policy
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.footer>
    )
}
