import { TileMap } from "./TileMap.js";
import { MovingDirection } from "./MoveDirection.js"
import { Enemy } from "./Enemy.js";

// Creating pacman class
export class Pacman {
    x: number;
    y: number;
    tileSize: number;
    velocity: number;
    tileMap: TileMap;
    pacmanImages: HTMLImageElement[] = [];
    pacmanImageIndex: number = 1;
    currentMovingDirection: number | null;
    requestedMovingDirection: number | null;
    pacmanAnimationTimerDefualt: number;
    pacmanAnimationTimer: number | null;
    pacmanRotation: number;
    wakaSound: HTMLAudioElement;
    powerDotSound: HTMLAudioElement;
    eatGhostSound: HTMLAudioElement;
    madeFirstMove: boolean;
    powerDotIsActive: boolean;
    powerDotIsAboutToExpire: boolean;
    timers: Array<number>;
    userPoints:number;
    pointsDisplay: HTMLSpanElement;

    constructor(x: number, y: number, tileSize: number, velocity: number, tileMap: TileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.pacmanAnimationTimerDefualt = 10;
        this.pacmanAnimationTimer = null;

        this.pacmanRotation = this.Rotation.right;

        this.madeFirstMove = false;

        this.powerDotIsActive = false;
        this.powerDotIsAboutToExpire = false;
        
        this.userPoints = 0;

        this.pointsDisplay = document.querySelector('#userPoints')!;

        this.timers = [];

        this.wakaSound = new Audio('../sounds/waka.wav');
        this.powerDotSound = new Audio('../sounds/power_dot.wav');
        this.eatGhostSound = new Audio('../sounds/eat_ghost.wav');

        document.addEventListener("keydown", this.#keydown)

        this.#loadPacmanImages();
    }

    Rotation = {
        right: 0,
        down: 1,
        left: 2,
        up: 3
    }

    // Method:
    // Drawing Pacman every 13.3 mili seconds
    draw(ctx: CanvasRenderingContext2D, pause: boolean, enemies:Array<Enemy>) {
        if (!pause) { // if game is not paused
            this.#move();
            this.#animate();
        }
        this.#eatDot();
        this.#eatPowerDot();
        this.#eatGhost(enemies);

        // line 79 - 92
        // Rotating the whole canvas to get the right perspective of the pacman.
        // By the direcation pacman is moving.
        const size = this.tileSize / 2;

        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
        ctx.drawImage(
            this.pacmanImages[this.pacmanImageIndex],
            -size,
            -size,
            this.tileSize,
            this.tileSize
        );

        ctx.restore();
    }

    // Private Method:
    // Setting pacman images 
    // Inserting all pacman images into array
    #loadPacmanImages() {
        const pacmanImage1 = new Image();
        pacmanImage1.src = "../images/pac0.png"; // Closed Mouth

        const pacmanImage2 = new Image();
        pacmanImage2.src = "../images/pac1.png"; // Half Opened Mouth

        const pacmanImage3 = new Image();
        pacmanImage3.src = "../images/pac2.png"; // Fully Opened Mouth

        const pacmanImage4 = new Image();
        pacmanImage4.src = "../images/pac1.png"; // Half Opened Mouth

        this.pacmanImages = [
            pacmanImage1,
            pacmanImage2,
            pacmanImage3,
            pacmanImage4
        ];

        this.pacmanImageIndex = 0; // Starting Pacman image
    }

    // Private Method:
    // Checkes which keydown and setting the request to the key down
    #keydown = (event: KeyboardEvent) => {
        this.madeFirstMove = true;
        if (event.key === "ArrowUp") { //up
            if (this.currentMovingDirection === MovingDirection.down)
                this.currentMovingDirection = MovingDirection.up;
            this.requestedMovingDirection = MovingDirection.up;
        }

        if (event.key === "ArrowDown") { //down
            if (this.currentMovingDirection === MovingDirection.up)
                this.currentMovingDirection = MovingDirection.down;
            this.requestedMovingDirection = MovingDirection.down;
        }

        if (event.key === "ArrowRight") { //right
            if (this.currentMovingDirection === MovingDirection.left)
                this.currentMovingDirection = MovingDirection.right;
            this.requestedMovingDirection = MovingDirection.right;
        }

