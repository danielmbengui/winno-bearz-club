import Game from "./GameClass";

class Salmon {
    constructor(canvas, mouse, gameFrame, ratioDevice) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.gameFrame = gameFrame;
        this.ratioDevice = ratioDevice;

        this.nTurn = 1;
        //this.player = player;

        this.salmonImage = document.getElementById('imgSalmon');
        //this.salmonImage.src = game.assetPath + "salmon-sprite.png";


        this.x = -100;
        this.y = canvas.height - 60 / ratioDevice;
        this.radius = 40 / ratioDevice;
        this.speed = Math.random() * Game.SPEED / 2 + 1;
        this.distance;
        this.counted = false;
        this.finished = false;
        //this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';

        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 700;
        this.spriteHeight = 700;
        //beePop1.play();
    }

    update() {
        //this.y -= this.speed;
        if (!this.finished && !this.counted) {
            this.x += this.speed;

            if (this.x >= this.canvas.width + 10) {
                this.x = -100;
                this.speed = Math.random() * Game.SPEED / 2 + 1;
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
            /*
            this.ctx.fillStyle = 'yellow';
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.stroke();
            */



            this.ctx.drawImage(this.salmonImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight, this.x - 78 / this.ratioDevice, this.canvas.height - this.spriteHeight / 4 / this.ratioDevice - 10, this.spriteWidth / 4 / this.ratioDevice, this.spriteHeight / 4 / this.ratioDevice);
        }
    }
}

export default Salmon;