var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Enemy_instances, _Enemy_loadImages;
export class Enemy {
    constructor(x, y, tileSize, velocity, tileMap) {
        _Enemy_instances.add(this);
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.normalGhost = null;
        this.scaredGhost = null;
        this.scaredGhost2 = null;
        __classPrivateFieldGet(this, _Enemy_instances, "m", _Enemy_loadImages).call(this);
    }
    draw() { }
}
_Enemy_instances = new WeakSet(), _Enemy_loadImages = function _Enemy_loadImages() {
    this.normalGhost = new Image();
    this.normalGhost.src = '../images/ghost.png';
    this.scaredGhost = new Image();
    this.scaredGhost.src = '../images/scaredGhost.png';
    this.scaredGhost2 = new Image();
    this.scaredGhost2.src = '../images/scaredGhost2.png';
};
