var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Pacman_instances, _Pacman_loadPacmanImages, _Pacman_keydown, _Pacman_move, _Pacman_animate, _Pacman_eatDot;
import { MovingDirection } from "./MoveDirection.js";
// Creating pacman class
export class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        _Pacman_instances.add(this);
        this.pacmanImages = [];
        this.pacmanImageIndex = 1;
        this.Rotation = {
            right: 0,
            down: 1,
            left: 2,
            up: 3
        };
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
        this.pacmanAnimationTimerDefualt = 10;
        this.pacmanAnimationTimer = null;
        this.pacmanRotation = this.Rotation.right;
        this.wakaSound = new Audio('../sounds/waka.wav');
        document.addEventListener("keydown", __classPrivateFieldGet(this, _Pacman_keydown, "f"));
        __classPrivateFieldGet(this, _Pacman_instances, "m", _Pacman_loadPacmanImages).call(this);
    }
    draw(ctx) {
        __classPrivateFieldGet(this, _Pacman_instances, "m", _Pacman_move).call(this);
        __classPrivateFieldGet(this, _Pacman_instances, "m", _Pacman_animate).call(this);
        __classPrivateFieldGet(this, _Pacman_instances, "m", _Pacman_eatDot).call(this);
        const size = this.tileSize / 2;
        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], -size, -size, this.tileSize, this.tileSize);
        ctx.restore();
        // ctx.drawImage(
        //     this.pacmanImages[this.pacmanImageIndex],
        //     this.x,
        //     this.y,
        //     this.tileSize,
        //     this.tileSize)
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
    this.pacmanImageIndex = 0;
}, _Pacman_move = function _Pacman_move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
        if (Number.isInteger(this.x / this.tileSize) &&
            Number.isInteger(this.y / this.tileSize)) {
            if (!this.tileMap.didCollideWithEnviorment(this.x, this.y, this.requestedMovingDirection))
                this.currentMovingDirection = this.requestedMovingDirection;
        }
    }
    if (this.tileMap.didCollideWithEnviorment(this.x, this.y, this.currentMovingDirection)) {
        this.pacmanAnimationTimer = null;
        this.pacmanImageIndex = 1;
        return;
    }
    else if (this.currentMovingDirection !== null &&
        this.pacmanAnimationTimer === null) {
        this.pacmanAnimationTimer = this.pacmanAnimationTimerDefualt;
    }
    switch (this.currentMovingDirection) {
        case MovingDirection.up:
            this.y -= this.velocity;
            this.pacmanRotation = this.Rotation.up;
            break;
        case MovingDirection.down:
            this.y += this.velocity;
            this.pacmanRotation = this.Rotation.down;
            break;
        case MovingDirection.left:
            this.x -= this.velocity;
            this.pacmanRotation = this.Rotation.left;
            break;
        case MovingDirection.right:
            this.x += this.velocity;
            this.pacmanRotation = this.Rotation.right;
            break;
    }
}, _Pacman_animate = function _Pacman_animate() {
    if (this.pacmanAnimationTimer === null) {
        return;
    }
    this.pacmanAnimationTimer--;
    if (this.pacmanAnimationTimer === 0) {
        this.pacmanAnimationTimer = this.pacmanAnimationTimerDefualt;
        this.pacmanImageIndex++;
        if (this.pacmanImageIndex === this.pacmanImages.length) {
            this.pacmanImageIndex = 0;
        }
    }
}, _Pacman_eatDot = function _Pacman_eatDot() {
    if (this.tileMap.eatDot(this.x, this.y)) {
        this.wakaSound.play();
    }
};
