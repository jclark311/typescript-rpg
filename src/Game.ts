import Character from "./Character";

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    character: Character;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.character = new Character(this.canvas, this.ctx);
    }

    loadImage() {
        this.character.img.src = "assets/images/walk_cycle.png";
            this.character.img.onload = () => {
                requestAnimationFrame(() => this.gameLoop());
            }
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.character.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}