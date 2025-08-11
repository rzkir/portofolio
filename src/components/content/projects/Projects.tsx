import React from 'react';

import { fetchProjectsContents } from '@/utils/FetchProjects';

import ProjectsContent from '@/components/content/projects/ProjectsContent';

import ProjectsSkelaton from '@/components/content/projects/ProjectsSkelaton';

export default async function Projects() {
    try {
        const projectsData = await fetchProjectsContents();
        return <>
            <ProjectsContent projectsData={projectsData} />
        </>;
    } catch (error) {
        console.error('Error fetching projects data:', error);
        return (
            <ProjectsSkelaton />
        );
    }
}