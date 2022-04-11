var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Enemy_instances, _Enemy_setImageWhenPowerDotIsActive, _Enemy_loadImages, _Enemy_random, _Enemy_move, _Enemy_changeDirection;
import { MovingDirection } from "./MoveDirection.js";
export class Enemy {
    constructor(x, y, tileSize, velocity, tileMap) {
        _Enemy_instances.add(this);
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.normalGhost = new Image();
        this.scaredGhost = new Image();
        this.scaredGhost2 = new Image();
        this.image = this.normalGhost;
        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        this.directionTimerDefault = __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_random).call(this, 10, 50);
        this.directionTimer = this.directionTimerDefault;
        this.scaredAboutToExpireTimerDefault = 10;
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
        __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_loadImages).call(this);
    }
    draw(ctx, pause, pacman) {
        if (!pause) {
            __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_move).call(this);
            __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_changeDirection).call(this);
        }
        this.setImage(ctx, pacman);
    }
    setImage(ctx, pacman) {
        if (pacman.powerDotIsActive) {
            __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_setImageWhenPowerDotIsActive).call(this, pacman);
        }
        else {
            this.image = this.normalGhost;
        }
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }
}
_Enemy_instances = new WeakSet(), _Enemy_setImageWhenPowerDotIsActive = function _Enemy_setImageWhenPowerDotIsActive(pacman) {
    if (pacman.powerDotIsAboutToExpire) {
        this.scaredAboutToExpireTimer--;
        if (this.scaredAboutToExpireTimer === 0) {
            this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
            if (this.image === this.scaredGhost) {
                this.image = this.scaredGhost2;
            }
            else {
                this.image = this.scaredGhost;
            }
        }
    }
    else {
        this.image = this.scaredGhost;
    }
}, _Enemy_loadImages = function _Enemy_loadImages() {
    this.normalGhost = new Image();
    this.normalGhost.src = '../images/ghost.png';
    this.scaredGhost = new Image();
    this.scaredGhost.src = '../images/scaredGhost.png';
    this.scaredGhost2 = new Image();
    this.scaredGhost2.src = '../images/scaredGhost2.png';
    this.image = this.normalGhost;
}, _Enemy_random = function _Enemy_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}, _Enemy_move = function _Enemy_move() {
    if (!this.tileMap.didCollideWithEnviorment(this.x, this.y, this.movingDirection)) {
        switch (this.movingDirection) {
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
    }
}, _Enemy_changeDirection = function _Enemy_changeDirection() {
    this.directionTimer--;
    let newMoveDirection = null;
    if (this.directionTimer === 0) {
        this.directionTimer = this.directionTimerDefault;
        newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
    }
    if (newMoveDirection !== null && this.movingDirection !== newMoveDirection) {
        if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
            if (!this.tileMap.didCollideWithEnviorment(this.x, this.y, newMoveDirection)) {
                this.movingDirection = newMoveDirection;
            }
        }
    }
};
