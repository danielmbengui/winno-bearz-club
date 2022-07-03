class Enemy {
    constructor(canvas, ctx, mouse, player = null, gameFrame = 0, ratioDevice = 1 /* for desktop */, imgEnemy){
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.player = player;
        this.imgEnemy = imgEnemy;
        this.gameFrame = gameFrame;
        this.ratioDevice = ratioDevice;


        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 40/ratioDevice;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 64;
        this.spriteHeight = 64;
    }

    draw(){
        
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        //this.player.handleLife();
        
        this.ctx.drawImage(this.imgEnemy, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
           this.spriteWidth, this.spriteHeight, this.x - 66/this.ratioDevice, this.y - 68/this.ratioDevice, this.spriteWidth * 2 / this.ratioDevice, this.spriteHeight * 2 / this.ratioDevice); 
           
    }

    update(){
        this.x -= this.speed;
        if( this.x < 0 - this.radius * 2 ){
            this.x = this.canvas.width + 200;
            this.y = Math.random() * (this.canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }

        if( this.gameFrame % 15 === 0 ){
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
        
        //collision with player
        const dx = this.x - this.player.x;
        const dy = this.y - this.player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if( distance < this.radius + this.player.radius ){
            //console.log('collision', 'player collision enemy');
            this.player.life--;
            //enemyTouch.play();
            //handleGameOver();
            if( this.player.life === 0 ){
                this.player.gameOver = true;
                //mySound.pause();
                //mySound.currentTime = 0; 
                //player.life = 0
              //  handleGameOver();
              console.log('game over ENEMY', this.player.life)
            }else{
                this.x = this.canvas.width + 200;
                this.y = Math.random() * (this.canvas.height - 150) + 90;
                this.speed = Math.random() * 2 + 2;
            }  
            console.log('touch ENEMY', this.player.life) 
        }
    }
}



export default Enemy;