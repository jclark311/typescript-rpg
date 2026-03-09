import State from "./State";
import IStateContext from "./IStateContext";

/**
 * EN: Real World Example for the State design pattern
 *
 * Need: To implement a controller for a multi-product vending machine
 *
 * Solution: To create a finite state machine that controls the possible states and transitions.
 */

/**
 * EN: Some auxiliary interfaces
 */
interface Coin {
    name: string;
    value: number;
}

interface Product {
    name: string;
    value: number;
}

interface InventoryItem {
    product: Product;
    items: number;
}

interface Inventory
{
    items: InventoryItem[];
}

interface IShopContext {

}

interface IShopState {
    context: IShopContext;

    setContext(context: IShopContext): void;
    insertCoin(coin: Coin): void;
    selectProduct(product: Product): void;
}

/**
 * EN: Constants to reuse throughtout the application
 */
const SODA: Product = {
    name: 'Soda',
    value: 15,
};
const NUTS: Product = {
    name: 'Nuts',
    value: 25,
};

const INITIAL_INVENTORY: Inventory = {
    items: [
        { product: SODA, items: 2 },
        { product: NUTS, items: 0 },
    ],
};

const NICKEL = { name: 'nickel', value: 5 };
const DIME = { name: 'dime', value: 10 };

class ShopContext {
    private state: IShopState;
    private credit: number = 0;
    private inventory: Inventory = INITIAL_INVENTORY;

    constructor(initalState: IShopState) {
        this.state = initalState;
    }

    setState(state: IShopState) {
        this.state = state;
    }

    /**
     * EN: Some context public methods that the state will interact with
     */
    public addCredit(credit: number) {
        this.credit += credit;
        console.log(`Credit is now ${this.credit}`);
    }

    public resetCredit() {
        this.credit = 0;
        console.log('Credit has been reset');
    }

    public hasStockOf(product: Product): boolean {
        return this.inventory.items.some(i => i.product.name === product.name && i.items > 0);
    }

    public isOutOfStock(): boolean {
        return !this.inventory.items.some(i => i.items > 0);
    }

    public dispenseProduct(product: Product) {
        if (product.value > this.credit) {
            throw new Error(`You are trying to buy a product with price ${product.value} but your credit is only ${this.credit}`);
        }
        if (!this.hasStockOf(product)) {
            throw new Error(`No ${product.name} products left, select another one`);
        }
        const inventoryItem = this.inventory.items.find(i => i.product.name === product.name);
        const newInventoryItem = {
            product,
            items: inventoryItem!.items - 1,
        };
        const restOfInventory = this.inventory.items.filter(i => i.product.name !== product.name);
        this.inventory.items = [...restOfInventory, newInventoryItem];
        console.log(`Product ${product.name} dispensed. Inventory is now:`, this.inventory.items);
        this.resetCredit();
    }

    /**
     * EN: The Context allows changing the State object at runtime.
     */
    public transitionTo(state: IShopState): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    /**
     * EN: The Context delegates part of its behavior to the current State
     */
    public insertCoin(coin: Coin): void {
        this.state.insertCoin(coin);
    }

    public selectProduct(product: Product): void {
        this.state.selectProduct(product);
    }
}

/**
 * EN: The Context defines the interface of interest to clients. It also
 * maintains a reference to an instance of a State subclass, which represents
 * the current state of the Context.
 */
// export class ShopStateContext implements IStateContext {
//     /**
//      * EN: A reference to the current state
//      */
//     state!: State;
//     private credit: number = 0;
//     private inventory: Inventory = INITIAL_INVENTORY;

//     constructor(state: State) {
//         this.transitionTo(state);
//     }

//     /**
//      * EN: Some context public methods that the state will interact with
//      */
//     public addCredit(credit: number) {
//         this.credit += credit;
//         console.log(`Credit is now ${this.credit}`);
//     }

//     public resetCredit() {
//         this.credit = 0;
//         console.log('Credit has been reset');
//     }

//     public hasStockOf(product: Product): boolean {
//         return this.inventory.items.some(i => i.product.name === product.name && i.items > 0);
//     }

//     public isOutOfStock(): boolean {
//         return !this.inventory.items.some(i => i.items > 0);
//     }

//     public dispenseProduct(product: Product) {
//         if (product.value > this.credit) {
//             throw new Error(`You are trying to buy a product with price ${product.value} but your credit is only ${this.credit}`);
//         }
//         if (!this.hasStockOf(product)) {
//             throw new Error(`No ${product.name} products left, select another one`);
//         }
//         const inventoryItem = this.inventory.items.find(i => i.product.name === product.name);
//         const newInventoryItem = {
//             product,
//             items: inventoryItem.items - 1,
//         };
//         const restOfInventory = this.inventory.items.filter(i => i.product.name !== product.name);
//         this.inventory.items = [...restOfInventory, newInventoryItem];
//         console.log(`Product ${product.name} dispensed. Inventory is now:`, this.inventory.items);
//         this.resetCredit();
//     }

//     /**
//      * EN: The Context allows changing the State object at runtime.
//      */
//     public transitionTo(state: State): void {
//         console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
//         this.state = state;
//         this.state.setContext(this);
//     }

//     /**
//      * EN: The Context delegates part of its behavior to the current State
//      */
//     public insertCoin(coin: Coin): void {
//         this.state.insertCoin(coin);
//     }

//     public selectProduct(product: Product): void {
//         this.state.selectProduct(product);
//     }
// }

// class ShopState extends State {
//     constructor() {
//         super()
//         this.setContext(new ShopStateContext(this))
//     }
// }

/**
 * EN: We will implement only 3 states. States are only responsible for the
 * state transitions. We will delegate all the actions to the context,
 * following the 'tell don't ask' principle.
 */
