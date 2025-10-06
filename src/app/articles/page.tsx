import React, { Fragment } from 'react'

import ProjectLayout from '@/hooks/projects/projects/ProjectsLayout'

import { fetchProjectsContents } from "@/utils/FetchProjects";

import HeroProjects from "@/hooks/projects/projects/HeroProjects"

import { ProjectsSchema, ProjectsBreadcrumbSchema } from "@/lib/Script";

export default async function ProjectPage() {
    const projectsData = await fetchProjectsContents();
    return (
        <Fragment>
            <ProjectsBreadcrumbSchema />
            <ProjectsSchema projectsData={projectsData} />
            <HeroProjects />
            <ProjectLayout projectsData={projectsData} />
        </Fragment>
    );
}