import React, { useEffect, useRef, useState } from 'react';
import { Alert, Avatar, Badge, Box, Grid, InputAdornment, MobileStepper, Paper, Step, StepContent, StepIcon, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createPlayerJson, deletePlayerStorage, isErrorTwitterName, isErrorWalletAddress, updatePlayerStorage } from "../lib/functions";
import { useTheme } from '@mui/material/styles';
import styleWinnoAndBees from "../WinnoAndBees.module.css";
import { PATH_IMG } from '../lib/img';
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
import Game from '../classes/GameClass';
import CustomizedDialogs from './DialogSavePlayer';

import InputBase from '@mui/material/InputBase';

//player={player} handlePlayer={handlePlayer} error={{ errorWallet: errorWallet, messageWallet: messageWallet }}
const SavePlayer = ({ closeDivPlayer, player, signInTwitter, signOutTwitter, handlePlayer, errorWallet, handleErrorWallet, errorTwitter, handleErrorTwitter }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [processingFollower, setProcessingFollower] = useState(false);
    const [confirmingSave, setConfirmingSave] = useState(false);




    const styleStepIcon = {
        /*
        '& .MuiStepLabel-root .Mui-completed': {
            color: 'var(--secondary)', // circle color (COMPLETED)
        },
        '& .MuiStepLabel-label .Mui-completed .MuiStepLabel':
        {
            color: 'var(--primary)', // Just text label (COMPLETED)
        },
        '& .MuiStepLabel-label .Mui-completed .MuiStepLabel-alternativeLabel':
        {
            color: 'var(--primary)', // Just text label (COMPLETED)
        },
        '& .MuiStepLabel-root .Mui-active': {
            color: 'red', // circle color (ACTIVE)
            //background:'red',
            //fill: 'red',
        },
        '& .MuiStepLabel-root .MuiStepLabel-label .Mui-active .MuiStepLabel-alternativeLabel':
        {
            color: 'blue', // Just text label (ACTIVE)
        },
        */
        '& .MuiStepLabel-root .Mui-completed': {
            fill: 'var(--secondary)', // circle's number (ACTIVE)
            //fontWeight: 'bold',
            fontSize: 'x-large'
        },
        '& .MuiStepLabel-root .Mui-active': {
            fill: 'var(--primary)', // circle's number (ACTIVE)
            //fontWeight: 'bold',
            fontSize: 'x-large'
        },
        '& .MuiStepLabel-root .MuiStepIcon-text': {
            fill: 'black', // circle's number
            fontWeight: 'bold',
            fontFamily: `'VT323', monospace`,
            fontSize: 'large'
        },
        /*
                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: 'black', // circle's number (ACTIVE)
                    fontWeight: 'bold',
                },
                */

    };
    const noProfilePic = theme.palette.mode === 'light' ? `${PATH_IMG}no-profile-black.png` : `${PATH_IMG}no-profile-white.png`;

    useEffect(() => {

        //console.log('player change saveplayer', player.twitter.displayName.length)

        if (player.twitter.displayName) {
            setActiveStep(1);
        }

        if (player.twitter.isFollower) {
            setActiveStep(2);
        }
        //let errorWallet = isErrorWalletAddress(player.walletAddress);
        if (player.walletAddress && !isErrorWalletAddress(player.walletAddress).error) {
            setActiveStep(3);
        }


    }, [player.twitter.displayName, player.twitter.isFollower, player.walletAddress]);


    const handleStep = (stepChoosed) => {
        setActiveStep(stepChoosed);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = () => {
        //setConfirmingSave(true);
        //
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    const HandleBackButton = styled(Button)(({ }) => ({
        //color: theme.palette.getContrastText(purple[500]),
        color: 'var(--primary)',
        fontFamily: "'Press Start 2P', sans serif",
        fontSize: 'x-small',
        backgroundColor: 'transparent',
        '&:hover': {
            color: 'var(--primary-dark)',
        },
    }));
    const HandleNextButton = styled(LoadingButton)(({ }) => ({
        //color: theme.palette.getContrastText(purple[500]),
        color: 'black',
        fontFamily: "'Press Start 2P', sans serif",
        fontSize: 'x-small',
        backgroundColor: 'var(--primary)',
        '&:hover': {
            backgroundColor: 'var(--primary-dark)',
        },
    }));



    const SaveButton = styled(LoadingButton)(({ }) => ({
        //color: theme.palette.getContrastText(purple[500]),
        color: 'black',
        fontFamily: "'Press Start 2P', sans serif",
        fontSize: 'x-small',
        backgroundColor: 'var(--primary)',

        '&:hover': {
            backgroundColor: 'var(--yellow-dark-winno)',
        },
    }));

    const VerifyButton = styled(LoadingButton)(({ }) => ({
        //color: theme.palette.getContrastText(purple[500]),
        color: 'black',
        fontFamily: "'Press Start 2P', sans serif",
        fontSize: 'x-small',
        backgroundColor: 'var(--primary)',

        '&:hover': {
            backgroundColor: 'var(--yellow-dark-winno)',
        },
    }));

    const setIsFollower = async () => {
        //setProcessingFollower(true);
        //const _player = await setIsFollower();
        setProcessingFollower(true);
        let _player = JSON.parse(JSON.stringify(player));
        const followed = await axios.get(`/api/extras/winnoandbees/gettwitterinfo?player=${JSON.stringify(player)}`).then(response => {
            //console.log('response isFollower', response.data);
            return response.data;
        }).catch(error => {
            //console.log('error', error.message)
            return null;
        });
        _player.twitter.isFollower = followed;
        updatePlayerStorage(_player);
        handlePlayer(_player);
        setProcessingFollower(false);
        return followed;
        //return _player;
    }

    const saveNewPlayer = async (player) => {
        let errorWallet = isErrorWalletAddress(player.walletAddress);
        //console.log('ERROR', errorWallet)
        //let _errorWallet = errorWallet.error;
        //const errorTwitter = isErrorTwitterName(player.twitter.displayName);
        //console.log('ERROR', errorTwitter)
        //let user = await getUser({walletAddress : player ? player.walletAddress : walletAddress});
        //await setUserByWallet({walletAddress: walletAddress, twitterName: twitterName, score: 37, airdropped: true});


        if (!errorWallet.error) {
            const followed = await setIsFollower();
            //handlePlayer(_player);
            if (followed) {
                //handleNext();
                updatePlayerStorage(player);
                let playerWithoutSecret = JSON.parse(JSON.stringify(player));
                delete playerWithoutSecret.twitter['token'];
                delete playerWithoutSecret.twitter['secret'];
                const playerJson = await createPlayerJson(playerWithoutSecret);
                if (playerJson.created) {
                    handleNext();
                } else {
                    errorWallet.error = true;
                    errorWallet.message = 'address already used with other twitter account!';
                }
            } else {
                let _player = JSON.parse(JSON.stringify(player));
                _player.twitter.isFollower = false;
                handlePlayer(_player);
                handleBack();
            }
            //setConfirmingSave(false);
        }
        handleErrorWallet(errorWallet);
        //handleErrorTwitter(errorTwitter);
    }

    const StepLoginTwitter = () => {
        return (
            <>
                <Grid container>
                    <Grid item xs={12} sm={12} p={2}>
                        <Stack
                            direction={'column'}
                            //spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        //sx={{ background: 'cyan' }}
                        //mb={3}
                        //p={2}
                        >
                            <div style={{ display: 'flex', justifyContent: 'stretch', alignItems: 'center', justifyItems: 'center' }}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        /*  <Avatar sx={{ width: 24, height: 24, background: theme.palette.bluetwitter.main, display: player.twitterName ? 'block' : 'none' }}><TwitterIcon fontSize='normal' /></Avatar>*/
                                        <TwitterIcon color='bluetwitter' fontSize='large' />
                                    }
                                >
                                    <Avatar src={player.twitter.photoURL ? player.twitter.photoURL : noProfilePic} alt="pic profile user" sx={{ width: 56, height: 56, padding: '0.4vw', background: player.twitter.displayName ? theme.palette.white.main : 'transparent', border: `1px solid ${theme.palette.bluetwitter.main}` }} />

                                </Badge>
                            </div>
                            {player.twitter.displayName ? `@${player.twitter.displayName}` : 'Not connected'}
                            {
                                player.twitter.displayName ?
                                    <Button
                                        color="bluetwitter"
                                        sx={{ fontWeight: 'bold' }}
                                        onClick={signOutTwitter}>Sign OUT</Button> :
                                    <Button
                                        startIcon={<TwitterIcon />}
                                        variant="outlined"
                                        color="bluetwitter"
                                        sx={{ borderRadius: "2vw", margin: '0.3vw', fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', }}
                                        onClick={signInTwitter}>Sign IN</Button>

                            }

                        </Stack>
                    </Grid>
                </Grid>


                {
                    /*
<Box 
    //sx={{ mb: 2, mt: 3, }}
>
    <div>
        <HandleNextButton
            disabled={!player.twitter.displayName}
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 1, mr: 1 }}
            color='primary'
        >
            Continue
        </HandleNextButton>
    </div>
</Box>
                    */
                }
            </>
        )
    }

    const StepFollowTwitter = () => {
        return (

            <Grid container direction="column" justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }} p={2}>
                <Grid item xs={12} sm={12} p={2}>
                    <ul style={{ paddingLeft: '1vw', }}>
                        <li><TwitterFollowButton screenName={'WinnoBearz'} options={{ size: 'large', showCount: false, }} /></li>
                        <li><span>
                            followed {
                                player.twitter.isFollower ?
                                    <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                    <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                            }
                        </span>
                            <VerifyButton
                                loading={processingFollower}
                                loadingPosition="start"
                                startIcon={<CachedIcon />}
                                variant="contained"
                                color="primary"
                                //ml={3}
                                sx={{ borderRadius: "2vw", marginLeft: { xs: '5vw', md: '0.3vw' }, fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', }}
                                onClick={async () => {
                                    //setProcessingFollower(true);
                                    const followed = await setIsFollower();
                                    //handlePlayer(_player);
                                    //console.log('isFollower PLAYER', followed);
                                }}
                            >
                                Verify</VerifyButton>
                        </li>
                    </ul>

                </Grid>
            </Grid>

        )
    }

    const StepPutWallet = () => {
        return (
            <Grid container direction="column" justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }} p={2}>
                <Grid item xs={12} sm={12}>
                    <Stack sx={{ width: '100%' }} spacing={2} pt={2} pb={2}>
                        <Alert severity="warning" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>To avoid hack and scam we decide to adopt this method instead to connect your wallet.</Alert>
                        <Alert severity="info" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>Copy/Paste your address to be secure.</Alert>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextFieldWalletAddress player={player} handlePlayer={handlePlayer} errorWallet={errorWallet} handleErrorWallet={handleErrorWallet} />
                    <CustomizedDialogs style={{ display: { xs: 'block', sm: 'none' } }} open={confirmingSave} setOpen={setConfirmingSave} player={player} onClickAction={saveNewPlayer} />
                </Grid>
            </Grid>
        )
    }

    const StepCongratulations = () => {
        return (
            <Grid container direction="column" justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }} p={2}>
                <Grid item xs={12} sm={12} p={2}>
                    <Stack
                        direction={'column'}
                        //spacing={1}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ fontSize: 'x-large' }}
                        mb={3}
                    //p={2}
                    >
                        <span>{player.walletAddress.slice(0, 8) + "..." + player.walletAddress.slice(-8)}</span>
                        <div>
                            <span style={{ fontWeight: 'bold' }}><TwitterIcon color={'bluetwitter'} />@{player.twitter.displayName}</span>
                            <span className={`${styleWinnoAndBees['final-step-value']}`}>(following {
                                player.twitter.isFollower ?
                                    <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                    <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                            })</span>
                        </div>
                    </Stack>

                    <ul style={{ paddingLeft: '1vw', }}>
                        {
                            /*
                            <li>
                            <span className={`${styleWinnoAndBees['final-step-label']}`}>games: </span>
                            <span className={`${styleWinnoAndBees['final-step-value']}`}>{player.nGames}</span>
                            <span> | </span>
                            <span className={`${styleWinnoAndBees['final-step-label']}`}>wins: </span>
                            <span className={`${styleWinnoAndBees['final-step-value']}`}>{player.nWins}</span>
                            <span> | </span>
                            <span className={`${styleWinnoAndBees['final-step-label']}`}>looses: </span>
                            <span className={`${styleWinnoAndBees['final-step-value']}`}>{player.nLooses}</span>
                        </li>
                        <li>
                            <span className={`${styleWinnoAndBees['final-step-label']}`}>best score : </span>
                            <span className={`${styleWinnoAndBees['final-step-value']}`}>{player.bestScore} pts</span>
                        </li>
                        */
                        }


                        <li>
                            <span className={`${styleWinnoAndBees['final-step-label']}`}>whitelisted : </span>
                            <span className={`${styleWinnoAndBees['final-step-value']}`}>{
                                player.whitelisted ?
                                    <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                    <>
                                        <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                        <span > Min {Game.SCORE_TO_WHITELIST} pts </span>
                                    </>
                            }
                                {/*<span style={{ fontWeight: 'bold' }}>{'->'} ({player.bestScore})</span>*/}
                            </span>
                        </li>

                        <li>
                            <span className={`${styleWinnoAndBees['final-step-label']}`}>airdropped : </span>
                            <span className={`${styleWinnoAndBees['final-step-value']}`}>{
                                player.airdropped ?
                                    <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                    <>
                                        <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                        <span> Min {Game.SCORE_TO_AIRDROP} pts </span>
                                    </>
                            }
                                {/*<span style={{ fontWeight: 'bold' }}>{'->'} ({player.bestScore})</span>*/}
                            </span>
                        </li>


                    </ul>
                    <Box sx={{ mb: 2, mt: 3, }} >
                        <div>
                            <HandleNextButton
                                //backColor={'var(--secondary)'}
                                //textColor={'black'}
                                disabled={!player.twitter.isFollower}
                                variant="contained"
                                //onClick={handleNext}
                                onClick={async () => {
                                    const followed = await setIsFollower();
                                    //handlePlayer(_player);
                                    if (followed) {
                                        handleNext();
                                    } else {
                                        let _player = JSON.parse(JSON.stringify(player));
                                        _player.twitter.isFollower = false;
                                        handlePlayer(_player);
                                    }
                                    //console.log('isFollower PLAYER', player);
                                }}
                                sx={{ mt: 1, mr: 1 }}
                            //color='primary'
                            >
                                Continue
                            </HandleNextButton>
                            <HandleBackButton
                                //backColor={'var(--secondary)'}
                                //textColor={'black'}
                                variant='text'
                                //disabled={true}
                                onClick={handleBack}

                                sx={{ mt: 1, mr: 1 }}
                            //color='primary'
                            >
                                Back
                            </HandleBackButton>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        )
    }
    const steps = [

        {
            label: 'Login with twitter',
            caption: 'Twitter',
            actionNext: handleNext,
            textNext: 'Continue',
            visibilityBack: 'hidden',
            visibilityNext: 'visible',
            displayBack: 'none',
            disabledNext: !player.twitter.displayName,
            description: <StepLoginTwitter />,
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
            description: <StepFollowTwitter />,
        },

        {
            label: 'Put your wallet',
            caption: 'Like + Reply + Retweet',
            textNext: 'Save',
            actionNext: async () => {
                const followed = await setIsFollower();
                //handlePlayer(_player);
                if (followed) {
                    setConfirmingSave(true);
                    //handleNext();
                } else {
                    let _player = JSON.parse(JSON.stringify(player));
                    _player.twitter.isFollower = false;
                    handleStep(1);
                    handlePlayer(_player);
                }
            },
            visibilityBack: 'visible',
            visibilityNext: 'visible',
            displayBack: 'flex',
            disabledNext: !player.twitter.displayName,
            description: <StepPutWallet />,
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
            description: <StepCongratulations />,
        },
        /*
        {
          label: 'Airdrop',
          caption:'Free NFT available 🐻',
          description: <StepGetDrop />,
        },
        {
          label: 'Notification',
          caption:'Last step',
          description: <StepRecieved />,
        },
        */
    ];
    const maxSteps = steps.length;
    const lastStep = steps.length - 1;




    return (
        <>
            <Box sx={{
                //width: '100%', 
                //maxWidth: 350, 
                width: { xs: '100%', sm: 550 }, maxWidth: { xs: 350, sm: 700 },
                flexGrow: 1, display: { xs: 'block', md: 'none' },
                marginTop: '1vw'
            }} >
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        //direction:'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        height: 50,
                        pl: 2,
                        bgcolor: 'background.default',
                        border: `1px solid ${theme.palette.background.border}`,
                    }}
                >
                    <Typography paragraph={true} sx={{ fontSize: 'small', fontWeight: 'bold', marginRight: { xs: '3vw', sm: '0.2vw' }, fontFamily: "'Press Start 2P', sans-serif" }}>{steps[activeStep].label}</Typography>
                    { /* <Typography paragraph={true} variant='caption'>{steps[0].caption}</Typography> */}
                </Paper>
                <Box sx={{
                    //maxWidth: 350,
                    //width: '100%',
                    width: { xs: '100%', sm: 550 }, maxWidth: { xs: 350, sm: 700 },
                    //padding: 2,
                    borderLeft: `1px solid ${theme.palette.background.border}`,
                    borderRight: `1px solid ${theme.palette.background.border}`,
                }}>
                    {steps[activeStep].description}
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
                            //onClick={handleNext}
                            onClick={steps[activeStep].actionNext}
                            //disabled={activeStep === maxSteps - 1}
                            disabled={steps[activeStep].disabledNext}
                            style={{
                                visibility: steps[activeStep].visibilityNext,
                                fontWeight: 'bold'
                            }}
                        >
                            {steps[activeStep].textNext}
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
                            //disabled={true}
                            style={{
                                visibility: steps[activeStep].visibilityBack,
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

            <Box
                sx={{
                    padding: 3,
                    width: { sm: 550 }, maxWidth: { xs: 400, sm: 700 },
                    border: `3px solid ${'var(--primary)'}`,
                    display: { xs: 'none', md: 'block' },
                    marginTop: '1vw',
                    //borderWidth:3, borderColor:'var(--third)', borderStyle:'solid',
                }}
            >
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step key={'login-twitter'} sx={styleStepIcon}>
                        <StepLabel >
                            <span className={`${styleWinnoAndBees['step-label']}`}>Login with twitter</span>
                        </StepLabel>
                        <StepContent color='brownbear' p={2} >
                            <Grid container direction="column" justifyContent={'center'} alignItems={'center'}>
                                <Grid item sm={12}>
                                    <Stack
                                        direction={'column'}
                                        //spacing={1}
                                        justifyContent="center"
                                        alignItems="center"
                                    //sx={{ background: 'cyan' }}
                                    //mb={3}
                                    //p={2}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'stretch', alignItems: 'center', justifyItems: 'center' }}>
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                badgeContent={
                                                    /*  <Avatar sx={{ width: 24, height: 24, background: theme.palette.bluetwitter.main, display: player.twitterName ? 'block' : 'none' }}><TwitterIcon fontSize='normal' /></Avatar>*/
                                                    <TwitterIcon color='bluetwitter' fontSize='large' />
                                                }
                                            >
                                                <Avatar src={player.twitter.photoURL ? player.twitter.photoURL : noProfilePic} alt="pic profile user" sx={{ width: 56, height: 56, padding: '0.4vw', background: player.twitter.displayName ? theme.palette.white.main : 'transparent', border: `1px solid ${theme.palette.bluetwitter.main}` }} />

                                            </Badge>
                                        </div>
                                        {player.twitter.displayName ? `@${player.twitter.displayName}` : 'Not connected'}
                                        {
                                            player.twitter.displayName ?
                                                <Button
                                                    color="bluetwitter"
                                                    sx={{ fontWeight: 'bold' }}
                                                    onClick={signOutTwitter}>Sign OUT</Button> :
                                                <Button
                                                    startIcon={<TwitterIcon />}
                                                    variant="outlined"
                                                    color="bluetwitter"
                                                    sx={{ borderRadius: "2vw", margin: '0.3vw', fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', }}
                                                    onClick={signInTwitter}>Sign IN</Button>

                                        }

                                    </Stack>
                                </Grid>

                                <Grid item sm={12} >
                                    <HandleNextButton
                                        //justifyContent={'center'}
                                        disabled={!player.twitter.displayName}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, mr: 1 }}
                                        color='primary'
                                    >
                                        Continue
                                    </HandleNextButton>
                                </Grid>
                            </Grid>




                        </StepContent>
                    </Step>

                    <Step key={'follow-twitter'} sx={styleStepIcon}>
                        <StepLabel>
                            <span className={`${styleWinnoAndBees['step-label']}`}>Follow us</span>
                        </StepLabel>
                        <StepContent color='brownbear'>
                            <ul className={`${styleWinnoAndBees['my-row']}`} style={{ paddingLeft: '1vw' }}>
                                <li><TwitterFollowButton screenName={'WinnoBearz'} options={{ size: 'large', showCount: false, }} /></li>
                                <li>WinnoBearz followed {
                                    player.twitter.isFollower ?
                                        <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                        <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                }
                                    <VerifyButton
                                        loading={processingFollower}
                                        loadingPosition="start"
                                        startIcon={<CachedIcon />}
                                        variant="contained"
                                        color="primary"
                                        sx={{ borderRadius: "2vw", margin: '0.3vw', fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', }}
                                        onClick={async () => {
                                            //setProcessingFollower(true);
                                            const followed = await setIsFollower();
                                            //handlePlayer(_player);
                                            //console.log('isFollower PLAYER', followed);
                                        }}
                                    >
                                        Verify</VerifyButton>
                                </li>
                            </ul>
                            <Box sx={{ mb: 2, mt: 3, }} >
                                <div>
                                    <HandleNextButton
                                        //backColor={'var(--secondary)'}
                                        //textColor={'black'}
                                        disabled={!player.twitter.isFollower}
                                        variant="contained"
                                        //onClick={handleNext}
                                        onClick={async () => {
                                            /*
                                            const followed = await setIsFollower();
                                            //handlePlayer(_player);
                                            if (followed) {
                                                handleNext();
                                            } else {
                                                let _player = JSON.parse(JSON.stringify(player));
                                                _player.twitter.isFollower = false;
                                                handlePlayer(_player);
                                            }
                                            */
                                            //console.log('isFollower PLAYER', player);
                                            handleNext();
                                        }}
                                        sx={{ mt: 1, mr: 1 }}
                                    //color='primary'
                                    >
                                        Continue
                                    </HandleNextButton>
                                    <HandleBackButton
                                        //backColor={'var(--secondary)'}
                                        //textColor={'black'}
                                        variant='text'
                                        //disabled={true}
                                        onClick={handleBack}

                                        sx={{ mt: 1, mr: 1 }}
                                    //color='primary'
                                    >
                                        Back
                                    </HandleBackButton>
                                </div>
                            </Box>

                        </StepContent>
                    </Step>

                    <Step key={'put-wallet'} sx={styleStepIcon}>
                        <StepLabel>
                            <span className={`${styleWinnoAndBees['step-label']}`}>Put your wallet</span>
                        </StepLabel>
                        <StepContent color='brownbear' p={2} style={{ color: theme.palette.text.primary }}>
                        <Grid container direction="column" justifyContent={'center'} alignItems={'center'}>
                                <Grid item sm={12}>
                            <Stack sx={{ width: '100%' }} spacing={2} pt={2} pb={2}>
                                <Alert severity="warning" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>To avoid hack and scam we decide to adopt this method instead to connect your wallet.</Alert>
                                <Alert severity="info" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>Copy/Paste your address to be secure.</Alert>
                            </Stack>
</Grid>
<Grid item sm={12}>
                            <TextFieldWalletAddress player={player} handlePlayer={handlePlayer} errorWallet={errorWallet} handleErrorWallet={handleErrorWallet} />
                            </Grid>
                            <Grid item sm={12}>
                            <Box sx={{ mb: 2, mt: 3, }} >
                                <div>
                                    <SaveButton
                                        loading={processingFollower}
                                        loadingPosition="start"
                                        startIcon={<SaveAltIcon />}
                                        variant="contained"
                                        color="primary"
                                        sx={{ borderRadius: "2vw", fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', mt: 1, mr: 1 }}
                                        //className={`${styleWinnoAndBees['button-handle-next-stepper']}`}
                                        //onClick={handleNext}
                                        onClick={async () => {
                                            /*
                                            const followed = await setIsFollower();
                                            //handlePlayer(_player);
                                            if (followed) {
                                                //handleNext();
                                                setConfirmingSave(true);
                                            } else {
                                                let _player = JSON.parse(JSON.stringify(player));
                                                _player.twitter.isFollower = false;
                                                handlePlayer(_player);
                                            }
                                            */
                                            handleNext();
                                        }}
                                    //sx={{ mt: 1, mr: 1 }}
                                    //color='primary'
                                    >
                                        Save
                                    </SaveButton>

                                    <HandleBackButton
                                        //className={`${styleWinnoAndBees['button-handle-back-stepper']}`}
                                        variant="text"
                                        //disabled={true}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                        // sx={styleWinnoAndBees['button-handle-back-stepper']}
                                        color='primary'
                                    >
                                        Back
                                    </HandleBackButton>
                                </div>
                            </Box>
                            </Grid>
                            </Grid>
                            <CustomizedDialogs style={{ display: { xs: 'none', sm: 'block' } }} open={confirmingSave} setOpen={setConfirmingSave} player={player} onClickAction={saveNewPlayer} />
                        </StepContent>
                    </Step>


                    <Step key={'congratulations'} sx={styleStepIcon}>
                        <StepLabel>
                            <span className={`${styleWinnoAndBees['step-label']}`}>Congratulations</span>
                        </StepLabel>
                        <StepContent color='brownbear' className={`${styleWinnoAndBees['step-content']}`}>
                            <Stack
                                direction={'column'}
                                //spacing={1}
                                justifyContent="center"
                                alignItems="center"
                                //sx={{ background: 'cyan' }}
                                mb={3}
                            //p={2}
                            >
                                <span>{player.walletAddress.slice(0, 8) + "..." + player.walletAddress.slice(-8)}</span>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}><TwitterIcon color={'bluetwitter'} />@{player.twitter.displayName}</span>
                                    <span className={`${styleWinnoAndBees['final-step-value']}`}>(following {
                                        player.twitter.isFollower ?
                                            <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                            <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                    })</span>
                                </div>


                                {
                                    /*
                                    <div>
                                    <span ><TwitterIcon color={'bluetwitter'} /> follower </span>
                                    <span className={`${styleWinnoAndBees['final-step-value']}`}>{
                                        player.twitter.isFollower ?
                                            <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                            <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                    }</span>
                                </div>
                                */
                                }

                            </Stack>

                            <ul style={{ paddingLeft: '1vw' }}>
                                {
                                    /*
                                    <li>
                                    <span className={`${styleWinnoAndBees['final-step-label']}`}>games: </span>
                                    <span className={`${styleWinnoAndBees['final-step-value']}`}>{player.nGames}</span>
                                    <span> | </span>
                                    <span className={`${styleWinnoAndBees['final-step-label']}`}>wins: </span>
                                    <span className={`${styleWinnoAndBees['final-step-value']}`}>{player.nWins}</span>
                                    <span> | </span>
                                    <span className={`${styleWinnoAndBees['final-step-label']}`}>looses: </span>
                                    <span className={`${styleWinnoAndBees['final-step-value']}`}>{player.nLooses}</span>
                                </li>
                                <li>
                                    <span className={`${styleWinnoAndBees['final-step-label']}`}>best score : </span>
                                    <span className={`${styleWinnoAndBees['final-step-value']}`}>{player.bestScore} pts</span>
                                </li>
                                */
                                }


                                <li>
                                    <span className={`${styleWinnoAndBees['final-step-label']}`}>eligible whitelist : </span>
                                    <span className={`${styleWinnoAndBees['final-step-value']}`}>{
                                        player.whitelisted ?
                                            <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                            <>
                                                <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                                <span > Min {Game.SCORE_TO_WHITELIST} pts </span>
                                            </>
                                    }
                                        <span style={{ fontWeight: 'bold' }}>{'->'} ({player.bestScore})</span>
                                    </span>
                                </li>

                                <li>
                                    <span className={`${styleWinnoAndBees['final-step-label']}`}>eligible airdrop : </span>
                                    <span className={`${styleWinnoAndBees['final-step-value']}`}>{
                                        player.airdropped ?
                                            <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                            <>
                                                <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                                <span> Min {Game.SCORE_TO_AIRDROP} pts </span>
                                            </>
                                    }
                                        <span style={{ fontWeight: 'bold' }}>{'->'} ({player.bestScore})</span>
                                    </span>
                                </li>


                            </ul>
                            <Box sx={{ mb: 2, mt: 3, }} >
                                <div>
                                    <HandleNextButton
                                        //backColor={'var(--secondary)'}
                                        //textColor={'black'}
                                        disabled={!player.twitter.isFollower}
                                        variant="contained"
                                        //onClick={handleNext}
                                        onClick={async () => {
                                            const followed = await setIsFollower();
                                            //handlePlayer(_player);
                                            if (followed) {
                                                //handleNext();
                                                closeDivPlayer();
                                                setActiveStep(0);
                                            } else {
                                                let _player = JSON.parse(JSON.stringify(player));
                                                _player.twitter.isFollower = false;
                                                handlePlayer(_player);
                                            }
                                            //console.log('isFollower PLAYER', player);
                                        }}
                                        sx={{ mt: 1, mr: 1 }}
                                    //color='primary'
                                    >
                                        Complete
                                    </HandleNextButton>
                                    <HandleBackButton
                                        //backColor={'var(--secondary)'}
                                        //textColor={'black'}
                                        variant='text'
                                        style={{display: 'none'}}
                                        //disabled={true}
                                        onClick={handleBack}

                                        sx={{ mt: 1, mr: 1 }}
                                    //color='primary'
                                    >
                                        Back
                                    </HandleBackButton>
                                </div>
                            </Box>

                        </StepContent>
                    </Step>



                </Stepper>
            </Box>
        </>

    )
}

const TextFieldWalletAddress = ({ player, handlePlayer, errorWallet }) => {
    //const error = errorWallet.error;
    //const messageWallet = errorWallet.message;

    //const [errorWallet, setErrorWallet] = useState(false);
    //const [messageWallet, setMessageWallet] = useState('');

    const onChangeWalletAddress = (e) => {
        const walletAddress = e.target.value;
        let _player = { ...player, walletAddress: walletAddress, };
        handlePlayer({ ...player, walletAddress: walletAddress, });
        //console.log('player', errorWallet.message);
    }
    const WalletInput = styled(TextField)(({ theme, ...inputprops }) => ({
        //'InputProps': inputprops,
        '& label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            //border: '1px solid #ced4da',
            //borderTop: '1px solid #ced4da',
            //borderRight: '1px solid #ced4da',
            //borderBottom: '1px solid #ced4da',
            //borderLeft: '0px solid var(--primary)',

            fontSize: 'small',
            padding: '10px 26px 10px 4px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                'var(--text-style-title)',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                //borderColor: '#80bdff',
                //boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',

            },
        },
    }));




    return (


        <WalletInput
            //className={`${styleWinnoAndBees['text-field-wallet']}`}
            //fontFamily='var(--text-style-general)'
            //color='primary'
            onChange={onChangeWalletAddress}
            //disabled={player.maxScore > 0 ? true : false}
            //disabled={isUserSessionStorage}
            value={player.walletAddress}
            error={errorWallet.error}
            helperText={errorWallet.message}

            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountBalanceWalletIcon color='primary' />
                    </InputAdornment>
                ),
            }}


            placeholder="wallet address (ETH)"
            variant="outlined"
        />
    )
}




const TextFieldTwitterName = ({ player, handlePlayer, errorTwitter }) => {
    //const errorTwitter = error.errorTwitter;
    //const messageTwitter = error.messageTwitter;

    const onChangeTwitterName = (e) => {
        const twitterName = e.target.value;
        let _player = JSON.parse(JSON.stringify(player));
        player.twitter['displayName'] = twitterName;
        //let _player = { ...player, twitter['displayName']: twitterName, };
        handlePlayer(_player);
        //console.log('player', _player);
        //setTwitterName(e.target.value);
       //console.log('twitter name', twitterName);
    }

    return (
        <TextField
            color='blue'
            onChange={onChangeTwitterName}
            disabled={player.twitter.displayName !== '' ? true : false}
            value={player.twitter.displayName}
            error={errorTwitter.error}
            helperText={errorTwitter.message}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <TwitterIcon color='blue' />
                    </InputAdornment>
                ),
            }}
            placeholder="twitter username"
            variant="outlined"
        />
    )
}

export default SavePlayer;