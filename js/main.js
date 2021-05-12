// メモ入力フォームオープン
$(".new-item").on("click", function () {
    $(".modal").fadeIn();
});

// メモ入力フォームクローズ
$(".closebtn").on("click", function () {
    $(".modal").fadeOut();
});

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAL-R87FbZKeq-v8gZqy7VeKg5iqy8Cv94",
    authDomain: "memoma-f6749.firebaseapp.com",
    projectId: "memoma-f6749",
});

var db = firebase.firestore();

// ログインユーザーの値を取得
var unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // ログインしていれば中通る
        // ユーザー情報が表示される

        function getData() {
            let postkey = 0;
            let username = user.displayName;
            let userId = user.uid;
            let title = $(".inputarea-title-input").val();
            let text = $(".input-text-long").val();

            db.collection("ideas").add({
                postkey: postkey,
                username: username,
                userId: userId,
                title: title,
                text: text
            });
        }

        function addData() {
            let postkey = 1;
            let username = user.displayName;
            let userId = user.uid;
            let text = $(".show-answer").val();

            db.collection("idea_seeds").add({
                postkey: postkey,
                username: username,
                userId: userId,
                text: text
            });
        }

        // firebaseへデータ保存
        $(".savebtn").on("click", function () {
            getData();
            $(".inputarea-title-input").val("");
            $(".input-text-long").val("");
        });

        // firebaseデータの表示
        db.collection("ideas").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let v = doc.data();
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
        });

        // // 掛け合わせアイデアの保存
        $(".idea-save").on("click", function () {
            addData();
            $(".show-answer").val('');
        });

        db.collection("idea_seeds").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let v = doc.data();
                let x = v.text;
                let userId = user.uid;
                let dataId = v.userId;
                if (userId === dataId) {
                    const h = '<div class="memolist"><div class="stock"><div class="delete-tag"><img src="image/delete-tag.svg" alt="button" class="tag-image"></div><div class="stock-text">' + x + '</div ></div></div>';
                    $(".idea-box").prepend(h);
                }
            });
        });

    }
    // 登録解除
    unsubscribe();
});


// 削除機能
$(document).on('click', '.tag-image', function () {
    let m = $(".stock-text").html();
    let index = $(".memolist").index();
    console.log(m);
    console.log(index);
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
