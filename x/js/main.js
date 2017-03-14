// this was originally a breakout game, lol: http://breakout.enclavegames.com/
// I will most likely remove any references to this in the future, as the code becomes rewritten entirely
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
var height = window.innerHeight
var width = window.innerWidth
var isRunning = true
var wordPadding
var lineSpeed = height*0.0002
var lineCount = 20
// var lineHeight = Math.floor(height * 0.05)
var lineHeight = 32
var linePadding = lineHeight * 0.5
var lineOffsetTop = height * 0.1
if (width < 1050) {
    var lineOffsetLeft = 16
} else {
    lineOffsetLeft = width*0.3
}
// will keep track of the word that is currently the first one that is shown
var firstWord

// tfw when you realize js doesn't support modules yet
var level1 = 'Death is not real.'
level1Line = level1.split(' ')

var wordsInRow = level1Line.length

var words = []
for(l=0; l<lineCount; l++) {
    words[l] = []
    for (w=0; w<wordsInRow; w++) {
        words[l][w] = { x: 0, y: 0, status: 1 }
    }
}

function drawText(text, x, y, size, color) {
    ctx.font = size+"px Open Sans"
    ctx.fillStyle = "#"+color
    ctx.fillText(text, x, y)
}


function drawLines() {
    var currentWordsInRow = 0
    var currentRow = 0
    firstWord = false
    // draw words!
    for (l=0; l<lineCount; l++) {
        wordPadding = 0
        for (w=0; w<wordsInRow; w++) {
            ctx.font = lineHeight+"px Open Sans"
            if (w > 0) {
                wordPadding += ctx.measureText(level1Line[w-1]+" ").width
            }
            if(words[l][w].status == 1) {
                // this allows us to check whether the first existing word is touching the upper bound, thus
                // triggering some event
                if (firstWord == false) {
                    firstWord = [l,w]
                }
                var wordX = wordPadding+lineOffsetLeft
                var lineY = (currentRow*(lineHeight+linePadding))+lineOffsetTop
                words[l][w].x = wordX
                words[l][w].y = lineY
                drawText(level1Line[w], wordX, lineY, lineHeight, "000000")
            }
            if (currentWordsInRow < wordsInRow-1) {
                currentWordsInRow++
            } else {
                currentRow += 1
                currentWordsInRow = 0
            }
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.canvas.width = width
    ctx.canvas.height = width*1.3
    drawLines()
    // once the last block is done the next is not defined
    if (firstWord[0] == lineCount-1 && firstWord[1] == wordsInRow-1) {
        drawText('You Won!', 150, 150, 48, "dd2bda")
    } else if (words[firstWord[0]][firstWord[1]].y < 0) {
        drawText('You Lost!!!!!!', 150, 150, "dd2bda")
    } else {
        lineOffsetTop -= lineSpeed
    }
    myReq = requestAnimationFrame(draw)
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
        cancelAnimationFrame(myReq)
        openMenu()
    } else {
        requestAnimationFrame(draw)
    }
    isRunning = !isRunning

}
function clickX() {
    if( firstWord[0] < lineCount && firstWord[1] < wordsInRow && isRunning == true ) {
        words[firstWord[0]][firstWord[1]].status = 0
    }
}

menuButton.addEventListener('click', clickMenu, false)
XButton.addEventListener('click', clickX, false)

draw()
drawMenu()