import React from 'react';

import { fetchSkillsContents } from '@/components/content/skills/utils/FetchSkils';

import SkilsContent from '@/components/content/skills/SkilsContent';

import SkilsSkeleton from '@/components/content/skills/SkilsSkeleton';

export default async function Skills() {
    try {
        const skillsData = await fetchSkillsContents();
        return <SkilsContent skillsData={skillsData} />;
    } catch (error) {
        console.error('Error fetching skills data:', error);
        return (
            <SkilsSkeleton />
        );
    }
}