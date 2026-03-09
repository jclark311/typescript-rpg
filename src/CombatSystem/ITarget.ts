import Battle from "./Battle";
import Battler from "./Battler";

// A Character selector interface
// Takes a Battle, returns a Battler
// Select one of the two battlers from a given battle
export interface ITarget {
    resolve(battle: Battle): Battler;
}

// Return the selected class as the Attacker
class Attacker implements ITarget {
    resolve(battle: Battle): Battler {
        return new Battler('Attacker');
    }
}

// Return the selected class as the Defender
class Defender implements ITarget {
    resolve(battle: Battle): Battler {
        return new Battler('Defender');
    }
}