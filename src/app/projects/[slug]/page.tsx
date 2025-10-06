import type { Metadata } from 'next'

import ProjectDetailsContent from '@/hooks/projects/details/ProjectsLayout'

import { generateMetadata as getProjectsMetadata } from '@/hooks/projects/details/meta/metadata'

import { fetchProjectBySlug, fetchProjectsContents } from "@/utils/FetchProjects"

import ProductsSlugSkeleton from '@/hooks/projects/details/ProjectsSkeleton';

import { ProjectSchema, ProjectBreadcrumbSchema } from "@/lib/Script";

import { Fragment } from 'react';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const metadata = await getProjectsMetadata({ params });
    return metadata;
}

export default async function Page({ params }: Props) {
    try {
        const resolvedParams = await params;
        const projectData = await fetchProjectBySlug(resolvedParams.slug);
        const allProjects = await fetchProjectsContents();

        return (
            <Fragment>
                <ProjectBreadcrumbSchema project={projectData} />
                <ProjectSchema project={projectData} />
                <ProjectDetailsContent
                    slug={resolvedParams.slug}
                    productsData={projectData}
                    allProjects={allProjects}
                />
            </Fragment>
        );
    } catch (error) {
        console.error('Error fetching project data:', error);
        return <ProductsSlugSkeleton />;
    }
}