function checkTheWord()
{  
    var element = document.getElementById("word");
    var infoText = document.getElementById("info_text");
    const threshold = 0.9;
    toxicity.load(threshold).then(model =>{
        let word = element.value;
        const seq = [word];
        model.classify(seq).then(predictions => {
            console.log(predictions);
            let isItBadWord = false;
            for(let i = 0; i < predictions.length; i++)
            {
                let currentObject = predictions[i];
                let results = currentObject["results"];
                for(let k = 0; k < results.length; k++)
                {
                    let newCurrentObject = results[k];
                    let match = newCurrentObject["match"];
                    if(match)
                    {
                        isItBadWord = true;
                    }
                }
            }
            if(isItBadWord)
            {
                element.classList.remove("nice_word");
                infoText.classList.remove("nice_text");
                element.classList.add("bad_word");
                infoText.classList.add("bad_text");                
            }
            else
            {
                element.classList.remove("bad_word");
                infoText.classList.remove("bad_text");
                element.classList.add("nice_word");
                infoText.classList.add("nice_text");
            }
        });
    });
}
