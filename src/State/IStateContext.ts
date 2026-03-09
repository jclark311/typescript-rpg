import State from "./State";

export default interface IShopStateContext {
    /**
     * EN: A reference to the current state
     */
    state: State;

    /**
     * EN: The Context allows changing the State object at runtime.
     */
    transitionTo(state: State): void;
}