import type { Metadata } from 'next'

import ProjectDetailsContent from '@/hooks/projects/details/ProjectsLayout'

import { generateMetadata as getProjectsMetadata } from '@/hooks/projects/details/meta/metadata'

import { fetchProjectBySlug, fetchProjectsContents } from "@/utils/FetchProjects"

import ProductsSlugSkeleton from '@/hooks/projects/details/ProjectsSkeleton';

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
            <ProjectDetailsContent
                slug={resolvedParams.slug}
                productsData={projectData}
                allProjects={allProjects}
            />
        );
    } catch (error) {
        console.error('Error fetching project data:', error);
        return <ProductsSlugSkeleton />;
    }
}