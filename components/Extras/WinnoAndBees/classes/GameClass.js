import Bee from "./BeeClass";
import Enemy from "./EnemyClass";
import Player from "./PlayerClass";
import Salmon from "./SalmonClass";
import Sound from "./SoundClass";


class Game {
    static IDEAL_DESKTOP_WIDTH = 1024;
    static IDEAL_DESKTOP_HEIGHT = 512;
    static IDEAL_MOBILE_WIDTH = 512;
    static IDEAL_MOBILE_HEIGHT = 256;

    static MAX_LIFE = 3;
    static SPEED = 5;
    static SCORE_TO_WHITELIST = 50;
    static SCORE_TO_AIRDROP = 70;
    //static SCORE_SECOND_ENEMY = 5; // 30% of the game
    static SCORE_SECOND_ENEMY = Game.SCORE_TO_AIRDROP * 30 / 100; // 30% of the game
    static SCORE_THIRD_ENEMY = Game.SCORE_TO_AIRDROP * 70 / 100; // 70% of the game

    static SCORE_FIRST_SALMON = Math.ceil(Game.SCORE_TO_AIRDROP * 25 / 100); // 25% of the game
    static SCORE_SECOND_SALMON = Math.ceil(Game.SCORE_TO_AIRDROP * 50 / 100); // 50% of the game
    static SCORE_THIRD_SALMON = Math.ceil(Game.SCORE_TO_AIRDROP * 75 / 100); // 50% of the game

    static SCORE_BACKGROUND_1 = Game.SCORE_TO_AIRDROP * 25 / 100; // 25% of the game
    static SCORE_BACKGROUND_2 = Game.SCORE_TO_AIRDROP * 50 / 100; // 50% of the game
    static SCORE_BACKGROUND_3 = Game.SCORE_TO_AIRDROP * 75 / 100; // 75% of the game


    /*
      min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is 


    */

    constructor(canvas, mouse, ratioDevice = 1 /* for desktop */, animate, unlimitedGame = false) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.ratioDevice = ratioDevice;
        this.animate = animate;
        this.unlimitedGame = unlimitedGame;

        this.gameFrame = 0;
        this.score = 0;
        //this.gameSpeed = Game.SPEED;
        this.life = Game.MAX_LIFE;
        this.player = new Player(canvas, mouse, this.gameFrame, ratioDevice);
        this.ennemiesArray = [];
        this.beesArray = [];
        this.salmonsArray = [];
        //this.salmon = new Salmon(canvas, mouse, this.gameFrame, ratioDevice);
        this.salmon = null;
        this.salmon1 = null;
        this.salmon2 = null;

        this.started = true;
        this.paused = false;
        this.stopped = false;
        this.finished = false;

        this.gameOver = false;
        this.winner = false;
        this.winnerWhitelist = false;
        this.winnerAirdrop = false;
        this.enemyCame = false;

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
        //this.imgWinner = document.getElementById('imgGameOver');
        this.imgGameOver = document.getElementById('imgGameOver');

        //this.musicSound = document.getElementById('musicGame');
        this.musicSound = new Sound('musicGame');

        //this.beeTouchSound = document.getElementById('musicTouchBee');
        this.beeTouchSound = new Sound('musicTouchBee');
        //this.enemyTouchSound = document.getElementById('musicTouchEnemy');
        this.enemyTouchSound = new Sound('musicTouchEnemy');
        //this.winnerSound = document.getElementById('musicWinner');
        this.winnerSound = new Sound('musicWinner');
        //this.gameOverSound = document.getElementById('musicGameOver');
        this.gameOverSound = new Sound('musicGameOver');

