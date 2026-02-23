import Game from "./Game";

(function () {

    let canvas = document.getElementById("game") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const game = new Game(canvas, ctx);
    game.init()

})();



