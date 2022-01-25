'use strict'
var PACMAN = '😷';
const PACMAN_RIGHT = '<img src="img/pacman-right.png">'
const PACMAN_LEFT = '<img src="img/pacman-left.png">'
const PACMAN_DOWN = '<img src="img/pacman-down.png">'
const PACMAN_UP = '<img src="img/pacman-up.png">'

var gTimeOut;
var gPacman;
var gIntervalGhosts;
var gKilledGhosts = [];
console.log('dead', gKilledGhosts);

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodOnBoard--
}

function movePacman(ev) {
    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev)
    if (nextLocation === null) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation);
            gBoard[nextLocation.i][nextLocation.j] = EMPTY;
            renderCell(nextLocation, EMPTY)
        } else {
            gameOver();
            return
        }
    }
    if (nextCell === CHEERY) {
        updateScore(10);
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodOnBoard--
        checkVictory();
    }
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true;
        setTimeout(() => {
            gPacman.isSuper = false;
            resetGhost()
        }, 5000)
    };
    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            PACMAN = PACMAN_UP
            break;
        case 'ArrowDown':
            nextLocation.i++
            PACMAN = PACMAN_DOWN
            break;
        case 'ArrowLeft':
            nextLocation.j--
            PACMAN = PACMAN_LEFT
            break;
        case 'ArrowRight':
            nextLocation.j++
            PACMAN = PACMAN_RIGHT
            break;
        default: return null
    }
    return nextLocation;
}



