import React, { useEffect, useRef, useState } from 'react';
import { Alert, Avatar, Badge, Box, Grid, InputAdornment, MobileStepper, Paper, Step, StepContent, StepIcon, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTheme } from '@mui/material/styles';
import styleDesktopTwitterStepper from "./DesktopTwitterStepper.module.css";
import { Check } from '@mui/icons-material';
import { TwitterFollowButton } from 'react-twitter-embed';
import CancelIcon from '@mui/icons-material/Cancel';
import CachedIcon from '@mui/icons-material/Cached';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


import InputBase from '@mui/material/InputBase';
import StepLoginTwitter from './Components/StepLoginTwitter';
import StepFollowTwitter from './Components/StepFollowTwitter';
import StepPutWallet from './Components/StepPutWallet';
import StepCongratulations from './Components/StepCongratulations';



const styleStepIcon = {
    '& .MuiStepLabel-root .Mui-completed': {
        fill: 'var(--secondary)', // circle's number (ACTIVE)
        fontSize: 'x-large'
    },
    '& .MuiStepLabel-root .Mui-active': {
        fill: 'var(--primary)', // circle's number (ACTIVE)
        fontSize: 'x-large'
    },
    '& .MuiStepLabel-root .MuiStepIcon-text': {
        fill: 'black', // circle's number
        fontWeight: 'bold',
        fontFamily: `'VT323', monospace`,
        fontSize: 'large'
    },
};


const DesktopTwitterStepper = ({ player, activeStep, handlePlayer, saveNewPlayer, handleBack, handleNext, handleStep, user, signInTwitter, signOutTwitter, getIsFollower, processingFollower, confirmingSave, handleConfirmingSave, errorWallet, handleErrorWallet}) => {
    const theme = useTheme();
    const steps = [
        {
            key: 'login-twitter',
            label: "Login with twitter",
            content:
                <StepLoginTwitter
                    player={player}
                    handlePlayer={handlePlayer}
                    user={user}
                    signInTwitter={signInTwitter}
                    signOutTwitter={signOutTwitter}
                    handleNext={handleNext}
                />,
        },

        {
            key: 'follow-twitter',
            label: "Follow us",
            content:
                <StepFollowTwitter
                    player={player}
                    handlePlayer={handlePlayer}
                    getIsFollower={getIsFollower}
                processingFollower={processingFollower}
                handleNext={handleNext}
                handleBack={handleBack}
                />,
        },

        {
            key: 'put-wallet',
            label: "Put your wallet",
            content:
                <StepPutWallet
                player={player}
                handlePlayer={handlePlayer}
                saveNewPlayer={saveNewPlayer}
                confirmingSave={confirmingSave}
                handleConfirmingSave={handleConfirmingSave}
                errorWallet={errorWallet}
                handleErrorWallet={handleErrorWallet}
                getIsFollower={getIsFollower}
                processingFollower={processingFollower}
                handleBack={handleBack}
                handleStep={handleStep}
                />,
        },

        {
            key: 'step-congratulations',
            label: "Congratulations",
            content:
                <StepCongratulations
                player={player}
                />,
        }
    ];

    const maxSteps = steps.length;

    return (
        <Box
            sx={{
                padding: 3,
                width: { sm: 550 }, maxWidth: { xs: 400, sm: 700 },
                border: `3px solid ${'var(--primary)'}`,
                display: { xs: 'none', md: 'block' },
                marginTop: '1vw',
            }}
        >
            <Stepper activeStep={activeStep} orientation="vertical">
                {
                    steps.map((step, index) => {
                        return (
                            <Step key={step.key + index} sx={styleStepIcon}>
                                <StepLabel >
                                    <span className={`${styleDesktopTwitterStepper['step-label']}`}>
                                        {step.label}
                                    </span>
                                </StepLabel>
                                <StepContent color='brownbear' p={2} >
                                    {step.content}
                                </StepContent>
                            </Step>
                        );
                    })
                }

            </Stepper>
        </Box>
    )
}

export default DesktopTwitterStepper;