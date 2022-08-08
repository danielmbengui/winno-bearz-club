import React from 'react';
import styleWinnoAndBees from "../WinnoAndBees.module.css";

import { Button  } from '@mui/material';
import Stack from '@mui/material/Stack';

import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

const TEXT_START_GAME = "Start a game";

const StepStartGame = ({handleBack, canEdit}) => {
    return(
        <>
            <StepLabel>
                <label >{TEXT_START_GAME}</label>
            </StepLabel>
            <StepContent sx={{padding:2}}>
            <Stack
                direction='column'
                spacing={1}
                justifyContent="center"
                alignItems="stretch"
                //marginBottom={3}
            >
                    <Button 
                        disabled={!canEdit}
                        className={`${styleWinnoAndBees['button-action']}`}
                        variant='contained'
                        color='primary'
                        //variant='outlined'
                        onClick={ () => {
                            handleBack();
                        }}
                    >Edit data</Button>
                    <Button 
                        //disabled={true}
                        className={`${styleWinnoAndBees['button-action']}`}
                        variant='contained'
                        color='primary'
                        //variant='outlined'
                    >Start game</Button>
                    </Stack>
            </StepContent>
        </>
    )
}

export default StepStartGame;