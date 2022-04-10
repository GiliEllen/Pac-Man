import { TileMap } from "./TileMap.js";

export class Enemy {
    x: number;
    y: number;
    tileSize: number;
    velocity: number;
    normalGhost: HTMLImageElement | null;
    scaredGhost: HTMLImageElement | null;
    scaredGhost2: HTMLImageElement | null;
    tileMap: TileMap;

    constructor(x: number, y: number, tileSize: number, velocity: number, tileMap: TileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.normalGhost = null;
        this.scaredGhost = null;
        this.scaredGhost2 = null;

        this.#loadImages();
    }

    draw() { }

    #loadImages() {
        this.normalGhost = new Image();
        this.normalGhost.src = '../images/ghost.png';

        this.scaredGhost = new Image();
        this.scaredGhost.src = '../images/scaredGhost.png';

        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = '../images/scaredGhost2.png';
    }
}