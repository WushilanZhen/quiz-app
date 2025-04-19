
(function(){
  let current = 0, score = 0;
  const app = document.getElementById('app');

  function render() {
    if (current >= quizData.length) {
      app.innerHTML = `<h2>クイズ終了！</h2><p>あなたのスコア: ${score} / ${quizData.length}</p>`;
      return;
    }
    const q = quizData[current];
    let html = `<h2>第${current+1}問</h2><p>${q.question}</p>`;
    q.choices.forEach((c,i)=> {
      html += `<button id="btn${i}">${c}</button>`;
    });
    app.innerHTML = html;

    let answered = false;
    q.choices.forEach((_,i)=>{
      document.getElementById(`btn${i}`).addEventListener('click', ()=>{
        if (answered) return;
        answered = true;

        const message = document.createElement('p');
        if (i === q.answer) {
          score++;
          document.getElementById(`btn${i}`).classList.add('correct');
          message.textContent = "🎯 正解です！";
        } else {
          document.getElementById(`btn${i}`).classList.add('wrong');
          document.getElementById(`btn${q.answer}`).classList.add('correct');
          message.textContent = `❌ 不正解です！正解は「${q.choices[q.answer]}」です。`;
        }
        app.appendChild(message);

        const expl = document.createElement('p');
        expl.textContent = `解説：${q.explanation}`;
        app.appendChild(expl);

        const next = document.createElement('button');
        next.textContent = '次の問題へ';
        next.addEventListener('click', ()=>{
          current++;
          render();
        });
        app.appendChild(next);
      });
    });
  }
  render();
})();
