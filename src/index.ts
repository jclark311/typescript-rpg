import Character from "./Character";

let canvas = document.getElementById("game") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const character = new Character(canvas, ctx);
character.loadImage();
