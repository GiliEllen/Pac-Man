import { TileMap } from "./TileMap.js";
import { MovingDirection } from "./MoveDirection.js"

// Creating pacman class
export class Pacman {
    x: number;
    y: number;
    tileSize: number;
    velocity: number;
    tileMap: TileMap;
    pacmanImages: HTMLImageElement[] = [];
    pacmanImageIndex: number = 1;
    currentMovingDirection: number | null;
    requestedMovingDirection: number | null;

    constructor(x: number, y: number, tileSize: number, velocity: number, tileMap: TileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        document.addEventListener("keydown", this.#keydown)

        this.#loadPacmanImages();
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.#move();
        ctx.drawImage(
            this.pacmanImages[this.pacmanImageIndex],
            this.x,
            this.y,
            this.tileSize,
            this.tileSize)
    }

    #loadPacmanImages() {
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
    }

    #keydown = (event:KeyboardEvent) => {
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
    }

    #move() {
        if (this.currentMovingDirection !== this.requestedMovingDirection) {
            if (Number.isInteger(this.x / this.tileSize) &&
                Number.isInteger(this.y / this.tileSize)
            ) {

                if (
                    !this.tileMap.didCollideWithEnviorment(
                        this.x,
                        this.y,
                        this.requestedMovingDirection
                    )
                )
                this.currentMovingDirection = this.requestedMovingDirection;
            }
        }

        if (this.tileMap.didCollideWithEnviorment(this.x, this.y, this.currentMovingDirection)){
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
    }

}