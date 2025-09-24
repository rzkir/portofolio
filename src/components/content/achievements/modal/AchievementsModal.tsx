"use client"

import React, { useEffect } from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { useLenis } from '@/lib/useLenis'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function AchievementsModal({ selectedAchievement, onClose }: AchievementsModalProps) {
    const lenis = useLenis();

    useEffect(() => {
        if (selectedAchievement) {
            if (lenis) {
                lenis.stop();
            }

            return () => {
                if (lenis) {
                    lenis.start();
                }
            };
        }
    }, [selectedAchievement, lenis]);

    return (
        <Dialog open={!!selectedAchievement} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <DialogTitle className="text-2xl font-bold">{selectedAchievement?.title}</DialogTitle>
                    </motion.div>
                </DialogHeader>
                {selectedAchievement?.imageUrl && (
                    <motion.div
                        className="relative w-full h-[300px] mt-4 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Image
                            src={selectedAchievement.imageUrl}
                            alt={selectedAchievement.title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                )}
            </DialogContent>
        </Dialog>
    )
}
