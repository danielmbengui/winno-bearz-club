import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'
//import parse from 'html-react-parser';
import axios from 'axios';
import styleWinnoAndBees from "./WinnoAndBees.module.css";
import { useTheme } from '@mui/material/styles';
import DescriptionGame from './components/DescriptionGame';
import Game from './classes.js/GameClass';
import { Button } from '@mui/material';
import StartGame from './components/StartGame';
import { isMobile } from './constants/functions';



/*
function getPlayerStorage(){
    if( window.sessionStorage.getItem(GET_LOCAL_SESSION_USER) ){
        window.loc
        const userStorage = JSON.parse(window.sessionStorage.getItem(GET_LOCAL_SESSION_USER));
        return userStorage;
    }
    return null;
  }
  

  const setUserSessionStorage = () => {
    window.sessionStorage.setItem(GET_LOCAL_SESSION_USER, JSON.stringify(player));
    return true;
  }
  */

const WinnoAndBees = () => {
    const theme = useTheme();

    const refDivDescription = useRef();
    const refDivPlayer = useRef();
    const refDivGameStopped = useRef();
    const refDivStartGame = useRef();
    const refDivRestartGame = useRef();
    const refCanvas = useRef();
    const refDivSaveGame = useRef();

    const [game, setGame] = useState(null);

    

    const initComponentState = () => {
        refDivDescription.current.style.display = 'flex';
        refDivStartGame.current.style.display = 'flex';
    }

    const updateComponentState = (game) => {
        if( game && game.started ){
            refDivDescription.current.style.display = 'none';
            refDivStartGame.current.style.display = 'none';
        }else{
            refDivDescription.current.style.display = 'flex';
            refDivStartGame.current.style.display = 'flex';
        }       
    }

    const startGame = () => {
        const game = new Game();

        setGame(game);
        game.started = true;
        //updateComponentState(game);

        function animate(){

        }
    }

    useEffect( () => {
        initComponentState();
        startGame();
    }, [])

    return(
        <div className={`page-component__bg_image_box`}>
            <div className="page-component__wrapper" style={{
                zIndex: 18,
                //paddingTop: '50px',
                //paddingBottom: '50px',
                //color: theme.palette.text.primary,
                //background: theme.palette.background.default,
            }}>
                <div className={'container'}>


                <div ref={refDivDescription} className={`${styleWinnoAndBees['flex-vertical']}`} style={{display:game && game.started ? 'none' : 'flex'}} >
                    <DescriptionGame scoreToWhitelist={Game.SCORE_WHITELIST} scoreToAirdrop={Game.SCORE_AIRDROP} />
                </div>

                <div ref={refDivGameStopped} className={`${styleWinnoAndBees['div-error']}`} >
                        {'OOOOOOOK'}
                </div>

                <div ref={refDivStartGame} className={`${styleWinnoAndBees['flex-vertical']}`} >
                    <StartGame onClickEvent={() => {
                        console.log('CCCLIIICK')
                        isMobile();
                        setGame(null);

                    }} />
                </div>


                </div>
            </div>
        </div>
    )
}

export default WinnoAndBees;