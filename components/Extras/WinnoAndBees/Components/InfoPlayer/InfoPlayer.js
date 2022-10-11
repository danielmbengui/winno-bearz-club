import { Card, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import TwitterAccount from './TwitterAccount';

const Typo = styled(Typography)(({ }) => ({
    color: 'var(--text-primary)',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'medium',
}));

const InfoPlayer = ({ player}) => {
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
                        <TwitterAccount player={player} />
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
                  
                </Card>
            </Grid>
        </Grid>
    )
}

export default InfoPlayer;