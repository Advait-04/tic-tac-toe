regex = /[\n\r]+|[\s]{2,}/g;

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

//the player item
var control = "X";

document.addEventListener("DOMContentLoaded", () => {
    console.log("hello");
    setZero();
});

function setZero() {
    for (keys in stateofBoard) {
        stateofBoard[keys] = "";
    }

    setBoard();
}

function setBoard() {}
