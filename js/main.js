// メモ入力フォームオープン
$(".new-item").on("click", function () {
    $(".modal").fadeIn();
});

// メモ入力フォームクローズ
$(".closebtn").on("click", function () {
    $(".modal").fadeOut();
});

// firebaseの設定
var firebaseConfig = {
    apiKey: "AIzaSyAL-R87FbZKeq-v8gZqy7VeKg5iqy8Cv94",
    authDomain: "memoma-f6749.firebaseapp.com",
    projectId: "memoma-f6749",
    storageBucket: "memoma-f6749.appspot.com",
    messagingSenderId: "361517209271",
    appId: "1:361517209271:web:8a69cd1a023f12774d5f32"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ログインユーザーの値を取得
var unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // ログインしていれば中通る
        // ユーザー情報が表示される
        console.log(user);
        uname = user.displayName;
        console.log(uname);

        // firebaseへデータ保存
        $(".savebtn").on("click", function () {
            let postkey = 0;
            let username = user.displayName;
            let userId = user.uid;
            let title = $(".inputarea-title-input").val();
            let text = $(".input-text-long").val();
            let post = {
                postkey: postkey,
                username: username,
                userId: userId,
                title: title,
                text: text
            }
            db.ref().push(post);
        });

        // firebaseデータの表示
        db.ref().on("child_added", function (data) {
            let v = data.val();
            let p = v.postkey;
            let t = v.title;
            let x = v.text;
            let userId = user.uid;
            let dataId = v.userId;
            if (p === 0 && userId === dataId) {
                sessionStorage.setItem(t, x)
                const h = '<div class="textarea-items"><p class="textarea-items-title">' + v.title + '</p><p class="textarea-items-text">' + v.text + '</p></div>';
                $(".memoblock-contents").prepend(h);
            }
        });

        // 掛け合わせアイデアの保存
        $(".idea-save").on("click", function () {
            let postkey = 1;
            let username = user.displayName;
            let userId = user.uid;
            let text = $(".show-answer").val();
            let post = {
                postkey: postkey,
                username: username,
                userId: userId,
                text: text
            }
            db.ref().push(post);
            $(".show-answer").val('');
        });

        db.ref().on("child_added", function (data) {
            let v = data.val();
            let p = v.postkey;
            let x = v.text;
            let userId = user.uid;
            let dataId = v.userId;
            if (p === 1 && userId === dataId) {
                const h = '<div class="memolist"><div class="stock"><div class="delete-tag"><img src="image/delete-tag.svg" alt="button" class="tag-image"></div><div class="stock-text">' + x + '</div ></div></div>';
                $(".idea-board").prepend(h);
            };

        });
    }
    // 登録解除
    unsubscribe();
});

// ローカルストレージからランダムでデータを取得
function shuffle1() {
    let len = sessionStorage.length;
    let num = Math.floor(Math.random() * len);
    const key = sessionStorage.key(num);
    return key;
}

// ローカルストレージからランダムでデータを取得
function shuffle2() {
    let len = sessionStorage.length;
    let num = Math.floor(Math.random() * len);
    const key = sessionStorage.key(num);
    return key;
}

// ランダムなデータを表示
$(".shuffle").on("click", function () {
    let memo1 = shuffle1();
    let val1 = sessionStorage.getItem(memo1);
    let memo2 = shuffle2();
    let val2 = sessionStorage.getItem(memo2);
    // const memo1 = JSON.parse(sessionStorage.getItem(key1));
    // const memo2 = JSON.parse(sessionStorage.getItem(key2));
    console.log([memo1, memo2]);
    $(".memo1-title").html(memo1);
    $(".memo1-text").html(val1);
    $(".memo2-title").html(memo2);
    $(".memo2-text").html(val2);
});

// モード切り替え1
$(".mode-btn1").on("click", function () {
    $(".second-contents").css("display", "none");
    $(".show").fadeIn();
});

// モード切り替え2
$(".mode-btn2").on("click", function () {
    $(".show").css("display", "none");
    $(".second-contents").css("display", "block");
    $(".modal").css("display", "contents");
});

// モーダルを閉じる
$(".modal-closebtn").on("click", function () {
    $(".modal").css("display", "none");
});

// モーダルを保存
$(".modal-savebtn").on("click", function () {
    let title = $(".modal-title-input").val();
    let text = $(".modal-text-long").val();
    $(".static-title").html(title);
    $(".static-text").html(text);
    $(".modal").css("display", "none");
});

// 削除機能
// $(document).on('click', '.tag-image', function () {
//     let m = $(".stock-text").html();
//     console.log(m);
// });