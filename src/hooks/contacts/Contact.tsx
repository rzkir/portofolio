"use client"

import React from 'react'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'

import { Label } from '@/components/ui/label'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { useStateContacts, itemVariants, formVariants, fieldVariants, labelVariants, inputVariants } from '@/hooks/contacts/lib/useStateContacts'

export default function Contact() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    } = useStateContacts()

    return (
        <section className='py-6 sm:py-8 lg:py-10'>
            <div className="container px-4 md:px-6">
                <div className="text-center mb-8">
                    <motion.h1
                        className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                    >
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                        Send me a message and I'll respond as soon as possible.
                    </motion.p>
                </div>

                <div className='max-w-full md:max-w-5xl mx-auto'>
                    <Card>
                        <CardHeader>
                            <motion.h2
                                className="text-2xl font-semibold"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.3 }}
                            >
                                Send Message
                            </motion.h2>
                            <motion.p
                                className="text-sm text-muted-foreground"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.4 }}
                            >
                                Fill out the form below and I'll get back to you
                            </motion.p>
                        </CardHeader>
                        <CardContent>
                            <motion.form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.8 }}
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <motion.div
                                        className="space-y-2"
                                        variants={fieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.0 }}
                                    >
                                        <motion.div
                                            variants={labelVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: 1.2 }}
                                        >
                                            <Label htmlFor="name">Name *</Label>
                                        </motion.div>
                                        <motion.div
                                            variants={inputVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: 1.4 }}
                                            whileFocus="focus"
                                        >
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Your name"
                                                {...register('name')}
                                                className={errors.name ? 'border-red-500' : ''}
                                            />
                                        </motion.div>
                                        {errors.name && (
                                            <motion.p
                                                className="text-sm text-red-500"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {errors.name.message}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                    <motion.div
                                        className="space-y-2"
                                        variants={fieldVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.2 }}
                                    >
                                        <motion.div
                                            variants={labelVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: 1.4 }}
                                        >
                                            <Label htmlFor="email">Email *</Label>
                                        </motion.div>
                                        <motion.div
                                            variants={inputVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: 1.6 }}
                                            whileFocus="focus"
                                        >
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                {...register('email')}
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                        </motion.div>
                                        {errors.email && (
                                            <motion.p
                                                className="text-sm text-red-500"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {errors.email.message}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="space-y-2"
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.4 }}
                                >
                                    <motion.div
                                        variants={labelVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.6 }}
                                    >
                                        <Label htmlFor="subject">Subject *</Label>
                                    </motion.div>
                                    <motion.div
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.8 }}
                                        whileFocus="focus"
                                    >
                                        <Input
                                            id="subject"
                                            type="text"
                                            placeholder="What's this about?"
                                            {...register('subject')}
                                            className={errors.subject ? 'border-red-500' : ''}
                                        />
                                    </motion.div>
                                    {errors.subject && (
                                        <motion.p
                                            className="text-sm text-red-500"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {errors.subject.message}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <motion.div
                                    className="space-y-2"
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.6 }}
                                >
                                    <motion.div
                                        variants={labelVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 1.8 }}
                                    >
                                        <Label htmlFor="message">Message *</Label>
                                    </motion.div>
                                    <motion.div
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 2.0 }}
                                        whileFocus="focus"
                                    >
                                        <Textarea
                                            id="message"
                                            placeholder="Tell me about your project or inquiry..."
                                            rows={6}
                                            {...register('message')}
                                            className={errors.message ? 'border-red-500' : ''}
                                        />
                                    </motion.div>
                                    {errors.message && (
                                        <motion.p
                                            className="text-sm text-red-500"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {errors.message.message}
                                        </motion.p>
                                    )}
                                </motion.div>

                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.8 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </motion.form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}