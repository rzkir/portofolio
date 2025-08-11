import { SkillsContentProps } from "@/types/skills";

const API_URL = `${process.env.NEXT_PUBLIC_API_SKILLS}`;

export const fetchSkillsContents = async (): Promise<SkillsContentProps[]> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch skills contents: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills contents:", error);
    throw error;
  }
};
