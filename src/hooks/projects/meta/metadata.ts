import { Metadata } from "next";

import Projects from "@/models/Projects";

export interface ProjectsData {
  title: string;
  thumbnail: string;
  description: string;
  slug: string;
  imageUrl: string[];
}

export async function getProducts(slug: string): Promise<ProjectsData | null> {
  try {
    const project = await Projects.findOne({ slug });
    if (!project) {
      return null;
    }
    return project;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProducts(params.slug);

  return {
    title: project ? `Projects - ${project.title}` : "Project Not Found",
    openGraph: {
      title: project ? `Projects - ${project.title}` : "Project Not Found",
      description: project
        ? `Projects - ${project.description}`
        : "Project Not Found",
      images: project?.imageUrl ? [project.imageUrl[0]] : [],
    },
  };
}
