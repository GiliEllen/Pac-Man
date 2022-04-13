import { MovingDirection } from "./MoveDirection.js";
import { Pacman } from "./Pacman.js";
import { TileMap } from "./TileMap.js";

// Creating enemy constractor
export class Enemy {
    x: number;
    y: number;
    tileSize: number;
    velocity: number;
    normalGhost: HTMLImageElement;
    scaredGhost: HTMLImageElement;
    scaredGhost2: HTMLImageElement;
    tileMap: TileMap;
    image: HTMLImageElement;
    movingDirection: number;
    directionTimerDefault: number;
    directionTimer: number;
    scaredAboutToExpireTimerDefault: number;
    scaredAboutToExpireTimer: number;

    constructor(x: number, y: number, tileSize: number, velocity: number, tileMap: TileMap) {
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
        this.directionTimerDefault = this.#random(10, 50);
        this.directionTimer = this.directionTimerDefault;

        this.scaredAboutToExpireTimerDefault = 10;
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;

        this.#loadImages();
    }

    draw(ctx: CanvasRenderingContext2D, pause: boolean, pacman: Pacman) {
        if (!pause) {
            this.#move();
            this.#changeDirection();
        }
        this.setImage(ctx, pacman);
    }

    collideWith(pacman: Pacman) {
        const size = this.tileSize / 2;
        if (
            this.x < pacman.x + size &&
            this.x + size > pacman.x &&
            this.y < pacman.y + size &&
            this.y + size > pacman.y
        ) {
            return true;
        } else {
            return false;
        }
    }

    setImage(ctx: CanvasRenderingContext2D, pacman: Pacman) {
        if (pacman.powerDotIsActive) {
            this.#setImageWhenPowerDotIsActive(pacman)
        } else {
            this.image = this.normalGhost;
        }
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }

    #setImageWhenPowerDotIsActive(pacman: Pacman) {
        if (pacman.powerDotIsAboutToExpire) {
            this.scaredAboutToExpireTimer--;
            if (this.scaredAboutToExpireTimer === 0) {
                this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
                if (this.image === this.scaredGhost) {
                    this.image = this.scaredGhost2;
                } else {
                    this.image = this.scaredGhost;
                }
            }
        } else {
            this.image = this.scaredGhost;
        }
    }

    #loadImages() {
        this.normalGhost = new Image();
        this.normalGhost.src = '../images/ghost.png';

        this.scaredGhost = new Image();
        this.scaredGhost.src = '../images/scaredGhost.png';

        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = '../images/scaredGhost2.png';

        this.image = this.normalGhost;
    }


    #random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #move() {
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
    }

    #changeDirection() {
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
    }
}