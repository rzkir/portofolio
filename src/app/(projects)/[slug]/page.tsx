import type { Metadata } from 'next'

import ProjectDetailsContent from '@/hooks/projects/ProjectsLayout'

import { generateMetadata as getProjectsMetadata } from '@/hooks/projects/meta/metadata'

import { fetchProjectsContents } from "@/components/content/projects/utils/FetchProjects"

import ProductsSlugSkeleton from '@/hooks/projects/ProjectsSkeleton';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProjectsMetadata({ params: { slug: resolvedParams.slug } })
}

export default async function Page({ params }: Props) {
    try {
        const resolvedParams = await params
        const projects = await fetchProjectsContents();
        const projectData = projects.find(project => project.slug === resolvedParams.slug);

        if (!projectData) {
            throw new Error('Project not found');
        }

        return (
            <ProjectDetailsContent
                slug={resolvedParams.slug}
                productsData={projectData}
                allProjects={projects}
            />
        );
    } catch (error) {
        console.error('Error fetching project data:', error);
        return <ProductsSlugSkeleton />;
    }
}