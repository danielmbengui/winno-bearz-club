import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import styleWinnoAndBees from "../WinnoAndBees.module.css";

const RestartButton = styled(Button)(({ }) => ({
    //color: theme.palette.getContrastText(purple[500]),
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'large',
    backgroundColor: 'var(--blue-winno)',
    '&:hover': {
        backgroundColor: 'var(--blue-dark-winno)',
    },
}));

const RestartGame = ({ game, restartGame }) => {

    //walletAddress: '', twitterName: '', bestScore: 0, whitelisted: false, airdropped: false, nGame: 0
    return (
        <RestartButton
            //ref={refButtonStart}
            //sx={{size:{xs:'small', md:'medium'}}}
            size='small'
            //disabled={isUserSessionStorage}
            //disabled={true}
            //className={`${styleWinnoAndBees['button-action']}`}
            variant='contained'
            onClick={async () => {
                restartGame();
                console.log('restarted')
                //setGame(null);
                //initComponentState();
            }}>Restart Game</RestartButton>
    )
}

export default RestartGame;