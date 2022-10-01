import React, { useEffect, useRef, useState } from 'react';
import styleWinnoAndBees from "./WinnoAndBees.module.css";
import { useTheme } from '@mui/material/styles';
import Description from './components/Description';
import Game from './classes/GameClass';
import InfoPlayer from './components/InfoPlayer';
import { DEFAULT_PLAYER, LINK_API, LINK_API_READ_PLAYER_LIST, PATH_MUSIC } from './lib/constants';
import { PATH_IMG, ALT_IMG_BEE_SPRITE, ID_IMG_BEE, PATH_IMG_BEE_SPRITE, } from './lib/img';
import { closeFullscreen, createPlayerJson, deletePlayerStorage, getPlayerByTwitterJSON, isMobile, openFullscreen, readPlayerJson, readPlayerJsonByTwitter, readPlayerJsonByWallet, readPLayerJsonList, readPLayerJsonListCount, readPlayerStorage, setPlayerJSON, updatePlayerJson, updatePlayerStorage } from './lib/functions';
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


const WinnoAndBees = ({}) => {
    const theme = useTheme();
    const noProfilePic = theme.palette.mode === 'light' ? `${PATH_IMG}no-profile-black.png` : `${PATH_IMG}no-profile-white.png`;
    //console.log('LIIIIIIST', playerList);
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

    const [walletAddress, setWalletAddress] = useState('');


    const [twitterUid, setTwitterUid] = useState('');
    const [twitterName, setTwitterName] = useState('');
    const [twitterPhotoURL, setTwitterPhotoURL] = useState('');
    const [twitterIsFollower, setTwitterIsFollower] = useState(false);
    const [twitterToken, setTwitterToken] = useState('');
    const [twitterSecret, setTwitterSecret] = useState('');

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
        refDivSavePlayer.current.style.display = 'none';
        refDivErrorGame.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'none';
    }

    const openDivPlayer = () => {
        refDivSavePlayer.current.style.display = 'flex';
    }

    const closeDivPlayer = () => {
        refDivSavePlayer.current.style.display = 'none';
        refDivRestartGame.current.style.display = 'flex';
    }

    useEffect(async () => {
        initComponentState();
        //const auth = getAuth();
        const playerStorage = readPlayerStorage();


        if (playerStorage) {
            //deletePlayerStorage();
            //const name = playerStorage.twitter.displayName;
            //const playerJSON = getPlayerByTwitterJSON();
            //deletePlayerStorage();
            let _player = JSON.parse(JSON.stringify(playerStorage));
            const followed = await verifyIsFollower(playerStorage.twitter.uid, playerStorage.twitter.token, playerStorage.twitter.secret);
            _player.twitter.isFollower = followed;
            setPlayer(_player);
            updatePlayerStorage(_player);
        }
        console.log('INIT playerStorage', readPlayerStorage(),);
        /*
                if (playerStorage) {
                    //deletePlayerStorage();
                    if (!playerStorage.twitter.token.length || !playerStorage.twitter.secret.length) {
                        setTwitterUid('');
                        setTwitterPhotoURL('');
                        setTwitterName('');
                        setTwitterIsFollower(false);
                        setTwitterToken('');
                        setTwitterSecret('');
                    } else {
                        setTwitterUid(playerStorage.twitter.uid);
                        setTwitterPhotoURL(playerStorage.twitter.photoURL);
                        setTwitterName(playerStorage.twitter.displayName);
                        setTwitterToken(playerStorage.twitter.token);
                        setTwitterSecret(playerStorage.twitter.token);
                        const followed = await axios.get(`/api/extras/winnoandbees/gettwitterinfo?player=${JSON.stringify(playerStorage)}`).then(response => {
                            //console.log('response isFollower', response.data);
                            return response.data;
                        }).catch(error => {
                            //console.log('error', error.message)
                            return null;
                        });
                        setTwitterIsFollower(followed);
                        console.log('twitter user FOLLOWER', followed);
                    }
                } else {
                    setTwitterUid('');
                    setTwitterPhotoURL('');
                    setTwitterName('');
                    setTwitterIsFollower(false);
                    setTwitterToken('');
                    setTwitterSecret('');
                }
                */
    }, []);

    useEffect(() => {
        let _player = JSON.parse(JSON.stringify(player));
        if (walletAddress) {
            _player.walletAddress = walletAddress;
            console.log('create player uid', _player);
            updatePlayerStorage(_player);
        } else {
            _player.walletAddress = '';
        }
        setPlayer(_player);
    }, [walletAddress]);

    useEffect(() => {
        let _player = JSON.parse(JSON.stringify(player));
        if (twitterUid) {
            _player.twitter.uid = twitterUid;
            console.log('create player uid', _player);
            updatePlayerStorage(_player);
        } else {
            _player.twitter.uid = '';
        }
        setPlayer(_player);
    }, [twitterUid]);

    useEffect(() => {
        let _player = JSON.parse(JSON.stringify(player));
        if (twitterPhotoURL) {
            console.log('create player photo', _player);
            _player.twitter.photoURL = twitterPhotoURL;
            updatePlayerStorage(_player);
        } else {
            _player.twitter.photoURL = '';
        }
        setPlayer(_player);
    }, [twitterPhotoURL]);

    useEffect(() => {
        let _player = JSON.parse(JSON.stringify(player));
        if (twitterToken) {

            console.log('create player token', _player);
            _player.twitter.token = twitterToken;
            //updatePlayerStorage(_player);

            updatePlayerStorage(_player);
        } else {
            _player.twitter.token = '';
        }
        setPlayer(_player);
    }, [twitterToken]);

    useEffect(() => {
        let _player = JSON.parse(JSON.stringify(player));
        if (twitterSecret) {
            //let _player = JSON.parse(JSON.stringify(player));
            console.log('create player secret', _player);
            _player.twitter.secret = twitterSecret;
            //updatePlayerStorage(_player);
            //setPlayer(_player);
            updatePlayerStorage(_player);
        } else {
            _player.twitter.secret = '';
        }
        setPlayer(_player);
    }, [twitterSecret]);

    useEffect(() => {
        let _player = JSON.parse(JSON.stringify(player));
        if (twitterIsFollower) {
            //let _player = JSON.parse(JSON.stringify(player));
            console.log('create player follower', _player);
            _player.twitter.isFollower = twitterIsFollower;
            //updatePlayerStorage(_player);
            //setPlayer(_player);
            updatePlayerStorage(_player);
        } else {
            _player.twitter.isFollower = false;
        }
        setPlayer(_player);
    }, [twitterIsFollower]);

    useEffect(async () => {
        let _player = JSON.parse(JSON.stringify(player));
        if (twitterName) {

            console.log('create player name', _player);
            _player.twitter.displayName = twitterName;
            //setPlayer(_player);
            updatePlayerStorage(_player);
            /*
            const followed = await axios.get(`/api/extras/winnoandbees/gettwitterinfo?player=${JSON.stringify(player)}`).then(response => {
                //console.log('response isFollower', response.data);
                return response.data;
            }).catch(error => {
                //console.log('error', error.message)
                return null;
            });
            _player.twitter.isFollower = followed;
*/
            /*_player.twitter.token = twitterToken;
            _player.twitter.secret = twitterSecret;
            
            setPlayer(_player);
            console.log('create player twittername', _player);
            */

            let playerStorage = readPlayerStorage();



        } else {
            _player.twitter.displayName = '';
        }
        setPlayer(_player);
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
    /*
        useEffect( () => {
            const user = auth.currentUser;
            if( user ){
                console.log('user exists', user);
            }else {
                console.log('user dont exists', user);
            }
        }, [auth])
        */
    onAuthStateChanged(auth, async (user) => {
        let uid = '';
        let name = '';
        let photo = '';
        let isFollower = '';
        let token = '';
        let secret = '';
        if (user) {
            uid = user.uid;
            name = user.displayName;
            photo = user.photoURL;

            //isFollower = playerStorage.twitter.isFollower;
            //token = playerStorage.twitter.token;
            //secret = playerStorage.twitter.secret;
            console.log('exist onAuthStateChanged User twitter', user.uid, player);
            //let _player = JSON.parse(JSON.stringify(player));
            //let _player = { ...player,  };
            //_player.twitterName = user.displayName;
            //if( _player.twitterName);

            const playerStorage = readPlayerStorage();
            console.log('playerstorage onAuthStateChanged', playerStorage);
            if (!playerStorage || !playerStorage.twitter.token || !playerStorage.twitter.secret) {
                console.log('no storage', 'error token', 'error secret');
                console.log('disconnect from twitter');
                //signOutTwitter();
            }/* else {
                console.log('all is okay with storage');
                //uid = playerStorage.twitter.uid;
                //name = playerStorage.twitter.displayName;
                //photo = playerStorage.twitter.photoURL;
                //isFollower = playerStorage.twitter.isFollower;
                //token = playerStorage.twitter.token;
                //secret = playerStorage.twitter.secret;
            }
            */
            
            

        } else {
            console.log('user twitter', 'not connected');
        }
        //setTwitterUid(uid);
        //setTwitterPhotoURL(photo);
        //setTwitterName(name);
        //setTwitterIsFollower(isFollower);
        //setTwitterToken(token);
        //setTwitterSecret(secret);
    });

    const verifyIsFollower = async (uid, token, secret) => {
        return await axios.get(`/api/extras/winnoandbees/twitter/isfollower?uid=${uid}&token=${token}&secret=${secret}`).then(response => {
            //console.log('response isFollower', response.data);
            return response.data;
        }).catch(error => {
            //console.log('error', error.message)
            return null;
        });
        //return followed;
    }


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
                const followed = await verifyIsFollower(uid, token, secret);
                _player.twitter.isFollower = followed;
                //console.log('ID token connexion', followed);
                //setPlayer(_player);
                setTwitterUid(uid);
                setTwitterName(displayName);
                setTwitterPhotoURL(photoURL);
                setTwitterIsFollower(followed);
                setTwitterToken(token);
                setTwitterSecret(secret);

                const playerJSON = await getPlayerByTwitterJSON(displayName);
            
                if (playerJSON) {
                    let _playerJSON_copy = JSON.parse(JSON.stringify(playerJSON));
                    _playerJSON_copy.twitter.displayName = displayName;
                    _playerJSON_copy.twitter.photoURL = photoURL;
                    _playerJSON_copy.twitter.isFollower = followed;
                    //setPlayerJSON(_playerJSON_copy);
                    const result = await updatePlayerJson(_playerJSON_copy);
                    console.log('playerJSON edited', result);
                    setWalletAddress(playerJSON.walletAddress);
                }
                
                console.log('playerJSON ORIGINAL', playerJSON)

                

                //updatePlayerStorage(_player);
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
                //console.log('ID token connexion', token, 'secret', secret);
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
            //setTwitterUid('');
            //setTwitterName('');
            //setTwitterPhotoURL('');
            //setTwitterIsFollower('');
            //setTwitterToken('');
            //setTwitterSecret('');
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

    const startGame = () => {
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

        const game = new Game(canvas, mouse, ratioDevice, animate, player.twitter.displayName ? true : false);
        game.startGame();
        setGame(game);

        async function animate() {
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
                //refDivErrorGame.current.style.display = 'flex';
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
                

                const playerJSON = await getPlayerByTwitterJSON(player.twitter.displayName);
            
                if (playerJSON) {
                    let _playerJSON_copy = JSON.parse(JSON.stringify(playerJSON));
                    if (game.score > _playerJSON_copy.bestScore)
                        _playerJSON_copy.bestScore = game.score;
                    if(game.winnerWhitelist)
                        _playerJSON_copy.whitelisted = true;
                    if(game.winnerAirdrop)
                        _playerJSON_copy.airdropped = true;
                    if(game.winner)
                        _playerJSON_copy.nWins += 1;
                    else
                        _playerJSON_copy.nLooses += 1;
                    _playerJSON_copy.nGames += 1;
                    //_playerJSON_copy.twitter.displayName = _player_copy.twitter.displayName;
                    //_playerJSON_copy.twitter.photoURL = _player_copy.twitter.photoURL;
                    //_playerJSON_copy.twitter.isFollower = _player_copy.twitter.isFollower;
                    //setPlayerJSON(_playerJSON_copy);
                    const result = await updatePlayerJson(_playerJSON_copy);
                    console.log('playerJSON edited', result);
                    let _player_copy = JSON.parse(JSON.stringify(player));
                    _player_copy.bestScore = _playerJSON_copy.bestScore;
                    _player_copy.whitelisted = _playerJSON_copy.whitelisted;
                    _player_copy.airdropped = _playerJSON_copy.airdropped;
                    _player_copy.whitelistSent = _playerJSON_copy.whitelistSent;
                    _player_copy.airdropSent = _playerJSON_copy.airdropSent;
                    _player_copy.nWins = _playerJSON_copy.nWins;
                    _player_copy.nLooses = _playerJSON_copy.nLooses;
                    _player_copy.nGames = _playerJSON_copy.nGames;
                    setPlayer(_player_copy);
                    updatePlayerStorage(_player_copy);
                    //refDivRestartGame.current.style.display = 'flex';
                    //setWalletAddress(playerJSON.walletAddress);
                    //refDivInfoPlayer.current.style.display = 'flex';
                }
                //refDivRestartGame.current.style.display = 'flex';
                    refDivInfoPlayer.current.style.display = 'flex';
                    //openDivPlayer();
                
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
            }
            console.log('canvasPoistion MOZ FULL SCREEN', canvasPosition);
        });


/*
        screen.orientation.addEventListener('change', function () {
            console.log('Current orientation is ' + screen.orientation.type);
            //document.getElementById('score').innerHTML = 'Score : ' + screen.orientation.type;

            if (screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary') {
                if (!game.finished) {
                    game.stopped = true;
                }
            }
            
            canvasPosition = canvas.getBoundingClientRect();
        });
        */

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

                    <div ref={refDivStartGame} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <StartGame onClickEvent={async () => {
                            startGame();
                        }} />
                    </div>

                    <div ref={refDivRestartGame} className={`${styleWinnoAndBees['flex-vertical']}`}>
                        <RestartGame game={game} restartGame={restartGame} />
                    </div>

                    <div ref={refDivInfoPlayer} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <InfoPlayer openDivPlayer={openDivPlayer} player={player} game={game} restartGame={restartGame} />
                    </div>

                    <div ref={refDivSavePlayer} className={`${styleWinnoAndBees['flex-vertical']}`} >
                        <SavePlayer closeDivPlayer={closeDivPlayer} signInTwitter={signInTwitter} signOutTwitter={signOutTwitter} player={player} handlePlayer={handlePlayer} errorWallet={errorWallet} errorTwitter={errorTwitter} handleErrorWallet={handleErrorWallet} handleErrorTwitter={handleErrorTwitter} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WinnoAndBees;