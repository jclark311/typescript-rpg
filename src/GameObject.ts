import Sprite from "./Sprite";
import Map from "./Map";
import GameEvent from "./GameEvent";

export type GameObjectConfig = {
    id?: string;
    positionX?: number;
    positionY?: number;
    src?: string;
    direction?: string;
    behaviorLoop?: any[];
}

export default class GameObject {
    id: string;
    isMounted: boolean;
    positionX: number;
    positionY: number;
    sprite: Sprite;
    direction: string;
    intentPosition?: [number, number];
    retryTimeout: ReturnType<typeof setTimeout>;
    behaviorLoop: any[];
    behaviorLoopIndex: number;

    constructor(config: GameObjectConfig) {
        this.id = null;
        this.isMounted = false;
        this.positionX = config.positionX || 0;
        this.positionY = config.positionY || 0;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "assets/images/walk_cycle.png",
        });

        this.direction = config.direction || "down";

        //These happen once on map startup.
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
        this.retryTimeout = null;
    }

    mount(map: Map) {
        console.log("mounting!")
        this.isMounted = true;
    }

    update(state: any) {}

    async doBehaviorEvent(map: Map) { 

        // Don't do anything if I don't have config to do anything
        if (this.behaviorLoop.length === 0) {
            return;  
        }

        if (map.isCutscenePlaying) {

            console.log("will retry", this.id)
            if (this.retryTimeout) {
                clearTimeout(this.retryTimeout);
            }
            this.retryTimeout = setTimeout(() => {
                this.doBehaviorEvent(map);
            }, 1000)
            return;
        }


        // Setting up our event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // Create an event instance out of our next event config
        const eventHandler = new GameEvent({ map, event: eventConfig });
        await eventHandler.init();
        // eventHandler.emit()
        // const eventHandler = new EventEmitter({ map, event: eventConfig });
        // await eventHandler.init(); 

        // Setting the next event to fire
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        } 

        // Do it again!
        this.doBehaviorEvent(map);
    }
}