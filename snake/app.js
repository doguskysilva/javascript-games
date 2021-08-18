const BOARD_HEIGTH = 500
const BOARD_WIDTH = 500
const SIZE_SQUARE = 20
const MAX_POSITION = (BOARD_WIDTH / SIZE_SQUARE) - 1

let canvas = document.querySelector('#game')
let ctx = canvas.getContext('2d')
let runningGame = true
let intervalGame = null

let score = 0

let headSnake = {
    x: 0,
    y: 0
}

let tailSnake = [
    { x: 240, y: 260 },
    { x: 240, y: 280 },
]

let playerDirection = 'ArrowUp'

let apple = {
    x: 0,
    y: 0
}

function clear() {
    ctx.clearRect(0, 0, BOARD_HEIGTH, BOARD_WIDTH)
}

function drawSquare(axisX = 0, axisY = 0, color = 'green') {
    ctx.fillStyle = color;
    ctx.fillRect(axisX, axisY, SIZE_SQUARE, SIZE_SQUARE)
}

function randomAppleCoordinates() {
    rnd = Math.floor(Math.random() * (MAX_POSITION - 0)) + 0;
    return rnd * SIZE_SQUARE
}

function isSameCell(object1 = {x:0, y:0}, object2 = {x:0, y:0}) {
    return object1.x == object2.x && object1.y == object2.y
}

function crashGame() {
    let isWall = (
        headSnake.x < 0 ||
        headSnake.x > BOARD_WIDTH - SIZE_SQUARE ||
        headSnake.y < 0 ||
        headSnake.y > BOARD_HEIGTH - SIZE_SQUARE
    )

    let isTailSnake = false

    for (const tail of tailSnake.slice(0, -1)) {
        if (isSameCell(tail, headSnake)) {
            console.log('Verificando colisao', tail, headSnake, tailSnake)
            isTailSnake = true
            break
        }
    }

    return isWall || isTailSnake
}

function drawSnake() {
    drawSquare(headSnake.x, headSnake.y)
    for (let i = 0; i < tailSnake.length; i++) {
        drawSquare(tailSnake[i].x, tailSnake[i].y)
    }
}

function drawApple(newPosition = false) {
    if (newPosition) {
        let isFreePosition = false

        while (!isFreePosition) {
            apple.x = randomAppleCoordinates()
            apple.y = randomAppleCoordinates()

            for (const tail of [headSnake, ...tailSnake]) {
                isFreePosition = !isSameCell(tail, apple)
                if(isFreePosition == false) {
                    console.log('Area ocupada, nem adianta prosseguir', apple, tail)
                    break
                }
            }
        }
    }

    drawSquare(apple.x, apple.y, 'red')
}

function moveSnake() {
    tailSnake.unshift({x: headSnake.x, y: headSnake.y})
    tailSnake.pop()

    switch (playerDirection) {
        case 'ArrowUp':
            headSnake.y -= SIZE_SQUARE
            break;
        case 'ArrowDown':
            headSnake.y += SIZE_SQUARE
            break;
        case 'ArrowLeft':
            headSnake.x -= SIZE_SQUARE
            break;
        case 'ArrowRight':
            headSnake.x += SIZE_SQUARE
            break;
    }

    drawSnake()
}


function gameOver() {
    runningGame = false
    stop()
    console.log('Game Over')
}

function stop() {
    clearInterval(intervalGame)
}

function start() {
    headSnake.x = 240
    headSnake.y = 240

    apple.x = 240
    apple.y = SIZE_SQUARE * 2

    intervalGame = setInterval(updateScreen, 200)
}

function updateScreen() {
    if (isSameCell(headSnake, apple)) {
        score += 1
        tailSnake.push({x: apple.x, y: apple.y})
        drawApple(true)
    }

    if (crashGame()) {
        gameOver()
    }

    if (runningGame) {
        clear()
        moveSnake()
        drawApple()
    }

}

window.addEventListener("keydown", (ev) => {
    if (ev.key == 'ArrowUp' && playerDirection != 'ArrowDown') {
        playerDirection = ev.key
    }

    if (ev.key == 'ArrowDown' && playerDirection != 'ArrowUp') {
        playerDirection = ev.key
    }

    if (ev.key == 'ArrowLeft' && playerDirection != 'ArrowRight') {
        playerDirection = ev.key
    }

    if (ev.key == 'ArrowRight' && playerDirection != 'ArrowLeft') {
        playerDirection = ev.key
    }
})

start()