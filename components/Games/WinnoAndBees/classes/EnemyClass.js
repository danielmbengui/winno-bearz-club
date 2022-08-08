import Game from "./GameClass";

class Enemy {
    static imgEnemyStr = 'imgEnemy';
    constructor(canvas, mouse, gameFrame, ratioDevice, player = null, enemySpeed = 0, idEnemy = ''){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.gameFrame = gameFrame;
        this.ratioDevice = ratioDevice;
        this.player = player;
        this.enemySpeed = enemySpeed > 0 ? enemySpeed : Game.SPEED;
        this.idEnemy = idEnemy;
        this.imgEnemy = document.getElementById(Enemy.imgEnemyStr + idEnemy);

        this.handleLife = null;
        
        //this.game = game;
        
        


        //this.enemyTouchSound = document.getElementById('musicTouchEnemy');
        this.x = canvas.width + 200;
        //this.x = canvas.width/2;
        this.y = Math.random() * (canvas.height - 150) + 90;
        //this.y = canvas.height/2;
        this.radius = 40/ratioDevice;
        this.speed = Math.random() * ((enemySpeed > 0 ? enemySpeed : Game.SPEED) - 3) + 2;
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
        /*
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        */        
        ctx.drawImage(imgEnemy, frameX * spriteWidth, frameY * spriteHeight, 
           spriteWidth, spriteHeight, x - 66/ratioDevice, y - 68/ratioDevice, spriteWidth * 2 / ratioDevice, spriteHeight * 2 / ratioDevice); 
           
    }

    update(){
        const canvas = this.canvas;
        const radius = this.radius;
        const player = this.player;

        this.x -= this.speed;

        if( this.x < 0 - radius * 2 ){
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            //this.speed = Math.random() * 2 + 2;
            this.speed = Math.random() * ((this.enemySpeed > 0 ? this.enemySpeed : Game.SPEED) - 3) + 2;
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