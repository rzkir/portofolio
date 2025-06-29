import { connectToDatabase } from "@/utils/mongodb/mongodb";
import { FormatSlug } from "@/base/helper/FormatSlug";
import metadata from "@/base/meta/Metadata";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

// Add XML escape function
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getBlogSlugs() {
  try {
    const { db } = await connectToDatabase();
    const blogs = await db
      .collection("blogs")
      .find({}, { projection: { slug: 1 } })
      .toArray();
    return blogs.map((blog) => blog.slug);
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

async function getProjectSlugs() {
  try {
    const { db } = await connectToDatabase();
    const projects = await db
      .collection(process.env.NEXT_PUBLIC_API_PROJECTS as string)
      .find({}, { projection: { slug: 1, updatedAt: 1 } })
      .toArray();

    return projects.map((project) => ({
      slug: project.slug,
      updatedAt: project.updatedAt || project.createdAt || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
}

async function generateSitemap() {
  const blogSlugs = await getBlogSlugs();
  const projectSlugs = await getProjectSlugs();

  const staticUrls = ["/"];

  const dynamicUrls = [
    ...blogSlugs.map((slug) => ({
      url: `/${slug}`,
      lastmod: new Date().toISOString(),
    })),
    ...projectSlugs.map((project) => ({
      url: `/${project.slug}`,
      lastmod: project.updatedAt.toISOString(),
    })),
  ];

  const urls = [
    { url: "/", lastmod: new Date().toISOString() },
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
