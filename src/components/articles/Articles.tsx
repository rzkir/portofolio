"use client"

import React from 'react'

import { useLoadingOverlay } from '@/base/Loading/useLoadingOverlay'

import ArticlesHeader from '@/components/articles/components/ArticlesHeader'

import ArticlesGrid from '@/components/articles/components/ArticlesGrid'

export default function Articles({ articlesData }: { articlesData: Article[] }) {
    const { withNavigationLoading } = useLoadingOverlay()

    const handleViewDetails = React.useCallback(async (slug: string) => {
        await withNavigationLoading(`/articles/${slug}`, 'articles')
    }, [withNavigationLoading])

    return (
        <section className='py-10'>
            <div className="container space-y-16 px-6">
                <ArticlesHeader />

                <ArticlesGrid
                    articles={articlesData}
                    onItemClick={handleViewDetails}
                />
            </div>
        </section>
    )
}