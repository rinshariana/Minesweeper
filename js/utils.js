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