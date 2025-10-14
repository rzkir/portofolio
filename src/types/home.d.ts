interface HomeContentProps {
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

interface HomeTextProps {
  text: string;
  span: string;
  isInitialLoading: boolean;
}

interface HomeButtonProps {
  href: string;
  label: string;
  description: string;
  isInitialLoading: boolean;
}

interface HomeTitleProps {
  title: string;
  isInitialLoading: boolean;
}
