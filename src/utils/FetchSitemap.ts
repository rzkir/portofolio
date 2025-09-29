import { fetchProjectsContents } from "@/utils/FetchProjects";

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

function escapeXml(unsafe?: string): string {
    const s = String(unsafe ?? "");
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

async function getProjectRoutes(): Promise<SitemapRoute[]> {
    try {
        const projects: ProjectsContentProps[] = await fetchProjectsContents();
        return projects.map((project) => {
            const updatedAtSource =
                (project.updatedAt as unknown as string) ||
                (project.createdAt as unknown as string) ||
                new Date().toISOString();
            const parsed = new Date(updatedAtSource);
            const safeDate = isNaN(parsed.getTime()) ? new Date() : parsed;
            return {
                loc: `${BASE_URL}/projects/${project.slug}`,
                lastmod: safeDate.toISOString(),
                changefreq: "weekly",
                priority: 0.7,
            };
        });
    } catch (error) {
        console.error("Error fetching project routes for sitemap:", error);
        return [];
    }
}

export async function fetchSitemapData(): Promise<SitemapData> {
    const now = new Date().toISOString();

    const staticRoutes: SitemapRoute[] = [
        { loc: `${BASE_URL}/`, lastmod: now, changefreq: "daily", priority: 1 },
        {
            loc: `${BASE_URL}/articles`,
            lastmod: now,
            changefreq: "daily",
            priority: 0.8,
        },
        {
            loc: `${BASE_URL}/projects`,
            lastmod: now,
            changefreq: "daily",
            priority: 0.8,
        },
        {
            loc: `${BASE_URL}/achievements`,
            lastmod: now,
            changefreq: "weekly",
            priority: 0.6,
        },
    ];

    const dynamicProjectRoutes = await getProjectRoutes();

    return {
        generatedAt: now,
        baseUrl: BASE_URL,
        routes: [...staticRoutes, ...dynamicProjectRoutes],
    };
}

export function generateSitemapXml(data: SitemapData): string {
    const urlsXml = data.routes
        .map((r) => {
            return `\n  <url>\n    <loc>${escapeXml(r.loc)}</loc>\n    <lastmod>${escapeXml(r.lastmod)}</lastmod>\n    <changefreq>${escapeXml(r.changefreq)}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`;
        })
        .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}\n</urlset>`;
}


