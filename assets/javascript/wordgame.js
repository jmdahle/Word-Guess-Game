
// initialize
var numberGuesses = 12;
var wordList = ["vampire", "zombie", "witch", "ghoul", "ghost"];
var maskedWord = "";
var displayLetter = document.getElementById("selectedLetter");
var displaySolution = document.getElementById("solutionWord");
var displayMessage = document.getElementById("gameMessage");
var displayUsed = document.getElementById("usedLetters");
var ltrLoc = -1 // variable for location of letter
var isUsed = false // boolean for if letter is already used
var lettersUsed = "" // string of all letters used
var lettersCorrect = "" // string for all CORRECT guesses
var guess = "";

// get a word from the wordList and remove it
// note the ```splice``` returns an array of length 1, so it is necessary to convert it to a string.
currWord = wordList.splice(Math.floor(Math.random() * wordList.length),1).toString();
// create a "masked" version of the word
for (var i = 0; i < currWord.length; i++) {
    maskedWord = maskedWord + "_ ";
}
// should I ```trim``` the maskedWord?
displaySolution.innerHTML = maskedWord;


console.log (currWord + "(" + currWord.length + ") removed from " + wordList);

// listen for a key press
document.addEventListener('keyup', logKey);



function logKey (e) {
    //clear any messages
    displayMessage.innerHTML = "";
    isUsed = false;

    // check if key pressed is a letter
    if (/[a-z]/i.test(e.key) && e.key.length == 1) {
        guess = e.key.toUpperCase();
        displayLetter.innerHTML = guess;

        // check to see if the letter is in the used letter list
        n = lettersUsed.indexOf(guess);
        if (n !== -1) {
            // letter is used
            isUsed = true;
            displayMessage.innerHTML = "That letter has been used.  Pick a different letter."
        } else {
            isUsed = false;
            // add letter to used letter list
            lettersUsed = lettersUsed + " " + guess;
            // updated used letter list
            displayUsed.innerHTML = lettersUsed;
        }
        // check to see if the letter is in the word
        n = currWord.toUpperCase().indexOf(guess);
        if ((n !== -1) && (!isUsed)) {
            // letter is in solution and hasn't been used
            // reveal the letter
            // create a new "masked" version of the word
            lettersCorrect = lettersCorrect + guess;
            console.log("update masked word");
            maskedWord = "";
            for (var i = 0; i < currWord.length; i++) {
                testLetter = currWord.substr(i,1).toUpperCase();
                if (lettersCorrect.indexOf(testLetter) !== -1) {
                    // the testLetter is in lettersCorrect, use the letter
                    maskedWord = maskedWord + testLetter + " ";
                } else {
                    // the current letter is masked
                    maskedWord = maskedWord + "_ ";
                }
            }
            displaySolution.innerHTML = maskedWord;
        }
    }
}
