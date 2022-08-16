import React, { useEffect, useRef, useState } from 'react';
import styleWinnoAndBees from "./WinnoAndBees.module.css";
import { useTheme } from '@mui/material/styles';
import Description from './components/Description';
import Game from './classes/GameClass';
import InfoPlayer from './components/InfoPlayer';
import { DEFAULT_PLAYER, LINK_API, PATH_MUSIC } from './lib/constants';
import { PATH_IMG, ALT_IMG_BEE_SPRITE, ID_IMG_BEE, PATH_IMG_BEE_SPRITE, } from './lib/img';
import { closeFullscreen, createPlayerJson, isMobile, openFullscreen, readPlayerJson, readPlayerJsonByTwitter, readPlayerJsonByWallet, readPLayerJsonList, readPLayerJsonListCount, readPlayerStorage, updatePlayerJson, updatePlayerStorage } from './lib/functions';
import { Button } from '@mui/material';
import StartGame from './components/StartGame';
import SavePlayer from './components/SavePlayer';
import ErrorGame from './components/ErrorGame';
import RestartGame from './components/RestartGame';
import { ACTION_ADD_USER, ACTION_GET_USER_BY_WALLET, ACTION_GET_USER_LIST, ACTION_GET_USER_LIST_COUNT, METHOD_GET, METHOD_POST } from '../../../lib/constants';

import { getAuth, onAuthStateChanged, signOut, signInWithPopup, TwitterAuthProvider, unlink, linkWithRedirect, reauthenticateWithRedirect, linkWithPopup, reauthenticateWithPopup, getRedirectResult, signInWithRedirect} from "firebase/auth";


