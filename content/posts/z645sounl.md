---
title: "2週間でFlutter初心者がアプリ作成して、AppStoreにリリースしてみた。"
description: "こんにちは。 最近Flutterが流行っているということで、Flutterでアプリ作成して、AppStoreにアプリリリースしてみました。"
date: "2021-10-23T13:53:54.553Z"
updated: "2021-10-23T14:58:48.148Z"
category: "その他"
image: "/images/posts/z645sounl/cover.webp"
imageWidth: 1200
imageHeight: 676
pr: false
draft: false
---

こんにちは。  
   
最近Flutterが流行っているということで、Flutterでアプリ作成して、AppStoreにアプリリリースしてみました。  
   
もともと作ってみたいアプリがありまして、  
「英単語とその意味」をスマホに定期的にpush通知するアプリを作ってみました。  
[**英単語通知**](https://apps.apple.com/jp/app/%E8%8B%B1%E5%8D%98%E8%AA%9E%E9%80%9A%E7%9F%A5/id1582213197?uo=4&at=10l8JW&ct=hatenablog)  
まずはじめにアプリの簡単な紹介をさせてください！  

## アプリ説明

アプリを起動しなくてもプッシュ通知により片手間で英単語を学習できるというアプリです。  
英単語をひたすら覚えるという学習にはやる気が出ないという方も多いはず。  
そんな方におすすめなのがこのアプリです。  
英単語通知アプリでは、覚えるべき「単語」と「意味」をプッシュ通知してくれるため、通勤時間中やトイレの中など隙間時間でアプリ起動の手間もなくチャットメッセージを受けるような感覚で英単語学習が可能です。  
単語の難易度やプッシュ通知の時間間隔、非通知時間帯が選択可能です。  
TOEIC頻出単語にも対応しているので、試験対策にもおすすめです。  
ストレスなく効率的に英単語力を上げたい方はぜひとも活用したいアプリです。  
   
   
それでは、このアプリを作って、リリースするまでのざっくりな過程をこの記事に記していこうと思います！  

## 1日目 \~ 5日目 (Flutter学習期間)

まずはFutterを勉強しよう！ということで、Udemyで学習しました。  
自分はこのコンテンツで学習しました。

<iframe frameborder="0" allowfullscreen="true" src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fwww.udemy.com%2Fcourse%2Fflutter-bootcamp-with-dart%2F"></iframe>

[www.udemy.com](https://www.udemy.com/course/flutter-bootcamp-with-dart/)  

## 6日目〜12日目 (アプリ作成期間)

  
 <span style="color:#454545">以下のような構成のアプリを作ろうとまずは設計しました。</span>  
①の通知設定では、  
・どのレベルの単語を通知するか  
・何分間間隔で通知するか  
・通知したくない時間帯  
を設定することができます。  
その情報をFireStoreというFirebaseのデータベースに各ユーザーごとに保存しておきます。  
   
②の各ユーザの設定情報を参照では、  
FirebaseのcloudFunctionsという機能を使っていて、定期的に各ユーザの通知設定情報を参照するスケジューリングしています。  
   
③の通知実行では、  
FIrebaseCoudMessagingという機能を利用して、Push通知をしています。  
   
このような機能を約6日で作成しました。  

## 12日目〜14日目(アプリリリース期間) 

次にアプリリリース開始！となるのですが、ここが結構めんどくさかったです。  
この記事を参考に勧めました。

<iframe frameborder="0" allowfullscreen="true" src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fqiita.com%2Fkasa_le%2Fitems%2Ffed9f25b92091bd162ce"></iframe>

[qiita.com](https://qiita.com/kasa_le/items/fed9f25b92091bd162ce)  
   
12日目に申請してから2日後の14日目にようやく申請が通り、見事AppStoreに自分が作成したアプリが公開されました！！  
こんなかんじです。  
  
![](/images/posts/z645sounl/image-1.webp)  
ここに表示されたときは、正直かなり感動しました。。。  

## 最後に

いや〜、AppStoreに自分の成果物が掲載されるのはとても嬉しいですね。  
今後も、ほしいアプリがあったら作成していこうと思います。
