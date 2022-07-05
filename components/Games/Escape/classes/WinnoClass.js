
class Winno {
    constructor(game, playerImage, playerTouchImage = null){
        this.game = game;
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        this.mouse = game.mouse;
        this.gameFrame = game.gameFrame;
        this.ratioDevice = game.ratioDevice;
        this.x = game.canvas.width;
        this.y = game.canvas.height/2;
        this.radius = 40 / game.ratioDevice;

        this.playerImage = playerImage;
        this.playerTouchImage = playerTouchImage;
        this.touched = false;

        this.angle = 0;

        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 64;
        this.spriteHeight = 64;
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

        
        if( this.game.gameFrame % 15 === 0 ){
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
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            //this.ctx.lineTo(this.mouse.x, this.mouse.y);
            //this.ctx.stroke();
        }

        
        this.ctx.fillStyle = 'cyan';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillRect(this.x, this.y, this.radius, 10);
        
        this.ctx.save();

        //this.handleLife();
        //this.game.handleLife();
        if( this.touched ){
            this.ctx.drawImage(this.playerTouchImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
                this.spriteWidth, this.spriteHeight, this.x - 66/this.ratioDevice, this.y - 68/this.ratioDevice, this.spriteWidth * 2 / this.ratioDevice,this.spriteHeight * 2 / this.ratioDevice);
        }else{
            this.ctx.drawImage(this.playerImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
                this.spriteWidth, this.spriteHeight, this.x - 66/this.ratioDevice, this.y - 68/this.ratioDevice, this.spriteWidth * 2 / this.ratioDevice,this.spriteHeight * 2 / this.ratioDevice);
        }
        
       
    }

}

export default Winno;