import IGameState from "./GameState";
import Stack from "../Stack";
import FiniteStateMachine from "./FiniteStateMachine";

// Concrete states
export default class MenuState implements IGameState {
  enter() { console.log("Entering Menu State"); }
  execute() { console.log("Executing Menu State"); }
  exit() { console.log("Exiting Menu State"); }
}

type SelectionsConfig = {
    data: { id: string, text: string }[],
    renderItem(args: any): void;
    onSelection(args: any): void;
}

class FrontMenuState implements IGameState {
    parent?: IGameState;
    stack?: Stack<IGameState>;
    stateMachine?: FiniteStateMachine;
    selections: SelectionsConfig;


    // mSelections = Selection:Create
    // {
    //     spacingY = 32,
    //     data =
    //     {
    //         { id = "items", text = "Items" },
    //         { id = "status", text = "Status" },
    //         { id = "equipment", text = "Equipment" },
    //         { id = "save", text = "Save" },
    //         { id = "load", text = "Load" }
    //     },
    //     RenderItem = function(...) this:RenderMenuItem(...) end,
    //     OnSelection = function(...) this:OnMenuClick(...) end
    // }

    constructor(parent?: IGameState) {
        this.parent = parent;
        this.stack = parent?.stack;
        this.stateMachine = parent?.stateMachine;

        this.selections = {
            // spacingY = 32,
            data: [
                { id: "items", text: "Items" },
                { id: "status", text: "Status" },
                { id: "equipment", text: "Equipment" },
                { id: "save", text: "Save" },
                { id: "load", text: "Load" }
            ],
            renderItem: function() { 
                // this.renderMenuItem() 
            },
            onSelection: function() { 
                // this.onMenuClick() 
            }
        }
    }

    enter(): void {
        // 
    }

    execute(): void {
        // 
    }

    exit(): void {
        // 
    }
}