import React, { useEffect, useRef, useState } from 'react';
import styleWinnoAndBees from "./WinnoAndBees.module.css";
import { useTheme } from '@mui/material/styles';

import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TwitterIcon from '@mui/icons-material/Twitter';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepIcon from '@mui/material/StepIcon';
import StepContent from '@mui/material/StepContent';


import { GET_LOCAL_USER, DEFAULT_PLAYER, DIGIT_WALLET_ADDRESS, METHOD_POST, METHOD_GET } from './lib/constants';
import StepSaveData from './Stepper/StepSaveData';
import StepStartGame from './Stepper/StepStartGame';
import DescriptionGame from './components/DescriptionGame';
import Game from './classes/GameClass';
import TextFieldWalletAddress from './components/TextFieldWalletAddress';
import TextFieldTwitterName from './components/TextFieldTwitterName';
import Player from './classes/PlayerClass';
import { ACTION_SAVE_IMAGE } from '../../../lib/constants';


const PATH_ASSET = `/assets/games/winno_and_bees/`;
const PATH_IMG = `${PATH_ASSET}img/`;
const PATH_MUSIC = `${PATH_ASSET}music/`;

const TEXT_SAVE_DATA = "Save your data";
const TEXT_START_GAME = "Start a game";

const styleStepIcon = {
    '& .MuiStepLabel-root .Mui-active': { // circle color (ACTIVE)
        color: 'primary.main',
    },
    '& .MuiStepLabel-label.Mui-active': { // text (ACTIVE)
        color: 'text.primary',
    },
    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
        fill: 'text.primary', // circle's number (ACTIVE)
    },


    '& .MuiStepLabel-root .Mui-completed': { // circle color (COMPLETED)
        color: 'bluetwitter.main',
    },
    '& .MuiStepLabel-label.Mui-completed': { // text (COMPLETED)
        color: 'text.primary',
    },


    '& .MuiStepLabel-label': { // text (NORMAL)
        color: 'text.primary',
    },
};

const isMobile = () => {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        return true;
    }
    return false;
}

const openFullscreen = (refCanvas, game) => {
    //refButtonStart.current.style.display = 'none';
    //refButtonStart.current.style.display = 'none';

    if (refCanvas.current.requestFullscreen) {
        refCanvas.current.requestFullscreen();
    } else if (refCanvas.current.webkitRequestFullscreen) { /* Safari */
        refCanvas.current.webkitRequestFullscreen();
    } else if (refCanvas.current.msRequestFullscreen) { /* IE11 */
        refCanvas.current.msRequestFullscreen();
    }

    screen.orientation.lock("landscape-primary").then(function () {
        // _LOCK_BUTTON.style.display = 'none';
        // _UNLOCK_BUTTON.style.display = 'block';
        game.stopped = false;
    })
        .catch(function (error) {
            game.stopped = true;
            alert(error);
        });
}

