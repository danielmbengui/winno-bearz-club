import Bee from './BeeClass';
import { handleBees } from '../js/functionBees';
class Game {
    constructor(canvas, ctx, mouse, player = null, enemy = null, beesArray = null, gameFrame = 0, ratioDevice = 1 /* for desktop */, score, gameSpeed, background, background1, background2,
    level, imgGameOver, imgScore){
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.player = player;
        this.enemy = enemy;
        this.beesArray = beesArray;
        this.gameFrame = gameFrame;
        this.ratioDevice = ratioDevice;
        this.gameOver = false;
        this.score = score;
        this.gameSpeed = gameSpeed;
        this.background = background;
        this.background1 = background1;
        this.background2 = background2;
        this.level = level;
        this.imgGameOver = imgGameOver;
        this.imgScore = imgScore;

        this.backgroundBG = {
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

    handleBackground(){
        const BG = this.backgroundBG;
        const gameSpeed = this.gameSpeed;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;
        const score = this.score;

        const background = this.background;
        const background1 = this.background1;
        const background2 = this.background2;

        BG.x1 -= gameSpeed;
        if( BG.x1 < -BG.width){ BG.x1 = BG.width - 3 * ratioDevice ; }
    
        BG.x2 -= gameSpeed;
        if( BG.x2 < -BG.width){ BG.x1 = 0;BG.x2 = BG.width; }
        //ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
        //ctx.drawImage(background, BG.x2, BG.y, BG.width + 10, BG.height);
        if( score < 5 ){
            ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
                ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                    BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);
        }else if( score < 10 ){
            ctx.drawImage(background2, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
                ctx.drawImage(background2, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                    BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);
        }else {
            ctx.drawImage(background1, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
                ctx.drawImage(background1, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                    BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);
        }

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

    animate(){
        //this.enemy.handleEnemies();
        //this.player.update();
        //this.player.draw();
        this.handleBackground();
        //this.player.handleLife();
        this.gameFrame++;
        //this.enemy.gameFrame = this.gameFrame;
        //this.player.gameFrame = this.gameFrame;
        /*
        for (let i = 0; i < this.beesArray.length; i++) {
            this.beesArray[i].gameFrame++;
        }
        */
        
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
        const player = this.player;
        level.src = link + "life" + (player.life) + ".png";
        /*
        if( this.gameOver && this.life === 0 ){
            //this.life = 0;
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);  
            console.log('game over PLAYER', this.life)
            level.src = link + "laka.png";
        }
        */

        if( player.life > 0 ){
            level.src = link + "life" + player.life + ".png";
                //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3, HEART.spriteHeight/3);
            //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);       
        }else{
            //player.life = 0;
            //level.src = link + 'life0.png';
            level.src = link + "life" + player.life + ".png";
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);                 
        } 
        
        
        console.log('image life', level)
        level.alt = 'Life image png';
        console.log('class player', player.life, player.gameOver);

        //level.src = link + `/life${this.life}.png`;
        ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
        ctx.drawImage(imgScore, HEART.x1 + 20 + HEART.spriteWidth/3/ratioDevice, HEART.y + 10, HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);  
        ctx.fillStyle = 'red';
        //ctx.font();
        ctx.font = ratioDevice===2 ? '30px VT323 bold' : '60px VT323 bold';
        ctx.fillText("Score : " + score, HEART.x1 + 30 + HEART.spriteWidth/3/ratioDevice + HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);
    }

}

export default Game;