# Word-Guess-Game

## Instructions
Word-Guess-Game is a "Hangman"-style word guessing game themed with spooky gothic horror creatures.  You begin the game by entering your name.  You are then presented with a word (masked... becuase you have to GUESS it!)  selected at random from a pre-defined list.

Each "turn" you select a letter.  If the letter has not yet been guessed, it is revealed if it is in the solution, or uses up one of your guesses if it is **not** in the solution.

If you guess the word (get all of the letters), you win the round and your win total is increased.

If you use up all of your guesses, you lose and your loss total is increased.

After you win or lose, you may continue with a new word or quit the game.

## Technical Notes
The base javascript (game.js) for the word game is created as a javascript object.  Functions outside the object handle listening for a keypress (to guess the word) or responding to button clicks (for entering your name, continuing or quitting the game).

## Credits
The background image is copied from:
https://theartmad.com/wp-content/uploads/2015/10/Halloween-Ghost-Background.jpg