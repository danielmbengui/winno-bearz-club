class BelzeBearz {
    constructor(game, player = null, enemySpeed = 0, imgEnemy, enemyTouchSound){
        this.game = game;
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        this.mouse = game.mouse;
        this.player = player;
        this.enemySpeed = enemySpeed > 0 ? enemySpeed : game.gameSpeed;
        this.imgEnemy = imgEnemy;
        this.enemyTouchSound = enemyTouchSound;
        this.gameFrame = game.gameFrame;
        this.ratioDevice = game.ratioDevice;


        this.x = game.canvas.width + 200;
        this.y = Math.random() * (game.canvas.height - 150) + 90;
        this.radius = 40/game.ratioDevice;
        this.speed = Math.random() * ((enemySpeed > 0 ? enemySpeed : game.gameSpeed) - 3) + 2;
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
        
        //this.game.handleLife();
        
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

        if( this.game.gameFrame % 15 === 0 ){
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
            this.game.life--;
            this.game.handleLife();
            this.enemyTouchSound.play();
            //handleGameOver();
            console.log('touch ENEMY', this.game.life) 
                this.game.paused = true;
                this.player.touched = true;
                
                //this.player.draw();

            if( this.game.life === 0 ){
                this.game.gameOver = true;
                this.game.handleLife();
                /*
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.game.handleBackground();
                this.game.handleLife();
                this.player.draw();
                this.draw();
                */
                
                //mySound.pause();
                //mySound.currentTime = 0; 
                //player.life = 0
              //  handleGameOver();
                //this.game.handleLife();
                console.log('game over ENEMY', this.game.life)
            }  else{
                //this.game.handleLife();
                setTimeout(() => {
                    //console.log("Delayed for 1 second.");
                    //level.src = link + "life.png";
                    //ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
                    //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
                    this.game.paused = false;
                    this.player.touched = false;
                    this.x = this.canvas.width + 200;
                    this.y = Math.random() * (this.canvas.height - 150) + 90;
                    this.speed = Math.random() * 2 + 2;
                    this.game.handleGame();
                }, 1000);
            }
            
        }
    }
}



export default BelzeBearz;