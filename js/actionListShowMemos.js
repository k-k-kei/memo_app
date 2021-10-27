/*

    firestomeからデータを取得して画面表示する際に使用するメソッドをまとめたオブジェクト

*/
const firestoreShowMemos = {
    lists: [],
    mixIdeaList: [],

    //メモを表示するarea一覧
    area: {
        memoArea: $(".memoblock-contents"),
        showMixIdeaArea: $(".idea-box"),
    },

    //sessionStorageに保存している値のkey名
    keys: {
        sessionStorageIdeaKey: "items",
        sessionStorageMixIdeasKey: "mixIdeas",
    },

    //メモを保存するfirestoreコレクション名一覧
    collectionNames: {
        selectedCollectionIdeas: "ideas",
        selectedCollectionMixIdeas: "mixideas"
    },

    //@data: firestoreから取得したユーザーのメモデータ
    //@results: アイデアの種表示用htmlに変換して返す 
    makeMemoCard(data) {
        const memos =
            '<li class="memo-item">'
            + '<p class="memo-item-textarea">'
            + data.data().text
            + '</p>'
            + '<input type="hidden" class="memo-id" value="'
            + data.id
            + '">'
            + '</li>'

        return memos;
    },

    //@data: firestoreから取得したユーザーのメモデータ
    //@results: アイデア倉庫表示用htmlに変換して返す 
    makeMixIdeaCard(data) {
        const mixIdeas =
            '<div class="memolist">'
            + '<p class="stock-text">'
            + data.data().text
            + '</p>'
            + '<input type="hidden" class="mixidea-id" value="'
            + data.id
            + '">'
            + '</div>'

        return mixIdeas;
    },

    //firestoreから取得したメモカードのhtmlを挿入する
    insertMemoCards(area, memos){
        area.prepend(memos);
    },

    //firestoreの任意のコレクションからデータを取得、
    //その後、sessionStorageに保存、指定したエリアにhtmlを挿入して表示
    showIdeas(collection, area, sessionStorageKey, makeMemoHtmlFunction ,array){
        db.collection(collection)
        //ログインユーザーのIDを持つメモのみを表示したいが現状その逆になっている
        //   .where("userId", "==", post.userId)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                //firestoreからデータを取得
                const data = change.doc;
                //表示用のhtml要素を作る
                const memos = makeMemoHtmlFunction(data);
                //作成したhtml要素を挿入してアイテムを表示
                this.insertMemoCards(area, memos);
            }
            //firestoreから取得したデータを配列にしてsessionStorageに保存
            //これはアイデア掛け合わせのランダム表示を実装するときに使う。
            array.push(change.doc.data().text);
            sessionStorage.setItem(sessionStorageKey, array);
            });
        });
    }
}


/*

    実行処理

*/

//アイデアの種のアイテムを表示
firestoreShowMemos.showIdeas(
    firestoreShowMemos.collectionNames.selectedCollectionIdeas,
    firestoreShowMemos.area.memoArea,
    firestoreShowMemos.keys.sessionStorageIdeaKey,
    firestoreShowMemos.makeMemoCard,
    firestoreShowMemos.lists
)

//アイデア倉庫のアイテムを表示
firestoreShowMemos.showIdeas(
    firestoreShowMemos.collectionNames.selectedCollectionMixIdeas,
    firestoreShowMemos.area.showMixIdeaArea,
    firestoreShowMemos.keys.sessionStorageMixIdeasKey,
    firestoreShowMemos.makeMixIdeaCard,
    firestoreShowMemos.mixIdeaList
)

