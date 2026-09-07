// public/images/posts/<slug>/ の画像を WebP に変換してリサイズし、記事内の参照を書き換える。
//   cover.*   → cover.webp（最大 1200px 幅）+ cover-600.webp（一覧カード用）
//   image-N.* → image-N.webp（最大 1200px 幅）
// 元の PNG/JPEG は削除する。何度実行しても安全（変換済みはスキップ）。
// 使い方: npm run optimize:images
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "images", "posts");
const MD_DIR = path.join(ROOT, "content", "posts");
const MAX_WIDTH = 1200;
const THUMB_WIDTH = 600;
const QUALITY = 80;

const kb = (file) => Math.round(fs.statSync(file).size / 1024);

async function toWebp(src, dest, width) {
  const image = sharp(src, { animated: false });
  const meta = await image.metadata();
  await image.resize({ width: Math.min(width, meta.width), withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(dest);
  return sharp(dest).metadata();
}

async function main() {
  let before = 0, after = 0;
  const replacements = []; // [slug, oldName, newName]
  const coverDims = {}; // slug → {width,height}

  for (const slug of fs.readdirSync(IMG_DIR)) {
    const dir = path.join(IMG_DIR, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const file of fs.readdirSync(dir)) {
      const m = file.match(/^(cover|image-\d+)\.(png|jpe?g)$/i);
      if (!m) continue;
      const base = m[1];
      const src = path.join(dir, file);
      const dest = path.join(dir, `${base}.webp`);
      before += kb(src);
      const meta = await toWebp(src, dest, MAX_WIDTH);
      after += kb(dest);
      if (base === "cover") {
        await toWebp(src, path.join(dir, "cover-600.webp"), THUMB_WIDTH);
        coverDims[slug] = { width: meta.width, height: meta.height };
      }
      fs.unlinkSync(src);
      replacements.push([slug, file, `${base}.webp`]);
    }
    // 既に webp 化済みで、カード用サムネだけ無い場合も作る
    const cover = path.join(dir, "cover.webp");
    if (fs.existsSync(cover) && !fs.existsSync(path.join(dir, "cover-600.webp"))) {
      await toWebp(cover, path.join(dir, "cover-600.webp"), THUMB_WIDTH);
    }
  }

  // 記事内の参照を書き換え、frontmatter の画像サイズを更新
  for (const md of fs.readdirSync(MD_DIR).filter((f) => f.endsWith(".md"))) {
    const file = path.join(MD_DIR, md);
    let text = fs.readFileSync(file, "utf8");
    const orig = text;
    for (const [slug, oldName, newName] of replacements) {
      text = text.split(`/images/posts/${slug}/${oldName}`).join(`/images/posts/${slug}/${newName}`);
    }
    const slug = md.replace(/\.md$/, "");
    if (coverDims[slug]) {
      text = text.replace(/^imageWidth: .*$/m, `imageWidth: ${coverDims[slug].width}`).replace(/^imageHeight: .*$/m, `imageHeight: ${coverDims[slug].height}`);
      if (!/^imageWidth:/m.test(text)) text = text.replace(/^(image: .*)$/m, `$1\nimageWidth: ${coverDims[slug].width}\nimageHeight: ${coverDims[slug].height}`);
    }
    if (text !== orig) fs.writeFileSync(file, text);
  }

  console.log(`変換 ${replacements.length} 枚: ${before} KB → ${after} KB`);
}

main().catch((e) => { console.error(e); process.exit(1); });
