import { constants } from "./utils/constants";
const { scale, width, height } = constants;

let img = new Image();
img.src = "assets/images/walk_cycle.png";
img.onload = function() {
    window.requestAnimationFrame(gameLoop);
}

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
const FACING_RIGHT = 4;
const FACING_DOWN = 8;
const FACING_LEFT = 12;

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

function drawFrame(frameX: number, frameY: number, canvasX: number, canvasY: number) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keyPresses.w) {
        positionY -= MOVEMENT_SPEED;
        currentDirection = FACING_UP;
    } else if (keyPresses.s) {
        positionY += MOVEMENT_SPEED;
        currentDirection = FACING_DOWN;
    }
    if (keyPresses.a) {
        positionX -= MOVEMENT_SPEED;
        currentDirection = FACING_LEFT;
    } else if (keyPresses.d) {
        positionX += MOVEMENT_SPEED;
        currentDirection = FACING_RIGHT;
    }

    drawFrame(currentDirection, 0, positionX, positionY);

    window.requestAnimationFrame(gameLoop);
}


function step() {
    frameCount++;
    if (frameCount < 10) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw
    drawFrame(cycleLoop[currentDirection][currentLoopIndex], 0, 0, 0);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
        currentDirection++;
    }
    if (currentDirection >= 4) {
        currentDirection = 0;
    }
    window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
}