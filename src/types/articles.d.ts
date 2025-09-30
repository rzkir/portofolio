interface Article {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ArticlesResponse {
    articles: Article[];
    total: number;
    page: number;
    limit: number;
}