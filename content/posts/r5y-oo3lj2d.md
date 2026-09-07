---
title: "なぜTypeScriptが必要なのか？"
description: "TypeScriptがなぜ必要なのかを、JavaScriptの成り立ちと問題点（\"\" == 0 が true になる、型の異なる値を再代入できる）から説明し、静的型付けによる型推論でエラーを未然に防げることを具体例で示します。"
date: "2021-10-16T19:54:25.075Z"
updated: "2021-10-17T22:16:16.761Z"
category: "技術"
image: "/images/posts/r5y-oo3lj2d/cover.webp"
imageWidth: 1200
imageHeight: 675
pr: false
tags: ["TypeScript", "JavaScript", "型推論", "静的型付け", "入門"]
keyPoints:
  - "TypeScript は JavaScript のスーパーセットで、JavaScript の問題点を補うために生まれた"
  - "JavaScript は \"\" == 0 が true になったり、文字列の変数に数値を再代入できたりと、予期しない動作を許してしまう"
  - "TypeScript は静的型付けで、型推論により string 型の変数に number を代入するような矛盾を実行前に検知できる"
draft: false
---

TypeScript が必要な理由は、JavaScript が「予期しない動作」を許してしまう言語だからです。この記事では、JavaScript の成り立ちと問題点をざっと押さえたうえで、TypeScript の型推論がその問題をどう防ぐかを具体例で示します。TypeScript は聞いたことがあるけれど何がいいのか分からない、という方向けです。

## 概要

TypeScriptがなぜ必要なのかをざっくりと把握することを目的とします。  

### 対象者

TypeScript聞いたことあるけど、なにがいいんだろうと思っている方。  

## JavaScriptの簡単な概要と問題点について

TypeScriptはとJavaScriptのスーパーセット(上位互換)です。JavaScriptでできることはTypeScriptでもできます。  
TypeScriptという言語はJavaScriptの問題点を補うために生まれました。  
そのため、まずはじめにJavaScriptの**概要**と**問題点**を簡単に抑えておきましょう。  
![](/images/posts/r5y-oo3lj2d/image-1.webp)  
  
  

### JavaScriptの概要

JavaScript (ECMAScript としても知られています) は、ブラウザ用のスクリプト言語としてその生涯をスタートさせました。  
JavaScripを利用することで、Webサイトにて複雑な機能を実行することができます。  
例えば、Webサイトを訪問したとき、ポップアップ画面を表示したり、アニメーションが動いているのを見たことがあるのではないでしょうか？  
あのようなブラウザが「動く」ために、指示を出しているプログラミング言語としてJavaScriptが利用されています。  
  
また、インターネットの普及に応じてブラウザを利用するユーザーが増えてきたことから、ますますJavaScriptの人気が出てきました。  
それに伴い、Webブラウザの開発者は、実行エンジンの最適化やJavaScriptでできることの拡張 (API の追加) によってJavaScriptの需要の増加に対応してきました。そして、Web開発者はさらにJavaScriptを使用するようになりました。  
  
さらには、node.jsを使ってバックエンドをJavaScriptで実装するなど、ブラウザ以外でも利用できるほど普及してきました。  
最近では、JavaScriptだけを使ってフロントエンドとバックエンドを開発するフルスタックエンジニアがたくさんいます!  

### JavaScriptの問題点

上記の歴史で発展してきたJavaScriptですが、この言語には実は粗末さがあります。  
以下にいくつかの例を挙げてみましょう。  
  

-   "" == 0の条件判定がTrueとなってしまう。

```
if ("" == 0) {
// 条件式の結果はTrueとなりif文が実行される
}
```

-   以下のように文字列をいれた変数に数値を再代入できてしまう。

```
let moji = 'Hello World!';
moji = 10;
```

  
  
ほとんどのプログラミング言語は、コンパイル中、つまりコードが実行される前に上記のような事象に対してエラーを返却してくれます。  
ですが、JavaScriptにおいてはこのような**予期しない動作**を許してしまう問題点があります。  

## TypeScriptの特徴

TypeScriptの最大の特徴は「静的型付け言語」であることです。  
この特徴により、TypeScriptは**型定義**や**型推論**を行うことができます。  
  
今回は**型推論**について紹介していこうと思います。  
**型推論**とは文字の通り、TypeScriptが変数や関数の戻り値などの型を推論してくれる便利な機能です。  
  
**型推論**ができると何がいいのでしょうか？  
たとえば以下のコードを書いたとします。  

```
let moji = 'Hello World!';
moji = 10;// error : Type 'number' is not assignable to type 'string'.
```

  
エラーとして、**「型「number」は、型「string」には代入できません。」**という内容が返却されています。  
mojiという変数は最初にstring型とTypeScriptでは**型推論**されたため、その後にnumber型の10を代入ができないということを伝えているわけですね。  
これは型を推論したからこそ検知できたわけです。  
このようにJavaScriptでは型の矛盾を許していましたが、TypeScriptで矛盾を検知できるため、エラーを未然に防ぐことができます。  

## まとめ

以上がTypeScriptの特徴の１つである**型推論**についてでした！  
**型推論**だけでも大いにメリットはありますね。  
この記事で\`なぜTypeScriptが必要なのか？\`の理解が進みましたら幸いです。  
型定義の具体例は「[【TypeScript】型付けしてエラーを片付ける](/blog/7gocwtp2qu_u)」、関数の型付けをどこまでやるかは「[TypeScriptで関数をガッチガチにするまでのロードマップ](/blog/fkticc-lsi)」で書いています。  

### 参考文献

[https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
