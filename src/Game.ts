import { Enemy } from "./Enemy.js";
import { Pacman } from "./Pacman.js";
import { TileMap } from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity) as Pacman;
const enemies = tileMap.getEnemies(velocity) as Array<Enemy>;

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio('../sounds/gameOver.wav');
const gameWinSound = new Audio('../sounds/gameWin.wav')

function gameLoop() {
    tileMap.draw(ctx); //Drawing a map every 13.3 mili seconds
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies); // Drawing pacman every 13.3 mili seconds
    enemies.forEach(enemy => {
        enemy.draw(ctx, pause(), pacman);
    });
    checkGameOver();
    checkGameWin();
}

// Function:
// Pauses the game if creatia is met
function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
}

// Function:
// Checks if game over
// true : play sound GameOver
function checkGameOver() {
    if (!gameOver) { //if gameOver === false
        gameOver = isGameOver();
        if (gameOver) {
            gameOverSound.play();
        }
    }
}

// Function:
// Checks if game won
// true : play sound GameWon
function checkGameWin() {
    if (!gameWin) {
        gameWin = tileMap.didWin();
        if (gameWin) {
            gameWinSound.play();
        }
    }
}

// Function:
// return true or false
// Checks if pacman didnt eat powerDot and collide with enemy
// true: GameOver
// false: Keep Playing
function isGameOver() {
    return enemies.some(
        (enemy) => !pacman.powerDotIsActive && enemy.collideWith(pacman) 
    );
}

// Function:
// Checks if GameWin or GameOver
// Displays the messeage on the screen GameOver | GameWin
function drawGameEnd() {
    if (gameOver || gameWin) {
        let text = "  You Win!";
        if ( gameOver){
            text = "Game Over!"; 
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, canvas.height / 2.5, canvas.width, 80);

        ctx.font = "75px comic sans";
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(1, "yellow");

        ctx.fillStyle = gradient;
        ctx.fillText(text, 17.5, canvas.height/1.8);

    }
}


tileMap.setCanvasSize(canvas); // Setting the canvas to match the map size.
setInterval(gameLoop, 1000 / 75);