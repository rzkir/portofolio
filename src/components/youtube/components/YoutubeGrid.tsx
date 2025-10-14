"use client"

import React from 'react'

import YoutubeCard from '@/components/youtube/components/YoutubeCard'

interface YoutubeGridProps {
    contentRef: React.RefObject<HTMLDivElement | null>
    paginatedContent: YoutubeContentProps[]
    isContentInView: boolean
    onWatchDetails: (content: YoutubeContentProps) => void
}

const YoutubeGrid = React.memo(function YoutubeGrid({
    contentRef,
    paginatedContent,
    isContentInView,
    onWatchDetails
}: YoutubeGridProps) {
    return (
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
            {paginatedContent.map((content, index) => (
                <YoutubeCard
                    key={content._id}
                    content={content}
                    index={index}
                    isContentInView={isContentInView}
                    onWatchDetails={onWatchDetails}
                />
            ))}
        </div>
    )
})

export default YoutubeGrid