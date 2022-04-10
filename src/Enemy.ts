import { MovingDirection } from "./MoveDirection.js";
import { TileMap } from "./TileMap.js";

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

        this.#loadImages();
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.#move();
        this.#changeDirection();
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
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
                if(!this.tileMap.didCollideWithEnviorment(this.x, this.y, newMoveDirection)) {
                    this.movingDirection = newMoveDirection;
                }
            }
        }
    }
}