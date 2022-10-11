import React, {useEffect} from 'react';
import { Grid } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import styleStepCongratulations from "./StepCongratulations.module.css";
import { Check } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import Game from '../../../../Classes/GameClass';

const StepCongratulations = ({player}) => {
    return (
        <Grid container direction="column" justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }} p={2}>
            <Grid item xs={12} sm={12} p={2}>
                <Stack
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ fontSize: 'x-large' }}
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

                <ul style={{ paddingLeft: '1vw', }}>
                    <li>
                        <span className={`${styleStepCongratulations['final-step-label']}`}>whitelisted : </span>
                        <span className={`${styleStepCongratulations['final-step-value']}`}>
                            {
                            player.whitelisted ?
                                <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                <>
                                    <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                    <span > Min {Game.SCORE_TO_WHITELIST} pts </span>
                                </>
                        }
                        </span>
                    </li>

                    <li>
                        <span className={`${styleStepCongratulations['final-step-label']}`}>airdropped : </span>
                        <span className={`${styleStepCongratulations['final-step-value']}`}>{
                            player.airdropped ?
                                <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                <>
                                    <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                                    <span> Min {Game.SCORE_TO_AIRDROP} pts </span>
                                </>
                        }
                        </span>
                    </li>
                </ul>
            </Grid>
        </Grid>
    )
}

export default StepCongratulations;