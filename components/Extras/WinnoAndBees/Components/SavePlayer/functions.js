import { ACTION_CREATE_PLAYER, ACTION_READ_PLAYER, ACTION_UPDATE_PLAYER_BY_TWITTER_NAME, ACTION_UPDATE_PLAYER_BY_TWITTER_UID, ACTION_UPDATE_PLAYER_BY_WALLET, DIGIT_WALLET_ADDRESS, ERROR_TWITTER_NAME_EMPTY, ERROR_WALLET_EMPTY, ERROR_WALLET_FORMAT, ERROR_WALLET_LENGTH, GET_PLAYER_STORAGE, LENGTH_WALLET_ADDRESS, LINK_API_CREATE_PLAYER, LINK_API_READ_PLAYER, LINK_API_UPDATE_PLAYER } from "./constants";
import axios from 'axios';

export async function createPlayerJson(player) {
    const playerJson = axios.put(LINK_API_CREATE_PLAYER, {
        action: ACTION_CREATE_PLAYER,
        player: player,
    }).then(response => {
        return response.data;
    }).catch( error => {
        return error;
    });
    return playerJson;
}

export async function updatePlayerJsonByWallet(player) {
    const playerJson = axios.post(LINK_API_UPDATE_PLAYER, {
        action: ACTION_UPDATE_PLAYER_BY_WALLET,
        player: player,
    }).then(response => {
        return response.data;
    }).catch( error => {
        return null;
    });
    return playerJson;
}

export async function updatePlayerJsonByTwitterUid(player) {
    const playerJson = axios.post(LINK_API_UPDATE_PLAYER, {
        action: ACTION_UPDATE_PLAYER_BY_TWITTER_UID,
        player: player,
    }).then(response => {
        return response.data;
    }).catch( error => {
        return null;
    });
    return playerJson;
}

export async function updatePlayerJsonByTwitterName(player) {
    const playerJson = axios.post(LINK_API_UPDATE_PLAYER, {
        action: ACTION_UPDATE_PLAYER_BY_TWITTER_NAME,
        player: player,
    }).then(response => {
        return response.data;
    }).catch( error => {
        return null;
    });
    return playerJson;
}

export async function readPlayerJson(player) {
    const user = axios.get(`${LINK_API_READ_PLAYER}?action=${ACTION_READ_PLAYER}&player=${JSON.stringify(player)}`).then(response => {
        return response.data;
    }).catch( error => {
        return null;
    });
    return user;
}

export const readPlayerStorage = () => {
    if (window.localStorage.getItem(GET_PLAYER_STORAGE)) {
        const userStorage = JSON.parse(window.localStorage.getItem(GET_PLAYER_STORAGE));
        return userStorage;
    }
    return null;
}

export const updatePlayerStorage = (player) => {
    window.localStorage.setItem(GET_PLAYER_STORAGE, JSON.stringify(player));
}

export const deletePlayerStorage = () => {
    window.localStorage.removeItem(GET_PLAYER_STORAGE);
}

export const isErrorWalletAddress = (walletAddress) => {
    const errorWallet = { error: false, message: '' };

    if (!walletAddress.length) {
        errorWallet.error = true;
        errorWallet.message = ERROR_WALLET_EMPTY;
    } else if (walletAddress.length !== LENGTH_WALLET_ADDRESS) {
        errorWallet.error = true;
        errorWallet.message = ERROR_WALLET_LENGTH;
    } else if (walletAddress.search(DIGIT_WALLET_ADDRESS) === -1) {
        errorWallet.error = true;
        errorWallet.message = ERROR_WALLET_FORMAT;
    }
    return errorWallet;
}

export const isErrorTwitterName = (twitterName) => {
    const errorTwitter = { error: false, message: '' };

    if (!twitterName.length) {
        errorTwitter.error = true;
        errorTwitter.message = ERROR_TWITTER_NAME_EMPTY;
    }

    /*
    if( twitterNameExist(walletAddress) ){
        setErrorWallet(true);
        setMessageWallet("Wallet address already exist on the data!!!");
        return true;
    }
    */

    //setErrorTwitter(false)
    //setMessageTwitter("");
    return errorTwitter;
}