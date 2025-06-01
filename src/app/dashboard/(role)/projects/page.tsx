import React from 'react'

export const metadata = {
    title: "Projects | Rizki Ramadhan",
    description: "Modern dashboard for Projects",
}

import ProjectsLayout from '@/hooks/dashboard/projects/ProjectsLayout'

export default function page() {
    return (
        <ProjectsLayout />
    )
}
