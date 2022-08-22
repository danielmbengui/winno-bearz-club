//-------------------     METHODS     --------------------//
export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';

//-------------------     ACTIONS     --------------------//
export const ACTION_CREATE_PLAYER = 'create_player';

//-------------------     PATHS     --------------------//
export const PATH_PUBLIC_DIR = `${process.cwd()}/public/extras/winnoandbees/airdrop`;
export const PATH_FILE_PLAYERS = `${PATH_PUBLIC_DIR}/winnoandbees.json`;



//-------------------     PATHS     --------------------//





export const ACTION_ADD_USER = 'add_user';
export const ACTION_SET_USER = 'set_user';
export const ACTION_SAVE_IMAGE = 'save_image';
export const ACTION_GET_USER = 'get_user';
export const ACTION_GET_USER_BY_WALLET = 'get_user_wallet';
export const ACTION_GET_USER_BY_TWITTER = 'get_user_twitter';
export const ACTION_GET_USER_LIST = 'get_list_player';
export const ACTION_GET_USER_LIST_COUNT = 'get_list_player_count';


export const GET_LOCAL_USER = 'local_user';
export const GET_LOCAL_SESSION_USER = 'user';


//-------------------     LINKS     --------------------//
export const LINK_API = `/api/extras/api_winnoandbees`;
//export const LINK_API = `/api/extras/winnoandbees`;
export const LINK_API_ADD_PLAYER = `/api/extras/winnoandbees`;



//-------------------     UTILS     --------------------//
export const DIGIT_WALLET_ADDRESS = '0x';
export const LENGTH_WALLET_ADDRESS = 42;

//-------------------     TEXTS     --------------------//
export const ERROR_WALLET_EMPTY = "wallet address can't be empty !!!";
export const ERROR_WALLET_FORMAT = "wallet address must start with " + DIGIT_WALLET_ADDRESS + "!!!";
export const ERROR_WALLET_LENGTH = "wallet address must have " + LENGTH_WALLET_ADDRESS + " hexadecimal digits!!!";
export const ERROR_TWITTER_NAME_EMPTY = "twitter username can't be empty !!!";
export const ERROR_GAME_STOPPED = "Game stopped because you leave 'fullscreen' or/and orientation became on 'portrait mode'.";


//


//-------------------     STORAGE     --------------------//
export const GET_PLAYER_STORAGE = "player";
export const DEFAULT_PLAYER = {
    walletAddress: '', 
    twitter : {
        uid: '',
        displayName: '',
        photoURL: '',
    },
    //twitterName: '',
    whitelisted: false, 
    airdropped: false, 
    bestScore: 0, 
    nGames: 0,
    nWins: 0,
    nLooses: 0,
};