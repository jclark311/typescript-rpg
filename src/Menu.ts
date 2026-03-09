import { ItemDB } from "./Content/items";
import KeyboardListener from "./KeyboardListener";

type MenuConfig = {
    descriptionContainer?: HTMLElement;
}

export class KeyboardMenu {
    options: { label: string, description: string, handler: () => void, right?: () => string, disabled?: boolean }[];
    element: HTMLElement;
    descriptionContainer: HTMLElement;
    descriptionElement: HTMLElement;
    descriptionElementText: HTMLElement;
    up: KeyboardListener;
    down: KeyboardListener;
    prevFocus: HTMLElement;

    constructor(config: MenuConfig = {}) {
        this.options = []; //set by updater method
        this.up = null;
        this.down = null;
        this.prevFocus = null;
        this.descriptionContainer = config.descriptionContainer || null;
    }

    setOptions(options: any) {
        this.options = options;
        this.element.innerHTML = this.options.map((option, index) => {
            const disabledAttr = option.disabled ? "disabled" : "";
            return (`
                <div class="option">
                    <button ${disabledAttr} data-button="${index}" data-description="${option.description}">
                        ${option.label}
                    </button>
                    <span class="right">${option.right ? option.right() : ""}</span>
                </div>
            `)
        }).join("");

        this.element.querySelectorAll("button").forEach(button => {

            button.addEventListener("click", () => {
                const chosenOption = this.options[ Number(button.dataset.button) ];
                chosenOption.handler();
            })
            button.addEventListener("mouseenter", () => {
                button.focus();
            })
            button.addEventListener("focus", () => {
                this.prevFocus = button;
                this.descriptionElementText.innerText = button.dataset.description;
            })
        })

        setTimeout(() => {
            const firstEnabledButton = this.element.querySelector("button[data-button]:not([disabled])") as HTMLButtonElement;
            firstEnabledButton.focus();
        }, 10)
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("KeyboardMenu");

        // Description box element
        this.descriptionElement = document.createElement("div");
        this.descriptionElement.classList.add("DescriptionBox");
        this.descriptionElement.innerHTML = (`<p>I will provide information!</p>`);
        this.descriptionElementText = this.descriptionElement.querySelector("p");
    }

    end() {

        // Remove menu element and description element
        this.element.remove();
        this.descriptionElement.remove();

        // Clean up bindings
        this.up.unbind();
        this.down.unbind();
    }

    init(container: HTMLElement) {
        this.createElement();
        (this.descriptionContainer || container).appendChild(this.descriptionElement);
        container.appendChild(this.element);

        this.up = new KeyboardListener("ArrowUp", () => {
            const current = Number(this.prevFocus.getAttribute("data-button"));
            const prevButton = Array.from(this.element.querySelectorAll("button[data-button]")).reverse().find((el: HTMLButtonElement) => {
                return Number(el.dataset.button) < current && !el.disabled;
            }) as HTMLButtonElement;
            prevButton?.focus();
        })
        this.down = new KeyboardListener("ArrowDown", () => {
            const current = Number(this.prevFocus.getAttribute("data-button"));
            const nextButton = Array.from(this.element.querySelectorAll("button[data-button]")).find((el: HTMLButtonElement) => {
                return Number(el.dataset.button) > current && !el.disabled;
            }) as HTMLButtonElement;
            nextButton?.focus();
        })

    }

}


type GameMenuConfig = {
    progress?: any;
    onComplete: (data?: any) => void;
}

export class GameMenu {
    element: HTMLElement;
    esc: KeyboardListener;
    progress?: any;
    onComplete: (data?: any) => void;

    // constructor(onComplete: (data?: any) => void) {
    //     this.onComplete = onComplete;
    // }


