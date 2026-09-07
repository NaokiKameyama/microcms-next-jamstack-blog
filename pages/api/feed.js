import site from "../../lib/site";
import { getAllPostsWithContent, renderPostHtml } from "../../lib/posts";

// /feed.xml の実体（next.config.js の rewrites で割当）。全文入りの RSS 2.0。
const esc = (s) => String(s).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
const abs = (html) => html.replace(/(src|href)="\//g, `$1="${site.url}/`);

export default function handler(req, res) {
  const posts = getAllPostsWithContent();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/blog/${p.id}</link>
      <guid isPermaLink="true">${site.url}/blog/${p.id}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <category>${esc(p.category.name)}</category>
      <dc:creator>${esc(site.author.name)}</dc:creator>
      <description>${esc(p.description)}</description>
      <enclosure url="${site.url}${p.image.url}" type="image/webp" length="0" />
      <content:encoded><![CDATA[${abs(renderPostHtml(p.content))}]]></content:encoded>
    </item>`
    )
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${site.url}</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(site.description)}</description>
    <language>${site.language}</language>
    <lastBuildDate>${new Date(posts[0]?.updatedAt || Date.now()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(body);
}
