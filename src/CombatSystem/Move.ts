import IMove from "./IMove";
import Battle from "./Battle";
import IAttempt from "./IAttempt";

// Mutates the state of a Battle
// Element, a la elemental damage, melee
export default class Move implements IMove {
    name: string;
    element: any;
    attempt: IAttempt;

    constructor(name: string, attempt: IAttempt) {
        this.name = name;
        this.element = null;
        this.attempt = attempt;
    }

    execute(battle: Battle): void {
        // 
    }
}