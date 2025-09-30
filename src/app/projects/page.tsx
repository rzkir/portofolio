import React, { Fragment } from 'react'

import ProjectLayout from '@/hooks/projects/projects/ProjectLayout'

export { generateMetadata } from '@/hooks/projects/projects/meta/metadata'

import { fetchProjectsContents } from "@/utils/FetchProjects";

export default async function ProjectPage() {
    const projectsData = await fetchProjectsContents();
    return (
        <Fragment>
            <ProjectLayout projectsData={projectsData} />
        </Fragment>
    );
}