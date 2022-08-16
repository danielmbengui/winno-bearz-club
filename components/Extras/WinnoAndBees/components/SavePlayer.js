import React, { useEffect, useRef, useState } from 'react';
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TwitterIcon from '@mui/icons-material/Twitter';
import { deletePlayerStorage, isErrorTwitterName, isErrorWalletAddress, updatePlayerStorage } from "../lib/functions";

import styleWinnoAndBees from "../WinnoAndBees.module.css";


//player={player} handlePlayer={handlePlayer} error={{ errorWallet: errorWallet, messageWallet: messageWallet }}
const SavePlayer = ({ player, handlePlayer, errorWallet, handleErrorWallet, errorTwitter, handleErrorTwitter }) => {

    return (
        <>
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
                className={`${styleWinnoAndBees['button-action']}`}
                variant='contained'
                color='primary'
                onClick={async () => {
                    //addUser({walletAddress: walletAddress, twitterName: twitterName});
                    //window.sessionStorage.removeItem(GET_LOCAL_SESSION_USER)
                    const errorWallet = isErrorWalletAddress(player.walletAddress);
                    console.log('ERROR', errorWallet)
                    //let _errorWallet = errorWallet.error;
                    const errorTwitter = isErrorTwitterName(player.twitterName);
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
        console.log('player', errorWallet.message);
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
        let _player = { ...player, twitterName: twitterName, };
        handlePlayer({ ...player, twitterName: twitterName, });
        console.log('player', _player);
        //setTwitterName(e.target.value);
        //console.log('twitter name', twitterName);
    }

    return (
        <TextField
            color='blue'
            onChange={onChangeTwitterName}
            //disabled={player ? true : false}
            value={player.twitterName}
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