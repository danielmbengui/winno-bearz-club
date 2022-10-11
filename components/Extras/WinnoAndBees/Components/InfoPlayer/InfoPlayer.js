import React from 'react';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import TwitterAccount from './TwitterAccount';

const CustomTypography = styled(Typography)(({ }) => ({
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
                        <CustomTypography >{player.walletAddress.slice(0, 8) + "..." + player.walletAddress.slice(-8)}</CustomTypography>
                        <TwitterAccount player={player} />
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 1, md: 3 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CustomTypography>Best score: {player.bestScore}</CustomTypography>
                            <CustomTypography sx={{ display: { xs: 'none', md: 'flex' } }}> | </CustomTypography>
                            <CustomTypography>Total games: {player.nGames}</CustomTypography>
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 1, md: 3 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CustomTypography>Wins: {player.nWins}</CustomTypography>
                            <CustomTypography sx={{ display: { xs: 'none', md: 'flex' } }}> | </CustomTypography>
                            <CustomTypography>Looses: {player.nLooses}</CustomTypography>
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 0.5, md: 1.5 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CustomTypography>Whitelist: {player.whitelisted ? <CheckCircleRoundedIcon color='success' /> : <CancelIcon color='error' />}</CustomTypography>
                            <CustomTypography sx={{ display: { xs: 'none', md: 'flex' } }}> | </CustomTypography>
                            <CustomTypography>Airdrop: {player.airdropped ? <CheckCircleRoundedIcon color='success' /> : <CancelIcon color='error' />}</CustomTypography>
                            <CustomTypography sx={{ display: { xs: 'none', md: 'flex' } }}> | </CustomTypography>
                            <CustomTypography>NFT recieved: {player.airdropSent ? <CheckCircleRoundedIcon color='success' /> : <CancelIcon color='error' />}</CustomTypography>
                        </Stack>
                    </Stack>
                  
                </Card>
            </Grid>
        </Grid>
    )
}

export default InfoPlayer;