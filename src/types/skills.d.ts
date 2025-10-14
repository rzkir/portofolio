interface SkillsContentProps {
  _id?: string;
  title: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TechSkillProps {
  skillsData: SkillsContentProps[];
  isInView: boolean;
}
