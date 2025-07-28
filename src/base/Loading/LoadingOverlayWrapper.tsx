'use client'

import { useLoading } from "@/utils/context/LoadingContext"

import LoadingOverlay from "@/base/Loading/LoadingOverlay"

import InitialLoadingOverlay from "@/base/Loading/InitialLoadingOverlay"

export default function LoadingOverlayWrapper() {
    const { isLoading, loadingMessage, isInitialLoading } = useLoading()

    // Show initial loading overlay for first page load
    if (isInitialLoading) {
        return <InitialLoadingOverlay isLoading={isInitialLoading} />
    }

    // Show regular loading overlay for other operations
    if (isLoading) {
        return (
            <LoadingOverlay
                isLoading={isLoading}
                message={loadingMessage}
            />
        )
    }

    return null
} 