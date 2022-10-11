import React from 'react';
import { useTheme } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Badge, Grid, Stack } from '@mui/material';

const TwitterAccount = ({ player}) => {
    const theme = useTheme();
    const noProfilePic = theme.palette.mode === 'light' ? `${'/extras/winnoandbees/img/'}no-profile-black.png` : `${'/extras/winnoandbees/img/'}no-profile-white.png`;

    return (
        <Grid container>
            <Grid item xs={12} sm={12} p={2}>
                <Stack
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center"
                >
                    <div style={{ display: 'flex', justifyContent: 'stretch', alignItems: 'center', justifyItems: 'center' }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <TwitterIcon color='bluetwitter' fontSize='large' />
                            }
                        >
                            <Avatar src={player.twitter.photoURL ? player.twitter.photoURL : noProfilePic} alt="pic profile user" sx={{ width: 56, height: 56, padding: '0.4vw', background: player.twitter.displayName ? theme.palette.white.main : 'transparent', border: `1px solid ${theme.palette.bluetwitter.main}` }} />
                        </Badge>
                    </div>
                    {player.twitter.displayName ? `@${player.twitter.displayName}` : 'Not connected'}
                </Stack>
            </Grid>
        </Grid>
    );
}

export default TwitterAccount;