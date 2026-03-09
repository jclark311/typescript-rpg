import Map from "./Map";
import GameObject from "./GameObject";

export default class Camera {
    x: number;
    y: number;
    width: number;
    height: number;
    maxX: number;
    maxY: number;
    // following: GameObject;
    static SPEED: number = 256; // pixels per second

    constructor(map: Map, width: number, height: number) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.maxX = map.cols * map.tileSize - width;
        this.maxY = map.rows * map.tileSize - height;
    }

    move(delta: number, dirx: number, diry: number) {
        // move camera
        this.x += dirx * Camera.SPEED * delta;
        this.y += diry * Camera.SPEED * delta;
        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
    }

    // follow(sprite: GameObject) {
    //     this.following = sprite;
    //     sprite.screenX = 0;
    //     sprite.screenY = 0;
    // };

    // update() {
    //     // assume followed sprite should be placed at the center of the screen
    //     // whenever possible
    //     this.following.screenX = this.width / 2;
    //     this.following.screenY = this.height / 2;

    //     // make the camera follow the sprite
    //     this.x = this.following.positionX - this.width / 2;
    //     this.y = this.following.positionY - this.height / 2;
    //     // clamp values
    //     this.x = Math.max(0, Math.min(this.x, this.maxX));
    //     this.y = Math.max(0, Math.min(this.y, this.maxY));

    //     // in map corners, the sprite cannot be placed in the center of the screen
    //     // and we have to change its screen coordinates

    //     // left and right sides
    //     if (this.following.positionX < this.width / 2 ||
    //         this.following.positionX > this.maxX + this.width / 2) {
    //         this.following.screenX = this.following.positionX - this.x;
    //     }
    //     // top and bottom sides
    //     if (this.following.positionY < this.height / 2 ||
    //         this.following.positionY > this.maxY + this.height / 2) {
    //         this.following.screenY = this.following.positionY - this.y;
    //     }
    // };
}

// function Camera(map, width, height) {
//     this.x = 0;
//     this.y = 0;
//     this.width = width;
//     this.height = height;
//     this.maxX = map.cols * map.tsize - width;
//     this.maxY = map.rows * map.tsize - height;
// }

// Camera.SPEED = 256; // pixels per second

// Camera.prototype.move = function (delta, dirx, diry) {
//     // move camera
//     this.x += dirx * Camera.SPEED * delta;
//     this.y += diry * Camera.SPEED * delta;
//     // clamp values
//     this.x = Math.max(0, Math.min(this.x, this.maxX));
//     this.y = Math.max(0, Math.min(this.y, this.maxY));
// };