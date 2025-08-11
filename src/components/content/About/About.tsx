import React from 'react';

import { fetchAboutContents } from '@/utils/FetchAbout';

import AboutContent from '@/components/content/About/AboutContent';

import AboutSkeleton from '@/components/content/About/AboutSkelaton';

import { fetchAchievementsContents } from '@/utils/FetchAchievements';

import AchievementsContent from '@/components/content/achievements/AchievementsContent';

export default async function About() {
    try {
        const aboutData = await fetchAboutContents();
        const AchievementsData = await fetchAchievementsContents();
        return <>
            <AboutContent aboutData={aboutData} />
            <AchievementsContent achievementsData={AchievementsData} />
        </>;
    } catch (error) {
        console.error('Error fetching about data:', error);
        return (
            <AboutSkeleton />
        );
    }
}