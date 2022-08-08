import React, {useEffect, useRef, useState} from 'react';
import styleEscape from "./Escape.module.css";
import { useTheme, styled } from '@mui/material/styles';
import * as fs from 'fs';

import { Button } from '@mui/material';
import Image from 'next/image';
import useImage from 'use-image';
//const playerLeft = new Image();

import TextField from '@mui/material/TextField';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TwitterIcon from '@mui/icons-material/Twitter';
import InputAdornment from '@mui/material/InputAdornment';

import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

import Player from './classes/PlayerClass';
import Enemy from './classes/EnemyClass';
import Bee from './classes/BeeClass';
import Salmon from './classes/SalmonClass';
import Game from './classes/GameClass';


import EscapeGame from './classes/EscapeGameClass';
import Winno from './classes/WinnoClass';
import BelzeBearz from './classes/BelzeBearzClass';

import { useDispatch, useSelector } from "react-redux";
//import { updateBlockchain, connect, connectAccount } from "../../redux/blockchain/blockchainActions";
import { fetchContract  } from "../../../redux/contract/contractActions";
import { fetchData } from "../../../redux/data/dataActions";
import {InstallMetamaskButton, ConnectToWebsiteButton, SwitchNetworkButton, MintButton} from "../../Buttons/Buttons";

import { METHOD_GET, METHOD_POST, DIGIT_WALLET_ADDRESS, LENGTH_WALLET_ADDRESS, ACTION_ADD_USER, ACTION_SET_USER, 
    ACTION_GET_USER, ACTION_GET_USER_BY_WALLET, ACTION_GET_USER_BY_TWITTER, GET_LOCAL_SESSION_USER } from '../../../lib/constants';

//const fs = require('fs');