    constructor({progress, onComplete}: GameMenuConfig) {
        this.progress = progress;
        this.onComplete = onComplete;
    }

//     getOptions(pageKey) {

//         // Case 1: Show the first page of options
//         if (pageKey === "root") {
//             const lineupPizzas = playerState.lineup.map(id => {
//                 const {pizzaId} = playerState.pizzas[id];
//                 const base = Pizzas[pizzaId];
//                 return {
//                     label: base.name,
//                     description: base.description,
//                     handler: () => {
//                         this.keyboardMenu.setOptions( this.getOptions(id) )
//                     }
//                 }
//             })
//             return [
//                 ...lineupPizzas,
//                 {
//                     label: "Save",
//                     description: "Save your progress",
//                     handler: () => {
//                         // this.progress.save();
//                         this.close();
//                     }
//                 },
//                 {
//                     label: "Close",
//                     description: "Close the pause menu",
//                     handler: () => {
//                         this.close();
//                     }
//                 }
//             ]
//         }

//         // Case 2: Show the options for just one pizza (by id)
//         const unequipped = Object.keys(playerState.pizzas).filter(id => {
//             return playerState.lineup.indexOf(id) === -1;
//         }).map(id => {
//             const {pizzaId} = playerState.pizzas[id];
//             const base = Pizzas[pizzaId];
//             return {
//                 label: `Swap for ${base.name}`,
//                 description: base.description,
//                 handler: () => {
//                     playerState.swapLineup(pageKey, id);
//                     this.keyboardMenu.setOptions( this.getOptions("root") );
//                 }
//             }
//         })

//         return [
//             ...unequipped,
//             {
//                 label: "Move to front",
//                 description: "Move this pizza to the front of the list",
//                 handler: () => {
//                     playerState.moveToFront(pageKey);
//                     this.keyboardMenu.setOptions( this.getOptions("root") );
//                 }
//             },
//             {
//                 label: "Back",
//                 description: "Back to root menu",
//                 handler: () => {
//                     this.keyboardMenu.setOptions( this.getOptions("root") );
//                 }
//             }
//         ];
//     }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("GameMenu");
        this.element.classList.add("overlayMenu");
        this.element.innerHTML = (`
            <h2>Game Menu</h2>
        `)
    }

    close() {
        this.esc?.unbind();
//         this.keyboardMenu.end();
        this.element.remove();
        this.onComplete();
    }

    async init(container: HTMLElement) {
        this.createElement();
//         this.keyboardMenu = new KeyboardMenu({
//             descriptionContainer: container
//         })
//         this.keyboardMenu.init(this.element);
//         this.keyboardMenu.setOptions(this.getOptions("root"));
        container.appendChild(this.element);

//         utils.wait(200);
        this.esc = new KeyboardListener("Escape", () => {
            this.close();
        })
    }

}



export class InventoryMenu {}

export class ShopMenu {}

export interface IMenuComponent {
    render(): HTMLElement;
}

export class Button implements IMenuComponent {
    element: HTMLElement;
    onClick: (event: Event) => void;

    constructor(callback: (data?: any) => void, text?: string, className?: string) {
        this.element = document.createElement('button');
        this.onClick = function(event) {
            callback();
        };
        if (text) this.element.innerText = text;
        if (className) { this.element.classList.add(className); }
        
        this.element.addEventListener('click', this.onClick);
    }

    add(text?: string, className?: string): void {
        if (text) this.element.innerText = text;
        if (className) { this.element.classList.add(className); }
    }

    render(): HTMLElement {
        return this.element;
    }
}

export class HeaderText implements IMenuComponent {
    element: HTMLHeadingElement;

    constructor(id: string, label: string) {
        this.element = document.createElement('h2');
        this.element.id = id;
        this.element.textContent = label;
    }

    render(): HTMLHeadingElement {
        return this.element;
    }
}

export class TextField implements IMenuComponent {
    element: HTMLParagraphElement;

    constructor(id: string, label: string) {
        this.element = document.createElement('p');
        this.element.id = id;
        this.element.textContent = label;
    }

    render(): HTMLParagraphElement {
        return this.element;
    }
}

export class MenuImage implements IMenuComponent {
    element: HTMLElement;

    constructor(className: string, src: string) {
        this.element = document.createElement('div');
        this.element.classList.add('image-wrapper');
        const image = new Image();
        image.classList.add(className);
        image.src = src;
        this.element.appendChild(image);
    }

    render(): HTMLElement {
        return this.element;
    }
}

export class List implements IMenuComponent {
    listWrapper: HTMLElement;
    listItems: HTMLElement[];

    constructor(listItems: HTMLElement[]) {
        this.listWrapper = document.createElement('ul');
        this.listWrapper.classList.add('list');
        this.listItems = listItems;
        for (const item of this.listItems) {
            this.listWrapper.appendChild(item);
        }
    }

