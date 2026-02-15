'use strict'

function renderBoard(board) {
    let strHTML = ''

    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const cellId = `cell-${i}-${j}`

            // const cellClass = (cell.isMine)? 'cell mine' : `cell ${cell.minesAroundCount}`
            const cellClass = 'cell'
            strHTML += `<td 
                            id="${cellId}" 
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