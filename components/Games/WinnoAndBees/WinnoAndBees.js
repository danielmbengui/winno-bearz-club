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


import { GET_LOCAL_USER, DEFAULT_PLAYER, DIGIT_WALLET_ADDRESS } from './lib/constants';
import StepSaveData from './Stepper/StepSaveData';
import StepStartGame from './Stepper/StepStartGame';
import DescriptionGame from './components/DescriptionGame';
import Game from './classes/GameClass';
import TextFieldWalletAddress from './components/TextFieldWalletAddress';
import TextFieldTwitterName from './components/TextFieldTwitterName';
import Player from './classes/PlayerClass';


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
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        return true;
    }
    return false;
}

const openFullscreen = (refCanvas) => {
    //refButtonStart.current.style.display = 'none';
    //refButtonStart.current.style.display = 'none';
    
    if (refCanvas.current.requestFullscreen) {
        refCanvas.current.requestFullscreen();
    } else if (refCanvas.current.webkitRequestFullscreen) { /* Safari */
        refCanvas.current.webkitRequestFullscreen();
    } else if (refCanvas.current.msRequestFullscreen) { /* IE11 */
        refCanvas.current.msRequestFullscreen();
    }

    
    screen.orientation.lock("landscape-primary").then(function() {
        // _LOCK_BUTTON.style.display = 'none';
        // _UNLOCK_BUTTON.style.display = 'block';
        
    })
    .catch(function(error) {
        alert(error);
    });
  }


const WinnoAndBees = () => {
    const theme = useTheme();
    const refCanvas = useRef();

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
    }, [player])

    const initGame = () => {
        const canvas = refCanvas.current;
        canvas.width = 1024;
        canvas.height = 512;
        let canvasPosition = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        const mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            click: false,
        }

        if( isMobile() ){
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
        }else{
            canvas.addEventListener('mousemove', (event) => {
                mouse.click = true;
                mouse.x = event.x - canvasPosition.left;
                mouse.y = event.y - canvasPosition.top;
                //console.log(mouse.x, mouse.y)
            });
        }
        //const player = new Player(canvas, mouse);
        
        const game = new Game(canvas, mouse, 1, PATH_IMG, PATH_MUSIC, animate);

        
        
        setGame(game);
        setGameStarted(true);
        game.startGame();
        console.log('canvas', canvas);
        console.log('ctx', ctx);
        console.log('mouse', mouse);
        console.log('game', game.imgBackground);

        function animate(){
            game.gameFrame++;
            if( game.player ){
                game.player.gameFrame = game.gameFrame;
            }

            if( game.enemy1 ){
                game.enemy1.gameFrame = game.gameFrame;
            }

            if( game.enemy2 ){
                game.enemy2.gameFrame = game.gameFrame;
            }

            if( game.enemy3 ){
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

            if( !game.paused && !game.stopped && !game.finished ){
                requestAnimationFrame(animate);  
                //console.log('BEES', game.beesArray.length ? game.beesArray[0].gameFrame : 'null')
            }

            if( game.finished ){
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
            }
        }

        animate();

        window.addEventListener('resize', () => {
            console.log('resize screen');
            canvasPosition = canvas.getBoundingClientRect();
        });

        window.addEventListener('scroll', () => {
            console.log('scroll screen');
            canvasPosition = canvas.getBoundingClientRect();
        });
    }


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
                    <div className={`${styleWinnoAndBees['div-main']}`}>
                        <DescriptionGame show={true} scoreToWin={Game.SCORE_WINNER} />

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
                                
                                if( isMobile() ){
                                    openFullscreen(refCanvas);
                                }
                            
                                //console.log('yaaaaaaaaaaaaaa', window.innerHeight, screen.height, window.innerHeight == screen.height)
                            }}>Start a game</Button>
                    </div>

                    <div className={`${styleWinnoAndBees['div-main']}`} style={{display:'none'}}>
                        <Button
                            //disabled={true}
                            className={`${styleWinnoAndBees['button-action']}`}
                            variant='contained'
                            color='primary'
                        //variant='outlined'
                        >Continue</Button>
                    </div>

                    <div className={`${styleWinnoAndBees['div-main']}`} style={{display:'none'}}>

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


                    <div className={`${styleWinnoAndBees['div-main']}`}>
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