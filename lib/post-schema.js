// 記事ファイル（content/posts/*.md）の frontmatter を正規化する。
// Next（webpack）からも、scripts/ の素の Node からも require できるよう CommonJS で書く。
const matter = require("gray-matter");

const CATEGORY_ORDER = ["技術", "金融", "働き方", "その他"];

const REQUIRED = ["title", "description", "date", "category", "image"];

// frontmatter + 本文 → 記事オブジェクト。コンポーネント側の互換のため
// publishedAt / category.name / image.url の形は microCMS 時代と揃えてある。
function parsePost(id, raw) {
  const { data, content } = matter(raw);
  const missing = REQUIRED.filter((k) => data[k] === undefined || data[k] === "");
  if (missing.length) throw new Error(`content/posts/${id}.md: frontmatter に ${missing.join(", ")} がありません`);
  if (!CATEGORY_ORDER.includes(data.category)) {
    throw new Error(`content/posts/${id}.md: category は ${CATEGORY_ORDER.join(" / ")} のいずれかにしてください（今: ${data.category}）`);
  }
  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) throw new Error(`content/posts/${id}.md: date が日付として読めません（${data.date}）`);
  return {
    id,
    title: String(data.title),
    description: String(data.description),
    publishedAt: date.toISOString(),
    updatedAt: data.updated ? new Date(data.updated).toISOString() : date.toISOString(),
    category: { name: data.category },
    image: {
      url: String(data.image),
      width: data.imageWidth ? Number(data.imageWidth) : null,
      height: data.imageHeight ? Number(data.imageHeight) : null,
    },
    pr: Boolean(data.pr),
    draft: Boolean(data.draft),
    // SEO / AIO / LLMO 用（任意）
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints.map(String) : [],
    faq: Array.isArray(data.faq) ? data.faq.filter((f) => f && f.q && f.a).map((f) => ({ q: String(f.q), a: String(f.a) })) : [],
    charCount: content.replace(/```[\s\S]*?```/g, "").replace(/\s/g, "").length,
    content,
  };
}

// 公開してよい記事か。下書きと未来日付は本番では出さない。
function isPublished(post, now = new Date()) {
  return !post.draft && new Date(post.publishedAt) <= now;
}

function sortByDateDesc(posts) {
  return [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

module.exports = { CATEGORY_ORDER, parsePost, isPublished, sortByDateDesc };
