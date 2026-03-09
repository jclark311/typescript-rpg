import IStateContext from "./IStateContext";

/**
 * EN: The base State class declares methods that all Concrete State should
 * implement and also provides a backreference to the Context object, associated
 * with the State. This backreference can be used by States to transition the
 * Context to another State.
 */
export default abstract class State {
    protected context!: IStateContext;

    public setContext(context: IStateContext) {
        this.context = context;
    }
}