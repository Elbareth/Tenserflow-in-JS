const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
let rec = new SpeechRecognition();
//We want to define what language we want to recognise
rec.lang = 'pl-PL';
//If we want to wait until the whole content is converted
rec.interimResults = true;
//We convert the results and put them into paragraph
rec.addEventListener('result', it => {
    let paragraph = document.getElementById('word');
    let transcript = Array.from(it.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join(' ');
    if(it.results[0].isFinal)
    {
        paragraph.textContent = paragraph.textContent +' '+ transcript;
    }
    
});
//We want to know when sb stop talking - in that case we want to restart out speech recognision
rec.addEventListener('end', rec.start);
rec.start();