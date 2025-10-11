"use client"

import React from 'react'

import Image from 'next/image'

import { ExternalLink, Eye } from "lucide-react"

import { Card, CardTitle, CardDescription } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"

import { projectsAnimations } from '@/base/animations/animation'

import Link from 'next/link'

import Preview from '@/components/projects/modal/Priview'

import { useStateProjects } from './lib/useStateProjects'

const ProjectsContent = React.memo(function ProjectsContent({ projectsData }: { projectsData: ProjectsContentProps[] }) {
    const {
        activeIndex,
        setActiveIndex,
        selectedCategory,
        setSelectedCategory,
        previewProject,
        setPreviewProject,
        categories,
        displayedProjects,
        topProject,
        middleProjects,
        bottomProjects,
        handlePreview,
        handleViewDetails
    } = useStateProjects(projectsData);

    return (
        <section id="projects" className="py-16 bg-gradient-to-b from-background to-background/95">
            <div className="container px-4 md:px-6">
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

                        <Link href="/projects" className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient uppercase tracking-tight'>View More</Link>
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

                <div className='md:flex flex-col gap-8 hidden'>
                    {topProject && (
                        <motion.div
                            initial={projectsAnimations.project.initial}
                            whileInView={projectsAnimations.project.animate}
                            viewport={{ once: true }}
                            transition={projectsAnimations.project.transition(0)}
                            className="group w-full"
                        >
                            <Card className={`relative overflow-hidden border-border/50 transition-all duration-500 hover:border-primary/50 p-0 ${activeIndex === 0 ? 'bg-card/50' : 'hover:bg-card/50'} backdrop-blur-sm`}>
                                <div className="relative aspect-[16/9] md:aspect-[19/9] w-full overflow-hidden">
                                    <Image
                                        src={topProject.thumbnail}
                                        alt={topProject.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 1400px"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">{`0${1}`}</span>
                                            <CardTitle className="text-2xl font-semibold tracking-tight">{topProject.title}</CardTitle>
                                        </div>

                                        <CardDescription className="text-base line-clamp-2 mb-4 max-w-2xl">
                                            {topProject.description}
                                        </CardDescription>

                                        <div className="flex flex-wrap gap-3">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                onClick={() => handleViewDetails(topProject.slug)}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Lihat Details
                                            </Button>

                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                onClick={() => handlePreview(topProject)}
                                            >
                                                <Eye className="w-4 h-4" />
                                                Preview
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    <div className='flex flex-wrap gap-4 justify-center'>
                        {middleProjects.map((item, idx) => {
                            const actualIndex = idx + 1;
                            const isActive = activeIndex === actualIndex;
                            return (
                                <motion.div
                                    key={actualIndex}
                                    initial={projectsAnimations.project.initial}
                                    whileInView={projectsAnimations.project.animate}
                                    viewport={{ once: true }}
                                    transition={projectsAnimations.project.transition(idx)}
                                    className="group w-full md:w-[calc(33.333%-15px)]"
                                >
                                    <Card className={`relative overflow-hidden border-border/50 transition-all duration-500 hover:border-primary/50 p-0 ${isActive ? 'bg-card/50' : 'hover:bg-card/50'} backdrop-blur-sm`}>
                                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">{`0${actualIndex + 1}`}</span>
                                                    <CardTitle className="text-xl font-semibold tracking-tight">{item.title}</CardTitle>
                                                </div>

                                                <CardDescription className="text-sm line-clamp-2 mb-4">
                                                    {item.description}
                                                </CardDescription>

                                                <div className="flex flex-wrap gap-3">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                        onClick={() => handleViewDetails(item.slug)}
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Lihat Details
                                                    </Button>

                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                        onClick={() => handlePreview(item)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        Preview
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className='flex flex-wrap gap-4 justify-center'>
                        {bottomProjects.map((item, idx) => {
                            const actualIndex = idx + 4;
                            const isActive = activeIndex === actualIndex;
                            return (
                                <motion.div
                                    key={actualIndex}
                                    initial={projectsAnimations.project.initial}
                                    whileInView={projectsAnimations.project.animate}
                                    viewport={{ once: true }}
                                    transition={projectsAnimations.project.transition(idx)}
                                    className="group w-full md:w-[calc(50%-16px)]"
                                >
                                    <Card className={`relative overflow-hidden border-border/50 transition-all duration-500 hover:border-primary/50 p-0 ${isActive ? 'bg-card/50' : 'hover:bg-card/50'} backdrop-blur-sm`}>
                                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">{`0${actualIndex + 1}`}</span>
                                                    <CardTitle className="text-xl font-semibold tracking-tight">{item.title}</CardTitle>
                                                </div>

                                                <CardDescription className="text-sm line-clamp-2 mb-4">
                                                    {item.description}
                                                </CardDescription>

                                                <div className="flex flex-wrap gap-3">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                        onClick={() => handleViewDetails(item.slug)}
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Lihat Details
                                                    </Button>

                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                        onClick={() => handlePreview(item)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        Preview
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                <div className='md:hidden'>
                    <div className='flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory'>
                        {displayedProjects.map((item, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className="group w-[85vw] flex-shrink-0 snap-center"
                                    onClick={() => setActiveIndex(isActive ? -1 : idx)}
                                >
                                    <Card className={`relative overflow-hidden border-border/50 transition-all duration-500 hover:border-primary/50 p-0 ${isActive ? 'bg-card/50' : 'hover:bg-card/50'} backdrop-blur-sm`}>
                                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 85vw, 1400px"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`} />

                                            <div className={`absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-full'} md:translate-y-full md:group-hover:translate-y-0`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">{`0${idx + 1}`}</span>
                                                    <CardTitle className="text-xl font-semibold tracking-tight linc line-clamp-1 md:line-clamp-2">{item.title}</CardTitle>
                                                </div>

                                                <CardDescription className="text-sm line-clamp-2 mb-4">
                                                    {item.description}
                                                </CardDescription>

                                                <div className="flex flex-wrap gap-3">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                        onClick={() => handleViewDetails(item.slug)}
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Lihat Details
                                                    </Button>

                                                    {item.previewLink && (
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                            asChild
                                                        >
                                                            <Link href={item.previewLink} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="w-4 h-4" />
                                                                Live Demo
                                                            </Link>
                                                        </Button>
                                                    )}

                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                                                        onClick={() => handlePreview(item)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        Preview
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>


            </div>

            <Preview previewProject={previewProject} setPreviewProject={setPreviewProject} />
        </section>
    )
})

export default ProjectsContent