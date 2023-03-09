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

var stateofBoard;

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
        playTurn(box.id, playerControl);
        if (!checkDraw()) {
            console.log("hello");
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

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].onclick = "";
    }

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
