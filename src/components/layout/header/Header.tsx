import React from 'react'

import { Button } from "@/components/ui/button"

import { Switch } from "@/components/ui/switch"

import { useTheme } from "next-themes"

import { useRouter } from 'next/navigation'

import { motion } from "framer-motion";

export default function Header() {
    const { theme, setTheme } = useTheme()

    const [mounted, setMounted] = React.useState(false)

    const router = useRouter();

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const handleLogin: () => void = () => {
        router.push('/signin');
    }

    return (
        <motion.header
            className="container mx-auto px-4 py-6 flex justify-between items-center sticky top-0 z-10 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-lg font-bold">showcasy.</div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    {/* Dark mode toggle */}
                    {mounted && (
                        <>
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
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                                key="dark-icon"
                                                initial={{ rotate: 0, opacity: 0 }}
                                                animate={{ rotate: 360, opacity: 1 }}
                                                exit={{ rotate: 0, opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <circle cx="12" cy="12" r="11" fill="#60A5FA" />
                                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="#FCD34D" />
                                            </motion.svg>
                                        ) : (
                                            <motion.svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
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
                        </>
                    )}
                </div>
                <Button variant="outline" onClick={handleLogin}>Let's Signin &rarr;</Button>
                {/* Menu button placeholder */}
                <Button variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </Button>
            </div>
        </motion.header>
    )
}
