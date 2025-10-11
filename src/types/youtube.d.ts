interface YoutubeContentProps {
  _id?: string;
  title: string;
  href: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
  frameworks: Framework[];
}

interface Framework {
  title: string;
  imageUrl: string;
}

interface ModalProps {
  selectedContent: YoutubeContentProps | null;
  onClose: () => void;
}
