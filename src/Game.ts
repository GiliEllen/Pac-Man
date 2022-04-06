import { TileMap } from "./TileMap.js";

const tileSize = 32;
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const tileMap = new TileMap(tileSize);

function gameLoop(){
    tileMap.draw(ctx);
}

tileMap.setCanvasSize(canvas); // Setting the canvas to match the map size.
setInterval(gameLoop, 1000 / 75);