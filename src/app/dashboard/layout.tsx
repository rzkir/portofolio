"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/utils/context/AuthContext'
import Header, { SidebarContext } from '@/components/layout/dashboard/Header'
import Sidebar from '@/components/layout/dashboard/Sidebar'
import AccessDenied from '@/hooks/dashboard/AccessDenied'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, loading, userRole } = useAuth()
    const router = useRouter()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/')
        }
    }, [loading, user, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    if (userRole !== 'admins') {
        return <AccessDenied />
    }

    return (
        <SidebarContext.Provider value={{ isMobileOpen, setIsMobileOpen }}>
            <div className="flex h-screen bg-background">
                {/* Sidebar */}
                <aside className="md:relative">
                    <div className="h-full overflow-hidden">
                        <Sidebar />
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out overflow-y-auto">
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarContext.Provider>
    )
}