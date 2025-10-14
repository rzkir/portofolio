"use client"

import React from 'react'

import { motion } from 'framer-motion'

import { Pagination } from '@/base/helper/pagination'

import { youtubeAnimations } from '@/base/animations/animation'

const YoutubePagination = React.memo(function YoutubePagination({
    totalPages,
    currentPage,
    onPageChange,
    isContentInView
}: YoutubePaginationProps) {
    if (totalPages <= 1) return null

    return (
        <motion.div
            initial={youtubeAnimations.pagination.initial}
            animate={youtubeAnimations.pagination.animate(isContentInView)}
            transition={youtubeAnimations.pagination.transition}
        >
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                className="mt-8"
            />
        </motion.div>
    )
})

export default YoutubePagination
