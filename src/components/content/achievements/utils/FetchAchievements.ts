import { AchievementsContentProps } from "@/components/content/achievements/types/achievements";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${process.env.NEXT_PUBLIC_ACHIEVEMENTS}`;

export const fetchAchievementsContents = async (): Promise<
  AchievementsContentProps[]
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
        `Failed to fetch achievements contents: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching achievements contents:", error);
    throw error;
  }
};
