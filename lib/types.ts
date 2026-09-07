// lib/posts.js が返す記事の形（コンポーネント側の互換のため microCMS 時代の形に揃えてある）
export interface Post {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: { name: string };
  image: { url: string; width: number | null; height: number | null };
  pr: boolean;
  draft: boolean;
  tags: string[];
  keyPoints: string[];
  faq: { q: string; a: string }[];
  charCount: number;
}
export interface Category {
  id: string;
  name: string;
}
