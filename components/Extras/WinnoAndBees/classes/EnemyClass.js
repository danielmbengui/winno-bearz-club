import Game from "./GameClass";

class Enemy {
    static IMG_ENEMY = 'imgEnemy';
    static IMG_ENEMY1 = 'imgEnemy1';
    static IMG_ENEMY2 = 'imgEnemy2';
    static IMG_ENEMY3 = 'imgEnemy3';

    constructor(canvas, mouse, gameFrame, ratioDevice, enemySpeed = 0, idEnemy = ''){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.gameFrame = gameFrame;
        this.ratioDevice = ratioDevice;
        this.enemySpeed = enemySpeed > 0 ? enemySpeed : Game.MAX_SPEED;
        this.idEnemy = idEnemy;
        this.imgEnemy = document.getElementById(Enemy.IMG_ENEMY + idEnemy);

        this.handleLife = null;
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 40/ratioDevice;
        this.speed = Math.random() * ((enemySpeed > 0 ? enemySpeed : Game.MAX_SPEED) - 3) + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 64;
        this.spriteHeight = 64;
    }

    draw(){
        const ctx = this.ctx;
        const imgEnemy = this.imgEnemy;
        const x = this.x;
        const y = this.y;
        const frameX = this.frameX;
        const frameY = this.frameY;
        const spriteWidth = this.spriteWidth;
        const spriteHeight = this.spriteHeight;
        const ratioDevice = this.ratioDevice;
      
        ctx.drawImage(imgEnemy, frameX * spriteWidth, frameY * spriteHeight, 
           spriteWidth, spriteHeight, x - 66/ratioDevice, y - 68/ratioDevice, spriteWidth * 2 / ratioDevice, spriteHeight * 2 / ratioDevice);     
    }

    update(){
        const canvas = this.canvas;
        const radius = this.radius;

        this.x -= this.speed;

        if( this.x < 0 - radius * 2 ){
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * ((this.enemySpeed > 0 ? this.enemySpeed : Game.MAX_SPEED) - 3) + 2;
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
}

export default Enemy;