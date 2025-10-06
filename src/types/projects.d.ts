interface ProjectsContentProps {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
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
