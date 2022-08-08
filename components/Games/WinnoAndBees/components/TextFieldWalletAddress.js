import React, { useEffect, useRef, useState } from 'react';
import { InputAdornment, TextField } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


const TextFieldWalletAddress = ({ player, handlePlayer, error }) => {
    //const [errorWallet, setErrorWallet] = useState(false);
    //const [messageWallet, setMessageWallet] = useState('');
    const errorWallet = error.errorWallet;
    const messageWallet = error.messageWallet;

    const onChangeWalletAddress = (e) => {
        let _player = { ...player, walletAddress: e.target.value, };
        handlePlayer({ ...player, walletAddress: e.target.value, });
        //setPlayer(_player);
        console.log('player', _player);
        //setWalletAddress(e.target.value);
        //console.log('wallet address', e.target.value);
    }

    return (
        <TextField
            color='primary'
            onChange={onChangeWalletAddress}
            //disabled={player.maxScore > 0 ? true : false}
            //disabled={isUserSessionStorage}
            value={player.walletAddress}
            error={errorWallet}
            helperText={messageWallet}
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

export default TextFieldWalletAddress;

