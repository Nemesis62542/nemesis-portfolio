export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  links: {
    label: string;
    url: string;
  }[];
}

export interface Post {
  id: string;
  title:string;
  date: string;
  excerpt: string;
  content: string;
}