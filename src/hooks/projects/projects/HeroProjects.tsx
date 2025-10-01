"use client"

import React from 'react'

import LightRays from '@/components/ui/LightRays';

export default function HeroProjects() {
    return (
        <div className='w-full h-[300px] md:h-[500px] relative'>
            <LightRays
                variant="circle"
                pixelSize={6}
                patternScale={3}
                patternDensity={1.2}
                pixelSizeJitter={0.5}
                enableRipples
                rippleSpeed={0.4}
                rippleThickness={0.12}
                rippleIntensityScale={1.5}
                liquid
                liquidStrength={0.12}
                liquidRadius={1.2}
                liquidWobbleSpeed={5}
                speed={0.6}
                edgeFade={0.25}
                transparent
                className='z-20'
            />
            {/* Background overlay beneath LightRays */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 to-background/0" />
            <div className='absolute inset-0 flex items-center justify-center z-10'
            >
                <div className="text-center px-6">
                    <button
                        className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-5 py-2 text-sm font-medium text-foreground/90 backdrop-blur hover:bg-foreground/10 transition-colors"
                        type="button"
                        aria-label="New Background"
                    >
                        <span className="inline-block h-3 w-3 rounded-sm bg-foreground/60" />
                        New Background
                    </button>
                    <h1 className="text-foreground font-extrabold leading-tight tracking-tight">
                        <span className="block text-4xl sm:text-5xl md:text-6xl">It's dangerous to go alone!</span>
                        <span className="block text-4xl sm:text-5xl md:text-6xl mt-1">Take this.</span>
                    </h1>
                </div>
            </div>
        </div>
    )
}
