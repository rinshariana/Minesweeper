'use strict'

const gGame = {
    isFirstClick: true,
    isOn: false,
    reveledCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoard

function init() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function onCellClick(elCell, i, j) {
    // first click
    if (gGame.isFirstClick) {
        gGame.isFirstClick = false
        startGame({i, j})
    }

    // check game is running
    if (!gGame.isOn) return

    // out of bounds
    if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length) return

    // cell is already revealed
    const cell = gBoard[i][j]
    if (cell.isRevealed) return

    // update cell and gGame obj
    cell.isRevealed = true
    gGame.reveledCount++

    // update DOM
    renderRevealedCell(elCell, cell)

    // cell is mine
    if (cell.isMine) {
        onGameOver()
        return
    }

    // victory check
    if (gGame.reveledCount === gLevel.NEED_REVEALED) {
        onVictory()
        return
    }

    // cell is number > 0
    if (cell.minesAroundCount > 0) return

    // if cell is empty (minesAroundCount === 0) make recursion call to expand reveal
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {

            const currCelCell = document.getElementById(`cell-${k}-${l}`)
            onCellClick(currCelCell, k, l)
        }
    }
}

function onCellRightClick(ev, elCell, i, j) {
    // prevent showing context menu
    ev.preventDefault()

    // check game is running
    if (!gGame.isOn) return

    // if cell is already revealed
    const cell = gBoard[i][j]
    if (cell.isRevealed) return

    // mark cell
    cell.isMarked = (cell.isMarked) ? false : true
    toggleMarkCell(elCell, cell)
}

function onGameOver() {
    gGame.isOn = false
    renderAllMines(gBoard)
}

function startGame(firstClick) {
    gGame.isOn = true
    placeMines(gBoard, firstClick)
}

function onVictory() {
    console.log('victory')
    // create modal with message
}