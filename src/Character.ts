import GameObject, { GameObjectConfig } from "./GameObject";
import EventEmitter from "./EventEmitter";
import { constants } from "./utils/constants";
import { utils } from "./utils/Utils";
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
    isStanding: boolean;
    standBehaviorTimeout: ReturnType<typeof setTimeout>;

    constructor(canvas: HTMLCanvasElement, ctx?: CanvasRenderingContext2D, config?: CharacterConfig) {
        super(config)
        this.canvas = canvas;
        this.ctx = ctx;
        this.movingProgressRemaining = 0;
        this.isStanding = false;
        this.intentPosition = null; // [x,y]

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        } as Record<string, (string | number)[]>;

        this.standBehaviorTimeout;
    }

    update(state: any) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            // Case: We're keyboard ready and have an arrow pressed
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state);
        }
    }

    startBehavior(state: any, behavior: any) {
        if (!this.isMounted) {
            return;
        }

        // Set character direction to whatever behavior has
        this.direction = behavior.direction;
        
        if (behavior.type === "walk") {

            // Stop here if space is not free
            if (state.map.isSpaceTaken(this.positionX, this.positionY, this.direction)) {
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior);
                }, 10)
                return;
            }

            // Ready to walk!
            // state.map.moveWall(this.positionX, this.positionY, this.direction);
            this.movingProgressRemaining = 16;

            // Add next position intent
            const intentPosition = utils.nextPosition(this.positionX, this.positionY, this.direction);
            this.intentPosition = [
                intentPosition.x,
                intentPosition.y
            ];

            this.updateSprite(state);
        }

        if (behavior.type === "stand") {
            this.isStanding = true;
      
            if (this.standBehaviorTimeout) {
                clearTimeout(this.standBehaviorTimeout);
                console.log("xlear")
            }
            this.standBehaviorTimeout = setTimeout(() => {
                const event = new EventEmitter();
                event.emit('PersonStandComplete', { whoId: this.id });
                
                // utils.emitEvent("PersonStandComplete", {
                //     whoId: this.id
                // })
                this.isStanding = false;
            }, behavior.time)
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        if (property === 'x') {
            this.positionX += Number(change);
        } else if (property === 'y') {
            this.positionY += Number(change);
        }
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
            // Finished the walk
            this.intentPosition = null;
            const event = new EventEmitter();
            event.emit('PersonWalkingComplete', { whoId: this.id });
        }

        // if (this.movingProgressRemaining > 0) {
        //     const [property, change] = this.directionUpdate[this.direction];
        //     if (property === 'x') {
        //         this.positionX += Number(change);
        //     } else if (property === 'y') {
        //         this.positionY += Number(change);
        //     }
        //     this.movingProgressRemaining -= 1;
        // }
    }

    updateSprite(state: any) {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);  
    }
}




// function Character()
// {
// 	this.tileFrom	= [1,1];
// 	this.tileTo		= [1,1];
// 	this.timeMoved	= 0;
// 	this.dimensions	= [30,30];
// 	this.position	= [45,45];

// 	this.delayMove	= {};
// 	this.delayMove[floorTypes.path]			= 400;
// 	this.delayMove[floorTypes.grass]		= 800;
// 	this.delayMove[floorTypes.ice]			= 300;
// 	this.delayMove[floorTypes.conveyorU]	= 200;
// 	this.delayMove[floorTypes.conveyorD]	= 200;
// 	this.delayMove[floorTypes.conveyorL]	= 200;
// 	this.delayMove[floorTypes.conveyorR]	= 200;

// 	this.direction	= directions.up;
// 	this.sprites = {};
// 	this.sprites[directions.up]		= new Sprite([{x:0,y:120,w:30,h:30}]);
// 	this.sprites[directions.right]	= new Sprite([{x:0,y:150,w:30,h:30}]);
// 	this.sprites[directions.down]	= new Sprite([{x:0,y:180,w:30,h:30}]);
// 	this.sprites[directions.left]	= new Sprite([{x:0,y:210,w:30,h:30}]);
	
// 	this.inventory = new Inventory(3);
// }
// Character.prototype.placeAt = function(x, y)
// {
// 	this.tileFrom	= [x,y];
// 	this.tileTo		= [x,y];
// 	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
// 		((tileH*y)+((tileH-this.dimensions[1])/2))];
// };
// Character.prototype.processMovement = function(t)
// {
// 	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

