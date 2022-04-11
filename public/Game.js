import { TileMap } from "./TileMap.js";
const tileSize = 32;
const velocity = 2;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);
let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio('../sounds/gameOver.wav');
const gameWinSound = new Audio('../sounds/gameWin.wav');
function gameLoop() {
    tileMap.draw(ctx);
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach(enemy => {
        enemy.draw(ctx, pause(), pacman);
    });
    checkGameOver();
}
function pause() {
    return !pacman.madeFirstMove || gameOver;
}
function checkGameOver() {
    if (!gameOver) { //if gameOver === false
        gameOver = isGameOver();
        if (gameOver) {
            gameOverSound.play();
        }
    }
}
function isGameOver() {
    return enemies.some((enemy) => !pacman.powerDotIsActive && enemy.collideWith(pacman));
}
tileMap.setCanvasSize(canvas); // Setting the canvas to match the map size.
setInterval(gameLoop, 1000 / 75);
