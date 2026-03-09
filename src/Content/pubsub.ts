import { EVENT } from "./events";

console.log(EVENT.START_LEVEL); // Output: 0

// export const pubsub = [
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
// ]