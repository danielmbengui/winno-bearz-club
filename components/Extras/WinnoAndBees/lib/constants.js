
//-------------------     LINKS     --------------------//
export const LINK_API = `/api/extras/winnoandbees`;
export const LINK_API_ADD_PLAYER = `/api/extras/winnoandbees`;

//-------------------     PATHS     --------------------//
export const PATH_ASSET = `/extras/winnoandbees/`;
export const PATH_AIRDROP_LISTS = `${PATH_ASSET}airdrop`;
export const PATH_MUSIC = `${PATH_ASSET}music/`;

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
export const DEFAULT_PLAYER = {walletAddress: '', twitterName: '', bestScore: 0, whitelisted: false, airdropped: false, nGame: 0};
/*
export const GET_LOCAL_USER = 'local_user';
export const DEFAULT_PLAYER = {walletAddress: '', twitterName: '', bestScore: 0, airdropped: false};


export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';




export const ACTION_ADD_USER = 'add_user';
export const ACTION_SET_USER = 'set_user';
export const ACTION_SAVE_IMAGE = 'save_image';
export const ACTION_GET_USER = 'get_user';
export const ACTION_GET_USER_BY_WALLET = 'get_user_wallet';
export const ACTION_GET_USER_BY_TWITTER = 'get_user_twitter';



export const GET_LOCAL_SESSION_USER = 'user';

*/