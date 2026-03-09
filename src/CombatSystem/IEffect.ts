import Battle from "./Battle";
import { ITarget } from "./ITarget";
import ICondition from "./ICondition";
import INumber from "./INumber";

// Supertype
// apply method takes a Battle and mutates an effect into it
/**
 * @implements {IEffect}
 */
export default interface IEffect {
    apply(battle: Battle): void;
}

// 
// Subtypes
// 

// Sequence and Condition are Combinators
// They combine multiple effects

// Sequence is an effect that applies a sequence of effects
/**
 * @implements {IEffect}
 * Applies all effects in a sequence
 * Store multiple effects instead of applying each individually
 */
class Sequence implements IEffect {
    effects: IEffect[];

    constructor() {
        this.effects = [];
    }

    apply(battle: Battle): void {
        // 
    }
}

// Conditional Effects
// An "if"
// If a condition passes, run the condition stored in onPass
// If condition fails, run the condition store in onFail
// Condition is both a Context for IEffect strategies and an IEffect Strategy
class Condition implements IEffect {
    condition: ICondition<Battle>;
    onPass: IEffect; 
    onFail: IEffect;

    constructor(condition: ICondition<Battle>, onPass: IEffect, onFail: IEffect) {
        this.condition = condition;
        this.onPass = onPass;
        this.onFail = onFail;
    }

    apply(battle: Battle): void {
        // 
    }
}

// Null Object
// Can use as default onFail effect of Condition
// Has no effect when applied to a Battle
export class NoEffect implements IEffect {
    apply(battle: Battle): void {
        // 
    }
}

class Faint implements IEffect {
    target: ITarget;

    constructor(target: ITarget) {
        this.target = target;
    }

    apply(battle: Battle): void {
        // 
    }
}

class Drain implements IEffect {
    target: ITarget;
    amount: INumber;

    constructor(target: ITarget, amount: INumber) {
        this.target = target;
        this.amount = amount;
    }

    apply(battle: Battle): void {
        // 
    }
}

// Calculates damage
// Checks things like attack level, defense level,
// attack type, bonuses
export class FormulaDamage implements IEffect {
    damage: INumber;

    constructor(damage: INumber) {
        this.damage = damage;
    }

    apply(battle: Battle): void {
        // 
    }
}

// Unlike FormulaDamage, applies damage without considering armor, resistances, etc
class DirectDamage implements IEffect {
    target: ITarget;
    amount: number;

    constructor(target: ITarget, amount: number) {
        this.target = target;
        this.amount = amount;
    }

    apply(battle: Battle): void {
        // 
    }
}

// Immediate kills a Target
// Ignores HP
class OneHitKnockout implements IEffect {
    target: ITarget;

    constructor(target: ITarget) {
        this.target = target;
    }

    apply(battle: Battle): void {
        // 
    }
}

// Context for INumber concretions
class RestoreHP implements IEffect {
    target: ITarget;
    amount: INumber;

    constructor(target: ITarget, amount: INumber) {
        this.target = target;
        this.amount = amount;
    }

    /**
     * Usually, the Context allows replacing a Strategy object at runtime.
     * Might not be necessary
     */
    public setStrategy(amount: INumber) {
        this.amount = amount;
    }

    apply(battle: Battle): void {
        // Target takes in a Battle
        // Returns a Battler
        const battler = this.target.resolve(battle);
        // INumber takes in a Battle and returns a number
        const hpToRestore = this.amount.evaluate(battle);
        battler.hp += hpToRestore;
    }
}

// IEffect that can alter an attacks stats
// target - ITarget to apply IEffect
// amount - amount to alter target stat
class AttackStatChange implements IEffect {
    target: ITarget;
    amount: number;

    constructor(target: ITarget, amount: number) {
        this.target = target;
        this.amount = amount;
    }

    apply(battle: Battle): void {
        // 
    }
}



// Ideas to adapt

// window.Actions = {
//   damage1: {
//     name: "Whomp!",
//     description: "Pillowy punch of dough",
//     success: [
//       { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
//       { type: "animation", animation: "spin"},
//       { type: "stateChange", damage: 10}
//     ]
//   },
//   saucyStatus: {
//     name: "Tomato Squeeze",
//     description: "Applies the Saucy status",
//     targetType: "friendly",
//     success: [
//       { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
//       { type: "stateChange", status: { type: "saucy", expiresIn: 3 } }
//     ]
//   },
//   clumsyStatus: {
//     name: "Olive Oil",
//     description: "Slippery mess of deliciousness",
//     success: [
//       { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
//       { type: "animation", animation: "glob", color: "#dafd2a" },
//       { type: "stateChange", status: { type: "clumsy", expiresIn: 3 } },
//       { type: "textMessage", text: "{TARGET} is slipping all around!"},
//     ]
//   },
//   //Items
//   item_recoverStatus: {
//     name: "Heating Lamp",
//     description: "Feeling fresh and warm",
//     targetType: "friendly",
//     success: [
//       { type: "textMessage", text: "{CASTER} uses a {ACTION}!"},
//       { type: "stateChange", status: null },
//       { type: "textMessage", text: "Feeling fresh!", },
//     ]
//   },
//   item_recoverHp: {
//     name: "Parmesan",
//     targetType: "friendly",
//     success: [
//       { type:"textMessage", text: "{CASTER} sprinkles on some {ACTION}!", },
//       { type:"stateChange", recover: 10, },
//       { type:"textMessage", text: "{CASTER} recovers HP!", },
//     ]
//   },
// }