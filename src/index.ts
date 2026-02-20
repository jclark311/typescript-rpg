let img = new Image();
img.src = "assets/images/walk_cycle.png";
img.onload = function() {
    init();
}

let canvas = document.getElementById("game") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

function init() {
    // 
    ctx.drawImage(img, 0, 0, 16, 24, 0, 0, 16, 24);
}