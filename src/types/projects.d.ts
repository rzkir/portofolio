interface ProjectsContentProps {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  imageUrl: string[];
  previewLink: string;
  frameworks: Framework[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface Framework {
  title: string;
  imageUrl: string;
}

interface PreviewProps {
  previewProject: ProjectsContentProps | null;
  setPreviewProject: (project: ProjectsContentProps | null) => void;
}

//============ Projects Details ============//
interface ProjectDetails {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  thumbnail: string;
  imageUrl: string[];
  previewLink: string;
  frameworks: Framework[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  relatedProjects: RelatedProject[];
}

interface RelatedProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  previewLink: string;
}

interface ProjectsLayoutProps {
  slug: string;
  productsData: ProjectDetails;
}
