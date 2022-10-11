import React from 'react';
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const StartGameButton = styled(Button)(({}) => ({
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'large',
    backgroundColor: 'var(--primary)',
    
    '&:hover': {
        backgroundColor: 'var(--primary-dark)',
    },
}));

const StartGame = ({ startGame }) => {
    return (
        <StartGameButton
            variant='contained'
            onClick={startGame}
        >
            Start
        </StartGameButton>
    )
}

export default StartGame;