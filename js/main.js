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

// firebaseへデータ送信
ref.on("child_added", function (data) {
    let v = data.val();
    let t = v.title;
    let x = v.text;
    console.log(v)
    console.log(t)
    console.log(x)
    localStorage.setItem(t, x)
    const h = '<div class="textarea-items"><p class="textarea-items-title">' + v.title + '</p><p class="textarea-items-text">' + v.text + '</p></div>';
    $(".memoblock-contents").prepend(h);
});


// ローカルストレージからランダムでデータを取得
function shuffle1() {
    let num = random();
    const key = localStorage.key(num);
    return key;
}

// ローカルストレージからランダムでデータを取得
function shuffle2() {
    let num = random();
    const key = localStorage.key(num);
    return key;
}

// ランダムなデータを表示
$(".shuffle").on("click", function () {
    let key1 = shuffle1();
    let key2 = shuffle2();
    const memo1 = JSON.parse(localStorage.getItem(key1));
    const memo2 = JSON.parse(localStorage.getItem(key2));
    console.log([memo1, memo2]);
    $(".memo1-title").html(memo1.title);
    $(".memo1-text").html(memo1.text);
    $(".memo2-title").html(memo2.title);
    $(".memo2-text").html(memo2.text);
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