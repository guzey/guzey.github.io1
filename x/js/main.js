// this was originally a breakout game, lol: http://breakout.enclavegames.com/
// I will most likely remove any references to this in the future, as the code becomes rewritten entirely
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
var height = window.innerHeight
var width = window.innerWidth
var isRunning = true
var brickCount = 300
var brickWidth = 15
var brickHeight = 25
var brickPadding = 10
var brickOffsetTop = 30
var OffsetOfTopBrick = brickOffsetTop
var lineSpeed = 0.2
var brickOffsetLeft = 30
var bricks = []
var currentBrick = 0
var firstBrick
for(i=0; i<brickCount; i++) {
    bricks[i] = { x: 0, y: 0, status: 1 }
}
function drawBricks() {
    var bricksInRow = 0
    var currentRow = 0
    firstBrick = false
    for(i=0; i<brickCount; i++) {
        if(bricks[i].status == 1) {
            if (firstBrick == false) {
                firstBrick = i
            }
            var brickX = (bricksInRow*(brickWidth+brickPadding))+brickOffsetLeft
            var brickY = (currentRow*(brickHeight+brickPadding))+brickOffsetTop
            bricks[i].x = brickX
            bricks[i].y = brickY
            ctx.beginPath()
            ctx.rect(brickX, brickY, brickWidth, brickHeight)
            ctx.fillStyle = "#0095DD"
            ctx.fill()
            ctx.closePath()
        }
        if (bricksInRow < 4) {
            bricksInRow++
        } else {
            currentRow += 1
            bricksInRow = 0
        }
    }
}
function drawText(text) {
    ctx.font = "48px Open Sans"
    ctx.fillStyle = "#dd2bda"
    ctx.fillText(text, 200, 100)
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.canvas.width = width
    ctx.canvas.height = width*1.3
    drawBricks()
    if (currentBrick == brickCount) {
        drawText('You Won!')
    } else if (bricks[firstBrick].y < 0) {
        drawText('You Lost!!!!!!')
    } else {
        brickOffsetTop -= lineSpeed
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
    if( currentBrick < brickCount && isRunning == true ) {
        bricks[currentBrick].status = 0
        currentBrick++
    }
}

menuButton.addEventListener('click', clickMenu, false)
XButton.addEventListener('click', clickX, false)

draw()
drawMenu()