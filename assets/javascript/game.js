
var wordGame = {
    numberGuesses: 12,
    numberWins: 0,
    numberLosses: 0,
    wordList: ["vampire", "zombie", "witch", "ghoul", "ghost"],
    currWord: "",
    maskedWord: "",
    gameMessage: "Press any letter to start.",
    guess: "",
    lettersUsed: " ", // string of all letters used
    lettersCorrect: "", // string for all CORRECT guesses
    displayLetter: document.getElementById("selectedLetter"),
    displaySolution: document.getElementById("solutionWord"),
    displayMessage: document.getElementById("gameMessage"),
    displayUsed: document.getElementById("usedLetters"),

    setUp: function() {
        this.chooseNewWord();
        this.maskWord();
        this.updateBoard();
    },

    updateBoard: function() {
        this.updateGameMessage(this.gameMessage);
        this.updateLettersUsed();
        this.updateSelectedLetter();
        this.updateSolution();
    },

    updateGameMessage: function(msg) {
        this.displayMessage.innerHTML = msg;
    },

    updateSolution: function() {
        this.displaySolution.innerHTML = this.maskedWord;
    },

    updateLettersUsed: function() {
        this.displayUsed.innerHTML = this.lettersUsed;
    },

    updateSelectedLetter: function() {
        this.displayLetter.innerHTML = this.guess;
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
    },

    keyPressed: function (keyPressed) {
        var isUsed = false;
        // check if key pressed is a letter
        if (/[a-z]/i.test(keyPressed) && keyPressed.length === 1) {
            var guessLoc = keyPressed.toUpperCase();    
            // check to see if the letter is in the used letter list
            var n = this.lettersUsed.indexOf(guessLoc);
            if (n !== -1) {
                // letter is used
                isUsed = true;
                this.GameMessage = "That letter has been used.  Pick a different letter.";
            } else {
                isUsed = false;
                // add letter to used letter list
                this.lettersUsed = this.lettersUsed + " " + guessLoc;
            }
            // check to see if the letter is in the word
            n = this.currWord.toUpperCase().indexOf(guessLoc);
            if ((n !== -1) && (!isUsed)) {
                // letter is in solution and hasn't been used
                // reveal the letter
                // create a new "masked" version of the word
                this.lettersCorrect = this.lettersCorrect + guessLoc;
                this.maskWord();
            }
        }
        this.updateBoard();
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

document.onkeyup = function (event) {
    keyPressed = event.key;
    wordGame.keyPressed(keyPressed);
    showVars();
}


