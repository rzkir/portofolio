"use client"

import React from 'react'

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

    return (
        <footer className="w-full bg-gradient-to-t from-background/90 via-background/80 to-background/60 border-t border-border/30 pt-16 pb-8 relative overflow-hidden">
            {/* Decorative Blobs */}
            <div className="pointer-events-none absolute -top-10 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse z-0" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-56 h-56 bg-secondary/10 rounded-full blur-2xl animate-pulse z-0" />
            <div className="container px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* Brand / Logo */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-2xl font-extrabold text-primary tracking-tight">Rizki Ramadhan</span>
                        <span className="text-muted-foreground text-xs font-medium">
                            © 2024 - {new Date().getFullYear()} All rights reserved.
                        </span>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-wrap gap-6 text-sm font-medium justify-center">
                        <a href="#home" onClick={(e) => { e.preventDefault(); handleSmoothScroll('#home'); }} className="hover:text-primary/90 transition-colors duration-200">Home</a>
                        <a href="#about" onClick={(e) => { e.preventDefault(); handleSmoothScroll('#about'); }} className="hover:text-primary/90 transition-colors duration-200">About</a>
                        <a href="#skills" onClick={(e) => { e.preventDefault(); handleSmoothScroll('#skills'); }} className="hover:text-primary/90 transition-colors duration-200">Skills</a>
                        <a href="#projects" onClick={(e) => { e.preventDefault(); handleSmoothScroll('#projects'); }} className="hover:text-primary/90 transition-colors duration-200">Projects</a>
                        <a href="#contact" onClick={(e) => { e.preventDefault(); handleSmoothScroll('#contact'); }} className="hover:text-primary/90 transition-colors duration-200">Contact</a>
                    </nav>
                    {/* Socials */}
                    <div className="flex gap-5">
                        <a
                            href="https://github.com/Rizkiramadhan20"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="group rounded-full p-2 bg-background/70 border border-border/30 hover:bg-primary/10 transition-all"
                        >
                            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/rizki-ramadhan12"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="group rounded-full p-2 bg-background/70 border border-border/30 hover:bg-primary/10 transition-all"
                        >
                            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                            </svg>
                        </a>
                        <a
                            href="mailto:rr8027896@gmail.com"
                            aria-label="Email"
                            className="group rounded-full p-2 bg-background/70 border border-border/30 hover:bg-primary/10 transition-all"
                        >
                            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm-16 12V8.99l7.88 6.99c.36.32.88.32 1.24 0L20 8.99V18H4z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="mt-12 border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-muted-foreground text-center md:text-left">
                        Built with <span className="text-primary font-semibold">Next.js</span> &amp; <span className="text-red-500">♥</span> by <span className="font-semibold">Rizki Ramadhan</span>
                    </div>
                    <div className="text-xs text-muted-foreground text-center md:text-right">
                        <span>
                            Inspired by modern web design &middot; <a href="https://github.com/Rizkiramadhan20" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary/80">Source</a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
