import Game from "./Game";
import GameObject, { GameObjectConfig } from "./GameObject";
import Sprite from "./Sprite";
import EventEmitter, { EventListener } from "./EventEmitter";
import GameEvent from "./GameEvent";
import { utils } from "./utils/Utils";
import Character from "./Character";

export type ConfigObject = {
    id?: string;
    type?: string;
    isPlayerControlled?: boolean;
    positionX?: number;
    positionY?: number;
}

export type MapConfig = {
    gameObjects?: Record<string, GameObject>;
    configObjects: Record<string, ConfigObject>;
    cutsceneSpaces?: any;
    walls?: Record<string, boolean>;
    tileAtlasSrc: string;
    cols: number;
    rows: number;
    atlasCol: number;
    tileSize: number;
    layers: number[][];
    collisionLayer: number[][];
}

export default class Map {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    game: Game;
    gameObjects?: Record<string, GameObject>;
    configObjects: Record<string, ConfigObject>;
    cutsceneSpaces
    walls: Record<string, boolean>;
    tileAtlas: HTMLImageElement;
    cols: number;
    rows: number;
    tileSize: number;
    atlasCol: number;
    layers: number[][];
    collisionLayer: number[][];
    isPaused: boolean;
    eventEmitter: EventEmitter;
    isCutscenePlaying: boolean;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, config: MapConfig) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = null;
        this.gameObjects = {};
        this.configObjects = config.configObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};
        this.tileAtlas = new Image();
        this.tileAtlas.src = config.tileAtlasSrc;
        this.cols = config.cols;
        this.rows = config.rows;
        this.tileSize = config.tileSize;
        this.atlasCol = config.atlasCol;
        this.layers = config.layers;
        this.collisionLayer = config.collisionLayer;
        this.isPaused = false;
        this.isCutscenePlaying = false;
    }

    getTile(layer: number, column: number, row: number) {
        return this.layers[layer][row * this.cols + column];
    }

    fireEvent(event: any) {
        const eventHandler = new GameEvent({
            event: event,
            map: this,
        })
        eventHandler.init();
    }

    async startCutscene(events: EventListener[]) {
        for (let i = 0; i < events.length; i++) {
            const emitter = new EventEmitter();

            const logEvent = (event: string, data?: any) => {
                console.log(`Event: ${event}, Data: ${data}`);
            };

            // Register an event listener
            emitter.on('dataReceived', logEvent);

            // Emit an event
            emitter.emit('dataReceived', { message: 'Hello, World!' });

            // Remove the event listener
            emitter.off('dataReceived', logEvent);
        }
    }

    isSpaceTaken(currentX: number, currentY: number, direction: string) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        if (this.walls[`${x},${y}`]) {
            return true;
        }
        // Check for game objects at this position
        return Object.values(this.gameObjects).find(obj => {
            if (obj.positionX === x && obj.positionY === y) { return true; }
            if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y ) {
                return true;
            }
            return false;
        })
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.configObjects).forEach(key => {
            let object = this.configObjects[key];
            object.id = key;
            
            let instance;
            if (object.type === "Person") {
                instance = new Character(this.canvas, this.ctx, object);
            }
            this.gameObjects[key] = instance;
            this.gameObjects[key].id = key;
            instance.mount(this);

        })
        // Object.values(this.gameObjects).forEach(o => {

        //     //TODO: determine if this object should actually mount
        //     o.mount(this);

        // })
    }

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[ `${hero.positionX},${hero.positionY}` ];
        if (!this.isCutscenePlaying && match) {
            this.startCutscene( match[0].events )
        }
    }
}

