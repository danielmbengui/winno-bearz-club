import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import styleWinnoAndBees from "../WinnoAndBees.module.css";

const StartGameButton = styled(Button)(({}) => ({
    //color: theme.palette.getContrastText(purple[500]),
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'x-large',
    backgroundColor: 'var(--blue-winno)',
    
    '&:hover': {
        backgroundColor: 'var(--blue-dark-winno)',
    },
}));

const StartGame = ({ onClickEvent }) => {
    return (
        <StartGameButton
            //className={`${styleWinnoAndBees['button-start-game']}`}
            variant='contained'
            //color='bluetwitter'
            onClick={onClickEvent}
        >
            Start game
        </StartGameButton>
    )
}

export default StartGame;