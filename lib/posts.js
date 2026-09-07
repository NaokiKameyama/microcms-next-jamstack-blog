// 記事の読み込み。content/posts/*.md を webpack の require.context で取り込むので、
// getStaticProps でも API ルートでも同じコードで動き、実行時にファイルシステムを触らない
// （Vercel のサーバレス関数にファイルを同梱する手間が要らない）。
import { marked } from "marked";
import cheerio from "cheerio";
import hljs from "highlight.js";
import { parsePost, isPublished, sortByDateDesc, CATEGORY_ORDER } from "./post-schema";

const context = require.context("../content/posts", false, /\.md$/);

const loadAll = () =>
  context.keys().map((key) => {
    const mod = context(key);
    const raw = typeof mod === "string" ? mod : mod.default;
    const id = key.replace(/^\.\//, "").replace(/\.md$/, "");
    return parsePost(id, raw);
  });

// 開発中は下書き・未来日付も見えるようにして、書きながら確認できるようにする
const visible = (post) => process.env.NODE_ENV === "development" || isPublished(post);

// 一覧用（本文は含めない）
export const getAllPosts = () =>
  sortByDateDesc(loadAll().filter(visible)).map(({ content, ...rest }) => rest);

// RSS / llms-full.txt 用（本文 Markdown を含む）
export const getAllPostsWithContent = () => sortByDateDesc(loadAll().filter(visible));

export const categoryPath = (name) => `/category/${encodeURIComponent(name)}`;

export const getPost = (id) => {
  const post = loadAll().find((p) => p.id === id);
  return post && visible(post) ? post : null;
};

// 記事に実際に使われているカテゴリを、決まった順で返す
export const getCategories = (posts) =>
  CATEGORY_ORDER.filter((name) => posts.some((p) => p.category.name === name));

// 同じカテゴリの記事を新しい順に（自分は除く）
export const getRelatedPosts = (post, posts, limit = 3) =>
  posts.filter((p) => p.id !== post.id && p.category.name === post.category.name).slice(0, limit);

marked.setOptions({ gfm: true, mangle: false, headerIds: false });

// Markdown → HTML。コードブロックは microCMS 時代と同じく highlight.js で装飾する。
export const renderPostHtml = (markdown) => {
  const $ = cheerio.load(marked.parse(markdown), null, false);
  $("pre code").each((_, el) => {
    const lang = ($(el).attr("class") || "").match(/language-([\w-]+)/)?.[1];
    const code = $(el).text();
    const result = lang && hljs.getLanguage(lang) ? hljs.highlight(code, { language: lang }) : hljs.highlightAuto(code);
    $(el).html(result.value).addClass("hljs");
  });
  return $.html();
};
