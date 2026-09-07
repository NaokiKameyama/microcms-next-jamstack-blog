---
title: "microCMSをやめてMarkdown+Claude Codeで書く"
description: "5年放置したNext.jsブログの記事をmicroCMSからリポジトリ内のMarkdownへ移した手順と、変換・画像・Vercel・型で実際にハマった5点、移行後の執筆フローをまとめます。"
date: "2026-09-07T01:45:58.414Z"
category: "技術"
image: "/images/posts/microcms-to-markdown-claude-code/cover.webp"
imageWidth: 1200
imageHeight: 630
pr: false
tags: ["Next.js", "microCMS", "Markdown", "Claude Code", "Vercel", "ブログ移行"]
keyPoints:
  - "microCMS の 12 記事をリポジトリ内の Markdown に移し、Claude Code が記事を書いて git push で公開できる体制にした"
  - "URL は /blog/<記事ID> のまま維持し、画像 51 枚をローカルに取り込み、全記事で本文が一致することを機械的に確認した"
  - "ハマったのは &nbsp; のインデント、~ の取り消し線、日本語の画像ファイル名、Vercel が postbuild の public/ を配信しない、TypeScript の props 推論の 5 点"
draft: false
---

結論から書くと、ブログの記事を microCMS からリポジトリ内の Markdown に移し、Claude Code が記事を書いて `git push` で公開できる体制にしました。URL は変えず、12 記事・画像 51 枚を機械的に検証しながら移しています。変換でハマった 5 点と、移行後の書き方をまとめます。

## なぜ microCMS をやめたのか

このブログは Next.js 11 + microCMS + Vercel で 2021 年に作りました。記事は 12 本、最後の更新は 2021 年 10 月。ほぼ 5 年、何も書いていません。

久しぶりに再開するにあたって、記事は AI（Claude Code）と一緒に書くことに決めました。すると microCMS がボトルネックになります。AI が書いた下書きを管理画面に貼り、画像を別途アップロードし、公開ボタンを押す。この「貼る」作業が毎回挟まります。

記事をリポジトリ内の Markdown にすれば、Claude Code が記事ファイルを直接書いて、直して、`git push` で公開まで進められます。過去記事の一括修正も「全記事に PR 表記を足して」の一言で済みます。個人ブログで非エンジニアが編集することもないので、CMS を残す理由がありませんでした。

| | microCMS | Markdown + Git |
| --- | --- | --- |
| 下書きから公開まで | AI → 管理画面に貼る → 画像アップ → 公開 | Claude Code が書く → `git push` |
| 過去記事の一括修正 | 1 本ずつ手で | 1 回の指示で全記事 |
| 版管理・差し戻し | なし | git |
| 非エンジニアの編集 | できる | できない |

## 移行でやったこと

作業自体は Claude Code に任せ、私は方針の決定と確認だけをしました。やったことは次の 5 つです。

1. **エクスポート**：microCMS の API で全記事とカテゴリを JSON に保存する
2. **HTML → Markdown**：リッチエディタの HTML を turndown で Markdown に変換し、frontmatter に title / description / date / category / image / pr / draft を持たせる
3. **画像の取り込み**：本文とアイキャッチ計 51 枚を `public/images/posts/<記事ID>/` にダウンロードし、参照をローカルに書き換える
4. **読み込みの差し替え**：`getStaticProps` で microCMS を叩いていた部分を、`content/posts/*.md` を読む処理に置き換える
5. **検証**：変換前後で本文の可視テキストが一致するか、全記事で機械的に比較する

URL は `/blog/<記事ID>` のまま変えていません。ファイル名を microCMS の記事 ID にしただけで、検索エンジンの評価はそのまま引き継げます。

記事の読み込みは webpack の `require.context` で `.md` を同梱する形にしました。ビルド時の `getStaticProps` でも、Vercel のサーバレス関数（サイトマップ生成）でも同じコードで動き、実行時にファイルシステムを触りません。

