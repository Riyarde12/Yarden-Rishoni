'use strict'
const GHOST = '👻';
var gGhosts;
var gIntervalGhosts;
const GHOST_WEAK = '🥶'
// console.log('ghost')

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
        // to do: get random color
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver();
        }
        return
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j,
    }
    ghost.currCellContent = nextCell;
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? GHOST_WEAK : GHOST;
    return `<span class="ghost-color">${color}</span>`;
    // return `<span class="ghost">${GHOST}</span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function killGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (nextLocation.i === currGhost.location.i && nextLocation.j === currGhost.location.j) {
            checkCellContent(currGhost);
            gKilledGhosts.push(gGhosts.splice(i, 1)[0]);
        }
    }
}

function checkCellContent(ghost) {
    if (ghost.currCellContent === FOOD) {
        updateScore(1);
        ghost.currCellContent === EMPTY;
    } else if (ghost.currCellContent === CHEERY) {
        updateScore(10);
        ghost.currCellContent === EMPTY;
    }
}

function resetGhost() {
    gGhosts.push(...gKilledGhosts)
    gKilledGhosts = [];
}