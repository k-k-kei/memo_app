
// メモ入力フォームオープン
$(".new-item").on("click", function () {
    $(".modal").fadeIn();
});

// メモ入力フォームクローズ
$(".closebtn").on("click", function () {
    $(".modal").fadeOut();
});

// データ保存
$(".savebtn").on("click", function () {
    const title = $(".inputbox-title-input").val();
    const text = $(".input-text-long").val();
    localStorage.setItem(title, text);
    const html = '<div class="textarea-items"><p class="textarea-items-title">' + title + '</p><p class="textarea-items-text">' + text + '</p></div>';
    $(".memoblock-contents").append(html);
    $(".modal").fadeOut();
    location.reload();
});

// データを表示
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const html = '<div class="textarea-items"><p class="textarea-items-title">' + key + '</p><p class="textarea-items-text">' + value + '</p></div>';
    $(".memoblock-contents").append(html);
}

// メモ削除
$(".text-delete").on("click", function () {
    let key = $(".textarea-title").html();
    localStorage.removeItem(key);
    location.reload();
});

// メモ一覧クリック時の処理
// クリックしたメモのタイトルを右側に表示
$(".textarea-items").on("click", function () {
    let n = $(".textarea-items").index(this);
    let title = $(".textarea-items-title").eq(n).html();
    $(".textarea-title").html(title);
    console.log(n, title);
});

// クリックしたメモの本文を右側に表示
$(".textarea-items").on("click", function () {
    let n = $(".textarea-items").index(this);
    let text = $(".textarea-items-text").eq(n).html();
    $(".textarea-text").html(text);
    console.log(n, text);
});