'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Mail,
    Calendar,
    User,
    MessageSquare,
    Eye,
    Trash2,
    CheckCircle,
    Clock,
    Reply,
    Send,
    X,
    AlertCircle,
    MessageCircle
} from 'lucide-react'

interface Contact {
    _id: string
    name: string
    email: string
    subject: string
    message: string
    status: 'unread' | 'read' | 'replied'
    createdAt: string
    updatedAt: string
}

export default function ContactPage() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [showDialog, setShowDialog] = useState(false)
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [replyData, setReplyData] = useState({
        adminEmail: '',
        replyMessage: ''
    })
    const [isSendingReply, setIsSendingReply] = useState(false)
    const [replyStatus, setReplyStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [replyMessage, setReplyMessage] = useState('')
    const [whatsappConfig, setWhatsappConfig] = useState<any>(null)
    const [testingWhatsapp, setTestingWhatsapp] = useState(false)

    useEffect(() => {
        fetchContacts()
        checkWhatsappConfig()
        // Load saved admin email from localStorage
        const savedEmail = localStorage.getItem('adminEmail')
        if (savedEmail) {
            setReplyData(prev => ({ ...prev, adminEmail: savedEmail }))
        }
    }, [])

    const checkWhatsappConfig = async () => {
        try {
            const response = await fetch('/api/test-whatsapp')
            if (response.ok) {
                const config = await response.json()
                setWhatsappConfig(config)
            }
        } catch (error) {
            console.error('Error checking WhatsApp config:', error)
        }
    }

    const testWhatsappNotification = async () => {
        setTestingWhatsapp(true)
        try {
            const response = await fetch('/api/test-whatsapp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    testMessage: '🔔 Test notifikasi WhatsApp dari dashboard admin - ' + new Date().toLocaleString('id-ID')
                }),
            })

            const result = await response.json()

            if (result.success) {
                alert('✅ Test message sent successfully! Check your WhatsApp.')
            } else {
                alert('❌ Failed to send test message: ' + result.error)
            }
        } catch (error) {
            console.error('Test WhatsApp error:', error)
            alert('❌ Error testing WhatsApp notification')
        } finally {
            setTestingWhatsapp(false)
        }
    }

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/contact')
            if (response.ok) {
                const data = await response.json()
                setContacts(data.contacts)
            }
        } catch (error) {
            console.error('Error fetching contacts:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateContactStatus = async (contactId: string, status: 'read' | 'replied') => {
        try {
            const response = await fetch(`/api/contact/${contactId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            })

            if (response.ok) {
                setContacts(prev =>
                    prev.map(contact =>
                        contact._id === contactId
                            ? { ...contact, status }
                            : contact
                    )
                )
            }
        } catch (error) {
            console.error('Error updating contact status:', error)
        }
    }

    const deleteContact = async (contactId: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return

        try {
            const response = await fetch(`/api/contact/${contactId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                setContacts(prev => prev.filter(contact => contact._id !== contactId))
                if (selectedContact?._id === contactId) {
                    setShowDialog(false)
                    setSelectedContact(null)
                }
            }
        } catch (error) {
            console.error('Error deleting contact:', error)
        }
    }

    const sendReply = async () => {
        if (!selectedContact || !replyData.adminEmail || !replyData.replyMessage) {
            setReplyStatus('error')
            setReplyMessage('Please fill in all fields')
            return
        }

        setIsSendingReply(true)
        setReplyStatus('idle')

        try {
            const response = await fetch('/api/contact/send-reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contactId: selectedContact._id,
                    adminEmail: replyData.adminEmail,
                    replyMessage: replyData.replyMessage
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setReplyStatus('success')
                setReplyMessage(data.message || 'Reply sent successfully!')

                // Save admin email to localStorage
                localStorage.setItem('adminEmail', replyData.adminEmail)

                // Update contact status in the list
                setContacts(prev =>
                    prev.map(contact =>
                        contact._id === selectedContact._id
                            ? { ...contact, status: 'replied' }
                            : contact
                    )
                )

                // Reset form but keep admin email
                setReplyData(prev => ({
                    adminEmail: prev.adminEmail,
                    replyMessage: ''
                }))

                // Close reply form after 2 seconds
                setTimeout(() => {
                    setShowReplyForm(false)
                    setReplyStatus('idle')
                    setReplyMessage('')
                }, 2000)
            } else {
                setReplyStatus('error')
                setReplyMessage(data.error || 'Failed to send reply. Please try again.')
            }
        } catch (error) {
            console.error('Send reply error:', error)
            setReplyStatus('error')
            setReplyMessage('Network error. Please check your connection and try again.')
        } finally {
            setIsSendingReply(false)
        }
    }

    const resetReplyForm = () => {
        setReplyData(prev => ({
            adminEmail: prev.adminEmail, // Keep admin email
            replyMessage: ''
        }))
        setReplyStatus('idle')
        setReplyMessage('')
        setShowReplyForm(false)
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'unread':
                return <Clock className="w-4 h-4 text-orange-500" />
            case 'read':
                return <CheckCircle className="w-4 h-4 text-blue-500" />
            case 'replied':
                return <Reply className="w-4 h-4 text-green-500" />
            default:
                return <Clock className="w-4 h-4 text-gray-500" />
        }
    }

    const getStatusBadge = (status: string) => {
        const variants = {
            unread: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
            read: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
            replied: 'bg-green-100 text-green-800 hover:bg-green-100'
        }
        return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Contact Messages</h1>
                    <p className="text-muted-foreground">
                        Manage incoming contact form submissions
                    </p>
                </div>
                <div className="flex gap-2">
                    {whatsappConfig && (
                        <Button
                            onClick={testWhatsappNotification}
                            variant="outline"
                            disabled={testingWhatsapp || !whatsappConfig.configured}
                            className="flex items-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" />
                            {testingWhatsapp ? 'Testing...' : 'Test WhatsApp'}
                        </Button>
                    )}
                    <Button onClick={fetchContacts} variant="outline">
                        Refresh
                    </Button>
                </div>
            </div>

            {/* WhatsApp Configuration Status */}
            {whatsappConfig && (
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">WhatsApp Notifications</span>
                            </div>
                            <Badge variant={whatsappConfig.configured ? "default" : "destructive"}>
                                {whatsappConfig.configured ? "Configured" : "Not Configured"}
                            </Badge>
                        </div>
                        {!whatsappConfig.configured && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Set ULTRAMSG_INSTANCE_ID, ULTRAMSG_TOKEN, and ADMIN_WHATSAPP_NUMBER in your .env.local file
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {contacts.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                            <p className="text-muted-foreground">
                                Contact form submissions will appear here
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    contacts.map((contact) => (
                        <Card key={contact._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(contact.status)}
                                                <Badge className={getStatusBadge(contact.status)}>
                                                    {contact.status}
                                                </Badge>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {formatDate(contact.createdAt)}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">{contact.subject}</h3>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {contact.name}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-4 h-4" />
                                                    {contact.email}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground line-clamp-2">
                                            {contact.message}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2 ml-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedContact(contact)
                                                setShowDialog(true)
                                            }}
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </Button>

                                        {contact.status === 'unread' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateContactStatus(contact._id, 'read')}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Mark Read
                                            </Button>
                                        )}

                                        {contact.status !== 'replied' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedContact(contact)
                                                    setShowReplyForm(true)
                                                }}
                                            >
                                                <Reply className="w-4 h-4 mr-1" />
                                                Reply
                                            </Button>
                                        )}

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => deleteContact(contact._id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Contact Detail Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Message Details</DialogTitle>
                    </DialogHeader>

                    {selectedContact && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{selectedContact.subject}</h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {selectedContact.name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {selectedContact.email}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(selectedContact.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-2">Message:</h4>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowDialog(false)
                                        setShowReplyForm(true)
                                    }}
                                >
                                    <Reply className="w-4 h-4 mr-2" />
                                    Reply via Form
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`)}
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Reply via Email
                                </Button>

                                {selectedContact.status === 'unread' && (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            updateContactStatus(selectedContact._id, 'read')
                                            setShowDialog(false)
                                        }}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Mark as Read
                                    </Button>
                                )}

                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        deleteContact(selectedContact._id)
                                        setShowDialog(false)
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Message
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Reply Form Dialog */}
            <Dialog open={showReplyForm} onOpenChange={setShowReplyForm}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center justify-between">
                            Send Reply
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetReplyForm}
                                className="h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogTitle>
                    </DialogHeader>

                    {selectedContact && (
                        <div className="space-y-6">
                            {/* Original Message Preview */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg">Replying to: {selectedContact.subject}</h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {selectedContact.name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {selectedContact.email}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-2">Original Message:</h4>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <p className="whitespace-pre-wrap text-sm">{selectedContact.message}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Message */}
                            {replyStatus !== 'idle' && (
                                <div className={`p-4 rounded-lg flex items-center gap-2 ${replyStatus === 'success'
                                    ? 'bg-green-50 border border-green-200 text-green-800'
                                    : 'bg-red-50 border border-red-200 text-red-800'
                                    }`}>
                                    {replyStatus === 'success' ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                    )}
                                    <span className="text-sm font-medium">{replyMessage}</span>
                                </div>
                            )}

                            {/* Reply Form */}
                            <form onSubmit={(e) => { e.preventDefault(); sendReply(); }} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="adminEmail">Your Email Address</Label>
                                    <Input
                                        id="adminEmail"
                                        type="email"
                                        placeholder="your-email@example.com"
                                        value={replyData.adminEmail}
                                        onChange={(e) => setReplyData(prev => ({ ...prev, adminEmail: e.target.value }))}
                                        required
                                        disabled={isSendingReply}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        This email will be saved for future replies
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="replyMessage">Reply Message</Label>
                                    <Textarea
                                        id="replyMessage"
                                        placeholder="Type your reply here..."
                                        value={replyData.replyMessage}
                                        onChange={(e) => setReplyData(prev => ({ ...prev, replyMessage: e.target.value }))}
                                        rows={6}
                                        required
                                        disabled={isSendingReply}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        disabled={isSendingReply}
                                    >
                                        {isSendingReply ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Send Reply
                                            </div>
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={resetReplyForm}
                                        disabled={isSendingReply}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
} 