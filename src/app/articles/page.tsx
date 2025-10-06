import React, { Fragment } from 'react'

import ArticlesLayout from '@/hooks/articles/articles/ArticlesLayout'

import { fetchArticlesContents } from "@/utils/FetchArticles";

import HeroArticles from "@/hooks/articles/articles/HeroArticles"

import { ArticlesSchema, ArticlesBreadcrumbSchema } from "@/lib/Script";

export default async function ArticlesPage() {
    const articlesData = await fetchArticlesContents();
    return (
        <Fragment>
            <ArticlesBreadcrumbSchema />
            <ArticlesSchema articlesData={articlesData} />
            <HeroArticles />
            <ArticlesLayout articlesData={articlesData} />
        </Fragment>
    );
}