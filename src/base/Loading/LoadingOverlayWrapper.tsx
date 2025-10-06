'use client'

import { useLoading } from "@/context/LoadingContext"

import LoadingOverlay from "@/base/Loading/LoadingOverlay"

import ArticlesLoadingOverlay from "@/base/Loading/ArticlesLoadingOverlay"

import ProjectsLoadingOverlay from "@/base/Loading/ProjectsLoadingOverlay"

import MangcodingStyleSplash from "@/base/Loading/LoadingStyleSplash"

export default function LoadingOverlayWrapper() {
    const { isLoading, loadingMessage, loadingType, isInitialLoading } = useLoading()

    // Show initial loading overlay for first page load
    if (isInitialLoading) {
        return <MangcodingStyleSplash isLoading={isInitialLoading} />
    }

    // Show regular loading overlay for other operations
    if (isLoading) {
        // Show specific loading overlay based on type
        if (loadingType === 'projects') {
            return (
                <ProjectsLoadingOverlay
                    isLoading={isLoading}
                    message={loadingMessage}
                />
            )
        }

        if (loadingType === 'articles') {
            return (
                <ArticlesLoadingOverlay
                    isLoading={isLoading}
                    message={loadingMessage}
                />
            )
        }

        // Default loading overlay for general operations
        return (
            <LoadingOverlay
                isLoading={isLoading}
                message={loadingMessage}
            />
        )
    }

    return null
} 