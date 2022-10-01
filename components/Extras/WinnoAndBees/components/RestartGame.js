import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styleWinnoAndBees from "../WinnoAndBees.module.css";


const RestartGame = ({ game, restartGame }) => {

    //walletAddress: '', twitterName: '', bestScore: 0, whitelisted: false, airdropped: false, nGame: 0
    return (
        <Button
            //ref={refButtonStart}
            //sx={{size:{xs:'small', md:'medium'}}}
            size='small'
            //disabled={isUserSessionStorage}
            //disabled={true}
            className={`${styleWinnoAndBees['button-action']}`}
            variant='contained'
            onClick={async () => {
                restartGame();
                console.log('restarted')
                //setGame(null);
                //initComponentState();
            }}>Restart Game</Button>
    )
}

export default RestartGame;