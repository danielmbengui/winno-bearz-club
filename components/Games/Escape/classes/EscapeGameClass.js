import Bee from './BeeClass';
import { handleBees } from '../js/functionBees';
import { sizeWidth } from '@mui/system';
class EscapeGame {
    //static assetPath = "/assets/games/escape/";

    static idealWidth = 1024;
    static idealHeight = 512;
    static mobileWidth = 700;
    static mobileHeight = 250;

    static scoreWinner = 70;
    static scoreSecondEnemy = 30;
    static scoreThirdEnemy = 50;

    static scoreBackground1 = 3;
    static scoreBackground2 = 5;
    static scoreBackground3 = 7;

    static SPEED = 5;
    static defaultLife = 3;

    constructor(window, canvas, ctx, mouse, ratioDevice = 1 /* for desktop */, life = 3, 
    assetPath = "/assets/games/escape/", funcAnimate){
        this.window = window;
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.ratioDevice = ratioDevice;
        this.gameSpeed = EscapeGame.SPEED;
        this.life = life;
        this.assetPath = assetPath;
        this.funcAnimate = funcAnimate;

        //this.beesArray = [];

        this.imgBackground = document.getElementById('imgBackground');
        this.imgBackground1 = document.getElementById('imgBackground1');
        this.imgBackground2 = document.getElementById('imgBackground2');
        this.imgBackground3 = document.getElementById('imgBackground3');
        this.imgLife = document.getElementById('imgLife0');
        this.imgLife1 = document.getElementById('imgLife1');
        this.imgLife2 = document.getElementById('imgLife2');
        this.imgLife3 = document.getElementById('imgLife3');
        this.imgScore = document.getElementById('imgScore');
        this.imgWinner = document.getElementById('imgWinner');
        this.imgGameOver = document.getElementById('imgGameOver');

        this.ImgSalmon = new window.Image();
        this.imgMute = new window.Image();
        this.imgUnmute = new window.Image();
        this.imgYes = document.getElementById('imgYes');
        this.imgNo = new window.Image();
        //this.imgBackground.src = assetPath + 'background-sprite.png';
        //this.imgBackground1.src = assetPath + 'background-sprite1.png';
        //this.imgBackground2.src = assetPath + 'background-sprite2.png';
        //this.imgBackground3.src = assetPath + 'background-sprite3.png';
        //this.imgLife.src = assetPath + 'life' +life + '.png';
        //this.imgScore.src = assetPath + 'bee-score.png';
        //this.imgGameOver.src = assetPath + 'game-over.png';

        this.ImgSalmon.src = assetPath + 'salmon.png';
        this.imgMute.src = assetPath + 'mute.png';
        this.imgUnmute.src = assetPath + 'unmute.png';
        //this.imgWinner.src = assetPath + 'winner.png';
        //this.imgYes.src = assetPath + 'yes.png';
        this.imgNo.src = assetPath + 'no.png';

        this.gameFrame = 0;
        this.score = 0;
        this.started = true;
        this.paused = false;
        this.stopped = false;
        this.finished = false;
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

        
        this.salmonBackground = {
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
            spriteWidth: 700,
            spriteHeight: 700,
        }

        this.winnerBackground = {
            x1: 0,
            x2: canvas.width,
            y: 0,
            width: canvas.width,
            height: canvas.height,

            frame: 0,
            frameX: 0,
            frameY: 0,
            spriteWidth: 1024,
            spriteHeight: 1024,
        }
    }
    
    handleBackground(){
        //this.musicSound.play();
        
        const BG = this.background;
        const SALMON = this.salmonBackground;
        const speed = EscapeGame.SPEED;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;

        let backgroundSelected = this.imgBackground;
        if( this.score >= EscapeGame.scoreBackground1 ){
            backgroundSelected = this.imgBackground1;
        }else if( this.score >= EscapeGame.scoreBackground2 ){
            backgroundSelected = this.imgBackground2;
        }
        if( this.score >= EscapeGame.scoreBackground3 ){
            backgroundSelected = this.imgBackground3;
        }
        //const background = this.score >= EscapeGame.scoreBackground3 ? this.imgBackground3 : this.score >= EscapeGame.scoreBackground2 ? this.imgBackground2 : this.score >= EscapeGame.scoreBackground1 ? this.imgBackground1 : this.imgBackground;
        const background = backgroundSelected;
        const background1 = this.imgBackground1;
        const background2 = this.imgBackground2;
        const salmon = this.ImgSalmon;

        
        if( !this.stopped ){
            BG.x1 -= speed;
            if( BG.x1 < -BG.width){ BG.x1 = BG.width - 3 * ratioDevice ; }
        
            BG.x2 -= speed;
            if( BG.x2 < -BG.width){ BG.x1 = 0;BG.x2 = BG.width; }
            //ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
            //ctx.drawImage(background, BG.x2, BG.y, BG.width + 10, BG.height);

            
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

            if(this.gameFrame % 15 === 0 ){
                SALMON.frame++;
                if( SALMON.frame >= 3 ){
                    SALMON.frame = 0;
                }
    
                if( SALMON.frame === 2 ){
                    SALMON.frameX = 0;
                }else{
                    SALMON.frameX++;
                }   
            }
        }

        ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
            BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
            ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);
/*
        ctx.drawImage(background2, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
        BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
        ctx.drawImage(background2, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
            BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);

        ctx.drawImage(background1, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
            BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
            ctx.drawImage(background1, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight, 
                BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);

                */

        

