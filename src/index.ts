import { constants } from "./utils/constants";
const { scale, width, height } = constants;

let img = new Image();
img.src = "assets/images/walk_cycle.png";
img.onload = function() {
    init();
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
let currentDirection = 0;

function drawFrame(frameX: number, frameY: number, canvasX: number, canvasY: number) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
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