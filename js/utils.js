'use strict'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function updateMarkedCount(isMarked) {
    if (isMarked) gGame.markedCount++
    else gGame.markedCount--
}

function clearAllLivesTimeouts() {
    for (let i = 0; i < gLivesTimeouts.length; i++) {
        clearTimeout(gLivesTimeouts[i])
    }
    gLivesTimeouts = []
}

function clearGameObj() {
    gGame.isFirstClick = true
    gGame.isOn = false
    gGame.reveledCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.gameIntervalId = null
    gGame.liveCount = 3
}

function constructMessage(victory) {
    let str = ''
    if (!victory) {
        str = 'Oops...Maybe next time\nyou will have more luck.'
        return str
    }
    const highScore = checkHighScore()
    str = `Congratulations! You just found\nall mines in ${gGame.secsPassed} seconds.`
    if (!highScore) str += `\nNew high score! - ${gGame.secsPassed}.`
    else str += `\nHigh score - ${highScore}.`

    return str
}

function isVictory() {
    return gGame.reveledCount + gGame.markedCount === gLevel.HEIGHT * gLevel.WIDTH
}