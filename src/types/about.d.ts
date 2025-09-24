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
  selectedAchievement: AchievementsContentProps | null
  onClose: () => void
}