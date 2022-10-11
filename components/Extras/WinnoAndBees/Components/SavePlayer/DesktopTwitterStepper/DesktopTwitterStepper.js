import React from 'react';
import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import styleDesktopTwitterStepper from "./DesktopTwitterStepper.module.css";
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