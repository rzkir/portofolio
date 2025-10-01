"use client"

import React from 'react'

import { AnimatedCard } from '@/components/about/components/AnimatedCard'

import { AnimatedDescription } from '@/components/about/components/AnimatedDescription'

export default function AboutContent({ aboutData }: { aboutData: AboutContentProps[] }) {
    return (
        <section id="about" className="py-6 md:py-10">
            <div className="container px-4 md:px-6">
                <div className="w-full max-w-4xl mx-auto flex-col flex space-y-2 md:space-y-3">
                    <AnimatedCard data={aboutData[0]} />
                    <AnimatedDescription description={aboutData[0].description} />
                </div>
            </div>
        </section>
    )
} 