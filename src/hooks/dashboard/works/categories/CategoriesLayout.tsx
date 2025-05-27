import React from 'react'

import { Button } from '@/components/ui/button'

import { ChevronRight } from "lucide-react"

export default function SkillsLayout() {
    return (
        <section className="p-6 bg-muted/30 rounded-2xl">
            <div className='flex justify-between items-center p-6 border rounded-2xl border-border bg-card shadow-sm'>
                <div className='flex flex-col gap-3'>
                    <h3 className='text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                        Skills
                    </h3>

                    <ol className='flex gap-2 items-center text-sm text-muted-foreground'>
                        <li className='flex items-center hover:text-primary transition-colors'>
                            <span>Dashboard</span>
                            <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                        </li>
                        <li className='flex items-center hover:text-primary transition-colors'>
                            <span>Pages</span>
                            <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                        </li>
                        <li className='flex items-center text-primary font-medium'>
                            <span>Skills</span>
                        </li>
                    </ol>
                </div>

                <Button variant="default" className="px-6 py-2.5 font-medium shadow-sm hover:shadow-md transition-all">
                    Create Content
                </Button>
            </div>
        </section>
    )
}