```js
// lib/posts.js
const context = require.context("../content/posts", false, /\.md$/);

export const getAllPosts = () =>
  context.keys().map((key) => {
    const raw = context(key);
    const id = key.replace(/^\.\//, "").replace(/\.md$/, "");
    return parsePost(id, raw); // gray-matter で frontmatter を読む
  });
```

`next.config.js` 側は、`.md` を文字列として扱う rule を 1 行足すだけです。

```js
config.module.rules.push({ test: /\.md$/, type: "asset/source" });
```

結果、12 記事すべてで移行前後の本文が一致し、`next build` も通りました。

## ハマった点

変換は一発では終わりませんでした。実際に引っかかった順に書きます。

### 1. コードブロックのインデントが `&nbsp;` だった

microCMS のリッチエディタは、コード内の空白を `&nbsp;` で保存していました。そのまま Markdown にすると見た目は空白なのに別の文字（U+00A0）が混ざり、コピーしたコードが動きません。変換後にコードフェンスの中だけ通常の空白に置換しました。

### 2. `~` が取り消し線になる

本文に「W1~W784」のような範囲表記があり、Markdown レンダラー（marked）が `~` を取り消し線の記号として解釈して文字が消えました。コードの外にある `~` を `\~` にエスケープして解決しました。

### 3. 画像のファイル名が日本語のままだと配信されない

microCMS の画像 URL には「スクリーンショット 2021-10-26.png」のような日本語名が百分率エンコードで入っています。そのまま保存すると、ブラウザが復号したパスとディスク上のファイル名が食い違って 404 になります。記事ごとに `image-1.png` のような連番に付け直しました。

### 4. Vercel はビルド後に `public/` へ書いたファイルを配信しない

サイトマップを `next-sitemap` で `postbuild` に生成していましたが、本番では 404 でした。Vercel は `next build` の時点で `public/` を取り込むので、後から書いたファイルは含まれません。サイトマップは API ルートで動的に返し、`/sitemap.xml` に rewrite する形に変えました。

### 5. JS コンポーネントの props を TypeScript が「必須」と推論する

`<Seo path="/" />` のように一部の props だけ渡すと、`next build` の型チェックが落ちました。JS で書いたコンポーネントは、分割代入した props がすべて必須と推論されます。隣に `.d.ts` を置いて省略可能と宣言して通しました。

このほか、Node 24 で Next.js 11 を動かすには `NODE_OPTIONS=--openssl-legacy-provider` が要る、`next export` と `next/image` の標準ローダーは併用できない、といった古い構成ならではの引っかかりもありました。

## 移行後の書き方

記事を書く手順はこうなりました。

```bash
npm run new:post <slug> "<タイトル>" 技術   # 雛形を作る（draft: true）
# Claude Code に素材（メモ・ログ・スクショ）を渡して本文を書かせる
npm run check:posts                       # frontmatter・画像・PR 表記を検証
# draft: false にして git push → Vercel が公開
```

執筆のルール（記事の型、文体、公開前チェック）は Claude Code のスキルとしてリポジトリに置きました。素材にない事実を書かない、見出しは h2 を 3〜5 本、アフィリエイトがあれば PR 表記、といった約束を毎回同じ品質で守れます。この記事も、その流れで書いた最初の 1 本です。

## やらない方がいい人

- 非エンジニアが記事を編集する → 管理画面のある CMS の方が向いています
- 画像が多く、リポジトリを太らせたくない → 画像だけ外部ストレージに置く構成を考えた方がよいです
- WYSIWYG で書きたい → Markdown のプレビューはローカルか Vercel のプレビュー環境になります

個人の技術ブログで、書く人が自分だけで、AI と一緒に書くなら、CMS を外すメリットの方が大きいと思います。このブログの Next.js 側の構成は「[【ほぼコピペで実装】Next.jsにGoogle Analyticsを導入する方法](/blog/h083ln82p)」を書いた頃からほぼ変わっていないので、同じ構成の方は参考にしてください。
