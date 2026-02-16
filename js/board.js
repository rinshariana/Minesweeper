'use strict'

function buildBoard() {
    const board = []

    for (var i = 0; i < gLevel.HEIGHT; i++) {
        board.push([])

        for (var j = 0; j < gLevel.WIDTH; j++) {
            board[i][j] = createCellObj(false)
        }
    }
    return board
}

function createCellObj(mine = false) {
    const cell = {
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false
    }
    if (mine) cell.isMine = true
    return cell
}

function placeMines(board, firstClick) {

    let placed = 0
    while (placed < gLevel.MINES) {

        const i = getRandomInt(0, board.length)
        const j = getRandomInt(0, board[0].length)
        const cell = board[i][j]

        // exclude the first clicked cell and first degree neighbors
        if (i <= firstClick.i + 1 && i >= firstClick.i - 1
            && j <= firstClick.j + 1 && j >= firstClick.j - 1) continue

        // exclude mines
        if (cell.isMine) continue

        cell.isMine = true

        countAroundMine(board, {i, j})
        placed++
    }
}

function countAroundMine(board, cellPos) {

    for (let i = cellPos.i - 1; i <= cellPos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (let j = cellPos.j - 1; j <= cellPos.j + 1; j++) {

            if (j < 0 || j >= board[0].length) continue
            if (i === cellPos.i && j === cellPos.j) continue

            board[i][j].minesAroundCount++
        }
    }
}