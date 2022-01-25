'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '🤯';
const CHEERY = '🤩'


var gBoard;
var gGame = {
    foodOnBoard: 0,
    score: 0,
    isOn: false
};
var gCerryIntervalId;

function init() {
    // console.log('Hello')
    document.querySelector('.renew').style.display = 'none'
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gCerryIntervalId = setInterval(addCherry, 15000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            } else if ((i === 1 && j === 1) || (i === 1 && j === 8) ||
                (i === 8 && j === 1) || (i === 8 && j === 8)) {
                board[i][j] = SUPER_FOOD;
            } else {
                board[i][j] = FOOD;
                gGame.foodOnBoard++
            }
        };
    };
    return board;
};

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCerryIntervalId);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    document.querySelector('.renew').style.display = 'block';
}

function checkVictory() {
    console.log(gGame.foodOnBoard);
    if (gGame.foodOnBoard === 0) {
        document.querySelector('.victory').style.display = 'block';
        gameOver()
    };
};

function resetGame() {
    gGame = getDefaultGameObj()
    init()
    // gBoard = buildBoard();
    // createPacman(gBoard);
    // createGhosts(gBoard);
    // printMat(gBoard, '.board-container');
    // gGame.isOn = true;
};

function addCherry() {
    var emptyLocations = getEmptyCells(gBoard);
    if (!emptyLocations.length) return
    var idx = getRandomIntInclusive(0, emptyLocations.length - 1);
    var currCell = emptyLocations[idx];
    gBoard[currCell.i][currCell.j] = CHEERY;
    renderCell(currCell, CHEERY);
    console.log('emptyLocations for cherry', emptyLocations);
}

function getEmptyCells(board) {
    var emptyLocations = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            if (currCell === EMPTY) {
                var location = {
                    i: i,
                    j: j
                }
                emptyLocations.push(location);
            }
        }
    }
    return emptyLocations
}


// console.log(foodOnBoard());
// function foodOnBoard() {
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard[0].length; j++) {
//             if (!gBoard[i][j] === FOOD) continue
//             gGame[foodOnBoard];
//             gGame.foodOnBoard++
//         }
//     }
// }