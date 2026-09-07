---
name: write-post
description: あつかんブログの記事を書く・直す。素材（メモ・ログ・スクショ）から下書きを作り、frontmatter と品質チェックまで通す。
---

# あつかんブログの記事を書く

記事は `content/posts/<slug>.md`（Markdown + frontmatter）。`git push` で公開される。
画像は `public/images/posts/<slug>/`。アイキャッチは `cover.jpg`。

## 手順

1. 素材を受け取る（箇条書き・ターミナルログ・スクショ・音声メモの文字起こし）。**素材にない事実や数値を補わない**。足りなければ聞く
2. `node scripts/new-post.js <slug> "<タイトル>" [技術|金融|働き方|その他]` で雛形を作る
3. 型を選んで本文を書く（下の「記事の型」）
4. frontmatter を埋める（title / description / date / category / image / pr）
5. 画像（アイキャッチ `cover.png`・本文の `image-N.png`）を `public/images/posts/<slug>/` に置き、`npm run optimize:images` で WebP 化する（記事内の参照も自動で書き換わる）
6. `node scripts/check-posts.js` を通す。`npm run dev` で `/blog/<slug>` を確認（開発中は draft も表示される）
7. 公開するときは `draft: false` にして push

## 記事の型

- **やってみた**（主力）: 背景（なぜやったか 2〜3 行）→ 手順（コード・スクショ付き）→ 結果 → ハマった点 → 判断・結論
- **比較・選定**: 前提と制約 → 候補 → 比較表 → 選んだ理由 → 使ってみた所感
- **体験談・キャリア**: 状況 → 判断とその理由 → 結果 → 今なら何をするか
- **解説**: 読者の疑問 → 結論を先に → 理由 → 具体例 → 落とし穴

どの型でも、**筆者が実際にやった・判断した一次情報**を必ず入れる。一般論だけの記事は書かない。

## 文体

- 「です・ます」。一文は短く、結論を先に
- 見出しは `##`（h2）を 3〜5 本、小見出しは `###`。h1（`#`）は使わない（記事タイトルが h1）
- 最初の段落で結論を言い切る（検索結果と AI の要約に使われる）。description と矛盾させない
- コードは言語指定付きのフェンス（```ts など）。実行結果も載せる
- 断定できることは断定し、推測は「〜と思います」と分ける
- 金融の記事は末尾に「投資判断はご自身の責任でお願いします」を入れる

## frontmatter

```yaml
title: 32 字以内が目安。検索されそうな言葉を前に
description: 100〜120 字。検索結果に出る。記事で何が分かるかを書く
date: ISO 形式。未来にすると予約投稿
category: 技術 | 金融 | 働き方 | その他
image: /images/posts/<slug>/cover.webp（optimize:images が imageWidth / imageHeight も埋める）
pr: アフィリエイトリンクを含むなら true（記事上部に PR 表記が出る。法律上必須）
draft: 下書きなら true
```

## 公開前チェック

- [ ] 素材にない事実を書いていない
- [ ] タイトルに検索語が入っている
- [ ] description が 120 字以内で、記事の中身を言い切っている
- [ ] 内部リンク（既存記事）を 1 本以上入れた
- [ ] 画像に alt がある
- [ ] アフィリエイトがあるなら `pr: true`
- [ ] `node scripts/check-posts.js` が OK
