import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, MobileStepper, Paper, Typography } from "@mui/material";
import StepLoginTwitter from "./Components/StepLoginTwitter";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import StepFollowTwitter from './Components/StepFollowTwitter';
import StepPutWallet from './Components/StepPutWallet';
import StepCongratulations from './Components/StepCongratulations';
import { isErrorWalletAddress } from '../../../LIB/functions';

const MobileTwitterStepper = ({ player, activeStep, handlePlayer, saveNewPlayer, handleBack, handleNext, handleStep, user, signInTwitter, signOutTwitter, getIsFollower, processingFollower, confirmingSave, handleConfirmingSave, errorWallet, handleErrorWallet }) => {
    //const activeStep = activeStep;
    const theme = useTheme();

    const steps = [
        {
            label: 'Login with twitter',
            caption: 'Twitter',
            actionNext: handleNext,
            textNext: 'Continue',
            visibilityBack: 'hidden',
            visibilityNext: 'visible',
            displayBack: 'none',
            disabledNext: !user,
            description: <StepLoginTwitter
                player={player}
                handlePlayer={handlePlayer}
                user={user}
                signInTwitter={signInTwitter}
                signOutTwitter={signOutTwitter}
            />,
        },
        {
            label: 'Follow us',
            caption: 'Folllow + mention',
            actionNext: handleNext,
            textNext: 'Continue',
            visibilityBack: 'visible',
            visibilityNext: 'visible',
            displayBack: 'flex',
            disabledNext: !player.twitter.isFollower,
            description: <StepFollowTwitter
                player={player}
                handlePlayer={handlePlayer}
                getIsFollower={getIsFollower}
                processingFollower={processingFollower}
            />,
        },
        {
            label: 'Put your wallet',
            caption: 'Like + Reply + Retweet',
            textNext: 'Save',
            actionNext: async () => {
                let _errorWallet = isErrorWalletAddress(player.walletAddress);
                if (!_errorWallet.error) {
                    const followed = await getIsFollower();
                    if (followed) {
                        handleConfirmingSave(true);
                    } else {
                        let _player = JSON.parse(JSON.stringify(player));
                        _player.twitter.isFollower = false;
                        handleStep(1);
                        handlePlayer(_player);
                    }
                }
                handleErrorWallet(_errorWallet);
            },
            visibilityBack: 'visible',
            visibilityNext: 'visible',
            displayBack: 'flex',
            disabledNext: !player.twitter.displayName,
            description: <StepPutWallet
                player={player}
                handlePlayer={handlePlayer}
                saveNewPlayer={saveNewPlayer}
                confirmingSave={confirmingSave}
                handleConfirmingSave={handleConfirmingSave}
                errorWallet={errorWallet}
                handleErrorWallet={handleErrorWallet}
            />,
        },

        {
            label: 'Congratulations',
            caption: 'Just to be sure 🐻',
            textNext: '',
            actionNext: handleNext,
            visibilityBack: 'hidden',
            visibilityNext: 'hidden',
            displayBack: 'none',
            disabledNext: !player.twitter.displayName,
            description: <StepCongratulations player={player} />,
        },


    ];

    const maxSteps = steps.length;

    return (
        <Box
            sx={{
                width: { xs: '100%', sm: 550 }, maxWidth: { xs: 350, sm: 700 },
                flexGrow: 1,
                display: { xs: 'block', md: 'none' },
                marginTop: '1vw'
            }}
        >
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                    border: `1px solid ${theme.palette.background.border}`,
                }}
            >
                <Typography paragraph={true} sx={{ fontSize: 'small', fontWeight: 'bold', marginRight: { xs: '3vw', sm: '0.2vw' }, fontFamily: "'Press Start 2P', sans-serif" }}>
                    {steps[activeStep] ? steps[activeStep].label : null}
                </Typography>
            </Paper>
            <Box
                sx={{
                    width: { xs: '100%', sm: 550 }, maxWidth: { xs: 350, sm: 700 },
                    borderLeft: `1px solid ${theme.palette.background.border}`,
                    borderRight: `1px solid ${theme.palette.background.border}`,
                }}
            >
                {steps[activeStep] ? steps[activeStep].description : null}
            </Box>
            <MobileStepper
                variant="dots" //text, progress, dots
                steps={maxSteps}
                position="static"
                color='bluewinno'
                activeStep={activeStep}
                sx={{
                    border: `1px solid ${theme.palette.background.border}`,
                    color: 'red'
                }}
                nextButton={
                    <Button
                        size="small"
                        color='primary'
                        onClick={
                            steps[activeStep] ? steps[activeStep].actionNext : null
                        }
                        disabled={
                            steps[activeStep] ? steps[activeStep].disabledNext : null
                        }
                        style={{
                            visibility:
                                steps[activeStep] ? steps[activeStep].visibilityNext : 'hidden',
                            fontWeight: 'bold'
                        }}
                    >
                        {steps[activeStep] ? steps[activeStep].textNext : null}
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        color='primary'
                        onClick={handleBack}
                        style={{
                            visibility:
                                steps[activeStep] ? steps[activeStep].visibilityBack : 'hidden',
                            fontWeight: 'bold'
                        }}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

export default MobileTwitterStepper;