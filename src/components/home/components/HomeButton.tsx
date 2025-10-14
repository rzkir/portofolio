import React from 'react'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'

import Link from 'next/link'

export default function HomeButton({ href, label, description, isInitialLoading }: HomeButtonProps) {
    return (
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: isInitialLoading ? 0 : 1,
                    y: isInitialLoading ? 20 : 0
                }}
                transition={{ duration: 0.5, delay: isInitialLoading ? 0 : 0.8 }}
            >
                <Button
                    className="group relative rounded-full px-8 py-6 button-modern
                    text-lg font-semibold 
                    min-h-[44px] min-w-[44px]
                    shadow-glow hover:shadow-glow-secondary
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                    before:via-white/40 before:to-transparent before:translate-x-[-100%] 
                    before:transition-transform before:duration-300 hover:before:translate-x-[100%]
                    after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent 
                    after:via-white/30 after:to-transparent after:translate-x-[-100%] 
                    after:transition-transform after:duration-300 after:delay-50 hover:after:translate-x-[100%] overflow-hidden"
                >
                    <Link href={href} className="flex items-center gap-3 px-2 py-1 min-h-[44px] min-w-[44px]">
                        {label}
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </Link>
                </Button>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: isInitialLoading ? 0 : 1,
                    y: isInitialLoading ? 20 : 0
                }}
                transition={{ duration: 0.5, delay: isInitialLoading ? 0 : 1.0 }}
                className="max-w-2xl md:text-right text-base text-muted-foreground leading-relaxed"
            >
                {description}
            </motion.p>
        </div>
    )
}
