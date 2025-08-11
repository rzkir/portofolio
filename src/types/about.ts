export interface AboutContentProps {
  _id?: string;
  card: {
    imageUrl: string;
    name: string;
    work: string;
    location: string;
    status: string;
  };
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AnimatedCardProps {
  data: AboutContentProps;
}

export interface AnimatedDescriptionProps {
  description: string;
}
