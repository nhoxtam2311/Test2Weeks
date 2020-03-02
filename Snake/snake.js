let snake = [
    { x: random(0, 100), y: random(0, 100)}
];
let x = 10;
let y = 0;
var app = document.getElementById('snake');
var ctx = app.getContext('2d');
let foodX;
let foodY;

function snakePart(snake) {
    ctx.fillStyle = 'red';
    ctx.fillRect(snake.x, snake.y, 10, 10);
}

function showSnake(snake) {
    snake.forEach(snakePart);
}

background();
showSnake(snake);

function nextState() {
    const head = { x: snake[0].x + x, y: snake[0].y + y };
    console.log(head);
    snake.unshift(head);
    gamePlay();
    if (eatFood()) {
        headSnake = { x: foodX, y: foodY };
        snake.unshift(headSnake);
        createFood();
        displayFood();
    } else {
        snake.pop();
    }
}

function background() {
    ctx.fillStyle = "rgb(025, 225, 201)";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, app.width, app.height);
    ctx.strokeRect(0, 0, app.width, app.height);
}

function random(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function createFood() {
    foodX = random(0, 190);
    foodY = random(0, 190);
    for (let i = 0; i < snake.length; i++) {
        if (foodX === snake[i].x || foodY === snake[i].y) {
            createFood();
        }
    }
};

function displayFood() {
    ctx.fillStyle = "blue";
    ctx.fillRect(foodX, foodY, 10, 10);
}

createFood();
displayFood();

function eatFood() {
    if (snake[0].x === foodX && snake[0].y === foodY) {
        return true;
    }
    else {
        return false;
    }
}

document.addEventListener("keydown", keyDown)

function keyDown(e) {
    const keyCode = e.keyCode;
    switch (keyCode) {
        case 38:
            x = 0;
            y = -10;
            break;
        case 40:
            x = 0;
            y = 10;
            break;
        case 39:
            x = 10;
            y = 0;
            break;
        case 37:
            x = -10;
            y = 0;
            break;
    }
}

function play() {
        setTimeout(function start() {
            background();
            nextState();
            displayFood();
            showSnake(snake);
            play()
        },500);    
}

function gamePlay() {
    if (snake[0].x < 0) {
        snake[0].x = app.width -10;
    }
    if (snake[0].x > app.width - 10) {
        snake[0].x = 0;
    }
    if (snake[0].y < 0) {
        snake[0].y = app.height - 10;
    }
    if (snake[0].y > app.height - 10) {
        snake[0].y = 0;
    }
}

