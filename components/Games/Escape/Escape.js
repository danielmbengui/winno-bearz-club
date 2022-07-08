import React, {useEffect, useRef, useState} from 'react';
import styleEscape from "./Escape.module.css";
import { useTheme, } from '@mui/material/styles';
import { Button } from '@mui/material';
import Image from 'next/image';
import useImage from 'use-image';
//const playerLeft = new Image();





import Player from './classes/PlayerClass';
import Enemy from './classes/EnemyClass';
import Bee from './classes/BeeClass';
import Game from './classes/GameClass';


import EscapeGame from './classes/EscapeGameClass';
import Winno from './classes/WinnoClass';
import BelzeBearz from './classes/BelzeBearzClass';

const Escape = ({database, contractInfo,}) => {
    const theme = useTheme();
    const refCanvas = useRef();
    const refDiv = useRef();
    const refButtonStart = useRef();
    const refSound = useRef();

    const [canvas, setCanvas] = useState();
    const [canvasPosition, setCanvasPosition] = useState();
    const [ctx, setCtx] = useState();
    const [mouse, setMouse] = useState();
    const [score, setScore] = useState(0);
    const [gameFrame, setGameFrame] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [player, setPlayer] = useState();
    
    console.log('refCanvas BEFORE', refCanvas.current,);

    const isMobile = () => {
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            return true;
        }
        return false;
    }

    const openFullscreen = () => {
        
        
        if (refDiv.current.requestFullscreen) {
            refDiv.current.requestFullscreen();
        } else if (refDiv.current.webkitRequestFullscreen) { /* Safari */
        refDiv.current.webkitRequestFullscreen();
        } else if (refDiv.current.msRequestFullscreen) { /* IE11 */
        refDiv.current.msRequestFullscreen();
        }

        

        
        //canvasPosition = canvas.getBoundingClientRect();
        //mouse.x = canvas.width/2;
        //mouse.y = canvas.height/2;
        //mouse.click= false;
    
      }

    const initGame = () => {
        console.log('refCanvas NORM', isMobile() ? 'true' : 'false', 'document NORM', document.getElementById('oook'))
        if( refCanvas.current ){
            //refCanvas.current.width = 800;
            //refCanvas.current.height = 500;
            refButtonStart.current.style.display = 'none';
            refCanvas.current.style.display = 'block';
            const canvas = refCanvas.current;
            const ctx = canvas.getContext('2d');
            //canvas.width = screen.width * (53.5/100);
            //canvas.height = screen.height * (47.5/100);

            canvas.width = 1024;
            canvas.height = 512;
            //var heightRatio = 3;
            //canvas.height = canvas.width / heightRatio;
            const scoreSecondEnemy = 20;
            const scoreThirdEnemy = 30;
            const scoreWinner = 50;

            let score = 0;
            let gameFrame = 0;
            //ctx.font = 'bold 60px Arial';
            let gameSpeed = 5;
            let nbLife = 3;
            let gameOver = false;
            let device = 'desktop';
            let ratioDevice = 1;
            //var isMobile = false; //initiate as false
            // device detection
            if( isMobile() ) { 
                //isMobile = true;
                device = 'mobile';
                canvas.width = 700;
                canvas.height = 250;
                ratioDevice = 2;
            }else{

            }
            
            let canvasPosition = canvas.getBoundingClientRect();
            console.log('canvasPoistion', canvasPosition);
            const mouse = {
                x: canvas.width/2,
                y: canvas.height/2,
                click: false,
            }
            
            if( isMobile() ){
                let startx = 0;
                let starty = 0;

                /*
                canvas.addEventListener('touchstart', (event) => {
                    let touchObj = event.changedTouches[0]; // erster Finger
                    startx = parseInt(touchObj.clientX); // X/Y-Koordinaten relativ zum Viewport
                    starty = parseInt(touchObj.clientY);
                    //let touchObj = event.changedTouches[0];
                   // mouse.click = true;
                    mouse.x = parseInt(touchObj.clientX) - canvasPosition.left;
                    mouse.y = parseInt(touchObj.clientY) - canvasPosition.top;
                    console.log(mouse.x, mouse.y);
                    event.preventDefault();
                });
                */
                
                canvas.addEventListener('touchmove', (event) => {
                    let touchObj = event.changedTouches[0];
                    mouse.click = true;
                    mouse.x = parseInt(touchObj.clientX) - canvasPosition.left;
                    mouse.y = parseInt(touchObj.clientY) - canvasPosition.top;
                    //console.log(mouse.x, mouse.y);
                    event.preventDefault();
                });

                canvas.addEventListener('touchcancel', (event) => {
                    //let touchObj = event.changedTouches[0];
                    mouse.click = true;
                    mouse.x = canvasPosition.left;
                    mouse.y = canvasPosition.top;
                    //console.log('touch cancel', mouse.x, mouse.y);
                    event.preventDefault();
                });
                
/*
                canvas.addEventListener('touchend', (event) => {
                    let touchObj = event.changedTouches[0];
                    mouse.click = true;
                    mouse.x = parseInt(touchObj.clientX) - canvasPosition.left;
                    mouse.y = parseInt(touchObj.clientY) - canvasPosition.top;
                    console.log(mouse.x, mouse.y);
                    event.preventDefault();
                });
                */
                
            }else{
                canvas.addEventListener('mousemove', (event) => {
                    mouse.click = true;
                    mouse.x = event.x - canvasPosition.left;
                    mouse.y = event.y - canvasPosition.top;
                    //console.log(mouse.x, mouse.y)
                });
            }
/*
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
            */


           // const image = require("../../../public/assets/games/escape/player-sprite.png")
            const assetPath = "/assets/games/escape/";
            //const playerImage = new window.Image() // can't use new Image()
            //playerImage.src = link + 'player-sprite.png';
            //const playerTouchImage = new window.Image() // can't use new Image()
            //playerTouchImage.src = link + 'player-reverse-sprite.png';

            //const imgEnemy = new window.Image();
            //imgEnemy.src = link + 'enemy-sprite.png';
            //const imgEnemy1 = new window.Image();
            //imgEnemy1.src = link + 'enemy1-sprite.png';
            //const imgEnemy2 = new window.Image();
            //imgEnemy2.src = link + 'enemy2-sprite.png';

            //const beeImage = new window.Image();
            //beeImage.src = link + "bee-sprite.png";

            //const imgWinner = new window.Image();
            //imgWinner.src = link + 'winner-sprite.png';
            

            //const background = new window.Image();
            //background.src = link + 'background.png';
            //const background1 = new window.Image();
            //background1.src = link + 'background1.png';
            //const background2 = new window.Image();
            //background2.src = link + 'background2.png';
            //const backgroundStorm = new window.Image();
            //background2.src = link + 'background-storm.png';

            //const level = new window.Image();
            //level.src = link + `life${nbLife}.png`;

            //const imgMute = new window.Image();
            //imgMute.src = link + `mute.png`;
            //const imgUnmute = new window.Image();
            //imgUnmute.src = link + `unmute.png`;

            //const imgGameOver = new window.Image();
            //imgGameOver.src = link + `game_over.png`;
            //const imgScore = new window.Image();
            //imgScore.src = link + 'bee_score.png';
            //const ImgSalmon = new window.Image();
            //ImgSalmon.src = link + 'salmon.png';

            

            /*
            const mySound = document.getElementById('sound');
            mySound.voulme = 40;
            */
            const musicSound = document.createElement('audio');
            //musicSound.src = link + 'music.mp3';
            musicSound.src = assetPath + 'music-game.mp3';
            //const enemyTouchSound = document.createElement('audio');
            //enemyTouchSound.src = link + 'music-enemy-touch.mp3';

            const beeTouchSound = document.createElement('audio');
            //beeTouchSound.src = 'flyswatter.wav';
            beeTouchSound.src = assetPath + 'music-bee-touch.mp3';
            //const beeTouchSound1 = document.createElement('audio');
            //beeTouchSound1.src = 'flyswatter4.wav';
            //beeTouchSound1.src = link + 'music-bee-touch.mp3';

            const winnerSound = document.createElement('audio');
            //beeTouchSound1.src = 'flyswatter4.wav';
            winnerSound.src = assetPath + 'music-winner.mp3';

            //const playerImage = useImage(link);
            //console.log('image', playerImage);
            const escapeGame = new EscapeGame(window, canvas, ctx, mouse, ratioDevice, gameSpeed, nbLife, assetPath, animate);

            const winno = new Winno(escapeGame);
            const belzeBear = new BelzeBearz(escapeGame, winno, gameSpeed);
            const belzeBear1 = new BelzeBearz(escapeGame, winno, gameSpeed + 1,  1);
            const belzeBear2 = new BelzeBearz(escapeGame, winno, gameSpeed + 2, 2);


            //const player = new Player(canvas, ctx, mouse, nbLife, gameFrame, ratioDevice, playerImage, level, imgGameOver, imgScore);
            //const enemy = new Enemy(canvas, ctx, mouse, player, gameFrame, ratioDevice, imgEnemy);
            //console.log('refCanvas YES', canvas, 'document YES', document.getElementById('oook'))
            //console.log('screen width', screen.width, 'screen height', screen.height);
            //console.log('canvas', canvas.width, 'canvas width', canvas.height,);
            //console.log('device', device);            
            const beesArray = [];
            //const game = new Game(canvas, ctx, mouse, player, enemy, [], gameFrame, ratioDevice /* for desktop */, score, gameSpeed, background, background1, background2, level, imgGameOver, imgScore);
            /*
            function handleLife(){
                //console.log('nb life', player.life);
                if( player.life >= 0 ){
                    level.src = link + `/life${player.life}.png`;
                        //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3, HEART.spriteHeight/3);
                    ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
                         
                }else{
                    //player.life = 0;
                    level.src = link + `life0.png`;
                    ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height);
                    ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);               
                } 
               
                
                ctx.drawImage(imgScore, HEART.x1 + 20 + HEART.spriteWidth/3/ratioDevice, HEART.y + 10, HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);  
                ctx.fillStyle = 'red';
                //ctx.font();
                ctx.font = isMobile ? '30px VT323 bold' : '60px VT323 bold';
                ctx.fillText("Score : " + game.score, HEART.x1 + 30 + HEART.spriteWidth/3/ratioDevice + HEART.spriteHeight/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);
                
            }*/

            function handleEnemies(){
                //enemy.update();   
                //enemy.draw(); 

                belzeBear.update();
                belzeBear.draw();

                if( escapeGame.score >= scoreSecondEnemy ){
                    belzeBear1.update();
                    belzeBear1.draw();
                }

                if( escapeGame.score >= scoreThirdEnemy ){
                    belzeBear2.update();
                    belzeBear2.draw();
                }
                /*
                if( player.score === 5 ){
                    const enemy1 = new Enemy(canvas, ctx, mouse, player, gameFrame, ratioDevice, imgEnemy);
                    enemy1.update();   
                enemy1.draw(); 
                }
                */
            }

            function handleBees(){
                if( !escapeGame.gameOver && escapeGame.gameFrame % 50 === 0 ){
                    beesArray.push(new Bee(escapeGame, winno));
                }
                
                for (let i = 0; i < beesArray.length; i++) {                        
                        if( beesArray[i].y < 0 - beesArray[i].radius * 2 ){
                            beesArray.splice(i, 1);
                            //console.log('finito : ' + i);
                        }
            
                        if( beesArray[i] ){
                            if( beesArray[i].distance < beesArray[i].radius + winno.radius){
                                //console.log('collision')
                                if( !beesArray[i].counted ){
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
                                    escapeGame.score++;
                                    beesArray[i].counted = true;
                                    beesArray[i].update();
                                    beesArray[i].draw();
                                    beesArray.splice(i, 1);

                                    if( escapeGame.score === scoreWinner ){
                                        escapeGame.started = false;
                                        escapeGame.stopped = true;
                                        escapeGame.winner = true;
                                    }
                                }
                            }
                        }
                    
                        if( beesArray[i] ){
                            beesArray[i].update();
                            beesArray[i].draw();
                        }
                }
            }
            
            /*
            function animate(){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                //handleBackground();
                //handleLife();
                //handleLife();
                //handleEnemies();
                enemy.handleEnemies();
                handleBees();
                player.update();
                player.draw();
                //ctx.fillStyle = 'black';
                //ctx.fillText('Score : ' + score, 10, 50);
                //document.getElementById('score').innerHTML = 'Score : ' + score;
                //document.getElementById('life').innerHTML = 'Life : ' + player.life;
                //imgLife.src = `sprite/life${nbLife}.png`;
                //level.src = `sprite/life${nbLife}.png`;
                gameFrame++;
                player.gameFrame++;
                enemy.gameFrame++;
                for (let i = 0; i < beesArray.length; i++) {
                    beesArray[i].gameFrame++;
                }
                //console.log(gameFrame);
                if( player.life >= 0 ){
                    //level.src = `sprite/life${nbLife}.png`;
                    requestAnimationFrame(animate);  
                }
                
            }
            */
            function animate(){
                
                if( musicSound.played ){
                    musicSound.volume = 0.5;
                    musicSound.play();
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                escapeGame.handleBackground();
                escapeGame.gameFrame++;
                //console.log('gameFrame', escapeGame.gameFrame)
                /*
                if( escapeGame.gameFrame === 100 || escapeGame.gameFrame === 400 ){
                    escapeGame.paused = true;

                    setTimeout(() => {
                        requestAnimationFrame(animate); 
                      }, 3000)
                }else{
                    escapeGame.paused = false;
                }
                */
                
                escapeGame.handleLife();
                winno.update();
                handleEnemies();
                winno.draw();
                handleBees();
                
                console.log('gameOver', escapeGame.life)
                if( !escapeGame.stopped && !escapeGame.paused ){
                    //level.src = `sprite/life${nbLife}.png`;
                    requestAnimationFrame(animate);  
                }else if(escapeGame.gameOver || escapeGame.winner){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    escapeGame.handleBackground();
                    escapeGame.handleLife();
                    //escapeGame.handleGame();
                    belzeBear.draw();
                    belzeBear1.draw();
                    belzeBear2.draw();
                    winno.draw();
                    handleBees();
                    musicSound.pause();
                    refButtonStart.current.style.display = 'block';

                    if( escapeGame.winner ){
                        winnerSound.play();

                        const interval = setInterval(() => {
                        console.log("WINNER", 'interval');
                        //escapeGame.gameFrame++;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        escapeGame.handleBackground();
                        escapeGame.handleLife();
                        //escapeGame.handleGame();
                        belzeBear.draw();
                        belzeBear1.draw();
                        belzeBear2.draw();
                        winno.draw();
                        handleBees();
                        //level.src = link + "life.png";
                        //ctx.clearRect(HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice);
                        //ctx.globalCompositeOperation ="xor"
                        //ctx.drawImage(level, HEART.x1 + 10, HEART.y + 10, HEART.spriteWidth/3/ratioDevice, HEART.spriteHeight/3/ratioDevice); 
        
                        
                        //ctx.drawImage(img2, 100, 100);
                        if( escapeGame.winnerBackground.frame > 4 ){
                            clearInterval(interval);
                            console.log("WINNER", 'clear');
                        }
        
                        }, 1000)
                    }
                } 
            }
            animate();

            window.addEventListener('resize', () => {
                console.log('resize screen');
                canvasPosition = canvas.getBoundingClientRect();
            });
            
            refDiv.current.addEventListener('fullscreenchange', () => {
                console.log('full screen', screen.width, screen.height);
                //canvas.width = screen.width;
                //canvas.height = screen.height;
                canvas.width = 700;
                canvas.height = 250;
                //ratioDevice = 2;
                canvasPosition = canvas.getBoundingClientRect();
                console.log('canvasPoistion FULL SCREEN', canvasPosition);
            });

            window.addEventListener('scroll', () => {
                console.log('scroll screen');
                canvasPosition = canvas.getBoundingClientRect();
            });
        }
    }


    
    useEffect(()=>{
        
    }, []);



 

    return(
        

<div className="page-component__bg_image_box">
<div className="page-component__bg_overlay_box"></div>
<div className="page-component__wrapper" style={{
          zIndex: 18,
          paddingTop:'50px',
          paddingBottom:'50px',
          color:theme.palette.text.primary,
          //background:'blue'
      }}>
        <div ref={refDiv} className="container">
        


        <div className={`${styleEscape['div-escape']}`}>
            <p className={`${styleEscape['story-game']}`}>
            Help Winno to collect the bees and avoid the BelzeBearzs.
            </p>

            <Button 
            ref={refButtonStart}
            className={`${styleEscape['button-start']}`}
                variant='contained'
                onClick={()=>{
                    
                initGame();
                if( isMobile() ){
                    openFullscreen();
                    if( isMobile() ){
                        screen.orientation.lock("landscape-primary")
                        .then(function() {
                           // _LOCK_BUTTON.style.display = 'none';
                           // _UNLOCK_BUTTON.style.display = 'block';
                        })
                        .catch(function(error) {
                            alert(error);
                        });
                    }
                }
            }}>Start a game</Button>
        
    <canvas id="oook" ref={refCanvas} className={`${styleEscape['canvas']}`}>

    </canvas>
        </div>




        <div className="title-box title-box--center">
          {/* <h2 className="heading ">GALLERY</h2> */}
          <audio ref={refSound} id="sound" autoPlay controls >
        <source src="/assets/music/fishin.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio>
        <Button onClick={()=> {
            if( refSound.current ){
                refSound.current.play();
            }
            console.log('click button')
        }}>Play</Button>
        <span id="score">Score : {score}</span>
        </div>
      </div>

  
  

</div>
</div>
    )
}

export default Escape;