import { TileMap } from "./TileMap.js";

const tileSize = 32;
const velocity = 1;

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);

function gameLoop(){
    tileMap.draw(ctx);
    pacman.draw(ctx);
}

tileMap.setCanvasSize(canvas); // Setting the canvas to match the map size.
setInterval(gameLoop, 1000 / 75);