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
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach(enemy => {
        enemy.draw(ctx, pause(), pacman);
    });
    checkGameOver();
    checkGameWin();
}
function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
}
function checkGameOver() {
    if (!gameOver) { //if gameOver === false
        gameOver = isGameOver();
        if (gameOver) {
            gameOverSound.play();
        }
    }
}
function checkGameWin() {
    if (!gameWin) {
        gameWin = tileMap.didWin();
        if (gameWin) {
            gameWinSound.play();
        }
    }
}
function isGameOver() {
    return enemies.some((enemy) => !pacman.powerDotIsActive && enemy.collideWith(pacman));
}
function drawGameEnd() {
    if (gameOver || gameWin) {
        let text = "  You Win!";
        if (gameOver) {
            text = "Game Over!";
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, canvas.height / 2.5, canvas.width, 80);
        ctx.font = "75px comic sans";
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(1, "yellow");
        ctx.fillStyle = gradient;
        ctx.fillText(text, 17.5, canvas.height / 1.8);
    }
}
tileMap.setCanvasSize(canvas); // Setting the canvas to match the map size.
setInterval(gameLoop, 1000 / 75);
