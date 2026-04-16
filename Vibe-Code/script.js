const cells = document.querySelectorAll(".cell");      // All board cells
const statusText = document.getElementById("status");  // Game status display
const restartBtn = document.getElementById("restart"); // Restart button
const playerScoreEl = document.getElementById("playerScore"); // Player score display
const aiScoreEl = document.getElementById("aiScore");         // AI score display

let board = Array(9).fill(""); // Game state (9 cells)
let currentPlayer = "X";       // Current turn
let gameOver = false;          // Prevent further moves after win
let playerScore = 0;
let aiScore = 0;

// All possible winning combinations
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Add click listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", resetGame);

// Handle player click
function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || gameOver) return; // Ignore invalid moves

    makeMove(index, "X");

    if (!gameOver) {
        setTimeout(aiMove, 300); // AI moves after short delay
    }
}

// Place a move on the board
function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;

    // Check for win
    if (checkWinner(player)) {
        statusText.textContent = `Player ${player} wins!`;
        gameOver = true;

        // Update score
        if (player === "X") {
            playerScore++;
            playerScoreEl.textContent = playerScore;
        } else {
            aiScore++;
            aiScoreEl.textContent = aiScore;
        }

        return;
    }

    // Switch turn
    currentPlayer = player === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Simple AI: picks a random empty cell
function aiMove() {
    let available = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(val => val !== null);

    if (available.length === 0) return;

    const randomIndex = available[Math.floor(Math.random() * available.length)];
    makeMove(randomIndex, "O");
}

// Check if a player has won
function checkWinner(player) {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === player);
    });
}

// Reset game state and UI
function resetGame() {
    board = Array(9).fill("");
    gameOver = false;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}