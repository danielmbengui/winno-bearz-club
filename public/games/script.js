// Parametrer le canvas ---> le carré blanc avec contour noir
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 800;

let score = 0;
let gameFrame = 0;
ctx.font = '40px Georgia';
let gameSpeed = 5;
let gameOver = false;

// Parametrer les evenements de la souris...
// quand on clique sur un endroit, le rond rouge (nous) se déplace a cet endroit
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false,
}

screen.orientation.addEventListener('change', function() {
	console.log('Current orientation is ' + screen.orientation.type);
    document.getElementById('score').innerHTML = 'Score : ' + screen.orientation.type;
});

window.onload = function(){
    let device = '';
    /*
    let orientation = 'portrait';

    if( screen.width < 768 ){
        orientation = 'landscape'
    }
    */
    //screen.orientation = orientation;
    //screen.lockOrientation(orientation);

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        //document.write("mobile device");
        device = 'mobile';
        if(document.querySelector("#page").requestFullscreen)
            document.querySelector("#page").requestFullscreen();
        else if(document.querySelector("#page").webkitRequestFullScreen)
            document.querySelector("#page").webkitRequestFullScreen();

        screen.orientation.lock('landscape')
        .then(function() {
            alert('Locked');
        })
        .catch(function(error) {
            alert(error);
        });
      }else{
        // false for not mobile device
        device = 'desktop';
       // document.write("not mobile device");
      }
      console.log('device', device);
    
        
const mySound = document.getElementById('sound');
mySound.voulme = 40;

//const beeSound = document.getElementById('beeSound');


/*
canvas.addEventListener('mousemove', (event) => {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    console.log(mouse.x, mouse.y)
});
*/

canvas.addEventListener('mousedown', (event) => {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    console.log(mouse.x, mouse.y)
});

canvas.addEventListener('mouseup', (event) => {
    mouse.click = false;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    console.log(mouse.x, mouse.y)
});



const playerLeft = new Image();
playerLeft.src = 'pic-team.png';
const playerRight = new Image();
playerRight.src = 'pic-team.png';
const imgEnemy = new Image();
imgEnemy.src = 'enemy.png';


// NOUS
class Player {
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.radius = 40;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 1024;
        this.spriteHeight = 1024;
    }

    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if( mouse.x != this.x ){
            this.x -= dx/20;   
        }

        if( mouse.y != this.y ){
            this.y -= dy/20;   
        }
    }

    draw(){
        if( mouse.click ){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        /*
        ctx.fillStyle = 'cyan';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);
        */
        

        ctx.save();
        //ctx.translate(this.x, this.y);
        
        
        ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.x - 53, this.y - 53, this.spriteWidth/10, this.spriteHeight/10);
            
            
    }
}

// OBSTACLE
class Enemy {
    constructor(){
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 50;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 641;
        this.spriteHeight = 546;
    }

    draw(){
        /*
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        */
        
        //ctx.closePath();
        //ctx.fillRect(this.x, this.y, this.radius, 10);
        
        ctx.drawImage(imgEnemy, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
           this.spriteWidth, this.spriteHeight, this.x - 63, this.y - 60, this.spriteWidth/5, this.spriteHeight/5);
           
        
    }

    update(){
        this.x -= this.speed;
        if( this.x < 0 - this.radius * 2 ){
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }
/*
        if( gameFrame % 5 === 0 ){
            this.frame++;
            if( this.frame >= 12 ){
                this.frame = 0;
            }

            if( this.frame >= 12 ){
                this.frame = 0;
            }
        }
        */

        //collision with player
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        
        if( distance < this.radius + player.radius ){
            console.log('collision', 'player collision enemy');
            handleGameOver();
        }
        

        
    }
}



const player = new Player();
const enemy = new Enemy();

function handleEnemies(){
    enemy.draw();
    enemy.update();
    
}

function handleGameOver(){
    ctx.fillStyle = 'black';
    ctx.fillText("Game over, you reahed the score : " + score, 130, 250);
    gameOver = true;
}
// Les trucs a chopper
const bubblesArray = [];
const beeImage = new Image();
beeImage.src = "bee.png";
const beeHitImage = new Image();
beeHitImage.src = "bee_hit.png";

class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 40;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        //bubblePop1.play();
    }
    update(){
        this.y -= this.speed;
        //this.x = Math.random() <= 0.5 ? this.x - this.speed : this.x + this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy)
        //ctx.moveTo(this.x, this.y);
        //console.log(bubblesArray.length)
    }
    draw(){
        /*
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        */
        
        
        //ctx.drawImage(beeImage, this.x - 75, this.y - 90, this.radius * 2.8, this.radius * 2.8);
        
        
        if( !this.counted ){
            ctx.drawImage(beeImage, this.x - 60, this.y - 72, this.radius * 2.8, this.radius * 2.8);
        }else{
            ctx.drawImage(beeHitImage, this.x - 75, this.y - 90, this.radius * 2.8, this.radius * 2.8);
        }
        
        
        
        
        
        //ctx.drawImage(beeImage, this.x - 75, this.y - 90, this.radius * 2.8, this.radius * 2.8);
    }
}


