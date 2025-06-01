export interface YoutubeContentProps {
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

export interface Framework {
  title: string;
  imageUrl: string;
}
