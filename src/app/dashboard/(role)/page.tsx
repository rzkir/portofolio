import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export const metadata = {
    title: "Dashboard | Donezo",
    description: "Modern dashboard for project management",
}

export default function DashboardPage() {
    return (
        <div className="space-y-6 p-6 bg-background rounded-lg">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Plan, prioritize, and accomplish your tasks with ease.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2">
                        + Add Project
                    </Button>
                    <Button variant="outline" className="rounded-lg px-4 py-2">
                        Import Data
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                        <div className="h-4 w-4 bg-muted-foreground rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">Increased from last month</p>
                    </CardContent>
                </Card>
                <Card className="rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ended Projects</CardTitle>
                        <div className="h-4 w-4 bg-muted-foreground rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                        <p className="text-xs text-muted-foreground">Increased from last month</p>
                    </CardContent>
                </Card>
                <Card className="rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Running Projects</CardTitle>
                        <div className="h-4 w-4 bg-muted-foreground rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Increased from last month</p>
                    </CardContent>
                </Card>
                <Card className="rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Project</CardTitle>
                        <div className="h-4 w-4 bg-muted-foreground rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">On Discuss</p>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Sections */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Project Analytics */}
                <Card className="rounded-lg shadow-sm col-span-2">
                    <CardHeader>
                        <CardTitle>Project Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                            Project Analytics Chart Placeholder
                        </div>
                    </CardContent>
                </Card>

                {/* Reminders */}
                <Card className="rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Reminders</CardTitle>
                        <Button variant="ghost" size="sm">+ New</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="border-b pb-4 last:border-0 last:pb-0">
                                <p className="text-sm font-medium">Meeting with Arc Company</p>
                                <p className="text-xs text-muted-foreground">Time: 02.00 pm - 04.00 pm</p>
                                <Button size="sm" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3 py-1 text-xs">
                                    Start Meeting
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Project List, Team Collaboration, Project Progress, Time Tracker */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Project List */}
                <Card className="rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Project</CardTitle>
                        <Button variant="ghost" size="sm">+ New</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Develop API Endpoints</p>
                                    <p className="text-xs text-muted-foreground">Due date: Nov 26, 2024</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Team Collaboration */}
                <Card className="rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Team Collaboration</CardTitle>
                        <Button variant="ghost" size="sm">+ Add Member</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b pb-4 last:border-0 last:pb-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <p className="text-sm font-medium">Alexandra Deff</p>
                                    <p className="text-xs text-muted-foreground">Working on Github Project Repository</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Project Progress and Time Tracker */}
                <div className="grid gap-6">
                    {/* Project Progress */}
                    <Card className="rounded-lg shadow-sm">
                        <CardHeader>
                            <CardTitle>Project Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                                Project Progress Chart Placeholder
                            </div>
                            <div className="flex items-center justify-around mt-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                                    Completed
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                                    In Progress
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-muted"></span>
                                    Pending
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Time Tracker */}
                    <Card className="rounded-lg shadow-sm bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle>Time Tracker</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold mb-4">01:24:08</div>
                            <div className="flex space-x-4">
                                <Button size="icon" className="rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground">
                                    <div className="h-5 w-5 bg-primary-foreground rounded-sm" />
                                </Button>
                                <Button size="icon" className="rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground">
                                    <div className="h-5 w-5 bg-primary-foreground rounded-full" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}