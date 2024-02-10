document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.board span');
    const resetButton = document.getElementById('reset');
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let currentPlayer = 'X';
    let gameActive = true;

    const handleCellClick = (e) => {
        const cellIndex = parseInt(e.target.id.split('-')[1]);
        if (cells[cellIndex].textContent === '' && gameActive) {
            cells[cellIndex].textContent = currentPlayer;
            if (checkWin()) {
                handleGameEnd(`${currentPlayer} wins!`);
            } else if (checkDraw()) {
                handleGameEnd('Draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    };

    const checkWin = () => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => cells[index].textContent === currentPlayer);
        });
    };

    const checkDraw = () => {
        return [...cells].every(cell => cell.textContent !== '');
    };

    const handleGameEnd = (message) => {
        gameActive = false;
        const winningCombination = getWinningCombination();
        if (winningCombination) {
            winningCombination.forEach(index => cells[index].classList.add('win'));
        }
        setTimeout(() => {
            alert(message);
            resetGame();
        }, 100);
    };
    
    const getWinningCombination = () => {
        return WINNING_COMBINATIONS.find(combination => {
            return combination.every(index => cells[index].textContent === currentPlayer);
        });
    };

    const resetGame = () => {
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