        /*
        ctx.drawImage(salmon, SALMON.frameX * SALMON.spriteWidth, SALMON.frameY * SALMON.spriteHeight, 
            SALMON.spriteWidth, SALMON.spriteHeight, SALMON.x1, SALMON.height/2, SALMON.spriteWidth/ 3 / ratioDevice, SALMON.spriteHeight/ 3 / ratioDevice);

        ctx.drawImage(salmon, SALMON.frameX * SALMON.spriteWidth, SALMON.frameY * SALMON.spriteHeight, 
            SALMON.spriteWidth, SALMON.spriteHeight, SALMON.x1 + (SALMON.spriteWidth/ 3 / ratioDevice), SALMON.height/2, SALMON.spriteWidth/ 3 / ratioDevice, SALMON.spriteHeight/ 3 / ratioDevice);
        
        ctx.drawImage(salmon, SALMON.frameX * SALMON.spriteWidth, SALMON.frameY * SALMON.spriteHeight, 
            SALMON.spriteWidth, SALMON.spriteHeight, SALMON.width/2, SALMON.height/2, SALMON.spriteWidth/ 3 / ratioDevice, SALMON.spriteHeight/ 3 / ratioDevice);

        ctx.drawImage(salmon, SALMON.frameX * SALMON.spriteWidth, SALMON.frameY * SALMON.spriteHeight, 
            SALMON.spriteWidth, SALMON.spriteHeight, SALMON.width - SALMON.spriteWidth/ 3 / ratioDevice, SALMON.height/2, SALMON.spriteWidth/ 3 / ratioDevice, SALMON.spriteHeight/ 3 / ratioDevice);
            */

        
    }

    handleLife(){
        //console.log('nb life', player.life);
        const window = this.window;
        const HEART = this.level;
        const canvas = this.canvas;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;

        
        //const player = this.player;
        const score = this.score;
        const WINNER = this.winnerBackground;
        const imgWinner = this.imgWinner;
        const imgYes = this.imgYes;
        const imgNo = this.imgNo;
        const imgGameOver = this.imgGameOver;
        const imgScore = this.imgScore;
        const imgMute = this.imgMute;
        const assetPath = this.assetPath;
        let imgLife = this.imgLife;

        switch(this.life){
            case 3: imgLife = this.imgLife3; break;
            case 2: imgLife = this.imgLife2; break;
            case 1: imgLife = this.imgLife1; break;
            case 0: imgLife = this.imgLife; break;
            default : imgLife = this.imgLife;
        }
        
        //imgLife.src = assetPath + "life" + this.life + ".png";

        const ImgSalmon = new window.Image();
        ImgSalmon.src = assetPath + 'salmon.png';
        //level.src = link + "life" + (this.life) + ".png";


        /*
        if( this.gameOver && this.life === 0 ){
            //this.life = 0;
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);  
            console.log('game over PLAYER', this.life)
            level.src = link + "laka.png";
        }
        */

        //imgLife.src = link + "life" + this.life + ".png";
        //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
        ctx.drawImage(imgLife, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
        //console.log("Image life.", imgLife);
        ctx.drawImage(imgScore, HEART.x1 + 20 + HEART.spriteWidth/3/ratioDevice, HEART.y + 10, HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);  



        
        //level.src = link + `/life${this.life}.png`;
        ctx.fillStyle = 'red';
        //ctx.font();
        ctx.font = ratioDevice===2 ? 'bold 40px VT323' : 'bold 60px VT323';
        //ctx.font = ratioDevice===2 ? 'bold 30px Arial' : 'bold 60px Arial';
        ctx.fillText(score, HEART.x1 + 30 + HEART.spriteWidth/3/ratioDevice + HEART.spriteHeight/3/ratioDevice, ratioDevice > 1 ? HEART.spriteHeight/3/ratioDevice + 7 : (HEART.spriteHeight/3/ratioDevice));
        //ctx.drawImage(imgMute, canvas.width - 100, HEART.y + 10, HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 

        if( this.gameOver ){
            imgLife.src = assetPath + "life0.png";
            
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
            //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
            //ctx.drawImage(imgLife, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
            /*
            setTimeout(() => {
                console.log("Delayed for 1 second.", imgLife);
                //level.src = link + "life.png";
                //ctx.clearRect(HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);
                //ctx.globalCompositeOperation ="xor"
                //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
                //ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(imgLife, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 

                
                //ctx.drawImage(img2, 100, 100);

              }, 150)
              */
              
        }else if( this.winner ){
            ctx.drawImage(imgWinner, (canvas.width - imgWinner.width/ratioDevice) / 2, (canvas.height - imgWinner.height/ratioDevice) / 2, imgWinner.width/ratioDevice, imgWinner.height/ratioDevice);

            setTimeout(() => {
                //console.log("Delayed for 1 second WINNER.", imgLife);
                //level.src = link + "life.png";
                //ctx.clearRect(HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);
                //ctx.globalCompositeOperation ="xor"
                //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
                //ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
                //ctx.drawImage(imgLife, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
                /*
                if( WINNER.frame == 1 || WINNER.frame == 3 ){
                    WINNER.frameX = 0;
                    WINNER.frameY++;
                }else{
                    WINNER.frameX++;
                }  
                
                if( WINNER.frame >= 3 ){
                    //WINNER.frame = 0;
                    WINNER.frameX = 0;
                    WINNER.frameY = 2;
                }
    
                ctx.drawImage(imgWinner, WINNER.frameX * WINNER.spriteWidth, WINNER.frameY * WINNER.spriteHeight, 
                    WINNER.spriteWidth, WINNER.spriteHeight, 0, 50, canvas.width, canvas.height);
                    console.log('image WINNER', WINNER.frame, imgWinner)
                    WINNER.frame++;

                */
                
                //ctx.drawImage(img2, 100, 100);
                const widthWinner = imgWinner.width/1.5/ratioDevice;
                const heightWinner = imgWinner.height/1.5/ratioDevice;

                const diffWidth = canvas.width - widthWinner;
                const startWin = diffWidth/2;
                const endWin = canvas.width - diffWidth/2;

               // const startHeightWin = heightWinner/2/ratioDevice;

               // const widthYesNo = imgYes.width/3.3/ratioDevice;
               // const heightYesNo = imgYes.height/4/ratioDevice;

                console.log('win', diffWidth, startWin, endWin, 'width', canvas.width);
                

                

                //ctx.drawImage(imgWinner, startWin, startHeightWin, widthWinner, heightWinner);
                //ctx.drawImage(imgYes, startWin, startHeightWin + heightWinner + 10, widthYesNo, heightYesNo);
                //ctx.drawImage(imgNo, endWin - widthYesNo, startHeightWin + heightWinner + 10, widthYesNo, heightYesNo);

                
/*
                imgNo.addEventListener('click', (event) => {
                    console.log('click', 'no')
                });
                */

              }, 150)
              
            //ctx.drawImage(imgWinner, 0, 0, canvas.width, canvas.height);
            
        }
    }

    /*
    handleBees(){
        if( !this.gameOver && this.gameFrame % 50 === 0 ){
            //this.beesArray.push(new Bee(escapeGame, winno));
        }

        for (let i = 0; i < this.beesArray.length; i++) {                        
                if( this.beesArray[i].y < 0 - this.beesArray[i].radius * 2 ){
                    this.beesArray.splice(i, 1);
                    //console.log('finito : ' + i);
                }
    
                if( this.beesArray[i] ){
                    if( this.beesArray[i].distance < this.beesArray[i].radius + winno.radius){
                        //console.log('collision')
                        if( !beesArray[i].counted ){
                            beeTouchSound.play();
                            
                            //player.score++;
                            //game.score++;
                            escapeGame.score++;
                            beesArray[i].counted = true;
                            beesArray[i].update();
                            beesArray[i].draw();
                            beesArray.splice(i, 1);

                            if( escapeGame.score === EscapeGame.scoreWinner ){
                                escapeGame.started = false;
                                escapeGame.stopped = true;
                                escapeGame.winner = true;
                            }
                        }
                    }
                }
            
                if( beesArray[i] ){
                    beesArray[i].update();
                    beesArray[i].draw();
                }
        }
    }
    */

    handleGame(){
        this.funcAnimate();
    }

    
    
}

export default EscapeGame;