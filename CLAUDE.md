# あつかんブログ

Next.js 11（pages router）+ Markdown 記事。Vercel にデプロイ。

## コマンド

- 開発: `NODE_OPTIONS=--openssl-legacy-provider npm run dev`（Node 18+ ではこのフラグが必須）
- ビルド: `NODE_OPTIONS=--openssl-legacy-provider npm run build`
- 記事の検証: `node scripts/check-posts.js`
- 新規記事: `node scripts/new-post.js <slug> "<タイトル>" [category]`
- 依存の追加は `npx yarn@1 add` と `npm i --package-lock-only --legacy-peer-deps` の両方でロックファイルを揃える

## 記事

- 本体: `content/posts/<slug>.md`。slug がそのまま `/blog/<slug>` になる（既存記事の slug は変えない）
- 画像: `public/images/posts/<slug>/`
- 読み込み: `lib/posts.js`（webpack の require.context で同梱。実行時にファイルは読まない）
- 書き方は `.claude/skills/write-post/SKILL.md`

## 収益・SEO

- AdSense: スクリプトは `pages/_document.tsx`、ユニットは `components/AdSense`
- SEO: `components/Seo`（description / OGP / canonical / JSON-LD）
- sitemap: `pages/api/sitemap.js`（`/sitemap.xml` に rewrite）、robots: `public/robots.txt`
