#!/usr/bin/env node
// 使い方: node scripts/new-post.js <slug> "<タイトル>" [category]
// content/posts/<slug>.md を下書き（draft: true）で作る。slug はそのまま URL になる。
const fs = require("fs");
const path = require("path");
const { CATEGORY_ORDER } = require("../lib/post-schema");

const [slug, title, category = "技術"] = process.argv.slice(2);
if (!slug || !title) {
  console.error('使い方: node scripts/new-post.js <slug> "<タイトル>" [category]');
  process.exit(1);
}
if (!/^[a-z0-9][a-z0-9_-]*$/.test(slug)) {
  console.error("slug は英小文字・数字・_ - のみ（例: claude-code-pm-spec）");
  process.exit(1);
}
if (!CATEGORY_ORDER.includes(category)) {
  console.error(`category は ${CATEGORY_ORDER.join(" / ")} のいずれか`);
  process.exit(1);
}
const file = path.join(__dirname, "..", "content", "posts", `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`${file} は既にあります`);
  process.exit(1);
}
fs.mkdirSync(path.join(__dirname, "..", "public", "images", "posts", slug), { recursive: true });
const today = new Date().toISOString();
fs.writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
description: ""
date: ${JSON.stringify(today)}
category: ${JSON.stringify(category)}
image: "/images/posts/${slug}/cover.webp"
pr: false
draft: true
---

## はじめに

`
);
console.log(`作成: content/posts/${slug}.md（draft: true）`);
console.log(`アイキャッチ: public/images/posts/${slug}/cover.png（または jpg）を置いて npm run optimize:images を実行してください`);