// 	var moveSpeed = this.delayMove[tileTypes[mapTileData.map[toIndex(this.tileFrom[0],this.tileFrom[1])].type].floor];

// 	if((t-this.timeMoved)>=moveSpeed)
// 	{
// 		this.placeAt(this.tileTo[0], this.tileTo[1]);

// 		if(mapTileData.map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter!=null)
// 		{
// 			mapTileData.map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter(this);
// 		}

// 		var tileFloor = tileTypes[mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])].type].floor;

// 		if(tileFloor==floorTypes.ice)
// 		{
// 			if(this.canMoveDirection(this.direction))
// 			{
// 				this.moveDirection(this.direction, t);
// 			}
// 		}
// 		else if(tileFloor==floorTypes.conveyorL && this.canMoveLeft())	{ this.moveLeft(t); }
// 		else if(tileFloor==floorTypes.conveyorR && this.canMoveRight()) { this.moveRight(t); }
// 		else if(tileFloor==floorTypes.conveyorU && this.canMoveUp())	{ this.moveUp(t); }
// 		else if(tileFloor==floorTypes.conveyorD && this.canMoveDown())	{ this.moveDown(t); }
// 	}
// 	else
// 	{
// 		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
// 		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

// 		if(this.tileTo[0] != this.tileFrom[0])
// 		{
// 			var diff = (tileW / moveSpeed) * (t-this.timeMoved);
// 			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
// 		}
// 		if(this.tileTo[1] != this.tileFrom[1])
// 		{
// 			var diff = (tileH / moveSpeed) * (t-this.timeMoved);
// 			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
// 		}

// 		this.position[0] = Math.round(this.position[0]);
// 		this.position[1] = Math.round(this.position[1]);
// 	}

// 	return true;
// }
// Character.prototype.canMoveTo = function(x, y)
// {
// 	if(x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
// 	if(typeof this.delayMove[tileTypes[mapTileData.map[toIndex(x,y)].type].floor]=='undefined') { return false; }
// 	if(mapTileData.map[toIndex(x,y)].object!=null)
// 	{
// 		var o = mapTileData.map[toIndex(x,y)].object;
// 		if(objectTypes[o.type].collision==objectCollision.solid)
// 		{
// 			return false;
// 		}
// 	}
// 	return true;
// };
// Character.prototype.canMoveUp		= function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]-1); };
// Character.prototype.canMoveDown 	= function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]+1); };
// Character.prototype.canMoveLeft 	= function() { return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1]); };
// Character.prototype.canMoveRight 	= function() { return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1]); };
// Character.prototype.canMoveDirection = function(d) {
// 	switch(d)
// 	{
// 		case directions.up:
// 			return this.canMoveUp();
// 		case directions.down:
// 			return this.canMoveDown();
// 		case directions.left:
// 			return this.canMoveLeft();
// 		default:
// 			return this.canMoveRight();
// 	}
// };

// Character.prototype.moveLeft	= function(t) { this.tileTo[0]-=1; this.timeMoved = t; this.direction = directions.left; };
// Character.prototype.moveRight	= function(t) { this.tileTo[0]+=1; this.timeMoved = t; this.direction = directions.right; };
// Character.prototype.moveUp		= function(t) { this.tileTo[1]-=1; this.timeMoved = t; this.direction = directions.up; };
// Character.prototype.moveDown	= function(t) { this.tileTo[1]+=1; this.timeMoved = t; this.direction = directions.down; };
// Character.prototype.moveDirection = function(d, t) {
// 	switch(d)
// 	{
// 		case directions.up:
// 			return this.moveUp(t);
// 		case directions.down:
// 			return this.moveDown(t);
// 		case directions.left:
// 			return this.moveLeft(t);
// 		default:
// 			return this.moveRight(t);
// 	}
// };
// Character.prototype.pickUp = function()
// {
// 	if(this.tileTo[0]!=this.tileFrom[0] ||
// 		this.tileTo[1]!=this.tileFrom[1])
// 	{
// 		return false;
// 	}
	
// 	var is = mapTileData.map[toIndex(this.tileFrom[0],
// 				this.tileFrom[1])].itemStack;
	
// 	if(is!=null)
// 	{
// 		var remains = this.inventory.addItems(is.type, is.qty);

// 		if(remains) { is.qty = remains; }
// 		else
// 		{
// 			mapTileData.map[toIndex(this.tileFrom[0],
// 				this.tileFrom[1])].itemStack = null;
// 		}
// 	}
	
// 	return true;
// };