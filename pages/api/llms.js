import site from "../../lib/site";
import { getAllPostsWithContent, getCategories, categoryPath } from "../../lib/posts";

// /llms.txt と /llms-full.txt の実体（next.config.js の rewrites で割当）。
// AI クローラー／LLM 向けにサイトの構成と記事を Markdown で提供する（llmstxt.org の提案形式）。
//   /llms.txt      : サイト概要 + 記事の一覧（タイトル・URL・要約）
//   /llms-full.txt : 上記 + 各記事の本文（Markdown そのまま）
export default function handler(req, res) {
  const full = req.query.full === "1";
  const posts = getAllPostsWithContent();
  const cats = getCategories(posts);
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- 著者: ${site.author.name}（${site.author.jobTitle}）— ${site.author.url}`,
    `- 言語: 日本語`,
    `- サイトマップ: ${site.url}/sitemap.xml`,
    `- RSS: ${site.url}/feed.xml`,
    full ? "" : `- 全文版: ${site.url}/llms-full.txt`,
    "",
    "## 主要ページ",
    "",
    `- [プロフィール](${site.url}/profile): 経歴・特許・開発したサービス`,
    ...cats.map((c) => `- [${c}の記事一覧](${site.url}${categoryPath(c)})`),
    "",
    "## 記事",
    "",
    ...posts.map((p) => `- [${p.title}](${site.url}/blog/${p.id}): ${p.description}（${p.publishedAt.slice(0, 10)} / ${p.category.name}）`),
  ];
  if (full) {
    for (const p of posts) {
      lines.push("", "---", "", `# ${p.title}`, "", `- URL: ${site.url}/blog/${p.id}`, `- 公開: ${p.publishedAt.slice(0, 10)}`, `- 更新: ${p.updatedAt.slice(0, 10)}`, `- カテゴリ: ${p.category.name}`, `- 要約: ${p.description}`, "", p.content.trim());
    }
  }
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(lines.filter((l) => l !== null).join("\n") + "\n");
}
