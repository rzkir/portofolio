"use client"

import Image from 'next/image'

import { motion } from 'framer-motion'

import { youtubeAnimations } from '@/base/animations/animation'

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Pagination } from '@/base/helper/pagination';

import Modal from '@/components/youtube/modal/Modal'

import { useStateYoutube } from '@/components/youtube/lib/useStateYoutube'

export default function YoutubeContent({ youtubeData = [] }: { youtubeData?: YoutubeContentProps[] }) {
    const {
        selectedContent,
        setSelectedContent,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        headingRef,
        categoriesRef,
        contentRef,
        isHeadingInView,
        isCategoriesInView,
        isContentInView,
        categories,
        totalPages,
        paginatedContent
    } = useStateYoutube(youtubeData);

    return (
        <section id="youtube" className='py-4 pb-10 bg-transparent'>
            <div className="container px-4 md:px-6">
                <div ref={headingRef} className='flex flex-col gap-4 items-center justify-center mb-10'>
                    <motion.h2
                        initial={youtubeAnimations.heading.initial}
                        animate={youtubeAnimations.heading.animate(isHeadingInView)}
                        transition={youtubeAnimations.heading.transition}
                        className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient text-center uppercase'
                    >
                        Youtube Content
                    </motion.h2>
                    <motion.p
                        initial={youtubeAnimations.subtitle.initial}
                        animate={youtubeAnimations.subtitle.animate(isHeadingInView)}
                        transition={youtubeAnimations.subtitle.transition}
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
                                initial={youtubeAnimations.category.initial}
                                animate={youtubeAnimations.category.animate(isCategoriesInView)}
                                transition={youtubeAnimations.category.transition(categories.indexOf(category))}
                                whileHover={youtubeAnimations.category.whileHover}
                                whileTap={youtubeAnimations.category.whileTap}
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
                                        transition={youtubeAnimations.categoryActive.transition}
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
                            initial={youtubeAnimations.content.initial}
                            animate={youtubeAnimations.content.animate(isContentInView)}
                            transition={youtubeAnimations.content.transition(index)}
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
                                                    initial={youtubeAnimations.contentTitle.initial}
                                                    animate={youtubeAnimations.contentTitle.animate(isContentInView)}
                                                    transition={youtubeAnimations.contentTitle.transition(index)}
                                                    whileHover={youtubeAnimations.contentTitle.whileHover}
                                                >
                                                    {item.title}
                                                </motion.h3>
                                            </CardHeader>
                                            <motion.p
                                                className="text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-grow"
                                                initial={youtubeAnimations.contentDescription.initial}
                                                animate={youtubeAnimations.contentDescription.animate(isContentInView)}
                                                transition={youtubeAnimations.contentDescription.transition(index)}
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
                                            initial={youtubeAnimations.contentButton.initial}
                                            animate={youtubeAnimations.contentButton.animate(isContentInView)}
                                            transition={youtubeAnimations.contentButton.transition(index)}
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
                        initial={youtubeAnimations.pagination.initial}
                        animate={youtubeAnimations.pagination.animate(isContentInView)}
                        transition={youtubeAnimations.pagination.transition}
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

            <Modal
                selectedContent={selectedContent}
                onClose={() => setSelectedContent(null)}
            />
        </section>
    )
}
