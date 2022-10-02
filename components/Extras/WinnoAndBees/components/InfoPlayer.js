import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Check } from '@mui/icons-material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import CachedIcon from '@mui/icons-material/Cached';
import TwitterConnect from './TwitterConnect';
import TwitterShow from './TwitterShow';
import RestartGame from './RestartGame';
import { getPlayerByTwitterJSON } from '../lib/functions';
import styleWinnoAndBees from "../WinnoAndBees.module.css";

const Typo = styled(Typography)(({ }) => ({
    //color: theme.palette.getContrastText(purple[500]),
    color: 'var(--text-primary)',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'medium',
}));
const SaveButton = styled(Button)(({ }) => ({
    //color: theme.palette.getContrastText(purple[500]),
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'large',
    backgroundColor: 'var(--primary)',
    '&:hover': {
        backgroundColor: 'var(--primary-dark)',
    },
}));
const InfoPlayer = ({ player, game, restartGame, openDivPlayer }) => {
    const [playerJSON, setPlayerJSON] = useState(null);

    useEffect(async () => {
        let _playerJSON = await getPlayerByTwitterJSON(player.twitter.displayName);
        //console.log("PLAAAAYER", player);
        //console.log("PLAAAAYER JSON", _playerJSON);
        setPlayerJSON(_playerJSON);
    }, [player.twitter.displayName]);
    //walletAddress: '', twitterName: '', bestScore: 0, whitelisted: false, airdropped: false, nGame: 0
    return (
        <Grid container>
            <Grid item xs={12} sm={12} p={2}>
                <Card elevation={20} style={{ border: "3px white solid", borderRadius: '0.5vw', padding: '1vw', textAlign: 'center' }} p={2}>
                    <Stack
                        direction={'column'}
                        spacing={0}
                        justifyContent="center"
                        alignItems="center"
                        pb={5}
                    >
                        <Typo >{player.walletAddress.slice(0, 8) + "..." + player.walletAddress.slice(-8)}</Typo>
                        <TwitterShow player={player} />
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 1, md: 3 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typo>Best score: {player.bestScore}</Typo>
                            <Typo sx={{ display: { xs: 'none', md: 'flex' } }}> | </Typo>
                            <Typo>Total games: {player.nGames}</Typo>
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 1, md: 3 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typo>Wins: {player.nWins}</Typo>
                            <Typo sx={{ display: { xs: 'none', md: 'flex' } }}> | </Typo>
                            <Typo>Looses: {player.nLooses}</Typo>
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 0.5, md: 1.5 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typo>Whitelist: {player.whitelisted ? <CheckCircleRoundedIcon color='success' /> : <CancelIcon color='error' />}</Typo>
                            <Typo sx={{ display: { xs: 'none', md: 'flex' } }}> | </Typo>
                            <Typo>Airdrop: {player.airdropped ? <CheckCircleRoundedIcon color='success' /> : <CancelIcon color='error' />}</Typo>
                            <Typo sx={{ display: { xs: 'none', md: 'flex' } }}> | </Typo>
                            <Typo>NFT recieved: {player.airdropSent ? <CheckCircleRoundedIcon color='success' /> : <CancelIcon color='error' />}</Typo>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={'column'}
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {!playerJSON ?
                            <SaveButton
                                //ref={refButtonStart}
                                //sx={{size:{xs:'small', md:'medium'}}}
                                //size='small'
                                //disabled={isUserSessionStorage}
                                //disabled={true}
                                //className={`${styleWinnoAndBees['button-save']}`}
                                variant='contained'
                                onClick={async () => {
                                    openDivPlayer();
                                    //setGame(null);
                                    //initComponentState();
                                }}>Save player</SaveButton> :
                            <RestartGame game={game} restartGame={restartGame} />
                        }
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    )
}

export default InfoPlayer;