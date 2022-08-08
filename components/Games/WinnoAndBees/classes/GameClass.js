import Bee from "./BeeClass";
import Enemy from "./EnemyClass";
import Player from "./PlayerClass";

class Game {


    static SPEED = 5;
    static MAX_LIFE = 3;

    static SCORE_WINNER = 10;
    static scoreSecondEnemy = 30;
    static scoreThirdEnemy = 50;

    static SCORE_BACKGROUND_1 = 3;
    static SCORE_BACKGROUND_2 = 5;
    static SCORE_BACKGROUND_3 = 7;

    constructor(canvas, mouse, ratioDevice = 1 /* for desktop */, pathImg = '', pathMusic = '', funcAnimate) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.ratioDevice = ratioDevice;
        this.pathImg = pathImg;
        this.pathMusic = pathMusic;
        this.funcAnimate = funcAnimate;
        this.gameFrame = 0;
        this.score = 0;
        //this.gameSpeed = Game.SPEED;
        this.life = Game.MAX_LIFE;

        

        this.started = true;
        this.paused = false;
        this.stopped = false;
        this.finished = false;

        this.gameOver = false;
        this.winner = false;
        this.enemyCame = false;

        this.player = new Player(canvas, mouse, this.gameFrame, ratioDevice);
        this.enemy1 = new Enemy(canvas, mouse, this.gameFrame, ratioDevice, this.player, Game.SPEED, '1');
        this.enemy2 = new Enemy(canvas, mouse, this.gameFrame, ratioDevice, this.player, Game.SPEED + 1, '2');
        this.enemy3 = new Enemy(canvas, mouse, this.gameFrame, ratioDevice, this.player, Game.SPEED + 2, '3');
        this.beesArray = [];

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

        this.musicSound = document.getElementById('musicGame');
        this.beeTouchSound = document.getElementById('musicTouchBee');
        this.enemyTouchSound = document.getElementById('musicTouchEnemy');
        this.winnerSound = document.getElementById('musicWinner');
        this.gameOverSound = document.getElementById('musicGameOver');

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
        const musicSound = this.musicSound;
        if (musicSound.played) {
            musicSound.volume = 0.9;
            musicSound.play();
        }

