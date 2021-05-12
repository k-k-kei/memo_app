// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAL-R87FbZKeq-v8gZqy7VeKg5iqy8Cv94",
    authDomain: "memoma-f6749.firebaseapp.com",
    projectId: "memoma-f6749",
    storageBucket: "memoma-f6749.appspot.com",
    messagingSenderId: "361517209271",
    appId: "1:361517209271:web:8a69cd1a023f12774d5f32"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const ref = firebase.database().ref();

// ログイン認証
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#auth', {
    signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});

// メモ入力フォームオープン
$(".new-item").on("click", function () {
    $(".modal").fadeIn();
});

// メモ入力フォームクローズ
$(".closebtn").on("click", function () {
    $(".modal").fadeOut();
});

// firebaseへデータ保存
$(".savebtn").on("click", function () {
    let postkey = 0;
    let title = $(".inputarea-title-input").val();
    let text = $(".input-text-long").val();
    let post = {
        postkey: postkey,
        title: title,
        text: text
    }
    ref.push(post);
});

// 掛け合わせアイデアの保存
$(".idea-save").on("click", function () {
    let postkey = 1;
    let text = $(".show-answer").val();
    let post = {
        postkey: postkey,
        text: text
    }
    ref.push(post);
    $(".show-answer").val('');
});

// firebaseデータの表示
ref.on("child_added", function (data) {
    let v = data.val();
    let p = v.postkey;
    let t = v.title;
    let x = v.text;
    if (p === 0) {
        sessionStorage.setItem(t, x)
        const h = '<div class="textarea-items"><p class="textarea-items-title">' + v.title + '</p><p class="textarea-items-text">' + v.text + '</p></div>';
        $(".memoblock-contents").prepend(h);
    }
});

ref.on("child_added", function (data) {
    let v = data.val();
    let p = v.postkey;
    let x = v.text;
    if (p === 1) {
        const h = '<div class="memolist"><div class="stock"><div class="delete-tag"><img src="image/delete-tag.svg" alt="button" class="tag-image"></div><div class="stock-text">' + x + '</div ></div></div>';
        $(".idea-board").prepend(h);
    };

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