import { ProjectsContentProps } from "@/types/projects";

const API_URL = `${process.env.NEXT_PUBLIC_API_PROJECTS}`;

export const fetchProjectsContents = async (): Promise<
  ProjectsContentProps[]
> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
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

export const fetchProjectBySlug = async (
  slug: string
): Promise<ProjectsContentProps> => {
  try {
    const response = await fetch(`${API_URL}/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Project with slug "${slug}" not found`);
      }
      throw new Error(
        `Failed to fetch project by slug: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    throw error;
  }
};
