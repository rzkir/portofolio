import { ProjectsContentProps } from "@/components/content/projects/types/projects";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_PROJECTS}`;

export const fetchProjectsContents = async (): Promise<
  ProjectsContentProps[]
> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch projects contents: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects contents:", error);
    throw error;
  }
};
