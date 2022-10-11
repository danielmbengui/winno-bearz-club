//-------------------     METHODS     --------------------//
export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';

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
//-------------------     PATHS     --------------------//
export const PATH_PUBLIC_DIR = `${process.cwd()}/public/extras/winnoandbees/list`;
export const PATH_FILE_PLAYERS = `${PATH_PUBLIC_DIR}/players.json`;


//-------------------     TEXTS     --------------------//
export const TEXT_ACTION_DONT_EXIST = `THE ACTION DON'T EXIST`;