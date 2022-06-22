class Player {
    constructor(canvas, ctx, mouse){
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.ctx = ctx;
        this.mouse = mouse;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 1024;
        this.spriteHeight = 1024;
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
    }

    draw(){
        if( this.mouse.click ){
            this.ctx.lineWidth = 0.2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.stroke();
        }

        
        this.ctx.fillStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillRect(this.x, this.y, this.radius, 10);
        

        this.ctx.save();
        //ctx.translate(this.x, this.y);
        /*
        ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.x - 53, this.y - 53, this.spriteWidth/10, this.spriteHeight/10);
            */
            
    }
}

export default Player;