interface AboutContentProps {
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

interface AnimatedCardProps {
  data: AboutContentProps;
}

interface AnimatedDescriptionProps {
  description: string;
}

interface AchievementsModalProps {
  selectedAchievement: AchievementsContentProps | null;
  onClose: () => void;
}

interface AboutInformationProps {
  name: string;
  work: string;
  location: string;
  description: string;
  isInView: boolean;
}

interface AboutPhotoProps {
  imageUrl: string;
  name: string;
  status: string;
  isInView: boolean;
}
