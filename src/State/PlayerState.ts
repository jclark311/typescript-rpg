export default class PlayerState {
    pizzas: { [id: string]: { pizzaId: string; hp: number; maxHp: number; xp: number; maxXp: number; level: number; status: null } };
    lineup: string[];
    items: any[];
    storyFlags: any;

    constructor() {
        this.pizzas = {
            "p1": {
                pizzaId: "s001",
                hp: 50,
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                level: 1,
                status: null,
            },
            // "p2": {
            //   pizzaId: "v001",
            //   hp: 50,
            //   maxHp: 50,
            //   xp: 75,
            //   maxXp: 100,
            //   level: 1,
            //   status: null,
            // },
            // "p3": {
            //   pizzaId: "f001",
            //   hp: 50,
            //   maxHp: 50,
            //   xp: 75,
            //   maxXp: 100,
            //   level: 1,
            //   status: null,
            // }
        }
        this.lineup = ["p1"];
        this.items = [
            { actionId: "item_recoverHp", instanceId: "item1" },
            { actionId: "item_recoverHp", instanceId: "item2" },
            { actionId: "item_recoverHp", instanceId: "item3" },
        ]
        this.storyFlags = {};
    }

    addPizza(pizzaId: string) {
        const newId = `p${Date.now()}`+Math.floor(Math.random() * 99999);
        this.pizzas[newId] = {
            pizzaId,
            hp: 50,
            maxHp: 50,
            xp: 0,
            maxXp: 100,
            level: 1,
            status: null,
        }
        if (this.lineup.length < 3) {
            this.lineup.push(newId)
        }
        // utils.emitEvent("LineupChanged");
    }

    swapLineup(oldId: string, incomingId: string) {
        const oldIndex = this.lineup.indexOf(oldId);
        this.lineup[oldIndex] = incomingId;
        // utils.emitEvent("LineupChanged");
    }

    moveToFront(futureFrontId: string) {
        this.lineup = this.lineup.filter(id => id !== futureFrontId);
        this.lineup.unshift(futureFrontId);
        // utils.emitEvent("LineupChanged");
    }
}
// window.playerState = new PlayerState();