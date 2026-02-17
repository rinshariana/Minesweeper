'use strict'

function renderBoard(board) {
    let strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cellClass = `cell-${i}-${j}`
            strHTML += `<td 
                            class="${cellClass}" 
                            onclick="onCellClick(this, ${i}, ${j})"
                            oncontextmenu="onCellRightClick(event, this, ${i}, ${j})"
                        ></td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board-container tbody')
    elContainer.innerHTML = strHTML
}

function renderRevealedCell(elCell, cell) {
    if (!cell.isRevealed) return
    elCell.classList.add('revealed')

    if (cell.isMine) {
        elCell.innerText = '💣'
        elCell.classList.add('mine')

    } else if (cell.minesAroundCount > 0) {
        elCell.innerText = cell.minesAroundCount
    }
}

function toggleMarkCell(elCell, cell) {
    if (cell.isRevealed) return
    if (cell.isMarked) elCell.innerText = '🚩'
    else elCell.innerText = ''
}

function renderAllMines(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j];
            if (cell.isMine) {
                const elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.innerText = '💣'
            }
        }
    }
}

function renderSecPassed(secPassed) {
    const elStopWatch = document.querySelector('.stopwatch')
    elStopWatch.innerText = String(secPassed).padStart(3, '0')
}

function renderLevelInfo() {
    const minesNum = gLevel.MINES
    const elMinesNum = document.querySelector('.mines-num')
    elMinesNum.innerText = String(minesNum).padStart(3, '0')
}

function renderLiveCount() { 
    const elLivesCount = document.querySelector('.live-count')
    elLivesCount.innerText = gGame.liveCount
}