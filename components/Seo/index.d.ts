import type { FC } from "react";
import type { Post } from "../../lib/types";

// Seo は JS 実装。TypeScript のページから使うとき、すべての props を省略可能として扱う
declare const Seo: FC<{
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  post?: Post;
}>;
export default Seo;
