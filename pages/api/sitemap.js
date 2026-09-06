import { client } from "../../libs/client";

// /sitemap.xml の実体。next.config.js の rewrites で割り当てている。
// ビルド後に生成するのではなくリクエスト時に microCMS を読むので、
// 記事を追加してもデプロイ不要で常に最新になる。
const SITE_URL = "https://www.atukan-blog.com";
const STATIC_PAGES = ["/", "/profile", "/contact", "/privacyPolicy"];
const PAGE_SIZE = 100; // microCMS の 1 リクエスト上限

const fetchAllPosts = async () => {
  const posts = [];
  let offset = 0;
  for (;;) {
    const res = await client.get({
      endpoint: "blog",
      queries: { fields: "id,updatedAt", limit: PAGE_SIZE, offset },
    });
    posts.push(...res.contents);
    offset += res.contents.length;
    if (res.contents.length === 0 || offset >= res.totalCount) break;
  }
  return posts;
};

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));

const urlTag = (path, lastmod) =>
  `  <url>\n    <loc>${escapeXml(SITE_URL + path)}</loc>` +
  (lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "") +
  `\n  </url>`;

export default async function handler(req, res) {
  try {
    const posts = await fetchAllPosts();
    const body = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...STATIC_PAGES.map((p) => urlTag(p)),
      ...posts.map((p) => urlTag(`/blog/${p.id}`, p.updatedAt)),
      "</urlset>",
      "",
    ].join("\n");
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    // CDN で 1 時間キャッシュ。期限切れ後も古いものを返しつつ裏で更新する
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(body);
  } catch (e) {
    res.status(500).send("sitemap generation failed");
  }
}