    render(): HTMLElement {
        return this.listWrapper;
    }
}

export class Section implements IMenuComponent {
    private components: IMenuComponent[] = [];
    element: HTMLElement;

    constructor(className?: string) {
        this.element = document.createElement('div');
        this.element.classList.add('section');
        if (className) {
            this.element.classList.add(className);
        }
    }

    add(element: IMenuComponent): void {
        this.components.push(element);
        for (const component of this.components) {
            this.element.appendChild(component.render());
        }
    }

    render(): HTMLElement {
        return this.element;
    }
}

export class Panel implements IMenuComponent {
    private components: IMenuComponent[] = [];
    element: HTMLElement;

    constructor(className?: string) {
        this.element = document.createElement('div');
        this.element.classList.add('panel');
        if (className) {
            this.element.classList.add(className);
        }
    }

    add(element: IMenuComponent): void {
        this.components.push(element);
        for (const component of this.components) {
            this.element.appendChild(component.render());
        }
    }

    render(): HTMLElement {
        return this.element;
    }
}

export default class Menu implements IMenuComponent {
    private components: IMenuComponent[] = [];
    element: HTMLElement;

    // private constructor(builder: MenuBuilder) {}

    constructor(containerSelector: string) {
        const element = document.createElement('div');
        element.classList.add(containerSelector);
        element.classList.add("overlayMenu");
        document.body.appendChild(element);

//         const menu = new Menu('.ShopMenu');
        // const menu = new Menu();
        // menu.containerElement = containerSelector;
        // const element = document.querySelector<HTMLElement>(containerSelector) as HTMLElement;
        // this.element = element;
    }


    static get Builder(): MenuBuilder {
        return new MenuBuilder();
    }

    set containerElement(selector: string) {
        const element = document.querySelector<HTMLElement>(selector) as HTMLElement;
        // element.classList.add("overlayMenu");
        this.element = element;
    }

    add(element: IMenuComponent): void {
        this.components.push(element);
        for (const component of this.components) {
            this.element.appendChild(component.render());
        }
    }

    render(): HTMLElement {
        // const element = document.createElement('div');
        // element.classList.add(containerSelector);
        // element.classList.add("overlayMenu");
        // document.body.appendChild(element);

//         const menu = new Menu('.ShopMenu');
        // const menu = new Menu();
        // menu.containerElement = containerSelector;
        return this.element;
    }
}

// const element = document.createElement('div');
//         element.classList.add('ShopMenu');
//         element.classList.add("overlayMenu");
//         document.body.appendChild(element);

//         const menu = new Menu('.ShopMenu');
//         const titleSection = new Section('title');
//         const title = new HeaderText('shop-title', 'Item Shop');
//         titleSection.add(title);
//         const buyButton = new Button(() => console.log('Buy clicked'), 'Buy', 'buy-btn');
//         const sellButton = new Button(() => console.log('Sell clicked'), 'Sell', 'sell-btn');
//         const exitButton = new Button(() => console.log('Exit clicked'), 'Exit', 'exit-btn');
//         const optionsSection = new Section('options');
//         optionsSection.add(buyButton);
//         optionsSection.add(sellButton);
//         optionsSection.add(exitButton);
//         const topPanel = new Panel('top');
//         topPanel.add(titleSection);
//         topPanel.add(optionsSection);
//         menu.add(topPanel);

//         const selectionsPanel = new Panel('selections');
//         const itemsSection = new Section('items');

//         const itemsList = new List(ItemDB.map(item => {
//             const itemElement = document.createElement('li');
//             itemElement.innerText = `${item.name} ${item.price ? item.price + ' GP' : ''}`;
//             return itemElement;
//         }));
//         itemsSection.add(itemsList);
//         const characterAssetsSection = new Section('character-assets');
//         const characterAssetsList = new List([
//             (() => {
//                 const asset = document.createElement('div');
//                 asset.innerText = 'Gold: 00';
//                 return asset;
//             })(),
//             (() => {
//                 const asset = document.createElement('div');
//                 asset.innerText = 'Equipped: 00';
//                 return asset;
//             })(),
//             (() => {
//                 const asset = document.createElement('div');
//                 asset.innerText = 'Inventory: 00';
//                 return asset;
//             })()
//         ]);
//         characterAssetsSection.add(characterAssetsList);
//         selectionsPanel.add(itemsSection);
//         selectionsPanel.add(characterAssetsSection);
//         menu.add(selectionsPanel);

