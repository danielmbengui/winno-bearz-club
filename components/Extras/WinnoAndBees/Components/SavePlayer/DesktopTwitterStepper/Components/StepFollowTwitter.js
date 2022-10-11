import React from 'react';
import { Box } from "@mui/material";
import { Check } from '@mui/icons-material';
import { TwitterFollowButton } from 'react-twitter-embed';
import CancelIcon from '@mui/icons-material/Cancel';
import CachedIcon from '@mui/icons-material/Cached';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { updatePlayerStorage } from '../../../../lib/functions';

const HandleBackButton = styled(Button)(({ }) => ({
    color: 'var(--primary)',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'x-small',
    backgroundColor: 'transparent',
    '&:hover': {
        color: 'var(--primary-dark)',
    },
}));
const HandleNextButton = styled(LoadingButton)(({ }) => ({
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'x-small',
    backgroundColor: 'var(--primary)',
    '&:hover': {
        backgroundColor: 'var(--primary-dark)',
    },
}));

const VerifyButton = styled(LoadingButton)(({ }) => ({
    color: 'black',
    fontFamily: "'Press Start 2P', sans serif",
    fontSize: 'x-small',
    backgroundColor: 'var(--primary)',

    '&:hover': {
        backgroundColor: 'var(--yellow-dark-winno)',
    },
}));

const StepFollowTwitter = ({ player, handlePlayer, getIsFollower, processingFollower, handleBack, handleNext }) => {
    const setIsFollower = async () => {
        const followed = await getIsFollower(player);
        let _player = JSON.parse(JSON.stringify(player));
        _player.twitter.isFollower = followed;
        updatePlayerStorage(_player);
        handlePlayer(_player);
    }
    return (
        <>
            <ul style={{ paddingLeft: '1vw' }}>
                <li><TwitterFollowButton screenName={'WinnoBearz'} options={{ size: 'large', showCount: false, }} /></li>
                <li>WinnoBearz followed {
                    player.twitter.isFollower ?
                        <Check style={{ verticalAlign: 'text-bottom', }} color="success" /> :
                        <CancelIcon style={{ verticalAlign: 'text-bottom', }} color="error" />
                }
                    <VerifyButton
                        loading={processingFollower}
                        loadingPosition="start"
                        startIcon={<CachedIcon />}
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: "2vw", margin: '0.3vw', fontWeight: 'bold', fontStyle: 'Press Start 2P, sans serif', }}
                        onClick={async () => {
                            await setIsFollower();
                        }}
                    >
                        Verify</VerifyButton>
                </li>
            </ul>
            <Box sx={{ mb: 2, mt: 3, }} >
                <div>
                    <HandleNextButton
                        disabled={!player.twitter.isFollower}
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Continue
                    </HandleNextButton>
                    <HandleBackButton
                        variant='text'
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </HandleBackButton>
                </div>
            </Box>
        </>
    )
}

export default StepFollowTwitter;