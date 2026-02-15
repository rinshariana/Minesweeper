'use strict'

const gGame = {
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

    // out of bounds
    if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length) return

    // cell is already revealed
    const cell = gBoard[i][j]
    if (cell.isRevealed) return

    // update cell object
    cell.isRevealed = true

    // update DOM
    renderRevealedCell(elCell, cell)

    // cell is mine
    if (cell.isMine) return onGameOver()

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

    const cell = gBoard[i][j]
    if (cell.isRevealed) return

    cell.isMarked = (cell.isMarked) ? false : true
    toggleMarkCell(elCell, cell)
}

function onGameOver() {
    console.log('Game over')
}


// function expandReveal(elCell, i, j) {
//     if (i < 0 || i > gBoard.length || j < 0 || j > gBoard[0].length) return
//     const cell = gBoard[i][j]
//     cell.isRevealed = true
//     renderRevealedCell(elCell, cell)
//     if (!cell.isMine && cell.minesAroundCount > 0) return

//     for (let k = i - 1; k <= i + 1; k++) {
//         for (let l = j - 1; l <= j + 1; l++) {
//             const currCelCell = document.getElementById(`cell-${k}-${l}`)
//             onCellClick(currCelCell, k, l)
//         }
//     }
// }