import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Badge, Button, Grid, Stack } from '@mui/material';
import { PATH_IMG } from '../lib/img';

const TwitterShow = ({ player}) => {
    const theme = useTheme();
    const noProfilePic = theme.palette.mode === 'light' ? `${PATH_IMG}no-profile-black.png` : `${PATH_IMG}no-profile-white.png`;

    return (
        <Grid container>
            <Grid item xs={12} sm={12} p={2}>
                <Stack
                    direction={'column'}
                    //spacing={1}
                    justifyContent="center"
                    alignItems="center"
                //sx={{ background: 'cyan' }}
                //mb={3}
                //p={2}
                >
                    <div style={{ display: 'flex', justifyContent: 'stretch', alignItems: 'center', justifyItems: 'center' }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                /*  <Avatar sx={{ width: 24, height: 24, background: theme.palette.bluetwitter.main, display: player.twitterName ? 'block' : 'none' }}><TwitterIcon fontSize='normal' /></Avatar>*/
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

export default TwitterShow;