//firestoreからメモデータを消去
const deleteMemo = (collectionName, docId) => {
    db.collection(collectionName).doc(docId).delete()
    .then(() => {
        alert("削除されました");
        location.reload();
    })
};

//メモの消去ボタンを押すと発火
//ボタンを押すとアイデアメモがfirestoreから完全に消去される。
$(document).on("click", ".delete-btn", function() {
    const docId = $(this).attr("id");
    deleteMemo("ideas", docId);
});

//ボタンを押すと掛け合わせメモがfirestoreから完全に消去される。
$(document).on("click", ".delete-mixidea-btn", function() {
    const docId = $(this).attr("id");
    deleteMemo("mixideas", docId);
});