import fs from 'fs';
import { PATH_FILE_PLAYERS, PATH_PUBLIC_DIR } from './constants';

export function getPlayerList() {
    if (!fs.existsSync(PATH_PUBLIC_DIR)) {
        fs.mkdirSync(PATH_PUBLIC_DIR, { recursive: true });
        fs.writeFileSync(PATH_FILE_PLAYERS, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(PATH_FILE_PLAYERS));
}

export function getPlayerByWallet(walletAddress) {
    let player = null;
    getPlayerList().find(_user => {
        if (_user.walletAddress === walletAddress) {
            player = _user;
        }
    });
    return player;
}

export function getPlayerByTwitter(twitterName) {
    let player = null;
    getPlayerList().find(_user => {
        if (_user.twitter.displayName) {
            if (_user.twitter.displayName.toLowerCase() === twitterName.toLowerCase()) {
                player = _user;
            }
        }
    });
    return player;
}

export function createPlayer(dataPlayer) {
    let created = false;
    try {
        if (!fs.existsSync(PATH_PUBLIC_DIR)) {
            fs.mkdirSync(PATH_PUBLIC_DIR, { recursive: true });
        }

        const playerWallet = getPlayerByWallet(dataPlayer.walletAddress);
        const playerTwitter = getPlayerByTwitter(dataPlayer.twitter.displayName);
        if (playerWallet || playerTwitter) {
            created = false;
        } else {
            let userList = [];
            if (fs.existsSync(PATH_FILE_PLAYERS)) {
                userList = getPlayerList();
            }
            userList.push(dataPlayer);
            fs.writeFileSync(PATH_FILE_PLAYERS, JSON.stringify(userList, null, 2));
            created = true;
        }
    } catch (error) {
        created = false;
    }
    return created;
}

export const updatePlayerByWallet = (data) => {
    let edited = false;
    if (fs.existsSync(PATH_FILE_PLAYERS)) {
        const userList = getPlayerList();
        userList.find((_user, index) => {
            if (_user.walletAddress === data.walletAddress) {
                userList[index] = data;
                edited = true;
            }
        });
        fs.writeFileSync(PATH_FILE_PLAYERS, JSON.stringify(userList, null, 2));
    }
    return edited;
}