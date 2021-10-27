//firestoreからメモデータを消去
const deleteMemo = (collectionName, docId) => {
    db.collection(collectionName).doc(docId).delete()
    .then(() => {
        alert("削除されました");
        location.reload();
    })
};

//メモの消去ボタンを押すと発火
//ボタンを押したアイデアメモ1つがfirestoreから完全に消去される。
$(".delete-btn").on("click", () => {
    const highestMemoId = $(".memo-id").val()
    deleteMemo("ideas", highestMemoId);
});

//ボタンを押した掛け合わせメモ1つがfirestoreから完全に消去される。
$(document).on("click", ".delete-mixidea-btn", () => {
    console.log($(".mixidea-id").val());
    deleteMemo("mixideas", $(".mixidea-id").val());
});