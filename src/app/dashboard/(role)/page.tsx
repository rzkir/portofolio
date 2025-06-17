import React from 'react'

export const metadata = {
    title: "Dashboard | Rizki Ramadhan",
    description: "Modern dashboard for project management",
}

import DashboardLayout from "@/hooks/dashboard/DashboardLayout"

export default function page() {
    return (
        <DashboardLayout />
    )
}
