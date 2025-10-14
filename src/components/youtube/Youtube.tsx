"use client"

import React from 'react'

import Modal from '@/components/youtube/modal/Modal'

import { useStateYoutube } from '@/components/youtube/lib/useStateYoutube'

import YoutubeHeader from '@/components/youtube/components/YoutubeHeader'

import YoutubeCategories from '@/components/youtube/components/YoutubeCategories'

import YoutubeGrid from '@/components/youtube/components/YoutubeGrid'

import YoutubePagination from '@/components/youtube/components/YoutubePagination'

export default function YoutubeContent({ youtubeData = [] }: { youtubeData?: YoutubeContentProps[] }) {
    const {
        selectedContent,
        setSelectedContent,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        headingRef,
        categoriesRef,
        contentRef,
        isHeadingInView,
        isCategoriesInView,
        isContentInView,
        categories,
        totalPages,
        paginatedContent
    } = useStateYoutube(youtubeData);

    return (
        <section id="youtube" className='py-4 pb-10 bg-transparent'>
            <div className="container px-4 md:px-6">
                <YoutubeHeader
                    headingRef={headingRef}
                    isHeadingInView={isHeadingInView}
                />

                <YoutubeCategories
                    categoriesRef={categoriesRef}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    isCategoriesInView={isCategoriesInView}
                />

                <YoutubeGrid
                    contentRef={contentRef}
                    paginatedContent={paginatedContent}
                    isContentInView={isContentInView}
                    onWatchDetails={setSelectedContent}
                />

                <YoutubePagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    isContentInView={isContentInView}
                />
            </div>

            <Modal
                selectedContent={selectedContent}
                onClose={() => setSelectedContent(null)}
            />
        </section>
    )
}
