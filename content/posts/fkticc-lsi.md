---
title: "TypeScriptで関数をガッチガチにするまでのロードマップ"
description: "記事の目的 関数の型付けといってもどこまでガチガチにやるのか？という議論があると思います。 今回はその議論の参考となる記事を書きたいと思い、関数の型付けのレベルを段階に分けて説明していこうと思います。"
date: "2021-10-24T04:47:37.955Z"
updated: "2021-10-24T04:47:37.955Z"
category: "技術"
image: "/images/posts/fkticc-lsi/cover.webp"
imageWidth: 1200
imageHeight: 674
pr: false
draft: false
---

## 記事の目的

関数の型付けといってもどこまでガチガチにやるのか？という議論があると思います。  
今回はその議論の参考となる記事を書きたいと思い、関数の型付けのレベルを段階に分けて説明していこうと思います。  

## TypeScriptで関数をガッチガチにするまでのロードマップ

### 第0段階 (型付けなし😱)

  
以下に`x + y` で足し算を行うJavaScriptで定義したadd関数を記述してみました。  
こちらはまだ型付けは一切していない状態です。  
(ちなみに以下のコードは型付けをしていないのでバグの温床となるリスクが高いです。その理由は[こちら](https://www.atukan-blog.com/blog/7gocwtp2qu_u)で説明しています。)

```
let add = (x, y) => {
 return x + y;
};

console.log(add(1,2)); //3
```

### 第1段階 (最低限の型付け😀)

  
上記のコードに型を追加してみると以下のようになります。  
それぞれのパラメータに型を追加し、関数自体に戻り値の型も追加しています。  
これにより、例えば引数に文字列が渡されるよなバグ等を未然に検知できる状態になりました😀

```
let add = (x: number, y: number): number => {
 return x + y;
};

console.log(add(1,2)); //3
```

### 第2段階 (ある程度の型付け😎)

  
add関数は、`２つの数値x,yの引数を持ち、返り値も数値` ということが分かっていたとします。  
この分かっている情報も型として定義しちゃいましょう！  
`２つの数値x, yの引数を持ち、返り値も数値` を型で定義すると`(x: number, y:number) => number`のように記述できます。  
これを使ってletで定義されたaddに対して型付けすると以下のようになります。

```
let add: (x: number, y: number) => number = ( //: (x: number, y: number) => number を上記ソースコードのaddの横に追加しただけ
 x: number,
 y: number
): number => {
 return x + y;
};

console.log(add(1,2)); //3
```

### 第3段階 (良い型付け🤤)

  
`(x: number, y:number) => number` のxとyの名前は自由に決めることができます。  
今回はadd関数が何をする関数なのかをわかりやすくするために、`x` + `y` つまり、`baseValue` + `increment`と意味が伝わるように表記してみます。  
つまり、`(x: number, y:number) => number` を`(baseValue: number, increment:number) => number`のようにします。  
これにより、addの型をみるだけで、addがどのようなことをする関数なのかが分かりやすくなりコードの可読性が高まります。  
関数の役割を把握できるということから、**TypeScriptは設計書的な役割**も果たしているとも言えます。

```
let add: (baseValue: number, increment: number) => number = (
 x: number,
 y: number
): number => {
 return x + y;
};

console.log(add(1,2)); //3
```

### 第4段階 (ガッチガチ😈)

上記のaddの型はtypeで外だしすることも可能です。  
こっれにより、addTypeを他の関数に流用することもできますし、コード自体も見やすくなります。

```
// add関数のパラメータとリターン型をここで定義する
type addType = (baseValue: number, increment: number) => number;

// 上記で定義したaddTypeを活用
let add: addType = (
 x: number,
 y: number
): number => {
 return x + y;
};

console.log(add(1,2)); //3
```

## まとめ

以上、TypeScriptで関数をガッチガチにするまでのロードマップでした。  
型付けするといってもどこまでやるのかという議論があると思いますが、その際にこの記事がお役に立てれば幸いです！
