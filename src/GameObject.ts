import Sprite from "./Sprite";

export type GameObjectConfig = {
    positionX?: number;
    positionY?: number;
    src?: string;
    direction?: string;
}

export default class GameObject {
    positionX: number;
    positionY: number;
    sprite: Sprite;
    direction: string;

    constructor(config: GameObjectConfig) {
        this.positionX = config.positionX || 0;
        this.positionY = config.positionY || 0;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "assets/images/walk_cycle.png",
        });

        this.direction = config.direction || "down";
    }

    update(state: any) {}
}