import React from 'react';

import { fetchYoutubeContents } from '@/utils/FetchYoutube';

import YoutubeContent from '@/components/content/youtube/YoutubeContent';

import YoutubeSkeleton from '@/components/content/youtube/YoutubeSkeleton';

export default async function Youtube() {
    try {
        const youtubeData = await fetchYoutubeContents();
        return <YoutubeContent youtubeData={youtubeData} />;
    } catch (error) {
        console.error('Error fetching home data:', error);
        return (
            <YoutubeSkeleton />
        );
    }
}