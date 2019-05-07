
var wordGame = {
    numberGuesses: 12,
    numberWins: 0,
    numberLosses: 0,
    wordList: ["vampire", "zombie", "witch", "ghoul", "ghost"],
    currWord: "",
    maskedWord: "",
    gameMessage: "",
    guess: "",
    lettersUsed: " ", // string of all letters used
    lettersCorrect: "", // string for all CORRECT guesses
    displayLetter: document.getElementById("selectedLetter"),
    displaySolution: document.getElementById("solutionWord"),
    displayMessage: document.getElementById("gameMessage"),
    displayUsed: document.getElementById("usedLetters"),
    displayGuesses: document.getElementById("guessesRemaining"),
    displayWins: document.getElementById("wins"),
    displayLosses: document.getElementById("losses"),
    gameStarted: false,

    setUp: function () {
        this.gameMessage = "Press 'Y' to start or 'Q' to quit.";
        this.chooseNewWord();
        this.maskWord();
        this.updateBoard();
    },

    updateBoard: function () {
        this.maskWord();
        this.updateGameMessage(this.gameMessage);
        this.updateLettersUsed();
        this.updateSelectedLetter();
        this.updateGuesses();
        this.updateSolution();
        this.updateWins();
        this.updateLosses();
    },

    updateGuesses: function () {
        this.displayGuesses.innerHTML = "Guesses Remaining: " + this.numberGuesses;
    },

    updateWins: function () {
        this.displayWins.innerHTML = "Wins: " + this.numberWins;
    },

    updateLosses: function () {
        this.displayLosses.innerHTML = "Losses: " + this.numberLosses;
    },

    updateGameMessage: function (msg) {
        this.displayMessage.innerHTML = msg;
    },

    updateSolution: function () {
        this.displaySolution.innerHTML = this.maskedWord;
    },

    updateLettersUsed: function () {
        this.displayUsed.innerHTML = "Letters used: " + this.lettersUsed;
    },

    updateSelectedLetter: function () {
        this.displayLetter.innerHTML = "Your last guess: " + this.guess;
    },

    maskWord: function () {
        maskedWordLocal = "";
        for (var i = 0; i < this.currWord.length; i++) {
            testLetter = this.currWord.substr(i, 1).toUpperCase();
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

    chooseNewWord: function () {
        // get a word from the wordList and remove it
        // note the ```splice``` returns an array of length 1, so it is necessary to convert it to a string.
        // if the wordList is out of words, display an alert
        if (this.wordList.length < 1) {
            alert("I'm out of words!");
            this.currWord = "";
        } else {
            this.currWord = this.wordList.splice(Math.floor(Math.random() * this.wordList.length), 1).toString();
        }
    },

    checkLetter: function (ltr) {
        var returnValue = "";
        // possible returnValues:
        // USED = letter has previously been guessed
        // CORRECT = letter is in the solution
        // WRONG = letter is NOT in the solution

        // check to see if the letter is in the used letter list
        var n = this.lettersUsed.indexOf(ltr);
        if (n !== -1) {
            // letter is used
            returnValue = "USED";
        } else {
            // check to see if the letter is in the word
            var t = this.currWord.toUpperCase().indexOf(ltr);
            if (t !== -1) {
                // letter in is solution
                returnValue = "CORRECT";
            } else {
                //letter is NOT in the solution
                returnValue = "WRONG";
            }
        }
        return returnValue;
    },

    keyPressed: function (keyPressed) {
        // check if key pressed is a letter
        if (/[a-z]/i.test(keyPressed) && keyPressed.length === 1) {
            var ltr = keyPressed.toUpperCase();
// need to add logic for "start" game (Y) or quit (Q)
// while gameStarted is false (default value)
// game "restarts" (slect Y or Q) after a win or loss
// so long as there are still words remaining
            // check if the letter is used or results in a correct or wrong guess
            var checkResult = this.checkLetter(ltr);
            console.log(checkResult);
            // use the result to update the game state
            if (checkResult === "USED") {
                // no action
                // update message to try again
                this.gameMessage = "That letter has been used.  Pick a different letter.";
            }
            if (checkResult === "CORRECT") {
                // add to used letters and correct letters
                // update message to success
                this.lettersUsed = this.lettersUsed + " " + ltr;
                this.lettersCorrect = this.lettersCorrect + ltr;
                this.gameMessage = "Correct guess!";
            }
            if (checkResult === "WRONG") {
                // add to used letters and decrease gusses remaining
                this.lettersUsed = this.lettersUsed + " " + ltr;
                this.numberGuesses--;
                this.gameMessage = "Incorrect guess.";
            }
// win/loss condition is not yet working
            if (this.maskWord === this.currWord) {
                // if the word is solved!
                this.gameMessage = "YOU WIN!!";
                numberWins++;
            } else if (this.numberGuesses < 1) {
                // used all the guesses
                this.gameMessage = "You lost.";
                numberLosses++;
            }
            this.guess = ltr;
            this.updateBoard();
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

document.onkeyup = function (event) {
    keyPressed = event.key;
    wordGame.keyPressed(keyPressed);
    showVars();
}


