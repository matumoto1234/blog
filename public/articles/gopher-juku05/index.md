---
title: Gopher 塾#5 に参加しました
date: 1690954259655
---

# Gopher 塾#5 に参加しました

## はじめに

この記事は[Gopher 塾 #5 - ジェネリクスが書けるようになろう](https://tenntenn.connpass.com/event/282717/)の参加記事です

Gopher 塾自体への参加は今回が初めてで、学生ブログ枠として参加させていただきました！  
イベントでは Go のジェネリクスについて、基本的な内容から新しいイディオムまで演習に取り組みながら学びました  
本記事では講義内で学んだ内容をいくつか取り上げて、それ+α を書いていこうと思います

## ジェネリクスについて

ジェネリクスは特定のデータ型に依存せず、汎用的な処理を書くことができる機能です  
それに伴って型パラメータ、型引数などの概念が新たに導入されました

例えば Go1.18 では以下のように、**型パラメータ** `T`を受け取る`Print`関数を作ることが出来ます

```go
type Print[T any](a T) {
    fmt.Println(a)
}
```

上記の関数を呼び出す場合は **型引数** を指定して **インスタンス化** します

```go
// 型引数にintを渡してインスタンス化
Print[int](10)

// インスタンス化すると変数への代入もできる
var printStr func([]string) = Print[string]
printStr("HelloWorld")
```

ジェネリクスをいつ導入するか？という問いに対しては [When To Use Generics](https://go.dev/blog/when-generics)が参考になります

その他ジェネリクスの基本や、導入事例については以下のスライドがとてもわかり易く説明してくださっています

- [Go のジェネリクスを活用する](https://speakerdeck.com/syumai/gonogenericswohuo-yong-suru)

## 型推論

関数呼び出しの際、**型推論**によって型引数を省略することができます

型推論はおよそ以下のような手順で行われます

1. 型なしの定数を無視して統一化する
1. 型なしの定数をそのデフォルトの型とみなして扱う

例えば、以下のように先程の`Print`関数の型引数を省略して呼び出せます

```go
// Print[string]("HelloWorld")の型引数を省略
Print("HelloWorld")
```

次に以下のような例を考えてみます

```go
package main

import "fmt"

func Insert[T any](s []T, i int, v T) []T {
    return append(s[:i], append([]T{v}, s[i:]...)...)
}

type MyInt int

func main() {
    ns := []MyInt{1, 2, 4}
    ns = Insert(ns, 2, 3)
    fmt.Println(ns) // [1 2 3 4]
}
```

`Insert`関数の引数にある`[]T` と `T` だとどちらが先に型が判明するでしょうか  
これは `[]T` のほうが先に判明します(つまり、`Insert[MyInt]` として推論されます)

この仕様によって詰まるケースはそれほど多くは無さそうですが、気にかけておくべきではあると思います

ちなみに、型推論は関数呼び出しの際にのみ行われるので、例えば `MyTuple[T1, T2]{}` のような自作の `struct` などの型引数は省略することができないです

## 型パラメータとインターフェース

ジェネリクスの型パラメータを使用した表現は、インターフェースを用いても似たようなことが表現できます  
以下は `fmt.Stringer` インターフェースを引数に取る `Print` 関数を書いた例です

```go
// 型パラメータを使う方法
// Tをfmt.Stringerインターフェースを実装した型に制限する
func Print[T fmt.Stringer](v T) { ... }
```

```go
// インターフェースを使う方法
func Print(v fmt.Stringer) { ... }
```

大きく異なる点として、型解決のタイミングが異なります

- 型パラメータ：静的(コンパイル時)
- インターフェース：動的(実行時)

また、型パラメータを使う方法でしか表現できない以下のような例があります

```go
// a, bがともに同じT型であり、Tはfmt.Stringerを実装している
func Print[T fmt.Stringer](a, b T) { ... }
```

上記の例はインターフェースを使って表現しようとしてみると、以下のようになります

```go
func Print(a, b fmt.Stringer) { ... }
```

一見すると良いように思えますが、`fmt.Stringer`インターフェースを実装している型が同じであることを制限できていません

- [具体的な例 - Go Playground](https://go.dev/play/p/JCPilxZRXLK)

どちらで書くべきかは作りたいものによってその都度変えていくべきだと思います

## Underlying Type

型制約に用いられるインターフェースや、後述する Type Sets の概念中に出てくる重要な概念です

以下の記事で別途詳しく紹介しているので、本記事ではある程度省略して紹介します

- [Underlying Type](https://pacific-shock-b20.notion.site/Underlying-Type-74cb3e8cf7c24a9e85a4fbd0a561a967?pvs=4)

ざっくりと説明すると、underlying type とは、その型の元となる、事前に宣言された型や型リテラルなどのことです

例を見てみます

```go
type MyInt int
type MyInt2 MyInt
```

この `MyInt` の underlying type は `int` です  
さらに、`MyInt2` の underlying type も `int` になります

## Type Sets(型セット)

> Type sets とは、ある型があるインターフェースを「実装する」条件を記述するための新しい概念です。  
> 従来からこの目的を果たしてきた method sets という概念と異なり、Type Parameters Proposal 後の新しいインターフェースにも拡張可能になっています。  
> この Type sets を記述するための新しい文法として、次の 2 つが導入されます。
>
> - `~T` approximation element(近似要素)
> - `T | U` union element(合併要素)
>
> ([Go の "Type Sets" proposal を読む - サマリー](https://zenn.dev/nobishii/articles/99a2b55e2d3e50#%E3%82%B5%E3%83%9E%E3%83%AA%E3%83%BC)より引用)

Type sets を用いることで、型制約に用いるインターフェースの要素の列挙などが従来の概念を拡張する形で書けるようになりました  
全ての型が type set という集合を持つようになります

例を見てみます

```go
type I interface {
    string | ~int
}
```

インターフェース `I`の要素として、`string | ~int` があります  
これはインターフェース `I`の type set が `string`の type set と`~int`の type set の和集合であることを表しています

- `string`の type set は `{string}`(`string`のみを要素とする集合)です
- `~int`の type set は `int`を underlying type に持つ全ての型の集合です

このように type set が型一つ一つに存在し、それを元に interface を実装できるできないの判断などができます

より詳しくは以下の記事で別途紹介しているので、本記事では省略します

- [Type Sets](https://pacific-shock-b20.notion.site/Type-Sets-3b2eacddd8674f64a2300327dbe331d3)

## 型パラメータを持つ制約

実はしれっとこの記事中で型制約を使った表現を出していましたが、型パラメータにはインターフェースによって制約をつけることができます

例 1

```go
func Print[T fmt.Stringer](a T) { ... }
```

例 2

```go
type Setter interface {
    Set(string)
}

func Set[T Setter](a T) { ... }
```

この型制約にも型パラメータを持たせることができ、例えば `map` 型の表現などに使うことができます

```go
type Map[K comparable, V any] interface {
    ~map[K]V
}

func Keys[M Map[K, V], K comparable, V any](m M) { ... }
```

[Playground で試す](https://go.dev/play/p/pl1MXLiZp4j)

また、`Map[K, V]` インターフェースを省略して書くこともできます

```go
func Keys[M ~map[K, V], K comparable, V any](m M) { ... }
```

## 新しいイディオム

さて、ここからはジェネリクスを用いた新しいイディオムについてです  
講義内容の中ではこれが一番気になっていました

### 型パラメータと型スイッチ

パラメータ化された型では型スイッチを行えません  
そのため、一度インターフェースに変換する必要があります  
この処理が必要になったときは型パラメータを使うべきか見直した方がいいのかもしれません

```go
func F[T int | string](v T) {
    switch any(v).(type) {
    case int:
        fmt.Println("int")
    case string:
        fmt.Println("string")
    }
}
```

### 型パラメータとポインタレシーバ

型制約となっているインターフェースの実装にポインタレシーバを用いた場合、以下のような問題が発生しやすいです

```go
type Setter interface {
  	Set(string)
}

type SetterImpl struct {
	  s string
}

func (p *SetterImpl) Set(s string) {
	  p.s = s // panic !!!
}

func FromString[T Setter](s string) T {
	  var v T
	  v.Set(s)
	  return v
}

func main() {
	  fmt.Println(FromString[*SetterImpl]("a"))
}
```

[Playground で試す](https://go.dev/play/p/ccXQhGivycd)

これは、`FromString`の型パラメータ `T` に対して、その引数としてポインタ型を使っています  
一方、`FromString`内の処理では、`T`がポインタであることを考慮せずに `T`型の変数を用いてメソッドを呼び出しています

ポインタ型のゼロ値は `nil`なので、`panic`してしまっています

これを解決するには、以下のようにインターフェースに型パラメータを用意しそのポインタ型を埋め込んで、使うメソッドがポインタレシーバであることを明示してあげます

```go
type Setter[T any] interface {
	  *T
	  Set(string)
}

type SetterImpl struct {
	  s string
}

func (p *SetterImpl) Set(s string) {
	  p.s = s
}

func FromString[T any, PT Setter[T]](s string) T {
	  var v T
	  PT(&v).Set(s)
	  return v
}

func main() {
	  // 第二引数は省略できる
	  fmt.Println(FromString[SetterImpl]("a"))
}
```

[Playground で試す](https://go.dev/play/p/7Az23KlSNKI)

`*T`を埋め込むことで、`Setter[T]`の type set は `*T`を満たす型の集合と`Set(string)`メソッドを持つ型の集合の積集合になりました  
これにより、`Set(string)`メソッドはポインタレシーバで実装されることを明示できています

### インターフェースの実装チェック

従来より、Go では型`T`がインターフェース `I` を実装しているかチェックする際に以下のようなおまじないを使用してきました

```go
var _ I = (*T)(nil)
```

これの拡張として、ジェネリクスを用いる型`S`に対してインターフェース`I`を実装しているかチェックするには以下のような新しい構文があります

```go
type I interface {
    F()
}

type S[T any] struct {
    v T
}

func (s S[T]) F() { ... }

func _[T any]() {
    var _ I = S[T]{}
}
```

`_`関数を作って型パラメータ`T`を取り、従来のおまじないのようにインターフェース`I`を実装しているかチェックしています

## あとがき

ここまで見てくださってありがとうございました！  
Gopher塾#5で学んだ内容はどれも面白いものばかりで、基礎的な内容からキャッチアップの仕方まで取り扱っていて、本記事でも全てを取り上げきれていません...！

新しいProposalでは、[ゼロ値を組み込んだりする提案](https://github.com/golang/go/issues/61372)などもあるのでより一層ジェネリクスを使うのが便利なるかと思われます！

改めて、このような素晴らしい勉強会を開いていただいたtenntennさんには感謝しかないです 🙏🏻  
(Go Conference 10thの準備などもあったと思うので本当にお疲れ様でした)

また、Gopher塾#5開催から数ヶ月遅れて執筆していることに非常に反省しています...  
執筆をサボってすいませんでした🙇‍♂️

ちなみに、Goのジェネリクスに興味を持ったのは、競技プログラミング用のライブラリを整備しようと思ったことがきっかけでした  
`int`などに加えて`math/big`パッケージの`big.Int`などを含めた抽象化を試みており、ジェネリクスを使って解決できないかと調べていたところ、この塾の存在を知って参加してみた次第です(ちなみに、現状の解決策としては 「`Add`, `Sub`, `Mul`メソッドなどがあるインターフェースを用意する」というものであまり綺麗な解決策ではないです..)
