import { expandSnake, onSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomPosition();
const EXSPANSION_RATE = 5;

export function update() {
    if(onSnake(food)) {
        expandSnake(EXSPANSION_RATE);
        food = getRandomPosition();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    gameBoard.appendChild(foodElement);
}

function getRandomPosition() {
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}