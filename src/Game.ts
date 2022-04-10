import { Pacman } from "./Pacman.js";
import { TileMap } from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity) as Pacman;
const enemies = tileMap.getEnemies(velocity);

function gameLoop(){
    tileMap.draw(ctx);
    pacman.draw(ctx);
    enemies.forEach(enemy => { 
        enemy.draw(ctx);
    });
}

tileMap.setCanvasSize(canvas); // Setting the canvas to match the map size.
setInterval(gameLoop, 1000 / 75);