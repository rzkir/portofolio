import { fetchProjectsContents } from "@/utils/FetchProjects";

import metadata from "@/base/meta/Metadata";

import { ProjectsContentProps } from "@/types/projects";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Add XML escape function
function escapeXml(unsafe?: string): string {
  const s = String(unsafe ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getProjectSlugs(): Promise<Array<{ slug: string; updatedAt: Date }>> {
  try {
    const projects: ProjectsContentProps[] = await fetchProjectsContents();

    return projects.map((project: ProjectsContentProps) => {
      const updatedAtSource = (project.updatedAt as unknown as string) || (project.createdAt as unknown as string) || new Date().toISOString();
      const parsed = new Date(updatedAtSource);
      const safeDate = isNaN(parsed.getTime()) ? new Date() : parsed;
      return {
        slug: project.slug,
        updatedAt: safeDate,
      };
    });
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
}

async function generateSitemap() {
  const projectSlugs = await getProjectSlugs();

  const staticUrls = [
    { url: "/", lastmod: new Date().toISOString() },
    { url: "/#about", lastmod: new Date().toISOString() },
    { url: "/#achievements", lastmod: new Date().toISOString() },
    { url: "/#youtube", lastmod: new Date().toISOString() },
  ];

  const dynamicUrls = [
    ...projectSlugs.map((project: { slug: string; updatedAt: Date }) => ({
      url: `/projects/${project.slug}`,
      lastmod: project.updatedAt.toISOString(),
    })),
  ];

  const urls = [
    ...staticUrls,
    ...dynamicUrls,
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
      .map((item) => {
        const isHomePage = item.url === "/";
        const title = isHomePage
          ? metadata.title
          : `${item.url.split("/").pop() || ""} - ${metadata.title}`;
        const description = isHomePage
          ? metadata.openGraph.description
          : `${title} - ${metadata.openGraph.description}`;

        return `
  <url>
    <loc>${escapeXml(BASE_URL)}${escapeXml(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="${escapeXml(
          metadata.openGraph.locale
        )}" href="${escapeXml(BASE_URL)}${escapeXml(item.url)}" />
    <image:image>
      <image:loc>${escapeXml(BASE_URL)}${escapeXml(
          metadata.openGraph.images[0].url
        )}</image:loc>
      <image:title>${escapeXml(metadata.openGraph.images[0].alt)}</image:title>
      <image:caption>${escapeXml(description)}</image:caption>
      <image:license>${escapeXml(BASE_URL)}</image:license>
    </image:image>
  </url>`;
      })
      .join("")}
</urlset>`;

  return sitemapXml;
}

// INI ROUTE HANDLER NEXT 13/14 YANG BENAR UNTUK GENERATE SITEMAP
export async function GET() {
  try {
    const body = await generateSitemap();

    return new Response(body, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
