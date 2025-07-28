'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface LoadingContextType {
    isLoading: boolean
    loadingMessage: string
    showLoading: (message?: string) => void
    hideLoading: () => void
    isInitialLoading: boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('Loading...')
    const [isInitialLoading, setIsInitialLoading] = useState(true) // Keep this true for styling

    useEffect(() => {
        // Always show loading for at least 2.5 seconds for better UX and progress completion
        const minLoadingTime = setTimeout(() => {
            // Check if page is already loaded
            if (document.readyState === 'complete') {
                // Add small delay to ensure progress bar completes
                setTimeout(() => {
                    setIsInitialLoading(false)
                }, 500)
                return
            }

            // Listen for page load completion
            const handleLoad = () => {
                // Add a delay for smooth transition and progress completion
                setTimeout(() => {
                    setIsInitialLoading(false)
                }, 800)
            }

            window.addEventListener('load', handleLoad)

            // Fallback: hide loading after 3.5 seconds max
            const fallbackTimer = setTimeout(() => {
                setIsInitialLoading(false)
            }, 3500)

            return () => {
                window.removeEventListener('load', handleLoad)
                clearTimeout(fallbackTimer)
            }
        }, 2500) // Minimum 2.5 seconds loading time

        return () => {
            clearTimeout(minLoadingTime)
        }
    }, [])

    const showLoading = React.useCallback((message: string = 'Loading...') => {
        setLoadingMessage(message)
        setIsLoading(true)
    }, [])

    const hideLoading = React.useCallback(() => {
        setIsLoading(false)
        setLoadingMessage('Loading...')
    }, [])

    const contextValue = React.useMemo(() => ({
        isLoading: isLoading || isInitialLoading,
        loadingMessage: isInitialLoading ? 'Loading My Portfolio...' : loadingMessage,
        showLoading,
        hideLoading,
        isInitialLoading
    }), [isLoading, isInitialLoading, loadingMessage, showLoading, hideLoading])

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    const context = useContext(LoadingContext)
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider')
    }
    return context
} 