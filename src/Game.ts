import Character from "./Character";
import Map from "./Map";

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    character: Character;
    map: Map;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.character = new Character(this.canvas, this.ctx);
        this.map = new Map(this.canvas, this.ctx);
    }

    loadImage() {
        this.character.img.src = "assets/images/walk_cycle.png";
        this.character.img.onload = () => {
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.draw();
        this.character.update();
        
        requestAnimationFrame(() => this.gameLoop());
    }
}