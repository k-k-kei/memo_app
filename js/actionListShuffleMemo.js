const shuffleButton = $(".shuffle");

// ランダムなデータを表示するエリアのDOM
const area = {
  showAreaIdea1: $(".memo1-text"),
  showAreaIdea2: $(".memo2-text")
}


// ローカルストレージからランダムでデータを取得
const getRandomIdea = () => {
  const ideasArray = sessionStorage.getItem("items").split(",");
  const ideasLength = ideasArray.length;
  const num = Math.floor(Math.random() * ideasLength);
  return ideasArray[num];
}


// ランダムで選ばれたアイデアが同じかどうか判定
const isSame = (str1, str2) => str1 === str2; 


//アイデアをランダム表示する
const showRandomIdea = (area1, area2) => {
  //ランダムで選んだアイデアを変数に格納
  const idea1 = getRandomIdea();
  const idea2 = getRandomIdea();

  //それぞれ格納したアイデアが同じかどうか判定
  if(isSame(idea1, idea2)) {
    //同じであれば再帰処理
    showRandomIdea(area1, area2);
  } else {
    //異なっていれば指定したエリアにそれぞれを表示
    area1.html(idea1);
    area2.html(idea2);
  }
}


//掛け合わせるボタンを押したときの処理を実行
shuffleButton.on("click", () => showRandomIdea(area.showAreaIdea1, area.showAreaIdea2));