const beeSound = document.createElement('audio');
beeSound.src = 'flyswatter.wav';
const beeSound1 = document.createElement('audio');
beeSound1.src = 'flyswatter4.wav';
const beeSoundOut = document.createElement('audio');
beeSoundOut.src = 'bee.wav';
//const beeSound1 = document.createElement('audio');


function handleBubbles(){
    if( gameFrame % 50 === 0 ){
        bubblesArray.push(new Bubble());
        
        //beeSound.play();
        //bubblePop1.play();
        //console.log(bubblesArray.length)
    }
    
    for (let i = 0; i < bubblesArray.length; i++) {
        //const element = bubblesArray[i];
            
            if( bubblesArray[i].y < 0 - bubblesArray[i].radius * 2 ){
                //bubblePop1.play();
                bubblesArray.splice(i, 1);
                console.log('finito : ' + i);
               // beeSound.muted = false;
               //bubblePop1.src = 'bee.wav';
               //beeSoundOut.play();
            
            }

            if( bubblesArray[i] ){
                if( bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
                    console.log('collision')
                    if( !bubblesArray[i].counted ){
                        
                        /*
                        if( bubblesArray[i].sound == 'sound1' ){
                            beeSound.play();
                        }else {
                            beeSound1.play();
                        }
                        */
                        
                        
                        
                        
                        
                        //beeHitImage.src = 'bee_hit.png';
                        ctx.drawImage(beeHitImage, this.x - 75, this.y - 90, this.radius * 2.8, this.radius * 2.8);
                        
                        //beeSound.play();
                        score++;
                        bubblesArray[i].counted = true;
                        bubblesArray[i].update();
                        bubblesArray[i].draw();
                        bubblesArray.splice(i, 1);
                    }
                }
            }
        
            if( bubblesArray[i] ){
                bubblesArray[i].update();
                bubblesArray[i].draw();
            }
    }
    /*
    for (let i = 0; i < bubblesArray.length; i++) {
        //const element = bubblesArray[i];
        
        if( bubblesArray[i].y < 0 ){
            bubblesArray.splice(i, 1);
        }
    }
    */
}

//const myGif = GIF();
//myGif.load("background.gif");

const background = new Image();
background.src = 'background.png';
const background1 = new Image();
background1.src = 'cloud2.png';
const background2 = new Image();
background2.src = 'cloud3.png';

const island1 = new Image();
island1.src = 'island1.png';

const island2 = new Image();
island2.src = 'island3.png';

const island3 = new Image();
island3.src = 'island2.png';

const BG = {
    //x:0,
    x1: 0,
    x2: canvas.width,
    y: 0,
    //y1:0,
    //y2:canvas.height,
    width: canvas.width,
    height: canvas.height,
}

function handleBackground(){
    
    BG.x1 -= gameSpeed;
    if( BG.x1 < -BG.width){ BG.x1 = BG.width }

    BG.x2 -= gameSpeed;
    if( BG.x2 < -BG.width){ BG.x2 = BG.width }
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width + 10, BG.height);
    //background.src = 'background.gif';
/*
    BG.y1 -= gameSpeed;
    if( BG.x1 < -BG.height){ BG.y1 = BG.height }

    BG.y2 -= gameSpeed;
    if( BG.y2 < -BG.height){ BG.y2 = BG.height }
    ctx.drawImage(background, BG.x, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);


    */
   // ctx.drawImage(background1, BG.x1 + (background1.width*1.1), BG.y, BG.width/2, BG.height);
   // ctx.drawImage(background2, BG.x1 + (background1.width*1.1) + (background2.width*1.7), BG.y, BG.width/2, BG.height);
    
  //  ctx.drawImage(island1, BG.x1, BG.y, background.width, BG.height);
  //  ctx.drawImage(island2, BG.x1 + background.width, BG.y, background1.width, BG.height);
   // ctx.drawImage(island3, BG.x1 + (island1.width*2) + (island2.width*2), BG.y, BG.width/2, BG.height);
}
    // Animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleBubbles();
    handleEnemies();
    player.update();
    player.draw();
    
    //ctx.fillStyle = 'black';
    //ctx.fillText('Score : ' + score, 10, 50);
    document.getElementById('score').innerHTML = 'Score : ' + score;
    gameFrame++;
    //console.log(gameFrame);
    if( !gameOver ){
        requestAnimationFrame(animate);  
    }
     
}

animate();
//mySound.play();
}

window.addEventListener('resize', () => {
    canvasPosition = canvas.getBoundingClientRect();
    //var clickEvent = document.createEvent('MouseEvents');
    //clickEvent.initEvent('mouseup', true, true);
    //canvas.click();
})