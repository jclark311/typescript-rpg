import Battle from "./Battle";
import ICondition from "./ICondition";
import IEffect from "./IEffect";
import IAttempt from "./IAttempt";
import INumber from "./INumber";

class Effect implements IEffect {
    apply(): void {
        // 
    }
}

// Context class for IEffect strategy
export default class Attempt implements IAttempt {
    animation: any;
    accuracy: ICondition<Battle>;
    onHit: IEffect;
    onMiss: IEffect;
    after: IEffect;

    constructor(onHit: IEffect, accuracy: ICondition<Battle>, onMiss: IEffect, after: IEffect) {
        this.onHit = onHit;
        this.accuracy = accuracy;
        this.onMiss = onMiss;
        this.after = after;
    }

    execute(battle: Battle): void {
        // 
    }
}

// An Attempt that carries multiple Attempts
// Each Attempt has it's own chance to hit, damage applied, animation, etc
export class Cascade implements IAttempt {
    attempts: Attempt[];

    constructor() {
        this.attempts = [];
    }

    execute(battle: Battle): void {
        // 
    }
}

// One Attempt applied multiple times
// Context class for INumber strategy
export class Combo implements IAttempt {
    animation: any;
    accuracy: ICondition<Battle>;
    hits: INumber;
    every: IEffect;

    constructor(accuracy: ICondition<Battle>, hits: INumber, every: IEffect) {
        this.accuracy = accuracy;
        this.hits = hits;
        this.every = every;
    }

    execute(battle: Battle): void {
        // INumber takes in a Battle
        // Returns a number
        const numberOfHits = this.hits.evaluate(battle);
    }
}