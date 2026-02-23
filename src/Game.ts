import Character from "./Character";
import Map from "./Map";
import KeyboardHandler from "./KeyboardHandler";

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    map: Map;
    keyboardHandler: KeyboardHandler;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    _drawLayer(layer: number) {
        for (var c = 0; c < this.map.cols; c++) {
            for (var r = 0; r < this.map.rows; r++) {
                var tile = this.map.getTile(layer, c, r);
                if (tile !== 0) { // 0 => empty tile
                    this.ctx.drawImage(
                        this.map.tileAtlas, // image
                        (tile - 1) * this.map.tileSize, // source x
                        0, // source y
                        this.map.tileSize, // source width
                        this.map.tileSize, // source height
                        c * this.map.tileSize,  // target x
                        r * this.map.tileSize, // target y
                        this.map.tileSize, // target width
                        this.map.tileSize // target height
                    );
                }
            }
        }
    }

    startGameLoop() {
        const step = () => {
            // Clear off the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw Lower layer
            this._drawLayer(0);

            Object.values(this.map.gameObjects).forEach(object => {
                object.update(this.keyboardHandler.direction)
                object.sprite.draw(this.ctx);
            })

            // Draw Upper layer
            this._drawLayer(1);
      
            requestAnimationFrame(() => {
                step();   
            })
        }
        step();
    }

    init() {
        const OverworldMaps = {
            DemoRoom: {
                gameObjects: {
                    hero: new Character(this.canvas, this.ctx, { isPlayerControlled: true }),
                    // npc1: new Character(this.canvas, this.ctx, {})
                }
            },
        }
        this.map = new Map(this.canvas, this.ctx, OverworldMaps.DemoRoom);

        this.keyboardHandler = new KeyboardHandler();
        this.keyboardHandler.init();

        this.startGameLoop();
    }
}