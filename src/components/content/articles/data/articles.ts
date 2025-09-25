import { StaticImageData } from 'next/image';

export interface Article {
    thumbnail: string | StaticImageData;
    title: string;
    category: string;
    slug: string;
    authorName: string;
    date: string;
}

import image from "@/base/assets/article.jpg"

export const articles: Article[] = [
    {
        thumbnail: image,
        title: "Design Unraveled: Behind the Scenes of UI/UX Magic",
        category: "UI/UX Design",
        slug: "design-unraveled-ui-ux-magic",
        authorName: "Jayesh Patil",
        date: "10 Nov, 2023"
    },
    {
        thumbnail: image,
        title: "Advanced React Patterns",
        category: "React",
        slug: "advanced-react-patterns",
        authorName: "Jane Smith",
        date: "2024-01-20"
    },
    {
        thumbnail: image,
        title: "TypeScript Best Practices",
        category: "TypeScript",
        slug: "typescript-best-practices",
        authorName: "Mike Johnson",
        date: "2024-01-25"
    },
    {
        thumbnail: image,
        title: "CSS Grid vs Flexbox",
        category: "CSS",
        slug: "css-grid-vs-flexbox",
        authorName: "Sarah Wilson",
        date: "2024-02-01"
    },
    {
        thumbnail: image,
        title: "Building Responsive UIs",
        category: "UI/UX",
        slug: "building-responsive-uis",
        authorName: "Alex Brown",
        date: "2024-02-05"
    },
    {
        thumbnail: image,
        title: "JavaScript Performance Optimization",
        category: "JavaScript",
        slug: "javascript-performance-optimization",
        authorName: "David Lee",
        date: "2024-02-10"
    }
];
