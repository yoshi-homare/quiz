'use strict';

{
  // 各要素を取得。
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector("#result > p");

  // 問題と解答を配列で用意しshuffle関数を使いシャッフルに表示されるように設定。
  const quizSet = shuffle([
    {q: "去年のダービー馬は？", c: ["コントレイル", "ディープインパクト", "シャフリヤール"]},
    {q: "ゴールドシップの大好きな厩務員さんは？", c: ["今浪さん", "橋本さん", "立浪さん"]},
    {q: "アーモンドアイはG1何冠？", c: ["9冠", "8冠", "10冠"]},
    {q: "歴代最強の白毛馬は？", c: ["ソダシ", "ミダシ", "アゴダシ"]},
    {q: "WIN5の最高獲得賞金は？", c: ["6億", "10億", "4億"]},
    {q: "橋本家最年長は？", c: ["うに", "ともみ", "つくよ"]},
    {q: "獲得賞金ランキング1位の馬は？", c: ["アーモンドアイ", "キタサンブラック", "ディープインパクト"]},
  ]);

  // 変数を設定。
  let currentNum = 0;
  let isAnswered;
  let score = 0;
  let noScore = 0;

  // シャッフルされるよう設定。
  function shuffle (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  // 答えをチェックしたら正誤判定をし正誤数のカウントをしチェックしたら2個目のチェックはできないよう設定。
  // btnIDにdisabledクラスを外しanswerクラスを付与。
  // 最後の問題でチェックされたらbtnIDのanswerクラスを外し新しくテキストを付与。
  function checkAnswer(li) {
    if (isAnswered === true) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
      noScore++;
    }

    btn.classList.remove("disabled");
    btn.classList.add("answer");

    if (currentNum === quizSet.length - 1) {
      btn.classList.remove("answer");
      btn.textContent = "結果発表！！"
    }
  }

  // 答えをチェックする前の問題の表示を設定し新しい問題が増えたら前の問題を消す。
  // 元の配列はシャッフルさせずに表示される問題だけシャッフルされるよう設定しliに挿入。
  // クリックしたらcheckAnswer関数を付与。
  // choicesIDにliを挿入。
  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffleChoices = shuffle([...quizSet[currentNum].c]);

    shuffleChoices.forEach(choice => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        checkAnswer(li);
      })
      choices.appendChild(li);
    });
  }
  setQuiz();

  // btnIDにクリックイベントを付与。
  // disabledクラスがついていたらクリックできないよう設定。
  // 最後の問題でクリックしたらbtnIDのクラスをすべて外し新しくテキストを挿入しresultIDのhiddenクラスを外しscoreLabelにテキストを挿入。
  // 最後の問題じゃなかったら問題を繰り返す。
  btn.addEventListener("click", () => {
    if (btn.classList.contains("disabled")) {
      return;
    }

    btn.classList.add("disabled")

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `${quizSet.length}問中 ${score}問正解 ${noScore}問不正解`;
      result.classList.remove("hidden");
      btn.classList.remove("disabled");
      btn.classList.remove("answer");
      btn.textContent = "終了！"
    } else {
      currentNum++;
      setQuiz();
    }
  })
}