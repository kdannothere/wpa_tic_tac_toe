import React from 'react';
import Header from './components/Header';
import './styles/main.css';
import Board from './components/Board';

function App() {
    const [board, setBoard] = React.useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = React.useState('X');
    const [winner, setWinner] = React.useState(null); // 'X', 'O', 'Draw', or null
    const [scores, setScores] = React.useState({ X: 0, O: 0 });
    const [installPromptEvent, setInstallPromptEvent] = React.useState(null);
    const [isStandalone, setIsStandalone] = React.useState(false);

    React.useEffect(() => {
        // Capture the event that fires when the app is installable
        const handleInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPromptEvent(event);
        };

        window.addEventListener('beforeinstallprompt', handleInstallPrompt);

        // Check if the app is running in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsStandalone(true);
        }

        // Cleanup
        return () => {
            window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
        };
    }, []);


    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const checkWinner = (currentBoard) => {
        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }
        }
        return null;
    };

    const checkDraw = (currentBoard) => {
        return currentBoard.every(cell => cell !== null);
    };

    const handleClick = (index) => {
        if (board[index] || winner) {
            return; // Cell already taken or game already won/drawn
        }

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            setScores(prevScores => ({
                ...prevScores,
                [gameWinner]: prevScores[gameWinner] + 1
            }));
        } else if (checkDraw(newBoard)) {
            setWinner('Draw');
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setWinner(null);
    };

    const handleInstallClick = () => {
        if (!installPromptEvent) {
            return;
        }
        // Show the browser's install prompt
        installPromptEvent.prompt();
        // We can't use the event again, so clear it
        installPromptEvent.userChoice.then(() => {
            setInstallPromptEvent(null);
        });
    };

    const getStatusMessage = () => {
        if (winner === 'Draw') {
            return "It's a Draw!";
        } else if (winner) {
            return `Winner: ${winner}`;
        } else {
            return `Turn: ${currentPlayer}`;
        }
    };

    return (
        <div className="App">
            {installPromptEvent && !isStandalone && (
                <button id="install__button" onClick={handleInstallClick}>
                    Install App
                </button>
            )}
            <Header />
            <main className="game__body">
                <div id="game__dialog" className={winner ? 'active' : ''}>
                    <span id="dialog_winner">{winner && winner !== 'Draw' ? `Player ${winner} Wins!` : ''}</span>
                    <span id="dialog__message">{winner === 'Draw' ? "It's a Draw!" : ''}</span>
                    {winner && (<div id="button__restart" onClick={restartGame}>Restart</div>)}
                </div>
                <div id="game__counter">
                    <p className="game__players" id="player_1">Player X: <span id="player_1_value">{scores.X}</span></p>
                    <p className="game__players" id="player_2">Player O: <span id="player_2_value">{scores.O}</span></p>
                    <p id="game__turn">Turn: <span id="turn_value">{getStatusMessage()}</span></p>
                </div>
                <Board board={board} onClick={handleClick} />
            </main>
        </div>
    );
}

export default App;