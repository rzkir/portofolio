"use client"

import React, { useState, useMemo } from 'react'

import Image from 'next/image'

import { motion, useInView } from 'framer-motion'

import { useLenis } from '@/lib/useLenis'

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Pagination } from '@/base/helper/pagination';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function YoutubeContent({ youtubeData = [] }: { youtubeData?: YoutubeContentProps[] }) {
    const [selectedContent, setSelectedContent] = useState<YoutubeContentProps | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const lenis = useLenis();

    const headingRef = React.useRef(null);
    const categoriesRef = React.useRef(null);
    const contentRef = React.useRef(null);

    const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
    const isCategoriesInView = useInView(categoriesRef, { once: true, margin: "-50px" });
    const isContentInView = useInView(contentRef, { once: true, margin: "-50px" });

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(youtubeData.map(item => item.category.toLowerCase())));
        return ['all', ...uniqueCategories];
    }, [youtubeData]);

    const filteredContent = useMemo(() => {
        if (selectedCategory === 'all') return youtubeData;
        return youtubeData.filter(item => item.category.toLowerCase() === selectedCategory);
    }, [youtubeData, selectedCategory]);

    const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
    const paginatedContent = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredContent.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredContent, currentPage]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    React.useEffect(() => {
        if (selectedContent) {
            if (lenis) {
                lenis.stop();
            }

            return () => {
                if (lenis) {
                    lenis.start();
                }
            };
        }
    }, [selectedContent, lenis]);

    return (
        <section id="youtube" className='py-4 pb-10 bg-transparent'>
            <div className="container px-4 md:px-6">
                <div ref={headingRef} className='flex flex-col gap-4 items-center justify-center mb-10'>
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center uppercase'
                    >
                        Youtube Content
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className='text-md font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center capitalize'
                    >
                        Watch Now
                    </motion.p>
                </div>

                {/* Category Toggle */}
                <div ref={categoriesRef} className="mb-6 sm:mb-12 overflow-x-auto pb-2 flex items-center justify-center">
                    <div className="flex items-center justify-start gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit sm:min-w-0">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isCategoriesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: categories.indexOf(category) * 0.1, ease: "easeOut" }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 capitalize cursor-pointer ${selectedCategory === category
                                    ? 'text-primary-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {selectedCategory === category && (
                                    <motion.div
                                        layoutId="activeYoutubeCategory"
                                        className="absolute inset-0 bg-primary rounded-lg"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
                    {paginatedContent.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                        >
                            <Card
                                className="group overflow-hidden rounded-xl bg-card text-card-foreground border border-border flex-shrink-0 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10 cursor-pointer w-full p-0"
                            >
                                <div
                                    className={`flex flex-col h-full lg:grid lg:grid-cols-2 lg:gap-0 ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}
                                >
                                    <div className={`relative w-full aspect-video overflow-hidden lg:w-full lg:aspect-video lg:h-auto ${index % 2 !== 0 ? 'lg:order-last' : 'lg:order-first'}`}>
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <CardContent className={`p-4 md:p-6 flex flex-col flex-grow lg:col-span-1 lg:gap-4 ${index % 2 !== 0 ? 'lg:order-first' : 'lg:order-last'}`}>
                                        <div className="flex flex-col flex-grow">
                                            <CardHeader className="p-0 mb-2 md:mb-3">
                                                <motion.h3
                                                    className="text-base md:text-lg xl:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    {item.title}
                                                </motion.h3>
                                            </CardHeader>
                                            <motion.p
                                                className="text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-grow"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                                            >
                                                {item.description}
                                            </motion.p>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4 mb-3 md:mb-4">
                                            {item.frameworks?.map((framework, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 bg-secondary rounded-md border border-border text-[10px] md:text-xs font-medium text-secondary-foreground"
                                                >
                                                    <Image
                                                        src={framework.imageUrl}
                                                        alt={framework.title}
                                                        width={14}
                                                        height={14}
                                                        className="rounded-full"
                                                    />
                                                    <span>
                                                        {framework.title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 + 0.4, ease: "easeOut" }}
                                        >
                                            <Button
                                                className='w-full md:w-fit text-sm mt-4'
                                                onClick={() => setSelectedContent(item)}
                                            >
                                                Watch Details
                                            </Button>
                                        </motion.div>
                                    </CardContent>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    >
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            className="mt-8"
                        />
                    </motion.div>
                )}
            </div>

            <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
                <DialogContent className="sm:max-w-7xl max-h-full md:max-h-[90vh] overflow-hidden flex flex-col p-4 md:p-6">
                    <DialogHeader className="border-b pb-3 md:pb-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <DialogTitle className="text-xl md:text-2xl font-bold">{selectedContent?.title}</DialogTitle>
                        </motion.div>
                    </DialogHeader>

                    {selectedContent && (
                        <div className="space-y-4 md:space-y-6 overflow-y-auto pr-2 py-3 md:py-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6" data-lenis-prevent>
                                {/* Left Column - Video */}
                                <div className="space-y-4 md:space-y-6">
                                    <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
                                        <iframe
                                            src={selectedContent.href.replace('watch?v=', 'embed/')}
                                            title={selectedContent.title}
                                            className="absolute top-0 left-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <h3 className="text-base md:text-lg font-semibold mb-2">Frameworks Used</h3>
                                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                                            {selectedContent.frameworks?.map((framework, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 bg-secondary rounded-md border border-border text-xs md:text-sm font-medium text-secondary-foreground"
                                                >
                                                    <Image
                                                        src={framework.imageUrl}
                                                        alt={framework.title}
                                                        width={16}
                                                        height={16}
                                                        className="rounded-full"
                                                    />
                                                    <span>{framework.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Content and Frameworks */}
                                <div
                                    className="prose prose-invert max-w-none text-sm md:text-base
                                        [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3 md:[&_p]:mb-4 [&_p:last-child]:mb-0 
                                        [&_span]:text-muted-foreground [&_span]:leading-relaxed
                                        [&_strong]:text-foreground [&_strong]:font-semibold
                                        [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-4 md:[&_h3]:mt-6 [&_h3]:mb-3 md:[&_h3]:mb-4
                                        [&_ol]:list-decimal [&_ol]:pl-4 md:[&_ol]:pl-6 [&_ol]:space-y-1.5 md:[&_ol]:space-y-2 [&_ol]:mb-3 md:[&_ol]:mb-4
                                        [&_li]:text-muted-foreground [&_li]:leading-relaxed
                                        [&_.ql-ui]:hidden
                                        prose-headings:text-foreground
                                        prose-strong:text-foreground
                                        prose-p:text-muted-foreground
                                        prose-li:text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: selectedContent.content }}
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}
