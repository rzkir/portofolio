'use client'

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [submitMessage, setSubmitMessage] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            // Gunakan API Next.js yang sudah dibuat di /api/contact
            const response = await fetch('https://dashboard-portofolio-eta.vercel.app/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            let data: any = {}
            try {
                data = await response.json()
            } catch (jsonErr) {
                data = { error: await response.text() }
            }

            if (response.ok) {
                setSubmitStatus('success')
                setSubmitMessage(data.message || 'Message sent successfully!')

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                })

                // Close form after 2 seconds
                setTimeout(() => {
                    setSubmitStatus('idle')
                    setSubmitMessage('')
                }, 2000)
            } else {
                setSubmitStatus('error')
                setSubmitMessage(data.error || 'Failed to send message. Please try again.')
            }
        } catch (error) {
            setSubmitStatus('error')
            // setSubmitMessage('Failed to connect to the server. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        })
        setSubmitStatus('idle')
        setSubmitMessage('')
    }

    return (
        <section id="contact" className="w-full min-h-screen py-20 px-4 md:px-8 relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">

            {/* Floating Elements Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-6">
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                        Let's Connect
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Get In Touch
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can work together.
                    </p>
                </div>

                {/* Contact Form Card */}
                <Card className="backdrop-blur-xl bg-card/60 border-border/50 shadow-2xl shadow-primary/5 transition-all duration-500">
                    <CardHeader className="text-center pb-8">
                        <CardTitle className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Send a Message
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">
                            Fill out the form below and I'll get back to you as soon as possible
                        </p>
                    </CardHeader>

                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Name and Email Row */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Full Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="space-y-3">
                                <label htmlFor="subject" className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    Subject
                                </label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="What's this about?"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/60 hover:bg-background/70"
                                />
                            </div>

                            {/* Message */}
                            <div className="space-y-3">
                                <label htmlFor="message" className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project, idea, or anything you'd like to discuss..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={8}
                                    required
                                    disabled={isSubmitting}
                                    className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/60 resize-none hover:bg-background/70"
                                />
                            </div>

                            {/* Status Message */}
                            {submitStatus !== 'idle' && (
                                <div className={`p-4 rounded-lg border ${submitStatus === 'success'
                                    ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
                                    : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                                    }`}>
                                    {submitMessage}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                            <span>Sending Message...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            <span>Send Message</span>
                                        </div>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    disabled={isSubmitting}
                                    className="h-12 px-8 border-border/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                                >
                                    Reset Form
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
