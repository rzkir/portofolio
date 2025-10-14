"use client"

import React from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import { youtubeAnimations } from '@/base/animations/animation'

const YoutubeCard = React.memo(function YoutubeCard({
    content,
    index,
    isContentInView,
    onWatchDetails
}: YoutubeCardProps) {
    return (
        <motion.div
            key={content._id}
            initial={youtubeAnimations.content.initial}
            animate={youtubeAnimations.content.animate(isContentInView)}
            transition={youtubeAnimations.content.transition(index)}
        >
            <Card className="group overflow-hidden rounded-xl bg-card text-card-foreground border border-border flex-shrink-0 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10 cursor-pointer w-full p-0">
                <div className={`flex flex-col h-full lg:grid lg:grid-cols-2 lg:gap-0 ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''
                    }`}>
                    {/* Thumbnail */}
                    <div className={`relative w-full aspect-video overflow-hidden lg:w-full lg:aspect-video lg:h-auto ${index % 2 !== 0 ? 'lg:order-last' : 'lg:order-first'
                        }`}>
                        <Image
                            src={content.thumbnail}
                            alt={content.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <CardContent className={`p-4 md:p-6 flex flex-col flex-grow lg:col-span-1 lg:gap-4 ${index % 2 !== 0 ? 'lg:order-first' : 'lg:order-last'
                        }`}>
                        <div className="flex flex-col flex-grow">
                            <CardHeader className="p-0 mb-2 md:mb-3">
                                <motion.h3
                                    className="text-base md:text-lg xl:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2"
                                    initial={youtubeAnimations.contentTitle.initial}
                                    animate={youtubeAnimations.contentTitle.animate(isContentInView)}
                                    transition={youtubeAnimations.contentTitle.transition(index)}
                                    whileHover={youtubeAnimations.contentTitle.whileHover}
                                >
                                    {content.title}
                                </motion.h3>
                            </CardHeader>

                            <motion.p
                                className="text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-grow"
                                initial={youtubeAnimations.contentDescription.initial}
                                animate={youtubeAnimations.contentDescription.animate(isContentInView)}
                                transition={youtubeAnimations.contentDescription.transition(index)}
                            >
                                {content.description}
                            </motion.p>
                        </div>

                        {/* Frameworks */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4 mb-3 md:mb-4">
                            {content.frameworks?.map((framework, frameworkIndex) => (
                                <div
                                    key={frameworkIndex}
                                    className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 bg-secondary rounded-md border border-border text-[10px] md:text-xs font-medium text-secondary-foreground"
                                >
                                    <Image
                                        src={framework.imageUrl}
                                        alt={framework.title}
                                        width={14}
                                        height={14}
                                        className="rounded-full"
                                    />
                                    <span>{framework.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* Watch Button */}
                        <motion.div
                            initial={youtubeAnimations.contentButton.initial}
                            animate={youtubeAnimations.contentButton.animate(isContentInView)}
                            transition={youtubeAnimations.contentButton.transition(index)}
                        >
                            <Button
                                className='w-full md:w-fit text-sm mt-4'
                                onClick={() => onWatchDetails(content)}
                            >
                                Watch Details
                            </Button>
                        </motion.div>
                    </CardContent>
                </div>
            </Card>
        </motion.div>
    )
})

export default YoutubeCard
