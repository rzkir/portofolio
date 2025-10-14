"use client"

import React from 'react'

import ProjectCard from '@/components/projects/components/ProjectCard'

const ProjectsMobile = React.memo(function ProjectsMobile({
    displayedProjects,
    activeIndex,
    setActiveIndex,
    onViewDetails,
    onPreview
}: ProjectsMobileProps) {
    const handleToggleActive = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div className='md:hidden'>
            <div className='flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory'>
                {displayedProjects.map((project, idx) => {
                    const isActive = activeIndex === idx
                    return (
                        <ProjectCard
                            key={idx}
                            project={project}
                            index={idx}
                            isActive={isActive}
                            onViewDetails={onViewDetails}
                            onPreview={onPreview}
                            onToggleActive={handleToggleActive}
                            showLiveDemo={true}
                            className="w-[85vw] flex-shrink-0 snap-center"
                        />
                    )
                })}
            </div>
        </div>
    )
})

export default ProjectsMobile
