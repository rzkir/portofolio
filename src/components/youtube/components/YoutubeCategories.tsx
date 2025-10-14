"use client"

import React from 'react'

import { motion } from 'framer-motion'

import { youtubeAnimations } from '@/base/animations/animation'

interface YoutubeCategoriesProps {
    categoriesRef: React.RefObject<HTMLDivElement | null>
    categories: string[]
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    isCategoriesInView: boolean
}

const YoutubeCategories = React.memo(function YoutubeCategories({
    categoriesRef,
    categories,
    selectedCategory,
    setSelectedCategory,
    isCategoriesInView
}: YoutubeCategoriesProps) {
    return (
        <div ref={categoriesRef} className="mb-6 sm:mb-12 overflow-x-auto pb-2 flex items-center justify-center">
            <div className="flex items-center justify-start gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit sm:min-w-0">
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        initial={youtubeAnimations.category.initial}
                        animate={youtubeAnimations.category.animate(isCategoriesInView)}
                        transition={youtubeAnimations.category.transition(categories.indexOf(category))}
                        whileHover={youtubeAnimations.category.whileHover}
                        whileTap={youtubeAnimations.category.whileTap}
                        className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 capitalize cursor-pointer ${selectedCategory === category
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {selectedCategory === category && (
                            <motion.div
                                layoutId="activeYoutubeCategory"
                                className="absolute inset-0 bg-primary rounded-lg"
                                initial={false}
                                transition={youtubeAnimations.categoryActive.transition}
                            />
                        )}
                        <span className="relative z-10">{category}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    )
})

export default YoutubeCategories