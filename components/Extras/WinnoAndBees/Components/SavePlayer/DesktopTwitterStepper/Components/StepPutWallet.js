import React from 'react';
import { Alert, Box, Grid, InputAdornment, TextField, } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import DialogSavePlayer from '../../DialogSavePlayer';
import { isErrorWalletAddress } from '../../../../LIB/functions';

const HandleBackButton = styled(Button)(({ }) => ({
    color: 'var(--primary)',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'x-small',
    backgroundColor: 'transparent',
    '&:hover': {
        color: 'var(--primary-dark)',
    },
}));

const SaveButton = styled(LoadingButton)(({ }) => ({
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'x-small',
    backgroundColor: 'var(--primary)',

    '&:hover': {
        backgroundColor: 'var(--yellow-dark-winno)',
    },
}));

const StepPutWallet = ({ player, handlePlayer, saveNewPlayer, confirmingSave, handleConfirmingSave, errorWallet, handleErrorWallet, processingFollower, getIsFollower, handleBack, handleStep }) => {
    return (
        <Grid container columns={{ sm: 12 }} direction="column" justifyContent={'center'} alignItems={'center'}>
            <Grid item sm={12}>
                <Stack sx={{ width: '100%' }} spacing={2} pt={2} pb={2}>
                    <Alert severity="warning" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>To avoid hack and scam we decide to adopt this method instead to connect your wallet.</Alert>
                    <Alert severity="info" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>Copy/Paste your address to be secure.</Alert>
                </Stack>
            </Grid>
            <Grid item sm={12}>
                <TextFieldWalletAddress player={player} handlePlayer={handlePlayer} errorWallet={errorWallet} />
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
                            onClick={async () => {
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
                            }}
                        >
                            Save
                        </SaveButton>
                        <HandleBackButton
                            variant="text"
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                            color='primary'
                        >
                            Back
                        </HandleBackButton>

                    </div>

                </Box>
            </Grid>

            <DialogSavePlayer open={confirmingSave} setOpen={handleConfirmingSave} player={player} onClickAction={saveNewPlayer} />

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