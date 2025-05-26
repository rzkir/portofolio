import React from 'react'

export const metadata = {
    title: "About | Rizki Ramadhan",
    description: "Modern dashboard for project management",
}

import AboutLayout from '@/hooks/dashboard/pages/about/AboutLayout'

export default function page() {
    return (
        <AboutLayout />
    )
}
