import { AboutContentProps } from "@/components/content/About/types/about";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/about`;

export const fetchAboutContents = async (): Promise<AboutContentProps[]> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch about contents: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching about contents:", error);
    throw error;
  }
};
