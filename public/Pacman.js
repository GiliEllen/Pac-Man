var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Pacman_instances, _Pacman_loadPacmanImages, _Pacman_keydown, _Pacman_move;
import { MovingDirection } from "./MoveDirection.js";
// Creating pacman class
export class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        _Pacman_instances.add(this);
        this.pacmanImages = [];
        this.pacmanImageIndex = 1;
        _Pacman_keydown.set(this, (event) => {
            if (event.key === "ArrowUp") { //up
                if (this.currentMovingDirection === MovingDirection.down)
                    this.currentMovingDirection = MovingDirection.up;
                this.requestedMovingDirection = MovingDirection.up;
            }
            if (event.key === "ArrowDown") { //down
                if (this.currentMovingDirection === MovingDirection.up)
                    this.currentMovingDirection = MovingDirection.down;
                this.requestedMovingDirection = MovingDirection.down;
            }
            if (event.key === "ArrowRight") { //right
                if (this.currentMovingDirection === MovingDirection.left)
                    this.currentMovingDirection = MovingDirection.right;
                this.requestedMovingDirection = MovingDirection.right;
            }
            if (event.key === "ArrowLeft") { //left
                if (this.currentMovingDirection === MovingDirection.right)
                    this.currentMovingDirection = MovingDirection.left;
                this.requestedMovingDirection = MovingDirection.left;
            }
        });
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;
        document.addEventListener("keydown", __classPrivateFieldGet(this, _Pacman_keydown, "f"));
        __classPrivateFieldGet(this, _Pacman_instances, "m", _Pacman_loadPacmanImages).call(this);
    }
    draw(ctx) {
        __classPrivateFieldGet(this, _Pacman_instances, "m", _Pacman_move).call(this);
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y, this.tileSize, this.tileSize);
    }
}
_Pacman_keydown = new WeakMap(), _Pacman_instances = new WeakSet(), _Pacman_loadPacmanImages = function _Pacman_loadPacmanImages() {
    const pacmanImage1 = new Image();
    pacmanImage1.src = "../images/pac0.png";
    const pacmanImage2 = new Image();
    pacmanImage2.src = "../images/pac1.png";
    const pacmanImage3 = new Image();
    pacmanImage3.src = "../images/pac2.png";
    const pacmanImage4 = new Image();
    pacmanImage4.src = "../images/pac1.png";
    this.pacmanImages = [
        pacmanImage1,
        pacmanImage2,
        pacmanImage3,
        pacmanImage4
    ];
    this.pacmanImageIndex = 1;
}, _Pacman_move = function _Pacman_move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
        if (Number.isInteger(this.x / this.tileSize) &&
            Number.isInteger(this.y / this.tileSize)) {
            if (!this.tileMap.didCollideWithEnviorment(this.x, this.y, this.requestedMovingDirection))
                this.currentMovingDirection = this.requestedMovingDirection;
        }
    }
    if (this.tileMap.didCollideWithEnviorment(this.x, this.y, this.currentMovingDirection)) {
        return;
    }
    switch (this.currentMovingDirection) {
        case MovingDirection.up:
            this.y -= this.velocity;
            break;
        case MovingDirection.down:
            this.y += this.velocity;
            break;
        case MovingDirection.left:
            this.x -= this.velocity;
            break;
        case MovingDirection.right:
            this.x += this.velocity;
            break;
    }
};
