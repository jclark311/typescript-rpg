import GameObject from "./GameObject";

export type MapConfig = {
    gameObjects: Record<string, GameObject>;
}

export default class Map {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    gameObjects: Record<string, GameObject>;
    tileAtlas: HTMLImageElement;
    cols: number;
    rows: number;
    tileSize: number;
    layers: number[][];
    gameMap: number[];
    tileW: number;
    tileH: number;
    mapW: number;
    mapH: number;
    currentSecond: number;
    frameCount: number;
    framesLastSecond: number;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, config: MapConfig) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameObjects = config.gameObjects;
        this.tileAtlas = new Image();
        this.tileAtlas.src = "assets/images/tiles.png"
        this.cols = 8;
        this.rows = 8;
        this.tileSize = 64;
        this.layers = [[
            3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 2, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 2, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 1, 1, 3,
            3, 1, 1, 1, 2, 1, 1, 3,
            3, 3, 3, 1, 2, 3, 3, 3
        ], [
            4, 3, 3, 3, 3, 3, 3, 4,
            4, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 5, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 4,
            4, 4, 4, 0, 5, 4, 4, 4,
            0, 3, 3, 0, 0, 3, 3, 3
        ]];
        this.gameMap = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
            0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
            0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
            0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        this.tileW = 40;
        this.tileH = 40;
        this.mapW = 10; 
        this.mapH = 10;
        this.currentSecond = 0; 
        this.frameCount = 0; 
        this.framesLastSecond = 0;
    }

    getTile(layer: number, column: number, row: number) {
        return this.layers[layer][row * this.cols + column];
    }

    draw() {
        // Draw the map here
        if (this.ctx === null) return;
        let sec = Math.floor(Date.now() / 1000);
        if (sec !== this.currentSecond) {
            this.currentSecond = sec;
            this.framesLastSecond = this.frameCount;
            this.frameCount = 1;
        } else {
            this.frameCount++;
        }

        for (let y = 0; y < this.mapH; y++) {
            for (let x = 0; x < this.mapW; x++) {
                switch (this.gameMap[((y * this.mapW) + x)]) {
                    case 0:
                        this.ctx.fillStyle = "lightgreen";
                        break;
                    default:
                        this.ctx.fillStyle = "darkgreen";
                        break;
                }
                this.ctx.fillRect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);
            }
        }
    }
}

