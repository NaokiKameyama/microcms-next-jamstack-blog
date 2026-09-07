import type { Post } from "./types";
export function getAllPosts(): Post[];
export function getAllPostsWithContent(): (Post & { content: string })[];
export function categoryPath(name: string): string;
export function getPost(id: string): (Post & { content: string }) | null;
export function getCategories(posts: Post[]): string[];
export function getRelatedPosts(post: Post, posts: Post[], limit?: number): Post[];
export function renderPostHtml(markdown: string): string;
