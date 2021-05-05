
// メモ入力フォームオープン
$(".new-item").on("click", function () {
    $(".modal").fadeIn();
});

// メモ入力フォームクローズ
$(".closebtn").on("click", function () {
    $(".modal").fadeOut();
});


class Post {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }
}

// データ保存
$(".savebtn").on("click", function () {
    let title = $(".inputarea-title-input").val();
    let text = $(".input-text-long").val();
    let input = new Post(title, text);
    localStorage.setItem(title, JSON.stringify(input));
    location.reload();
});

// データを表示
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    const html = '<div class="textarea-items"><p class="textarea-items-title">' + key + '</p><p class="textarea-items-text">' + value.text + '</p></div>';
    $(".memoblock-contents").append(html).hide().fadeIn(400);
}

// ランダムな数字を取得
function random() {
    let len = localStorage.length;
    return Math.floor(Math.random() * len);
}

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