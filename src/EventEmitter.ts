// Define an interface for event listeners
export interface EventListener {
    (event: string, data?: any): void;
}

// Simple EventEmitter class
export default class EventEmitter {
    private events: { [key: string]: EventListener[] } = {};

    // Method to register an event listener
    on(event: string, listener: EventListener): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    // Method to emit an event
    emit(event: string, data?: any): void {
        const listeners = this.events[event];
        if (listeners) {
            listeners.forEach(listener => listener(event, data));
        }
    }

    // Method to remove an event listener
    off(event: string, listener: EventListener): void {
        const listeners = this.events[event];
        if (listeners) {
            this.events[event] = listeners.filter(l => l !== listener);
        }
    }
}

// Example usage
// const emitter = new EventEmitter();

// const logEvent = (event: string, data?: any) => {
//     console.log(`Event: ${event}, Data: ${data}`);
// };

// // Register an event listener
// emitter.on('dataReceived', logEvent);

// // Emit an event
// emitter.emit('dataReceived', { message: 'Hello, World!' });

// // Remove the event listener
// emitter.off('dataReceived', logEvent);


// Publish - Subscribe
// In addition to the high level state machine, within the single playing state we should also be able to publish that certain events have occurred. Any other objects within the game can subscribe to be notified of events that are relevent to them, and ignore those events that they don’t care about.

// This keeps our game objects decoupled and minimizes their need to know about each other. The main objects that subscribe to events are:

// game - controls the primary game logic by responding to events
// scoreboard - updates itself when key events occur.
// sounds - are played for many key events.
// player - needs to reset on every START_LEVEL event
// The biggest consumer of events is the primary game object. It uses event handlers to coordinate the game logic itself. The handlers are declared using a small data structure:

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
// And, similar to the finite state machine, the event handler methods are small, simple methods that coordinate what should happen in response to that event:

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
// … and so on, and so forth.