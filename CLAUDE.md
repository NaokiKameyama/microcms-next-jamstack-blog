# あつかんブログ

Next.js 11（pages router）+ Markdown 記事。Vercel にデプロイ。

## ルール

- **commit / push はしない**。変更は Changes のまま残して報告する。ユーザーが明示的に頼んだときだけ代行する
- 記事は `.claude/skills/write-post/SKILL.md` の手順に従う（SEO / AIO / LLMO の項目を毎回満たす）

## コマンド

- 開発: `NODE_OPTIONS=--openssl-legacy-provider npm run dev`（Node 18+ ではこのフラグが必須）
- ビルド: `NODE_OPTIONS=--openssl-legacy-provider npm run build`
- 記事の検証: `node scripts/check-posts.js`
- 新規記事: `node scripts/new-post.js <slug> "<タイトル>" [category]`
- 画像の WebP 化: `npm run optimize:images`（記事内の参照も書き換える）
- 依存の追加は `npx yarn@1 add` と `npm i --package-lock-only --legacy-peer-deps` の両方でロックファイルを揃える

## 記事

- 本体: `content/posts/<slug>.md`。slug がそのまま `/blog/<slug>` になる（既存記事の slug は変えない）
- 画像: `public/images/posts/<slug>/`
- 読み込み: `lib/posts.js`（webpack の require.context で同梱。実行時にファイルは読まない）
- 書き方は `.claude/skills/write-post/SKILL.md`

## 収益・SEO

- AdSense: スクリプトは `pages/_document.tsx`、ユニットは `components/AdSense`
- SEO: `components/Seo`（description / OGP / canonical / JSON-LD）
- sitemap / RSS / llms.txt: `pages/api/{sitemap,feed,llms}.js`（`next.config.js` の rewrites で割当）、robots: `public/robots.txt`
- カテゴリページ: `pages/category/[name].tsx`。記事の見出しは h2 から（h1 は記事タイトル）
