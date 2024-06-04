declare interface QuestionProps {
  id: string;
  clerkId: string;
  createdAt: Date | null;
  title: string | null;
  explanation: string | null;
}

declare interface UserProps {
  id: string;
  clerkId: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
  bio: string | null;
  picture: string | null;
  location: string | null;
  portfolioWebsite: string | null;
  reputation: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

declare interface TagProps {
  id: string;
  clerkId: string;
  tag: string | null;
  questionId: string | null;
  createdAt: Date | null;
}
