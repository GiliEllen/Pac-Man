import { TileMap } from "./TileMap";

export class Pacman {
    x:number;
    y:number;
    tileSize:number;
    velocity:number;
    tileMap:TileMap;
    pacmanImages: HTMLImageElement[] = [];
    pacmanImageIndex:number = 1;
    constructor(x:number, y:number, tileSize:number, velocity:number, tileMap:TileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.#loadPacmanImages();
    }

    draw(ctx:CanvasRenderingContext2D) {
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y, this.tileSize, this.tileSize)
    }

    #loadPacmanImages(){
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
}

// column * this.tileSize,
//  row * this.tileSize,
//   this.tileSize,
//    velocity,
//     this