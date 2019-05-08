
var wordGame = {
    playerName: "",
    numberWins: 0,
    numberLosses: 0,
    wordList: ["vampire", "zombie", "witch", "ghoul", "ghost", "spooky", "wraith", "spirit", "phantom", "shadow"],
    numberGuesses: 8,
    currWord: "",
    maskedWord: "",
    gameMessage: "",
    gameInstructions: "", 
    guess: "", 
    lettersUsed: "", 
    lettersCorrect: "",
    isSolved: false,
    gameActive: false,
    displayInstructions: document.getElementById("gameInstructions"),
    displayLetter: document.getElementById("selectedLetter"),
    displaySolution: document.getElementById("solutionWord"),
    displayMessage: document.getElementById("gameMessage"),
    displayUsed: document.getElementById("usedLetters"),
    displayGuesses: document.getElementById("guessesRemaining"),
    displayWins: document.getElementById("wins"),
    displayLosses: document.getElementById("losses"),
    endGameFlag: false,

    startGame: function () {
        // starts a new game by asking for player name and initializing the game
        this.getPlayerName();
        this.setUp();
    },

    setUp: function () {
        // set up the game with a new word
        // need to re-set a number of properties
        this.gameActive = true;
        this.numberGuesses = 8;
        this.currWord = "";
        this.maskedWord = "";
        this.gameMessage = "";
        this.gameInstructions = "";
        this.guess = "";
        this.lettersUsed = "";
        this.lettersCorrect = "";
        this.isSolved = false;
        this.gameInstructions = "Press any letter to make a guess, " + this.playerName + ".";
        // choose a new word and create a "masked" version of it
        this.chooseNewWord();
        this.maskWord();
        // update the game view
        this.updateBoard();
    },

    getPlayerName: function () {
        // Gets the player name, and provides a default if no name is selected)
        this.playerName = prompt("Please enter your name");
        if (this.playerName == "" || this.playerName == null) { this.playerName = "No Body (get it?)"; }
        alert("Alright, " + this.playerName + ", let's get started!");
    },

    updateBoard: function () {
        this.maskWord();
        this.updateGameInstructions(this.gameInstructions);
        this.updateGameMessage(this.gameMessage);
        this.updateLettersUsed();
        this.updateSelectedLetter();
        this.updateGuesses();
        this.updateSolution();
        this.updateWins();
        this.updateLosses();
        // win/loss condition is not yet working
        if (this.isSolved) {
            // if the word is solved!
            this.gameMessage = "YOU WIN!!  Way to go, " + this.playerName;
            this.numberWins++;
            this.updateWins();
            // this.gameEnd();
            this.endGameFlag = true;
        } else if (this.numberGuesses < 1) {
            // used all the guesses
            this.gameMessage = "You lost.  Better luck next time, " + this.playerName;
            this.numberLosses++;
            this.updateLosses();
            // this.gameEnd();
            this.endGameFlag = true;
        }
    },

    gameEnd: function () {
        var confirmMessage = this.gameMessage + "  You have " + this.numberWins + " wins and " + this.numberLosses + " losses."
        // if there are no more words left, CONTINUE will need to restart the game; if there are words left, CONTINUE will use a new word
        if (this.wordList.length < 1) {
            confirmMessage = confirmMessage + "  You've used up all my words!  Do you want to re-start?  If so, click 'OK.'  'Cancel' will end the game."
        } else {
            confirmMessage = confirmMessage + "  Do you want to continue playing with a new word?  If so, click 'OK.'  'Cancel' will end the game."
        }
        var continueYN = confirm(confirmMessage);
        if (!continueYN) {
            alert("Quitter!");
            this.quitGame();
        } else if (this.wordList.length < 1) {
            alert("Restocking shelves");
            alert(wordGame.wordList + " | " + this.wordList);
        } else {
            alert("Selecting next word...");
            this.setUp();
        }
        this.endGameFlag = false;
    },

    quitGame: function () {
        this.gameActive = false;
    },

    updateGuesses: function () {
        this.displayGuesses.textContent = "Guesses Remaining: " + this.numberGuesses;
    },

    updateWins: function () {
        this.displayWins.textContent = this.numberWins;
    },

    updateLosses: function () {
        this.displayLosses.textContent = this.numberLosses;
    },

    updateGameMessage: function (msg) {
        this.displayMessage.textContent = msg;
    },

    updateGameInstructions: function (msg) {
        this.displayInstructions.textContent = msg;
    },

    updateSolution: function () {
        this.displaySolution.textContent = this.maskedWord;
    },

    updateLettersUsed: function () {
        this.displayUsed.textContent = "Letters used: " + this.lettersUsed;
    },

    updateSelectedLetter: function () {
        this.displayLetter.textContent = "Your last guess: " + this.guess;
    },

    maskWord: function () {
        var maskedWordLocal = "";
        var numUnsolvedLetters = 0;
        for (var i = 0; i < this.currWord.length; i++) {
            testLetter = this.currWord.substr(i, 1).toUpperCase();
            if (this.lettersCorrect.indexOf(testLetter) !== -1) {
                // the testLetter is in lettersCorrect, use the letter
                maskedWordLocal = maskedWordLocal + testLetter + " ";
            } else {
                // the current letter is masked
                maskedWordLocal = maskedWordLocal + "_ ";
                numUnsolvedLetters++;
            }
        }
        if (numUnsolvedLetters === 0) { this.isSolved = true; }
        this.maskedWord = maskedWordLocal.trim();

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
            this.isSolved = false;
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
            this.guess = ltr;
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
        "number guesses remain: " + wordGame.numberGuesses + " | ",
        "isSolved: " + wordGame.isSolved + " | ",
        "gameActive: " + wordGame.gameActive + " | ",
        "endGameFlag: " + wordGame.endGameFlag + " | "
    );
    console.log("==========");
}

wordGame.startGame();
showVars();

document.onkeyup = function (event) {
    if (wordGame.gameActive) {
        keyPressed = event.key;
        wordGame.keyPressed(keyPressed);
        showVars();
    }
    if (wordGame.endGameFlag) {wordGame.gameEnd();}
    /*
    JavaScript execution and page rendering are done in the same execution thread, which means that while your code is executing the browser will not be redrawing the page.
     - from: https://stackoverflow.com/questions/8110905/javascript-a-loop-with-innerhtml-is-not-updating-during-loop-execution
    */

    /* TRY THIS SOLUTION:
    Use a Bootstrap MODAL dialog.  The "window" dialog is taking precedence, interrupting the rendering of the page
    */
}


