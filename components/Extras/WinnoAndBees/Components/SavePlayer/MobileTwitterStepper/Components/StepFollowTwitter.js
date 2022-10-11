import React from 'react';
import { Grid, } from "@mui/material";
import { Check } from '@mui/icons-material';
import { TwitterFollowButton } from 'react-twitter-embed';
import CancelIcon from '@mui/icons-material/Cancel';
import CachedIcon from '@mui/icons-material/Cached';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { updatePlayerStorage } from '../../../../lib/functions';
updatePlayerStorage

const VerifyButton = styled(LoadingButton)(({ }) => ({
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'x-small',
    backgroundColor: 'var(--primary)',

    '&:hover': {
        backgroundColor: 'var(--yellow-dark-winno)',
    },
}));



const StepFollowTwitter = ({player, handlePlayer, getIsFollower, processingFollower}) => {
    const setIsFollower = async () => {
        const followed = await getIsFollower(player);
        let _player = JSON.parse(JSON.stringify(player));
        _player.twitter.isFollower = followed;
        updatePlayerStorage(_player);
        handlePlayer(_player);
    }

    return (

        <Grid container direction="column" justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }} p={2}>
            <Grid item xs={12} sm={12} p={2}>
                <ul style={{ paddingLeft: '1vw', }}>
                    <li><TwitterFollowButton screenName={'WinnoBearz'} options={{ size: 'large', showCount: false, }} /></li>
                    <li><span>
                        followed {
                            player.twitter.isFollower ?
                                <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                                <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                        }
                    </span>
                        <VerifyButton
                            loading={processingFollower}
                            loadingPosition="start"
                            startIcon={<CachedIcon />}
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: "2vw", marginLeft: { xs: '5vw', md: '0.3vw' }, fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', }}
                            onClick={async () => {
                                await setIsFollower();
                            }}
                        >
                            Verify</VerifyButton>
                    </li>
                </ul>

            </Grid>
        </Grid>
    )
}

export default StepFollowTwitter;