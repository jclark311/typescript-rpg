import GameObject from './GameObject';
import { utils } from './utils/Utils';

import { constants } from "./utils/constants";
const { scale, width, height } = constants;

export type SpriteConfig = {
    src: string;
    animations?: Record<string, number[][]>;
    currentAnimation?: string;
    animationFrameLimit?: number;
    gameObject: GameObject;
}

export default class Sprite {
    // static idCounter = 0;
    // id: number;
    image: HTMLImageElement;
    scaledWidth: number;
    scaledHeight: number;
    isLoaded: boolean = false;
    animations: Record<string, number[][]>;
    currentAnimation: string;
    currentAnimationFrame: number;
    animationFrameLimit: number;
    animationFrameProgress: number
    gameObject: GameObject;

    constructor(config: SpriteConfig) {
        // this.id = Sprite.idCounter++;
        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.scaledWidth = width * scale;
        this.scaledHeight = height * scale;

        //Configure Animation & Initial State
        this.animations = config.animations || {
            "idle-down" : [ [8, 0] ],
            "idle-right": [ [4, 0] ],
            "idle-up"   : [ [0, 0] ],
            "idle-left" : [ [12, 0] ],
            "walk-down" : [ [8, 0], [9, 0], [10, 0], [11, 0], ],
            "walk-right": [ [4, 0], [5, 0], [6, 0], [7, 0], ],
            "walk-up"   : [ [0, 0], [1, 0], [2, 0], [3, 0], ],
            "walk-left" : [ [12, 0], [13, 0], [14, 0], [15, 0], ]
        }

        this.currentAnimation = config.currentAnimation || "idle-right"; // config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key: string) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        // Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        // Reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0
        }
    }

    draw(ctx: CanvasRenderingContext2D, cameraPerson?: GameObject) {
        const x = this.gameObject.positionX - width + utils.withGrid(10.5) - cameraPerson.positionX;
        const y = this.gameObject.positionY - height + utils.withGrid(6) - cameraPerson.positionY;

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * width, frameY * height,
            width, height,
            x, y,
            this.scaledWidth, this.scaledHeight
        )

        this.updateAnimationProgress();
    }
}