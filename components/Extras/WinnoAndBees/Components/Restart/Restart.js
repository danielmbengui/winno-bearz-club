import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const RestartButton = styled(Button)(({ }) => ({
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'large',
    backgroundColor: 'var(--blue-winno)',
    '&:hover': {
        backgroundColor: 'var(--blue-dark-winno)',
    },
}));

const Restart = ({ restartGame }) => {
    return (
        <RestartButton
            size='small'
            variant='contained'
            sx={{
                marginTop: {xs:'3vw', md: '1vw'}
            }}
            onClick={async () => {
                restartGame();
            }}>
            Restart
        </RestartButton>
    )
}

export default Restart;