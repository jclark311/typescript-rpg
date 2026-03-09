// The biggest consumer of events is the primary game object. 
// It uses event handlers to coordinate the game logic itself. 
// The handlers are declared using a small data structure:

// pubsub: [
//   { event: EVENT.MONSTER_DEATH,      action: function(monster, by, nuke) { this.onMonsterDeath(monster, by, nuke);     } },
//   { event: EVENT.GENERATOR_DEATH,    action: function(generator, by)     { this.onGeneratorDeath(generator, by);       } },
//   { event: EVENT.DOOR_OPENING,       action: function(door, speed)       { this.onDoorOpening(door, speed);            } },
//   { event: EVENT.DOOR_OPEN,          action: function(door)              { this.onDoorOpen(door);                      } },
//   { event: EVENT.TREASURE_COLLECTED, action: function(treasure, player)  { this.onTreasureCollected(treasure, player); } },
//   { event: EVENT.WEAPON_COLLIDE,     action: function(weapon, entity)    { this.onWeaponCollide(weapon, entity);       } },
//   { event: EVENT.PLAYER_COLLIDE,     action: function(player, entity)    { this.onPlayerCollide(player, entity);       } },
//   { event: EVENT.MONSTER_COLLIDE,    action: function(monster, entity)   { this.onMonsterCollide(monster, entity);     } },
//   { event: EVENT.PLAYER_NUKE,        action: function(player)            { this.onPlayerNuke(player);                  } },
//   { event: EVENT.PLAYER_FIRE,        action: function(player)            { this.onPlayerFire(player);                  } },
//   { event: EVENT.MONSTER_FIRE,       action: function(monster)           { this.onMonsterFire(monster);                } },
//   { event: EVENT.PLAYER_EXITING,     action: function(player, exit)      { this.onPlayerExiting(player, exit);         } },
//   { event: EVENT.PLAYER_EXIT,        action: function(player)            { this.onPlayerExit(player);                  } },
//   { event: EVENT.FX_FINISHED,        action: function(fx)                { this.onFxFinished(fx);                      } },
//   { event: EVENT.PLAYER_DEATH,       action: function(player)            { this.onPlayerDeath(player);                 } }
// ],

import Map from "./Map";
import { GameMenu } from "./Menu";
import EventEmitter, { EventListener } from "./EventEmitter";

type GameEventConfig = {
    map: Map;
    event: any;
}

export default class GameEvent {
  map: Map;
  event: any;

  constructor({ map, event }: GameEventConfig) {
    this.map = map;
    this.event = event;
  }

    // Teleport an entity from the current position to the given position
    teleport(resolve: any) {
        // layer = layer or 1
        // return function(trigger, entity, tX, tY, tLayer)
        //     entity:SetTilePos(tileX, tileY, layer, map)
        // end
    }

    addNPC(resolve: any) {
        // return function(trigger, entity, tX, tY, tLayer)

        //     local charDef = gCharacters[npc.def]
        //     assert(charDef) -- Character should always exist!
        //     local char = Character:Create(charDef, map)

        //     -- Use npc def location by default
        //     -- Drop back to entities locations if missing
        //     local x = npc.x or char.mEntity.mTileX
        //     local y = npc.y or char.mEntity.mTileY
        //     local layer = npc.layer or char.mEntity.mLayer

        //     char.mEntity:SetTilePos(x, y, layer, map)

        //     table.insert(map.mNPCs, char)
        //     assert(map.mNPCbyId[npc.id] == nil)
        //     char.mId = npc.id
        //     map.mNPCbyId[npc.id] = char
        // end
    }

    removeNPC(resolve: any) {
        // return function(trigger, entity, tX, tY, tLayer)
        //     local char = map.mNPCbyId[npcId]

        //     local x = char.mEntity.mTileX
        //     local y = char.mEntity.mTileY
        //     local layer = char.mEntity.mLayer

        //      map:RemoveNPC(x, y, layer)
        // end
    }

