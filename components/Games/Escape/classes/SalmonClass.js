class Salmon {
    constructor(game, player = null){
        this.game = game;
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        this.mouse = game.mouse;
        this.gameFrame = game.gameFrame;
        this.ratioDevice = game.ratioDevice;
        this.player = player;

        this.beeImage = document.getElementById('imgSalmon');
        //this.beeImage.src = game.assetPath + "salmon-sprite.png";


        this.x = -100;
        this.y = game.canvas.height - 60/game.ratioDevice;
        this.radius = 40/game.ratioDevice;
        this.speed = Math.random() * game.gameSpeed/2 + 1;
        this.distance;
        this.counted = false;
        //this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';

        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 700;
        this.spriteHeight = 700;
        //beePop1.play();
    }

    update(){
        //this.y -= this.speed;
        this.x += this.speed;
        //this.x = Math.random() <= 0.5 ? this.x - this.speed : this.x + this.speed;
        const dx = this.x - this.player.x;
        const dy = this.y - this.player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy)
        //ctx.moveTo(this.x, this.y);
        //console.log(beesArray.length)

        if( this.distance < this.radius + this.player.radius ){
            console.log('collision slalmon')
        }

        if( this.x >= this.canvas.width + 10) {
            this.x = -100;
            this.speed = Math.random() * this.game.gameSpeed/2 + 1;
        }

        if( !this.game.stopped && this.game.gameFrame % 15 === 0 ){
            this.frame++;
            if( this.frame >= 3 ){
                this.frame = 0;
            }

            if( this.frame === 2 ){
                this.frameX = 0;
            }else{
                this.frameX++;
            }   
        }
    }

    draw(){
        
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.stroke();
        
        
        
        this.ctx.drawImage(this.beeImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
            this.spriteWidth, this.spriteHeight, this.x - 78/this.ratioDevice, this.canvas.height - this.spriteHeight / 4 / this.ratioDevice - 10, this.spriteWidth / 4 / this.ratioDevice, this.spriteHeight / 4 / this.ratioDevice); 
            
    }
}

export default Salmon;