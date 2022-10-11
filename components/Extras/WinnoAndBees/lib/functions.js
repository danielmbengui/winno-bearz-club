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

export function isMobile() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        return true;
    }
    return false;
}

export function openFullscreen(canvas) {
    const fullscreenEnabled = document.fullscreenEnabled 
  	|| document.mozFullscreenEnabled 
  	|| document.webkitFullscreenEnabled;
    
    if( fullscreenEnabled ){
        const requestFullscreen =
        canvas.current.requestFullscreen ||
        canvas.current.mozRequestFullscreen ||
        canvas.current.webkitRequestFullScreen;
        requestFullscreen()
	.then(() => {
        screen.orientation.lock("landscape-primary").then(function () {
            // _LOCK_BUTTON.style.display = 'none';
            // _UNLOCK_BUTTON.style.display = 'block';
            //game.stopped = false;
        })
            .catch(function (error) {
                //game.stopped = true;
                alert(error);
            });
    })
	.catch(() => console.error("Can't go full T_T"));
/*
    if (canvas.current.requestFullscreen) {
        canvas.current.requestFullscreen();
    } else if (canvas.current.webkitRequestFullscreen) {
        canvas.current.webkitRequestFullscreen();
    } else if (canvas.current.msRequestFullscreen) { 
        canvas.current.msRequestFullscreen();
    }

    screen.orientation.lock("landscape-primary").then(function () {
        // _LOCK_BUTTON.style.display = 'none';
        // _UNLOCK_BUTTON.style.display = 'block';
        //game.stopped = false;
    })
        .catch(function (error) {
            //game.stopped = true;
            alert(error);
        });
*/
    
    }  
}

export function closeFullscreen() {
    const fullscreenEnabled = document.fullscreenEnabled 
  	|| document.mozFullscreenEnabled 
  	|| document.webkitFullscreenEnabled;
    
    if( fullscreenEnabled ){
        /*
        const exitFullscreen = document.exitFullscreen
	|| document.mozExitFullscreen
	|| document.webkitExitFullscreen;

    exitFullscreen()
	.then(() => {
        screen.orientation.unlock();
    })
	.catch((error) => {
        alert(error);
    });
    */

        

        if( document ){
            if(document.exitFullscreen) {
                document.exitFullscreen();
              } else if(document.mozExitFullScreen) {
                document.mozExitFullScreen();
              } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              }
        }
    }
    
}