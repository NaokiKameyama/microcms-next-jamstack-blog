---
title: "QiitaのVIew数とLGTM数をAPIで取得する"
description: "自分のQiita記事のView数とLGTM数を、Qiita APIとcurlで取得する手順です。アクセストークンの取得先と、jqで整形して見やすく出力するコマンドをコピペで使える形でまとめました。"
date: "2021-10-18T02:20:24.765Z"
updated: "2021-10-18T02:23:24.079Z"
category: "技術"
image: "/images/posts/5xkwfd8e3h/cover.webp"
imageWidth: 800
imageHeight: 482
pr: false
tags: ["Qiita", "API", "jq", "curl", "シェル"]
keyPoints:
  - "Qiita API にアクセストークンを付けて curl で叩けば、自分の記事の View 数と LGTM 数が取れる"
  - "返ってくる JSON は jq で整形すると読みやすい"
  - "必要なパラメータはアクセストークンと取得したい記事数の 2 つだけ"
draft: false
---

自分の Qiita 記事の View 数と LGTM 数は、Qiita の API を curl で叩けばまとめて取得できます。必要なのはアクセストークンと取得したい記事数だけで、結果は jq で整形すると見やすくなります。この記事では、そのコマンドをコピペで使える形で紹介します。

## この記事の目的

自分のQiitaの記事のVIew数とLGTM数を取得する方法を説明します。  
本記事を作成するにあたって[こちら](https://qiita.com/Sho-heikun/items/6d5b938d1ea4adb89a08#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E7%99%BA%E8%A1%8C%E6%96%B9%E6%B3%95)の記事を参考にさせていただきました。  

## VIew数とLGTM数を取得するAPI

  
まずはじめに`jq` コマンドをインストールしましょう。  
`jq` コマンドはAPIの返却形式のJSONを見やすく整形してくれます。  

```
brew install jq
```

  
次に、APIを実行するために`アクセストークン`を取得しましよう。  
[こちら](https://qiita.com/settings/applications)から取得してください。  
取得したら以下のコマンドにパラメータ入力してください。  
パラメータは以下の2つです。

-   `アクセストークン`
-   `取得したい記事数`  

```
curl -sH 'Authorization: Bearer アクセストークン' \
"https://qiita.com//api/v2/authenticated_user/items?page=1&per_page=取得したい記事数" \
| jq -r ".[].id" \
| xargs -P 3 -I {id} curl -sH 'Authorization: Bearer アクセストークン' https://qiita.com/api/v2/items/{id} \
| jq '"\(.title), VIEW: \(.page_views_count), LGTM: \(.likes_count)"'
```

  
  
パラメータを入力したら、あとは`Terminal` などでにコマンドを貼り付けて実行するだけです！  
実行すると以下のような情報を取得できます。  
  
![](/images/posts/5xkwfd8e3h/image-1.webp)  

## まとめ

本記事では、QiitaのVIew数とLGTM数をAPIで取得する方法をご紹介しました！

jq コマンドの使い方は「[【jq】jsonデータを見やすくする](/blog/obue7xt7ef)」にまとめています。
