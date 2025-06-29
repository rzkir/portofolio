/**
 * Utility function to revalidate sitemap after CRUD operations
 * This ensures the sitemap is updated automatically in production
 */

export async function revalidateSitemap(): Promise<void> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.warn(
        "NEXT_PUBLIC_BASE_URL not found, skipping sitemap revalidation"
      );
      return;
    }

    // First, revalidate the sitemap path
    await revalidatePath("/sitemap.xml");

    // Then, revalidate the sitemap endpoint to ensure fresh data
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    const response = await fetch(sitemapUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/xml",
      },
      // Add cache: 'no-store' to ensure fresh data
      cache: "no-store",
    });

    if (response.ok) {
      console.log("✅ Sitemap revalidated successfully");
    } else {
      console.warn("⚠️ Failed to revalidate sitemap:", response.status);
    }
  } catch (error) {
    console.error("❌ Error revalidating sitemap:", error);
  }
}

/**
 * Function to revalidate specific paths in Next.js
 * This can be used for more granular cache invalidation
 */
export async function revalidatePath(path: string): Promise<void> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.warn(
        "NEXT_PUBLIC_BASE_URL not found, skipping path revalidation"
      );
      return;
    }

    // Call the revalidation endpoint
    const revalidateUrl = `${baseUrl}/api/revalidate?path=${encodeURIComponent(
      path
    )}`;
    const response = await fetch(revalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      console.log(`✅ Path revalidated successfully: ${path}`);
    } else {
      console.warn(`⚠️ Failed to revalidate path: ${path}`, response.status);
    }
  } catch (error) {
    console.error(`❌ Error revalidating path ${path}:`, error);
  }
}

/**
 * Function to revalidate multiple paths at once
 * Useful for when you need to invalidate cache for related content
 */
export async function revalidateMultiplePaths(paths: string[]): Promise<void> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.warn(
        "NEXT_PUBLIC_BASE_URL not found, skipping multiple path revalidation"
      );
      return;
    }

    const promises = paths.map((path) => revalidatePath(path));
    await Promise.all(promises);

    console.log(`✅ Revalidated ${paths.length} paths successfully`);
  } catch (error) {
    console.error("❌ Error revalidating multiple paths:", error);
  }
}
