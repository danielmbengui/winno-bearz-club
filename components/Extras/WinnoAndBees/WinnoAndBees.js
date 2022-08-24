import React, { useEffect, useRef, useState } from 'react';
import styleWinnoAndBees from "./WinnoAndBees.module.css";
import { useTheme } from '@mui/material/styles';
import Description from './components/Description';
import Game from './classes/GameClass';
import InfoPlayer from './components/InfoPlayer';
import { DEFAULT_PLAYER, LINK_API, LINK_API_READ_PLAYER_LIST, PATH_MUSIC } from './lib/constants';
import { PATH_IMG, ALT_IMG_BEE_SPRITE, ID_IMG_BEE, PATH_IMG_BEE_SPRITE, } from './lib/img';
import { closeFullscreen, createPlayerJson, deletePlayerStorage, isMobile, openFullscreen, readPlayerJson, readPlayerJsonByTwitter, readPlayerJsonByWallet, readPLayerJsonList, readPLayerJsonListCount, readPlayerStorage, updatePlayerJson, updatePlayerStorage } from './lib/functions';
import { Avatar, Badge, Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

import StartGame from './components/StartGame';
import SavePlayer from './components/SavePlayer';
import ErrorGame from './components/ErrorGame';
import RestartGame from './components/RestartGame';
//import { ACTION_ADD_USER, ACTION_GET_USER_BY_WALLET, ACTION_GET_USER_LIST, ACTION_GET_USER_LIST_COUNT, METHOD_GET, METHOD_POST } from '../../../lib/constants';

import { getAuth, onAuthStateChanged, signOut, signInWithPopup, TwitterAuthProvider, unlink, linkWithRedirect, reauthenticateWithRedirect, linkWithPopup, reauthenticateWithPopup, getRedirectResult, signInWithRedirect } from "firebase/auth";
import axios from 'axios';


const WinnoAndBees = ({ database, app }) => {
    const theme = useTheme();
    const noProfilePic = theme.palette.mode === 'light' ? `${PATH_IMG}no-profile-black.png` : `${PATH_IMG}no-profile-white.png`;

    const provider = new TwitterAuthProvider();
    //console.log('provider', provider)
    const auth = getAuth();
    const userTwitter = auth.currentUser;
    //console.log('auth main', auth);
    const refDivDescription = useRef();
    const refDivInfoPlayer = useRef();
    const refDivStartGame = useRef();
    const refCanvas = useRef();
    const refDivSavePlayer = useRef();
    const refDivErrorGame = useRef();
    const refDivRestartGame = useRef();



    //const [userTwitter, setUserTwitter] = useState(auth.currentUser);

    //walletAddress: '', twitterName: '', bestScore: 0, whitelisted: false, airdropped: false, nGame: 0
    const [game, setGame] = useState(null);
    const [player, setPlayer] = useState(DEFAULT_PLAYER);
    const [twitterUid, setTwitterUid] = useState(null);
    const [twitterName, setTwitterName] = useState(null);
    const [twitterPhotoURL, setTwitterPhotoURL] = useState(null);
    const [twitterToken, setTwitterToken] = useState(null);
    const [twitterSecret, setTwitterSecret] = useState(null);

    const [errorWallet, setErrorWallet] = useState({ error: false, message: '' });
    //const [messageWallet, setMessageWallet] = useState('');
    const [errorTwitter, setErrorTwitter] = useState({ error: false, message: '' });
    //const [messageTwitter, setMessageTwitter] = useState('');

    /*
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            //ok();        
            //console.log('state', 'ooooook', user)
            //let _player = {...player, twitterName: user.displayName};
            //setPlayer(_player);
            //setUserTwitter(user);
            //setUid(user.uid);
            //setUserFirestore(user);
        } else {
            //console.log('state', 'meeerde')
            //setUid(null);
            //setUserFirestore(null);
        }
        //console.log({USEEEEEEER: user ? user.providerData[0].displayName : 'not connected'})

    });
    */
    function initComponentState() {
        refDivDescription.current.style.display = 'flex';
        refDivInfoPlayer.current.style.display = 'none';
        refDivStartGame.current.style.display = 'flex';
        refCanvas.current.style.display = 'none';
        refDivSavePlayer.current.style.display = 'flex';
        refDivErrorGame.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'none';
    }

    useEffect(() => {
        initComponentState();
        //const auth = getAuth();
    }, []);

    useEffect(() => {
        if (twitterUid) {
            let _player = JSON.parse(JSON.stringify(player));
            _player.twitter.uid = twitterUid;
            //console.log('create player', _player);
            setPlayer(_player);
        }
    }, [twitterUid]);

    useEffect(() => {
        if (twitterPhotoURL) {
            let _player = JSON.parse(JSON.stringify(player));
            //console.log('create player', _player);
            _player.twitter.photoURL = twitterPhotoURL;
            setPlayer(_player);
        }
    }, [twitterPhotoURL]);

    useEffect(() => {
        if (twitterToken) {
            let _player = JSON.parse(JSON.stringify(player));
            console.log('create player token', _player);
            _player.twitter.token = twitterToken;
            //updatePlayerStorage(_player);
            setPlayer(_player);
        }
    }, [twitterToken]);

    useEffect(() => {
        if (twitterSecret) {
            let _player = JSON.parse(JSON.stringify(player));
            console.log('create player secret', _player);
            _player.twitter.secret = twitterSecret;
            //updatePlayerStorage(_player);
            setPlayer(_player);
        }
    }, [twitterSecret]);

    useEffect(async () => {
        if (twitterName) {
            let _player = JSON.parse(JSON.stringify(player));
            _player.twitter.displayName = twitterName;
            updatePlayerStorage(_player);
            /*_player.twitter.token = twitterToken;
            _player.twitter.secret = twitterSecret;
            
            setPlayer(_player);
            console.log('create player twittername', _player);
            */
           
            let playerStorage = readPlayerStorage();


            if (playerStorage) {
                //deletePlayerStorage();
                //updatePlayerStorage(playerJson);
                setPlayer(playerStorage);
            } else {
                //updatePlayerStorage(_player);
                //setPlayer(_player);
                //playerStorage = readPlayerStorage();
                //console.log('exist PLAYER', _player);
            }
            

            console.log('exist storage', playerStorage);
            console.log('exist _player', _player);

            let playerJson = await readPlayerJsonByTwitter(_player);
            console.log('exist JSON', playerJson);
            if (!playerJson) {
                let playerWithoutSecret = JSON.parse(JSON.stringify(_player));
                delete playerWithoutSecret.twitter['token'];
                delete playerWithoutSecret.twitter['secret'];
                //playerJson = await createPlayerJson(playerWithoutSecret);
                //playerJson = playerWithoutSecret;
                //playerJson.player = playerWithoutSecret;
                //console.log('exist json', playerJson);
                console.log('dont exist JSON', playerJson);
            }
        }
        //playerJson = await createPlayerJson(playerWithoutSecret);
        //playerJson = playerWithoutSecret;
        //playerJson.player = playerWithoutSecret;
        //console.log('exist json', playerJson);
        //console.log('list JSON', await readPLayerJsonList());
        //console.log('list JSON count', await readPLayerJsonListCount());
    }, [twitterName]);

    const createPlayerInfo = async (_player) => {
        let playerWithoutSecret = JSON.parse(JSON.stringify(_player));
        delete playerWithoutSecret.twitter['token'];
        delete playerWithoutSecret.twitter['secret'];
        const playerJson = await createPlayerJson(playerWithoutSecret);
        updatePlayerStorage(_player);
        //console.log('create PLAYER', _player);
        return playerJson;
    }

    async function updatePlayerInfo(_player) {
        let playerWithoutSecret = JSON.parse(JSON.stringify(_player));
        delete playerWithoutSecret.token;
        delete playerWithoutSecret.secret;
        await updatePlayerJson(playerWithoutSecret);
        updatePlayerStorage(_player);
        return _player;
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('exist onAuthStateChanged', user.uid);
            //let _player = JSON.parse(JSON.stringify(player));
            //let _player = { ...player,  };
            //_player.twitterName = user.displayName;
            //if( _player.twitterName);
            let playerStorage = readPlayerStorage();
            //let _player = 
            setTwitterUid(user.uid);
            setTwitterName(user.displayName);
            setTwitterPhotoURL(user.photoURL);

            if (playerStorage) {
                setTwitterToken(playerStorage.twitter.token);
                setTwitterSecret(playerStorage.twitter.secret);
                //setPlayer(playerStorage);
            }

            // User is signed in.
            /*
            let _player = { ...player, twitterName: user.displayName };
            let playerJson = readPlayerJsonByTwitter(_player);
            
            if (playerJson) {
                setPlayer(playerJson);
            }
            */

        } else {
            console.log('user twitter', 'not connected')
            setTwitterUid('');
            setTwitterPhotoURL('');
            setTwitterName('');
            setTwitterToken('');
            setTwitterSecret('');
        }
    });

    const signInTwitter = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                const credential = TwitterAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const secret = credential.secret;
                const user = result.user;
                const uid = user.uid;
                const displayName = user.displayName;
                const photoURL = user.photoURL;
                //const _player = {}
                let _player = JSON.parse(JSON.stringify(player));
                _player.twitter.uid = uid;
                _player.twitter.displayName = displayName;
                _player.twitter.photoURL = photoURL;
                _player.twitter.token = token;
                _player.twitter.secret = secret;
                setPlayer(_player);
                //setTwitterUid(uid);
                //setTwitterPhotoURL(photoURL);
                //setTwitterToken(token);
                //setTwitterSecret(secret);
                updatePlayerStorage(_player);
                //setTwitterName(twitterName);

                {
                    /*
          <a href="https://twitter.com/intent/tweet?in_reply_to=463440424141459456">Reply</a>
          <a href="https://twitter.com/intent/retweet?tweet_id=463440424141459456">Retweet</a>
          <a href="https://twitter.com/intent/like?tweet_id=463440424141459456">Like</a>
                    */
                }

                //setDisplayNameTwitter(user.providerData[0].displayName);


                //console.log({RESULT_FETCH: follower})
                //setUserApp(new User(user.uid));
                console.log('connected', user);
                // ...
            }).catch((error) => {
                // Handle Errors here.

                //setIsFollowerTwitter(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                //const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = TwitterAuthProvider.credentialFromError(error);
                console.log('error', errorCode, errorMessage)
                // ...
            });
    }

    const signOutTwitter = () => {
        signOut(auth).then(() => {
            console.log('state', 'ooooooooook disconnected')
            // Sign-out successful.
            // setUser(null);
            //setUserFirestore(null);
            //setUid(null);
            //setUserTwitter(null);
            //setConnected(false);
            setPlayer(DEFAULT_PLAYER);
        }).catch((error) => {
            // An error happened.
            console.log('state', 'error', error)
        });
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


    function updateComponentState(game) {
        if (game && game.started) {
            if (game.stopped) {
                refCanvas.current.style.display = 'none';
                refDivErrorGame.current.style.display = 'flex';
                game.musicSound.stop();
            }

            if (game.finished) {
                if (game.winner) {
                    refDivSavePlayer.current.style.display = 'flex';
                }

                refDivRestartGame.current.style.display = 'flex';
            }
        } else {

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
        if (isMobile()) {
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

        function animate() {
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

            if (game.stopped) {
                refCanvas.current.style.display = 'none';
                refDivErrorGame.current.style.display = 'flex';
                game.musicSound.stop();
            }

            if (game.finished) {
                if (isMobile()) {
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
                if (game.score > player.bestScore) {
                    setPlayer({ ...player, bestScore: game.score, });
                }
                if (game.winnerWhitelist) {
                    setPlayer({ ...player, whitelisted: true, });
                    //refDivSavePlayer.current.style.display = 'flex';
                }

                if (game.winnerAirdrop) {
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
            if (refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange) {
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

        refCanvas.current.addEventListener("webkitfullscreenchange", function () {
            if (refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange) {
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

        refCanvas.current.addEventListener("msfullscreenchange", function () {
            if (refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange) {
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

        refCanvas.current.addEventListener("mozfullscreenchange", function () {
            if (refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen || refCanvas.current.mozfullscreenchange) {
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



        screen.orientation.addEventListener('change', function () {
            console.log('Current orientation is ' + screen.orientation.type);
            //document.getElementById('score').innerHTML = 'Score : ' + screen.orientation.type;

            if (screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary') {
                if (!game.finished) {
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

                    <div ref={refDivSavePlayer} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <SavePlayer player={player} handlePlayer={handlePlayer} errorWallet={errorWallet} errorTwitter={errorTwitter} handleErrorWallet={handleErrorWallet} handleErrorTwitter={handleErrorTwitter} />
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

                            //let playerJson = await updatePlayerJson(pl);
                            //let playerJson = await readPlayerJson(pl);
                            //let playerJson = await readPlayerJsonByWallet(pl);
                            //let playerJson = await readPlayerJsonByTwitter(pl);
                            //const playerList = await readPLayerJsonList();
                            //const playerListCount = await readPLayerJsonListCount();

                            let _player = JSON.parse(JSON.stringify(player));
                            _player.walletAddress = '0x1989';
                            _player.bestScore = Game.SCORE_TO_AIRDROP * 2;
                            _player.nGames = 21;
                            _player.nWins = 7;
                            _player.nLooses = 14;

                            let pl = {
                                ...player,

                                walletAddress: '0x1989',
                                /*twitter: {
                                    displayName: 'Fullines',
                                    photoURL: 'https://winno.bearzclu.io',
                                },
                                twitterName: 'fullines',
                                */
                                bestScore: Game.SCORE_TO_AIRDROP * 2,
                                nGames: 21,
                                nWins: 7,
                                nLooses: 14,
                            }
                            //delete pl.nLooses;
                            //delete pl.nLooses;
                            //let playerJson = await createPlayerJson(pl);
                            let playerJson = await createPlayerInfo(_player);
                            console.log('Player METHOD OKay', playerJson,)
                            //signOutTwitter();
                        }} />
                    </div>

                    <div className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <Button
                            startIcon={<TwitterIcon />}
                            variant="outlined"
                            color="bluetwitter"
                            sx={{ borderRadius: "2vw", margin: '0.3vw', fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif',  }}
                            onClick={async () => {
                                //console.log('CCCLIIICK')
                                //isMobile();
                                //setGame(null);
                                //let _player = { ...player, whitelisted: false, airdropped: true };
                                //setPlayer(_player);
                                //updatePlayerStorage(_player);
                                //startGame();
                                //let pl = { ...player, walletAddress: '0x2024', twitterName: 'fulline', bestScore: Game.SCORE_TO_AIRDROP * 2, nGame: 21 }
                                //await createPlayerJson(pl);
                                //await updatePlayerJson(pl);
                                //let playerJson = await readPlayerJson(pl);
                                //let playerJson = await readPlayerJsonByWallet(pl);
                                //let playerJson = await readPlayerJsonByTwitter(pl);
                                const playerList = await readPLayerJsonList();
                                const playerListCount = await readPLayerJsonListCount();
                                //console.log('Player list OKay', playerList, playerListCount)
                                signInTwitter();
                            }}>Sign IN</Button>
                    </div>

                    <div className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <Button
                            color="bluetwitter"
                            sx={{ fontWeight: 'bold' }}
                            onClick={async () => {
                                //console.log('CCCLIIICK')
                                //isMobile();
                                //setGame(null);
                                //let _player = { ...player, whitelisted: false, airdropped: true };
                                //setPlayer(_player);
                                //updatePlayerStorage(_player);
                                //startGame();
                                //let pl = { ...player, walletAddress: '0x2024', twitterName: 'fulline', bestScore: Game.SCORE_TO_AIRDROP * 2, nGame: 21 }
                                //await createPlayerJson(pl);
                                //await updatePlayerJson(pl);
                                //let playerJson = await readPlayerJson(pl);
                                //let playerJson = await readPlayerJsonByWallet(pl);
                                //let playerJson = await readPlayerJsonByTwitter(pl);
                                const playerList = await readPLayerJsonList();
                                const playerListCount = await readPLayerJsonListCount();
                                //console.log('Player list OKay', playerList, playerListCount)
                                //signInTwitter();
                                //signOutTwitter();
                                
                                const isFollower = await axios.get(`/api/extras/winnoandbees/gettwitterinfo?player=${JSON.stringify(player)}&uid=${player.twitter.uid}`).then(response => {
                                    console.log('response', response.data);
                                    return response.data;
                                }).catch( error => {
                                    console.log('error', error.message)
                                    return null;
                                });

                                let _player = JSON.parse(JSON.stringify(player));
                                _player.twitter.isFollower = true;
                                setPlayer(_player);
                                console.log('IS FOLLOWER', isFollower, _player,);
                                
                            }}>Sign OUT</Button>
                    </div>

                    <div className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <TwitterFollowButton screenName={'WinnoBearz'} options={{ size: 'large', showCount: false, }} />
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