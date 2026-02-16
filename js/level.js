'use strict'

const gLevel = {
    HEIGHT: 9,
    WIDTH: 9,
    MINES: 10,
    get NEED_REVEALED() { 
        return this.HEIGHT * this.WIDTH - this.MINES 
    }
}
