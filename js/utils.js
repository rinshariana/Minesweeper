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