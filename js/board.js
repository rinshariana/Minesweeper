'use strict'

const SAFE = 'SAFE'
const MINE = 'MINE'

function buildBoard() {

    const height = gLevel.HEIGHT
    const width = gLevel.WIDTH
    const mines = gLevel.MINES

    const board = []
    // only for debug: remove later
    const boardMap = []

    const boardContent = [...Array(height * width - mines).fill(SAFE), ...Array(mines).fill(MINE)]
    console.log(boardContent)

    for (var i = 0; i < height; i++) {

        board.push([])
        boardMap.push([])

        for (var j = 0; j < width; j++) {

            const randIdx = getRandomInt(0, boardContent.length)
            boardMap[i][j] = boardContent.splice(randIdx, 1)[0]

            if (boardMap[i][j] === SAFE) board[i][j] = createCellObj()
            else {
                board[i][j] = createCellObj(true)
            }
        }
    }

    countMinesAround(board)

    console.table(boardMap)
    console.table(board)
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

function countMinesAround(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j];
            if (!cell.isMine) continue
            minesNeigbCount(board, { i, j })
        }
    }
}

function minesNeigbCount(board, cellPos) {

    for (let i = cellPos.i - 1; i <= cellPos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (let j = cellPos.j - 1; j <= cellPos.j + 1; j++) {

            if (j < 0 || j >= board[0].length) continue
            if (i === cellPos.i && j === cellPos.j) continue

            board[i][j].minesAroundCount++
        }
    }
}