document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const restartBtn = document.getElementById('restartBtn');
    const toggleMusicBtn = document.getElementById('toggleMusicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModalBtn = document.getElementsByClassName('close')[0];
    let currentPlayer = 'X';
    let isGameOver = false;
    let isMusicPlaying = true;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);
    toggleMusicBtn.addEventListener('click', toggleMusic);
    closeModalBtn.addEventListener('click', closeModal);

    function handleCellClick() {
        if (isGameOver || this.textContent !== '') return;
        this.textContent = currentPlayer;
        if (checkWinner()) {
            isGameOver = true;
            highlightWinnerCells();
            displayModal(`Player ${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            isGameOver = true;
            displayModal("It's a tie!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (!isGameOver) {
                computerMove();
            }
        }
    }

    function computerMove() {
        let emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = currentPlayer;
        if (checkWinner()) {
            isGameOver = true;
            highlightWinnerCells();
            displayModal(`Player ${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            isGameOver = true;
            displayModal("It's a tie!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombos.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function isBoardFull() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '';
        });
        currentPlayer = 'X';
        isGameOver = false;
        closeModal();
        if (!isMusicPlaying) {
            toggleMusic();
        }
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.play();
        }
        isMusicPlaying = !isMusicPlaying;
    }

    function highlightWinnerCells() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winningCombos.forEach(combination => {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                cells[a].style.backgroundColor = 'lightgreen';
                cells[b].style.backgroundColor = 'lightgreen';
                cells[c].style.backgroundColor = 'lightgreen';
            }
        });
    }

    function displayModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }
});