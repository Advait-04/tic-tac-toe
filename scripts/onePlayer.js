const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const mainDiv = document.querySelector("main");

var stateofBoard;

var clickBoxLogger = [];

var prevStateOfBoard;

const playerControl = "X";
const systemControl = "O";

const boxes = document.querySelectorAll(".box");

startGame();

function startGame() {
    stateofBoard = Array.from(Array(9).keys());
    console.log(stateofBoard);
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].children[0].textContent = "";
        boxes[i].style.removeProperty("background-color");
    }
}

function clickHandler(box) {
    if (typeof stateofBoard[box.id] === "number") {
        clickBoxLogger.push(box.id);

        playTurn(box.id, playerControl);

        prevStateOfBoard = Array.from(stateofBoard);

        if (!checkDraw()) {
            playTurn(bestBox(), systemControl);
        }
    }
}

function playTurn(boxId, player) {
    stateofBoard[boxId] = player;
    document.getElementById(boxId).children[0].textContent = player;

    let gameWon = checkWin(stateofBoard, player);
    if (gameWon) {
        gameOver(gameWon);
    }
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);

    let gameWon = null;
    for (let [index, win] of lines.entries()) {
        if (win.every((elem) => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }

    return gameWon;
}

function gameOver(gameWon) {
    for (let index of lines[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = "green";
    }

    //remove event listener
    // for (var i = 0; i < boxes.length; i++) {
    //     boxes[i].onclick = "";
    // }

    mainDiv.style.pointerEvents = "none";

    declareWinner(gameWon.payer === playerControl ? "player won" : "ai won");
}

function bestBox() {
    return miniMax(stateofBoard, systemControl).index;
}

function emptyBoxes() {
    return stateofBoard.filter((itm) => typeof itm === "number");
}

function checkDraw() {
    if (emptyBoxes().length === 0) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].onclick = "";
        }
        declareWinner("Tie Game");
        return true;
    } else {
        return false;
    }
}

function declareWinner(winner) {
    //do the comment section here
}

function miniMax(newBoard, player) {
    var availableBoxes = emptyBoxes();

    if (checkWin(newBoard, playerControl)) {
        return {
            score: -10,
        };
    } else if (checkWin(newBoard, systemControl)) {
        return {
            score: 10,
        };
    } else if (availableBoxes.length === 0) {
        return {
            score: 0,
        };
    }

    var moves = [];
    for (var i = 0; i < availableBoxes.length; i++) {
        var move = {};
        move.index = newBoard[availableBoxes[i]];
        newBoard[availableBoxes[i]] = player;

        if (player === systemControl) {
            var result = miniMax(newBoard, playerControl);
            move.score = result.score;
        } else {
            var result = miniMax(newBoard, systemControl);
            move.score = result.score;
        }

        newBoard[availableBoxes[i]] = move.index;

        moves.push(move);
    }

    var bestMove;

    if (player === systemControl) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function gameReset() {
    mainDiv.style.pointerEvents = " ";
    startGame();
}

function onUndo() {
    const move = clickBoxLogger.pop();

    prevStateOfBoard[move] = parseInt(move, 10);

    // stateofBoard = Array.from(prevStateOfBoard);
    console.log(prevStateOfBoard);
    console.log(stateofBoard);

    const difference = prevStateOfBoard.filter(
        (x) => !stateofBoard.includes(x)
    );

    for (var i = 0; i < difference.length; i++) {
        const box = document.getElementById(difference[i]);
        box.children[0].textContent = "";
    }

    stateofBoard = Array.from(prevStateOfBoard);
}
