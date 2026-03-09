import Battle from "./Battle";

export default interface IMove {
    // Returning void means we mutate Battle state
    // Return Battle would make it immutable
    execute(battle: Battle): void
}