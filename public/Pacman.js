var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Pacman_instances, _Pacman_loadPacmanImages;
export class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        _Pacman_instances.add(this);
        this.pacmanImages = [];
        this.pacmanImageIndex = 1;
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        __classPrivateFieldGet(this, _Pacman_instances, "m", _Pacman_loadPacmanImages).call(this);
    }
    draw(ctx) {
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y, this.tileSize, this.tileSize);
    }
}
_Pacman_instances = new WeakSet(), _Pacman_loadPacmanImages = function _Pacman_loadPacmanImages() {
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
};
// column * this.tileSize,
//  row * this.tileSize,
//   this.tileSize,
//    velocity,
//     this
