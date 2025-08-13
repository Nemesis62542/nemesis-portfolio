
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl?: string;
  sourceUrl?: string;
}

export interface Post {
  id: string;
  title:string;
  date: string;
  excerpt: string;
  content: string;
}
