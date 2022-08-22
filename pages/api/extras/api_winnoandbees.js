import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import fs from 'fs';


//import { ACTION_GET_USER, ACTION_GET_USER_BY_WALLET, ACTION_GET_USER_BY_TWITTER, ACTION_ADD_USER, ACTION_SET_USER, METHOD_POST, METHOD_GET, ACTION_GET_USER_LIST, ACTION_GET_USER_LIST_COUNT } from '../../../lib/constants';
//import { PATH_AIRDROP_LISTS } from '../../../components/Extras/WinnoAndBees/lib/constants';

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

    if (req.body.action === ACTION_SET_USER && req.body.player) {
      const player = req.body.player;
      const edited = updatePlayerByWallet(player);
      return res.status(200).json({ player: player, edited: edited });
    }
    return res.status(400).json("THE ACTION DON'T EXIST");
  } else if (req.method === METHOD_GET) {
    console.log('METHOD GET enter')
    if (req.query.action === ACTION_GET_USER_LIST) {
      //const userList = JSON.parse(fs.readFileSync(metadataDir));
      return res.status(200).json(getPlayerList());
    }

    if (req.query.action === ACTION_GET_USER_LIST_COUNT) {
      //const userList = JSON.parse(fs.readFileSync(metadataDir));
      return res.status(200).json(getPlayerList().length);
    }

    if (req.query.action === ACTION_GET_USER) {
      const player = JSON.parse(req.query.player);
      let playerJson = getPlayerByWallet(player.walletAddress);
      playerJson = !playerJson ? getPlayerByTwitter(player.twitter.displayName) : playerJson;
      console.log('GET_USER', playerJson)
      return res.status(200).json(playerJson);
    }

    if (req.query.action === ACTION_GET_USER_BY_WALLET) {
      const player = JSON.parse(req.query.player);
      const playerJson = getPlayerByWallet(player.walletAddress);
      return res.status(200).json(playerJson);
    }

    if (req.query.action === ACTION_GET_USER_BY_TWITTER) {
      const player = JSON.parse(req.query.player);
      const playerJson = getPlayerByTwitter(player.twitter.displayName);
      return res.status(200).json(playerJson);
    }
    return res.status(400).json("THE ACTION DON'T EXIST");
  }
  return res.status(405).json('METHOD NOT ALLOWED');
}

function getPlayerList() {
  return JSON.parse(fs.readFileSync(metadataDir));
}

function getPlayerByWallet(walletAddress) {
  let player = null;
  getPlayerList().find(_user => {
    if (_user.walletAddress === walletAddress) {
      player = _user;
    }
  });
  return player;
}

function getPlayerByTwitter(twitterName) {
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

const updatePlayerByWallet = (data) => {
  let edited = false;
  if (fs.existsSync(metadataDir)) {
    const userList = getPlayerList();
    userList.find((_user, index) => {
      if (_user.walletAddress === data.walletAddress) {
        userList[index] = data;
        edited = true;
      }
    });
    fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
  }
  return edited;

  /*
  if (fs.existsSync(metadataDir)) {
    fs.readFile(metadataDir, (err, list) => {
      let userList = JSON.parse(list.toString());
      userList.find((_user, index) => {
        if (_user.walletAddress === data.walletAddress) {
          userList[index] = data;
          return;
        }
      });
      fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
    })
  } else {
    return false;
  }
  */
}