        this.background = {
            x1: 0,
            x2: canvas.width,
            y: 0,
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

    startGame() {
        //const player = this.player;
        const canvas = this.canvas;
        const mouse = this.mouse;
        const gameFrame = this.gameFrame;
        const ratioDevice = this.ratioDevice;
        const ennemiesArray = this.ennemiesArray;

        const enemy1 = new Enemy(canvas, mouse, gameFrame, ratioDevice, Game.SPEED, '1');
        const enemy2 = new Enemy(canvas, mouse, gameFrame, ratioDevice, Game.SPEED + 1, '2');
        const enemy3 = new Enemy(canvas, mouse, gameFrame, ratioDevice, Game.SPEED + 2, '3');
        ennemiesArray.push(enemy1);
        ennemiesArray.push(enemy2);
        ennemiesArray.push(enemy3);


        const musicSound = this.musicSound;
        if (musicSound.music.played && !musicSound.isPlaying) {
            musicSound.play();
        }

        this.background.x1 = 0;
        this.background.x2 = canvas.width;
        this.background.width = canvas.width;
        this.background.height = canvas.height;

        //this.enemy1.handleLife = this.handleLife;
    }

    finishGame() {
        const musicSound = this.musicSound;
        const gameOverSound = this.gameOverSound;
        const winnerSound = this.winnerSound;
        const ctx = this.ctx;
        const ennemiesArray = this.ennemiesArray;

        musicSound.pause();
        musicSound.currentTime = 0;
        //const canvas = this.canvas;


        const canvas = this.canvas;
        canvas.width = this.canvas.width / 2;
        canvas.height = this.canvas.height / 2;
        this.background.x1 = 0;
        this.background.x2 = canvas.width;
        this.background.width = canvas.width;
        this.background.height = canvas.height;
        this.ratioDevice = this.ratioDevice * 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.handleBackground();
        //game.gameFrame++;
        //game.playerUpdate();
        //this.enemy1.draw();
        //this.enemy2.draw();
        //this.enemy3.draw();

        /*
        this.playerDraw();
        for (let i = 0; i < ennemiesArray.length; i++) {
            const enemy = ennemiesArray[i];
            //this.ennemyUpdate(enemy);
            this.ennemyDraw(enemy);
        }
        this.handleBees();
*/

        if (this.gameOver) {
            gameOverSound.play();
            gameOverSound.isPlaying = false;
        }

        if (this.winner) {
            winnerSound.play();
            winnerSound.isPlaying = false;
        }
        this.handleLife();
    }

    handleBackground() {
        const canvas = this.canvas;
        const BG = this.background;
        const speed = Game.SPEED;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;

        let background = this.imgBackground;
        if (this.enemyCame) {
            background = this.imgBackground3;
        } else if (this.score >= Game.SCORE_BACKGROUND_1) {
            background = this.imgBackground1;
        } else if (this.score >= Game.SCORE_BACKGROUND_2) {
            background = this.imgBackground2;
        } else if (this.score >= Game.SCORE_BACKGROUND_3) {
            background = this.imgBackground3;
        }

        if (!this.paused && !this.stopped) {
            BG.x1 -= speed;
            if (BG.x1 < -BG.width) { BG.x1 = BG.width - 3 * ratioDevice; }

            BG.x2 -= speed;
            if (BG.x2 < -BG.width) { BG.x1 = 0; BG.x2 = BG.width; }

            if (this.gameFrame % 30 === 0) {
                BG.frame++;
                if (BG.frame >= 2) {
                    BG.frame = 0;
                }

                if (BG.frame === 1) {
                    BG.frameX = 0;
                } else {
                    BG.frameX++;
                }
            }
        }

        ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight,
            BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, canvas.width, canvas.height);
        ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight,
            BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, canvas.width, canvas.height);
    }

    handleLife() {
        const canvas = this.canvas;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;

        if (!this.finished) {
            const LEVEL = this.level;
            const score = this.score;
            const imgScore = this.imgScore;
            let imgLife = this.imgLife;

            switch (this.life) {
                case 3: imgLife = this.imgLife3; break;
                case 2: imgLife = this.imgLife2; break;
                case 1: imgLife = this.imgLife1; break;
                case 0: imgLife = this.imgLife; break;
                default: imgLife = this.imgLife;
            }

            ctx.font = ratioDevice >= 2 ? 'bold 40px VT323' : 'bold 60px VT323';
            ctx.drawImage(imgLife, LEVEL.x1 + 10, LEVEL.y + 10, LEVEL.spriteWidth / 3 / ratioDevice, LEVEL.spriteHeight / 3 / ratioDevice);
            ctx.drawImage(imgScore, LEVEL.x1 + 20 + LEVEL.spriteWidth / 3 / ratioDevice, LEVEL.y + 10, LEVEL.spriteHeight / 3 / ratioDevice, LEVEL.spriteHeight / 3 / ratioDevice);
            ctx.fillStyle = 'red';
            ctx.fillText(score, LEVEL.x1 + 30 + LEVEL.spriteWidth / 3 / ratioDevice + LEVEL.spriteHeight / 3 / ratioDevice, ratioDevice > 1 ? LEVEL.spriteHeight / 3 / ratioDevice + 7 : (LEVEL.spriteHeight / 3 / ratioDevice));
        }

        if (this.gameOver) {
            const imgGameOver = this.imgGameOver;
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
        } else if (this.winner) {
            const imgWinner = this.imgWinner;
            let imgWidth = imgWinner.width / ratioDevice;
            let imgHeight = imgWinner.height / ratioDevice;
            ctx.drawImage(imgWinner, (canvas.width - imgWidth) / 2, (canvas.height - imgHeight) / 2, imgWidth, imgHeight);
        }
    }

    playerUpdate() {
        this.player.update();
    }

    playerDraw() {
        this.player.draw();
    }

    ennemyUpdate(enemy) {
        if (enemy.idEnemy === '1') {
            enemy.update();
            //enemy.draw();
        }

        if (enemy.idEnemy === '2' && this.score >= Game.SCORE_SECOND_ENEMY) {
            enemy.update();
            //enemy.draw();
        }

        if (enemy.idEnemy === '3' && this.score >= Game.SCORE_THIRD_ENEMY) {
            enemy.update();
            //enemy.draw();
        }
    }

    ennemyDraw(enemy) {
        if (enemy.idEnemy === '1') {
            //enemy.update();
            enemy.draw();
        }

        if (enemy.idEnemy === '2' && this.score >= Game.SCORE_SECOND_ENEMY) {
            //enemy.update();
            enemy.draw();
        }

        if (enemy.idEnemy === '3' && this.score >= Game.SCORE_THIRD_ENEMY) {
            //enemy.update();
            enemy.draw();
        }
    }

    handleEnnemies() {
        //collision with player
        const player = this.player;
        const canvas = this.canvas;
        const mouse = this.mouse;
        const gameFrame = this.gameFrame;
        const ratioDevice = this.ratioDevice;
        const enemyTouchSound = this.enemyTouchSound;

        const ennemiesArray = this.ennemiesArray;
        //this.updateGameFrameEnnemies(ennemiesArray);

        for (let i = 0; i < ennemiesArray.length; i++) {
            const enemy = ennemiesArray[i];
            //enemy.gameFrame = gameFrame;

            this.ennemyUpdate(enemy);
            this.ennemyDraw(enemy);

            const dx = enemy.x - player.x;
            const dy = enemy.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < enemy.radius + player.radius) {
                this.life--;
                this.handleLife();
                //console.log('touch ENEMY', this.life) 
                this.paused = true;
                player.touched = true;

                if (this.life === 0) {
                    this.gameOver = true;
                    this.finished = true;
                    this.handleLife();
                    console.log('game over ENEMY', this.life);
                } else {
                    //this.game.handleLife();
                    setTimeout(() => {
                        this.paused = false;
                        player.touched = false;
                        enemy.x = canvas.width + 200;
                        enemy.y = Math.random() * (canvas.height - 150) + 90;
                        enemy.speed = Math.random() * 2 + 2;
                        this.handleGame();
                    }, 1000);
                }

                if (!this.gameOver) {
                    enemyTouchSound.play();
                    enemyTouchSound.isPlaying = false;
                }
            }
        }
    }

    handleBees() {
        const canvas = this.canvas;
        const mouse = this.mouse;
        const gameFrame = this.gameFrame;
        const ratioDevice = this.ratioDevice;
        const player = this.player;
        const beesArray = this.beesArray;
        const beeTouchSound = this.beeTouchSound;
        //this.updateGameFrameBees(beesArray);

        if (!this.finished && this.gameFrame % 50 === 0) {
            //beesArray.push(new Bee(escapeGame, winno));
            const bee = new Bee(canvas, mouse, gameFrame, ratioDevice);
            beesArray.push(bee);
            //bee.gameFrame = gameFrame;
            //console.log('BEEEEES', beesArray.length);
        }

        for (let i = 0; i < beesArray.length; i++) {
            const bee = beesArray[i];
            const dx = bee.x - player.x;
            const dy = bee.y - player.y;
            bee.distance = Math.sqrt(dx * dx + dy * dy);

            if (bee.y < 0 - bee.radius * 2) {
                beesArray.splice(i, 1);
            }

            if (bee) {
                if (bee.distance < bee.radius + player.radius) {
                    if (!bee.counted) {
                        beeTouchSound.play();
                        beeTouchSound.isPlaying = false;

                        this.score++;
                        bee.counted = true;
                        bee.update();
                        bee.draw();
                        beesArray.splice(i, 1);

                        if (this.score === Game.SCORE_SECOND_ENEMY || this.score === Game.SCORE_THIRD_ENEMY) {
                            this.enemyCame = true;
                            setTimeout(() => {
                                this.enemyCame = false;
                                //player.touched = false;
                                //enemy.x = canvas.width + 200;
                                //enemy.y = Math.random() * (canvas.height - 150) + 90;
                                //enemy.speed = Math.random() * 2 + 2;
                                //this.handleGame();
                            }, 500);
                        }

                        if (!this.unlimitedGame) {
                            if (this.score >= Game.SCORE_TO_WHITELIST) {
                                //this.started = false;
                                //this.stopped = true;
                                //this.finished = true;
                                this.winnerWhitelist = true;
                                //this.winner = true;
                                this.winnerSound.play();
                                this.winnerSound.isPlaying = false;
                            }

                            if (this.score >= Game.SCORE_TO_AIRDROP) {
                                //this.started = false;
                                //this.stopped = true;
                                this.finished = true;
                                this.winnerAirdrop = true;
                                this.winner = true;
                            }
                        }



                    }
                }
            }

            if (bee) {
                bee.update();
                bee.draw();
            }
        }
    }

    handleSalmons() {
        const canvas = this.canvas;
        const mouse = this.mouse;
        const gameFrame = this.gameFrame;
        const ratioDevice = this.ratioDevice;
        const salmonsArray = this.salmonsArray;

        //const salmonsArray = this.salmonsArray;
        //const beeTouchSound = this.beeTouchSound;
        //this.updateGameFrameBees(beesArray);
        
                if ( !this.finished && this.score >= Game.SCORE_FIRST_SALMON && this.score < Game.SCORE_FIRST_SALMON + 5 ) {
                    if( this.salmon === null ){
                        this.salmon = new Salmon(canvas, mouse, gameFrame, ratioDevice);   
                    }
                }
        
                if ( !this.finished && this.score >= Game.SCORE_SECOND_SALMON && this.score < Game.SCORE_SECOND_SALMON + 5 ) {
                    if( this.salmon1 === null ){
                        this.salmon1 = new Salmon(canvas, mouse, gameFrame, ratioDevice);   
                    }
                }
        
                if ( !this.finished && this.score >= Game.SCORE_THIRD_SALMON && this.score < Game.SCORE_THIRD_SALMON + 5 ) {
                    if( this.salmon2 === null ){
                        this.salmon2 = new Salmon(canvas, mouse, gameFrame, ratioDevice);   
                    }
                }
                
         if( this.salmon ){
             const player = this.player;
             const salmon = this.salmon;
             const dx = salmon.x - player.x;
             const dy = salmon.y - player.y;
             salmon.distance = Math.sqrt(dx*dx + dy*dy);
 
             if( salmon.nTurn >= 2 ){
                 this.salmon = null;
             }else {
                 salmon.update();
                 salmon.draw();
     
                 if( salmon.distance < salmon.radius + player.radius ){
                     console.log('collision slalmon');
                     this.score = this.score + 2;
                     salmon.counted = true;
                     this.salmon = null;
                 } 
             }  
         }

         if( this.salmon1){
            const player = this.player;
            const salmon = this.salmon1;
            const dx = salmon.x - player.x;
            const dy = salmon.y - player.y;
            salmon.distance = Math.sqrt(dx*dx + dy*dy);

            if( salmon.nTurn >= 2 ){
                this.salmon1 = null;
            }else {
                salmon.update();
                salmon.draw();
    
                if( salmon.distance < salmon.radius + player.radius ){
                    console.log('collision slalmon');
                    this.score = this.score + 2;
                    salmon.counted = true;
                    this.salmon1 = null;
                } 
            }  
        }

        if( this.salmon2 ){
            const player = this.player;
            const salmon = this.salmon2;
            const dx = salmon.x - player.x;
            const dy = salmon.y - player.y;
            salmon.distance = Math.sqrt(dx*dx + dy*dy);

            if( salmon.nTurn >= 2 ){
                this.salmon2 = null;
            }else {
                salmon.update();
                salmon.draw();
    
                if( salmon.distance < salmon.radius + player.radius ){
                    console.log('collision slalmon');
                    this.score = this.score + 2;
                    salmon.counted = true;
                    this.salmon2 = null;
                } 
            }  
        }

        if (this.score >= Game.SCORE_TO_WHITELIST) {
            //this.started = false;
            //this.stopped = true;
            //this.finished = true;
            this.winnerWhitelist = true;
            //this.winner = true;
            this.winnerSound.play();
            this.winnerSound.isPlaying = false;
        }

        if (this.score >= Game.SCORE_TO_AIRDROP) {
            //this.started = false;
            //this.stopped = true;
            this.finished = true;
            this.winnerAirdrop = true;
            this.winner = true;
        }

    }

    updateGameFrameElements() {
        const player = this.player;
        player.gameFrame = this.gameFrame;

        const ennemiesArray = this.ennemiesArray;
        for (let i = 0; i < ennemiesArray.length; i++) {
            const enemy = ennemiesArray[i];
            enemy.gameFrame = this.gameFrame;
        }

        const beesArray = this.beesArray;
        for (let i = 0; i < beesArray.length; i++) {
            const bee = beesArray[i];
            bee.gameFrame = this.gameFrame;
        }
        if (this.salmon) {
            this.salmon.gameFrame = this.gameFrame;
        }
        if (this.salmon1) {
            this.salmon1.gameFrame = this.gameFrame;
        }
        if (this.salmon2) {
            this.salmon2.gameFrame = this.gameFrame;
        }
    }

    updateGameFrameEnnemies(ennemiesArray) {
        //const ennemiesArray = this.ennemiesArray;
        for (let i = 0; i < ennemiesArray.length; i++) {
            const enemy = ennemiesArray[i];
            enemy.gameFrame = this.gameFrame;
        }
    }

    updateGameFrameBees(beesArray) {
        //const beesArray = this.beesArray;
        for (let i = 0; i < beesArray.length; i++) {
            const bee = beesArray[i];
            bee.gameFrame = this.gameFrame;
        }
    }


    handleGame() {
        //console.log('handle game', this.paused)
        this.animate();
    }
}

export default Game;