    addSavePoint(resolve: any) {

        // return function(trigger, entity, tX, tY, tLayer)


        //     local entityDef  =  gEntities["save_point"]
        //     local savePoint = Entity:Create(entityDef)
        //     savePoint:SetTilePos(x, y, layer, map)

        //     local function AskCallback(index)
        //         if index == 2 then
        //             return
        //         end
        //         Save:Save()
        //         gStack:PushFit(gRenderer, 0, 0, "Saved!")
        //     end

        //     local trigger = Trigger:Create(
        //     {
        //         OnUse = function()
        //             gWorld.mParty:Rest()
        //             local askMsg = "Save progress?"
        //             gStack:PushFit(gRenderer, 0, 0, askMsg, false,
        //             {
        //                 choices =
        //                 {
        //                     options = {"Yes", "No"},
        //                     OnSelection = AskCallback
        //                 },
        //             })
        //         end
        //     })
        //     map:AddFullTrigger(trigger, x, y, layer)
        // end

    }

    addChest(resolve: any) {

        // layer = layer or 1

        // map.mContainerCount = map.mContainerCount or 0
        // map.mContainerCount = map.mContainerCount + 1
        // local containerId = map.mContainerCount
        // local mapId = map.mMapDef.id
        // local state = gWorld.mGameState.maps[mapId]
        // local isLooted = state.chests_looted[containerId] or false

        // return function(trigger, entity, tX, tY, tLayer)

        //     local entityDef = gEntities[entityId]
        //     assert(entityDef ~= nil)
        //     local chest = Entity:Create(entityDef)

        //     -- Put the chest entity on the map
        //     chest:SetTilePos(x, y, layer, map)

        //     if isLooted then
        //         -- Open chest and return before
        //         -- setting trigger.
        //         chest:SetFrame(entityDef.openFrame)
        //         return
        //     end

        //     -- Define open chest function
        //     local  OnOpenChest = function()

        //         if loot == nil or #loot == 0 then
        //             gStack:PushFit(gRenderer, 0, 0, "The chest is empty!", 300)
        //         else

        //             gWorld:AddLoot(loot)

        //             for _, item in ipairs(loot) do


        //                 local count = item.count or 1
        //                 local name = ItemDB[item.id].name
        //                 local message = string.format("Got %s", name)

        //                 if count > 1 then
        //                     message = message .. string.format(" x%d", count)
        //                 end

        //                 gStack:PushFit(gRenderer, 0, 0, message, 300)
        //             end
        //         end

        //         -- Remove the trigger
        //        map:RemoveTrigger(chest.mTileX, chest.mTileY, chest.mLayer)
        //        chest:SetFrame(entityDef.openFrame)
        //        print(string.format("Chest: %d set to looted.", containerId))
        //        state.chests_looted[containerId] = true
        //     end


        //     local trigger = Trigger:Create( { OnUse = OnOpenChest } )
        //     map:AddFullTrigger(trigger,
        //                        chest.mTileX, chest.mTileY, chest.mLayer)
        // end
    }

    RunScript(resolve: any) {
        // return function(trigger, entity, tX, tY, tLayer)
        //     Func(map, trigger, entity, tX, tY, tLayer)
        // end
    }

    openShop(resolve: any) {
        // return function(trigger, entity, tX, tY, tLayer)
        //     gStack:Push(ShopState:Create(gStack, gWorld, def))
        // end
    }

    openInn(resolve: any) {

        // def = def or {}
        // local cost = def.cost or 5
        // local lackGPMsg = "You need %d gp to stay at the Inn."
        // local askMsg = "Stay at the inn for %d gp?"
        // local resultMsg = "HP/MP Restored!"

        // askMsg = string.format(askMsg, cost)
        // lackGPMsg = string.format(lackGPMsg, cost)

        // local OnSelection = function(index, item)
        //     print("selection! callback", index, item)
        //     if index == 2 then
        //         return
        //     end

        //     gWorld.mGold = gWorld.mGold - cost

        //     gWorld.mParty:Rest()

        //     --gStack:PushFit(gRenderer, 0, 0, lackGPMsg)
        //     gStack:PushFit(gRenderer, 0, 0, resultMsg)
        // end

        // return function(trigger, entity, tX, tY, tLayer)

        //     local gp = gWorld.mGold

        //     if gp >= cost then
        //         gStack:PushFit(gRenderer, 0, 0, askMsg, false,
        //         {
        //             choices =
        //             {
        //                 options = {"Yes", "No"},
        //                 OnSelection = OnSelection
        //             },
        //         })
        //     else
        //         gStack:PushFit(gRenderer, 0, 0, lackGPMsg)
        //     end

        // end
    }

