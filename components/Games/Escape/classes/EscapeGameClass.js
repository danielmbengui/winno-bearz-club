import Bee from './BeeClass';
import { handleBees } from '../js/functionBees';
class EscapeGame {
    constructor(canvas, ctx, mouse, ratioDevice = 1 /* for desktop */, gameSpeed = 5, life = 3, imgBackground, imgBackground1, imgBackground2,
    imgLevel, imgScore, imgGameOver, funcAnimate){
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        
        this.ratioDevice = ratioDevice;
        this.gameSpeed = gameSpeed;
        this.life = life;
        this.imgBackground = imgBackground;
        this.imgBackground1 = imgBackground1;
        this.imgBackground2 = imgBackground2;
        this.imgLevel = imgLevel;
        this.imgScore = imgScore;
        this.imgGameOver = imgGameOver;

        this.funcAnimate = funcAnimate;

        this.gameFrame = 0;
        this.score = 0;
        this.started = false;
        this.paused = false;
        this.gameOver = false;
        this.winner = false;

        this.enemyCame = false;


        this.background = {
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
            spriteWidth: 1024,
            spriteHeight: 512,
        }

        this.level = {
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
    
    handleBackground(){
        const BG = this.background;
        const gameSpeed = this.gameSpeed;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;

        const background = this.imgBackground;
        const background1 = this.imgBackground1;
        const background2 = this.imgBackground2;

        BG.x1 -= gameSpeed;
        if( BG.x1 < -BG.width){ BG.x1 = BG.width - 3 * ratioDevice ; }
    
        BG.x2 -= gameSpeed;
        if( BG.x2 < -BG.width){ BG.x1 = 0;BG.x2 = BG.width; }
        //ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
        //ctx.drawImage(background, BG.x2, BG.y, BG.width + 10, BG.height);

        ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
            BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
            ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);

        ctx.drawImage(background2, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
        BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
        ctx.drawImage(background2, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
            BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);

        ctx.drawImage(background1, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
            BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
            ctx.drawImage(background1, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);

        if( this.gameFrame % 30 === 0 ){
            BG.frame++;
            if( BG.frame >= 2 ){
                BG.frame = 0;
            }

            if( BG.frame === 1 ){
                BG.frameX = 0;
            }else{
                BG.frameX++;
            }   
        }
    }

    handleLife(){
        //console.log('nb life', player.life);
        const HEART = this.level;
        const canvas = this.canvas;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;
        //const player = this.player;
        const score = this.score;
        const level = this.imgLevel;
        const imgGameOver = this.imgGameOver;
        const imgScore = this.imgScore;
        const link = "/assets/games/escape/";
        //level.src = link + "life" + (this.life) + ".png";
        /*
        if( this.gameOver && this.life === 0 ){
            //this.life = 0;
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);  
            console.log('game over PLAYER', this.life)
            level.src = link + "laka.png";
        }
        */
        level.alt = 'Life image png';
        level.src = link + "life" + this.life + ".png";
        if( this.gameOver ){
            //level.src = link + "life0.png";
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
            //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
            setTimeout(() => {
                console.log("Delayed for 1 second.", level);
                //level.src = link + "life.png";
                //ctx.clearRect(HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);
                //ctx.globalCompositeOperation ="xor"
                ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 

                
                //ctx.drawImage(img2, 100, 100);

              }, 100)
        }
        ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
        ctx.drawImage(imgScore, HEART.x1 + 20 + HEART.spriteWidth/3/ratioDevice, HEART.y + 10, HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);  

        //level.src = link + `/life${this.life}.png`;
        ctx.fillStyle = 'red';
        //ctx.font();
        ctx.font = ratioDevice===2 ? '30px VT323 bold' : '60px VT323 bold';
        ctx.fillText("Score : " + score, HEART.x1 + 30 + HEART.spriteWidth/3/ratioDevice + HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);
        
    }

    handleGame(){
        this.funcAnimate();
    }

    
}

export default EscapeGame;