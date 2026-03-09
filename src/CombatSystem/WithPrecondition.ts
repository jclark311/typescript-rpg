import ICondition, { Probability} from "./ICondition";
import Battle from "./Battle";
import IMove from "./IMove";
import Move from "./Move";
import Attempt from "./Attempt";
import { FormulaDamage, NoEffect } from "./IEffect";
import { Exactly } from "./INumber";

class BattleCondition implements ICondition<Battle> {
    check(): boolean {
        return false;
    }
}

export default class WithPrecondition implements IMove {
    condition: ICondition<Battle>;
    move: IMove;

    constructor(condition: ICondition<Battle>, move: IMove) {
        this.condition = condition;
        this.move = move;
    }

    execute(battle: Battle): void {
        this.move.execute(battle);
    }
}

class Stun extends WithPrecondition {
    execute(battle: Battle): void {
        super.execute(battle);
    }
}

const battle = new Battle();
const battleCondition = new BattleCondition();

const tackleAttempt = new Attempt(
    // onHit: IEffect, accuracy: ICondition<Battle>, onMiss: IEffect, after: IEffect
    new FormulaDamage(new Exactly(20)), new Probability(), new NoEffect(), new NoEffect()
)
const tackle = new Move(
    "Tackle", tackleAttempt
)
// const move = new Move();
const stun = new Stun(battleCondition, tackle);
stun.execute(battle);

/**
 * The base Component interface defines operations that can be altered by
 * decorators.
 */
interface Component {
    operation(): string;
}

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

/**
 * The base Decorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 */
class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    /**
     * The Decorator delegates all work to the wrapped component.
     */
    public operation(): string {
        return this.component.operation();
    }
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class ConcreteDecoratorA extends Decorator {
    /**
     * Decorators may call parent implementation of the operation, instead of
     * calling the wrapped object directly. This approach simplifies extension
     * of decorator classes.
     */
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 */
class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

/**
 * The client code works with all objects using the Component interface. This
 * way it can stay independent of the concrete classes of components it works
 * with.
 */
function clientCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

/**
 * This way the client code can support both simple components...
 */
const simple = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);