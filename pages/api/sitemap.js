import site from "../../lib/site";
import { getAllPosts } from "../../lib/posts";

// /sitemap.xml の実体（next.config.js の rewrites で割当）。
// 記事は lib/posts 経由で同梱されているので、リクエスト時にファイルを読まない。
const STATIC_PAGES = ["/", "/profile", "/contact", "/privacyPolicy"];

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
const urlTag = (path, lastmod) =>
  `  <url>\n    <loc>${escapeXml(site.url + path)}</loc>` + (lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "") + `\n  </url>`;

export default function handler(req, res) {
  const posts = getAllPosts();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...STATIC_PAGES.map((p) => urlTag(p)),
    ...posts.map((p) => urlTag(`/blog/${p.id}`, p.updatedAt)),
    "</urlset>",
    "",
  ].join("\n");
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(body);
}
