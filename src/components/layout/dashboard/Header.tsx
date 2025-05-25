"use client"

import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState, createContext, useContext } from "react"
import { useAuth } from "@/utils/context/AuthContext"
import { supabase } from "@/utils/supabase/supabase"

// Create context for sidebar state
type SidebarContextType = {
    isMobileOpen: boolean
    setIsMobileOpen: (value: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType>({
    isMobileOpen: false,
    setIsMobileOpen: () => { },
})

export const useSidebar = () => useContext(SidebarContext)

export default function Header() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const { user } = useAuth()
    const [userData, setUserData] = useState<{ first_name: string; last_name: string; email: string } | null>(null)
    const { isMobileOpen, setIsMobileOpen } = useSidebar()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from(process.env.NEXT_PUBLIC_ACCOUNTS as string)
                    .select('first_name, last_name, email')
                    .eq('id', user.id)
                    .single()

                if (!error && data) {
                    setUserData(data)
                }
            }
        }

        fetchUserData()
    }, [user])

    const fullName = userData ? `${userData.first_name} ${userData.last_name}` : 'User'
    const userEmail = userData?.email || ''

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {mounted && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Switch
                                    id="theme-toggle"
                                    checked={theme === 'dark'}
                                    onCheckedChange={(checked: boolean) => setTheme(checked ? 'dark' : 'light')}
                                    thumbContent={
                                        theme === 'dark' ? (
                                            <motion.svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                viewBox="0 0 24 24"
                                                key="dark-icon"
                                                initial={{ rotate: 0, opacity: 0 }}
                                                animate={{ rotate: 360, opacity: 1 }}
                                                exit={{ rotate: 0, opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <circle cx="12" cy="12" r="11" fill="currentColor" className="text-primary" />
                                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" className="text-primary-foreground" />
                                            </motion.svg>
                                        ) : (
                                            <motion.svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                key="light-icon"
                                                initial={{ rotate: 0, opacity: 0 }}
                                                animate={{ rotate: -360, opacity: 1 }}
                                                exit={{ rotate: 0, opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <circle cx="12" cy="12" r="4" />
                                                <path d="M12 2v2m0 16v2m9-9h-2M5 12H3m14.85-6.85L16.4 7.6M7.6 16.4l-1.45 1.45m0-9.9L7.6 7.6M16.4 16.4l1.45 1.45" />
                                            </motion.svg>
                                        )
                                    }
                                />
                            </motion.div>
                        )}

                        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted/50">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-auto rounded-full flex items-center gap-2 px-2 hover:bg-muted/50">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatars/01.png" alt="@user" />
                                        <AvatarFallback>{fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-col items-start hidden md:flex">
                                        <p className="text-sm font-medium leading-none">{fullName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{fullName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {userEmail}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
} 