        if (event.key === "ArrowLeft") { //left
            if (this.currentMovingDirection === MovingDirection.right)
                this.currentMovingDirection = MovingDirection.left;
            this.requestedMovingDirection = MovingDirection.left;
        }
    }

    // Private Method:
    // Setting pacman to move 
    #move() {
        if (this.currentMovingDirection !== this.requestedMovingDirection) { // Checks if current moving direction not equals to requested moving direction
            if (Number.isInteger(this.x / this.tileSize) &&
                Number.isInteger(this.y / this.tileSize)
            ) {

                if ( // if pacman didn't colide with wall
                    !this.tileMap.didCollideWithEnviorment(
                        this.x,
                        this.y,
                        this.requestedMovingDirection
                    )
                )
                    this.currentMovingDirection = this.requestedMovingDirection; // Setting moving direction to the requested moving direction
            }
        }

        if (this.tileMap.didCollideWithEnviorment( // if pacman did collide with wall set pacman image to half opened mouth line 176 and setting the pacman image timer to null
            this.x,
            this.y,
            this.currentMovingDirection
        )
        ) {
            this.pacmanAnimationTimer = null;
            this.pacmanImageIndex = 1;
            return;
        }
        else if (this.currentMovingDirection !== null &&
            this.pacmanAnimationTimer === null) { // if pacman is started moving setting pacman image animation timer to default timer
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefualt;
        }

        // Setting pacman's x and y propreties to the current move direction that came from the user input.
        switch (this.currentMovingDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pacmanRotation = this.Rotation.up;
                break;

            case MovingDirection.down:
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down;
                break;

            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left;
                break;

            case MovingDirection.right:
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.right;
                break;
        }
    }

    // Private Method:
    // Acorrding to timer animating pacman image
    #animate() {
        if (this.pacmanAnimationTimer === null) {
            return;
        }
        this.pacmanAnimationTimer--;
        if (this.pacmanAnimationTimer === 0) {
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefualt;
            this.pacmanImageIndex++;
            if (this.pacmanImageIndex === this.pacmanImages.length) { // if the image of the pacman is eaul to the last index rest pacman animation
                this.pacmanImageIndex = 0;
            }
        }
    }

    // Private Method:
    // If condition is true
    // play wakaSound
    #eatDot() {
        if (this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove) {
            this.wakaSound.play();
            this.userPoints++;
            this.pointsDisplay.innerHTML = `${this.userPoints}`;
        }
    }

    // Private Method:
    // Checks if powerDot was eaten by pacman
    // Play PowerDotSound
    // Reset all powerDot Timers
    // powerDot timer was eaten is a timer of 6 seconds
    // powerDotIsAboutToExpire timer is a timer of 3 seconds
    #eatPowerDot() {
        if (this.tileMap.eatPowerDot(this.x, this.y)) {
            this.powerDotSound.play();
            this.userPoints += 5;
            this.pointsDisplay.innerHTML = `${this.userPoints}`;
            this.powerDotIsActive = true;
            this.powerDotIsAboutToExpire = false;

            this.timers.forEach(timer => {
                clearTimeout(timer);
            });
            this.timers = [];

            let powerDotTimer = setTimeout(() => {
                this.powerDotIsActive = false;
                this.powerDotIsAboutToExpire = false;
            }, 1000 * 6);

            this.timers.push(powerDotTimer);

            let powerDotIsAboutToExpireTimer = setTimeout(() => {
                this.powerDotIsAboutToExpire = true;
            }, 1000 * 3);
            this.timers.push(powerDotIsAboutToExpireTimer);
        }
    }
    
    // Private Method:
    // While powerDot is active pacman allowed to eat ghosts
    // While pacman Colide with ghost and while powerDot is active splice the ghost that was collided with pacman
    // Play eat ghost
    #eatGhost(enemies:Array<Enemy>) {
        if (this.powerDotIsActive) {
            const collideEnemies = enemies.filter((enemy) => enemy.collideWith(this));
            collideEnemies.forEach(enemy =>{
                enemies.splice(enemies.indexOf(enemy),1);
                this.eatGhostSound.play();
            })
        }
    }
}