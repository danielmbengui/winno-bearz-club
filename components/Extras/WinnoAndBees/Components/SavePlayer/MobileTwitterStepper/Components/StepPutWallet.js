import React, { useState } from 'react';
import { Alert, Grid, InputAdornment, TextField } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import DialogSavePlayer from '../../DialogSavePlayer';

const StepPutWallet = ({player, handlePlayer, saveNewPlayer, confirmingSave, handleConfirmingSave, errorWallet}) => {
    return (
        <Grid container columns={{xs:12, sm:12}} direction="column" justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }} p={2}>
            <Grid item xs={12} sm={12}>
                <Stack sx={{ width: '100%' }} spacing={2} pt={2} pb={2}>
                    <Alert severity="warning" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>To avoid hack and scam we decide to adopt this method instead to connect your wallet.</Alert>
                    <Alert severity="info" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>Copy/Paste your address to be secure.</Alert>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextFieldWalletAddress player={player} handlePlayer={handlePlayer} errorWallet={errorWallet} />
                <DialogSavePlayer open={confirmingSave} setOpen={handleConfirmingSave} player={player} onClickAction={saveNewPlayer} />
            </Grid>
        </Grid>
    )
}

const TextFieldWalletAddress = ({ player, handlePlayer, errorWallet }) => {
    const onChangeWalletAddress = (e) => {
        handlePlayer({ ...player, walletAddress: e.target.value });
    }

    const WalletInput = styled(TextField)(({ theme, ...inputprops }) => ({
        '& label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            fontSize: 'small',
            padding: '10px 26px 10px 4px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "'Press Start 2P', sans-serif",
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
            },
        },
    }));

    return (
        <WalletInput
        //value={value}
          onChange={onChangeWalletAddress}
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

export default StepPutWallet;