        this.enemy1.handleLife = this.handleLife;
    }

    finishGame() {
        const musicSound = this.musicSound;
        const gameOverSound = this.gameOverSound;
        const winnerSound = this.winnerSound;
        const canvas = this.canvas;
        const ctx = this.ctx;

        musicSound.pause();
        musicSound.currentTime = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.handleBackground();
        //game.gameFrame++;
        //game.playerUpdate();
        this.enemy1.draw();
        this.enemy2.draw();
        this.enemy3.draw();
        this.playerDraw();
        this.handleBees();
        if (this.gameOver) {
            gameOverSound.play();
        }

        if (this.winner) {
            winnerSound.play();
            //refCanvas.current.style.cursor = 'pointer';  
        }

        this.handleLife();


    }

    handleBackground() {
        const BG = this.background;
        //const SALMON = this.salmonBackground;
        const speed = Game.SPEED;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;

        let background = this.imgBackground;
        if (this.score >= Game.SCORE_BACKGROUND_1) {
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
            BG.spriteWidth, BG.spriteHeight, BG.x1, BG.y, BG.width, BG.height);
        ctx.drawImage(background, BG.frameX * BG.spriteWidth, BG.frameY * BG.spriteHeight,
            BG.spriteWidth, BG.spriteHeight, BG.x2, BG.y, BG.width, BG.height);
    }

    handleLife() {
        const LEVEL = this.level;
        const canvas = this.canvas;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;

        const score = this.score;
        const imgWinner = this.imgWinner;
        const imgGameOver = this.imgGameOver;
        const imgScore = this.imgScore;
        let imgLife = this.imgLife;

        switch (this.life) {
            case 3: imgLife = this.imgLife3; break;
            case 2: imgLife = this.imgLife2; break;
            case 1: imgLife = this.imgLife1; break;
            case 0: imgLife = this.imgLife; break;
            default: imgLife = this.imgLife;
        }

        ctx.drawImage(imgLife, LEVEL.x1 + 10, LEVEL.y + 10, LEVEL.spriteWidth / 3 / ratioDevice, LEVEL.spriteHeight / 3 / ratioDevice);
        ctx.drawImage(imgScore, LEVEL.x1 + 20 + LEVEL.spriteWidth / 3 / ratioDevice, LEVEL.y + 10, LEVEL.spriteHeight / 3 / ratioDevice, LEVEL.spriteHeight / 3 / ratioDevice);
        ctx.fillStyle = 'red';
        ctx.font = ratioDevice === 2 ? 'bold 40px VT323' : 'bold 60px VT323';
        ctx.fillText(score, LEVEL.x1 + 30 + LEVEL.spriteWidth / 3 / ratioDevice + LEVEL.spriteHeight / 3 / ratioDevice, ratioDevice > 1 ? LEVEL.spriteHeight / 3 / ratioDevice + 7 : (LEVEL.spriteHeight / 3 / ratioDevice));

        if (this.gameOver) {
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
        } else if (this.winner) {
            ctx.drawImage(imgWinner, (canvas.width - imgWinner.width / ratioDevice) / 2, (canvas.height - imgWinner.height / ratioDevice) / 2, imgWinner.width / ratioDevice, imgWinner.height / ratioDevice);
        }
    }

    playerUpdate() {
        this.player.update();
    }

    playerDraw() {
        this.player.draw();
    }

    handleEnnemies() {
        //collision with player
        const player = this.player;
        const enemy1 = this.enemy1;
        const enemyTouchSound = this.enemyTouchSound;

        enemy1.update();
        enemy1.draw();

        const dx = enemy1.x - player.x;
        const dy = enemy1.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if( distance < enemy1.radius + player.radius ){
            this.life--;
            this.handleLife();
            //console.log('touch ENEMY', this.life) 
            this.paused = true;
            player.touched = true;
            
            if( this.life === 0 ){
                //this.started = false;
                this.gameOver = true;
                this.finished = true;
                //this.game.stopped = true;
                this.handleLife();
                console.log('game over ENEMY', this.life);
            }  else{
                //this.game.handleLife();
                setTimeout(() => {
                    //console.log("Delayed for 1 second.");
                    //level.src = link + "life.png";
                    //ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
                    //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
                    this.paused = false;
                    player.touched = false;
                    enemy1.x = this.canvas.width + 200;
                    enemy1.y = Math.random() * (this.canvas.height - 150) + 90;
                    enemy1.speed = Math.random() * 2 + 2;
                    this.handleGame();
                }, 1000);
            }

            if( !this.gameOver ){
                this.enemyTouchSound.play();
            }
        }
    }

    handleBees() {
        this.updateGameFrame();
        const canvas = this.canvas;
        const mouse = this.mouse;
        const gameFrame = this.gameFrame;
        const ratioDevice = this.ratioDevice;
        const player = this.player;
        const beesArray = this.beesArray;
        const beeTouchSound = this.beeTouchSound;

        if (!this.finished && this.gameFrame % 50 === 0) {
            //beesArray.push(new Bee(escapeGame, winno));
            const bee = new Bee(canvas, mouse, gameFrame, ratioDevice, this.stopped, player);
            beesArray.push(bee);
            bee.gameFrame = this.gameFrame;
            //console.log('BEEEEES', beesArray.length);
        }

        for (let i = 0; i < beesArray.length; i++) {
            const bee = beesArray[i];

            if (bee.y < 0 - bee.radius * 2) {
                beesArray.splice(i, 1);
                //console.log('finito : ' + i);
            }

            if (bee) {
                if (bee.distance < bee.radius + player.radius) {
                    //console.log('collision')
                    if (!bee.counted) {
                        beeTouchSound.play();
                        /*
                        if( beesArray[i].sound == 'sound1' ){
                            beeTouchSound.play();
                        }else {
                            beeTouchSound1.play();
                        }
                        */

                        //player.score++;
                        //game.score++;
                        this.score++;
                        bee.counted = true;
                        bee.update();
                        bee.draw();
                        beesArray.splice(i, 1);

                        if (this.score === Game.SCORE_WINNER) {
                            this.started = false;
                            //this.stopped = true;
                            this.finished = true;
                            this.winner = true;
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

    updateGameFrame() {
        const beesArray = this.beesArray;
        for (let i = 0; i < beesArray.length; i++) {
            const bee = beesArray[i];
            bee.gameFrame = this.gameFrame;
        }
    }

    handleGame() {
        this.funcAnimate();
    }
}

export default Game;