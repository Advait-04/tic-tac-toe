var stateofBoard = {
    o1: "",
    o2: "",
    o3: "",
    w1: "",
    w2: "",
    w3: "",
    t1: "",
    t2: "",
    t3: "",
};

const lines = [
    ["o1", "o2", "o3"],
    ["w1", "w2", "w3"],
    ["t1", "t2", "t3"],
    ["o1", "w1", "t1"],
    ["o2", "w2", "t2"],
    ["o3", "w3", "t3"],
    ["o1", "w2", "t3"],
    ["o3", "w2", "t1"],
];

const mainDiv = document.querySelector("main");

var state = [];
var prevState = [];

//the player item
var control = "";

var popCount = 0;

var isOver = false;

document.addEventListener("DOMContentLoaded", () => {
    changeControl("X");
    setZero();
});

function setZero() {
    for (keys in stateofBoard) {
        stateofBoard[keys] = "";
    }

    setFromState();
}

function setFromState() {
    for (key in stateofBoard) {
        ele = document.querySelector(`#${key}`);
        ele.children[0].textContent = "";
        ele.style.backgroundColor = "white";
    }
}

function changeControl(val) {
    control = val;
    const comment = document.querySelector(".comment");
    comment.children[0].innerHTML = `Current Turn: <span> ${control} </span> `;
}

function clickHandler(ele) {
    gameStart(ele);
}

function getChange(val) {
    if (val === "X") {
        return "O";
    } else {
        return "X";
    }
}

function evalBoard() {
    for (i = 0; i < lines.length; i++) {
        var lineArr = [];

        lines[i].forEach((box) => {
            lineArr.push(document.querySelector(`#${box}`));
        });

        lineArr = lineArr.map((box) => {
            return box.children[0].textContent;
        });

        if (
            lineArr.filter((val) => val === "X").length === 3 ||
            lineArr.filter((val) => val === "O").length === 3
        ) {
            setColor(lines[i]);
            return true;
        }
    }

    return false;
}

function setBoardItem(key, value) {
    stateofBoard[key] = value;

    if (evalBoard()) {
        //for win
        onWin(control);
    } else {
        //for draw
        if (
            Object.values(stateofBoard).filter((ele) => ele !== "").length === 9
        ) {
            onDraw();
        }
    }
}

function gameStart(ele) {
    popCount = 0;
    isOver = false;

    if (stateofBoard[ele.id].length == 0) {
        ele.children[0].textContent = control;

        prevState.push([ele.id, control]);

        setBoardItem(ele.id, control);

        if (!isOver) {
            changeControl(getChange(control));
        }
    }
}

function onWin(winner) {
    const commentSection = document.querySelector(".comment");
    const titleText = document.querySelector(".t-text");

    commentSection.children[0].innerHTML = `Player: <span> ${winner} </span> Won :) `;
    titleText.innerHTML = `Game Over!!`;

    commentSection.children[0].style.fontSize = "3rem";
    titleText.style.fontSize = "2rem";

    isOver = true;
    popCount = 1;

    mainDiv.style.pointerEvents = "none";
}

function onDraw() {
    const commentSection = document.querySelector(".comment");
    const titleText = document.querySelector(".t-text");

    commentSection.children[0].innerHTML = `Draw :( `;
    titleText.innerHTML = `Game Over!!`;

    commentSection.children[0].style.fontSize = "2rem";
    titleText.style.fontSize = "2rem";

    isOver = true;
    popCount = 1;

    mainDiv.style.pointerEvents = "none";
}

function gameReset() {
    const commentSection = document.querySelector(".comment");
    const titleText = document.querySelector(".t-text");

    commentSection.children[0].style = "";
    titleText.style = "";

    commentSection.children[0].innerHTML = `Current Turn: <span> ${control} </span> `;
    titleText.innerHTML = "Tic Tac Toe";

    setZero();
    changeControl("X");

    mainDiv.style.pointerEvents = "";
}

function onUndo() {
    if (popCount === 0) {
        const current = prevState.pop();
        const box = document.querySelector(`#${current[0]}`);
        const commentSection = document.querySelector(".comment");

        box.children[0].innerHTML = "";
        stateofBoard[current[0]] = "";

        popCount += 1;

        control = current[1];
        commentSection.children[0].innerHTML = `Current Turn: <span> ${control} </span> `;
    }
}

function setColor(eleArr) {
    eleArr.forEach((ele) => {
        const selector = document.querySelector(`#${ele}`);
        selector.style.backgroundColor = "rgb(41, 171, 135)";
    });
}