const WinnoAndBees = ({database, app}) => {
    const theme = useTheme();

    const provider = new TwitterAuthProvider();
    console.log('provider', provider)
    //const auth = getAuth();
    console.log('auth', process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
    const refDivDescription = useRef();
    const refDivInfoPlayer = useRef();
    const refDivStartGame = useRef();
    const refCanvas = useRef();
    const refDivSavePlayer = useRef();
    const refDivErrorGame = useRef();
    const refDivRestartGame = useRef();





    //walletAddress: '', twitterName: '', bestScore: 0, whitelisted: false, airdropped: false, nGame: 0
    const [game, setGame] = useState(null);
    const [player, setPlayer] = useState(DEFAULT_PLAYER);
    const [errorWallet, setErrorWallet] = useState({error: false, message: ''});
    //const [messageWallet, setMessageWallet] = useState('');
    const [errorTwitter, setErrorTwitter] = useState({error: false, message: ''});
    //const [messageTwitter, setMessageTwitter] = useState('');

    useEffect(() => {
        initComponentState();

        const playerStorage = readPlayerStorage();
        if (playerStorage) {
            setPlayer(playerStorage);
        }
        //console.log('player', player, 'storage', playerStorage);
    }, []);

    function initComponentState() {
        refDivDescription.current.style.display = 'flex';
        refDivInfoPlayer.current.style.display = 'none';
        refDivStartGame.current.style.display = 'flex';
        refCanvas.current.style.display = 'none';
        refDivSavePlayer.current.style.display = 'none';
        refDivErrorGame.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'none';
    }

    function updateComponentState(game) {
        if( game && game.started ){
            if( game.stopped ){
                refCanvas.current.style.display = 'none';
                refDivErrorGame.current.style.display = 'flex';
                game.musicSound.stop();
            }

            if (game.finished) {
                if( game.winner ){
                    refDivSavePlayer.current.style.display = 'flex';
                }
    
                refDivRestartGame.current.style.display = 'flex';
            }
        }else{

        }
    }

    function startGame() {
        refDivDescription.current.style.display = 'none';
        //refDivInfoPlayer.current.style.display = 'none';
        refDivStartGame.current.style.display = 'none';
        refCanvas.current.style.display = 'flex';
        //window.moveTo(0, 0);
        //window.href = refCanvas.current;
        
        if (isMobile()) {
            openFullscreen(refCanvas);
        }

        const canvas = refCanvas.current;
        const ctx = canvas.getContext('2d');
        canvas.width = isMobile() ? Game.IDEAL_MOBILE_WIDTH : Game.IDEAL_DESKTOP_WIDTH;
        canvas.height = isMobile() ? Game.IDEAL_MOBILE_HEIGHT : Game.IDEAL_DESKTOP_HEIGHT;
        let canvasPosition = canvas.getBoundingClientRect();
        

        const mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            click: false,
        }

        let ratioDevice = 1;
        if ( isMobile() ) {
            ratioDevice = 2;

            canvas.addEventListener('touchmove', (event) => {
                let touchObj = event.changedTouches[0];
                mouse.click = true;
                mouse.x = parseInt(touchObj.clientX) - canvasPosition.left;
                mouse.y = parseInt(touchObj.clientY) - canvasPosition.top;
                event.preventDefault();
            });

            canvas.addEventListener('touchcancel', (event) => {
                mouse.click = true;
                mouse.x = canvasPosition.left;
                mouse.y = canvasPosition.top;
                event.preventDefault();
            });
        } else {
            canvas.addEventListener('mousemove', (event) => {
                mouse.click = true;
                mouse.x = event.x - canvasPosition.left;
                mouse.y = event.y - canvasPosition.top;
            });
            window.scrollTo(0, 0);
        }

        const game = new Game(canvas, mouse, ratioDevice, animate);
        game.startGame();
        setGame(game);

        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.gameFrame++;
            game.updateGameFrameElements();

            game.handleBackground();
            game.handleLife();
            game.playerUpdate();
            game.handleEnnemies();
            game.playerDraw();
            game.handleSalmons();
            game.handleBees();
            
            


            if (!game.paused && !game.stopped && !game.finished) {
                requestAnimationFrame(animate);
                //console.log('BEES', game.beesArray.length ? game.beesArray[0].gameFrame : 'null')
            }

            if( game.stopped ){
                refCanvas.current.style.display = 'none';
                refDivErrorGame.current.style.display = 'flex';
                game.musicSound.stop();
            }

            if (game.finished) {
                if( isMobile() ){
                    //closeFullscreen();
                    closeFullscreen();
                }
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
                //refDivInfoPlayer.current.style.display = 'flex';
                //saveImage(canvas);
                //game.started = false;
                //let _player = { ...player, walletAddress: walletAddress, };
                //handlePlayer({ ...player, walletAddress: walletAddress, });
                if( game.score > player.bestScore ){
                    setPlayer({ ...player, bestScore: game.score, });
                }
                if( game.winnerWhitelist ){
                    setPlayer({ ...player, whitelisted: true, });
                    //refDivSavePlayer.current.style.display = 'flex';
                }

                if( game.winnerAirdrop ){
                    setPlayer({ ...player, airdropped: true, });
                    //refDivSavePlayer.current.style.display = 'flex';
                }

                /*
                if( game.winner ){
                    //refDivSavePlayer.current.style.display = 'flex';
                }
                */
    
                refDivRestartGame.current.style.display = 'flex';
                //const _player = player;

                
                
                //console.log('canvas buffer', canvas.toBuffer("image/png"))
            }
        }
        animate();


        window.addEventListener('resize', () => {
            // console.log('resize screen');
             canvasPosition = canvas.getBoundingClientRect();
         });
 
         window.addEventListener('scroll', () => {
            // console.log('scroll screen');
             canvasPosition = canvas.getBoundingClientRect();
         });

         refCanvas.current.addEventListener('fullscreenchange', () => {
            if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange ) {
                //refCanvas.current.exitFullscreen();
                game.stopped = true;
                //escapeGame.paused = true;
                console.log('EXIT full screen', screen.width, screen.height);
            }/*else{
                canvas.width = Game.IDEAL_MOBILE_WIDTH;
                canvas.height = Game.IDEAL_MOBILE_HEIGHT;
                canvasPosition = canvas.getBoundingClientRect();
                game.stopped = false;
                
                console.log('full screen', screen.width, screen.height);
                console.log('canvasPoistion FULL SCREEN', canvasPosition);
            }
            */
            
            console.log('canvasPoistion FULL SCREEN', canvasPosition);
        });

        refCanvas.current.addEventListener("webkitfullscreenchange", function() {
            if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange ) {
                //refCanvas.current.exitFullscreen();
                game.stopped = true;
                //escapeGame.paused = true;
                console.log('EXIT full screen', screen.width, screen.height);
            }/*else{
                canvas.width = Game.IDEAL_MOBILE_WIDTH;
                canvas.height = Game.IDEAL_MOBILE_HEIGHT;
                canvasPosition = canvas.getBoundingClientRect();
                game.stopped = false;
                
                console.log('full screen', screen.width, screen.height);
                console.log('canvasPoistion FULL SCREEN', canvasPosition);
            }
            */
            
            console.log('canvasPoistion WEBKIT FULL SCREEN', canvasPosition);
        });

        refCanvas.current.addEventListener("msfullscreenchange", function() {
            if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange ) {
                //refCanvas.current.exitFullscreen();
                game.stopped = true;
                //escapeGame.paused = true;
                console.log('EXIT full screen', screen.width, screen.height);
            }/*else{
                canvas.width = Game.IDEAL_MOBILE_WIDTH;
                canvas.height = Game.IDEAL_MOBILE_HEIGHT;
                canvasPosition = canvas.getBoundingClientRect();
                game.stopped = false;
                
                console.log('full screen', screen.width, screen.height);
                console.log('canvasPoistion FULL SCREEN', canvasPosition);
            }
            */
            
            console.log('canvasPoistion MS FULL SCREEN', canvasPosition);
        });

        refCanvas.current.addEventListener("mozfullscreenchange", function() {
            if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange ) {
                //refCanvas.current.exitFullscreen();
                game.stopped = true;
                //escapeGame.paused = true;
                console.log('EXIT full screen', screen.width, screen.height);
            }/*else{
                canvas.width = Game.IDEAL_MOBILE_WIDTH;
                canvas.height = Game.IDEAL_MOBILE_HEIGHT;
                canvasPosition = canvas.getBoundingClientRect();
                game.stopped = false;
                
                console.log('full screen', screen.width, screen.height);
                console.log('canvasPoistion FULL SCREEN', canvasPosition);
            }
            */
            
            console.log('canvasPoistion MOZ FULL SCREEN', canvasPosition);
        });

        

        screen.orientation.addEventListener('change', function() {
            console.log('Current orientation is ' + screen.orientation.type);
            //document.getElementById('score').innerHTML = 'Score : ' + screen.orientation.type;
            
            if( screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary' ){
                if( !game.finished ){
                    game.stopped = true;
                }
            }/*else{
                canvas.width = Game.IDEAL_MOBILE_WIDTH;
                canvas.height = Game.IDEAL_MOBILE_HEIGHT;
                game.stopped = false;
                
                if (refCanvas.current.fullscreenElement) {
                    game.stopped = false;
                }else{
                    game.stopped = true;
                }
                
            }
            */
            canvasPosition = canvas.getBoundingClientRect();
        });

    }

    const restartGame = () => {
        setGame(null);
        initComponentState();
    }

    const handlePlayer = (_player) => {
        setPlayer(_player);
    }

    const handleErrorWallet = (_errorWallet) => {
        setErrorWallet(_errorWallet);
    }

    const handleErrorTwitter = (_errorTwitter) => {
        setErrorTwitter(_errorTwitter);
    }



    return (
        <div className={`page-component__bg_image_box`}>
            <div className="page-component__wrapper" style={{
                zIndex: 18,
                paddingTop: '5vh',
                paddingBottom: '5vh',
                //color: theme.palette.text.primary,
                //background: theme.palette.background.default,
            }}>
                <div className={'container'}>

                    <div ref={refDivDescription} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <Description scoreToWhitelist={Game.SCORE_TO_WHITELIST} scoreToAirdrop={Game.SCORE_TO_AIRDROP} />
                    </div>

                    <div ref={refDivInfoPlayer} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <InfoPlayer player={player} />
                    </div>

                    <div ref={refDivStartGame} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <StartGame onClickEvent={async () => {
                            //console.log('CCCLIIICK')
                            //isMobile();
                            //setGame(null);
                            //let _player = { ...player, whitelisted: false, airdropped: true };
                            //setPlayer(_player);
                            //updatePlayerStorage(_player);
                            //startGame();
                            let pl = {...player, walletAddress:'0x2024', twitterName: 'fulline', bestScore: Game.SCORE_TO_AIRDROP * 2, nGame: 21}
                            //await createPlayerJson(pl);
                            //await updatePlayerJson(pl);
                            let playerJson = await readPlayerJson(pl);
                            //let playerJson = await readPlayerJsonByWallet(pl);
                            //let playerJson = await readPlayerJsonByTwitter(pl);
                            //const playerList = await readPLayerJsonList();
                            //const playerListCount = await readPLayerJsonListCount();
                            console.log('Player METHOD OKay', playerJson,)
                        }} />
                    </div>

                    <div className={`${styleWinnoAndBees['flex-vertical']}`}>
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

                            <img id={ID_IMG_BEE} src={PATH_IMG_BEE_SPRITE} alt={ALT_IMG_BEE_SPRITE} />
                            <img id="imgSalmon" src={PATH_IMG + "salmon-sprite.png"} alt="salmon sprite" />

                            

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

                    <div ref={refDivSavePlayer} className={`${styleWinnoAndBees['flex-vertical']}`} >
                    <SavePlayer player={player} handlePlayer={handlePlayer} errorWallet={errorWallet} errorTwitter={errorTwitter} handleErrorWallet={handleErrorWallet} handleErrorTwitter={handleErrorTwitter} />
                    </div>

                    <div ref={refDivErrorGame} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <ErrorGame restartGameComponent={<RestartGame game={game} restartGame={restartGame} />} />
                    </div>

                    <div ref={refDivRestartGame} className={`${styleWinnoAndBees['flex-vertical']}`}>
                            <RestartGame game={game} restartGame={restartGame} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WinnoAndBees;