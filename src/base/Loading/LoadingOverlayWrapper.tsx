'use client'

import { useLoading } from "@/context/LoadingContext"
import LoadingOverlay from "@/base/Loading/LoadingOverlay"
import MangcodingStyleSplash from "@/base/Loading/LoadingStyleSplash"

export default function LoadingOverlayWrapper() {
    const { isLoading, loadingMessage, isInitialLoading } = useLoading()

    // Show initial loading overlay for first page load
    if (isInitialLoading) {
        return <MangcodingStyleSplash isLoading={isInitialLoading} />
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