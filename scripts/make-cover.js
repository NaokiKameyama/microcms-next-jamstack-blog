#!/usr/bin/env node
// アイキャッチ画像を生成する（1200×630、サイトのグラデーションに白文字）。
// 使い方: node scripts/make-cover.js <slug> "<タイトル（改行は \n）>" ["<上に置く小さなラベル>"]
// 生成後は npm run optimize:images で WebP 化される。
// Chrome の場所は CHROME_PATH で上書きできる。
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const [slug, titleArg, label = ""] = process.argv.slice(2);
if (!slug || !titleArg) {
  console.error('使い方: node scripts/make-cover.js <slug> "<タイトル>" ["<ラベル>"]');
  process.exit(1);
}
const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const title = escape(titleArg).replace(/\\n/g, "<br>");
const dir = path.join(__dirname, "..", "public", "images", "posts", slug);
fs.mkdirSync(dir, { recursive: true });

// タイトルの長さで文字サイズを変える（改行なしの最長行を基準に）
const longest = Math.max(...titleArg.split("\\n").map((l) => l.length));
const fontSize = longest <= 10 ? 76 : longest <= 14 ? 66 : longest <= 18 ? 56 : 48;

const html = `<!doctype html><html><body style="margin:0">
<div style="width:1200px;height:630px;box-sizing:border-box;padding:70px 90px;display:flex;flex-direction:column;justify-content:center;
  background:linear-gradient(45deg,#9d98ff,#5aaefc);color:#fff;
  font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Hiragino Kaku Gothic ProN',sans-serif">
  ${label ? `<div style="font-size:30px;font-weight:700;opacity:.92;letter-spacing:.04em;text-shadow:0 1px 6px rgba(0,0,0,.18)">${escape(label)}</div>` : ""}
  <div style="font-size:${fontSize}px;font-weight:800;line-height:1.3;margin-top:${label ? 22 : 0}px;text-shadow:0 2px 14px rgba(0,0,0,.28)">${title}</div>
  <div style="font-size:26px;font-weight:600;margin-top:40px;opacity:.92;text-shadow:0 1px 6px rgba(0,0,0,.18)">🦄 atukan-blog.com</div>
</div></body></html>`;

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html);
  await new Promise((r) => setTimeout(r, 400));
  const out = path.join(dir, "cover.png");
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  console.log(`生成: ${path.relative(process.cwd(), out)}（次に npm run optimize:images）`);
})().catch((e) => { console.error(e.message); process.exit(1); });
