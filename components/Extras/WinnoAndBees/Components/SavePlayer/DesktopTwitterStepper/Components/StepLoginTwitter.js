import React from 'react';
import { Avatar, Badge, Grid, } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { PATH_IMG } from '../../../../LIB/constants';

const HandleNextButton = styled(LoadingButton)(({ }) => ({
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'x-small',
    backgroundColor: 'var(--primary)',
    '&:hover': {
        backgroundColor: 'var(--primary-dark)',
    },
}));

const StepLoginTwitter = ({ user, signInTwitter, signOutTwitter, handleNext }) => {
    const theme = useTheme();
    const noProfilePic = theme.palette.mode === 'light' ? `${PATH_IMG}no-profile-black.png` : `${PATH_IMG}no-profile-white.png`;

    return (
        <Grid container columns={{sm:12}} direction="column" justifyContent={'center'} alignItems={'center'}>
            <Grid item sm={12}>
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
                            <Avatar src={user ? user.photoURL : noProfilePic} alt="pic profile user" sx={{ width: 56, height: 56, padding: '0.4vw', background: user ? theme.palette.white.main : 'transparent', border: `1px solid ${theme.palette.bluetwitter.main}` }} />

                        </Badge>
                    </div>
                    {user ? `@${user.displayName}` : 'Not connected'}
                    {
                        user ? (
                            <Button
                                color="bluetwitter"
                                sx={{ fontWeight: 'bold' }}
                                onClick={signOutTwitter}>Sign OUT</Button> ) : (
                            <Button
                                startIcon={<TwitterIcon />}
                                variant="outlined"
                                color="bluetwitter"
                                sx={{ borderRadius: "2vw", margin: '0.3vw', fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', }}
                                onClick={signInTwitter}>Sign IN</Button>)
                    }
                </Stack>
            </Grid>

            <Grid item sm={12} >
                                    <HandleNextButton
                                        //justifyContent={'center'}
                                        disabled={!user}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, mr: 1 }}
                                        color='primary'
                                    >
                                        Continue
                                    </HandleNextButton>
                                </Grid>
        </Grid>
    )
}

export default StepLoginTwitter;