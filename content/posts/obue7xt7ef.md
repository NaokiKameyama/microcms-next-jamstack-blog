---
title: "【jq】jsonデータを見やすくする"
description: "本記事の目的 jsonデータを見やすくする方法を紹介します。 jqコマンドでjsonデータを見やすくる jq コマンドを使うことでjsonデータを見やすくすることが可能です。"
date: "2021-10-18T02:28:37.452Z"
updated: "2021-10-18T02:28:44.135Z"
category: "技術"
image: "/images/posts/obue7xt7ef/cover.webp"
imageWidth: 710
imageHeight: 487
pr: false
draft: false
---

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
