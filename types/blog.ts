export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  slug: string;
  image?: string;
}