    shortText(resolve: any) {
        // return function(trigger, entity, tX, tY, tLayer)
        //     tY = tY - 4
        //     local x, y = map:TileToScreen(tX, tY)
        //     gStack:PushFix(gRenderer, x, y, 9*32, 2.5*32, text)
        // end
    }

    changeMap(resolve: any) {

        // local storyboard =
        // {
        //     SOP.BlackScreen("blackscreen", 0),
        //     SOP.FadeInScreen("blackscreen", 0.5),
        //     SOP.ReplaceScene(
        //         "handin",
        //         {
        //             map = destinationId,
        //             focusX = dX,
        //             focusY = dY,
        //             hideHero = false
        //         }),
        //     SOP.FadeOutScreen("blackscreen", 0.5),
        //     SOP.Function(function()
        //                     gWorld:UnlockInput()
        //                  end),
        //     SOP.HandOff(destinationId),
        // }

        // return function(trigger, entity, tX, tY, tLayer)
        //     gWorld:LockInput()
        //     local storyboard = Storyboard:Create(gStack, storyboard, true)
        //     gStack:Push(storyboard)
        // end
    }

    combat(resolve: any) {
        // return function(trigger, entity, tX, tY, tLayer)

        //     def.background = def.background or "combat_bg_field.png"
        //     def.enemy = def.enemy or { "grunt" }


        //     -- Convert id's to enemy actors
        //     local enemyList = {}
        //     for k, v in ipairs(def.enemy) do
        //         print(v, tostring(gEnemyDefs[v]))
        //         local enemyDef = gEnemyDefs[v]
        //         enemyList[k] = Actor:Create(enemyDef)
        //     end

        //     local combatState = CombatState:Create(gStack,
        //     {
        //         background = def.background,
        //         actors =
        //         {
        //             party = gWorld.mParty:ToArray(),
        //             enemy = enemyList,
        //         },
        //         canFlee = def.canFlee,
        //         OnWin = def.OnWin,
        //         OnDie = def.OnDie

        //     })

        //     local storyboard =
        //     {
        //         SOP.BlackScreen("blackscreen", 0),
        //         SOP.FadeInScreen("blackscreen", 0.5),
        //         SOP.Function(
        //             function()
        //                 gStack:Push(combatState)
        //             end)
        //     }

        //     local storyboard = Storyboard:Create(gStack, storyboard)
        //     gStack:Push(storyboard)
        // end
    }



  // stand(resolve) {
  //   const who = this.map.gameObjects[ this.event.who ];
  //   who.startBehavior({
  //     map: this.map
  //   }, {
  //     type: "stand",
  //     direction: this.event.direction,
  //     time: this.event.time
  //   })
    
  //   //Set up a handler to complete when correct person is done walking, then resolve the event
  //   const completeHandler = e => {
  //     if (e.detail.whoId === this.event.who) {
  //       document.removeEventListener("PersonStandComplete", completeHandler);
  //       resolve();
  //     }
  //   }
  //   document.addEventListener("PersonStandComplete", completeHandler)
  // }

  // walk(resolve) {
  //   const who = this.map.gameObjects[ this.event.who ];
  //   who.startBehavior({
  //     map: this.map
  //   }, {
  //     type: "walk",
  //     direction: this.event.direction,
  //     retry: true
  //   })

  //   //Set up a handler to complete when correct person is done walking, then resolve the event
  //   const completeHandler = e => {
  //     if (e.detail.whoId === this.event.who) {
  //       document.removeEventListener("PersonWalkingComplete", completeHandler);
  //       resolve();
  //     }
  //   }
  //   document.addEventListener("PersonWalkingComplete", completeHandler)

  // }

  // textMessage(resolve) {

  //   if (this.event.faceHero) {
  //     const obj = this.map.gameObjects[this.event.faceHero];
  //     obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
  //   }

