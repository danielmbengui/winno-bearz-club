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
    /*
    if( screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary' ){
        alert('NOTHING');
    }else{
        alert('IS OKAY !');
    }
    */
});


window.onload = function(){
    let device = 'desktop';
    /*
    let orientation = 'portrait';

    if( screen.width < 768 ){
        orientation = 'landscape'
    }
    */
    //screen.orientation = orientation;
    //screen.lockOrientation(orientation);
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
        device = 'mobile';
    }

    
      console.log('device', device, 'screen width', screen.width, 'screen height', screen.height);
      console.log('canvas', canvas.width, 'canvas width', canvas.height,);
    
        
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