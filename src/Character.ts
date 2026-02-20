import { constants } from "./utils/constants";
const { scale, width, height } = constants;

export default class Character {
    img: HTMLImageElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    scaledWidth: number;
    scaledHeight: number;
    upLoop: number[];
    rightLoop: number[];
    downLoop: number[];
    leftLoop: number[];
    cycleLoop: number[][];
    currentLoopIndex: number;
    frameCount: number;
    FACING_UP: number;
    FACING_RIGHT: number;
    FACING_DOWN: number;
    FACING_LEFT: number;
    currentDirection: number;
    keyPresses: Record<string, boolean>;
    MOVEMENT_SPEED: number;
    positionX: number;
    positionY: number;
    FRAME_LIMIT: number;

    constructor(canvas: HTMLCanvasElement, ctx?: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.img = new Image();
        this.scaledWidth = width * scale;
        this.scaledHeight = height * scale;

        this.upLoop = [0, 1, 0, 3];
        this.rightLoop = [4, 5, 4, 7];
        this.downLoop = [8, 9, 8, 11];
        this.leftLoop = [12, 13, 12, 15];

        // Hero facing down
        this.cycleLoop = [this.upLoop, this.rightLoop, this.downLoop, this.leftLoop];

        this.currentLoopIndex = 0;
        // Slow down the animation
        this.frameCount = 0;

        this.FACING_UP = 0;
        this.FACING_RIGHT = 1;
        this.FACING_DOWN = 2;
        this.FACING_LEFT = 3;
        this.currentDirection = this.FACING_DOWN;

        this.keyPresses = {
            'ArrowUp': false,
            'ArrowRight': false,
            'ArrowDown': false,
            'ArrowLeft': false,
            'w': false,
            'a': false,
            's': false,
            'd': false,
        } as Record<string, boolean>;

        this.MOVEMENT_SPEED = 1;
        this.positionX = 0;
        this.positionY = 0;
        this.FRAME_LIMIT = 12;

        document.addEventListener("keydown", (e) => this.keyDownListener(e));
        document.addEventListener("keyup", (e) => this.keyUpListener(e));
    }

    keyDownListener(e: KeyboardEvent) {
        this.keyPresses[e.key] = true;
    }

    keyUpListener(e: KeyboardEvent) {
        this.keyPresses[e.key] = false;
    }

    drawFrame(frameX: number, frameY: number, canvasX: number, canvasY: number) {
        this.ctx.drawImage(this.img, frameX * width, frameY * height, width, height, canvasX, canvasY, this.scaledWidth, this.scaledHeight);
    }

    moveCharacter(deltaX: number, deltaY: number, direction: number) {
        if (this.positionX + deltaX > 0 && this.positionX + this.scaledWidth + deltaX < this.canvas.width) {
            this.positionX += deltaX;
        }
        if (this.positionY + deltaY > 0 && this.positionY + this.scaledHeight + deltaY < this.canvas.height) {
            this.positionY += deltaY;
        }
        this.currentDirection = direction;
    }

    update() {
        let hasMoved = false;

        if (this.keyPresses.w) {
            this.moveCharacter(0, -this.MOVEMENT_SPEED, this.FACING_UP);
            hasMoved = true;
        } else if (this.keyPresses.s) {
            this.moveCharacter(0, this.MOVEMENT_SPEED, this.FACING_DOWN);
            hasMoved = true;
        }
        if (this.keyPresses.a) {
            this.moveCharacter(-this.MOVEMENT_SPEED, 0, this.FACING_LEFT);
            hasMoved = true;
        } else if (this.keyPresses.d) {
            this.moveCharacter(this.MOVEMENT_SPEED, 0, this.FACING_RIGHT);
            hasMoved = true;
        }

        if (hasMoved) {
            this.frameCount++;
            if (this.frameCount >= this.FRAME_LIMIT) {
                this.frameCount = 0;
                this.currentLoopIndex++;
                if (this.currentLoopIndex >= this.cycleLoop.length) {
                    this.currentLoopIndex = 0;
                }
            }
        }

        if (!hasMoved) {
            this.currentLoopIndex = 0;
        }

        this.drawFrame(this.cycleLoop[this.currentDirection][this.currentLoopIndex], 0, this.positionX, this.positionY);
    }
}