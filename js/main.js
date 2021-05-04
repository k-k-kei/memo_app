
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
        data.title = title;
        data.text = text;
    }
}

// データ保存
$(".savebtn").on("click", function () {
    const title = $(".inputbox-title-input").val();
    const text = $(".input-text-long").val();
    let input = new Post(title, text);
    localStorage.setItem(title, JSON.stringify(input));
    $(".modal").fadeOut();
    location.reload();
});

// データを表示
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    const html = '<div class="textarea-items"><p class="textarea-items-title">' + key + '</p><p class="textarea-items-text">' + value.text + '</p></div>';
    $(".memoblock-contents").append(html);
}

function random() {
    let len = localStorage.length;
    return Math.floor(Math.random() * len);
}

function shuffle1() {
    let num = random();
    const key = localStorage.key(num);
    return key;
}

function shuffle2() {
    let num = random();
    const key = localStorage.key(num);
    return key;
}

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
