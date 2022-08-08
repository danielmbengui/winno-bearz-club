import React from 'react';
import styleWinnoAndBees from "../WinnoAndBees.module.css";

import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TwitterIcon from '@mui/icons-material/Twitter';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

const TEXT_SAVE_DATA = "Save your data";

const StepSaveData = ({ handleNext, handleCanEdit }) => {
    return (
        <>
            <StepLabel>
                <label >{TEXT_SAVE_DATA}</label>
            </StepLabel>
            <StepContent sx={{ padding: 2 }}>
                <Stack
                    direction={'column'}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    marginBottom={3}
                >
                    <TextField
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

                    <TextField
                        color='blue'
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
                </Stack>
                <Stack
                    //direction={'column' }
                    //spacing={2}
                    justifyContent="center"
                    alignItems="center"
                //marginBottom={3}
                >
                    <Button
                        //disabled={true}
                        className={`${styleWinnoAndBees['button-action']}`}
                        variant='contained'
                        color='primary'
                        //variant='outlined'
                        onClick={() => {
                            handleCanEdit(false);
                            handleNext();
                        }}
                    >Save data</Button>
                </Stack>
            </StepContent>
        </>
    )
}

export default StepSaveData;