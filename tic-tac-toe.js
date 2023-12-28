/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if(board[position] == ' '){
        board[position] = mark;
       }
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {

    // Print the updated board
    console.log(
        ` ${board[1]} | ${board[2]} | ${board[3]} \n --------- \n` +
        ` ${board[4]} | ${board[5]} | ${board[6]} \n --------- \n` +
        ` ${board[7]} | ${board[8]} | ${board[9]} \n`
    );

}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    let pos = parseInt(position);
    return !isNaN(pos) && pos >= 1 && pos <= 9 && board[pos] === ' ';

}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let combination of winCombinations) {
        if (combination.every(pos => board[pos] === player)) {
            return true;
        }
    }
    return false;

}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    return Object.values(board).every(cell => cell !== ' ');

}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let validMove = false;
    while (!validMove) {
        let position = prompt(`Player ${player}, enter your move (1-9): `);
        if (validateMove(position)) {
            markBoard(parseInt(position), player);
            validMove = true;
        } else {
            console.log('Invalid move. Try again.');
        }
    }

    if (checkWin(player)) {
        console.log(`Player ${player} wins!`);
        restartGame();
    } else if (checkFull()) {
        console.log('It\'s a tie!');
        restartGame();
    }

}

function restartGame() {
    let answer = prompt('Do you want to restart the game? (Y/N): ').toUpperCase();
    if (answer === 'Y') {
        board = {
            1: ' ', 2: ' ', 3: ' ',
            4: ' ', 5: ' ', 6: ' ',
            7: ' ', 8: ' ', 9: ' '
        };
        console.log('\nGame restarted!\n');
        printBoard();
    } else if (answer === 'N') {
        console.log('Thanks for playing. Goodbye!');
        process.exit();
    } else {
        console.log('Invalid input. Please enter Y or N.');
        restartGame();
    }
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    printBoard();
    
    playTurn('O');
    printBoard();
    // feel free to add logic here if needed, e.g. announcing winner or tie
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over