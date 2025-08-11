import React from 'react';

import { fetchHomeContents } from '@/utils/FetchHome';

import HomeContent from '@/components/content/Home/HomeContent';

import HomeSkeleton from '@/components/content/Home/HomeSkeleton';

export default async function Home() {
    try {
        const homeData = await fetchHomeContents();
        return <HomeContent homeData={homeData} />;
    } catch (error) {
        console.error('Error fetching home data:', error);
        return (
            <HomeSkeleton />
        );
    }
}