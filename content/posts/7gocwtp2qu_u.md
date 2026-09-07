---
title: "【TypeScript】型付けしてエラーを片付ける"
description: "この記事の目的 TypeScriptを使うとJavaScriptで発生する予期せぬバグが減るっていわれてるけど、具体的にどのようなケースでエラーが減るの？という疑問を具体的な例で解決する。"
date: "2021-10-09T21:03:08.293Z"
updated: "2021-10-24T12:11:24.665Z"
category: "技術"
image: "/images/posts/7gocwtp2qu_u/cover.webp"
imageWidth: 304
imageHeight: 166
pr: false
draft: false
---

## この記事の目的

TypeScriptを使うとJavaScriptで発生する予期せぬバグが減るっていわれてるけど、具体的にどのようなケースでエラーが減るの？という疑問を具体的な例で解決する。  

## どんなエラーが片付くか？

### ケース1: タイプミスが減りバグが抑制される

TypeScriptは、JavaScriptで起こりうるタイプミスや型付けができないことによって発生するバグを抑制してくれます。  
  
以下のJavaScriptのコードを見てみましょう。  
このコードは最後のコンソール出力で`noteBook.color` を出力しようとしていますが、`noteBook.colorr`となっているためタイプミスが発生していると考えられます。  
  
sample.js

```
const noteBook = {
 color: "黒",
 price: 980,
 size: "A4"
}
console.log(noteBook.colorr); // colorをcolorrにしてある
```

  
  
こちらのJavaScriptのコードを実行してみると、undefinedが出力されます。  
特にエラーの文言は出力していないため、この変数を使った処理で予期せぬバグが発生しない限り、このエラーには気付けません。  

```
$ node sample.js
undefined
```

  
そこで、TypeScriptの登場です。  
上記の`sample.js` を`sample.ts`にコピペしてみます。  
  
sample.ts

```
const noteBook = {
 color: "黒",
 price: 980,
 size: "A4"
}
console.log(noteBook.colorr); // Property 'colorr' does not exist on type '{ color: string; price: number; size: string; }'. Did you mean 'color'?
```

  
JavaScriptの場合だとタイプミスがあった場合でもundefined が返却されるだけでしたが、TypeScriptの場合はコーディング中に指摘してくれます。  
エラーとしては、`type '{ color: string; price: number; size: string; }' にはプロパティ 'colorr' が存在しません。colorのことでしょうか？` と出力してくれています。  
VsCodeでコーディングした場合はこのように指摘してくれます。(ありがたい...!!)  
![](/images/posts/7gocwtp2qu_u/image-1.webp)  

### ケース2: 静的型付けで変数の型を制約させる

JavaScriptの変数は動的型付けとなり、どんな値でも変数に代入することができます。  
しかし、複数人でアプリケーションを構築する場合、予期せぬ値を使用されてしまうことがあります。  
例えば、「数値型を引数に取りたい関数に文字列を渡してしまう」などです。  
TypeScriptでは予め変数の型を定義できるため、他の値が設定されそうになると「この変数（引数）は数値型なので文字列型は代入できませんよ」と伝えてくれる機能があります。  
  
まずは以下のJavaScriptのコードを見てみましょう。  
  
sample2.js

```
function sum(a, b) {
 console.log(a + b);
}

sum(1, 2);
```

  
こちらのコードを実行すると以下のように出力されます。  

```
$ node sample2.js
3
```

  
当たり前ですね。笑  
次に、sum関数の引数に文字列を入れて\`sample2.js\`を実行してみようと思います。  
  
sample2.js

```
function sum(a, b) {
 console.log(a + b);
}

sum(1, "2"); //2つ目の引数に文字列"2"を代入
```

  
こちらを実行したら、一般的にはエラーを出力してもらいたいところですがJavaScriptの場合は以下のようにエラーを出力せずに実行できてしまうんです。。

```
$ node sample2.js
12
```

このようにsum関数に`文字列"2"` が代入されたことによって、JavaScriptさんは`a + b`を文字列の連結と認識してしまい`"1" + "2" = "12"`という処理をしてしまったようです。  
これはsum関数を実装したプログラマーにとっては予期せぬ振る舞いですね😱  
  
こういったエラーですが、TypeScriptの`型定義` で解決できます！！  
以下のコードは上記のsampe2.jsのsum関数の引数に対して、\`型定義\`を施してあります。  
`型定義` の方法は簡単で、引数(変数)のとなりに`:型`を書くことで実現できます。  
今回は、引数には数値型しか受け付けたくないので、引数の隣に\`:number\`を記述しています。  
  
sample2.js

```
function sum(a: number, b: number) {
 console.log(a + b)
}

sum(1, "2"); //Argument of type 'string' is not assignable to parameter of type 'number'.
```

  
  
お、TypeScriptさんはコード実行前に最後の行に対して、エラーを指摘しているようです。  
`string 型の引数は number 型のパラメータには代入できません。` と指摘されています。  
そのとおりですね。とても親切。  
  
ちなみにVsCode上だとこのようにエラーが表示されます。  
![](/images/posts/7gocwtp2qu_u/image-2.webp)  

## まとめ

以上がTypeScriptを使うことによって、エラーが解決される具体的なケースでした。  
TypeScriptを使えば、エラーに迅速に気づけますし、バグを含んだコードをcommitするリスクも低減されるので手戻り工数も削減されます。  
  
それでは、よいTypeScriptライフを！