const Escape = ({database, contractInfo}) => {
    const theme = useTheme();
    const refCanvas = useRef();
    const refDiv = useRef();
    const refButtonStart = useRef();
    const refSound = useRef();

    const assetPath = "/assets/games/escape/";
    const musicPath = assetPath + "music/";

//  const dispatch = useDispatch();
 // const smartContract = useSelector((state) => state.smartContract);
  const user = useSelector((state) => state.user);
  
  const web3 = user.web3;
  const [game, setGame] = useState(null);
  const [player, setPlayer] = useState({walletAddress:'', twitterName: '', maxScore:0, airdropped:false});
  const [isUserSessionStorage, setIsUserSessionStorage] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [errorWallet, setErrorWallet] = useState(false);
  const [messageWallet, setMessageWallet] = useState('');
  const [twitterName, setTwitterName] = useState('');
  const [errorTwitter, setErrorTwitter] = useState(false);
  const [messageTwitter, setMessageTwitter] = useState('')
  const [score, setScore] = useState(0);

  const onChangeWalletAddress = (e) => {
    let _player = {...player, walletAddress:e.target.value, };
    setPlayer(_player);
    console.log('player', _player);
    setWalletAddress(e.target.value);
    console.log('wallet address', e.target.value);
  }

  const onChangeTwitterName = (e) => {
    let _player = {...player, twitterName:e.target.value, };
    setPlayer(_player);
    console.log('player', _player);
    setTwitterName(e.target.value);
    console.log('twitter name', twitterName);
  }
/*
  const isUserSessionStorage = () => {
    if( window.sessionStorage.getItem(GET_LOCAL_SESSION_USER) ){
        return true;
    }
    return false;
  }
  */

  const getUserSessionStorage = () => {
    if( window.sessionStorage.getItem(GET_LOCAL_SESSION_USER) ){
        const userStorage = JSON.parse(window.sessionStorage.getItem(GET_LOCAL_SESSION_USER));
        return userStorage;
    }
    return null;
  }

  const setUserSessionStorage = () => {
    window.sessionStorage.setItem(GET_LOCAL_SESSION_USER, JSON.stringify(player));
    return true;
  }

  

  //const dispatch = useDispatch();
  //const now = Date.now();
  const [mintAmount, setMintAmount] = useState(1);
  const [totalCost, setTotalCost] = useState(contractInfo.displayCost);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(<div></div>);
  const [buttonError, setButtonError] = useState(<div></div>);

    const [canvas, setCanvas] = useState();
    const [canvasPosition, setCanvasPosition] = useState();
    const [ctx, setCtx] = useState();
    const [mouse, setMouse] = useState();
    
    const [gameFrame, setGameFrame] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect( () => {
        let userStorage = getUserSessionStorage();
        if( userStorage ){
            setIsUserSessionStorage(true);
            setPlayer(userStorage);
        }else{
            setIsUserSessionStorage(false);
        }
        
        //let _player = {walletAddress:'', twitterName: '', maxScore:0, airdropped:false};
        
        console.log('player', userStorage);

        /*
        if( window.sessionStorage.getItem(GET_LOCAL_SESSION_USER) ){
            //window.sessionStorage.setItem(STORAGE_ADVERTISE_SESSION, _showAdvertiseSession);
            const userStorage = JSON.parse(window.sessionStorage.getItem(GET_LOCAL_SESSION_USER));
            setPlayer(userStorage);
            //setWalletAddress(user.walletAddress);
            //console.log('storage', JSON.stringify(userStorage))
            console.log('storage', userStorage)
            
        }else{
            console.log('no object')
        }
        */
        
        
    }, [game])

    useEffect(() => {
        /*
        if( user.isMetaMaskInstalled === null ){
          setFeedback(<div></div>);
        }else if( !user.isMetaMaskInstalled ){
          setButtonError(<InstallMetamaskButton />);
          setFeedback("Please Install Metamask before.");
          setFeedback(<Alert severity="error">
                      <AlertTitle>Provider not found</AlertTitle>
                      Metamask is not available — <strong>click on Install Metamask !</strong>
                    </Alert>);
        }else if( !user.isConnected ){
          setButtonError(<ConnectToWebsiteButton  />);
          setFeedback("Click connect to mint your NFT.");
          setFeedback(<Alert severity="warning">
          <AlertTitle>You are not connected</AlertTitle>
          You must be connected to mint — <strong>click on Connect !</strong>
        </Alert>);
        }else if( user.networkId !== smartContract.network.networkId ){
          setButtonError(<SwitchNetworkButton />);
          setFeedback("Switch to the " + smartContract.network.name + " Network.");
          setFeedback(<Alert severity="info">
          <AlertTitle>You are on the <strong>wrong network</strong> !</AlertTitle>
          You must be connected to {smartContract.network.name} Network — <strong>click on Switch/Add !</strong>
        </Alert>);
        }else{
          setButtonError(<></>);
          setFeedback("Click mint to buy your NFT.");
          setFeedback(<Alert severity="success" style={{border:`1px ${theme.palette.background.border} solid`}}>
          <AlertTitle>You are ready to mint !</AlertTitle>
          <strong>click on Mint !</strong>
        </Alert>);
        }
        */
       console.log('user', user)
      }, [user]);

      useEffect( () => {
        
      })
    
    //console.log('refCanvas BEFORE', refCanvas.current,);

    const isMobile = () => {
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            return true;
        }
        return false;
    }

    const openFullscreen = () => {
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

            canvas.width = EscapeGame.idealWidth;
            canvas.height = EscapeGame.idealHeight;
            //var heightRatio = 3;
            //canvas.height = canvas.width / heightRatio;

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
                canvas.width = EscapeGame.mobileWidth;
                canvas.height = EscapeGame.mobileHeight;
                ratioDevice = 2;
            }
            
            let canvasPosition = canvas.getBoundingClientRect();
            console.log('canvasPoistion', canvasPosition);
            const mouse = {
                x: canvas.width/2,
                y: canvas.height/2,
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
            
            const musicSound = document.getElementById('musicGame');
            const beeTouchSound = document.getElementById('musicTouchBee');
            const winnerSound = document.getElementById('musicWinner');
            const gameOverSound = document.getElementById('musicGameOver');

            const escapeGame = new EscapeGame(window, canvas, ctx, mouse, ratioDevice, nbLife, assetPath, animate);
            setGame(escapeGame);

            const winno = new Winno(escapeGame);
            const belzeBear = new BelzeBearz(escapeGame, winno, gameSpeed);
            const belzeBear1 = new BelzeBearz(escapeGame, winno, gameSpeed + 1,  1);
            const belzeBear2 = new BelzeBearz(escapeGame, winno, gameSpeed + 2, 2);

            //const salmon = new Salmon(escapeGame, winno);           
            const beesArray = [];


            function handleEnemies(){
                //enemy.update();   
                //enemy.draw(); 

                belzeBear.update();
                belzeBear.draw();

                if( escapeGame.score >= EscapeGame.scoreSecondEnemy ){
                    belzeBear1.update();
                    belzeBear1.draw();
                }

                if( escapeGame.score >= EscapeGame.scoreThirdEnemy ){
                    belzeBear2.update();
                    belzeBear2.draw();
                }
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

                                    if( escapeGame.score === EscapeGame.scoreWinner ){
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
            
            
           
            function animate(){
                
                if( musicSound.played ){
                    musicSound.volume = 0.9;
                    musicSound.play();
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                escapeGame.handleBackground();
                escapeGame.gameFrame++;
                //console.log('gameFrame', escapeGame.gameFrame)
                
                escapeGame.handleLife();
                winno.update();
                handleEnemies();
                winno.draw();
                handleBees();
                console.log('nb bees', beesArray.length);

                if( !escapeGame.gameOver && escapeGame.score >= 1 ){
                    //beesArray.push();
                    //salmon.update();
                    //salmon.draw();
                }
                
                //console.log('gameOver', escapeGame.life)
                if( !escapeGame.paused ){
                    requestAnimationFrame(animate);  
                }

                //document.getElementById('score').innerHTML = 'Score : ' + escapeGame.score;
                if(escapeGame.gameOver || escapeGame.winner){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                            escapeGame.handleBackground();
                            
                            //escapeGame.handleGame();
                            belzeBear.draw();
                            belzeBear1.draw();
                            belzeBear2.draw();
                            winno.draw();
                            handleBees();
                            musicSound.pause();
                            refButtonStart.current.style.display = 'block';
                            
                            if( escapeGame.gameOver ){
                                gameOverSound.play();
                            }
        
                            if( escapeGame.winner ){
                                winnerSound.play();
                                refCanvas.current.style.cursor = 'pointer';  
                            }
                            escapeGame.handleLife(); 
                            if( isMobile() ){
                                closeFullscreen();
                                setTimeout(() => {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    //console.log('yaaaaaaaaaaaaaa', window.innerHeight, screen.height, window.innerHeight == screen.height)
                                    canvas.width = screen.width - 10;
                                    canvas.height = screen.height - 10;
                                    escapeGame.handleBackground();
                                    
                                    //escapeGame.handleGame();
                                    belzeBear.draw();
                                    belzeBear1.draw();
                                    belzeBear2.draw();
                                    winno.draw();
                                    handleBees();
                                    musicSound.pause();
                                    refButtonStart.current.style.display = 'block';
                                    
                                    if( escapeGame.gameOver ){
                                        gameOverSound.play();
                                    }
                
                                    if( escapeGame.winner ){
                                        winnerSound.play();
                                        refCanvas.current.style.cursor = 'pointer';
                                    }
                                    escapeGame.handleLife();   
                        
                                }, 500);
                            }    
                } 
            }
            animate();

            window.addEventListener('resize', () => {
                console.log('resize screen');
                canvasPosition = canvas.getBoundingClientRect();
            });
            
            refCanvas.current.addEventListener('fullscreenchange', () => {

                if ( refCanvas.current.exitFullscreen || refCanvas.current.webkitExitFullscreen || refCanvas.current.msExitFullscreen ) {
                    //refCanvas.current.exitFullscreen();
                    escapeGame.stopped = true;
                    escapeGame.paused = true;
                    console.log('EXIT full screen', screen.width, screen.height);
                }else{
                    escapeGame.stopped = false;
                    escapeGame.paused = false;
                    console.log('full screen', screen.width, screen.height);
                    console.log('canvasPoistion FULL SCREEN', canvasPosition);
                }
                

                //escapeGame.paused
                console.log('canvasPoistion FULL SCREEN', canvasPosition);
                
                //canvas.width = screen.width;
                //canvas.height = screen.height;
                canvas.width = EscapeGame.mobileWidth;
                canvas.height = EscapeGame.mobileHeight;
                //ratioDevice = 2;
                canvasPosition = canvas.getBoundingClientRect();
                
            });
        
            refCanvas.current.addEventListener("webkitfullscreenchange", function() {
                //_LOCK_BUTTON.style.display = 'block';
                //_UNLOCK_BUTTON.style.display = 'none';
                console.log('webkit FULL SCREEN', canvasPosition);
                canvas.width = EscapeGame.mobileWidth;
                canvas.height = EscapeGame.mobileHeight;
                //ratioDevice = 2;
                canvasPosition = canvas.getBoundingClientRect();
            });

            
            screen.orientation.addEventListener('change', function() {
                console.log('Current orientation is ' + screen.orientation.type);
                //document.getElementById('score').innerHTML = 'Score : ' + screen.orientation.type;
                
                if( screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary' ){
                    escapeGame.paused = true;
                    escapeGame.stopped = true;
                }else{
                    escapeGame.paused = false;
                    escapeGame.stopped = false;
                    //alert('IS OKAY !');
                    //openFullscreen();
                }
                
            });
            
            window.addEventListener('scroll', () => {
                console.log('scroll screen');
                canvasPosition = canvas.getBoundingClientRect();
            });
        }
    }

    const CssTextField = styled(TextField)({
        '& label': {
          color: theme.palette.text.primary,
        },
        '& label.Mui-focused': {
            color: theme.palette.primary.main,
          },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.text.primary,
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
      });

      const configDir = `${process.cwd()}/redux/config/twitter/followers.json`;
    const buildDir = `${process.cwd()}/redux/lists/airdrop`;
    const metadataDir = `${buildDir}/winnobearznft.json`;

    const isErrorWalletAddress = (walletAddress) => {
        if( !walletAddress.length ){
            setErrorWallet(true);
            setMessageWallet("Wallet address can't be empty !!!");
            return true;
        }
        
        if( walletAddress.search(DIGIT_WALLET_ADDRESS) === -1 ){
            setErrorWallet(true);
            setMessageWallet("Wallet address must start with " + DIGIT_WALLET_ADDRESS + "!!!");
            return true;
        }
        
        if( walletAddress.length !== 42 ){
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
        if( !twitterName.length ){
            setErrorTwitter(true)
            setMessageTwitter("The twitter username can't be empty !!!");
            return true;
        }

        setErrorTwitter(false)
        setMessageTwitter("");
        return false;
    }

    const walletExist = async (walletAddress) => {
        const user = await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER_BY_WALLET}&walletAddress=${walletAddress}`, {
            method: METHOD_GET, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit            
            headers: {
                'Content-Type': 'application/json',
            },  
            }).then( (response) => {   
                //console.log({ok: await response.json()})
                return response;
            }).then( async (data) => {   
                //console.log({ok: await response.json()})
                return await data.json();
            }).catch( (error) => {
                console.log({SOURCE_ID: error})
                return null;
        });
        console.log('result wallet', user ? true : false)
        return user ? true : false;
    }

    const twitterExist = async (twitterName) => {
        const user = await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER_BY_TWITTER}&twitterName=${twitterName}`, {
            method: METHOD_GET, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit            
            headers: {
                'Content-Type': 'application/json',
            },  
            }).then( (response) => {   
                //console.log({ok: await response.json()})
                return response;
            }).then( async (data) => {   
                //console.log({ok: await response.json()})
                return await data.json();
            }).catch( (error) => {
                console.log({SOURCE_ID: error})
                return null;
        });
        console.log('result twitter', user ? true : false)
        return user ? true : false;
    }

      const setUserByWallet = async (data) => { 
        //await fetch(`/api/airdrop/winnobearznft?action=get_list`, {
        //await fetch(`/api/airdrop/winnobearznft?action=get_count`, {
        //await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER}&walletAddress=${data.walletAddress}&twitterName=${data.twitterName}&score=${data.score}`, {
        //await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER_BY_WALLET}&walletAddress=${data.walletAddress}`, {
        //await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER_BY_TWITTER}&twitterName=${data.twitterName}`, {
        await fetch(`/api/airdrop/winnobearznft`, {
            //walletAddress:{walletAddress:data.walletAddress},
            //method: 'GET', // *GET, POST, PUT, DELETE, etc.
            method: METHOD_POST, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            body: JSON.stringify({action:ACTION_SET_USER, walletAddress:data.walletAddress, twitterName:data.twitterName, maxScore: data.score, airdropped: data.airdropped }),
            
            headers: {
            'Content-Type': 'application/json',
            },  
          })
          .then( async (response) => {   
                console.log({ok: await response.json()})
              //return response.json();
          }).catch( (error) => {
            console.log({SOURCE_ID: error})
            return null;
          });
          
        
    };

    const getUser = async (data) => { 
        /*
if( window.sessionStorage.getItem(STORAGE_ADVERTISE_SESSION) === null ){
            window.sessionStorage.setItem(STORAGE_ADVERTISE_SESSION, _showAdvertiseSession);
          }
        */
        //await fetch(`/api/airdrop/winnobearznft?action=get_list`, {
        //await fetch(`/api/airdrop/winnobearznft?action=get_count`, {
        //await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER}&walletAddress=${data.walletAddress}&twitterName=${data.twitterName}&score=${data.score}`, {
        const user = await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER_BY_WALLET}&walletAddress=${data.walletAddress}`, {
        //await fetch(`/api/airdrop/winnobearznft?action=${ACTION_GET_USER_BY_TWITTER}&twitterName=${data.twitterName}`, {
        //await fetch(`/api/airdrop/winnobearznft`, {
            //walletAddress:{walletAddress:data.walletAddress},
            //method: 'GET', // *GET, POST, PUT, DELETE, etc.
            method: METHOD_GET, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            //body: JSON.stringify({action:ACTION_ADD_USER, walletAddress:data.walletAddress, twitterName:data.twitterName, }),
            
            headers: {
            'Content-Type': 'application/json',
            //'walletAddress': data.walletAddress,
            //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },  
          })
          .then( async (response) => {   
                //console.log({ok: await response.json()})
              return response.json();
          }).catch( (error) => {
            console.log({SOURCE_ID: error})
            return null;
          });  
          
          return user;
    };

    const addUser = async (data) => { 
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
        await fetch(`/api/airdrop/winnobearznft`, {
            //walletAddress:{walletAddress:data.walletAddress},
            //method: 'GET', // *GET, POST, PUT, DELETE, etc.
            method: METHOD_POST, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            body: JSON.stringify({action:ACTION_ADD_USER, walletAddress:data.walletAddress, twitterName:data.twitterName, }),
            
            headers: {
            'Content-Type': 'application/json',
            //'walletAddress': data.walletAddress,
            //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },  
          })
          .then( async (response) => {   
                console.log({ok: await response.json()})
              //return response.json();
          }).catch( (error) => {
            console.log({SOURCE_ID: error})
            return null;
          });   
    };

    return(
        

<div className="page-component__bg_image_box">
<div className="page-component__bg_overlay_box"></div>
<div className="page-component__wrapper" style={{
          zIndex: 18,
          paddingTop:'50px',
          paddingBottom:'50px',
          color:theme.palette.text.primary,
          background:theme.palette.background.default,
      }}>
        <div ref={refDiv} className="container">
        
        <div className={`${styleEscape['div-escape']}`}>
            <img id="logo" src={"/assets/img/logo.png"} alt="logo" width={'10%'} />
            <p className={`${styleEscape['story-game']}`}>
                Help Winno to avoid the BelzeBearzs. <br/>
                EAT {EscapeGame.scoreWinner} BEES TO WIN AN AIRDROP !!!
            </p>

            <Stack
        direction={'column' }
        spacing={1}
        justifyContent="center"
  alignItems="center"
  marginBottom={3}
      >
        <TextField
            //color='success'
            onChange={onChangeWalletAddress}
            //disabled={player.maxScore > 0 ? true : false}
            disabled={isUserSessionStorage}

            
            value={player.walletAddress}
            error={errorWallet}
            helperText={messageWallet}
            //margin="normal"
            //className={styleEscape['inputFill']}
        //id="input-with-icon-textfield"
        //label="Wallet"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountBalanceWalletIcon color='primary' />
            </InputAdornment>
          ),
        }}
        placeholder="wallet address (ETH)"
        variant="outlined"
        />

<TextField
            //margin="normal"
            color='blue'
            onChange={onChangeTwitterName}
            //disabled={player ? true : false}
            //disabled={player.maxScore > 0 ? true : false}
            disabled={isUserSessionStorage}
            value={player.twitterName}
            error={errorTwitter}
            helperText={messageTwitter}
            //className={styleEscape['inputFill']}
        //id="input-with-icon-textfield"
        //label="Twitter"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TwitterIcon color='blue' />
            </InputAdornment>
          ),
        }}
        placeholder="twitter username"
        variant="outlined"
      />
      </Stack>

      <Stack
        direction={'column' }
        spacing={2}
        justifyContent="center"
        alignItems="stretch"
        marginBottom={3}
      >
            <Button 
                //ref={refButtonStart}
                //disabled={isUserSessionStorage}
                disabled={true}
                className={`${styleEscape['button-action']}`}
                variant='contained'
                color='primary'
                onClick={ async ()=>{
                    //addUser({walletAddress: walletAddress, twitterName: twitterName});
                    //window.sessionStorage.removeItem(GET_LOCAL_SESSION_USER)
                    let _errorWallet = isErrorWalletAddress(player.walletAddress);
                    let _errorTwitter = isErrorTwitterName(player.twitterName);
                    //let user = await getUser({walletAddress : player ? player.walletAddress : walletAddress});
                    //await setUserByWallet({walletAddress: walletAddress, twitterName: twitterName, score: 37, airdropped: true});
                    if( !_errorWallet && !_errorTwitter ){
                        let isWallet = await walletExist(player.walletAddress);
                        if( !isWallet ){
                            await addUser({walletAddress: player.walletAddress, twitterName: player.twitterName});
                            
                        }
                        setUserSessionStorage();
                        setIsUserSessionStorage(true);
                    }
                    //setUserByWallet({walletAddress: walletAddress, twitterName: twitterName, score: 37, airdropped: true});
                    
            }}>Save data</Button>

            <Button 
                ref={refButtonStart}
                //disabled={!isUserSessionStorage}
                className={`${styleEscape['button-action']}`}
                variant='contained'
                color='blue'
                onClick={()=>{
                    //addUser({walletAddress: walletAddress, twitterName: twitterName});
                    //window.sessionStorage.removeItem(GET_LOCAL_SESSION_USER)
                    //console.log('length wallet', walletAddress.length)
                    
                    initGame(); 
                
                    if( isMobile() ){
                        openFullscreen();
                    }
                //console.log('yaaaaaaaaaaaaaa', window.innerHeight, screen.height, window.innerHeight == screen.height)
            }}>Start a game</Button>
        </Stack>
    <canvas id="oook" ref={refCanvas} className={`${styleEscape['canvas']}`}>
            <img id="imgBackground" src={assetPath + "background-start.png"} alt="background 1" />
            <img id="imgBackground1" src={assetPath + "background-middle1.png"} alt="background 2" />
            <img id="imgBackground2" src={assetPath + "background-middle2.png"} alt="background 3" />
            <img id="imgBackground3" src={assetPath + "background-end.png"} alt="background 4" />

            <img id="imgLife0" src={assetPath + "life0.png"} alt="life 0" />
            <img id="imgLife1" src={assetPath + "life1.png"} alt="life 1" />
            <img id="imgLife2" src={assetPath + "life2.png"} alt="life 2" />
            <img id="imgLife3" src={assetPath + "life3.png"} alt="life 3" />
            <img id="imgScore" src={assetPath + "bee-score.png"} alt="bee score" />

   

            <img id="imgPlayer" src={assetPath + "player-sprite.png"} alt="player sprite" />
            <img id="imgPlayerReverse" src={assetPath + "player-reverse-sprite.png"} alt="player reverse sprite" />

            <img id="imgEnemy" src={assetPath + "enemy-sprite.png"} alt="enemy sprite" />
            <img id="imgEnemy1" src={assetPath + "enemy1-sprite.png"} alt="enemy 1 sprite" />
            <img id="imgEnemy2" src={assetPath + "enemy2-sprite.png"} alt="enemy 2 sprite" />


            <img id="imgBee" src={assetPath + "bee-sprite.png"} alt="bee sprite" />
            <img id="imgSalmon" src={assetPath + "salmon-sprite.png"} alt="salmon sprite" />

            
            <img id="imgWinner" src={assetPath + "winner.png"} alt="winner" />
            <img id="imgGameOver" src={assetPath + "game-over.png"} alt="game over" />

            <audio id="musicGame">
            <source src={musicPath + 'music-game.mp3'} type="audio/mp3" />
            </audio>

            <audio id="musicTouchBee">
            <source src={musicPath + 'music-bee-touch.mp3'} type="audio/mp3" />
            </audio>

            <audio id="musicTouchEnemy">
            <source src={musicPath + 'music-belzebear-touch.mp3'} type="audio/mp3" />
            </audio>

            <audio id="musicWinner">
            <source src={musicPath + 'music-winner.mp3'} type="audio/mp3" />
            </audio>

            <audio id="musicGameOver">
            <source src={musicPath + 'music-game-over.mp3'} type="audio/mp3" />
            </audio>
    </canvas>

        </div>

        <div className="title-box title-box--center">
        <span id="score" style={{display:'none'}}>Score : </span>
          {/* <h2 className="heading ">GALLERY</h2> */}
          
        
        </div>
      </div>
</div>
</div>
    )
}

export default Escape;