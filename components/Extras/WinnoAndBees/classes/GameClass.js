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
    static MAX_SPEED = 5;
    static SCORE_TO_WHITELIST = 50;
    static SCORE_TO_AIRDROP = 70;
    static SCORE_SECOND_ENEMY = Game.SCORE_TO_AIRDROP * 30 / 100; // 30% of the game
    //static SCORE_SECOND_ENEMY = 5; // 30% of the game
    static SCORE_THIRD_ENEMY = Game.SCORE_TO_AIRDROP * 70 / 100; // 70% of the game
    //static SCORE_THIRD_ENEMY = 10; // 70% of the game
    static TIME_BACKGROUND_ENEMY = 3000;
    static SCORE_FIRST_SALMON = Math.ceil(Game.SCORE_TO_AIRDROP * 25 / 100); // 25% of the game
    static SCORE_SECOND_SALMON = Math.ceil(Game.SCORE_TO_AIRDROP * 50 / 100); // 50% of the game
    static SCORE_THIRD_SALMON = Math.ceil(Game.SCORE_TO_AIRDROP * 75 / 100); // 50% of the game

    static SCORE_BACKGROUND_1 = Game.SCORE_TO_AIRDROP * 25 / 100; // 25% of the game
    static SCORE_BACKGROUND_2 = Game.SCORE_TO_AIRDROP * 50 / 100; // 50% of the game
    static SCORE_BACKGROUND_3 = Game.SCORE_TO_AIRDROP * 75 / 100; // 75% of the game

    static IMG_BACKGROUND = 'imgBackground';
    static IMG_BACKGROUND1 = 'imgBackground1';
    static IMG_BACKGROUND2 = 'imgBackground2';
    static IMG_BACKGROUND3 = 'imgBackground3';
    static IMG_LIFE0 = 'imgLife0';
    static IMG_LIFE1 = 'imgLife1';
    static IMG_LIFE2 = 'imgLife2';
    static IMG_LIFE3 = 'imgLife3';
    static IMG_SCORE = 'imgScore';
    static IMG_WINNER = 'imgWinner';
    static IMG_GAME_OVER = 'imgGameOver';

    static MUSIC_GAME = 'musicGame';
    static MUSIC_TOUCH_BEE = 'musicTouchBee';
    static MUSIC_TOUCH_ENEMY = 'musicTouchEnemy';
    static MUSIC_WINNER = 'musicWinner';
    static MUSIC_GAME_OVER = 'musicGameOver';

    constructor(canvas, mouse, ratioDevice = 1 /* for desktop */, animate = null, unlimitedGame = false) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.ratioDevice = ratioDevice;
        this.animate = animate;
        this.unlimitedGame = unlimitedGame;

        this.gameFrame = 0;
        this.score = 0;
        this.life = Game.MAX_LIFE;

        this.started = true;
        this.paused = false;
        this.stopped = false;
        this.finished = false;

        this.gameOver = false;
        this.winner = false;
        this.winnerWhitelist = false;
        this.winnerAirdrop = false;
        this.enemyCame = false;

        this.player = new Player(canvas, mouse, this.gameFrame, ratioDevice);
        this.ennemiesArray = [];
        this.beesArray = [];
        this.salmonsArray = [];

        this.imgBackground = document.getElementById(Game.IMG_BACKGROUND);
        this.imgBackground1 = document.getElementById(Game.IMG_BACKGROUND1);
        this.imgBackground2 = document.getElementById(Game.IMG_BACKGROUND2);
        this.imgBackground3 = document.getElementById(Game.IMG_BACKGROUND3);
        this.imgLife = document.getElementById(Game.IMG_LIFE0);
        this.imgLife1 = document.getElementById(Game.IMG_LIFE1);
        this.imgLife2 = document.getElementById(Game.IMG_LIFE2);
        this.imgLife3 = document.getElementById(Game.IMG_LIFE3);
        this.imgScore = document.getElementById(Game.IMG_SCORE);
        this.imgWinner = document.getElementById(Game.IMG_WINNER);
        this.imgGameOver = document.getElementById(Game.IMG_GAME_OVER);

        this.musicSound = new Sound(Game.MUSIC_GAME);
        this.beeTouchSound = new Sound(Game.MUSIC_TOUCH_BEE);
        this.enemyTouchSound = new Sound(Game.MUSIC_TOUCH_ENEMY);
        this.winnerSound = new Sound(Game.MUSIC_WINNER);
        this.gameOverSound = new Sound(Game.MUSIC_GAME_OVER);

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
            x1: 0,
            x2: canvas.width,
            y: 0,
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
        const canvas = this.canvas;
        const musicSound = this.musicSound;

        if (musicSound.music.played && !musicSound.isPlaying) {
            musicSound.play();
        }

        this.background.x1 = 0;
        this.background.x2 = canvas.width;
        this.background.width = canvas.width;
        this.background.height = canvas.height;
    }

    finishGame() {
        const musicSound = this.musicSound;
        const gameOverSound = this.gameOverSound;
        const winnerSound = this.winnerSound;
        const ctx = this.ctx;

        musicSound.pause();
        musicSound.currentTime = 0;

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
        const speed = Game.MAX_SPEED;
        const ctx = this.ctx;
        const ratioDevice = this.ratioDevice;

        let background = this.imgBackground;
        if (this.enemyCame) {
            background = this.imgBackground3;
        } else if (this.score >= Game.SCORE_BACKGROUND_1) {
            background = this.imgBackground;
        } else if (this.score >= Game.SCORE_BACKGROUND_2) {
            background = this.imgBackground1;
        } else if (this.score >= Game.SCORE_BACKGROUND_3) {
            background = this.imgBackground2;
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

    handleEnnemies() {
        //collision with player
        const player = this.player;
        const canvas = this.canvas;
        const mouse = this.mouse;
        const gameFrame = this.gameFrame;
        const ratioDevice = this.ratioDevice;
        const enemyTouchSound = this.enemyTouchSound;

        const ennemiesArray = this.ennemiesArray;

        if (!this.finished && ennemiesArray.length === 0
            && this.score === 0) {
                const enemy = new Enemy(canvas, mouse, gameFrame, ratioDevice, Game.MAX_SPEED, '1');
            ennemiesArray.push(enemy);
        }

        if (!this.finished && ennemiesArray.length === 1
            && this.score >= Game.SCORE_SECOND_ENEMY && this.score <= Game.SCORE_SECOND_ENEMY + 3) {
                const enemy = new Enemy(canvas, mouse, gameFrame, ratioDevice, Game.MAX_SPEED, '2');
                ennemiesArray.push(enemy);
        }

        if (!this.finished && ennemiesArray.length === 2
            && this.score >= Game.SCORE_THIRD_ENEMY && this.score <= Game.SCORE_THIRD_ENEMY + 3) {
                const enemy = new Enemy(canvas, mouse, gameFrame, ratioDevice, Game.MAX_SPEED, '3');
                ennemiesArray.push(enemy);
        }

        for (let i = 0; i < ennemiesArray.length; i++) {
            const enemy = ennemiesArray[i];
            enemy.update();
            enemy.draw();

            const dx = enemy.x - player.x;
            const dy = enemy.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < enemy.radius + player.radius) {
                this.life--;
                this.handleLife();
                this.paused = true;
                player.touched = true;

                if (this.life === 0) {
                    this.gameOver = true;
                    this.finished = true;
                    this.handleLife();
                } else {
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

        if (!this.finished && this.gameFrame % 50 === 0) {
            const bee = new Bee(canvas, mouse, gameFrame, ratioDevice);
            beesArray.push(bee);
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
/*
                        if (this.score === Game.SCORE_SECOND_ENEMY || this.score === Game.SCORE_THIRD_ENEMY) {
                            this.enemyCame = true;
                            setTimeout(() => {
                                this.enemyCame = false;
                            }, Game.TIME_BACKGROUND_ENEMY);
                        }
                        */

                        if (!this.unlimitedGame) {
                            if (this.score >= Game.SCORE_TO_WHITELIST) {
                                this.winnerWhitelist = true;
                                this.winnerSound.play();
                                this.winnerSound.isPlaying = false;
                            }

                            if (this.score >= Game.SCORE_TO_AIRDROP) {
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

        if (!this.finished && salmonsArray.length == 0
            && this.score >= Game.SCORE_FIRST_SALMON && this.score <= Game.SCORE_FIRST_SALMON + 3) {
            const salmon = new Salmon(canvas, mouse, gameFrame, ratioDevice);
            salmonsArray.push(salmon);
        }

        if (!this.finished && salmonsArray.length == 1
            && this.score >= Game.SCORE_SECOND_SALMON && this.score <= Game.SCORE_SECOND_SALMON + 3) {
            const salmon = new Salmon(canvas, mouse, gameFrame, ratioDevice);
            salmonsArray.push(salmon);
        }

        if (!this.finished && salmonsArray.length == 2
            && this.score >= Game.SCORE_THIRD_SALMON && this.score <= Game.SCORE_THIRD_SALMON + 3) {
            const salmon = new Salmon(canvas, mouse, gameFrame, ratioDevice);
            salmonsArray.push(salmon);
        }

        for (let i = 0; i < salmonsArray.length; i++) {
            const salmon = salmonsArray[i];

            if (salmon && !salmon.finished) {
                const player = this.player;
                const dx = salmon.x - player.x;
                const dy = salmon.y - player.y;
                salmon.distance = Math.sqrt(dx * dx + dy * dy);

                if (salmon.nTurn >= Salmon.TURN_MAX) {
                    salmon.finished = true;
                } else {
                    salmon.update();
                    salmon.draw();

                    if (salmon.distance < salmon.radius + player.radius) {
                        console.log('collision slalmon');
                        this.score += 2;
                        salmon.counted = true;
                        salmon.finished = true;
                    }

                }
            }
        }
    }

    updateGameFrameElements() {
        const player = this.player;
        player.gameFrame = this.gameFrame;
        this.updateGameFrameEnnemies();
        this.updateGameFrameBees();
        this.updateGameFrameSalmons();

        if (this.score === Game.SCORE_SECOND_ENEMY || this.score === Game.SCORE_THIRD_ENEMY) {
            this.enemyCame = true;
            setTimeout(() => {
                this.enemyCame = false;
            }, Game.TIME_BACKGROUND_ENEMY);
        }

        if (!this.unlimitedGame) {
            if (this.score >= Game.SCORE_TO_WHITELIST) {
                this.winnerWhitelist = true;
                this.winnerSound.play();
                this.winnerSound.isPlaying = false;
            }

            if (this.score >= Game.SCORE_TO_AIRDROP) {
                this.finished = true;
                this.winnerAirdrop = true;
                this.winner = true;
            }
        }
    }

    updateGameFrameEnnemies() {
        const ennemiesArray = this.ennemiesArray;
        for (let i = 0; i < ennemiesArray.length; i++) {
            const enemy = ennemiesArray[i];
            enemy.gameFrame = this.gameFrame;
        }
    }

    updateGameFrameBees() {
        const beesArray = this.beesArray;
        for (let i = 0; i < beesArray.length; i++) {
            const bee = beesArray[i];
            bee.gameFrame = this.gameFrame;
        }
    }

    updateGameFrameSalmons() {
        const salmonsArray = this.salmonsArray;
        for (let i = 0; i < salmonsArray.length; i++) {
            const salmon = salmonsArray[i];
            salmon.gameFrame = this.gameFrame;
        }
    }


    handleGame() {
        this.animate();
    }
}

export default Game;