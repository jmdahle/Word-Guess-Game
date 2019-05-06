
var wordGame = {
    numberGuesses: 12,
    numberWins: 0,
    numberLosses: 0,
    wordList: ["vampire", "zombie", "witch", "ghoul", "ghost"],
    currWord: "",
    maskedWord: "",
    displayLetter: document.getElementById("selectedLetter"),
    displaySolution: document.getElementById("solutionWord"),
    displayMessage: document.getElementById("gameMessage"),
    displayUsed: document.getElementById("usedLetters"),
    ltrLoc: -1, // variable for location of letter
    isUsed: false, // boolean for if letter is already used
    lettersUsed: "", // string of all letters used
    lettersCorrect: "", // string for all CORRECT guesses
    guess: "",

    setUp: function() {
        this.displayMessage.innerHTML = "Press any letter to start.";
        this.chooseNewWord();
        this.maskWord();
    },

    maskWord: function() {
        maskedWordLocal = "";
        for (var i = 0; i < this.currWord.length; i++) {
            testLetter = this.currWord.substr(i,1).toUpperCase();
            if (this.lettersCorrect.indexOf(testLetter) !== -1) {
                // the testLetter is in lettersCorrect, use the letter
                maskedWordLocal = maskedWordLocal + testLetter + " ";
            } else {
                // the current letter is masked
                maskedWordLocal = maskedWordLocal + "_ ";
            }
        }
        this.maskedWord = maskedWordLocal;
        this.displaySolution.innerHTML = this.maskedWord;
    },

    chooseNewWord: function() {
        // get a word from the wordList and remove it
        // note the ```splice``` returns an array of length 1, so it is necessary to convert it to a string.
        // if the wordList is out of words, display an alert
        if (this.wordList.length < 1) {
            alert("I'm out of words!");
            this.currWord = "";
        } else {
            this.currWord = this.wordList.splice(Math.floor(Math.random() * this.wordList.length),1).toString();
        }
    }
}

function showVars() {
    console.log(
        "current word: " + wordGame.currWord + " | ", 
        "letters used: " + wordGame.lettersUsed + " | ",
        "masked word: " + wordGame.maskedWord + " | ",
        "current guess: " + wordGame.guess + " | ", 
        "number guesses remain: " + wordGame.numberGuesses + " | "
        );
    console.log("==========");
}

wordGame.setUp();
showVars();

// document.addEventListener('keyup', logKey);

