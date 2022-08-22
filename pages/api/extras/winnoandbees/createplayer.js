import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';
import fs from 'fs';


import { ACTION_GET_USER, ACTION_GET_USER_BY_WALLET, ACTION_GET_USER_BY_TWITTER, ACTION_ADD_USER, ACTION_SET_USER, METHOD_POST, METHOD_GET, ACTION_GET_USER_LIST, ACTION_GET_USER_LIST_COUNT } from '../../../../lib/constants';
import { PATH_AIRDROP_LISTS } from '../../../../components/Extras/WinnoAndBees/lib/constants';

/*
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const ACTION_ADD_USER = 'add_user';
const ACTION_SET_USER = 'set_user';
const ACTION_GET_USER = 'get_user';
const ACTION_GET_USER_BY_WALLET = 'get_user_wallet';
const ACTION_GET_USER_BY_TWITTER = 'get_user_twitter';
const ACTION_GET_USER_LIST = 'get_list_player';
const ACTION_GET_USER_LIST_COUNT = 'get_list_player_count';
const PATH_ASSET = `/extras/winnoandbees/`;
const PATH_AIRDROP_LISTS = `${PATH_ASSET}airdrop`;
*/

const buildDir = `${process.cwd()}/public/${PATH_AIRDROP_LISTS}`;
const metadataDir = `${buildDir}/winnoandbees.json`;

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET and POST
    methods: [METHOD_GET, METHOD_POST],
  })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);
  
    if (req.method === METHOD_POST) {
      console.log('METHOD POST enter', req.body)
      if (req.body.action === ACTION_ADD_USER && req.body.player) {
        const player = req.body.player;
        const created = createPlayerDataJson(player);
        return res.status(200).json({ player: player, created: created }); //201: created
      }
    }
}

const createPlayerDataJson = (dataPlayer) => {
  let created = false;
  try {
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    const playerWallet = getPlayerByWallet(dataPlayer.walletAddress);
    const playerTwitter = getPlayerByTwitter(dataPlayer.twitter.displayName);
    if (playerWallet || playerTwitter) {
      created = false;
    } else {
      let userList = [];
      if (fs.existsSync(metadataDir)) {
        userList = getPlayerList();
      }
      userList.push(dataPlayer);
      fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
      created = true;
    }
  } catch (error) {
    created = false;
  }
  return created;
}