//         const itemDescriptionPanel = new Panel('item-description');
//         const itemDescriptionText = new TextField('item-description-text', 'Item Description');
//         itemDescriptionPanel.add(itemDescriptionText);
//         menu.add(itemDescriptionPanel);

//         const characterSpritesPanel = new Panel('character-sprites');
//         const characterSprite1 = new MenuImage('character-sprite', 'assets/images/walk_cycle.png');
//         const characterSprite2 = new MenuImage('character-sprite', 'assets/images/walk_cycle.png');
//         characterSpritesPanel.add(characterSprite1);
//         characterSpritesPanel.add(characterSprite2);
//         menu.add(characterSpritesPanel);

export class MenuBuilder {
    sections: Section[] = [];
    panels: Panel[] = [];
    header: HeaderText;

    addHeader(text: string, id: string): MenuBuilder {
        this.header = new HeaderText(id, text);
        return this;
    }

    addButton(text: string, callback: (data?: any) => void, className?: string): MenuBuilder {
        const button = new Button(callback, text, className);
        if (this.sections.length > 0) {
            this.sections[this.sections.length - 1].add(button);
        }
        return this;
    }

    addTextField(text: string, id: string): MenuBuilder {
        const textField = new TextField(id, text);
        if (this.sections.length > 0) {
            this.sections[this.sections.length - 1].add(textField);
        }
        return this;
    }

    addImage(className: string, src: string): MenuBuilder {
        const image = new MenuImage(className, src);
        if (this.sections.length > 0) {
            this.sections[this.sections.length - 1].add(image);
        }
        return this;
    }

    addList(items: HTMLElement[]): MenuBuilder {
        const list = new List(items);
        if (this.sections.length > 0) {
            this.sections[this.sections.length - 1].add(list);
        }
        return this;
    }

    addSection(className?: string): MenuBuilder {
        const section = new Section(className);
        this.sections.push(section);
        return this;
    }

    addPanel(className?: string): MenuBuilder {
        const panel = new Panel(className);
        if (this.sections.length > 0) {
            console.log('which section are we adding to panel: ', this.sections.length - 1);
            panel.add(this.sections[this.sections.length - 1]);
        }
        this.panels.push(panel);
        return this;
    }

    build(containerSelector: string): Menu {
        // return new Menu(containerSelector);
        // const element = document.createElement('div');
        // element.classList.add(containerSelector);
        // element.classList.add("overlayMenu");
        // document.body.appendChild(element);

        const menu = new Menu(containerSelector);
        // const menu = new Menu();
        menu.containerElement = containerSelector;
        // if (this.header) {
        //     const headerSection = new Section('header');
        //     headerSection.add(this.header);
        //     menu.add(headerSection);
        // }
        // for (const section of this.sections) {
        //     menu.add(section);
        // }
        // for (const panel of this.panels) {
        //     menu.add(panel);
        // }
        return menu;
    }


    // addHeader(text: string, id: string): HeaderText {
    //     return new HeaderText(id, text);
    // }

    // addButton(text: string, callback: (data?: any) => void, className?: string): Button {
    //     return new Button(callback, text, className);
    // }

    // addTextField(text: string, id: string): TextField {
    //     return new TextField(id, text);
    // }

    // addImage(className: string, src: string): MenuImage {
    //     return new MenuImage(className, src);
    // }

    // addList(items: HTMLElement[]): List {
    //     return new List(items);
    // }

    // addSection(className?: string): Section {
    //     return new Section(className);
    // }

    // addPanel(className?: string): Panel {
    //     return new Panel(className);
    // }

    // build(containerSelector: string): Menu {
    //     return new Menu(containerSelector);
    // }
}



// Usage
// const warrior = Character.Builder
//     .setName('Warrior')
//     .setHealth(150)
//     .setStrength(20)
//     .setAgility(15)
//     .addAbility('Sword Mastery')
//     .addAbility('Shield Block')
//     .build();

// warrior.displayStats();