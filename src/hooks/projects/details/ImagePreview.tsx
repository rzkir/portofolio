"use client"

import React, { useEffect, useState, useRef } from 'react'

import Image from 'next/image'

import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'

interface ImagePreviewProps {
    selectedImage: string | null;
    setSelectedImage: (image: string | null) => void;
    images: string[];
}

export default function ImagePreview({
    selectedImage,
    setSelectedImage,
    images,
}: ImagePreviewProps) {
    // Zoom state management
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);

    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 3;
    const ZOOM_STEP = 0.2;

    // Disable body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size)';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [selectedImage]);

    // Reset zoom when image changes
    useEffect(() => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, [selectedImage]);

    // Zoom functions
    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
    };

    const handleResetZoom = () => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    // Mouse wheel zoom
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        setZoom(prev => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta)));
    };

    // Drag functionality
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoom > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Double click to reset zoom
    const handleDoubleClick = () => {
        handleResetZoom();
    };

    if (!selectedImage) return null;

    const handleImageError = (url: string) => {
        console.error(`Failed to load image: ${url}`);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[200] overflow-hidden"
            >
                {/* Modern Container with Architectural Design */}
                <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center p-2 lg:p-6 gap-0 lg:gap-10">
                    {/* Close Button - Modern Floating Design */}
                    <button
                        className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white z-30 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 shadow-2xl group cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close preview"
                    >
                        <svg
                            className="w-6 h-6 lg:w-7 lg:h-7 transition-transform duration-300 group-hover:rotate-90"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Main Preview - Enhanced with Modern Styling */}
                    <motion.div
                        className="relative w-full h-[60vh] lg:h-full lg:flex-1 flex items-center justify-center overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-background/95 to-secondary/20 backdrop-blur-sm border border-white/10 shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onDoubleClick={handleDoubleClick}
                        style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                    >
                        {/* Zoom Controls */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                            {/* Zoom In Button */}
                            <button
                                onClick={handleZoomIn}
                                disabled={zoom >= MAX_ZOOM}
                                className={cn(
                                    "w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 shadow-lg group",
                                    zoom >= MAX_ZOOM ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                                )}
                                aria-label="Zoom in"
                            >
                                <svg
                                    className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>

                            {/* Zoom Out Button */}
                            <button
                                onClick={handleZoomOut}
                                disabled={zoom <= MIN_ZOOM}
                                className={cn(
                                    "w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 shadow-lg group",
                                    zoom <= MIN_ZOOM ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                                )}
                                aria-label="Zoom out"
                            >
                                <svg
                                    className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                </svg>
                            </button>

                            {/* Reset Zoom Button */}
                            <button
                                onClick={handleResetZoom}
                                className="w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 shadow-lg group hover:scale-110"
                                aria-label="Reset zoom"
                            >
                                <svg
                                    className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>

                        {/* Zoom Level Indicator */}
                        <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md rounded-full px-3 py-2 text-white text-sm font-medium border border-white/10 shadow-lg hidden lg:block">
                            {Math.round(zoom * 100)}%
                        </div>

                        {/* Zoom Level Indicator */}
                        <div className="absolute bottom-4 right-4 z-20 bg-black/40 backdrop-blur-md rounded-full px-3 py-2 text-white text-sm font-medium border border-white/10 shadow-lg block lg:hidden">
                            {Math.round(zoom * 100)}%
                        </div>

                        {/* Image Container with Zoom */}
                        <div
                            ref={imageRef}
                            className="relative w-full h-full flex items-center justify-center overflow-hidden"
                            style={{
                                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                            }}
                        >
                            <Image
                                src={selectedImage}
                                alt="Project Preview"
                                fill
                                className="object-contain p-4 lg:p-8"
                                priority
                                onError={() => handleImageError(selectedImage)}
                                unoptimized={true}
                                draggable={false}
                            />
                        </div>

                        {/* Subtle Overlay for Better Image Visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

                        {/* Zoom Instructions */}
                        {zoom === 1 && (
                            <motion.div
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 text-white text-xs font-medium border border-white/10 shadow-lg"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                            >
                                Scroll to zoom • Double-click to reset • Drag when zoomed
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Thumbnail Gallery - Modern Grid Layout */}
                    <div className="w-full lg:w-80 xl:w-96 h-[35vh] lg:h-full p-3">
                        <div className="h-full overflow-y-auto scrollbar-hide" data-lenis-prevent>
                            {/* Thumbnail Grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                                {images.map((image, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={cn(
                                            "cursor-pointer rounded-xl overflow-hidden transition-all duration-300 group relative",
                                            selectedImage === image
                                                ? 'ring-2 ring-primary scale-105 shadow-xl shadow-primary/20'
                                                : 'hover:scale-105 hover:ring-2 hover:ring-white/30 hover:shadow-lg'
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(image);
                                        }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <div className="relative aspect-square bg-gradient-to-br from-secondary/20 to-muted/10">
                                            <Image
                                                src={image}
                                                alt={`Project thumbnail ${idx + 1}`}
                                                fill
                                                className="object-cover transition-all duration-300 group-hover:scale-110"
                                                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
                                                onError={() => handleImageError(image)}
                                                unoptimized={true}
                                            />

                                            {/* Selection Indicator */}
                                            {selectedImage === image && (
                                                <motion.div
                                                    className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Image Number Badge */}
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                                                {idx + 1}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
} 