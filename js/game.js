'use strict'

const gGame = {
    isFirstClick: true,
    isOn: false,
    reveledCount: 0,
    markedCount: 0,
    secsPassed: 0,
    gameIntervalId: null,
    liveCount: 3,
    maxLives: 3
}

let gLevel = {
    HEIGHT: 9,
    WIDTH: 9,
    MINES: 10,
    NAME: 'EASY'
}

const levelsMap = {
    EASY: {
        HEIGHT: 9,
        WIDTH: 9,
        MINES: 10
    },
    NORMAL: {
        HEIGHT: 16,
        WIDTH: 16,
        MINES: 40
    },
    HARD: {
        HEIGHT: 16,
        WIDTH: 30,
        MINES: 99
    },
}

let gBoard
let gLivesTimeouts = []

function init() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    renderMinesCount()
    renderSecPassed(gGame.secsPassed)
    renderLiveCount()
    renderEmojiBtn(gEmojiMap.NEW_GAME)

    // close popup if needed
    onCloseBtnClick()
}

function startGame(firstClick) {
    gGame.isOn = true
    placeMines(gBoard, firstClick)
    gGame.gameIntervalId = startStopWatch()
}

function onCellClick(elCell, i, j) {
    // first click
    if (gGame.isFirstClick) {
        gGame.isFirstClick = false
        startGame({ i, j })
    }
    // check game is running
    if (!gGame.isOn) return

    // out of bounds
    if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length) return

    // cell is already revealed
    const cell = gBoard[i][j]
    if (cell.isRevealed) return

    if (cell.isMarked) {
        cell.isMarked = false
        updateMarkedCount(cell.isMarked)
        renderMinesCount()
    }
    cell.isRevealed = true
    // update DOM
    renderRevealedCell(elCell, cell)

    // cell is mine
    if (cell.isMine) {
        if (gGame.liveCount > 1) removeLife(elCell, cell)
        else onGameOver()
        renderLiveCount()
        return
    }
    gGame.reveledCount++
    // victory check
    if (isVictory()) {
        onVictory()
        return
    }
    // cell is number > 0
    if (cell.minesAroundCount > 0) return

    // if cell is empty (minesAroundCount === 0) make recursion call to expand reveal
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {

            const currCelCell = document.querySelector(`.cell-${k}-${l}`)
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

    // update DOM
    cell.isMarked = (cell.isMarked) ? false : true
    updateMarkedCount(cell.isMarked)
    toggleMarkCell(elCell, cell)
    renderMinesCount()

    if (isVictory()) onVictory()
}

function removeLife(elCell, cell) {
    if (gGame.liveCount <= 1) return
    gGame.liveCount--
    renderRevealedCell(elCell, cell)
    renderEmojiBtn(gEmojiMap.INJURED)

    const setTimeoutId = setTimeout(() => {
        cell.isRevealed = false
        elCell.innerText = ''
        elCell.classList.remove('revealed', 'mine')
        renderEmojiBtn(gEmojiMap.NEW_GAME)
    }, 1500)

    gLivesTimeouts.push(setTimeoutId)
}

function onGameOver() {
    gGame.liveCount--
    gGame.isOn = false
    const msg = constructMessage(false)

    clearInterval(gGame.gameIntervalId)
    clearAllLivesTimeouts()
    renderAllMines(gBoard)
    renderEmojiBtn(gEmojiMap.GAME_OVER)
    renderPopUp(msg)
}

function onVictory() {
    gGame.isOn = false
    const msg = constructMessage(true)
    clearInterval(gGame.gameIntervalId)
    renderEmojiBtn(gEmojiMap.VICTORY)
    renderPopUp(msg)
}

function startStopWatch() {
    const gameIntervalId = setInterval(() => {
        gGame.secsPassed++
        renderSecPassed(gGame.secsPassed)
    }, 1000)
    return gameIntervalId
}

function onSetLevel(levelName) {
    gLevel = {
        ...levelsMap[levelName],
        NAME: levelName
    }
    onNewGameClick()
}

function checkHighScore() {
    const highScore = localStorage.getItem(`highScore${gLevel.NAME}`)
    const currScore = gGame.secsPassed
    if (currScore < highScore || !highScore) {
        localStorage.setItem(`highScore${gLevel.NAME}`, currScore)
        return null
    }
    return highScore
}
