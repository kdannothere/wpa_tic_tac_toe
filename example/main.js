const player1 = "X";
const player2 = "O";
const player1Name = "Player 1";
const player2Name = "Player 2";
const player1Color = "red";
const player2Color = "blue";

const stateWinPlayer1 = "winPlayer1";
const stateWinPlayer2 = "winPlayer2";
const stateTie = "tie";
const stateNotFinished = "NotFinished";

let currentPlayer = player1;
let player1Value = 0;
let player2Value = 0;
let turn = 0;
let message = "";
let winner = ""


function resetCells() {
	const cells = document.querySelectorAll(".game__cell");
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerHTML = "";
	}
}

function cellClicked(cell) {
	const viewTurnValue = document.getElementById("turn_value");
	if (cell.innerHTML === "") {
		cell.innerHTML = `${currentPlayer}`;
		if (currentPlayer === player1) {
			cell.style.color = player1Color;
			viewTurnValue.innerHTML = player2Name;
			viewTurnValue.style.color = player2Color;
		} else {
			cell.style.color = player2Color;
			viewTurnValue.innerHTML = player1Name;
			viewTurnValue.style.color = player1Color;
		}
	} else return;
	currentPlayer = currentPlayer === player1 ? player2 : player1;
	++turn;
	switch (checkWin()) {
		case stateWinPlayer1:
			winner = player1;
			message = " wins!";
			showDialog();
			++player1Value;
			break;
		case stateWinPlayer2:
			winner = player2;
			message = " wins!";
			showDialog();
			++player2Value;
			break;
		case stateTie:
			winner = ""
			message = "It's a tie :)"
			showDialog();
			break;
		case stateNotFinished:
			{ }
	}
}

function showDialog() {
	const viewDialog = document.getElementById("game__dialog");
	const viewDialogMessage = document.getElementById("dialog__message");
	const viewDialogWinner = document.getElementById("dialog_winner");
	const viewGameBoard = document.getElementById("game__board");
	viewDialogMessage.innerHTML = message;

	switch (winner) {
		case player1:
			viewDialogWinner.innerHTML = player1Name;
			viewDialogWinner.style.color = player1Color;
			break;
		case player2:
			viewDialogWinner.innerHTML = player2Name;
			viewDialogWinner.style.color = player2Color;
			break;
		case "":
			viewDialogWinner.innerHTML = ``;
	}
	viewGameBoard.style.visibility = "hidden";
	viewDialog.style.visibility = "visible";
}

function hideDialog() {
	const viewDialog = document.getElementById("game__dialog");
	viewDialog.style.visibility = "hidden";
	const viewGameBoard = document.getElementById("game__board");
	viewGameBoard.style.visibility = "visible";
}

function restartGame() {
	hideDialog();
	resetCells();
	const viewPlayer1Value = document.getElementById("player_1_value");
	viewPlayer1Value.innerHTML = player1Value;
	const viewPlayer2Value = document.getElementById("player_2_value");
	viewPlayer2Value.innerHTML = player2Value;
	turn = 0;
}

function checkWin() {
	const cells = document.querySelectorAll(".game__cell");
	const winningCombinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
		[0, 4, 8], [2, 4, 6]             // Diagonals
	];
	for (let i = 0; i < winningCombinations.length; i++) {
		const [a, b, c] = winningCombinations[i];
		if (cells[a].innerHTML === player1
			&& cells[b].innerHTML === player1
			&& cells[c].innerHTML === player1) {
			return stateWinPlayer1;
		} else if (cells[a].innerHTML === player2
			&& cells[b].innerHTML === player2
			&& cells[c].innerHTML === player2) {
			return stateWinPlayer2;
		}
	}
	return turn === 9 ? stateTie : stateNotFinished;
}