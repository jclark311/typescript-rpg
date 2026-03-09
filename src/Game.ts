import Character from "./Character";
import Map from "./Map";
import KeyboardListener from './KeyboardListener';
import KeyboardHandler from "./KeyboardHandler";
import GameObject, { GameObjectConfig } from "./GameObject";
import FiniteStateMachine from "./State/FiniteStateMachine";
import MenuState from "./State/MenuState";
import EventEmitter, { EventListener } from "./EventEmitter";
import GameEvent from "./GameEvent";
import Menu, { GameMenu } from "./Menu";
import { ItemDB } from "./Content/items";
import { WORLD_MAP, CAVE_MAP, TOWN_MAP } from "./Content/maps";
import { utils } from "./utils/Utils";

type ConfigObject = {
    id?: string;
    type?: string;
    isPlayerControlled?: boolean;
    positionX?: number;
    positionY?: number;
}

type GameMapConfig = {
        gameObjects?: Record<string, GameObject>;
        configObjects: Record<string, ConfigObject>;
        walls?: Record<string, boolean>;
        tileAtlasSrc: string;
        cols: number;
        rows: number;
        atlasCol: number;
        tileSize: number;
        layers: number[][];
        collisionLayer: number[][];
}

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    stateMachine: FiniteStateMachine;
    map: Map;
    menu: GameMenu;
    keyboardHandler: KeyboardHandler;
    eventEmitter: EventEmitter;
    showGrid: boolean;
    showMenu: boolean;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.showGrid = false;
        this.showMenu = false;
        this.stateMachine = new FiniteStateMachine(new MenuState());
    }

    draw(layer: number, cameraPerson: GameObject) {
        let tileSize = 16;
        let tileOutputSize = 2.25; // 1X can set it higher to make tiles bigger and more spaced
        let updatedTileSize = tileSize * tileOutputSize;

        // cols: The width of the map, in columns.
        // rows: The height of the map, in rows.
        // tileSize: The tile size, in pixels.
        // tiles: A 1-dimensional array containing the visual grid.
        // getTile(): A helper method that gets the tile index in a certain position.
        // The getTile() helper method returns the tile contained at the specified column and row. 
        // If tiles were a 2D matrix, then the returned value would just be tiles[column][row]

        // Town Spritemap image is 175w x 288h
        // 175 / 16 = 10.9
        // 288 / 16 = 18

        // let atlasCol = 10;
        // let atlasRow = 6;
        let atlasCol = this.map.atlasCol;
        let atlasRow = 16;

        let mapRows = this.map.rows;
        let mapCols = this.map.cols;

        let mapHeight = mapRows * this.map.tileSize;
        let mapWidth = mapCols * this.map.tileSize;

        let mapIndex = 0;
        let sourceX = 0;
        let sourceY = 0;

        
        // Town Spritemap image is 175w x 288h
        // 175 / 16 = 10.9
        // 288 / 16 = 18
        for (let col = 0; col < mapHeight; col += this.map.tileSize) {
            for (let row = 0; row < mapWidth; row += this.map.tileSize) {
                let tileVal = this.map.layers[layer][mapIndex];
                if(tileVal != 0) {
                    tileVal -=1;
                    sourceY = Math.floor(tileVal/atlasCol) * tileSize;
                    sourceX = (tileVal % atlasCol) * tileSize;
                    this.ctx.drawImage(
                        this.map.tileAtlas, 
                        sourceX, 
                        sourceY, 
                        this.map.tileSize, 
                        this.map.tileSize, 
                        row * tileOutputSize - utils.withGrid(10.5) - cameraPerson.positionX, 
                        col * tileOutputSize - utils.withGrid(6) - cameraPerson.positionY, 
                        this.map.tileSize * tileOutputSize, 
                        this.map.tileSize * tileOutputSize
                    );
                }

                mapIndex ++;
            }
        } 
    }

    _drawGrid(cameraPerson: GameObject) {
        var width = this.map.cols * this.map.tileSize;
        var height = this.map.rows * this.map.tileSize;
        var x, y;
        for (var r = 0; r < this.map.rows; r++) {
            x = - cameraPerson.positionX;
            y = r * this.map.tileSize - cameraPerson.positionY;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
        for (var c = 0; c < this.map.cols; c++) {
            x = c * this.map.tileSize - cameraPerson.positionX;
            y = - cameraPerson.positionY;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }
    }

    startGameLoop() {
        const step = () => {
            // Clear off the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const cameraPerson = this.map.gameObjects.hero;

            // Update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.keyboardHandler.direction,
                    map: this.map,
                })
            })

            // Draw Lower layer
            this.draw(0, cameraPerson);

            // Draw Game Objects
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.positionY - b.positionY;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })
            // Object.values(this.map.gameObjects).forEach(object => {
            //     object.sprite.draw(this.ctx, cameraPerson);
            // })

            // Draw Upper layer
            this.draw(1, cameraPerson);

            // if (this.showGrid) {
            //     this._drawGrid(cameraPerson);
            // }

            if (!this.map.isPaused) {
                requestAnimationFrame(() => {
                    step();   
                })
            }
        }
        step();
    }

    bindActionInput() {
        new KeyboardListener("Enter", () => {
            // Emit an event
            this.eventEmitter.emit('dataReceived', { message: 'Hello, World!' });
            this.map.fireEvent('pause');
        })
        new KeyboardListener("Escape", () => {
            this.showGrid = !this.showGrid;
        })
    }

    bindHeroPositionCheck() {
        this.eventEmitter = new EventEmitter();
        const logEvent = (event: string, data?: any) => {
            console.log(`Event: ${event}, Data: ${data}`);
        };

        // Register an event listener
        this.eventEmitter.on('PersonWalkingComplete', logEvent);
        // document.addEventListener("PersonWalkingComplete", e => {
        //     if (e.detail.whoId === "hero") {
                // Hero's position has changed
                // this.map.checkForFootstepCutscene()
        //     }
        // })
    }

    startMap(mapConfig: GameMapConfig, heroInitialState: { positionX?: number, positionY?: number, direction?: string } = null) {
        this.map = new Map(this.canvas, this.ctx, mapConfig);
        this.map.game = this;
        this.map.mountObjects();

        if (heroInitialState) {
            const {hero} = this.map.gameObjects;
            hero.positionX = heroInitialState.positionX;
            hero.positionY = heroInitialState.positionY;
            hero.direction = heroInitialState.direction;
        }

        // this.progress.mapId = mapConfig.id;
        // this.progress.startingHeroX = this.map.gameObjects.hero.x;
        // this.progress.startingHeroY = this.map.gameObjects.hero.y;
        // this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;

    }

    init() {
        const menuContainer = document.createElement("div");
        menuContainer.id = "menu-container";
        document.body.appendChild(menuContainer);

        const OverworldMaps = {
            WorldMap: {
                // gameObjects: {
                //     hero: new Character(this.canvas, this.ctx, { isPlayerControlled: true }),
                //     // npc1: new Character(this.canvas, this.ctx, {})
                // },
                configObjects: {
                    hero: {
                        type: "Person",
                        isPlayerControlled: true,
                        positionX: utils.withGrid(5),
                        positionY: utils.withGrid(6),
                    },
                },
                walls: {
                    [utils.asGridCoord(0, 0)] : true,
                    [utils.asGridCoord(1, 1)] : true,
                    [utils.asGridCoord(7, 7)] : true,
                    [utils.asGridCoord(8, 7)] : true,
                },
                tileAtlasSrc: WORLD_MAP.tilesets[0].image,
                cols: WORLD_MAP.width,
                rows: WORLD_MAP.height,
                tileSize: WORLD_MAP.tilesets[0].tilewidth,
                atlasCol: 8,
                layers: WORLD_MAP.layers,
                collisionLayer: WORLD_MAP.collisionLayer
            },
            TownMap: {
                // gameObjects: {
                //     hero: new Character(this.canvas, this.ctx, { isPlayerControlled: true }),
                //     // npc1: new Character(this.canvas, this.ctx, {})
                // },
                configObjects: {
                    hero: {
                        type: "Person",
                        isPlayerControlled: true,
                        positionX: utils.withGrid(5),
                        positionY: utils.withGrid(6),
                    },
                },
                walls: {
                    [utils.asGridCoord(0, 0)] : true,
                    [utils.asGridCoord(1, 1)] : true,
                    [utils.asGridCoord(7, 7)] : true,
                    [utils.asGridCoord(8, 7)] : true,
                },
                tileAtlasSrc: TOWN_MAP.tilesets[0].image,
                cols: TOWN_MAP.width,
                rows: TOWN_MAP.height,
                tileSize: TOWN_MAP.tilesets[0].tilewidth,
                atlasCol: 11,
                layers: TOWN_MAP.layers,
                collisionLayer: TOWN_MAP.collisionLayer
            },
            CaveMap: {
                // gameObjects: {
                //     hero: new Character(this.canvas, this.ctx, { isPlayerControlled: true }),
                //     // npc1: new Character(this.canvas, this.ctx, {})
                // },
                configObjects: {
                    hero: {
                        type: "Person",
                        isPlayerControlled: true,
                        positionX: utils.withGrid(55),
                        positionY: utils.withGrid(96),
                    },
                },
                walls: {
                    [utils.asGridCoord(0, 0)] : true,
                    [utils.asGridCoord(1, 1)] : true,
                    [utils.asGridCoord(7, 7)] : true,
                    [utils.asGridCoord(8, 7)] : true,
                },
                tileAtlasSrc: CAVE_MAP.tilesets[0].image,
                cols: CAVE_MAP.width,
                rows: CAVE_MAP.height,
                tileSize: CAVE_MAP.tilesets[0].tilewidth,
                atlasCol: 16,
                layers: CAVE_MAP.layers,
                collisionLayer: CAVE_MAP.collisionLayer
            }
        }

        let initialHeroState = {
            // positionX: utils.withGrid(1),
            // positionY: utils.withGrid(50),
            positionX: utils.withGrid(5),
            positionY: utils.withGrid(6),
            direction: 'up'
            // x: this.progress.startingHeroX,
            // y: this.progress.startingHeroY,
            // direction: this.progress.startingHeroDirection,
        }

        //Start the first map
        this.startMap(OverworldMaps.CaveMap, initialHeroState );

        // Example usage
        this.eventEmitter = new EventEmitter();
        const logEvent = (event: string, data?: any) => {
            console.log(`Event: ${event}, Data: ${data}`);
        };

        // Register an event listener
        this.eventEmitter.on('dataReceived', logEvent);

        this.stateMachine.update();

        // Create controls
        this.bindActionInput();
        this.bindHeroPositionCheck();

        this.keyboardHandler = new KeyboardHandler();
        this.keyboardHandler.init();

        this.startGameLoop();
    }
}