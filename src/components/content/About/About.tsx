import React from 'react';

import { fetchAboutContents } from '@/components/content/About/utils/FetchAbout';

import AboutContent from '@/components/content/About/AboutContent';

import AboutSkeleton from '@/components/content/About/AboutSkelaton';

export default async function About() {
    try {
        const aboutData = await fetchAboutContents();
        return <AboutContent aboutData={aboutData} />;
    } catch (error) {
        console.error('Error fetching about data:', error);
        return (
            <AboutSkeleton />
        );
    }
}