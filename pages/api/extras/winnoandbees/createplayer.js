import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';
import fs from 'fs';


//import { ACTION_ADD_USER, METHOD_POST } from '../../../../lib/constants';
//import * as constants from '../../../../lib/constants';
import { getPlayerByTwitter, getPlayerByWallet, getPlayerList } from '../winnoandbees';
import { ACTION_CREATE_PLAYER, METHOD_POST, PATH_FILE_PLAYERS, PATH_PUBLIC_DIR } from './constants';
//import * as constants from './constants';
//import { PATH_AIRDROP_LISTS } from '../../../../components/Extras/WinnoAndBees/lib/constants';


//const METHOD_POST = 'POST';
//const ACTION_CREATE_PLAYER = 'create_player';
//const ACTION_ADD_USER = 'add_user';
//const PATH_ASSET = `/extras/winnoandbees/`;
//const PATH_AIRDROP_LISTS = `/extras/winnoandbees/airdrop`;
/*
const ACTION_SET_USER = 'set_user';
const ACTION_GET_USER = 'get_user';
const ACTION_GET_USER_BY_WALLET = 'get_user_wallet';
const ACTION_GET_USER_BY_TWITTER = 'get_user_twitter';
const ACTION_GET_USER_LIST = 'get_list_player';
const ACTION_GET_USER_LIST_COUNT = 'get_list_player_count';

*/

//const PATH_PUBLIC_DIR = `${process.cwd()}/public/${PATH_AIRDROP_LISTS}`;
//const PATH_FILE_PLAYERS = `${PATH_PUBLIC_DIR}/winnoandbees.json`;

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET and POST
    methods: [METHOD_POST],
  })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);
  
    if (req.method === METHOD_POST) {
      console.log('METHOD POST enter', req.body)
      if (req.body.action === ACTION_CREATE_PLAYER && req.body.player) {
        const player = req.body.player;
        const created = createPlayerDataJson(player);
        return res.status(200).json({ player: player, created: created }); //201: created
      }
    }
}

const createPlayerDataJson = (dataPlayer) => {
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