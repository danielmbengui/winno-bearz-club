import Game from "./GameClass";

class Bee {
    constructor(canvas, mouse, gameFrame, ratioDevice, gameStopped, player = null) {

        //this.game = game;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.gameFrame = gameFrame;
        this.ratioDevice = ratioDevice;
        this.gameStopped = gameStopped;
        this.player = player;

        //this.beeImage = new game.window.Image();
        //this.beeImage.src = game.assetPath + "bee-sprite.png";
        this.beeImage = document.getElementById('imgBee');


        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 40 / ratioDevice;
        this.speed = Math.random() * (Game.SPEED) + 1;
        this.distance;
        this.counted = false;
        //this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';

        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 64;
        this.spriteHeight = 64;
        //beePop1.play();

    }

    update() {
        this.y -= this.speed;
        //this.x = Math.random() <= 0.5 ? this.x - this.speed : this.x + this.speed;
        const dx = this.x - this.player.x;
        const dy = this.y - this.player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy)
        //ctx.moveTo(this.x, this.y);
        //console.log(beesArray.length)

        if (!this.gameStopped && this.gameFrame % 15 === 0) {
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

    draw() {
        /*
        this.ctx.fillStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.stroke();
        */

        this.ctx.drawImage(this.beeImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.x - 78 / this.ratioDevice, this.y - 68 / this.ratioDevice, this.spriteWidth * 2 / this.ratioDevice, this.spriteHeight * 2 / this.ratioDevice);
    }
}

export default Bee;