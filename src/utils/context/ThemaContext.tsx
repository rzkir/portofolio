'use client'

import * as React from "react"

import { ThemeProvider as NextThemesProvider } from "next-themes"

import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent theme flash during SSR
    if (!mounted) {
        return (
            <NextThemesProvider {...props} forcedTheme={props.defaultTheme} defaultTheme="system" storageKey="theme-preference"
            >
                <div style={{ visibility: 'hidden' }}>{children}</div>
            </NextThemesProvider>
        )
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 