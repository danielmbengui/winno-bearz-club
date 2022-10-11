import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { DEFAULT_PLAYER, LINK_API_GET_IS_FOLLOWER } from '../../LIB/constants';
import axios from 'axios';
import { createPlayerJson, isErrorWalletAddress, readPlayerJson, 
    readPlayerStorage, updatePlayerJsonByTwitterUid, updatePlayerStorage } from '../../LIB/functions';
import MobileTwitterStepper from './MobileTwitterStepper/MobileTwitterStepper';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, TwitterAuthProvider } from 'firebase/auth';
import DesktopTwitterStepper from './DesktopTwitterStepper/DesktopTwitterStepper';

const SavePlayer = ({ player, handlePlayer, handleShowRestartButton }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(2);
    const [processingFollower, setProcessingFollower] = useState(false);
    const [confirmingSave, setConfirmingSave] = useState(false);
    const [errorWallet, setErrorWallet] = useState({ error: false, message: '' });

    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    const [user, setUser] = useState(null);

    useEffect(async () => {
        const playerStorage = readPlayerStorage();
        if (playerStorage) {
            handlePlayer(playerStorage);
        }
    }, []);

    useEffect(async () => {
        /*
        if (user) {
            setActiveStep(1);
            if (player.twitter.isFollower) {
                setActiveStep(2);
                if (player.walletAddress && !isErrorWalletAddress(player.walletAddress).error) {
                    setActiveStep(3);
                    handleShowRestartButton(true);
                }
            }
        }else{
            setActiveStep(0);
        }
        */
    }, [player.twitter.isFollower, player.walletAddress, user]);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    const getIsFollower = async (player) => {
        setProcessingFollower(true);
        const followed = await axios.get(`${LINK_API_GET_IS_FOLLOWER}${JSON.stringify(player)}`).then(response => {
            const data = response.data;
            return data;
        }).catch(() => {
            return null;
        });
        setProcessingFollower(false);
        return followed;
    }

    const signInTwitter = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                const credential = TwitterAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const secret = credential.secret;
                const user = result.user;
                const uid = user.uid;
                const displayName = user.displayName;
                const photoURL = user.photoURL;

                const _player = JSON.parse(JSON.stringify(player));
                _player.twitter.uid = uid;
                _player.twitter.displayName = displayName;
                _player.twitter.photoURL = photoURL;
                _player.twitter.token = token;
                _player.twitter.secret = secret;
                const isFollower = await getIsFollower(_player);
                _player.twitter.isFollower = isFollower;

                const playerJSON = await readPlayerJson(_player);

                if (playerJSON) {
                    _player.walletAddress = playerJSON.walletAddress;
                    _player.unlimitedGame = playerJSON.unlimitedGame;
                    _player.whitelistActivated = playerJSON.whitelistActivated;
                    _player.airdropped = playerJSON.airdropped;
                    _player.airdropSent = playerJSON.airdropSent;
                    _player.bestScore = playerJSON.bestScore;
                    _player.nGames = playerJSON.nGames;
                    _player.nWins = playerJSON.nWins;
                    _player.nLooses = playerJSON.nLooses;

                    playerJSON.twitter.uid = uid;
                    playerJSON.twitter.displayName = displayName;
                    playerJSON.twitter.photoURL = photoURL;
                    playerJSON.twitter.isFollower = isFollower;
                    await updatePlayerJsonByTwitterUid(playerJSON);
                }
                updatePlayerStorage(_player);
                handlePlayer(_player);
            }).catch((error) => {
                handlePlayer(DEFAULT_PLAYER);
            });
    }

    const signOutTwitter = () => {
        signOut(auth).then(() => {
            handlePlayer(DEFAULT_PLAYER);
        }).catch((error) => {
            // An error happened.
            //console.log('state', 'error', error)
        });
    }

    const handleConfirmingSave = (_confirmingSave) => {
        setConfirmingSave(_confirmingSave);
    }

    const handleErrorWallet = (_errorWallet) => {
        setErrorWallet(_errorWallet);
    }

    const handleStep = (stepChoosed) => {
        setActiveStep(stepChoosed);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    const saveNewPlayer = async (player) => {
        let _player = JSON.parse(JSON.stringify(player));
        let errorWallet = isErrorWalletAddress(player.walletAddress);
        if (!errorWallet.error) {
            const followed = await getIsFollower();
            //if (followed) {
            let playerWithoutSecret = JSON.parse(JSON.stringify(player));
            delete playerWithoutSecret.twitter['token'];
            delete playerWithoutSecret.twitter['secret'];
            const playerJson = await createPlayerJson(playerWithoutSecret);
            if (playerJson.created) {
                handleNext();
            } else {
                errorWallet.error = true;
                errorWallet.message = 'address already used with other twitter account!';
            }
        }
        updatePlayerStorage(_player);
        handlePlayer(_player);
        handleErrorWallet(errorWallet);
    }

    return (
        <>
            <DesktopTwitterStepper
                activeStep={activeStep}
                player={player}
                handlePlayer={handlePlayer}
                saveNewPlayer={saveNewPlayer}
                handleBack={handleBack}
                handleNext={handleNext}
                handleStep={handleStep}
                user={user}
                signInTwitter={signInTwitter}
                signOutTwitter={signOutTwitter}
                getIsFollower={getIsFollower}
                processingFollower={processingFollower}
                confirmingSave={confirmingSave}
                handleConfirmingSave={handleConfirmingSave}
                errorWallet={errorWallet}
                handleErrorWallet={handleErrorWallet}
            />
            <MobileTwitterStepper
                activeStep={activeStep}
                player={player}
                handlePlayer={handlePlayer}
                saveNewPlayer={saveNewPlayer}
                handleBack={handleBack}
                handleNext={handleNext}
                handleStep={handleStep}
                user={user}
                signInTwitter={signInTwitter}
                signOutTwitter={signOutTwitter}
                getIsFollower={getIsFollower}
                processingFollower={processingFollower}
                confirmingSave={confirmingSave}
                handleConfirmingSave={handleConfirmingSave}
                errorWallet={errorWallet}
                handleErrorWallet={handleErrorWallet}
            />
        </>
    );
}

export default SavePlayer;