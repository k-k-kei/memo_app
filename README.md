# タイトル
アイデア量産メモツール「memoma」

# サービス概要
日々の気づきを掛け合わせて新しいアイデアを生み出すメモアプリです。<br>
「多くの新しいアイデアは何かの掛け合わせから発想されている」という点に着目、<br>
個人のアイデア出しやチームでのブレストに活用できます。

<br>
＜使い方＞

* 日常の気づきをメモとして保存
* 「掛け合わせる」ボタンを押してランダムでアイデアを表示
* 2つのアイデアを掛け合わせて得た新たな着想を新規保存


<img width="1433" alt="スクリーンショット 2021-11-02 15 51 35" src="https://user-images.githubusercontent.com/42371057/140053835-375a62d3-52b9-4375-9e37-b481332a2f3c.png">

<br>

# サービスURL
https://kk2929.sakura.ne.jp/memoma/

<br>

# 目的
「作りたいプロダクトのアイデアが浮かばない」という友人の課題を解決するため。<br>
プログラミングを共に学習する友人の多くがアイデア出しに苦労をしているのを見て、<br>
効率良くアイデアを生み出す仕組みがあれば喜ばれるのではないかと思い作成しました。

<br>

# 制作期間
3日

<br>

# 使用技術
* Javascript
* jQuery
* Firebase（Firebase Authentication, Firestore）

<br>

# 機能一覧
* サインアップ / ログイン機能
* メモ保存機能
* メモ削除機能
* メモ掛け合わせ機能
* 掛け合わせアイデア保存機能

<br>

# こだわったポイント

* **CSSフレームワークを使わない**<br>
bootstrapなどレイアウトを綺麗に仕上げることができるフレームワークも選択肢としてありますが、今回CSSの理解を深めるために全て自力でレイアウトを書きました。

* **実際に使ってもらって改善する**<br>
メモアプリは世の中にたくさんありますが、今回は本当に使って欲しい人の声を大切にしながら開発を行いました。当初ログイン機能はありませんでしたが、実際に友人に使ってもらった結果「複数人でアイデア出しをしたい」との声がありました。そこでlocalStorageではなくデータベースにメモを保存できるFirebaseに切り替えるという改善を行なっています。

* **WEBだからこそできることを考えた**<br>
memomaの最大の特徴は「日常で湧いてきたアイデアをランダムに掛け合わせる点」です。リアルな場でこれを行うとなると紙を常に携帯する必要があったり、それをポストイットに書き写す必要があるなど面倒なことが多いです。しかし、WEBはデータと媒体（（例）紙やポストイット）を分離できるため、物の持ち歩きやデータの移し替えを容易に行うことができる点に着目しました。

<br>
<img width="394" alt="スクリーンショット 2021-09-17 0 13 39" src="https://user-images.githubusercontent.com/42371057/133638657-746e45d7-ff01-47f9-b4af-319260a16c5f.png">
