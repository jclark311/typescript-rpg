import MenuState from "./MenuState";
import FiniteStateMachine from "./FiniteStateMachine";
import Stack from "../Stack";

// State interface
export default interface IGameState {
    parent?: IGameState;
    stack?: Stack<IGameState>;
    stateMachine?: FiniteStateMachine;

    enter(): void;
    execute(): void;
    exit(): void;
}



class PlayState implements IGameState {
    enter() { console.log("Entering Play State"); }
    execute() { console.log("Executing Play State"); }
    exit() { console.log("Exiting Play State"); }
}

class FindLeafState implements IGameState {
    velocityX: number;
    velocityY: number;

    constructor() {
        this.velocityX = 0;
        this.velocityY = 0;
    }

    enter(): void {
        // 
    }

    execute(): void {
        // 
    }

    exit(): void {
        // 
    }
}

class RunAwayState implements IGameState {
    velocityX: number;
    velocityY: number;

    constructor() {
        this.velocityX = 0;
        this.velocityY = 0;
    }

    enter(): void {
        // 
    }

    execute(): void {
        // 
    }

    exit(): void {
        // 
    }
}

class GoHomeState implements IGameState {
    velocityX: number;
    velocityY: number;

    constructor() {
        this.velocityX = 0;
        this.velocityY = 0;
    }

    enter(): void {
        // 
    }

    execute(): void {
        // 
    }

    exit(): void {
        // 
    }
}



const leaf = {
    x: 10,
    y: 10
}

const mouse = {
    x: 40,
    y: 40
}

const home = {
    x: 30,
    y: 100
}

class Ant {
    positionX: number;
    positionY: number;
    velocityX: number;
    velocityY: number;
    brain: FiniteStateMachine;

    constructor(state: IGameState) {
        this.positionX = 0;
        this.positionY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.brain = new FiniteStateMachine(state);
    }

    move(x: number, y: number) {
        if (x) {
            this.positionX += x;
        }

        if (y) {
            this.positionY += y;
        }
    }

    // findLeaf state - move toward the leaf
    findLeaf() {
        const findLeafState = new FindLeafState();
        const runAwayState = new RunAwayState();
        const goHomeState = new GoHomeState();

        // Move the ant toward the leaf
        this.move(leaf.x - this.positionX, leaf.y - this.positionY);

        // Can later add check for distance to leaf
        // Set state to findLeafState if close
        if (leaf.x <= 10) {
            this.brain.changeState(goHomeState);
        }
        // Set state to runAway if close to mouse
        if (mouse.x <= 40) {
            this.brain.changeState(runAwayState);
        }
    }

    // goHome state - move toward home
    goHome() {
        const findLeafState = new FindLeafState();
        const runAwayState = new RunAwayState();
        const goHomeState = new GoHomeState();
        
        // Can later add check for distance to leaf
        // Set state to findLeafState if close
        if (home.x <= 10) {
            this.brain.changeState(findLeafState);
        }
        // Set state to runAway if close to mouse
        if (mouse.x <= 40) {
            this.brain.changeState(runAwayState);
        }
    }

    // runAway state - run away from the mouse cursor
    runAway() {
        const findLeafState = new FindLeafState();
        const runAwayState = new RunAwayState();
        
        // Can later add check for distance to leaf
        // Set state to findLeafState if close
        if (leaf.x <= 10) {
            this.brain.changeState(findLeafState);
        }
        // Set state to runAway if close to mouse
        if (mouse.x <= 40) {
            this.brain.changeState(runAwayState);
        }
    }

    // Move should be called in update
    update() {
        this.brain.update();
        // this.move();
    }
}

// Context
class Game {
    stateMachine: FiniteStateMachine;
//   private currentState: IGameState;

    constructor(state: IGameState) {
        this.stateMachine = new FiniteStateMachine(state);
    }
//   constructor(initialState: IGameState) {
//     this.currentState = initialState;
//     this.currentState.enter();
//   }

    setState(state: IGameState) {
        this.stateMachine.changeState(state);
    }

    update() {
        this.stateMachine.update();
    }

//   changeState(newState: IGameState) {
//     this.currentState.exit();
//     this.currentState = newState;
//     this.currentState.enter();
//   }

//   update() {
//     this.currentState.execute();
//   }
}

// Usage
// const game = new Game(new MenuState());
// game.update();
// game.changeState(new PlayState());
// game.update();
