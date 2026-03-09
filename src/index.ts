import Game from "./Game";
import '../public/stylesheets/style.css';
import '../public/stylesheets/shop-menu.css';


(function () {

    let canvas = document.getElementById("game") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;

    const game = new Game(canvas, ctx);
    game.init();
    
})();



