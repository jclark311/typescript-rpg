import Battle from "./Battle";
import Battler from "./Battler";
import { ITarget } from "./ITarget";

// This is an Object Oriented approach to conditionals
// Delegates, or callbacks in Javascript, might be a better approach

// ICondition uses Strategy Pattern
// Impure Predicates - functions that mutate
// Because we use Generics (<T>), we have defined multiple abstractions
// Multiple cases of the Strategy Pattern from one supertype
export default interface ICondition<T> {
    check(data?: T): boolean;
}

// Implements and uses ICondition
// Perhaps And should extend from another class
// Or other classes extend this
class And<U> implements ICondition<U> {
    condition: ICondition<U>;

    constructor(condition: ICondition<U>) {
        this.condition = condition;
    }

    // If using a condition property is the right way to do this
    check(data?: U | undefined): boolean {
        return this.condition.check(data);
    }
}

class Or<U> implements ICondition<U> {
    check(data?: U | undefined): boolean {
        return false;
    }
}

class Not<U> implements ICondition<U> {
    check(data?: U | undefined): boolean {
        return false;
    }
}

export class Probability<U> implements ICondition<U> {
    check(data?: U | undefined): boolean {
        return false;
    }
}

class LessThanOrEqual<Number> implements ICondition<Number> {
    check(data?: Number | undefined): boolean {
        return false;
    }
}

class GreaterThanOrEqual<Number> implements ICondition<Number> {
    check(data?: Number | undefined): boolean {
        return false;
    }
}

// interface ICondition<Number> {}



/**
 * Implements ICondition<Battle>
 * Uses ICondition<Battler>
 * Concept called lifting from Category theory
 * Can lift the <Battler> condition to the level of a <Battle> condition
 * Use the target interface to select Attacker or Defender (or any future ITarget subtypes
 * Check method does the comparison
 * The For class allows us to check any Battler for HasElement of IsParalyzed, etc
 * Don't have to configure it on each Battler, ie: AttackerHasElement, DefenderHasElement
 */
class For<Battle> implements ICondition<Battle> {
    target: ITarget;

    constructor(target: ITarget) {
        this.target = target;
    }

    check(data?: Battle | undefined): boolean {
        return false;
    }
}

// Does the <Battler> passed to the class have the element or not
class HasElement<Battler> implements ICondition<Battler> {
    forTarget: For<Battle>;

    // Not sure this is how to instantiate
    // constructor(battle: Battle) {
    //     this.forTarget = new For(battle);
    // }

    constructor(forTarget: For<Battle>) {
        this.forTarget = forTarget;
    }

    check(data?: Battler | undefined): boolean {
        return false;
    }
}

class IsParalyzed<Battler> implements ICondition<Battler> {
    forTarget: For<Battle>;

    // Not sure this is how to instantiate
    // constructor(battle: Battle) {
    //     this.forTarget = new For(battle);
    // }

    constructor(forTarget: For<Battle>) {
        this.forTarget = forTarget;
    }

    check(data?: Battler | undefined): boolean {
        return false;
    }
}
