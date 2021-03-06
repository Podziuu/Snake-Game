import { getInputDirection } from "./input.js";

let newSegments = 0;

export const SNAKE_SPEED = 5;
const snakeBody = [
    { x: 11, y: 11},
]

export function update() {
    addSegments()
    newSegments = 0;
    const inputDirection = getInputDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        gameBoard.appendChild(snakeElement);
    })
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false
        return isEqual(segment, position);
    })
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function isEqual(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for(let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length -1 ] })
    }
}

export function getSnakeHead() {
    return snakeBody[0];
}