---
title: Goのトランザクションについて考える
date: 1734758345522
---

# はじめに

この記事は [Aizu Advent Calendar 2024](https://adventar.org/calendars/10858) 14 日目の記事です

Go でのトランザクション処理のソフトウェアアーキテクチャに則った書き方について、いくつか方法を考えてみました  
もともと [会津大学Zliサークル OB/OG LT 2024 in Tokyo](https://zli.connpass.com/event/326330/) で発表したLTの内容に加えて、いくつか追加してあります

また、簡単のために本記事のサンプルコードでエラーハンドリングは行っていません( `_` で握り潰しています)

## 今回考えるソフトウェアアーキテクチャ

UseCase層, Domain層, Infra(Infrastructure)層 があるものを考えます  
ただし、トランザクションに関してはUseCase層で扱いたいとします

![arch.png](/articles/go-transaction/arch.png)

## 方法１. UseCase層の構造体にDBを持たせる

```go
type UserUseCase struct {
    db         *sqlx.DB
    userDBRepo dbrepository.User
}
```

```go
func (u *UserUseCase) UpdateName(ctx context.Context, userID, name string) (*user.User, error) {
    // ...

    tx, _ := u.db.Begin()

    // トランザクションを使った処理

    _ = tx.Commit()

    // ...
}
```

<details><summary>実装例</summary>

```go
func (u *UserUseCase) UpdateName(ctx context.Context, userID, name string) (*user.User, error) {
    userIDValueObject, _ := user.NewID(userID)
    nameValueObject, _ := user.NewName(name)

    tx, _ := u.db.Begin()

    oldUser, _ := u.userDBRepo.FindByIDTx(ctx, tx, userIDValueObject)

    renamedUser, _ := user.New(oldUser.ID, oldUser.Age, nameValueObject)

    _ := u.userDBRepo.UpdateTx(ctx, tx, renamedUser)

    _ = tx.Commit()

    return renamedUser, nil
}
```

</details>

### 方法１の良し悪し

実装はシンプルですが、欠点がいくつかあります

- ORMがUseCase層に漏れ出てしまっている
    - 例えば sqlx から GORM に変更しようとした場合、Infra層だけでなくUseCase層も修正が必要になります
    - とはいえ、ORMの変更が必要な場合は稀なのでこれが本当に欠点になるかはチーム内で要検討です
- txではなくdbを間違って渡してしまう
    - `FindByIDTx(ctx, u.db)` のように渡してしまう可能性があります
    - 特に、GORMのように Begin() の返り値と DB が同じ型の場合はコンパイルエラーとなりません
- Repositoryにトランザクションありなしのメソッドが生まれる
    - `FindByID(ctx, db), FindByIDTx(ctx, tx)` のようにトランザクションのありなしによってメソッドを分ける実装が考えられます
        - Infra層での実装の重複が起こりやすいので保守が難しいです

UseCase層にORMが多く出てきており、ORMを変えた場合の修正が大変です  
そんな場合が出てくるかは怪しいですが、ORMのメンテナンスが止まるなどして変える必要が出てきた際、できる限り修正しやすい方が嬉しいです

## 方法2. トランザクションのラッパーをInfra層で実装する

Transactorという、トランザクション処理をラップしたインターフェースをUseCase層に用意します(英単語的には存在しないですが、造語でTransactionerとしても良いと思います)

```go
// UseCase層

// 簡単のためエイリアスを作ってますが、なくて大丈夫です
type execWithTx = func(tx *sqlx.Tx) error

type Transactor interface {
    Transaction(ctx context.Context, fn execWithTx) error
}
```

```go
func (u *UserUseCase) UpdateName(ctx context.Context, userID, name string) (*user.User, error) {
    // ...

    _ := u.transactor.Transaction(ctx, func(tx *sqlx.Tx) error {
        // トランザクションを使った処理
    })

    // ...
}
```

UseCase層に Transactor を用意しているため、層間の関係としては以下になります

![arch2.png](/articles/go-transaction/arch2.png)


<details><summary>実装例</summary>

```go
type UserUseCase struct {
    transactor usecase.Transactor
    userDBRepo    dbrepository.User
}
```

```go
func (u *UserUseCase) UpdateName(ctx context.Context, userID, name string) (*user.User, error) {
    userIDValueObject, _ := user.NewID(userID)

    _ := u.transactor.Transaction(ctx, func(tx *sqlx.Tx) error {
        oldUser, _ := u.userDBRepo.FindByIDTx(ctx, tx, userIDValueObject)

        renamedUser, _ := user.New(oldUser.ID, oldUser.Age, nameValueObject)

        _ := u.userDBRepo.UpdateTx(ctx, tx, renamedUser)

        return nil
    })

    return renamedUser, nil
}
```

</details>

### 方法2の良し悪し

基本的には方法1と同じですが、Transactorにある程度閉じ込められているためORMを変更した際の修正箇所は格段に少なくすみます  

UseCase層にORMが漏れ出てしまっているのに違和感を覚えますが、その修正はUseCase層で使用している型を変更するだけがほとんどなため現実的に取りやすい選択肢だと思います

## 方法3. トランザクションのラッパーをInfra層で実装し、コンテキストにトランザクションを渡す

UseCase層に以下のようなインターフェースを用意します

```go
// 簡単のためエイリアスを作ってますが、なくて大丈夫です
type execWithCtx = func(context.Context) error

type Transactor interface {
    Transaction(ctx context.Context, fn execWithCtx) error
}
```

```go
func (u *UserUseCase) UpdateName(ctx context.Context, userID, name string) (*user.User, error) {
    // ...

    _ := u.transactor.Transaction(ctx, func(ctx context.Context) error{
        // トランザクションを使った処理
    })

    // ...
}
```

そして、このインターフェースを実装する構造体をInfra層に用意します

```go
type transactorImpl struct {
    db *gorm.DB
}
```

```go
type execWithCtx = func(context.Context) error

func (t *transactorImpl) Transaction(ctx context.Context, fn execWithCtx) error {
    tx, _ := t.db.Begin()

    ctxWithTx := withTransaction(ctx, tx)

    _ = fn(ctxWithTx)

    _ = tx.Commit()

    return nil
}
```

この際、トランザクションをコンテキストに含ませているので、Repositoryインターフェースを実装しているInfra層側でトランザクションを使うかどうかを判別します

```go
func (u *userRepoImpl) Update(ctx context.Context, user *user.User) (*user.User, error) {
    tx := extractTransaction(ctx)

    if tx == nil {
        _ := u.db.Update(ctx, /* ... */)
    } else {
        _ := tx.Update(ctx, /* ... */)
    }

    // ...
}
```

### 方法3の良し悪し

この方法の良いところはなんといってもコード上の層分けができていることです  

- ORMの変更がInfra層に閉じられる
- UseCase層を書いている時にトランザクション以外のDBロジックを意識しなくて良くなる

といった良さがあります

一方で、処理が多少複雑になってしまうのでここまでして層分けが必要かは要検討です  
更新系の関数をInfra層に追加していくたびにトランザクションをコンテキストから取り出し（ `extractTransaction(ctx)` ）、トランザクションのありなしで処理を分ける必要がある場合はそのようにします

# トランザクションの結果となる値を返す場合

今までの方法では、トランザクションの返り値は error しかありませんでした  
そのため、DB側で自動採番された値を取得する、更新後の値を返却したい、という場合トランザクションのあとで取得する必要があります

例.

```go
func (u *UserUseCase) UpdateName(ctx context.Context, userID, name string) (*user.User, error) {
    // ...

    _ := u.transactor.Transaction(ctx, func(tx *sqlx.Tx) error {
        // トランザクションを使った処理
    })

    // Update後の値を取得
    renamedUser := u.userRepo.FindByID(ctx, /* ... */)

    return renamedUser, nil
}
```

ただし、DB側へのリクエストを一度でも節約したい、どうしてもトランザクション内でデータ取得を行いたい、という場合にはこの方法だと達成できません

抽象化されたトランザクションの中で返り値を持たす際、 `any` にするかジェネリクスにするかの選択肢があります  
次は、それぞれについて紹介していきます

## `any` を使用する場合

先ほどの方法3.を例にすると以下のような形です

```go
type queryWithCtx = func(context.Context) (any, error)

type TransactorWithValue interface {
    TransactionWithValue(ctx context.Context, fn queryWithCtx) (any, error)
}
```

実装時に注意点があり、トランザクションから受け取った値は `any` なため型アサーションをする必要があります

```go
func (u *UserUseCase) UpdateName(ctx context.Context, userID, name string) (*user.User, error) {
    // ...

    result, _ := u.transactor.Transaction(ctx, func(ctx context.Context) (any, error) {
        // ...

        savedUser, _ := u.userDBRepo.UpdateTx(ctx, tx, renamedUser)

        return savedUser, nil
    })

    renamedUser, _ := result.(*user.User)

    return renamedUser, nil
}
```

トランザクションに渡す関数 `queryWithCtx` の返り値をジェネリクスにしても良いですが、結局は型アサーションの手間があります

## ジェネリクスを使用する場合

トランザクションの返り値をジェネリクスにするにはトップレベル関数にする必要があります  
トランザクションの開始、コミット、ロールバックなどを抽象化した `Transactor` を引数に取り、それを使用します  
(たびたび出てきているTransactorと名前がかぶっていますが別物です)

```go
// Infra層
// UseCase層の構造体のフィールドにインターフェースで持たせる
type Transactor interface {
    Begin() (*sqlx.DB, error)
    Commit() error
    Rollback() error
}
```

```go
// Infra層
func Transaction[T any](ctx context.Context, transactor Transactor, fn func(context.Context) (T, error)) (T, error) {
    db := extractDB(ctx)

    tx, _ := db.Begin()

    ctxWithTx := withTransaction(ctx, tx)

    _ = fn(ctxWithTx)

    _ = tx.Commit()

    return nil
}
```

また、トップレベル関数を使用するということでUseCase層が直接Infraの関数を呼び出します  
Repositoryインターフェースを使用しない場合、UseCase層でロジックの単体テストを行うのが難しいので注意です（ドメインロジックがUseCase層に漏れ出てたりすると注意、というだけでドメインロジックが純粋関数になっていて単体テストできる場合などは問題ないです）

```go
// UseCase層
func (u *UserUseCase) UpdateName(ctx context.Context, userID, name string) (*user.User, error) {
    // ...

    renamedUser, _ := infra.Transaction(ctx, u.transactor, func(ctx context.Context) (*user.User, error){
        // トランザクション処理
    })

    return renamedUser, nil
}
```

# 終わりに

層の責務を守りつつ、トランザクションをUseCase層で行うことを考えましたが、全体的なアーキテクチャの運用にも関わってくる部分が大きいです  
もともとのRepositoryインターフェースの運用であったり、値を返す返さないであったり、今後の修正範囲をチームとしてどこまで許容できるかであったりというのはチームごとで大きく異なると思うので「これを使っておけば良い」というのは無い認識です

既存で運用しているアーキテクチャにあった手法（本記事で紹介した以外のものも含む）を取れるのが良いですが、ある程度「必要になったら修正する」を信じて、簡単な実装と修正範囲のバランスが良いものから始めてもいいのかもしれません

それでは、ここまで読んでくださってありがとうございました！
