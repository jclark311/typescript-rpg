import Battle from "./Battle"

export default interface IAttempt {
    execute(battle: Battle): void
}