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

interface YoutubeCategoriesProps {
  categoriesRef: React.RefObject<HTMLDivElement>;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isCategoriesInView: boolean;
}

interface YoutubeHeaderProps {
  headingRef: React.RefObject<HTMLDivElement>;
  isHeadingInView: boolean;
}

interface YoutubeGridProps {
  contentRef: React.RefObject<HTMLDivElement>;
  paginatedContent: YoutubeContentProps[];
  isContentInView: boolean;
  onWatchDetails: (content: YoutubeContentProps) => void;
}

interface YoutubeCardProps {
  content: YoutubeContentProps;
  index: number;
  isContentInView: boolean;
  onWatchDetails: (content: YoutubeContentProps) => void;
}

interface YoutubePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isContentInView: boolean;
}
