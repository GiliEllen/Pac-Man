import { MovingDirection } from './MoveDirection.js';
import { Pacman } from './Pacman.js';
export class TileMap {
    tileSize: number;
    yellowDot: HTMLImageElement;
    wall: HTMLImageElement;
    constructor(tileSize: number) {
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        this.yellowDot.src = '../images/yellowDot.png';

        this.wall = new Image();
        this.wall.src = '../images/wall.png';
    }

    // map - Legend :
    //  •) 1 = Brick Wall
    //  •) 0 = Dot
    //  •) 4 = Pacman

    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    draw(ctx: CanvasRenderingContext2D) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 1) {
                    this.#drawWall(ctx, column, row, this.tileSize)
                } else if (tile === 0) {
                    this.#drawDot(ctx, column, row, this.tileSize)
                }

                ctx.strokeStyle = "yellow";
                ctx.strokeRect(
                    column * this.tileSize,
                    row * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }

    // Method:
    // Takes as argument a canvas
    // Sets the width of the canvas to the map width
    // Sets the height of the canvas to the map height
    setCanvasSize(canvas: HTMLCanvasElement) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    getPacman(velocity: number) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 4) {
                    this.map[row][column] = 0;
                    return new Pacman(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
                }

            }
        }
    }

    didCollideWithEnviorment(x: number, y: number, direction: number | null) {

        if (direction === null) {
            return;
        }

        if (
            Number.isInteger(x / this.tileSize) &&
            Number.isInteger(y / this.tileSize)
        ) {
            let column = 0; // index of column in map
            let row = 0; // index of row in map
            let nextColumn = 0; // var to calculate the next column index
            let nextRow = 0; // var to calculate the next row index

            switch (direction) {
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
            }

            const tile = this.map[row][column];

            if (tile === 1) {
                return true;
            }
        }
        return false;
    }

    // Private Method:
    // Draw the wall, by the arguments that passes (x Posiotn -> coulmn, y Position -> row, size - tileSize)
    #drawWall(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
        ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size);
    }

    // Private Method:
    // Draw the wall, by the arguments that passes (x Posiotn -> coulmn, y Position -> row, size - tileSize)
    #drawDot(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
        ctx.drawImage(this.yellowDot, column * this.tileSize, row * this.tileSize, size, size);
    }
}

