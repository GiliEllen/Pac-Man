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
    //  •) 0 = Pallate

    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
                    this.#drawPallte(ctx, column, row, this.tileSize)
                }
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

    // Private Method:
    // Draw the wall, by the arguments that passes (x Posiotn -> coulmn, y Position -> row, size - tileSize)
    #drawWall(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
        ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size);
    }

    // Private Method:
    // Draw the wall, by the arguments that passes (x Posiotn -> coulmn, y Position -> row, size - tileSize)
    #drawPallte(ctx: CanvasRenderingContext2D, column: number, row: number, size:number) {
        ctx.drawImage(this.yellowDot, column * this.tileSize, row * this.tileSize, size, size);
    }
}