const closeFullscreen = () => {
    screen.orientation.unlock();

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


const WinnoAndBees = () => {
    const theme = useTheme();


    const refDivDescription = useRef();
    const refDivStartGame = useRef();
    const refDivSContinueGame = useRef();
    const refCanvas = useRef();
    const refDivSaveGame = useRef();
    const refDivRestartGame = useRef();

    const [game, setGame] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [gameStopped, setGameStopped] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [player, setPlayer] = useState(DEFAULT_PLAYER);

    const [activeStep, setActiveStep] = useState(0);
    const [canEdit, setCanEdit] = useState(true);

    const [errorWallet, setErrorWallet] = useState(false);
    const [messageWallet, setMessageWallet] = useState('');
    const [errorTwitter, setErrorTwitter] = useState(false);
    const [messageTwitter, setMessageTwitter] = useState('');

    const initComponentState = () => {
        refDivDescription.current.style.display = 'flex';
        refDivStartGame.current.style.display = 'flex';
        refDivSContinueGame.current.style.display = 'none';
        refCanvas.current.style.display = 'none';
        refDivSaveGame.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'none';

        
    }

    const updateComponentState = () => {
        if( game && game.started ){

        }else{

        }
        refDivDescription.current.style.display = 'flex';
        refDivStartGame.current.style.display = 'flex';
        refDivSContinueGame.current.style.display = 'none';
        refCanvas.current.style.display = 'none';
        refDivSaveGame.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'none';
    }

    const handlePlayer = (player) => {
        setPlayer(player);
    }

    const isErrorWalletAddress = (walletAddress) => {
        if (!walletAddress.length) {
            setErrorWallet(true);
            setMessageWallet("Wallet address can't be empty !!!");
            return true;
        }

        if (walletAddress.search(DIGIT_WALLET_ADDRESS) === -1) {
            setErrorWallet(true);
            setMessageWallet("Wallet address must start with " + DIGIT_WALLET_ADDRESS + "!!!");
            return true;
        }

        if (walletAddress.length !== 42) {
            setErrorWallet(true);
            setMessageWallet("Wallet address must have 40 hexadecimal digits!!!");
            return true;
        }

        /*
        if( walletExist(walletAddress) ){
            setErrorWallet(true);
            setMessageWallet("Wallet address already exist on the data!!!");
            return true;
        }
        */

        setErrorWallet(false);
        setMessageWallet("");
        return false;
    }

    const isErrorTwitterName = (twitterName) => {
        if (!twitterName.length) {
            setErrorTwitter(true)
            setMessageTwitter("The twitter username can't be empty !!!");
            return true;
        }

        setErrorTwitter(false)
        setMessageTwitter("");
        return false;
    }

    const handleActiveStep = (active) => {
        setActiveStep(active);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleCanEdit = (edit) => {
        setCanEdit(edit);
    };

    useEffect(() => {

        let _player = getLocalUser();
        if (_player) {
            console.log('my user storage', _player);
            setPlayer(_player);
            handleNext();
        } else {
            console.log('my user storage', _player);

        }
        initComponentState();
    }, [player])

    const initGame = () => {
        refDivDescription.current.style.display = 'none';
        refDivStartGame.current.style.display = 'none';
        refDivSContinueGame.current.style.display = 'none';
        refCanvas.current.style.display = 'flex';
        refDivSaveGame.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'none';

        
        const canvas = refCanvas.current;
        canvas.width = screen.width >= Game.IDEAL_CANVAS_WIDTH ? Game.IDEAL_CANVAS_WIDTH : window.width;
        canvas.height = screen.height >= Game.IDEAL_CANVAS_HEIGHT ? Game.IDEAL_CANVAS_HEIGHT : window.height;
        //canvas.height = Game.IDEAL_CANVAS_HEIGHT;
        let canvasPosition = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');

        const mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            click: false,
        }

        let ratioDevice = 1;

        if (isMobile()) {
            //console.log('yaaaaaaaaaaaaaa', window.innerHeight, screen.height, window.innerHeight == screen.height)

            device = 'mobile';
            //canvas.width = EscapeGame.mobileWidth;
            //canvas.height = EscapeGame.mobileHeight;
            ratioDevice = 2;
            //let startx = 0;
            //let starty = 0;

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
        } else {
            canvas.addEventListener('mousemove', (event) => {
                mouse.click = true;
                mouse.x = event.x - canvasPosition.left;
                mouse.y = event.y - canvasPosition.top;
                //console.log(mouse.x, mouse.y)
            });
        }
        //const player = new Player(canvas, mouse);

        const game = new Game(canvas, mouse, ratioDevice, PATH_IMG, PATH_MUSIC, animate);



        setGame(game);
        setGameStarted(true);
        game.startGame();
        //console.log('canvas', canvas);
        //console.log('ctx', ctx);
        //console.log('mouse', mouse);
        //console.log('game', game.imgBackground);

        function animate() {
            game.gameFrame++;
            if (game.player) {
                game.player.gameFrame = game.gameFrame;
            }

            if (game.enemy1) {
                game.enemy1.gameFrame = game.gameFrame;
            }

            if (game.enemy2) {
                game.enemy2.gameFrame = game.gameFrame;
            }

            if (game.enemy3) {
                game.enemy3.gameFrame = game.gameFrame;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.handleBackground();
            //game.player.gameFrame = game.gameFrame;
            game.handleLife();
            game.playerUpdate();
            //game.enemy1.update();
            game.handleEnnemies();
            //game.enemy1.draw();
            game.playerDraw();
            game.handleBees();
            //game.winner = true;

            if (!game.paused && !game.stopped && !game.finished) {
                requestAnimationFrame(animate);
                //console.log('BEES', game.beesArray.length ? game.beesArray[0].gameFrame : 'null')
            }

            if( game.stopped ){
                refDivSContinueGame.current.style.display = 'flex';
            }else{
                refDivSContinueGame.current.style.display = 'none';
            }

            if (game.finished) {
                /*
                //game.finished = true;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                game.handleBackground();
                //game.gameFrame++;
                //game.playerUpdate();
                game.playerDraw();
                game.handleBees();
                game.handleLife();
                */
                game.finishGame();
                //saveImage(canvas);
                //game.started = false;
                setGame(game);

                if( isMobile() ){
                    closeFullscreen();
                }

                //refDivDescription.current.style.display = 'none';
                //refDivStartGame.current.style.display = 'none';
                //refDivSContinueGame.current.style.display = 'none';
                //refCanvas.current.style.display = 'flex';

                if( game.winner ){
                    refDivSaveGame.current.style.display = 'flex';
                }

                refDivRestartGame.current.style.display = 'flex';
                
                //console.log('canvas buffer', canvas.toBuffer("image/png"))
            }
        }

        animate();

        refCanvas.current.addEventListener('fullscreenchange', () => {
            if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange ) {
                //refCanvas.current.exitFullscreen();
                game.stopped = true;
                //escapeGame.paused = true;
                console.log('EXIT full screen', screen.width, screen.height);
            }else{
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                canvasPosition = canvas.getBoundingClientRect();
                game.stopped = false;
                
                console.log('full screen', screen.width, screen.height);
                console.log('canvasPoistion FULL SCREEN', canvasPosition);
            }
            
            console.log('canvasPoistion FULL SCREEN', canvasPosition);
        });

        refCanvas.current.addEventListener("webkitfullscreenchange", function() {
            if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange ) {
                //refCanvas.current.exitFullscreen();
                game.stopped = true;
                //escapeGame.paused = true;
                console.log('EXIT full screen', screen.width, screen.height);
            }else{
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                canvasPosition = canvas.getBoundingClientRect();
                game.stopped = false;
                
                console.log('full screen', screen.width, screen.height);
                console.log('canvasPoistion WEBKIT FULL SCREEN', canvasPosition);
            }
            
            console.log('canvasPoistion WEBKIT FULL SCREEN', canvasPosition);
        });

        refCanvas.current.addEventListener("msfullscreenchange", function() {
            if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange ) {
                //refCanvas.current.exitFullscreen();
                game.stopped = true;
                //escapeGame.paused = true;
                console.log('EXIT full screen', screen.width, screen.height);
            }else{
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                canvasPosition = canvas.getBoundingClientRect();
                game.stopped = false;
                
                console.log('full screen', screen.width, screen.height);
                console.log('canvasPoistion MS FULL SCREEN', canvasPosition);
            }
            
            console.log('canvasPoistion MS FULL SCREEN', canvasPosition);
        });

        refCanvas.current.addEventListener("mozfullscreenchange", function() {
            if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange ) {
                //refCanvas.current.exitFullscreen();
                game.stopped = true;
                //escapeGame.paused = true;
                console.log('EXIT full screen', screen.width, screen.height);
            }else{
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                canvasPosition = canvas.getBoundingClientRect();
                game.stopped = false;
                
                console.log('full screen', screen.width, screen.height);
                console.log('canvasPoistion MOZ FULL SCREEN', canvasPosition);
            }
            
            console.log('canvasPoistion MOZ FULL SCREEN', canvasPosition);
        });

        

        screen.orientation.addEventListener('change', function() {
            console.log('Current orientation is ' + screen.orientation.type);
            //document.getElementById('score').innerHTML = 'Score : ' + screen.orientation.type;
            
            if( screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary' ){
                game.stopped = true;
            }else{
                if (refCanvas.current.fullscreenElement) {
                    game.stopped = false;
                }else{
                    game.stopped = true;
                }
            }
            canvasPosition = canvas.getBoundingClientRect();
        });

        window.addEventListener('resize', () => {
           // console.log('resize screen');
            canvasPosition = canvas.getBoundingClientRect();
        });

        window.addEventListener('scroll', () => {
           // console.log('scroll screen');
            canvasPosition = canvas.getBoundingClientRect();
        });
    }

    const saveImage = async (canvas) => { 
        /*
if( window.sessionStorage.getItem(STORAGE_ADVERTISE_SESSION) === null ){
            window.sessionStorage.setItem(STORAGE_ADVERTISE_SESSION, _showAdvertiseSession);
          }
        */
        //await fetch(`/api/airdrop/winnobearznft?action=get_list`, {
        //await fetch(`/api/airdrop/winnobearznft?action=get_count`, {
        //await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER}&walletAddress=${data.walletAddress}&twitterName=${data.twitterName}&score=${data.score}`, {
        //await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER_BY_WALLET}&walletAddress=${data.walletAddress}`, {
        //await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER_BY_TWITTER}&twitterName=${data.twitterName}`, {
            var formData = new FormData();
            formData.append('action', ACTION_SAVE_IMAGE);
            formData.append('walletAddress', 'aieDaan');
            formData.append('canvas', canvas.toDataURL("image/png"));

            await fetch(`/api/airdrop/winnobearznft`, {
                //walletAddress:{walletAddress:data.walletAddress},
                //method: 'GET', // *GET, POST, PUT, DELETE, etc.
                method: METHOD_POST, // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                body: JSON.stringify({action:ACTION_SAVE_IMAGE, walletAddress:'aieDaan', canvas: canvas.toDataURL("image/png"), }),
                //body: JSON.stringify(formData),
                
                headers: {
                'Content-Type': 'application/json',
                //'walletAddress': data.walletAddress,
                //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },  
              })
              .then( async (response) => {  
                console.log('AAAAAOOOOOK', response)
 
                   // return await response.json();
                  //return response.json();
              });
/*

        await fetch(`/api/airdrop/winnobearznft`, {
            //walletAddress:{walletAddress:data.walletAddress},
            //method: 'GET', // *GET, POST, PUT, DELETE, etc.
            method: METHOD_POST, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            body: JSON.stringify({action:ACTION_SAVE_IMAGE, walletAddress:'aieDaan', canvas: canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, ""), }),
            
            headers: {
            'Content-Type': 'application/json',
            //'walletAddress': data.walletAddress,
            //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },  
          })
          .then( async (response) => {   
                return await response.json();
              //return response.json();
          }).then( async (response2) => {   
            const imagePath = response2;
            
            console.log({okSave: imagePath.ya});
            /*const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link)
            link.setAttribute('download',  '/games/winno_and_bees/img/airdrop/aieDaan' + '.png');
            link.setAttribute('href', imagePath.replace("image/png", "image/octet-stream"));
            link.click();
            */
           /*
            const link = `http://localhost:3000/ok.php`;
            var xmlhttp = new XMLHttpRequest(); 
            xmlhttp.onreadystatechange = function(){ 
                if ( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) { 
                    var response = xmlhttp.responseText; 
                    
                    var obj = JSON.parse( response ); 
                    console.log('response PHP', response)
                    // process your object here 
                } 
            } 
            xmlhttp.open( METHOD_GET, link, true ); 
            xmlhttp.send();
            
          //return response.json();
      }).catch( (error) => {
            console.log({SOURCE_ID: error})
            return null;
          });   
    */      
    };
    


    return (

        <div className="page-component__bg_image_box">
            <div className="page-component__wrapper" style={{
                zIndex: 18,
                paddingTop: '50px',
                paddingBottom: '50px',
                color: theme.palette.text.primary,
                background: theme.palette.background.default,
            }}>
                <div className="container">

                

                    <div ref={refDivDescription} className={`${styleWinnoAndBees['div-main']}`} >
                        <DescriptionGame show={true} scoreToWin={Game.SCORE_WINNER} />
                    </div>


                    <div ref={refDivStartGame} className={`${styleWinnoAndBees['div-main']}`} >
                        <Button
                            //ref={refButtonStart}
                            //disabled={!isUserSessionStorage}
                            
                            className={`${styleWinnoAndBees['button-action']}`}
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                //addUser({walletAddress: walletAddress, twitterName: twitterName});
                                //window.sessionStorage.removeItem(GET_LOCAL_SESSION_USER)
                                //console.log('length wallet', walletAddress.length)

                                initGame();

                                if (isMobile()) {
                                    openFullscreen(refCanvas, game);
                                }

                                //console.log('yaaaaaaaaaaaaaa', window.innerHeight, screen.height, window.innerHeight == screen.height)
                            }}>Start a game</Button>
                    </div>

                    <div ref={refDivSContinueGame} className={`${styleWinnoAndBees['div-main']}`} style={{ display: 'none' }}>
                        <Button
                            //disabled={true}
                            className={`${styleWinnoAndBees['button-action']}`}
                            variant='contained'
                            color='primary'
                            onClick={async () => {
                                if (isMobile()) {
                                    openFullscreen(refCanvas, game);
                                }
                            }}
                        //variant='outlined'
                        >Continue</Button>
                    </div>

                    <div className={`${styleWinnoAndBees['div-main']}`} style={{visibility: game && game.started ? 'visible' : 'hidden'}}>
                        <canvas ref={refCanvas} className={`${styleWinnoAndBees['canvas']}`}>
                            <img id="imgBackground" src={PATH_IMG + "background-start.png"} alt="background 1" />
                            <img id="imgBackground1" src={PATH_IMG + "background-middle1.png"} alt="background 2" />
                            <img id="imgBackground2" src={PATH_IMG + "background-middle2.png"} alt="background 3" />
                            <img id="imgBackground3" src={PATH_IMG + "background-end.png"} alt="background 4" />

                            <img id="imgLife0" src={PATH_IMG + "life0.png"} alt="life 0" />
                            <img id="imgLife1" src={PATH_IMG + "life1.png"} alt="life 1" />
                            <img id="imgLife2" src={PATH_IMG + "life2.png"} alt="life 2" />
                            <img id="imgLife3" src={PATH_IMG + "life3.png"} alt="life 3" />
                            <img id="imgScore" src={PATH_IMG + "bee-score.png"} alt="bee score" />

                            <img id="imgWinner" src={PATH_IMG + "winner.png"} alt="winner" />
                            <img id="imgGameOver" src={PATH_IMG + "game-over.png"} alt="game over" />

                            <img id="imgPlayer" src={PATH_IMG + "player-sprite.png"} alt="player sprite" />
                            <img id="imgPlayerReverse" src={PATH_IMG + "player-reverse-sprite.png"} alt="player reverse sprite" />

                            <img id="imgEnemy1" src={PATH_IMG + "enemy1-sprite.png"} alt="enemy 1 sprite" />
                            <img id="imgEnemy2" src={PATH_IMG + "enemy2-sprite.png"} alt="enemy 2 sprite" />
                            <img id="imgEnemy3" src={PATH_IMG + "enemy3-sprite.png"} alt="enemy 3 sprite" />

                            <img id="imgBee" src={PATH_IMG + "bee-sprite.png"} alt="bee sprite" />

                            <audio id="musicGame" loop="loop">
                                <source src={PATH_MUSIC + 'music-game.mp3'} type="audio/mp3" />
                            </audio>

                            <audio id="musicTouchBee">
                                <source src={PATH_MUSIC + 'music-bee-touch.mp3'} type="audio/mp3" />
                            </audio>

                            <audio id="musicTouchEnemy">
                                <source src={PATH_MUSIC + 'music-belzebear-touch.mp3'} type="audio/mp3" />
                            </audio>

                            <audio id="musicWinner">
                                <source src={PATH_MUSIC + 'music-winner.mp3'} type="audio/mp3" />
                            </audio>

                            <audio id="musicGameOver">
                                <source src={PATH_MUSIC + 'music-game-over.mp3'} type="audio/mp3" />
                            </audio>
                        </canvas>
                    </div>


                    <div ref={refDivSaveGame} className={`${styleWinnoAndBees['div-main']}`} style={{ display: 'none' }}>

                        <Stack
                            direction={'column'}
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                            //mb={3}
                            p={2}
                        >
                            <TextFieldWalletAddress player={player} handlePlayer={handlePlayer} error={{ errorWallet: errorWallet, messageWallet: messageWallet }} />


                            <TextFieldTwitterName player={player} handlePlayer={handlePlayer} error={{ errorTwitter: errorTwitter, messageTwitter: messageTwitter }} />
                        </Stack>
                        <Button
                            //ref={refButtonStart}
                            //disabled={isUserSessionStorage}
                            //disabled={true}
                            className={`${styleWinnoAndBees['button-action']}`}
                            variant='contained'
                            color='primary'
                            onClick={async () => {
                                //addUser({walletAddress: walletAddress, twitterName: twitterName});
                                //window.sessionStorage.removeItem(GET_LOCAL_SESSION_USER)
                                //let _errorWallet = isErrorWalletAddress(player.walletAddress);
                                //let _errorTwitter = isErrorTwitterName(player.twitterName);
                                //let user = await getUser({walletAddress : player ? player.walletAddress : walletAddress});
                                //await setUserByWallet({walletAddress: walletAddress, twitterName: twitterName, score: 37, airdropped: true});
                                /*

                                if (!_errorWallet && !_errorTwitter) {
                                    let isWallet = await walletExist(player.walletAddress);
                                    if (!isWallet) {
                                        await addUser({ walletAddress: player.walletAddress, twitterName: player.twitterName });
                                    }
                                    setUserSessionStorage();
                                    setIsUserSessionStorage(true);
                                }
                                */

                                //setUserByWallet({walletAddress: walletAddress, twitterName: twitterName, score: 37, airdropped: true});
                                //setErrorWallet(true);
                                //setMessageWallet('AAAARG');
                            }}>Save data</Button>


                    </div>

                    <div ref={refDivRestartGame} className={`${styleWinnoAndBees['div-main']}`} style={{ display: 'none' }}>
                            <Button
                            //ref={refButtonStart}
                            //disabled={isUserSessionStorage}
                            //disabled={true}
                            className={`${styleWinnoAndBees['button-action']}`}
                            variant='contained'
                            color='primary'
                            onClick={async () => {
                                setGame(null);
                                initComponentState();
                            }}>Restart Game</Button>
                    </div>


                </div>
            </div>
        </div>

    )
}

const getLocalUser = () => {
    if (window.localStorage.getItem(GET_LOCAL_USER)) {
        const userStorage = JSON.parse(window.localStorage.getItem(GET_LOCAL_USER));
        return userStorage;
    }
    return null;
}

const setLocalUser = (player) => {
    window.localStorage.setItem(GET_LOCAL_USER, JSON.stringify(player));
}

export default WinnoAndBees;