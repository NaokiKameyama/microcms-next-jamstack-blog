import type { FC } from "react";
import type { Post } from "../../lib/types";

declare const Seo: FC<{
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  post?: Post;
  breadcrumbs?: { name: string; path: string }[];
  noindex?: boolean;
}>;
export default Seo;
