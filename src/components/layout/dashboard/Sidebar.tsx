"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./Header"

import {
    LayoutDashboard,
    Users,
    Settings,
    BriefcaseBusiness,
    FileText,
    BarChart,
    X,
    CalendarDays,
    LifeBuoy,
    LogOut,
    ChevronDown,
} from "lucide-react"

type SubItem = {
    title: string
    href: string
}

type NavItem = {
    title: string
    href: string
    icon: any
    subItems?: SubItem[]
}

const sidebarNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Pages",
        href: "/dashboard/pages",
        icon: FileText,
        subItems: [
            { title: "Home", href: "/dashboard/pages/home" },
            { title: "About", href: "/dashboard/pages/about" },
            { title: "Skills", href: "/dashboard/pages/skills" },
            { title: "Achievement", href: "/dashboard/pages/achievement" },
        ]
    },
    {
        title: "Calendar",
        href: "/dashboard/calendar",
        icon: CalendarDays,
    },
    {
        title: "Works",
        href: "/dashboard/works",
        icon: BriefcaseBusiness,
        subItems: [
            { title: "Works", href: "/dashboard/works" },
            { title: "Categories", href: "/dashboard/works/categories" },
            { title: "Framework", href: "/dashboard/analytics/framework" },
        ]
    },
    {
        title: "Team",
        href: "/dashboard/team",
        icon: Users,
    },
]

const generalNavItems = [
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "Help",
        href: "/dashboard/help",
        icon: LifeBuoy,
    },
    {
        title: "Logout",
        href: "/logout",
        icon: LogOut,
    }
]

export default function Sidebar() {
    const pathname = usePathname()
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
    const { isMobileOpen, setIsMobileOpen } = useSidebar()

    const toggleExpand = (href: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [href]: !prev[href]
        }))
    }

    return (
        <>
            {/* Sidebar */}
            <div className={cn(
                "flex h-full flex-col gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
                "w-64 px-4",
                "py-6",
                "border-r border-border/40",
                "fixed md:relative",
                "inset-y-0 left-0 z-[70]",
                "transform transition-transform duration-300 ease-in-out",
                isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                <div className={cn(
                    "flex h-[60px] items-center justify-between border-b border-border/40 px-0 pb-6"
                )}>
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity",
                            "justify-start w-full px-0"
                        )}
                    >
                        <div className="h-6 w-6 bg-primary rounded-md" />
                        <span className={cn(
                            "text-xl whitespace-nowrap transition-all duration-300",
                            "w-auto opacity-100 block"
                        )}>
                            Donezo
                        </span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto px-0">
                    <div className="space-y-6">
                        <div>
                            <h3 className={cn(
                                "text-xs font-semibold text-muted-foreground uppercase mb-3",
                                "block tracking-wider"
                            )}>
                                MENU
                            </h3>
                            <div className="space-y-1.5">
                                {sidebarNavItems.map((item) => (
                                    <div key={item.href} className="space-y-1">
                                        <Button
                                            variant={pathname === item.href ? "secondary" : "ghost"}
                                            className={cn(
                                                "w-full justify-start gap-2 group relative",
                                                pathname === item.href && "bg-primary/10 text-primary font-medium rounded-lg",
                                                "justify-start px-2 min-w-[40px] min-h-[40px]",
                                                "hover:bg-muted/50 transition-colors duration-200",
                                                "border border-transparent hover:border-border/40"
                                            )}
                                            onClick={() => item.subItems && toggleExpand(item.href)}
                                            asChild={!item.subItems}
                                        >
                                            {item.subItems ? (
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="flex items-center gap-2">
                                                        <item.icon className={cn(
                                                            "h-4 w-4",
                                                            "transition-all duration-300",
                                                            pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                                        )} />
                                                        <span className={cn(
                                                            "whitespace-nowrap transition-all duration-300",
                                                            "w-auto opacity-100 overflow-visible"
                                                        )}>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                    <ChevronDown className={cn(
                                                        "h-4 w-4 transition-transform duration-200",
                                                        expandedItems[item.href] ? "transform rotate-180" : ""
                                                    )} />
                                                </div>
                                            ) : (
                                                <Link href={item.href}>
                                                    <item.icon className={cn(
                                                        "h-4 w-4",
                                                        "transition-all duration-300",
                                                        pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                                    )} />
                                                    <span className={cn(
                                                        "whitespace-nowrap transition-all duration-300",
                                                        "w-auto opacity-100 overflow-visible"
                                                    )}>
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            )}
                                        </Button>
                                        {item.subItems && expandedItems[item.href] && (
                                            <div className="ml-6 space-y-1.5 border-l border-border/40 pl-3">
                                                {item.subItems.map((subItem) => (
                                                    <Button
                                                        key={subItem.href}
                                                        variant={pathname === subItem.href ? "secondary" : "ghost"}
                                                        className={cn(
                                                            "w-full justify-start gap-2 group relative",
                                                            pathname === subItem.href && "bg-primary/10 text-primary font-medium rounded-lg",
                                                            "justify-start px-2 min-w-[40px] min-h-[40px]",
                                                            "hover:bg-muted/50 transition-colors duration-200",
                                                            "border border-transparent hover:border-border/40"
                                                        )}
                                                        asChild
                                                    >
                                                        <Link href={subItem.href}>
                                                            <span className={cn(
                                                                "whitespace-nowrap transition-all duration-300",
                                                                "w-auto opacity-100 overflow-visible"
                                                            )}>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className={cn(
                                "text-xs font-semibold text-muted-foreground uppercase mb-3",
                                "block tracking-wider"
                            )}>
                                GENERAL
                            </h3>
                            <div className="space-y-1.5">
                                {generalNavItems.map((item) => (
                                    <Button
                                        key={item.href}
                                        variant={pathname === item.href ? "secondary" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-2 group relative",
                                            pathname === item.href && "bg-primary/10 text-primary font-medium rounded-lg",
                                            "justify-start px-2 min-w-[40px] min-h-[40px]",
                                            "hover:bg-muted/50 transition-colors duration-200",
                                            "border border-transparent hover:border-border/40"
                                        )}
                                        asChild
                                    >
                                        <Link href={item.href}>
                                            <item.icon className={cn(
                                                "h-4 w-4",
                                                "transition-all duration-300",
                                                pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                            )} />
                                            <span className={cn(
                                                "whitespace-nowrap transition-all duration-300",
                                                "w-auto opacity-100 overflow-visible"
                                            )}>
                                                {item.title}
                                            </span>
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cn(
                    "mt-auto p-4 transition-all duration-300",
                    "border-t border-border/40"
                )}>
                    <div className={cn(
                        "flex items-center gap-2 rounded-lg bg-primary/10 p-3 transition-all duration-300",
                        "justify-start flex-row text-left",
                        "border border-primary/20"
                    )}>
                        <div className={cn(
                            "h-12 w-12 bg-primary/20 rounded-md mb-0"
                        )} />
                        <div className={cn(
                            "flex-1 space-y-1 transition-all duration-300",
                            "block"
                        )}>
                            <p className="text-sm font-medium text-primary">Download our</p>
                            <p className="text-sm font-medium text-primary">Mobile App</p>
                            <p className="text-xs text-primary/80">Get easy in another way</p>
                        </div>
                        <Button
                            size="sm"
                            variant="secondary"
                            className={cn(
                                "w-auto text-sm",
                                "bg-primary/20 hover:bg-primary/30 text-primary"
                            )}
                        >
                            Download
                        </Button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[69] md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    )
} 