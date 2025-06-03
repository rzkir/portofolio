import { connectToDatabase } from "@/utils/mongodb/mongodb";
import { FormatSlug } from "@/base/helper/FormatSlug";
import metadata from "@/base/meta/Metadata";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
const SITE_NAME = metadata.openGraph.siteName;
const SITE_DESCRIPTION = metadata.openGraph.description;

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

async function getProject() {
  try {
    const { db } = await connectToDatabase();
    const projects = await db
      .collection(process.env.NEXT_PUBLIC_API_PROJECTS as string)
      .find({}, { projection: { title: 1 } })
      .toArray();
    const titles = new Set<string>();

    projects.forEach((project) => {
      if (project.title) {
        titles.add(project.title);
      }
    });

    return Array.from(titles);
  } catch (error) {
    console.error("Error fetching project titles:", error);
    return [];
  }
}

async function getYoutube() {
  try {
    const { db } = await connectToDatabase();
    const youtube = await db
      .collection(process.env.NEXT_PUBLIC_API_YOUTUBE as string)
      .find({}, { projection: { title: 1 } })
      .toArray();
    const titles = new Set<string>();

    youtube.forEach((video) => {
      if (video.title) {
        titles.add(video.title);
      }
    });

    return Array.from(titles);
  } catch (error) {
    console.error("Error fetching youtube titles:", error);
    return [];
  }
}

async function getHome() {
  try {
    const { db } = await connectToDatabase();
    const home = await db
      .collection(process.env.NEXT_PUBLIC_API_HOME as string)
      .find({}, { projection: { title: 1 } })
      .toArray();
    const titles = new Set<string>();

    home.forEach((item) => {
      if (item.title) {
        titles.add(item.title);
      }
    });

    return Array.from(titles);
  } catch (error) {
    console.error("Error fetching home titles:", error);
    return [];
  }
}

async function getAbout() {
  try {
    const { db } = await connectToDatabase();
    const about = await db
      .collection(process.env.NEXT_PUBLIC_API_ABOUT as string)
      .find({}, { projection: { title: 1 } })
      .toArray();
    const titles = new Set<string>();

    about.forEach((item) => {
      if (item.title) {
        titles.add(item.title);
      }
    });

    return Array.from(titles);
  } catch (error) {
    console.error("Error fetching about titles:", error);
    return [];
  }
}

async function getAchievements() {
  try {
    const { db } = await connectToDatabase();
    const achievements = await db
      .collection(process.env.NEXT_PUBLIC_API_ACHIEVEMENTS as string)
      .find({}, { projection: { title: 1 } })
      .toArray();
    const titles = new Set<string>();

    achievements.forEach((item) => {
      if (item.title) {
        titles.add(item.title);
      }
    });

    return Array.from(titles);
  } catch (error) {
    console.error("Error fetching achievements titles:", error);
    return [];
  }
}

async function generateSitemap() {
  const blogSlugs = await getBlogSlugs();
  const projectTitles = await getProject();
  const youtubeTitles = await getYoutube();
  const homeTitles = await getHome();
  const aboutTitles = await getAbout();
  const achievementTitles = await getAchievements();

  const staticUrls = [
    "/",
    "#home",
    "#about",
    "#blog",
    "#contact",
    "#projects",
    "#youtube",
    "#skills",
  ];

  const dynamicUrls = [
    ...blogSlugs.map((slug) => `/blog/${slug}`),
    ...projectTitles.map((title) => `/projects/${FormatSlug(title)}`),
    ...youtubeTitles.map((title) => `/youtube/${FormatSlug(title)}`),
    ...homeTitles.map((title) => `/home/${FormatSlug(title)}`),
    ...aboutTitles.map((title) => `/about/${FormatSlug(title)}`),
    ...achievementTitles.map((title) => `/achievements/${FormatSlug(title)}`),
  ];

  const urls = [...staticUrls, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:og="http://ogp.me/ns#"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((url) => {
    const isHomePage = url === "/";
    const title = isHomePage
      ? metadata.title
      : `${url.split("/").pop() || ""} - ${metadata.title}`;
    const description = isHomePage
      ? SITE_DESCRIPTION
      : `${title} - ${SITE_DESCRIPTION}`;

    return `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="${
      metadata.openGraph.locale
    }" href="${BASE_URL}${url}" />
    <og:title>${title}</og:title>
    <og:description>${description}</og:description>
    <og:url>${BASE_URL}${url}</og:url>
    <og:type>${isHomePage ? metadata.openGraph.type : "article"}</og:type>
    <og:site_name>${SITE_NAME}</og:site_name>
    <og:locale>${metadata.openGraph.locale}</og:locale>
    <og:image>
      <og:image:url>${BASE_URL}${
      metadata.openGraph.images[0].url
    }</og:image:url>
      <og:image:width>${metadata.openGraph.images[0].width}</og:image:width>
      <og:image:height>${metadata.openGraph.images[0].height}</og:image:height>
      <og:image:alt>${metadata.openGraph.images[0].alt}</og:image:alt>
      <og:image:type>${metadata.openGraph.images[0].type}</og:image:type>
    </og:image>
    <image:image>
      <image:loc>${BASE_URL}${metadata.openGraph.images[0].url}</image:loc>
      <image:title>${metadata.openGraph.images[0].alt}</image:title>
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
