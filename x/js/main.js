var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
var height = window.innerHeight
var width = window.innerWidth
ctx.canvas.width = width
ctx.canvas.height = width*1.3
var isRunning = true

var wordPadding
var lineSpeed = height*0.0001
// var lineCount = 3
var lineCount
if (width < 1050) {
    var lineHeight = 32
    var lineOffsetLeft = 16
} else {
    lineHeight = 64
    lineOffsetLeft = width*0.3
    }
var linePadding = lineHeight * 0.5
var lineOffsetTop = lineHeight * 1.5

// will keep track of the word that is currently the first one that is shown
var firstWord
var lastWordL = 0
var lastWordW = 0

var words
var wordsInRow

// tfw when you realize js doesn't support modules yet
// [text, max_lines, max_time]
var l0 = ['RAPIDLY'.split(' '), 1 ]
var l1 = ['PRESS'.split(' '), 1 ]
var l2 = ['X'.split(' '), 1 ]
var l3 = ['TO'.split(' '), 1 ]
var l4 = ['REFUSE'.split(' '), 1 ]
var l5 = ['TO'.split(' '), 1 ]
var l6 = ['COME'.split(' '), 1 ]
var l7 = ['TO'.split(' '), 1 ]
var l8 = ['TERMS'.split(' '), 1 ]
var l9 = ['WITH'.split(' '), 1 ]
var l10 = ['YOUR'.split(' '), 1 ]
var l11 = ['OWN'.split(' '), 1 ]
var l12 = ['MORTALITY'.split(' '), 1 ]
var l16 = ['Death is not real.'.split(' '), 1]
var l17 = ['Death is not real.'.split(' '), 1]
var l18 = ['Death is not real.'.split(' '), 1]
var l19 = ['Death is not real.'.split(' '), 2, 5]
var l14 = ['Death is not real.'.split(' '), 1]

// var gameLevels = [l12, l1, l2, l16, l17, l18, l19, l17]
var gameLevels = [l0, l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l14, l19]
// var gameLevels = [l19]
// var gameLevels = [l0, l19]
// var gameLevels = [l19, l7]
var numLevels = gameLevels.length
var currentLevelNum = 0
var currentLevel = gameLevels[currentLevelNum]
var timeAtLevelStart

function drawText(text, x, y, size, color) {
    ctx.font = size+"px Open Sans"
    ctx.fillStyle = "#"+color
    ctx.fillText(text, x, y)
}

// creates a matrix of level's words to align them later and check if they need to be shown
function createLevelsWords() {
    words = []
    wordsInRow = currentLevel[0].length
    lineCount = currentLevel[1]
    for(l=0; l<lineCount; l++) {
        words[l] = []
        for (w=0; w<wordsInRow; w++) {
            words[l][w] = { x: 0, y: 0, status: 1 }
        }
    }
}

function drawLevel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    var currentWordsInRow = 0
    var currentRow = 0
    firstWord = false
    // draw words!
    for (l=0; l<lineCount; l++) {
        wordPadding = 0
        for (w = 0; w < wordsInRow; w++) {
            ctx.font = lineHeight + "px Open Sans"
            if (w > 0) {
                wordPadding += ctx.measureText(currentLevel[0][w - 1] + " ").width
            }
            if (words[l][w].status == 1) {
                if (wordsInRow == 1) {
                    ctx.textAlign = "center"
                    var wordX = width/2
                    var lineY = (currentRow * (lineHeight + linePadding)) + lineOffsetTop
                } else {
                    ctx.textAlign = "left"
                    wordX = wordPadding + lineOffsetLeft
                    lineY = (currentRow * (lineHeight + linePadding)) + lineOffsetTop
                }
                // this allows us to check whether the first existing word is touching the upper bound, thus
                // triggering some event
                if (firstWord == false) {
                    firstWord = [l, w]
                    words[l][w].x = wordX
                    words[l][w].y = lineY
                }
                drawText(currentLevel[0][w], wordX, lineY, lineHeight, "000000")
            } else if (l == lastWordL && w == lastWordW) {
            }
            if (currentWordsInRow < wordsInRow - 1) {
                currentWordsInRow++
            } else {
                currentRow += 1
                currentWordsInRow = 0
            }
        }
    }
    if (words[lineCount-1][wordsInRow-1].status == 0) {
        drawText('You Won!', 150, 150, 48, "dd2bda")
        startNextLevel()
        }
    // if the level consists of several lines
    else if (currentLevel[1] > 1 && isRunning == true) {
        if (Date.now()-timeAtLevelStart < currentLevel[2]*1000) {
            lineOffsetTop -= lineSpeed
            drawText(Date.now(), 50, 250, 48, "dd2bda")
        } else {
            startNextLevel()
        }
    }

    requestAnimationFrame(function() {
        drawLevel()
    })
}

