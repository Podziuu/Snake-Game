import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRender = 0;
let gameOver = false;
const gameBoard = document.querySelector('.game-board')

function main(currentTime) {
    if(gameOver) {
        if(confirm('You lose. Press ok to restart')) {
            window.location = '/Snake-Game'
        }
        return;
    }

    window.requestAnimationFrame(main)
    let secondsSinceLastRender = (currentTime - lastRender) / 1000;
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return


    lastRender = currentTime

    update();
    draw();
    console.log(snakeIntersection());
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}