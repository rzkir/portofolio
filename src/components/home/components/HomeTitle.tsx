import React from 'react'

import { motion } from 'framer-motion'

import ShinyText from '@/components/ui/shiny-text'

export default function HomeTitle({ title, isInitialLoading }: HomeTitleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: isInitialLoading ? 0 : 1,
                y: isInitialLoading ? 20 : 0
            }}
            transition={{ duration: 0.5, delay: isInitialLoading ? 0 : 0.2 }}
        >
            <ShinyText
                text={title}
                disabled={isInitialLoading}
                speed={3}
                className="text-lg md:text-xl font-medium mb-2 tracking-wide text-gradient"
            />
        </motion.div>
    )
}
