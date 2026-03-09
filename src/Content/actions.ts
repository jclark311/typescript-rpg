export const Actions = {
  damage1: {
    name: "Whomp!",
    description: "Pillowy punch of dough",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      { type: "animation", animation: "spin"},
      { type: "stateChange", damage: 10}
    ]
  },
  saucyStatus: {
    name: "Tomato Squeeze",
    description: "Applies the Saucy status",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      { type: "stateChange", status: { type: "saucy", expiresIn: 3 } }
    ]
  },
  clumsyStatus: {
    name: "Olive Oil",
    description: "Slippery mess of deliciousness",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      { type: "animation", animation: "glob", color: "#dafd2a" },
      { type: "stateChange", status: { type: "clumsy", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is slipping all around!"},
    ]
  },
  //Items
  item_recoverStatus: {
    name: "Heating Lamp",
    description: "Feeling fresh and warm",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!"},
      { type: "stateChange", status: null },
      { type: "textMessage", text: "Feeling fresh!", },
    ]
  },
  item_recoverHp: {
    name: "Parmesan",
    targetType: "friendly",
    success: [
      { type:"textMessage", text: "{CASTER} sprinkles on some {ACTION}!", },
      { type:"stateChange", recover: 10, },
      { type:"textMessage", text: "{CASTER} recovers HP!", },
    ]
  },
}


// class OverworldEvent {
//   constructor({ map, event}) {
//     this.map = map;
//     this.event = event;
//   }

//   stand(resolve) {
//     const who = this.map.gameObjects[ this.event.who ];
//     who.startBehavior({
//       map: this.map
//     }, {
//       type: "stand",
//       direction: this.event.direction,
//       time: this.event.time
//     })
    
//     //Set up a handler to complete when correct person is done walking, then resolve the event
//     const completeHandler = e => {
//       if (e.detail.whoId === this.event.who) {
//         document.removeEventListener("PersonStandComplete", completeHandler);
//         resolve();
//       }
//     }
//     document.addEventListener("PersonStandComplete", completeHandler)
//   }

//   walk(resolve) {
//     const who = this.map.gameObjects[ this.event.who ];
//     who.startBehavior({
//       map: this.map
//     }, {
//       type: "walk",
//       direction: this.event.direction,
//       retry: true
//     })

//     //Set up a handler to complete when correct person is done walking, then resolve the event
//     const completeHandler = e => {
//       if (e.detail.whoId === this.event.who) {
//         document.removeEventListener("PersonWalkingComplete", completeHandler);
//         resolve();
//       }
//     }
//     document.addEventListener("PersonWalkingComplete", completeHandler)

//   }

//   textMessage(resolve) {

//     if (this.event.faceHero) {
//       const obj = this.map.gameObjects[this.event.faceHero];
//       obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
//     }

//     const message = new TextMessage({
//       text: this.event.text,
//       onComplete: () => resolve()
//     })
//     message.init( document.querySelector(".game-container") )
//   }

//   changeMap(resolve) {

//     //Deactivate old objects
//     Object.values(this.map.gameObjects).forEach(obj => {
//       obj.isMounted = false;
//     })

//     const sceneTransition = new SceneTransition();
//     sceneTransition.init(document.querySelector(".game-container"), () => {
//       this.map.overworld.startMap( window.OverworldMaps[this.event.map], {
//         x: this.event.x,
//         y: this.event.y,
//         direction: this.event.direction,
//       });
//       resolve();
//       sceneTransition.fadeOut();
//     })
//   }

//   battle(resolve) {
//     const battle = new Battle({
//       enemy: Enemies[this.event.enemyId],
//       arena: this.event.arena || null,
//       onComplete: (didWin) => {
//         resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE");
//       }
//     })
//     battle.init(document.querySelector(".game-container"));

//   }

//   pause(resolve) {
//     this.map.isPaused = true;
//     const menu = new PauseMenu({
//       progress: this.map.overworld.progress,
//       onComplete: () => {
//         resolve();
//         this.map.isPaused = false;
//         this.map.overworld.startGameLoop();
//       }
//     });
//     menu.init(document.querySelector(".game-container"));
//   }

//   addStoryFlag(resolve) {
//     window.playerState.storyFlags[this.event.flag] = true;
//     resolve();
//   }

//   craftingMenu(resolve) {
//     const menu = new CraftingMenu({
//       pizzas: this.event.pizzas,
//       onComplete: () => {
//         resolve();
//       }
//     })
//     menu.init(document.querySelector(".game-container"))
//   }

//   init() {
//     return new Promise(resolve => {
//       this[this.event.type](resolve)      
//     })
//   }

// }