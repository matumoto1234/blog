---
title: Webプッシュ通知機能をFirebaseCloudMessagingを使って実装した
date: 1703238306772
---

# はじめに

この記事は [Aizu Advent Calendar 2023](https://adventar.org/calendars/9379) 17 日目の記事です

Web プッシュ通知機能を FirebaseCloudMessaging(FCM)を使ってこのブログに実装しました  
ブログ右上のベルアイコンから on/off を操作でき、ブログが更新されたタイミングなどで通知を受け取るようにできます

本記事では、どのように実装を行ったか、どんな技術を使用したのか、どういう背景があってそれを利用する必要があるのか、といった内容をなるべく正確な情報を元にまとめました  
(正確でない情報が載ってる、誤字を見つけた、等ありましたらコメントもしくは X の DM で教えてください 🙏🏻)

# Web プッシュ通知とは

Web プッシュ通知とは、Web アプリから送られるプッシュ通知、もしくはそれにまつわる技術の総称です  
例えば、Web アプリからの通知を Google Chrome で受け取ってみると以下のようなものが表示されます

![push-notification.png](/articles/web-push-notification/push-notification.png)

こういった機能を実現するために [Push API](https://developer.mozilla.org/ja/docs/Web/API/Push_API) や [Notifications API](https://developer.mozilla.org/ja/docs/Web/API/Notifications_API) という Web API が用意されており、実装に利用できます

また、iOS 16.4 以降ではホーム画面の Web アプリに Web プッシュ通知のサポートが追加されました  
Web アプリを [PWA](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps) として運用することによって、普通のアプリとほとんど同じような体験を期待できます

<img src="/articles/web-push-notification/home-screen-icon.png" height="600px">

![lock-screen-notification.png](/articles/web-push-notification/lock-screen-notification.png)

## Web プッシュ通知の大まかな流れ

FirebaseCloudMessaging を使用してしまえばほとんど気にする必要のない部分ではありますが、個人的に重要だと感じたので Web プッシュ通知を送る際の流れについて記述しています

Web プッシュ通知は大まかに 3 つのステップに分けて考えられます

1. **購読(subscribe)**  
   ブラウザが push service に対して通知の購読(subscribe)をする
1. **PushSubscription の共有**  
   subscribe によって得られた情報( [`PushSubscription`](https://developer.mozilla.org/ja/docs/Web/API/PushSubscription) )をブラウザが application server に共有する
1. **push message の送信**  
   `PushSubscription` の情報を利用して application server が push service 経由で、ブラウザに push message を送信する

<details><summary>用語の補足</summary>

- push service
  - push message を送る際にブラウザが使用する Web サービス
  - ブラウザ側が制御しており、ウェブサイト製作者は制御できない
  - push service にリクエストを送る際は [web push protocol](https://tools.ietf.org/html/draft-ietf-webpush-protocol) という仕様に沿った web push protocol リクエストを送らなければならない
  - web push protocol リクエストが正しい push service に送信されているかの確認は、`PushSubscription.endpoint`から確認できる
- [`PushSubscription`](https://developer.mozilla.org/ja/docs/Web/API/PushSubscription)
  - push service への subscribe が成功した際にブラウザへ返される購読情報
  - 次のようなデータが入ったオブジェクトになっている
    ```json
    {
      "endpoint": "https://fcm.googleapis.com/fcm/send/c1KrmpTuRm…",
      "expirationTime": null,
      "keys": {
        "p256dh": "BGyyVt9FFV…",
        "auth": "R9sidzkcdf…"
      }
    }
    ```
  - [`endpoint`](https://developer.mozilla.org/ja/docs/Web/API/PushSubscription/endpoint) は `PushSubscription` ごとに固有の[capability URL](https://www.w3.org/TR/capability-urls/)となっている
  - `endpoint`は秘匿しなければならない情報で、もし漏洩してしまうと他のアプリケーションが push message を送ることができてしまう
  - `endpoint`のドメインは基本的に push service になっており、push message を受け取るクライアントを一意に識別できる情報
- application server
  - ウェブサイト製作者側が制御できるサーバー
  - ここに`PushSubscription`などを保管しておく
  - push message を送信する際は`PushSubscription.endpoint`に対して push message を送信する

</details>

これら 3 ステップを簡単に図にすると以下のようになります

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT5pBXw5eyjhoaFDGFMVSgfPIJ0ninWEcvcX9ztvDpwEXUd1cDGEsECY5u3NsUqqG6cobXMyWveT3w8/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

より詳細なフローについては、以下のシーケンス図になります

![sequence.png](/articles/web-push-notification/sequence.png)  
（引用元：[Push API - W3C](https://www.w3.org/TR/push-api/)「5.2 Sequence diagram」 青枠のオブジェクトは筆者が挿入）

### service worker について

上記のシーケンス図では **service worker** という単語が出てきています

> サービスワーカーは、あるオリジンとパスに対して登録されたイベント駆動型のワーカーです。  
> JavaScript ファイルの形を取り、ナビゲーションやリソースへのリクエストを横取りや改変したり細かい粒度でリソースをキャッシュすることで関連付けられたウェブページやサイトを制御し、それぞれの状況（もっとも顕著な例は、ネットワークが利用できないとき）にアプリがどのように振る舞うかを完全に制御することができます。  
> (引用元：[Service Worker API - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API))

簡単にいうと、ブラウザが動かすバックグラウンドのプロセスです  
Web サイトを開いていないタイミングでプッシュ通知が送られてきた場合に、service worker を利用することで通知を受け取ることができます

![service-worker.png](/articles/web-push-notification/service-worker.png)

### Web プッシュのフローにおける問題点

ここで、今まで見てきた Web プッシュのフローですが、以下の問題を考えてみます

1. application server のなりすましは防がれているのか？
1. push message の内容（平文）は誰に見えて、誰に見えないのか？

これらについては、VAPID(Voluntary Application Server Identification) という仕組みによって以下のような結論になります

1. application server のなりすましは防がれているのか？  
   → VAPID により application server のなりすましが発生するリスクが大きく下げられている
1. push message の内容（平文）は誰に見えて、誰に見えないのか？  
   → push message の内容（平文）を見れるのはブラウザと application server のみ  
   → push service は見ることも改ざんすることもできない

どういった仕組みでそうなるのかは以下の記事が大変参考になるのでぜひ読んでみてください  
本記事を見るよりも先に見ておくと理解がより深まると思います

[Web Push のサーバーサイドの処理〜VAPID と Message Encryption を中心に〜](https://zenn.dev/tomokisato/articles/f82dcf5a4850a1)

## FirebaseCloudMessaging(FCM)を使用した実装

さて、ここからは FCM を用いた Web プッシュ通知の実装について話していきます

FCM はクロスプラットフォームにメッセージを送信する仕組みのことで、これを利用することにより今まで見てきた Web プッシュのフローをほとんど気にすることなく機能を実装できます

> Firebase Cloud Messaging（FCM）は、メッセージを無料で確実に送信するためのクロスプラットフォーム メッセージング ソリューションです。  
> (引用元：https://firebase.google.com/docs/cloud-messaging?hl=ja)

大まかな手順としては次のようになります

1. [Firebase Console](https://console.firebase.google.com/?hl=ja)でプロジェクトを作成する
1. 作成したプロジェクト内で Web アプリを追加し、API Key などを取得する  
   API Key などの例.
   ```ts
   export const firebaseConfig = {
     apiKey: 'API_KEY',
     authDomain: 'PROJECT_ID.firebaseapp.com',
     databaseURL: 'https://PROJECT_ID.firebaseio.com',
     projectId: 'PROJECT_ID',
     storageBucket: 'PROJECT_ID.appspot.com',
     messagingSenderId: 'SENDER_ID',
     appId: 'APP_ID',
     measurementId: 'G-MEASUREMENT_ID',
   }
   ```
1. [firebase-js-sdk](https://github.com/firebase/firebase-js-sdk)を使用してフロント側で実装する

## フロント側の実装

ここでは、以下 2 つの実装を紹介します

1. Web プッシュの subscribe
1. バックグラウンドで通知を受け取るための service worker の作成

### Web プッシュの subscribe

[`getToken()`](https://firebase.google.com/docs/reference/js/messaging_.md?hl=ja#gettoken) によって subscribe が行えます

例  
※この例では、`isSupported()`による Web API の対応などを省略しています

```ts
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const app = initializeApp(/* ここにAPI Keyなどのconfigオブジェクト */)
const messaging = getMessaging(app)

getToken(messaging, {
  vapidKey: 'ここに application server が生成した公開鍵',
  serviceWorkerRegistration: sw,
}).then((token) => {
  // messaging インスタンスにプッシュメッセージを送信するために使用できる Firebase Cloud Messaging 登録トークンが返ってくる
  // 必要であれば application server に token を送って管理する
  ...
})
```

- `vapidKey`  
  `vapidKey`に指定する値は VAPID のために使用する application server で作成した公開鍵です  
  もし指定しなかった場合は [デフォルトの VAPID key](https://github.com/firebase/firebase-js-sdk/blob/master/packages/messaging/src/util/constants.ts#L21-L22) が使用されます
  - [GetTokenOptions.vapidKey | Firebase JavaScript API reference](https://firebase.google.com/docs/reference/js/messaging_.gettokenoptions.md?hl=ja#gettokenoptionsvapidkey)
- `serviceWorkerRegistration`  
  `serviceWorkerRegistration`には push message を受信するための service worker を渡します  
  もし指定しなかった場合はルートディレクトリの `firebase-messaging-sw.js`が使用されます
  - [SDK 内でのデフォルト service worker 登録処理](https://github.com/firebase/firebase-js-sdk/blob/master/packages/messaging/src/helpers/registerDefaultSw.ts#L26-L32)
  - [GetTokenOptions.serviceWorkerRegistration | Firebase JavaScript API reference](https://firebase.google.com/docs/reference/js/messaging_.gettokenoptions.md?hl=ja#gettokenoptionsserviceworkerregistration)

service worker を明示的に指定する場合は例えば以下のように [`ServiceWorkerContainer.register()`](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerContainer/register) を使用します

```ts
window.navigator.serviceWorker.register('/my-sw.js').then((sw) => {
  // ...
  getToken(messaging, {
    serviceWorkerRegistration: sw,
  })
  // ...
})
```

また、FCM を利用する上で Push API や Notification API など多くの Web API を使用します  
ブラウザによっては対応していない Web API などがあるかもしれません

そこで、必要な API がすべてブラウザに存在するかを判定する[`isSupported()`](https://firebase.google.com/docs/reference/js/messaging_.md?hl=ja#issupported)関数が用意されているのでこれを使用して対応しているか判定できます

### 権限の UX

`getToken()`は内部で`Notification.requestPermission()`を呼び出します  
(https://github.com/firebase/firebase-js-sdk/blob/master/packages/messaging/src/api/getToken.ts#L34-L36)

ページが読み込まれた直後に権限を求めてしまうと、ユーザーにとって権限が必要な理由を提供しないまま求めてしまいます  
また、本来 Web プッシュ通知を必要としないユーザーにまで権限を求めてしまうのでユーザーの体験が悪くなってしまいます

権限を求める際は [Permission UX](https://web.dev/articles/push-notifications-permissions-ux?hl=en) を参考にしながら Web サイトを作成すると良いと思います

### バックグラウンドで通知を受け取るための service worker の作成

service worker として動かす JavaScript ファイルを作成します

[firebase-js-sdk](https://github.com/firebase/firebase-js-sdk/tree/master) では、バックグランドで通知を受け取るために [onBackgroundMessage()](https://firebase.google.com/docs/reference/js/messaging_sw.md?hl=ja#onbackgroundmessage) が用意されています

しかし、service worker は通常のコンテキストとは異なり、ワーカーのコンテキストで実行されています

> サービスワーカーの JavaScript モジュールは動的にインポートできず、import() はサービスワーカーのグローバルスコープで呼び出されると例外を発生します。 import 文を使用した静的インポートは許可されています。  
> (引用元：[Service Worker API - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API))

そのため、service worker 内で`import()`などを使った動的インポートができません

ここで、service worker 内で SDK を使用する方法を 2 種類紹介します

1. [npm package](https://www.npmjs.com/package/firebase) を使用してバンドルする
1. [`importScripts()`](https://developer.mozilla.org/ja/docs/Web/API/WorkerGlobalScope/importScripts)によって CDN を service worker ファイル内で読み込む

モジュールバンドルする際の例.

```ts
import { initializeApp } from 'firebase/app'

initializeApp(/*...*/)
```

`importScripts()`の例.

```ts
importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js'
)

firebase.initializeApp(/*...*/)
```

#### モジュールバンドル vs importScripts()

それぞれのメリットデメリットをまとめてみました

モジュールバンドル

- メリット
  - バージョンがパッケージマネージャーで管理できる
  - バンドラーのツリーシェイキングなどによって最適化がかかる
  - エディタのコード補完が効く
- デメリット
  - バンドラーの環境構築が必要
  - バンドルされたファイルをホスティングする必要がある

importScripts()

- メリット
  - 環境構築が必要ない
- デメリット
  - バージョンがパッケージマネージャーで管理できず 2 重管理になってしまいがち
  - バンドラーのツリーシェイキングなどの最適化が得られず、不要なスクリプトもまとめて取得してしまう
  - エディタのコード補完が効かない

バージョン管理、コード補完など開発体験に大きく関わる部分の差が大きいので、モジュールバンドルの方が個人的にはおすすめです  
(TypeScript で service worker を記述する場合はトランスパイルするタイミングでバンドルすればいいですし)

実際に動かすコードの例としては以下のようなものになります

```ts
import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'

declare let self: ServiceWorkerGlobalScope

const app = initializeApp(/* ここにAPI Keyなどのconfigオブジェクト */)

const messaging = getMessaging(app)

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  const notificationTitle = payload.notification?.title || 'title'
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/matumoto.svg',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
```

これによって、バックグランドの通知を受け取れるようになります

<details><summary>TypeScriptファイルのバンドル手順</summary>

TypeScript のコードがあるだけでは、トランスパイルの必要もありますしバンドルの必要もあります  
`getToken()`実行の際に service worker として動かすには、オプションの`serviceWorkerRegistration`に指定するか、`firebase-messaging-sw.js`をルートディレクトリに置くかしなければなりません

ここでは`sw.ts`をバンドラーとして`esbuild`を使ってビルドし、ルートディレクトリに `firebase-messaging-sw.js`を置く手順を例示します

```bash
npx esbuild sw.ts --outfile=public/firebase-messaging-sw.js --bundle --sourcemap --minify --format=esm --legal-comments=external
```

※`--outfile`の`public/`はあくまで例です。コピペして使用する場合は適切なルートディレクトリに置き換えてください

これでバンドル済みの `firebase-messaging-sw.js`が生成されます

</details>

### manifest.json の gcm_sender_id について

Web プッシュ通知を FCM を用いて実装しようとすると、manifest.json に`gcm_sender_id`というキーに`103953800507`という値を指定している記事をよく見かけます

これは本来 FCM が送信者であることを明示するために使用されていたようで、VAPID によって送信者認証が実装できるようになった今ではほとんど不要なもののようです

しかし、Chrome の古いバージョンなどでは未だに manifest.json に`gcm_sender_id`を含める必要があるようです

詳細：https://developer.chrome.com/blog/web-push-interop-wins?hl=ja

## Progressive Web Apps(PWA) としての対応

Web アプリを[Progressive Web Apps](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps)にすることによって、iOS16.4 以降で Web プッシュ通知を使用できます

![lock-screen-notification.png](/articles/web-push-notification/lock-screen-notification.png)

PWA とするには、HTTPS、service worker、マニフェストファイルの 3 つが必要ですが、ここではマニフェストファイルに着目していきます

### マニフェストファイル

Web プッシュ通知を iOS16.4 以降で使用するには、マニフェストファイルに`display`の項目を`standalone`もしくは`fullscreen`で設定する必要があります

詳細：https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/

例

```json
{
  "display": "standalone"
}
```

マニフェストファイルを読み込むには HTML ファイルの `head` タグ内で指定する必要があります

manifest.json を読み込む例.

```html
<link rel="manifest" href="/manifest.json" />
```

<details><summary>PWAとしてリッチにするための設定項目</summary>

アプリの表示名、テーマカラー、スプラッシュ画面の画像など、マニフェストファイルと HTML ファイルに記述する設定があります

以下は manifest.json というマニフェストファイルを設定する際の例です

```json
{
  "name": "matumoto1234 blog",
  "short_name": "blog",
  "display": "standalone",
  "theme_color": "#f1f5f9",
  "background_color": "#f1f5f9",
  "description": "matumoto1234のブログです",
  "icons": [
    {
      "src": "/matumoto-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/matumoto-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

HTML ファイルには主に iOS 用の設定を記述します  
スプラッシュ画面の設定については、以下のようなジェネレータがあるので利用してみてください

https://appsco.pe/developer/splash-screens

```html
<link rel="manifest" href="/manifest.json" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link
  href="splashscreens/iphone5_splash.png"
  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
  rel="apple-touch-startup-image"
/>
<link
  href="splashscreens/iphone6_splash.png"
  media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
  rel="apple-touch-startup-image"
/>
<link
  href="splashscreens/iphonex_splash.png"
  media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
  rel="apple-touch-startup-image"
/>
```

</details>

これで PWA として Web プッシュ通知を表示することができるようになりました

## push message の送信

push message を送信するには、Firebase Console から送信するか、Firebase Admin SDK を使用して送信するためのアプリケーションを動かすかといった方法があります

本ブログでは Firebase Console から push message を送信するため、特に触れません  
Firebase Admin SDK を使用した実装などについては、[Firebase Cloud Messaging でウェブプッシュ通知する](https://miyauchi.dev/ja/posts/fcm-push-message/) あたりが参考になるかと思います

# あとがき

ここまで読んでくださってありがとうございました！

FirebaseCloudMessagingを用いたWeb プッシュ通知機能の実装をまとめましたが、思ったよりも長くなってしまいました

他の記事を漁ってると「manifest.jsonの`gcm_sender_id`はよくわからんが固定値をつけとけばOK」みたいな記述が多くあって、なんで必要なのかわからなかったのでなるべく正確そうな情報を集めてまとめたかったというのが、この記事を書こうとしたきっかけです

いろんな情報をまとめようとしすぎて情報がごちゃごちゃしすぎちゃってる気がしなくもないですが...  
この記事によってWebプッシュ通知実装で詰まってた点が解消されていたら幸いです！  
このブログのコードは[GitHub](https://github.com/matumoto1234/blog)にあるのでそちらも参考にしてみてください

それはそうと、またアドベントカレンダーに遅刻してしまいました ごめんなさい🙏🏻  
前年度は年を越してしまっていたので、一応成長してはいるはず...?(ほんとか？)

まだまだこのブログには改善点がたくさんあるので、もっと修正していったり機能追加していったりしようと思います💪

改めてありがとうございました！

## 参考

- [プッシュ通知の概要 | web.dev](https://web.dev/articles/push-notifications-overview?hl=ja)
- [iOS(16.4+)を含むブラウザでWeb Push機能を実装したメモ | Zenn](https://zenn.dev/neriko/articles/2e0cde5f93ea95)
- [Web Push のサーバーサイドの処理〜VAPID と Message Encryption を中心に〜 | Zenn](https://zenn.dev/tomokisato/articles/f82dcf5a4850a1)
- [ウェブプッシュの相互運用性の成功事例 | Chrome for Developers](https://developer.chrome.com/blog/web-push-interop-wins?hl=ja)
- [Web Push for Web Apps on iOS and iPadOS | WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)
- [JavaScript Firebase Cloud Messaging クライアント アプリを設定する | Firebaseドキュメント](https://firebase.google.com/docs/cloud-messaging/js/client?hl=ja#web-namespaced-api)
- [About splash-screens - Appscope](https://appsco.pe/developer/splash-screens)
- [iOSでのWebプッシュ通知が可能に！配信に必要なPWA化とは？ | PUSH CODE](https://www.pushcode.jp/blog/webpush-notification-ios-pwa)
- [Service Workerで Firebase Authenticationの匿名認証する | miyauci.me](https://miyauchi.dev/ja/posts/firebase-authentication-service-worker/)
- [Firebase Cloud Messaging でウェブプッシュ通知する | miyauci.me](https://miyauchi.dev/ja/posts/fcm-push-message/)
