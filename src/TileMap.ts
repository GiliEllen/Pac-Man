import { MovingDirection } from './MoveDirection.js';
import { Enemy } from './Enemy.js';
import { Pacman } from './Pacman.js';
export class TileMap {
    tileSize: number;
    yellowDot: HTMLImageElement;
    pinkDot: HTMLImageElement;
    powerDot: HTMLImageElement;
    wall: HTMLImageElement;
    powerDotAnimationTimerDefault: number;
    powerDotAnimationTimer: number;

    topRightCorner: HTMLImageElement;
    topLeftCorner: HTMLImageElement;
    bottomRightCorner: HTMLImageElement;
    bottomLeftCorner: HTMLImageElement;
    horizontalWall: HTMLImageElement;
    verticalWall: HTMLImageElement;

    constructor(tileSize: number) {
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        this.yellowDot.src = '../images/yellowDot.png';

        this.pinkDot = new Image();
        this.pinkDot.src = '../images/pinkDot.png';

        this.wall = new Image();
        this.wall.src = '../images/wall.png';

        this.topRightCorner  = new Image()
        this.topRightCorner.src = '../images/32x32_wall02.png'

        this.topLeftCorner = new Image()
        this.topLeftCorner.src = '../images/32x32_wall05.png'

        this.bottomRightCorner = new Image()
        this.bottomRightCorner.src = '../images/32x32_wall03.png'

        this.bottomLeftCorner = new Image()
        this.bottomLeftCorner.src = '../images/32x32_wall04.png'

        this.horizontalWall = new Image()
        this.horizontalWall.src = '../images/32x32_wall01.png'

        this.verticalWall = new Image()
        this.verticalWall.src = '../images/32x32_wall06.png'


        this.powerDot = this.pinkDot;
        this.powerDotAnimationTimerDefault = 30;
        this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
    }

    // map - Legend :
    //  •) 1 = Brick Wall
    //  •) 0 = Dot
    //  •) 4 = Pacman
    //  •) 5 = Empty space
    //  •) 6 = Enemy
    //  •) 7 = PowerDot

    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 7, 1],
        [1, 6, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 6, 1, 0, 1, 1, 1, 1, 6, 0, 1],
        [1, 0, 1, 0, 1, 4, 1, 0, 0, 7, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 7, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 6, 1],
        [1, 7, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    
    // Method: 
    // drawing the canvas acorrding to the map
    draw(ctx: CanvasRenderingContext2D) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 1) { // if tile = 1 draw wall
                    this.#drawWall(ctx, column, row, this.tileSize);
                } else if (tile === 0) { // if tile = 0 draw dot
                    this.#drawDot(ctx, column, row, this.tileSize);
                } else if (tile === 7) { // if tile = 7 draw powerDot
                    this.#drawPowerDot(ctx, column, row, this.tileSize);
                }
                else { // else draw blank (black square 32x32)
                    this.#drawBlank(ctx, column, row, this.tileSize);
                }

                //*************Visual**************/
                // ctx.strokeStyle = "yellow";
                // ctx.strokeRect(
                //     column * this.tileSize,
                //     row * this.tileSize,
                //     this.tileSize,
                //     this.tileSize
                // );
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

    // Method:
    // Getting pacman position acorrding the to map
    // Returning the new Pacman with the currect position
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

    // Method:
    // Getting enemies position acorrding the to map
    // Returning the new enemies array of enemy with the currect position
    getEnemies(velocity: number) {
        const enemies: Array<Enemy> = [];

        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                if (tile === 6) {
                    this.map[row][column] = 0;
                    enemies.push(new Enemy( // Push the new enemy to the enemies array
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        velocity,
                        this
                    ))
                }
            }
        }
        return enemies;
    }
    // Method:
    // Checks if pacman collide with walls
    didCollideWithEnviorment(x: number, y: number, direction: number | null) {

        if (direction === null) { // while the game paused
            return;
        }
        // Checkes if the pacman inside the middle of the tile we calculate the tile size to be exactly an integer
        if ( 
            Number.isInteger(x / this.tileSize) &&
            Number.isInteger(y / this.tileSize)
        ) {
            let column = 0; // index of column in map
            let row = 0; // index of row in map
            let nextColumn = 0; // var to calculate the next column index
            let nextRow = 0; // var to calculate the next row index

            switch (direction) { //Checking direction cases
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

            const tile = this.map[row][column]; // After geting the next tile checking if equals to 1 pacman colided with wall

            if (tile === 1) { 
                return true;
            }
        }
        return false;
    }

    // Method:
    // If pacman inside the tile in the middle of the dot eat it
    eatDot(x: number, y: number) {
        const row = y / this.tileSize;
        const column = x / this.tileSize;

        if (Number.isInteger(row) && Number.isInteger(column)) { // Checkes if the pacman inside the middle of the tile we calculate the tile size to be exactly an integer
            if (this.map[row][column] === 0) { // If the tile that pacman was a dot
                this.map[row][column] = 5; // turn dot into blank space
                return true;
            }
        }
        return false;
    }

    // Method:
    // If pacman inside the tile in the middle of the powerDot eat it
    eatPowerDot (x: number, y: number) {
        const column = x / this.tileSize;
        const row = y / this.tileSize;

        if (Number.isInteger(row) && Number.isInteger(column)) {
            let tile = this.map[row][column];
            if(tile === 7) {
                this.map[row][column] = 5;
                return true;
            }
        }
        return false;
    }

    // Method: 
    // Checks if there any left  tiles that equals to 0 (any dots left)
    didWin() {
        return this.#dotsLeft() === 0;
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

    // Private Method:
    // Drawing yellowDot and powerDot to make it animate
    #drawPowerDot(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
        this.powerDotAnimationTimer--; // decreasing the timer by 1;
        if (this.powerDotAnimationTimer === 0) {
            this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault; // reseting the timer to default
            if (this.powerDot === this.pinkDot) { // toggle between powerDot img
                this.powerDot = this.yellowDot;
            } else {
                this.powerDot = this.pinkDot;
            }
        }

        ctx.drawImage(this.powerDot, column * size, row * size, size, size);
    }

    // Private Method:
    // Draw blank space (black rectangle 32x32)
    #drawBlank(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
        ctx.fillStyle = 'black';
        ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
    }

    // Private Method:
    // Flating the map into 1 array
    // returns true if the length of the left Dots on the map is 0.
    // returns false if there is any dots left.
    #dotsLeft() {
        return this.map.flat().filter((tile) => tile === 0).length
    }
}

