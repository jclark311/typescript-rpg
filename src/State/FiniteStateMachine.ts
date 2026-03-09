import IGameState from "./GameState";
import Stack from "../Stack";

export default class FiniteStateMachine {
    private currentState: IGameState | undefined;
    stateStack: Stack<IGameState>;

    constructor(initialState: IGameState) {
        this.stateStack = new Stack<IGameState>();
        this.stateStack.push(initialState);
        this.currentState = this.stateStack.peek();
        this.currentState?.enter();
        // this.currentState = initialState;
        // this.currentState.enter();
    }

    changeState(newState: IGameState) {
        this.currentState?.exit();
        this.stateStack.pop();
        this.stateStack.push(newState);
        this.currentState = this.stateStack.peek();
        // this.currentState = newState;
        this.currentState?.enter();
    }

    update() {
        this.currentState?.execute();
    }
}

// Finite State Machine
// Using an FSM can be a great way to manage the high level transitions within the game. On first glance, for a simple game like Gauntlet, you might think there are really only 2 states, the menu, and playing the game, but it also helps to have smaller, transitional states, for example, while we are loading each game level.

// The following diagram shows the top level state machine for Gauntlet:


// This is declared in code with the following events and states:

// state: {
//   initial: 'booting',
//   events: [
//     { name: 'ready',  from: 'booting',               to: 'menu'     }, // initial page loads images and sounds then transitions to 'menu'
//     { name: 'start',  from: 'menu',                  to: 'starting' }, // start a new game from the menu
//     { name: 'load',   from: ['starting', 'playing'], to: 'loading'  }, // start loading a new level (either to start a new game, or next level while playing)
//     { name: 'play',   from: 'loading',               to: 'playing'  }, // play the level after loading it
//     { name: 'help',   from: ['loading', 'playing'],  to: 'help'     }, // pause the game to show a help topic
//     { name: 'resume', from: 'help',                  to: 'playing'  }, // resume playing after showing a help topic
//     { name: 'lose',   from: 'playing',               to: 'lost'     }, // player died
//     { name: 'quit',   from: 'playing',               to: 'lost'     }, // player quit
//     { name: 'win',    from: 'playing',               to: 'won'      }, // player won
//     { name: 'finish', from: ['won', 'lost'],         to: 'menu'     }  // back to menu
//   ]
// },
// We can now use the state machine’s callback mechanism to run additional code whenever different types of state transition occur. These state machine callbacks are usually very short and simple.

// For example, when booting has finished and the game is ready we can hide the progress indicator:

// onready: function() {
//   $('booting').hide();
// },
// … or, when entering the menu state, we can play some music:

// onmenu: function(event, previous, current) {
//   this.sounds.playMenuMusic();
// },
// … or, when a new game starts, we can join the game, and load the first level:

// onstart: function(event, previous, current, type, nlevel) {
//   this.player.join(type);
//   this.load(1);
// },
// … or, we can ask for confirmation before the player quits the game:

// onbeforequit: function(event, previous, current) {
//   if (!confirm('Quit Game?'))
//     return false;
// },

// onquit: function(event, previous, current) {
//   this.finish();
// },
// … and so on, and so forth.

// Using a declarative model to define our game states and the events that transition between them, along with short, simple callbacks when those transitions occur, allows us to keep the main game object clean and avoids long, complicated, spaghetti-like conditional methods.