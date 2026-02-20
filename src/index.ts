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
function init() {
    // Draw
    ctx.drawImage(img, 0, 0, width, height, 0, 0, scaledWidth, scaledHeight);
}