document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status");
    const restartButton = document.querySelector(".restart-button");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X"; // Player starts first
    let running = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    function checkWinner() {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusText.textContent = `Player ${currentPlayer} Wins!`;
                running = false;
                cells[a].style.color = "cyan";
                cells[b].style.color = "cyan";
                cells[c].style.color = "cyan";
                return;
            }
        }

        if (!board.includes("")) {
            statusText.textContent = "It's a Draw!";
            running = false;
        }
    }

    function cellClick(event) {
        const index = event.target.getAttribute("data-index");

        if (board[index] !== "" || !running || currentPlayer === "O") {
            return;
        }

        board[index] = "X";
        event.target.textContent = "X";
        checkWinner();

        if (running) {
            currentPlayer = "O";
            statusText.textContent = "Computer's turn...";
            setTimeout(computerMove, 500); // Delay for better UX
        }
    }

    function computerMove() {
        if (!running) return;

        let emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);

        if (emptyCells.length === 0) return;

        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        board[randomIndex] = "O";
        cells[randomIndex].textContent = "O";

        checkWinner();

        if (running) {
            currentPlayer = "X";
            statusText.textContent = "Player X's turn";
        }
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        running = true;
        statusText.textContent = "Player X's turn";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.color = "white";
        });
    }

    cells.forEach(cell => cell.addEventListener("click", cellClick));
    restartButton.addEventListener("click", restartGame);
});
const movies = [
    // Bollywood Movies
    "DILWALE DULHANIA LE JAYENGE", "SHOLAY", "3 IDIOTS", "ZINDAGI NA MILEGI DOBARA", 
    "DANGAL", "KABIR SINGH", "BAJRANGI BHAIJAAN", "GULLY BOY", "ANDHADHUN",
    
    // Tollywood & Indian Movies
    "RRR", "PUSHPA", "DRISHYAM", "VIKRAM", "KANTARA", "BAHUBALI", "KGF", 
    "EGA", "MAHANATI", "JAI BHIM", 

    // Hollywood Movies
    "INCEPTION", "TITANIC", "AVATAR", "GLADIATOR", "INTERSTELLAR", "GODFATHER", 
    "JOKER", "DARK KNIGHT", "FORREST GUMP", "AVENGERS"
];

let selectedMovie = movies[Math.floor(Math.random() * movies.length)];
let guessedLetters = new Set();
let maxAttempts = 5;
let wrongAttempts = 0;

// Generate hint by revealing some letters
function generateHint(movie) {
    let hintLetters = new Set();
    let letters = movie.replace(/ /g, "").split(""); // Remove spaces and split letters
    let hintCount = Math.ceil(letters.length * 0.05); // Reveal 30% of the letters

    while (hintLetters.size < hintCount) {
        let randomIndex = Math.floor(Math.random() * letters.length);
        hintLetters.add(letters[randomIndex]);
    }

    return movie.split("").map(letter => 
        letter === " " ? " " : (hintLetters.has(letter) ? letter : "_")
    ).join("");
}

let movieHint = generateHint(selectedMovie);
movieHint.split("").forEach(letter => {
    if (letter !== "_") guessedLetters.add(letter); // Add revealed letters to guessedLetters
});

// Display the masked movie title
function getMaskedMovie() {
    return selectedMovie.split("").map(letter => 
        letter === " " ? " " : (guessedLetters.has(letter) ? letter : "_")
    ).join(" ");
}

// Update the game UI
function updateDisplay() {
    document.getElementById("movie-display").innerText = getMaskedMovie();
    document.getElementById("attempts").innerText = `Attempts Left: ${maxAttempts - wrongAttempts}`;
    document.getElementById("wrong-letters").innerText = `Wrong Letters: ${[...guessedLetters].filter(letter => !selectedMovie.includes(letter)).join(", ")}`;
}

// Check game status
function checkGameStatus() {
    if (!getMaskedMovie().includes("_")) {
        document.getElementById("message").innerText = "🎉 You Won! The movie was: " + selectedMovie;
        document.getElementById("guess-input").disabled = true;
    } else if (wrongAttempts >= maxAttempts) {
        document.getElementById("message").innerText = "😢 Game Over! The movie was: " + selectedMovie;
        document.getElementById("guess-input").disabled = true;
    }
}

// Handle player's guess
document.getElementById("guess-btn").addEventListener("click", function () {
    let guess = document.getElementById("guess-input").value.toUpperCase();
    document.getElementById("guess-input").value = "";

    if (!guess || guessedLetters.has(guess) || guess.length !== 1) {
        alert("Please enter a new single letter!");
        return;
    }

    guessedLetters.add(guess);

    if (!selectedMovie.includes(guess)) {
        wrongAttempts++;
    }

    updateDisplay();
    checkGameStatus();
});

// Restart the game
document.getElementById("restart-btn").addEventListener("click", function () {
    guessedLetters.clear();
    wrongAttempts = 0;
    selectedMovie = movies[Math.floor(Math.random() * movies.length)];
    movieHint = generateHint(selectedMovie);
    movieHint.split("").forEach(letter => {
        if (letter !== "_") guessedLetters.add(letter);
    });
    document.getElementById("guess-input").disabled = false;
    document.getElementById("message").innerText = "";
    updateDisplay();
});

// Initialize the game
updateDisplay();
