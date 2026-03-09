import KeyboardListener from "./KeyboardListener";
import RevealingText from "./RevealingText";

type TextMessageConfig = {
    text: string;
    onComplete: (data?: any) => void;
}

export default class TextMessage {
    text: string;
    onComplete: (data?: any) => void;
    element: HTMLElement | null;
    actionListener?: KeyboardListener;
    revealingText?: RevealingText;

    constructor({ text, onComplete }: TextMessageConfig) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() {
        // Create the element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `);

       // Init the typewriter effect
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text
        })

        this.element.querySelector("button")!.addEventListener("click", () => {
            // Close the text message
            this.done();
        });

        this.actionListener = new KeyboardListener("Enter", () => {
            this.done();
        })

    }

    done() {

//     if (this.revealingText.isDone) {
//       this.element.remove();
//       this.actionListener.unbind();
//       this.onComplete();
//     } else {
//       this.revealingText.warpToDone();
//     }
    }

    init(container: HTMLElement) {
        this.createElement();
        container.appendChild(this.element!);
//     this.revealingText.init();
    }

}

