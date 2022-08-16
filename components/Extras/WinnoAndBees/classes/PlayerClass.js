class Player {
    constructor(canvas, mouse, gameFrame, ratioDevice){
        this.ctx = canvas.getContext('2d');
        this.mouse = mouse;
        this.gameFrame = gameFrame;

        this.ratioDevice = ratioDevice;
        this.x = mouse.x;
        this.y = mouse.y;
        this.radius = 40 / ratioDevice;

        this.playerImage = document.getElementById('imgPlayer');
        this.playerTouchImage = document.getElementById('imgPlayerReverse');

        this.touched = false;

        this.angle = 0;

        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 64;
        this.spriteHeight = 64;

    }

    update(){
        const mouse = this.mouse;
        const gameFrame = this.gameFrame;
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

        if( mouse.x != this.x ){
            this.x -= dx/20;   
        }

        if( mouse.y != this.y ){
            this.y -= dy/20;   
        }

        
        if( gameFrame % 15 === 0 ){
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
        const mouse = this.mouse;
        const ctx = this.ctx;
        const touched = this.touched;

        const playerImage = this.playerImage;
        const playerTouchImage = this.playerTouchImage;

        const frameX = this.frameX;
        const frameY = this.frameY;

        const spriteWidth = this.spriteWidth;
        const spriteHeight = this.spriteHeight;
        const ratioDevice = this.ratioDevice;

        const x = this.x;
        const y = this.y;


        if( mouse.click ){
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
        }

        /*
        this.ctx.fillStyle = 'cyan';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillRect(this.x, this.y, this.radius, 10);
        this.ctx.save();
        */

        if( touched ){
            ctx.drawImage(playerTouchImage, frameX * spriteWidth, frameY * spriteHeight, 
                spriteWidth, spriteHeight, x - 66/ratioDevice, y - 68/ratioDevice, spriteWidth * 2 / ratioDevice, spriteHeight * 2 / ratioDevice);
        }else{
            ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, 
                spriteWidth, spriteHeight, x - 66/ratioDevice, y - 68/ratioDevice, spriteWidth * 2 / ratioDevice, spriteHeight * 2 / ratioDevice);
        }  
    }
}

export default Player;