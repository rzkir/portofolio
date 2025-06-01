export interface Framework {
  title: string;
  imageUrl: string;
}

export interface projects {
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

// Delete Modal

export interface DeleteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

// form

export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  formData: projects;
  setFormData: React.Dispatch<React.SetStateAction<projects>>;
  categories: string[];
  frameworks: Framework[];
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isUploading: boolean;
  isSubmitting: boolean;
}

// view
export interface ViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProject: projects | null;
}
