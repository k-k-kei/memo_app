/*

  フォーム入力からfirestore保存に必要なメソッドをまとめたオブジェクト

*/
const firestoreSaveAction = {
  //@obj: 入力されたフォームのDOM
  //@results: postオブジェクトに値を格納
  getMemo(obj) {
    post.text = obj.val();
  },

  //@str: フォームに入力された値
  //@results: フォームの値をクリア
  clearMemoInputForm(text) {
    text.val("");
  },

  //@obj: 入力されたフォームのDOM
  //@results: テキスト入力有無をboolで返す
  hasNotBlank(obj) {
    return obj.val() != "";
  },

  //@collectionName: 保存先のfirestoreコレクション名
  //@contents: 保存する値
  //@result: firestoreへ保存
  saveFirestore(collectionName, contents) {
    db.collection(collectionName).add(contents);
  },

  //@obj: 入力されたフォームのDOM
  //@collection: 保存先のfirestoreコレクション名
  //@contents: 保存する値
  //@result: フォームのDOMから値の取得を行い、空白でないか判定、
  //空白でなければfirestoreの任意のコレクションにそれぞれの値が格納されたオブジェクトを保存する。
  compleateMemoSaveAction(obj, collection, content) {
    this.getMemo(obj);
    if (this.hasNotBlank(obj)) {
      this.saveFirestore(collection, content);
      this.clearMemoInputForm(obj);
    } else {
      alert("文字を入力してください");
    }
  }
}


    //メモとして格納するデータを集めたオブジェクト
    const post = {
      postkey: 0,
      username: "",
      userId: "",
      text: "",
    }

    // ログイン中のユーザー情報を最初にpostオブジェクトに保存する役割
    firebase.auth().onAuthStateChanged((user) => {
      post.userId = user.displayName;
      post.userId = user.uid;
    })

    //フォーム入力からメソッド発火に使用するボタン群
    const buttons = {
      isMemoForm: $(".input-text-long"),
      isMixIdeaForm: $(".show-answer"),

      isMemoSave: $(".savebtn"),
      isMixIdeaSave: $(".idea-save")
    }

    //メモを保存するfirestoreコレクション名一覧
    const collectionNames = {
      saveCollectionIdeas: "ideas",
      saveCollectionMixIdeas: "mixideas"
    }


    /*

    実行処理

  */

    // firestoreへメモを保存
    buttons.isMemoSave.on("click", () => {
      firestoreSaveAction.compleateMemoSaveAction(buttons.isMemoForm, collectionNames.saveCollectionIdeas, post);
    });

    // firestoreへ組み合わせアイデアを保存
    buttons.isMixIdeaSave.on("click", () => {
        post.postkey = 1;
        firestoreSaveAction.compleateMemoSaveAction(buttons.isMixIdeaForm, collectionNames.saveCollectionMixIdeas, post)
    });

