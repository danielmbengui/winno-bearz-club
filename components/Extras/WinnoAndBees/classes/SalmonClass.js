import Game from "./GameClass";

class Salmon {
    static TURN_MAX = 2;
    static IMG_SALMON = 'imgSalmon';
    
    constructor(canvas, mouse, gameFrame, ratioDevice) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.gameFrame = gameFrame;
        this.ratioDevice = ratioDevice;

        this.nTurn = 0;
        this.salmonImage = document.getElementById(Salmon.IMG_SALMON);

        this.x = -100;
        this.y = canvas.height - 60 / ratioDevice;
        this.radius = 40 / ratioDevice;
        this.speed = Game.MAX_SPEED - 2;
        this.distance;
        this.counted = false;
        this.finished = false;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 700;
        this.spriteHeight = 700;
    }

    update() {
        if (!this.finished && !this.counted) {
            this.x += this.speed;
            if (this.x >= this.canvas.width + 10) {
                this.x = -100;
                if( this.speed < Game.MAX_SPEED)
                    this.speed++;
                this.nTurn++;
            }

            if (this.gameFrame % 15 === 0) {
                this.frame++;
                if (this.frame >= 3) {
                    this.frame = 0;
                }

                if (this.frame === 2) {
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
            }
        }
    }

    draw() {
        if (!this.finished && !this.counted) {
            this.ctx.drawImage(this.salmonImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight, this.x - 78 / this.ratioDevice, this.canvas.height - this.spriteHeight / 4 / this.ratioDevice - 10, this.spriteWidth / 4 / this.ratioDevice, this.spriteHeight / 4 / this.ratioDevice);
        }
    }
}

export default Salmon;