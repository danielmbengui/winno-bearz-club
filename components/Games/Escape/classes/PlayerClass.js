// NOUS

//import player from '../../../../public/assets/img/games/escape/player-sprite.png';
//const player = <Image src="/assets/img/games/escape/player-sprite.png" />;


class Player {
    constructor(canvas, ctx, mouse, nbLife = 3, gameFrame = 0, ratioDevice = 1 /* for desktop */, playerImage,level, imgGameOver, imgScore){
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.playerImage = playerImage;
        this.gameFrame = gameFrame;
        this.ratioDevice = ratioDevice;

        this.level = level;
        this.imgGameOver = imgGameOver;
        this.imgScore = imgScore;
        
        this.life = nbLife;
        this.score = 0;
        this.gameOver = false;
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.radius = 40 / ratioDevice;
        this.angle = 0;

        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 64;
        this.spriteHeight = 64;

        this.backgroundLevel = {
            //x:0,
            x1: 0,
            x2: canvas.width,
            y: 0,
            //y1:0,
            //y2:canvas.height,
            width: canvas.width,
            height: canvas.height,
        
            frame: 0,
            frameX: 0,
            frameY: 0,
            spriteWidth: 960,
            spriteHeight: 160,
        }
    }

    update(){
        const dx = this.x - this.mouse.x;
        const dy = this.y - this.mouse.y;
        if( this.mouse.x != this.x ){
            this.x -= dx/20;   
        }

        if( this.mouse.y != this.y ){
            this.y -= dy/20;   
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
        
    }

    draw(){
        if( this.mouse.click ){
            this.ctx.lineWidth = 0.2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.stroke();
        }

        
        this.ctx.fillStyle = 'cyan';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillRect(this.x, this.y, this.radius, 10);
        
        this.ctx.save();

        //this.handleLife();
        
        this.ctx.drawImage(this.playerImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
            this.spriteWidth, this.spriteHeight, this.x - 66/this.ratioDevice, this.y - 68/this.ratioDevice, this.spriteWidth * 2 / this.ratioDevice,this.spriteHeight * 2 / this.ratioDevice);
       
    }

    handleLife(){
        //console.log('nb life', player.life);
        const HEART = this.backgroundLevel;
        const canvas = this.canvas;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;
        //const player = this.player;
        const score = this.score;
        const level = this.level;
        const imgGameOver = this.imgGameOver;
        const imgScore = this.imgScore;
        const link = "/assets/games/escape/";
        level.src = link + "life" + (this.life) + ".png";
        /*
        if( this.gameOver && this.life === 0 ){
            //this.life = 0;
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);  
            console.log('game over PLAYER', this.life)
            level.src = link + "laka.png";
        }
        */

        if( this.life > 0 ){
            level.src = link + "life" + this.life + ".png";
                //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3, HEART.spriteHeight/3);
            //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);       
        }else{
            //player.life = 0;
            //level.src = link + 'life0.png';
            level.src = link + "life" + this.life + ".png";
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);                 
        } 
        
        
        console.log('image life', level)
        level.alt = 'Life image png';
        console.log('class player', this.life, this.gameOver);

        //level.src = link + `/life${this.life}.png`;
        ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
        ctx.drawImage(imgScore, HEART.x1 + 20 + HEART.spriteWidth/3/ratioDevice, HEART.y + 10, HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);  
        ctx.fillStyle = 'red';
        //ctx.font();
        ctx.font = ratioDevice===2 ? '30px VT323 bold' : '60px VT323 bold';
        ctx.fillText("Score : " + score, HEART.x1 + 30 + HEART.spriteWidth/3/ratioDevice + HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);
    }
}

export default Player;