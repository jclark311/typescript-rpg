import IMove from "./IMove";
import Battler from "./Battler";
import Battle from "./Battle";
import ICondition from "./ICondition";

// Decorator for Moves
// Context for ICondition<Battler> Strategy
class WithApplicability implements IMove {
    condition: ICondition<Battler>;
    move: IMove;

    constructor(condition: ICondition<Battler>, move: IMove) {
        this.condition = condition;
        this.move = move;
    }

    execute(battle: Battle): void {
        // Checks if ICondition passes
        this.condition.check();
        // If so, it executes the move
        this.move.execute(battle);
    }
}