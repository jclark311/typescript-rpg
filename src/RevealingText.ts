type RevealingTextConfig = {
    element: HTMLElement | null;
    text: string;
    speed?: number;
}

export default class RevealingText {
    element: HTMLElement | null;
    text: string;
    speed: number;
    timeout: ReturnType<typeof setTimeout> | null;
    isDone: boolean;

    constructor(config: RevealingTextConfig) {
        this.element = config.element;
        this.text = config.text;
        this.speed = config.speed || 60;

        this.timeout = null;
        this.isDone = false;
    }

    revealOneCharacter(list: any) {
        const next = list.splice(0,1)[0];
        next.span.classList.add("revealed");

        if (list.length > 0) {
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(list)
            }, next.delayAfter)
        } else {
            this.isDone = true;
        }
    }

    warpToDone() {
        clearTimeout(this.timeout!);
        this.isDone = true;
        this.element!.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        })
    }

    init() {
        let characters: any[] = [];
        this.text.split("").forEach(character => {

            //Create each span, add to element in DOM
            let span = document.createElement("span");
            span.textContent = character;
            this.element!.appendChild(span);

            //Add this span to our internal state Array
            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed         
            })
        })

        this.revealOneCharacter(characters);

    }

}