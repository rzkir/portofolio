import React from 'react'

export const metadata = {
    title: "Home | Rizki Ramadhan",
    description: "Modern dashboard for project management",
}

import HomeLayout from '@/hooks/dashboard/pages/home/HomeLayout'

export default function page() {
    return (
        <HomeLayout />
    )
}
