"use client"

import React from 'react'

import Link from 'next/link'

import { motion } from "framer-motion"

import { projectsAnimations } from '@/base/animations/animation'

const ProjectsHeader = React.memo(function ProjectsHeader({
    categories,
    selectedCategory,
    setSelectedCategory
}: ProjectsHeaderProps) {
    return (
        <motion.div
            initial={projectsAnimations.header.initial}
            whileInView={projectsAnimations.header.animate}
            viewport={{ once: true }}
            transition={projectsAnimations.header.transition}
            className='flex flex-col md:flex-row items-center justify-between gap-4 mb-10'
        >
            <div className="relative flex flex-col gap-2 mb-5">
                <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center uppercase tracking-tight'>
                    Featured Projects
                </h2>
                <Link
                    href="/projects"
                    className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient uppercase tracking-tight'
                >
                    View More
                </Link>
            </div>

            <div className="overflow-x-auto flex items-center justify-start md:justify-center mb-2 md:mb-5 w-full md:w-fit">
                <div className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit md:max-w-full sm:min-w-0">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileInView={projectsAnimations.category.whileInView}
                            viewport={{ once: true }}
                            transition={projectsAnimations.category.transition}
                            className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 capitalize cursor-pointer ${selectedCategory === category
                                ? 'text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {selectedCategory === category && (
                                <motion.div
                                    layoutId="activeProjectCategory"
                                    className="absolute inset-0 bg-primary rounded-lg"
                                    initial={false}
                                    transition={projectsAnimations.categoryActive.transition}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    )
})

export default ProjectsHeader
