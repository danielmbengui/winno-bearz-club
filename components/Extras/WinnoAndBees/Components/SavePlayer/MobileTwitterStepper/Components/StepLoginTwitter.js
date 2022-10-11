import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Badge, Grid, Stack, Button } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import { PATH_IMG } from '../../../../LIB/constants';


const StepLoginTwitter = ({ user, signInTwitter, signOutTwitter }) => {
    const theme = useTheme();
    const noProfilePic = theme.palette.mode === 'light' ? `${PATH_IMG}no-profile-black.png` : `${PATH_IMG}no-profile-white.png`;

    return (
        <Grid container columns={{ xs: 12 }}>
            <Grid item xs={12} p={2}>
                <Stack
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <TwitterIcon color='bluetwitter' fontSize='large' />
                        }
                    >
                        <Avatar 
                        src={user ? user.photoURL : noProfilePic}
                        alt="pic profile user" 
                        sx={{ 
                            width: 56, height: 56, 
                            padding: '0.4vw', 
                            background: user ? theme.palette.white.main : 'transparent', border: `1px solid ${theme.palette.bluetwitter.main}` }} />
                    </Badge>
                    {user ? `@${user.displayName}` : 'Not connected'}
                    {
                        user && user.displayName ?
                            <Button
                                color="bluetwitter"
                                sx={{ fontWeight: 'bold' }}
                                onClick={signOutTwitter}
                            >Sign OUT</Button> :
                            <Button
                                startIcon={<TwitterIcon />}
                                variant="outlined"
                                color="bluetwitter"
                                sx={{ borderRadius: "2vw", margin: '0.3vw', fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', }}
                                onClick={signInTwitter}
                            >Sign IN {user ? user.displayName : ''}</Button>
                    }
                </Stack>
            </Grid>
        </Grid>
    );
}

export default StepLoginTwitter;