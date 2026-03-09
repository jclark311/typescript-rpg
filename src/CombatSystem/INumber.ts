import Battle from "./Battle";
import { ITarget } from "./ITarget";

// INumber uses the Strategy Pattern and Composite Pattern

// Supertype
// Abstract a number without knowing it's value
// Strategy interface for INumber concretions
// INumber is the Component interface for 
export default interface INumber {
    evaluate(battle: Battle): number;
}

// Combinators
// Contains INumbers and implements INumber
// Combinators are Composites
// They Compose INumber objects

// Return the product of values passed in
class Product implements INumber {
    value1: INumber;
    value2: INumber;

    constructor(value1: INumber, value2: INumber) {
        this.value1 = value1;
        this.value2 = value2;
    }

    evaluate(battle: Battle): number {
        return this.value1.evaluate(battle) * this.value2.evaluate(battle);
    }
}

// Return the sum of values passed in
class Sum implements INumber {
    value1: INumber;
    value2: INumber;

    constructor(value1: INumber, value2: INumber) {
        this.value1 = value1;
        this.value2 = value2;
    }

    evaluate(battle: Battle): number {
        return this.value1.evaluate(battle) + this.value2.evaluate(battle);
    }
}

// Return the quotient (result of division) of values passed in
class Quotient implements INumber {
    value1: INumber;
    value2: INumber;

    constructor(value1: INumber, value2: INumber) {
        this.value1 = value1;
        this.value2 = value2;
    }

    evaluate(battle: Battle): number {
        return this.value1.evaluate(battle) / this.value2.evaluate(battle);
    }
}

// General Concretions
// Leafs for Composite Pattern
// Don't contain INumber objects

// Takes a number and returns it
// Acts as a constant - doesn't change value
export class Exactly implements INumber {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    evaluate(battle: Battle): number {
        return this.amount;
    }
}

// Gives us a random number between min and max
class Between implements INumber {
    min: number;
    max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    evaluate(battle: Battle): number {
        return 0;
    }
}

// Weighted distribution to return number between min and max
// ie: 25% for this number 75% for another number
// Pass in key/value pairs with amount and percentage
class Weighted implements INumber {


    evaluate(battle: Battle): number {
        return 0;
    }
}

// Pokemon Game Specific Subtypes
// Takes an ITarget

// Checks the MaxHP of the target within the Battle
class MaxHP implements INumber {
    target: ITarget;

    constructor(target: ITarget) {
        this.target = target;
    }

    evaluate(battle: Battle): number {
        return 0;
    }
}

// Checks the CurrentHP of the target within the Battle
class CurrentHP implements INumber {
    target: ITarget;

    constructor(target: ITarget) {
        this.target = target;
    }

    evaluate(battle: Battle): number {
        return 0;
    }
}

// Checks the Level of the target within the Battle
class Level implements INumber {
    target: ITarget;

    constructor(target: ITarget) {
        this.target = target;
    }

    evaluate(battle: Battle): number {
        return 0;
    }
}

class LastDamageDealt implements INumber {
    target: ITarget;

    constructor(target: ITarget) {
        this.target = target;
    }

    evaluate(battle: Battle): number {
        return 0;
    }
}


// Composite Pattern

/**
 * The base Component class declares common operations for both simple and
 * complex objects of a composition.
 */
abstract class Component {
    protected parent!: Component | null;

    /**
     * Optionally, the base Component can declare an interface for setting and
     * accessing a parent of the component in a tree structure. It can also
     * provide some default implementation for these methods.
     */
    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    /**
     * In some cases, it would be beneficial to define the child-management
     * operations right in the base Component class. This way, you won't need to
     * expose any concrete component classes to the client code, even during the
     * object tree assembly. The downside is that these methods will be empty
     * for the leaf-level components.
     */
    public add(component: Component): void { }

    public remove(component: Component): void { }

    /**
     * You can provide a method that lets the client code figure out whether a
     * component can bear children.
     */
    public isComposite(): boolean {
        return false;
    }

    /**
     * The base Component may implement some default behavior or leave it to
     * concrete classes (by declaring the method containing the behavior as
     * "abstract").
     */
    public abstract operation(): string;
}

/**
 * The Leaf class represents the end objects of a composition. A leaf can't have
 * any children.
 *
 * Usually, it's the Leaf objects that do the actual work, whereas Composite
 * objects only delegate to their sub-components.
 */
class Leaf extends Component {
    public operation(): string {
        return 'Leaf';
    }
}

/**
 * The Composite class represents the complex components that may have children.
 * Usually, the Composite objects delegate the actual work to their children and
 * then "sum-up" the result.
 */
class Composite extends Component {
    protected children: Component[] = [];

    /**
     * A composite object can add or remove other components (both simple or
     * complex) to or from its child list.
     */
    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    /**
     * The Composite executes its primary logic in a particular way. It
     * traverses recursively through all its children, collecting and summing
     * their results. Since the composite's children pass these calls to their
     * children and so forth, the whole object tree is traversed as a result.
     */
    public operation(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.operation());
        }

        return `Branch(${results.join('+')})`;
    }
}

/**
 * The client code works with all of the components via the base interface.
 */
function clientCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

/**
 * This way the client code can support the simple leaf components...
 */
const simple = new Leaf();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ...as well as the complex composites.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');

/**
 * Thanks to the fact that the child-management operations are declared in the
 * base Component class, the client code can work with any component, simple or
 * complex, without depending on their concrete classes.
 */
function clientCode2(component1: Component, component2: Component) {
    // ...

    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log(`RESULT: ${component1.operation()}`);

    // ...
}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple);



// RestoreHP Subclass of IEffect is an example of a context

// Strategy Pattern
// Definition:
// Defines a family of algorithms
// Encapsulates each one
// Makes them interchangeable
// Strategy lets the algorithm vary independently from the clients that use them

// Three parts:

// 1. Context
// The class that uses the Strategy and runs the algorithm
// Keeps a reference to a Strategy object
// Delegates work to that Strategy object

// 2. Strategy
// A common interface that defines the signature of the algorithm
// Defines how we can call the algorithm of which there are many variations
// All Concrete Strategies implement the Strategy interface

// 3. Concrete Strategies
// The different algorithms
// Subtypes of the Strategy interface that the Context can use
// Concrete Strategies are dependency injected into the Context class
// Context can use that algorithm without knowing how it works or which algorithm it is

/**
 * The Context defines the interface of interest to clients.
 */
class Context {
    /**
     * @type {Strategy} The Context maintains a reference to one of the Strategy
     * objects. The Context does not know the concrete class of a strategy. It
     * should work with all strategies via the Strategy interface.
     */
    private strategy: Strategy;

    /**
     * Usually, the Context accepts a strategy through the constructor, but also
     * provides a setter to change it at runtime.
     */
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * Usually, the Context allows replacing a Strategy object at runtime.
     */
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * The Context delegates some work to the Strategy object instead of
     * implementing multiple versions of the algorithm on its own.
     */
    public doSomeBusinessLogic(): void {
        // ...

        console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
        const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));

        // ...
    }
}

/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
interface Strategy {
    doAlgorithm(data: string[]): string[];
}

/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 */
class ConcreteStrategyA implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.sort();
    }
}

class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.reverse();
    }
}

/**
 * The client code picks a concrete strategy and passes it to the context. The
 * client should be aware of the differences between strategies in order to make
 * the right choice.
 */
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();