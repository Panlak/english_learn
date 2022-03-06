class EnglishTest{
        constructor(){

        }
        //return promise data ...
        async GetRandomWordAndTranslateAsync()
        {
            let data = await fetch("/dictionary/english_tests.json");
            let word = await data.json()
            return await word;
        }
        WordsEquals(word,translate) {
            console.log(word,translate)
        }
        
        
}

class GenerateEnglishTest
{
    GenerateTest(classBlock)
    {
        let blockDiv = document.getElementsByClassName(classBlock)[0];
        blockDiv.innerHTML = this.GenerateHtml
    }
    
    GenerateHtml()
    {
        let html = `
           <div id = "question-english-dictionary-test">
                <span id="test-word"></span><br>
                <span>Please enter answer</span>
                <input type="text" placeholder="enter answer" id = "user-answer-english-test">
                <button onClick = "NextWord()")>enter</button>
           </div>`
        return html
    }

    NextWord() //generate next word
    {
        let currentWord = document.getElementById("test-word");
        let answer = document.getElementById("user-answer-english-test")
        if(currentWord.innerHTML == answer.value)
        {
            console.log("true")
        }
        else
        {

        }
    }
}
                                                                

let s = new EnglishTest();
s.GetRandomWordAndTranslateAsync().then(function(result){
     s.WordsEquals(result.data.word,result.data.translate)
})