// class InitialReadyState extends State {
//     public insertCoin(coin: Coin): void {
//         this.context.addCredit(coin.value);
//         this.context.transitionTo(new TransactionStarted());
//     }

//     public selectProduct(_: Product): void {
//         throw new Error('You should insert coins before selecting the product');
//     }
// }

// class TransactionStarted extends State {
//     public insertCoin(coin: Coin): void {
//         this.context.addCredit(coin.value);
//     }

//     public selectProduct(product: Product): void {
//         this.context.dispenseProduct(product);

//         if (this.context.isOutOfStock()) {
//             this.context.transitionTo(new OutOfStock());
//         } else {
//             this.context.transitionTo(new InitialReadyState());
//         }
//     }
// }

// class OutOfStock extends State {
//     public insertCoin(_: Coin): void {
//         throw new Error('Stop inserting coins, we completely run out of stock');
//     }
//     public selectProduct(_: Product): void {
//         throw new Error('Stop selecting products, we completely run of stock');
//     }
// }








/**
 * EN: The client code should handle edge cases and errors, in this case, only
 * to log them to the console output
 */
// const context = new VendingMachineContext(new InitialReadyState());

// const handleError = (error) => {
//     console.error(error.message);
// };

// try {
//     context.selectProduct(NUTS);
// } catch (error) {
//     handleError(error);
// }
// context.insertCoin(DIME);
// try {
//     context.selectProduct(SODA);
// } catch (error) {
//     handleError(error);
// }
// context.insertCoin(NICKEL);
// context.selectProduct(SODA);

// context.insertCoin(DIME);
// context.insertCoin(NICKEL);
// try {
//     context.selectProduct(SODA);
// } catch (error) {
//     handleError(error);
// }
// try {
//     context.insertCoin(NICKEL);
// } catch (error) {
//     handleError(error);
// }




// class ShopMenu {
//     render() {
//         const element = document.createElement('div');
//         element.innerHTML = (`
//             <div>
//                 <div><h2>Item Shop</h2></div>
//                 <div>
//                     <span>Buy</span> 
//                     <span>> Sell</span> 
//                     <span>Exit</span>
//                 </div>
//             </div>
//             <div>
//                 <div>* Sword 100 GP</div>     
//                 <div>Gold: 00</div>
//             </div>
//             <div>
//                 <div>* Axe 100 GP</div>       
//                 <div>Equipped: 00</div>
//             </div>
//             <div>
//                 <div>* Dagger 100 GP</div>    
//                 <div>Inventory: 00</div>
//             </div>
//             <div>Item Description </div>
//             <div>Character1 Icon Character2 Icon Character3 Icon</div>
//         `)
//         document.body.appendChild(element);
//     }
// }


// class ShopState {
//     stack: any;
//     actors: any;
//     world: any;
//     def: any;
//     state: string;
//     tabs: { [id: string]: number};
//     chooseSelection: any;
//     stock: any;
//     inventory: any;

//     constructor(stack: any, world: any, def: any) {
//         this.stack = stack;
//         this.world = world;
//         this.def = def;
        
//         this.actors = {};

//         this.state = "choose"; // "choose", "buy", "sell"
//         this.tabs = {
//             "buy": 1,
//             "sell": 2,
//             "exit": 3,
//         };
//         this.chooseSelection = {
//             data: [
//                 "Buy",
//                 "Sell",
//                 "Exit",
//             ],
//             rows: 1,
//             columns: 3,
//             onSelection: function(args: any) { this.chooseClick(args) },
//         },
//         this.stock = {
//             data: def.stock,
//             displayRows: 5,
//             renderItem: function(args: any) { this.renderStock(args) },
//             onSelection: function(args: any) { this.onBuy(args) },

//         };
//         this.inventory = null;
        // mScrollbar = Scrollbar:Create(Texture.Find("scrollbar.png"), 145),
        // mFilterList =
        // {
        //     ['all'] = function(def) return true end,
        //     ['arms'] = function(def)
        //         return def.type == 'armor' or def.type == 'weapon'
        //     end,
        //     ['support'] = function(def)
        //         return def.type == 'useable'
        //     end
        // },
        // mCanUseSprite = Sprite.Create(),
        // -- Used every frame
        // mItemInvCount = 0,
        // mItemEquipCount,
        // mItemDescription = 0,
//     }
// }

// Shop Menu Design
// [[ Shop Title ] [ Buy > Sell Exit ]]
// [[ * Sword 100 GP ] [ Gold: 00 ]]
// [[ * Axe 100 GP ] [ Equipped: 00 ]]
// [[ * Dagger 100 GP ] [ Inventory: 00 ]]
// [[ Item Description ]]
// [[ Character1 Icon Character2 Icon Character3 Icon ]]

// Shop States
// if self.mState == "choose" then

//     self:RenderChooseFocus(renderer)
//     self:SetItemData(nil)

// elseif self.mState == "buy" then

//     local buyMessage = "What would you like?"
//     renderer:AlignText("center", "center")
//     renderer:DrawText2d(x, y, buyMessage)
//     renderer:AlignText("left", "center")
//     self.mStock:Render(renderer)
//     local item = self.mStock:SelectedItem()
//     self:SetItemData(item)
//     self:UpdateScrollbar(renderer, self.mStock)

// elseif self.mState == "sell" then
//     local sellMessage = "Show me what you have."
//     renderer:AlignText("center", "center")
//     renderer:DrawText2d(x, y, sellMessage)
//     renderer:AlignText("left", "center")
//     self.mInventory:Render(renderer)
//     local item = self.mInventory:SelectedItem()
//     self:SetItemData(item)
//     self:UpdateScrollbar(renderer, self.mInventory)
// end