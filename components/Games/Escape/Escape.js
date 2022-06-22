import React, {useEffect, useRef, useState} from 'react';
import styleEscape from "./Escape.module.css";
import { useTheme, } from '@mui/material/styles';
import { Button } from '@mui/material';
import Image from 'next/image';

//const playerLeft = new Image();
const playerLeft = '/assets/img/team/pic-team.png';

//import Player from './classes/PlayerClass';

const Escape = ({database, contractInfo,}) => {
    const theme = useTheme();
    const refCanvas = useRef();
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
    
    console.log('refCanvas BEFORE', refCanvas.current,)
    
    
    const setupCanvas = () => {
        if( refCanvas.current ){
            let _canvas = refCanvas.current;
            _canvas.width = 800;
            _canvas.height = 500;
            let _ctx = _canvas.getContext('2d');
            _ctx.font = '40px Georgia';
            let _canvasPosition = _canvas.getBoundingClientRect();
            let _mouse = { x: _canvas.width/2, y: _canvas.height/2, click: false,}
            /*
            canvas.addEventListener('mousemove', (event) => {
                mouse.click = true;
                mouse.x = event.x - canvasPosition.left;
                mouse.y = event.y - canvasPosition.top;
                console.log(mouse.x, mouse.y)
            });
            */
            _canvas.addEventListener('mousedown', (event) => {
                _mouse.click = true;
                _mouse.x = event.x - _canvasPosition.left;
                _mouse.y = event.y - _canvasPosition.top;
                console.log(_mouse.x, _mouse.y)
            });

            _canvas.addEventListener('mouseup', (event) => {
                _mouse.click = false;
                _mouse.x = event.x - _canvasPosition.left;
                _mouse.y = event.y - _canvasPosition.top;
                console.log(_mouse.x, _mouse.y)
            });
            let _player = new Player(_canvas, _ctx, _mouse);
            setCanvas(_canvas);
            setCanvasPosition(_canvasPosition);
            setCtx(_ctx);
            setMouse(_mouse);
            setPlayer(_player);

            /*
            window.addEventListener('resize', () => {
                setCanvasPosition(_canvas.getBoundingClientRect());
            });
            */
        }
    }

    useEffect(()=>{
        console.log('refCanvas NORM', refCanvas.current, 'document NORM', document.getElementById('oook'))
        if( refCanvas.current ){
            refCanvas.current.width = 800;
            refCanvas.current.height = 500;
        const ctx = refCanvas.current.getContext('2d');
        let score = 0;
        let gameFrame = 0;
        ctx.font = '40px Georgia';
        let gameSpeed = 1;
        let gameOver = false;

        let canvasPosition = refCanvas.current.getBoundingClientRect();
        setCanvasPosition(canvasPosition);

        const mouse = {
            x: refCanvas.current.width/2,
            y: refCanvas.current.height/2,
            click: false,
        }
        /*
        canvas.addEventListener('mousemove', (event) => {
            mouse.click = true;
            mouse.x = event.x - canvasPosition.left;
            mouse.y = event.y - canvasPosition.top;
            console.log(mouse.x, mouse.y)
        });
        */
        refCanvas.current.addEventListener('mousedown', (event) => {
            mouse.click = true;
            mouse.x = event.x - canvasPosition.left;
            mouse.y = event.y - canvasPosition.top;
            console.log(mouse.x, mouse.y)
        });

        refCanvas.current.addEventListener('mouseup', (event) => {
            mouse.click = false;
            mouse.x = event.x - canvasPosition.left;
            mouse.y = event.y - canvasPosition.top;
            console.log(mouse.x, mouse.y)
        });

        // NOUS
        class Player {
            constructor(){
                this.x = refCanvas.current.width;
                this.y = refCanvas.current.height/2;
                this.radius = 50;
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

                
                ctx.fillStyle = 'green';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
                ctx.fillRect(this.x, this.y, this.radius, 10);
                

                ctx.save();
                //ctx.translate(this.x, this.y);
                /*
                ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, 
                    this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                    this.x - 53, this.y - 53, this.spriteWidth/10, this.spriteHeight/10);
                    */
            }
        }

        const player = new Player();
        setPlayer(player);
        setCtx(ctx);

        function animate(){
            ctx.clearRect(0, 0, refCanvas.current.width, refCanvas.current.height);
            //handleBackground();
            //handleBubbles();
            
            player.update();
            player.draw();
            //handleEnemies();
            //ctx.fillStyle = 'black';
            //ctx.fillText('Score : ' + score, 10, 50);
            //document.getElementById('score').innerHTML = 'Score : ' + score;
            gameFrame++;
            //console.log(gameFrame);
            requestAnimationFrame(animate); 
        }
        
        animate();

        window.addEventListener('resize', () => {
            canvasPosition = refCanvas.current.getBoundingClientRect();
            //var clickEvent = document.createEvent('MouseEvents');
            //clickEvent.initEvent('mouseup', true, true);
            //canvas.click();
        })
        

        console.log('refCanvas YES', refCanvas.current, 'document YES', document.getElementById('oook'))
        }
    }, []);

    useEffect(()=> {

    }, [])


 

    return(
        

<div className="page-component__bg_image_box">
<div className="page-component__bg_overlay_box"></div>
<div className="page-component__wrapper" style={{
          zIndex: 18,
          paddingTop:'50px',
          paddingBottom:'50px',
          color:theme.palette.text.primary,
          background:'blue'
      }}>
        <div className="container">
        


        <div className={`${styleEscape['div-escape']}`}>
        
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