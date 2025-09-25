import React from 'react'

interface OverlayProps {
    variant?: 'default' | 'blur' | 'gradient' | 'dark' | 'light'
    intensity?: 'light' | 'medium' | 'strong'
    className?: string
    children?: React.ReactNode
}

export default function Overlay({
    variant = 'default',
    intensity = 'medium',
    className = '',
    children
}: OverlayProps) {
    const getOverlayStyles = () => {
        const intensities = {
            light: {
                default: 'bg-gradient-to-t from-background via-background/30 to-transparent',
                blur: 'bg-gradient-to-t from-background via-background/20 to-transparent backdrop-blur-sm',
                gradient: 'bg-gradient-to-t from-background via-background/30 to-transparent',
                dark: 'bg-gradient-to-t from-background via-background/40 to-transparent',
                light: 'bg-gradient-to-t from-background/30 via-background/15 to-transparent'
            },
            medium: {
                default: 'bg-gradient-to-t from-background via-background/50 to-transparent',
                blur: 'bg-gradient-to-t from-background via-background/40 to-transparent backdrop-blur-sm',
                gradient: 'bg-gradient-to-t from-background via-background/50 to-transparent',
                dark: 'bg-gradient-to-t from-background via-background/60 to-transparent',
                light: 'bg-gradient-to-t from-background/50 via-background/30 to-transparent'
            },
            strong: {
                default: 'bg-gradient-to-t from-background via-background/70 to-transparent',
                blur: 'bg-gradient-to-t from-background via-background/60 to-transparent backdrop-blur-md',
                gradient: 'bg-gradient-to-t from-background via-background/70 to-transparent',
                dark: 'bg-gradient-to-t from-background via-background/80 to-transparent',
                light: 'bg-gradient-to-t from-background/70 via-background/50 to-transparent'
            }
        }

        return intensities[intensity][variant]
    }

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 h-1/6 ${className}`}>
            {/* Center - lower */}
            <div className={`absolute left-0 top-1/2 bottom-0 right-0 h-1/2 ${getOverlayStyles()}`}></div>

            {/* Content overlay */}
            {children && (
                <div className="relative z-10 h-full flex items-center justify-center">
                    {children}
                </div>
            )}
        </div>
    )
}
