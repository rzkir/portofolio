'use client'

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'

import { Button } from '@/components/ui/button'

import { Card, CardContent } from '@/components/ui/card'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, MessageCircle, X, CheckCircle, AlertCircle } from 'lucide-react'

import ContactBoxAnimation from '@/components/ui/contact-box-animation'

import image from "@/base/assets/512.gif"

import Image from 'next/image'

export default function Contact() {
    const [showForm, setShowForm] = useState(false)
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
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

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
                    setShowForm(false)
                    setSubmitStatus('idle')
                    setSubmitMessage('')
                }, 2000)
            } else {
                setSubmitStatus('error')
                setSubmitMessage(data.error || 'Failed to send message. Please try again.')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitStatus('error')
            setSubmitMessage('Network error. Please check your connection and try again.')
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
        setShowForm(false)
    }

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
    ]

    return (
        <section className='w-full py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-background/95'>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Contact Form with Three.js Animation */}
                <div className="space-y-6 relative">
                    <Card className="border-border/50 hover:border-border transition-colors flex flex-col items-center justify-center backdrop-blur-sm bg-background/80 relative overflow-hidden">
                        {/* Three.js Animation for the card */}
                        <div className="absolute inset-0">
                            <ContactBoxAnimation />
                        </div>

                        <CardContent className="p-8 text-center relative z-10">
                            <div className="mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Image src={image} alt="Contact" width={40} height={40} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Send me a message</h3>
                                <p className="text-muted-foreground">
                                    Have a question or want to work together? Click below to get started.
                                </p>
                            </div>
                            <Button
                                onClick={() => setShowForm(true)}
                                size="lg"
                                className="group"
                            >
                                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Start Conversation
                            </Button>
                        </CardContent>

                        <div className='flex flex-col items-center justify-center relative z-10'>
                            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Dialog for the contact form */}
            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center justify-between">
                            Send Message
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetForm}
                                className="h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogTitle>
                    </DialogHeader>

                    {/* Status Message */}
                    {submitStatus !== 'idle' && (
                        <div className={`p-4 rounded-lg flex items-center gap-2 ${submitStatus === 'success'
                            ? 'bg-green-50 border border-green-200 text-green-800'
                            : 'bg-red-50 border border-red-200 text-red-800'
                            }`}>
                            {submitStatus === 'success' ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                            <span className="text-sm font-medium">{submitMessage}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2 flex flex-col gap-1">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="backdrop-blur-sm bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2 flex flex-col gap-1">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
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
                                        className="backdrop-blur-sm bg-background/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 flex flex-col gap-1">
                                <label htmlFor="subject" className="text-sm font-medium">
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
                                    className="backdrop-blur-sm bg-background/50"
                                />
                            </div>

                            <div className="space-y-2 flex flex-col gap-1">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project or idea..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    required
                                    disabled={isSubmitting}
                                    className="backdrop-blur-sm bg-background/50"
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="submit"
                                    className="flex-1 group"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            Send Message
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
