//Important Variables
let words =  {
    programming : ["javascript","php","css","html","java","go","dart"],
    countries : ["yemen","syria","qatar","oman","ksa"],
    movies : ["invisable","intersteller","whiplash","inception"]
};
let wordsKeys = Object.keys(words);
let randomPropName = wordsKeys[Math.floor(Math.random() * wordsKeys.length)];
let randomPropArr = Array.from(words[randomPropName]);
let randomValueName = randomPropArr[Math.floor(Math.random() * randomPropArr.length)];
let randomValueArr = Array.from(randomValueName);
let englishAlphapit = "abcdefghijklmnopqrstuvwxyz";
let englishAlphapitArr = Array.from(englishAlphapit);
let worngAttmepts = 0;
let clickStatus = false;
let gameStatus = false;
let popupGameHeader = "";

function createOptionLetters() {
    let lettersContainer = document.querySelector(".option-letters");
    englishAlphapitArr.forEach(letter => {
        let span = document.createElement("span");
        span.classList.add("letter-box");
        span.innerHTML = letter;
        lettersContainer.appendChild(span);
    });
}
function createGuessLetters() {
    let lettersContainer = document.querySelector(".guess-letters");
    randomValueArr.forEach(letter => {
        let span = document.createElement("span");
        if(letter === " ")
            span.classList.add("has-space");
        lettersContainer.appendChild(span);
    })
}
function setTheDefaultData() {
    document.querySelector(".category span").innerHTML = randomPropName;
    window.onload = function () {
        createGuessLetters();
        createOptionLetters();
    }
}
function endGame() {
    popupGameHeader = (gameStatus)? "You Won" : "You Lost";

    let popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");
    document.body.appendChild(popupOverlay);

    let popup = document.createElement("div");
    popup.classList.add("popup");
    document.body.appendChild(popup);

    let popupH1 = document.createElement("h1");
    popupH1.innerHTML = popupGameHeader;
    popup.appendChild(popupH1);

    let popupP = document.createElement("p");
    popupP.innerHTML = `the word is <span>${randomValueName}</span>`;
    popup.appendChild(popupP);

    let popupButton = document.createElement("button");
    popupButton.innerHTML = "Play Again";
    popupButton.classList.add("popup-button");
    popup.appendChild(popupButton);

    playAgain();
}
function checkTheWholeWord() {
    let spans = document.querySelectorAll(".guess-letters span:not(.has-space)");
    spans.forEach(span => {
        if(span.innerHTML === "")
            gameStatus = false;
    });
    if(gameStatus)
        endGame();
}
function checkWrongAttempts() {
    if(worngAttmepts === 8)
    {
        document.querySelector(".option-letters").classList.add("finished");
        gameStatus = false;
        endGame();
    }
}
function checkClickStatus() {
    if(!clickStatus) {
        worngAttmepts+= 1;
        document.querySelector(".hangman-draw").classList.add(`wrong-${worngAttmepts}`);
        checkWrongAttempts();
        return;
    }
    checkTheWholeWord();
}
function addLetterToSpan(letter,letterIndex) {
    let spans = document.querySelectorAll(".guess-letters span");
    spans.forEach((span,spanIndex) => {
        if(letterIndex === spanIndex) {
            span.innerHTML = letter.toUpperCase();     
        }
    })
}
function compareClickedLetterWithRealLetter(clickedLetter) {
    randomValueArr.forEach((wordLetter,letterIndex) => {
        if(clickedLetter === wordLetter) {
            clickStatus = true;
            addLetterToSpan(wordLetter,letterIndex);
        }
    });
    checkClickStatus();
}
function clickOnLetter() {
    document.addEventListener("click",e => {
        if(e.target.className === "letter-box")
        {
            gameStatus = true;
            clickStatus = false;
            e.target.classList.add("clicked");
            compareClickedLetterWithRealLetter(e.target.innerHTML);
        }
    })
}
function playAgain() {
    document.querySelector(".popup-button").addEventListener("click",e => {
        window.location.reload();
    });
}
console.log(randomValueName);
//Start the game
setTheDefaultData();
clickOnLetter();