function startNextLevel() {
    currentLevelNum += 1
    if (currentLevelNum < numLevels) {
        currentLevel = gameLevels[currentLevelNum]
        runLevel(currentLevel)
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawText('That\'s it!', 50, 150, 32, "0d2bda")
        // break
    }
}

function runLevel() {
    createLevelsWords()

    if (wordsInRow == 1) {
        if (width < 1050) {
            lineHeight = 64
            lineOffsetLeft = 32
        } else {
            lineHeight = 128
            lineOffsetLeft = width*0.3
        }
        linePadding = lineHeight * 0.5
        lineOffsetTop = lineHeight * 1.5
    } else {
        if (width < 1050) {
            lineHeight = 32
            lineOffsetLeft = 16
        } else {
            lineHeight = 64
            lineOffsetLeft = width * 0.3
        }
        linePadding = lineHeight * 0.5
        lineOffsetTop = lineHeight * 1.5
    }
    timeAtLevelStart = Date.now()
    drawLevel()
}

//
// drawing the buttons
//
var menuButton = document.getElementById('menuButton')
var YButton = document.getElementById("YButton")
var XButton = document.getElementById("XButton")

function drawMenu() {
    menuButton.style.position = "absolute"
    menuButton.style.top = height*0.14+'px'
    // buttons closer to center on large screens
    if (width < 1050) {
        menuButton.style.left = width * 0.10 + 'px'
    } else {
        menuButton.style.left = width * 0.3 + 'px'
    }
    menuButton.style.width = height*0.16+'px'
    menuButton.style.height = height*0.07+'px'
    menuButton.style.borderRadius = height*0.04+'px'
    menuButton.style.fontSize = height*0.04+'px'

    // height is already at 0.7
    YButton.style.position = "absolute"
    YButton.style.top = height*0.08+'px'
    if (width < 1050) {
        YButton.style.left = width * 0.75 + 'px'
    } else {
        YButton.style.left = width * 0.6 + 'px'
    }
    YButton.style.width = height*0.08+'px'
    YButton.style.height = height*0.08+'px'
    YButton.style.borderRadius = height*0.04+'px'
    YButton.style.fontSize = height*0.065+'px'

    XButton.style.position = "absolute"
    XButton.style.top = height*0.13+'px'
    if (width < 1050) {
        XButton.style.left = width*0.55+'px'
    } else {
        XButton.style.left = width*0.6-125+'px'
    }
    XButton.style.width = height*0.08+'px'
    XButton.style.height = height*0.08+'px'
    XButton.style.borderRadius = height*0.04+'px'
    XButton.style.fontSize = height*0.065+'px'
}

function openMenu() {

}
function clickMenu() {
    if (isRunning == true) {
        timeAtPause = Date.now()
        openMenu()
    } else {
        timeAtLevelStart += (Date.now() - timeAtPause)
    }
    isRunning = !isRunning

}
function clickX() {
    if( firstWord[0] < lineCount && firstWord[1] < wordsInRow && isRunning == true ) {
        lastWordL = firstWord[0]
        lastWordW = firstWord[1]
        words[lastWordL][lastWordW].status = 0
    }
}

menuButton.addEventListener('click', clickMenu, false)
XButton.addEventListener('click', clickX, false)

drawMenu()
runLevel()
