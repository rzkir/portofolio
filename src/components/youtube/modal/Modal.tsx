"use client"

import React from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function Modal({ selectedContent, onClose }: ModalProps) {
    return (
        <Dialog open={!!selectedContent} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-full md:max-h-[95vh] overflow-hidden flex flex-col p-0 bg-gradient-to-br from-background/98 via-background/95 to-background/98 backdrop-blur-3xl border border-border/10 shadow-2xl shadow-primary/10 rounded-3xl">
                {/* Ultra Modern Header */}
                <DialogHeader className="px-6 py-6 border-b border-border/20 bg-gradient-to-r from-primary/8 via-primary/5 to-primary/8 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex-1">
                            <DialogTitle className="text-2xl font-bold text-foreground leading-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text">
                                {selectedContent?.title}
                            </DialogTitle>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mt-3 flex items-center gap-3"
                            >
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full border border-primary/30">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                    <span className="text-sm text-primary font-semibold">
                                        {selectedContent?.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Video Content</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-6" data-lenis-prevent>
                        {/* Premium Video Section */}
                        <div className="p-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="relative w-full overflow-hidden rounded-3xl shadow-2xl shadow-primary/15 border border-border/10"
                                style={{ paddingTop: '56.25%' }}
                            >
                                {/* Premium Video Container */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent rounded-3xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl"></div>

                                <iframe
                                    src={selectedContent?.href.replace('watch?v=', 'embed/')}
                                    title={selectedContent?.title}
                                    className="absolute top-0 left-0 w-full h-full border-0 rounded-3xl"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />

                                {/* Premium overlay effects */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl pointer-events-none"></div>
                                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>

                        {/* Premium Technologies Section */}
                        <div className="px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-gradient-to-br from-muted/40 via-muted/30 to-muted/40 rounded-3xl p-6 border border-border/10 backdrop-blur-xl shadow-lg"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">
                                            Technologies Used
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Frameworks and tools utilized in this project
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {selectedContent?.frameworks?.map((framework, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                                            whileHover={{ scale: 1.08, y: -4 }}
                                            className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-background/90 to-background/80 backdrop-blur-sm rounded-2xl border border-border/20 text-sm font-semibold text-foreground hover:bg-gradient-to-r hover:from-background hover:to-background/90 hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-xl"
                                        >
                                            <Image
                                                src={framework.imageUrl}
                                                alt={framework.title}
                                                width={24}
                                                height={24}
                                                className="rounded-lg"
                                            />
                                            <span className="font-bold">{framework.title}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Premium Content Section */}
                        <div className="px-6 pb-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="bg-gradient-to-br from-card/60 via-card/40 to-card/60 rounded-3xl p-6 border border-border/10 backdrop-blur-xl shadow-lg"
                            >
                                <div className="prose prose-base md:prose-lg max-w-none
                                        [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_p:last-child]:mb-0 
                                        [&_span]:text-muted-foreground [&_span]:leading-relaxed
                                        [&_strong]:text-foreground [&_strong]:font-bold
                                        [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-10 [&_h3]:mb-6 [&_h3]:border-b-2 [&_h3]:border-primary/30 [&_h3]:pb-3
                                        [&_h4]:text-lg md:[&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-foreground [&_h4]:mt-8 [&_h4]:mb-4
                                        [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:space-y-4 [&_ol]:mb-8
                                        [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:space-y-4 [&_ul]:mb-8
                                        [&_li]:text-muted-foreground [&_li]:leading-relaxed
                                        [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-8 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-8 [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-muted/40 [&_blockquote]:to-muted/20 [&_blockquote]:py-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:pr-6
                                        [&_code]:bg-gradient-to-r [&_code]:from-muted/80 [&_code]:to-muted/60 [&_code]:px-4 [&_code]:py-2 [&_code]:rounded-lg [&_code]:text-sm [&_code]:font-mono [&_code]:text-foreground [&_code]:border [&_code]:border-border/30 [&_code]:shadow-sm
                                        [&_pre]:bg-gradient-to-r [&_pre]:from-muted/80 [&_pre]:to-muted/60 [&_pre]:p-8 [&_pre]:rounded-2xl [&_pre]:overflow-x-auto [&_pre]:my-8 [&_pre]:border [&_pre]:border-border/30 [&_pre]:shadow-lg
                                        [&_a]:text-primary [&_a]:no-underline [&_a]:hover:underline [&_a]:font-semibold [&_a]:transition-all [&_a]:hover:text-primary/80
                                        [&_.ql-ui]:hidden"
                                    dangerouslySetInnerHTML={{ __html: selectedContent?.content || '' }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
