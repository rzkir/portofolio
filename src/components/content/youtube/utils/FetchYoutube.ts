import { YoutubeContentProps } from "@/components/content/youtube/types/youtube";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${process.env.NEXT_PUBLIC_YOUTUBE}`;

export const fetchYoutubeContents = async (): Promise<
  YoutubeContentProps[]
> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch youtube contents: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching youtube contents:", error);
    throw error;
  }
};
