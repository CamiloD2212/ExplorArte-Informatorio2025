export type UserRole = 'visitante' | 'miembro' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  authorId: string;
  coverImage: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface ArtRoute {
  id: string;
  name: string;
  description: string;
  artworks: Artwork[];
  color: string;
}

export interface Artwork {
  id: string;
  name: string;
  artist: string;
  position: [number, number];
  description: string;
  image: string;
}
