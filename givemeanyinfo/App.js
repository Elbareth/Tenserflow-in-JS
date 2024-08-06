import './App.css';
import * as qna from '@tensorflow-models/qna';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

const findAnswer = async() =>
{
    let question = document.getElementById("question").value;
    let content = document.getElementById("content").value;    
    let modelPromise = qna.load();
    const model = await modelPromise;
    const answers = await model.findAnswers(question, content);
    console.log(answers);
    let answer = document.getElementById("answer");
    answer.innerHTML = answers.map(it => it.text + ' (score =' + it.score + ')').join('<br>');
    //answer.innerText = answers;
}

function App() {
  return (
    <div className="App">
      <p>Add the information to search from:</p>
      <textarea id = "content" rows="30" cols="100"/>
      <br/>
      <p>Ask your question:</p>
      <input type="text" id="question"/>
      <input type="button" value="Search" onClick={findAnswer}/>
      <br/>
      <h5>Answer:</h5>
      <p id="answer"></p>
    </div>
  );
}

export default App;
