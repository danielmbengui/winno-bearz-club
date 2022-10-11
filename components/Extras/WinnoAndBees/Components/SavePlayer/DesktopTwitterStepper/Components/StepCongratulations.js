import React, { useEffect, useRef, useState } from 'react';
import { Alert, Avatar, Badge, Box, Grid, InputAdornment, MobileStepper, Paper, Step, StepContent, StepIcon, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTheme } from '@mui/material/styles';
import styleStepCongratulations from "./StepCongratulations.module.css";
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
import Game from '../../../../Classes/GameClass';

const StepCongratulations = ({ player }) => {

    return (
        <>
            <Stack
                direction={'column'}
                justifyContent="center"
                alignItems="center"
                mb={3}
            >
                <span>{player.walletAddress.slice(0, 8) + "..." + player.walletAddress.slice(-8)}</span>
                <div>
                    <span style={{ fontWeight: 'bold' }}><TwitterIcon color={'bluetwitter'} />@{player.twitter.displayName}</span>
                    <span className={`${styleStepCongratulations['final-step-value']}`}>(following {
                        player.twitter.isFollower ?
                            <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                            <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                    })</span>
                </div>
            </Stack>

            <ul style={{ paddingLeft: '1vw' }}>
                                <li>
                                    <span className={`${styleStepCongratulations['final-step-label']}`}>eligible whitelist : </span>
                                    <span className={`${styleStepCongratulations['final-step-value']}`}>{
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
                                    <span className={`${styleStepCongratulations['final-step-label']}`}>eligible airdrop : </span>
                                    <span className={`${styleStepCongratulations['final-step-value']}`}>{
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
        </>
    )
}

export default StepCongratulations;