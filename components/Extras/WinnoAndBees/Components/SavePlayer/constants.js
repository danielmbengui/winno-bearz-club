
export const PROJECT_NAME = 'winnoandbees';

//-------------------     ACTIONS     --------------------//
export const ACTION_CREATE_PLAYER = 'create_player';
export const ACTION_READ_PLAYER = 'read_player';
export const ACTION_READ_PLAYER_WALLET = 'read_player_wallet';
export const ACTION_READ_PLAYER_TWITTER_UID = 'read_player_twitter_uid';
export const ACTION_READ_PLAYER_TWITTER_NAME = 'read_player_twitter_name';
export const ACTION_READ_PLAYER_LIST = 'read_player_list';
export const ACTION_READ_PLAYER_LIST_COUNT = 'read_player_list_count';
export const ACTION_UPDATE_PLAYER_BY_WALLET = 'update_player_by_wallet';
export const ACTION_UPDATE_PLAYER_BY_TWITTER_UID = 'update_player_by_twitter_id';
export const ACTION_UPDATE_PLAYER_BY_TWITTER_NAME = 'update_player_by_twitter_name';

//-------------------     LINKS     --------------------//
export const LINK_API_GET_IS_FOLLOWER = `/api/extras/${PROJECT_NAME}/getisfollower?player=`;

//export const LINK_API = `/api/extras/api_winnoandbees`;
//export const LINK_API = `/api/extras/winnoandbees`;
//export const LINK_API_GET_PLAYER = `/api/extras/${PROJECT_NAME}/getplayer`;
export const LINK_API_CREATE_PLAYER = `/api/extras/${PROJECT_NAME}/createplayer`;
export const LINK_API_UPDATE_PLAYER = `/api/extras/${PROJECT_NAME}/updateplayer`;
export const LINK_API_READ_PLAYER = `/api/extras/${PROJECT_NAME}/readplayer`;
export const LINK_API_READ_PLAYER_LIST = `/api/extras/${PROJECT_NAME}/readplayerlist`;

//-------------------     STORAGE     --------------------//
export const GET_PLAYER_STORAGE = "player";

//-------------------     UTILS     --------------------//
export const DIGIT_WALLET_ADDRESS = '0x';
export const LENGTH_WALLET_ADDRESS = 42;

//-------------------     TEXTS     --------------------//
export const ERROR_WALLET_EMPTY = "wallet address can't be empty !!!";
export const ERROR_WALLET_FORMAT = "wallet address must start with " + DIGIT_WALLET_ADDRESS + "!!!";
export const ERROR_WALLET_LENGTH = "wallet address must have " + LENGTH_WALLET_ADDRESS + " hexadecimal digits!!!";
export const ERROR_TWITTER_NAME_EMPTY = "twitter username can't be empty !!!";
export const ERROR_GAME_STOPPED = "Game stopped because you leave 'fullscreen' or/and orientation became on 'portrait mode'.";