# Ideas for Word Game

## Theme Ideas
* death metal theme
* computer hacker theme
* magic card theme
    * Show the card art and guess the name of the card?

## Game Outline
1. Set up
    1. initialize variables
    1. refresh start screen
1. Play Game
    1. choose a new word (from unplayed words)
    1. get new guess from user
    1. validate guess as a letter
    1. compare guess to used letter list
        * if used, ignore and get new guess
    1. else compare guess to solution
        * if in solution, update solution
        * if solved, you win.
        * add to used letter list
    1. else record incorrect guess
        * decrement guesses remaining
        * if guesses remaining is 0, you lose.
1. Clean up
    1. update score
    1. play again?
        * if yes Play Game
        * if no Exit Game
1. Exit Game
