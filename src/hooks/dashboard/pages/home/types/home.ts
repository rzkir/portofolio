export interface HomeContent {
  _id?: string;
  account_id?: string;
  title: string;
  description: string;
  span: string;
  label: string;
  href: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: HomeContent;
  setFormData: (data: HomeContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
