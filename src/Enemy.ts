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

    // Method:
    // if the game is not pause allow enemies to move and change direction
    // Draw enemey
    draw(ctx: CanvasRenderingContext2D, pause: boolean, pacman: Pacman) {
        if (!pause) {
            this.#move();
            this.#changeDirection();
        }
        this.setImage(ctx, pacman);
    }

    // Method: 
    // Check if pacman and enemies meet at X && Y position 
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

    // Method:
    // Checks if power dot has been eaten
    // True: call for private method to draw scared ghosts
    // Else : draw a normal ghost 
    setImage(ctx: CanvasRenderingContext2D, pacman: Pacman) {
        if (pacman.powerDotIsActive) {
            this.#setImageWhenPowerDotIsActive(pacman)
        } else {
            this.image = this.normalGhost;
        }
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }

    // Private Method:
    // Activted if power dot is eaten
    // If the power dot is about to expire: 
    // Activte animation timer and change between white and blue ghost
    // Else : ghost is blue
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

    // Privet Method:
    // Loads all ghosts images
    #loadImages() {
        this.normalGhost = new Image();
        this.normalGhost.src = '../images/ghost.png';

        this.scaredGhost = new Image();
        this.scaredGhost.src = '../images/scaredGhost.png';

        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = '../images/scaredGhost2.png';

        this.image = this.normalGhost;
    }

    // Private Method:
    // Returns random number between min and max
    #random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Private Method:
    // Gets a random moving direction
    // Checks if enemy did not collid with enviroment
    // Moves enemy acoording to velocity and direction
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

    // Private Method:
    // Reduce timer 
    // If timer === 0, set back to default and get a new move position
    // If the new move direction !== null, and !== from current move direction,
    // Check if in the middle of a tile, and if not collided with enviroment
    // change the direction to the new direction
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