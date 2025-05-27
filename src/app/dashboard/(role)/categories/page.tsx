import React from 'react'

export const metadata = {
    title: "Categories | Rizki Ramadhan",
    description: "Modern dashboard for Categories",
}

import CategoriesLayout from '@/hooks/dashboard/Categories/CategoriesLayout'

export default function page() {
    return (
        <CategoriesLayout />
    )
}
