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
const cycleLoop = [0, 1, 0, 2];
let currentLoopIndex = 0;

function drawFrame(frameX: number, frameY: number, canvasX: number, canvasY: number) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}


function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw
    drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
}