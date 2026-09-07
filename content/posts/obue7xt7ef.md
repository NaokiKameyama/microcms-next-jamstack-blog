---
title: "【jq】jsonデータを見やすくする"
description: "JSONを見やすく整形するjqコマンドの使い方です。インストール方法と、整形あり・なしの出力を並べて比較し、APIのレスポンスを読むときにjqを通すべき理由を示します。"
date: "2021-10-18T02:28:37.452Z"
updated: "2021-10-18T02:28:44.135Z"
category: "技術"
image: "/images/posts/obue7xt7ef/cover.webp"
imageWidth: 710
imageHeight: 487
pr: false
tags: ["jq", "JSON", "コマンドライン", "ターミナル", "API"]
keyPoints:
  - "jq コマンドに JSON を渡すだけで、改行とインデント付きで読みやすく整形される"
  - "整形なしだと 1 行に潰れて読めない。API のレスポンスを確認するときは jq を通す"
draft: false
---

JSON をターミナルで読むなら jq コマンドを通すのがいちばん簡単です。整形なしだと 1 行に潰れて読めないので、API のレスポンスを確認するときは jq を通すのが基本です。この記事では、jq のインストールと、整形あり・なしの出力を並べて比較します。

## 本記事の目的

jsonデータを見やすくする方法を紹介します。  

## jqコマンドでjsonデータを見やすくる

`jq` コマンドを使うことでjsonデータを見やすくすることが可能です。  
まずは`jq` コマンドをインストールしましょう。  

```
brew install jq
```

  
では早速`jq` コマンドを使ってみましょう。  
以下のようなデータがあったとします。

```
[{"name": "taro", "age": 10},{"name": "ziro", "age": 20},{"name": "saburo", "age": 30}]
```

  
こちらのデータをjqコマンドを使って出力すると

```
echo '[{"name": "taro", "age": 10},{"name": "ziro", "age": 20},{"name": "saburo", "age": 30}]' | jq
```

  
このようになります。

```
[
 {
  "name": "taro",
  "age": 10
 },
 {
  "name": "ziro",
  "age": 20
 },
 {
  "name": "saburo",
  "age": 30
 }
]
```

  
jqコマンドを使わない場合は、

```
echo '[{"name": "taro", "age": 10},{"name": "ziro", "age": 20},{"name": "saburo", "age": 30}]'
```

  
このようになります。

```
[{"name": "taro", "age": 10},{"name": "ziro", "age": 20},{"name": "saburo", "age": 30}]
```

`jq` コマンドを使わない場合は見にくいですね。  

## まとめ

jsonのデータを出力する時は`jq` コマンドを使いましょう！

実際に API のレスポンスを jq で整形する例は「[QiitaのVIew数とLGTM数をAPIで取得する](/blog/5xkwfd8e3h)」で使っています。
