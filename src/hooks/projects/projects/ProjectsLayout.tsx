"use client"

import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import FlowingMenu from "@/components/ui/FlowingMenu";

import { motion } from 'framer-motion'

import { LayoutGrid, List, ChevronDown } from 'lucide-react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useLoadingOverlay } from '@/base/Loading/useLoadingOverlay'

export default function ProjectLayout({ projectsData }: { projectsData: ProjectsContentProps[] }) {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
    const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [buttonSize, setButtonSize] = React.useState<{ width: number; height: number }>({ width: 0, height: 0 })
    const buttonRef = React.useRef<HTMLDivElement | null>(null)
    const [layoutMode, setLayoutMode] = React.useState<'grid' | 'column'>('grid')
    const [visibleCount, setVisibleCount] = React.useState<number>(6)
    const sentinelRef = React.useRef<HTMLDivElement | null>(null)
    const { withNavigationLoading } = useLoadingOverlay()

    const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
    const categories = React.useMemo(() => {
        const unique = Array.from(new Set((projectsData || []).map((p) => (p.category || '').toLowerCase()))).filter(Boolean)
        return ['all', ...unique]
    }, [projectsData])
    const filteredProjects = React.useMemo(() => {
        if (selectedCategory === 'all') return projectsData
        return (projectsData || []).filter((p) => (p.category || '').toLowerCase() === selectedCategory)
    }, [projectsData, selectedCategory])

    const displayedProjects = React.useMemo(() => {
        return (filteredProjects || []).slice(0, Math.min(visibleCount, (filteredProjects || []).length))
    }, [filteredProjects, visibleCount])

    React.useLayoutEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            setButtonSize({ width: rect.width, height: rect.height })
        }
    }, [])

    React.useEffect(() => {
        setVisibleCount(6)
    }, [selectedCategory])

    React.useEffect(() => {
        if (layoutMode !== 'grid') return
        const node = sentinelRef.current
        if (!node) return

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
                setVisibleCount((prev) => {
                    const next = prev + 6
                    const max = (filteredProjects || []).length
                    return next > max ? max : next
                })
            }
        }, { rootMargin: '200px' })

        observer.observe(node)
        return () => observer.disconnect()
    }, [layoutMode, filteredProjects])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
        if (layoutMode !== 'grid') return
        const rect = e.currentTarget.getBoundingClientRect()
        setHoveredIndex(idx)
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleMouseLeave = () => {
        if (layoutMode !== 'grid') return
        setHoveredIndex(null)
    }

    const handleViewDetails = React.useCallback(async (slug: string) => {
        await withNavigationLoading(`/projects/${slug}`, 'projects')
    }, [withNavigationLoading])

    return (
        <section className='py-6 sm:py-8 lg:py-10'>
            <div className="container px-4 md:px-6">
                <div className='mb-4 sm:mb-8 flex justify-between gap-3 sm:gap-4'>
                    {/* Mobile: Select dropdown and controls */}
                    <div className='block sm:hidden w-full'>
                        <div className='flex items-center gap-3'>
                            <div className='flex-1'>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category} className="capitalize">
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <Button
                                    type="button"
                                    variant={layoutMode === 'grid' ? 'default' : 'secondary'}
                                    aria-pressed={layoutMode === 'grid'}
                                    aria-label="Grid view"
                                    onClick={() => setLayoutMode('grid')}
                                    className='h-8 w-8 p-0 flex items-center justify-center'
                                >
                                    <LayoutGrid className='h-4 w-4' aria-hidden="true" />
                                    <span className='sr-only'>Grid view</span>
                                </Button>

                                <Button
                                    type="button"
                                    variant={layoutMode === 'column' ? 'default' : 'secondary'}
                                    aria-pressed={layoutMode === 'column'}
                                    aria-label="List view"
                                    onClick={() => setLayoutMode('column')}
                                    className='h-8 w-8 p-0 flex items-center justify-center'
                                >
                                    <List className='h-4 w-4' aria-hidden="true" />
                                    <span className='sr-only'>List view</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Horizontal scroll buttons */}
                    <div className='hidden sm:block overflow-x-auto scrollbar-hide w-full sm:w-fit'>
                        <div className='flex items-center gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit min-w-0'>
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    whileInView={{ scale: [0.95, 1] }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.25 }}
                                    className={`relative px-2.5 sm:px-3 md:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium whitespace-nowrap transition-colors duration-200 capitalize cursor-pointer ${selectedCategory === category ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {selectedCategory === category && (
                                        <motion.div
                                            layoutId="activeProjectCategory"
                                            className="absolute inset-0 bg-primary rounded-lg"
                                            initial={false}
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className='relative z-10'>{category}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className='hidden sm:flex items-center gap-1.5 sm:gap-2 self-start sm:self-center w-full sm:w-fit'>
                        <Button
                            type="button"
                            variant={layoutMode === 'grid' ? 'default' : 'secondary'}
                            aria-pressed={layoutMode === 'grid'}
                            aria-label="Grid view"
                            onClick={() => setLayoutMode('grid')}
                            className='h-8 w-8 sm:h-9 sm:w-9 p-0 flex items-center justify-center'
                        >
                            <LayoutGrid className='h-4 w-4 sm:h-[18px] sm:w-[18px]' aria-hidden="true" />
                            <span className='sr-only'>Grid view</span>
                        </Button>

                        <Button
                            type="button"
                            variant={layoutMode === 'column' ? 'default' : 'secondary'}
                            aria-pressed={layoutMode === 'column'}
                            aria-label="List view"
                            onClick={() => setLayoutMode('column')}
                            className='h-8 w-8 sm:h-9 sm:w-9 p-0 flex items-center justify-center'
                        >
                            <List className='h-4 w-4 sm:h-[18px] sm:w-[18px]' aria-hidden="true" />
                            <span className='sr-only'>List view</span>
                        </Button>
                    </div>
                </div>

                {layoutMode === 'grid' ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
                        {
                            displayedProjects.map((item, idx) => {
                                return (
                                    <Card
                                        key={idx}
                                        className='relative group flex flex-col p-0 overflow-hidden bg-transparent border-none outline-none shadow-none'
                                    >

                                        <CardHeader
                                            className='relative z-[1] aspect-[16/9] overflow-hidden cursor-pointer'
                                            onClick={() => handleViewDetails(item.slug)}
                                            onMouseMove={(e) => handleMouseMove(e as unknown as React.MouseEvent<HTMLDivElement>, idx)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <Image src={item.thumbnail} alt={item.title} fill className='object-cover transition duration-300 group-hover:brightness-70' />
                                            <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300' />

                                            <motion.div
                                                className='pointer-events-none absolute top-0 left-0'
                                                animate={{
                                                    x: mousePosition.x - 120,
                                                    y: mousePosition.y - 120,
                                                    opacity: hoveredIndex === idx ? 0.18 : 0,
                                                    scale: hoveredIndex === idx ? 1 : 0.9,
                                                }}
                                                transition={{
                                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                                    y: { type: 'spring', stiffness: 300, damping: 30 },
                                                    opacity: { duration: 0.2 },
                                                }}
                                                style={{
                                                    width: 240,
                                                    height: 240,
                                                    borderRadius: '9999px',
                                                    background: 'radial-gradient(closest-side, var(--color-primary) 0%, transparent 70%)',
                                                    filter: 'blur(20px)'
                                                }}
                                            />

                                            <Link href={`/projects/${item.slug}`}>
                                                <motion.div
                                                    aria-label="View details"
                                                    className='absolute z-[2] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] shadow-lg hover:shadow-xl active:scale-95 transition-[box-shadow,transform]'
                                                    initial={false}
                                                    animate={{
                                                        left: mousePosition.x - (buttonSize.width / 2),
                                                        top: mousePosition.y - (buttonSize.height / 2),
                                                        opacity: hoveredIndex === idx ? 1 : 0,
                                                        scale: hoveredIndex === idx ? 1 : 0.95
                                                    }}
                                                    transition={{
                                                        left: { type: 'spring', stiffness: 400, damping: 30 },
                                                        top: { type: 'spring', stiffness: 400, damping: 30 },
                                                        opacity: { duration: 0.15 },
                                                        scale: { duration: 0.15 }
                                                    }}
                                                    ref={buttonRef}
                                                >
                                                    View details
                                                </motion.div>
                                            </Link>
                                        </CardHeader>

                                        <CardContent className='relative z-[1] p-0 pb-2 flex flex-col gap-1.5 sm:gap-2'>
                                            <CardTitle className='text-sm sm:text-base lg:text-lg leading-tight'>{item.title}</CardTitle>
                                            <CardDescription className='text-xs sm:text-sm text-muted-foreground line-clamp-2'>{item.description}</CardDescription>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                        {(displayedProjects.length < (filteredProjects || []).length) && (
                            <div ref={sentinelRef} className='col-span-full h-8' aria-hidden="true" />
                        )}
                    </div>
                ) : (
                    <div className='h-[70vh] sm:h-[80vh] lg:h-screen relative'>
                        <FlowingMenu items={filteredProjects.map((item) => ({ link: `/projects/${item.slug}`, text: item.title, image: item.thumbnail }))} />
                    </div>
                )}
            </div>
        </section>
    )
}