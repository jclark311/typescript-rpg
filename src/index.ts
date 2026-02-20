import { constants } from "./utils/constants";
const { scale, width, height } = constants;

let img = new Image();

let canvas = document.getElementById("game") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const scaledWidth = width * scale;
const scaledHeight = height * scale;

const upLoop = [0, 1, 0, 3];
const rightLoop = [4, 5, 4, 7];
const downLoop = [8, 9, 8, 11];
const leftLoop = [12, 13, 12, 15];

// Hero facing down
const cycleLoop = [upLoop, rightLoop, downLoop, leftLoop];

let currentLoopIndex = 0;
// Slow down the animation
let frameCount = 0;

const FACING_UP = 0;
const FACING_RIGHT = 1;
const FACING_DOWN = 2;
const FACING_LEFT = 3;
let currentDirection = FACING_DOWN;

let keyPresses = {
    'ArrowUp': false,
    'ArrowRight': false,
    'ArrowDown': false,
    'ArrowLeft': false,
    'w': false,
    'a': false,
    's': false,
    'd': false,
} as Record<string, boolean>;

const MOVEMENT_SPEED = 1;
let positionX = 0;
let positionY = 0;

window.addEventListener("keydown", keyDownListener, false);
function keyDownListener(e: KeyboardEvent) {
    console.log(e);
    keyPresses[e.key] = true;
}

window.addEventListener("keyup", keyUpListener, false);
function keyUpListener(e: KeyboardEvent) {
    console.log(e.key);
    keyPresses[e.key] = false;
}

function loadImage() {
    img.src = "assets/images/walk_cycle.png";
    img.onload = function() {
        window.requestAnimationFrame(gameLoop);
    }
}

function drawFrame(frameX: number, frameY: number, canvasX: number, canvasY: number) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}

loadImage();

const FRAME_LIMIT = 12;

function moveCharacter(deltaX: number, deltaY: number, direction: number) {
    if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {
        positionX += deltaX;
    }
    if (positionY + deltaY > 0 && positionY + scaledHeight + deltaY < canvas.height) {
        positionY += deltaY;
    }
    currentDirection = direction;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasMoved = false;

    if (keyPresses.w) {
        moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
        hasMoved = true;
    } else if (keyPresses.s) {
        moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
        hasMoved = true;
    }
    if (keyPresses.a) {
        moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
        hasMoved = true;
    } else if (keyPresses.d) {
        moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
        hasMoved = true;
    }

    if (hasMoved) {
        frameCount++;
        if (frameCount >= FRAME_LIMIT) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= cycleLoop.length) {
                currentLoopIndex = 0;
            }
        }
    }

    drawFrame(cycleLoop[currentDirection][currentLoopIndex], 0, positionX, positionY);
    window.requestAnimationFrame(gameLoop);
}