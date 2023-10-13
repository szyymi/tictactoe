const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('message');
const playAgainButton = document.getElementById('play-again');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;

// Initially hide the result screen
resultScreen.style.display = 'none';

function checkWin(player) {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winCombos.some((combo) => {
        return combo.every((index) => board[index] === player);
    });
}

function showResultScreen(message) {
    resultMessage.innerText = message;
    resultScreen.style.display = 'flex';
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.id;

    if (board[index] === '' && !gameWon) {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.style.backgroundColor = currentPlayer === 'X' ? '#f55' : '#55f';

        if (checkWin(currentPlayer)) {
            showResultScreen(currentPlayer + ' wins!');
            gameWon = true;
        } else if (!board.includes('')) {
            showResultScreen("It's a draw!");
            gameWon = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameWon = false;

    cells.forEach((cell) => {
        cell.innerText = '';
        cell.style.backgroundColor = '#f0f0f0';
    });

    // Hide the result screen
    resultScreen.style.display = 'none';
}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame);
