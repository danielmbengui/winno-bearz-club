import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Badge, Box, Button, InputAdornment, Stack, Step, StepContent, StepIcon, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TwitterIcon from '@mui/icons-material/Twitter';
import { deletePlayerStorage, isErrorTwitterName, isErrorWalletAddress, updatePlayerStorage } from "../lib/functions";
import { useTheme } from '@mui/material/styles';
import styleWinnoAndBees from "../WinnoAndBees.module.css";
import { PATH_IMG } from '../lib/img';
import { Check } from '@mui/icons-material';
import { TwitterFollowButton } from 'react-twitter-embed';
import CancelIcon from '@mui/icons-material/Cancel';

//player={player} handlePlayer={handlePlayer} error={{ errorWallet: errorWallet, messageWallet: messageWallet }}
const SavePlayer = ({ player, handlePlayer, errorWallet, handleErrorWallet, errorTwitter, handleErrorTwitter }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
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
        console.log('player change saveplayer', player.twitter.isFollower)
        if (player.twitter.displayName.length) {
            setActiveStep(1);
        }

        if (player.twitter.isFollower) {
            setActiveStep(3);
        }

        if (player.walletAddress != '') {

        }
    }, [player]);


    return (
        <>
            <Box sx={{ width: { xs: 350, sm: 550 }, maxWidth: { xs: 400, sm: 700 }, }}>
                <Stepper activeStep={activeStep} orientation="vertical" sx={{ display: { xs: 'none', sm: 'block' }, }}>
                    <Step key={'login-twitter'} sx={styleStepIcon}>
                        <StepLabel >
                            <span className={`${styleWinnoAndBees['step-label']}`}>Login to twitter</span>
                        </StepLabel>
                        <StepContent color='brownbear' p={2} style={{ color: theme.palette.text.primary }}>
                            <div style={{ display: 'flex', direction: 'row', justifyContent: 'start', alignContent: 'center', alignItems: 'center', justifyItems: 'start' }}>
                                <p style={{ textAlign: 'left', verticalAlign: 'middle' }}>Following the <a href="https://twitter.com/WinnoBearz" target="_blank">@WinnoBearz Club</a> twitter account!
                                    <Check style={{ verticalAlign: 'text-bottom', }} color="success" />
                                </p>
                            </div>
                        </StepContent>
                    </Step>

                    <Step key={'follow-twitter'} sx={styleStepIcon}>
                        <StepLabel>
                            <span className={`${styleWinnoAndBees['step-label']}`}>Follow us</span>
                        </StepLabel>
                        <StepContent color='brownbear' p={2} style={{ color: theme.palette.text.primary }}>
                            <div style={{ display: 'flex', direction: 'row', justifyContent: 'start', alignContent: 'center', alignItems: 'center', justifyItems: 'start' }}>
                                <p style={{ textAlign: 'left', verticalAlign: 'middle' }}>Click on the Follow button to join the <a href="https://twitter.com/WinnoBearz" target="_blank">@WinnoBearz Club</a> twitter account.
                                    <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" /></p>

                            </div>
                            {/*<ButtonFollow /> */}
                            <TwitterFollowButton screenName={'WinnoBearz'} options={{ size: 'large', showCount: false, }} />

                        </StepContent>
                    </Step>

                    <Step key={'put-wallet'} sx={styleStepIcon}>
                        <StepLabel optional={<Typography variant="caption" style={{ color: theme.palette.text.primary }}>Follow</Typography>}>
                            <span className={`${styleWinnoAndBees['step-label']}`}>Put your wallet</span>
                        </StepLabel>
                        <StepContent color='brownbear' p={2} style={{ color: theme.palette.text.primary }}>
                            <div style={{ display: 'flex', direction: 'row', justifyContent: 'start', alignContent: 'center', alignItems: 'center', justifyItems: 'start' }}>
                                <p style={{ textAlign: 'left', verticalAlign: 'middle' }}>Click on the Follow button to join the <a href="https://twitter.com/WinnoBearz" target="_blank">@WinnoBearz Club</a> twitter account.
                                    <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" /></p>
                            </div>
                            {/*<ButtonFollow /> */}
                            <TwitterFollowButton screenName={'WinnoBearz'} options={{ size: 'large', showCount: false, }} />

                        </StepContent>
                    </Step>




                </Stepper>
            </Box>
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
            {player.twitter.displayName ? `@${player.twitter.displayName}` : 'Not connected'}
            <Stack
                direction={'column'}
                spacing={1}
                justifyContent="center"
                alignItems="center"
                //mb={3}
                p={2}
            >
                <TextFieldWalletAddress player={player} handlePlayer={handlePlayer} errorWallet={errorWallet} handleErrorWallet={handleErrorWallet} />
                <TextFieldTwitterName player={player} handlePlayer={handlePlayer} errorTwitter={errorTwitter} handleErrorTwitter={handleErrorTwitter} />
            </Stack>

            <Button
                //ref={refButtonStart}
                //disabled={isUserSessionStorage}
                //disabled={true}
                className={`${styleWinnoAndBees['button-save-player']}`}
                variant='contained'
                //color='primary'
                //fontFamily="Press Start 2P, sans-serif"
                onClick={async () => {
                    //addUser({walletAddress: walletAddress, twitterName: twitterName});
                    //window.sessionStorage.removeItem(GET_LOCAL_SESSION_USER)
                    const errorWallet = isErrorWalletAddress(player.walletAddress);
                    console.log('ERROR', errorWallet)
                    //let _errorWallet = errorWallet.error;
                    const errorTwitter = isErrorTwitterName(player.twitter.displayName);
                    console.log('ERROR', errorTwitter)
                    //let user = await getUser({walletAddress : player ? player.walletAddress : walletAddress});
                    //await setUserByWallet({walletAddress: walletAddress, twitterName: twitterName, score: 37, airdropped: true});


                    if (!errorWallet.error && !errorTwitter.error) {
                        //updatePlayerStorage(player);
                        //let isWallet = await walletExist(player.walletAddress);
                        /*
                        if (!isWallet) {
                            //await addUser({ walletAddress: player.walletAddress, twitterName: player.twitterName });
                        }
                        */
                        //setUserSessionStorage();
                        //setIsUserSessionStorage(true);
                    }
                    handleErrorWallet(errorWallet);
                    handleErrorTwitter(errorTwitter);
                    //deletePlayerStorage();
                    //setUserByWallet({walletAddress: walletAddress, twitterName: twitterName, score: 37, airdropped: true});
                    //setErrorWallet(true);
                    //setMessageWallet('AAAARG');
                }}>Save data</Button>
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

    return (
        <TextField
            color='primary'
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
        console.log('twitter name', twitterName);
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