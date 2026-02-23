import GameObject, { GameObjectConfig } from "./GameObject";
import { constants } from "./utils/constants";
const { scale, width, height } = constants;

type CharacterType = {
    isPlayerControlled?: boolean;
}

export type CharacterConfig = CharacterType & GameObjectConfig

export default class Character extends GameObject {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    isPlayerControlled: boolean;
    movingProgressRemaining: number;
    directionUpdate: Record<string, (string | number)[]>;

    constructor(canvas: HTMLCanvasElement, ctx?: CanvasRenderingContext2D, config?: CharacterConfig) {
        super(config)
        this.canvas = canvas;
        this.ctx = ctx;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        } as Record<string, (string | number)[]>;

        this.movingProgressRemaining = 0;
    }

    update(state: any) {
        this.updatePosition();
        this.updateSprite(state);

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state) {
            this.direction = state;
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            if (property === 'x') {
                this.positionX += Number(change);
            } else if (property === 'y') {
                this.positionY += Number(change);
            }
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state: any) {
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state) {
            this.sprite.setAnimation("idle-"+this.direction);
            return;
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
        }
    }
}