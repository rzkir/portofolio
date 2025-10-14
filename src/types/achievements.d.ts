interface AchievementsContentProps {
  _id?: string;
  title: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AchievementsCardProps {
  achievement: AchievementsContentProps;
  index: number;
  isCardsInView: boolean;
  onCardClick: (achievement: AchievementsContentProps) => void;
}