  //   const message = new TextMessage({
  //     text: this.event.text,
  //     onComplete: () => resolve()
  //   })
  //   message.init( document.querySelector(".game-container") )
  // }

  // changeMap(resolve) {

  //   //Deactivate old objects
  //   Object.values(this.map.gameObjects).forEach(obj => {
  //     obj.isMounted = false;
  //   })

  //   const sceneTransition = new SceneTransition();
  //   sceneTransition.init(document.querySelector(".game-container"), () => {
  //     this.map.overworld.startMap( window.OverworldMaps[this.event.map], {
  //       x: this.event.x,
  //       y: this.event.y,
  //       direction: this.event.direction,
  //     });
  //     resolve();
  //     sceneTransition.fadeOut();
  //   })
  // }

  // battle(resolve) {
  //   const battle = new Battle({
  //     enemy: Enemies[this.event.enemyId],
  //     arena: this.event.arena || null,
  //     onComplete: (didWin) => {
  //       resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE");
  //     }
  //   })
  //   battle.init(document.querySelector(".game-container"));

  // }

  pause(resolve: any) {
    this.map.isPaused = true;
    
    const menu = new GameMenu({
      progress: null,
      onComplete: () => {
          resolve()
          console.log("Menu complete!");
          this.map.isPaused = false;
          this.map.game.startGameLoop();
      }
    });
    // const menu = new GameMenu({
    //   progress: this.map.overworld.progress,
    //   onComplete: () => {
    //     resolve();
    //     this.map.isPaused = false;
    //     this.map.overworld.startGameLoop();
    //   }
    // });
    menu.init(document.querySelector("#menu-container"));
  }

  // addStoryFlag(resolve) {
  //   window.playerState.storyFlags[this.event.flag] = true;
  //   resolve();
  // }

  // craftingMenu(resolve) {
  //   const menu = new CraftingMenu({
  //     pizzas: this.event.pizzas,
  //     onComplete: () => {
  //       resolve();
  //     }
  //   })
  //   menu.init(document.querySelector(".game-container"))
  // }

  init() {
    return new Promise(resolve => {
      const eventType: keyof GameEvent = this.event;
      this[eventType](resolve);
      // if (typeof this[this.event] === "function") {
      //   this[this.event](resolve);
      // }
      // this[this.event.type](resolve)      
    })
  }

}

// And, similar to the finite state machine, the event handler methods are small, 
// simple methods that coordinate what should happen in response to that event:

// For example, when the PLAYER_FIRE event occurs, a new weapon should be created:

// onPlayerFire: function(player) {
//   this.map.addWeapon(player.x, player.y, player.type.weapon, player.dir, player);
// },
// … or, when the PLAYER_EXIT event occurs we should start the next level:

// onPlayerExit: function(player) {
//   if (!this.map.last)
//     this.nextLevel();
// },
// … or, when the DOOR_OPEN event occurs, the door should be removed from the map:

// onDoorOpen: function(door) {
//   this.map.remove(door);
// },
// … or, when the WEAPON_COLLIDE event occurs, something should get hurt:

// onWeaponCollide: function(weapon, entity) {
//   var x = weapon.x + (entity.x ? (entity.x - weapon.x)/2 : 0),
//       y = weapon.y + (entity.y ? (entity.y - weapon.y)/2 : 0);

//   if (weapon.type.player && (entity.monster || entity.generator))
//     entity.hurt(weapon.type.damage, weapon);
//   else if (weapon.type.monster && entity.player)
//     entity.hurt(weapon.type.damage, weapon);
//   else if (weapon.type.monster && entity.monster)
//     entity.hurt(1, weapon);

//   this.map.addFx(x, y, FX.WEAPON_HIT);
//   this.map.remove(weapon);
// },
// … or, when the PLAYER_COLLIDE event occurs, the player should get hurt or rewarded, depending on what it collided with:

// onPlayerCollide: function(player, entity) {
//   if (entity.monster || entity.generator)
//     entity.hurt(player.type.damage, player);
//   else if (entity.treasure)
//     player.collect(entity);
//   else if (entity.door && player.keys && entity.open())
//     player.keys--;
//   else if (entity.exit)
//     player.exit(entity);
// },
