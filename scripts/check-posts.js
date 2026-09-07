// content/posts/*.md の frontmatter を検証する。
// next.config.js の先頭で呼ばれるので、壊れた記事があるとビルドも dev も止まる。
const fs = require("fs");
const path = require("path");
const { parsePost } = require("../lib/post-schema");

const POSTS_DIR = path.join(__dirname, "..", "content", "posts");
const AFFILIATE = /amazon-adsystem|amzn\.to|amazon\.co\.jp\/|rakuten\.co\.jp|a8\.net|moshimo|valuecommerce|accesstrade/i;

function check() {
  const errors = [];
  const warnings = [];
  if (!fs.existsSync(POSTS_DIR)) return { errors: [`${POSTS_DIR} がありません`], warnings };
  for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
    const id = file.replace(/\.md$/, "");
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(id)) errors.push(`${file}: ファイル名は英小文字・数字・_ - のみ（URL になります）`);
    let post;
    try {
      post = parsePost(id, fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
    } catch (e) {
      errors.push(e.message);
      continue;
    }
    if (post.description.length > 120) warnings.push(`${file}: description が ${post.description.length} 文字（120 以内推奨）`);
    if (post.title.length > 40) warnings.push(`${file}: title が ${post.title.length} 文字（32〜40 以内推奨）`);
    if (!fs.existsSync(path.join(__dirname, "..", "public", post.image.url))) errors.push(`${file}: image ${post.image.url} が public/ にありません`);
    if (AFFILIATE.test(post.content) && !post.pr) errors.push(`${file}: アフィリエイトリンクがあるのに pr: true がありません（ステマ規制）`);
    for (const m of post.content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
      if (m[1].startsWith("/") && !fs.existsSync(path.join(__dirname, "..", "public", m[1]))) errors.push(`${file}: 画像 ${m[1]} が public/ にありません`);
    }
    if (/!\[\]\(/.test(post.content)) warnings.push(`${file}: alt テキストが空の画像があります`);
  }
  return { errors, warnings };
}

function run({ exitOnError = false } = {}) {
  const { errors, warnings } = check();
  warnings.forEach((w) => console.warn(`[posts] 注意: ${w}`));
  errors.forEach((e) => console.error(`[posts] エラー: ${e}`));
  if (errors.length && exitOnError) {
    console.error(`[posts] 記事に ${errors.length} 件のエラーがあります。修正してください。`);
    process.exit(1);
  }
  return errors.length === 0;
}

module.exports = { check, run };
if (require.main === module) {
  const ok = run({ exitOnError: true });
  if (ok) console.log("[posts] OK");
}
