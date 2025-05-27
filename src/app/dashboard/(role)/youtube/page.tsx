import React from 'react'

export const metadata = {
    title: "Youtube | Rizki Ramadhan",
    description: "Modern dashboard for Youtube",
}

import YoutubeLayout from '@/hooks/dashboard/youtube/YoutubeLayout'

export default function page() {
    return (
        <YoutubeLayout />
    )
}
