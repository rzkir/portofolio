import type { Metadata } from 'next'

import ArticleDetailsContent from '@/hooks/articles/details/ArticlesLayout'

import { generateMetadata as getArticlesMetadata } from '@/hooks/articles/details/meta/metadata'

import { fetchArticleBySlug } from "@/utils/FetchArticles"

import ArticlesSkeleton from '@/hooks/articles/details/ArticlesSkeleton';

import { ArticleSchema, ArticleBreadcrumbSchema } from "@/lib/Script";

import { Fragment } from 'react';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const metadata = await getArticlesMetadata({ params });
    return metadata;
}

export default async function Page({ params }: Props) {
    try {
        const resolvedParams = await params;
        const articleData = await fetchArticleBySlug(resolvedParams.slug);

        return (
            <Fragment>
                <ArticleBreadcrumbSchema article={articleData} />
                <ArticleSchema article={articleData} />
                <ArticleDetailsContent
                    productsData={articleData}
                />
            </Fragment>
        );
    } catch (error) {
        return <ArticlesSkeleton />;
    }
}