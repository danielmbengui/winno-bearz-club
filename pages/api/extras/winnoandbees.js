import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import fs, { readFile } from 'fs';

import { ACTION_GET_USER, ACTION_GET_USER_BY_WALLET, ACTION_GET_USER_BY_TWITTER, ACTION_ADD_USER, ACTION_SET_USER, ACTION_SAVE_IMAGE, METHOD_POST, METHOD_GET, ACTION_GET_USER_LIST, ACTION_GET_USER_LIST_COUNT } from '../../../lib/constants';
import { PATH_AIRDROP_LISTS } from '../../../components/Extras/WinnoAndBees/lib/constants';

const needle = require("needle");
//const fetch = require("node-fetch");
//import { readFile } from 'fs';
//import CONFIG_FOLLOWERS from '../../../redux/config/twitter/followers.json';
// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: [METHOD_GET, METHOD_POST, 'OPTIONS'],
  })
)

const buildDir = `${process.cwd()}/public/${PATH_AIRDROP_LISTS}`;
const metadataDir = `${buildDir}/winnobearznft.json`;

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  let status = 404;
  let json = 'merde';

  if (req.method === METHOD_POST) {
    let result = '';
    let data = '';
    if (req.body.action === ACTION_ADD_USER && req.body.player) {
      const player = req.body.player;
      console.log('playerRAD', req.body.player)
      try {
        result = 'Created';
        createPlayerDataJson(player);
        return res.status(200).json({ result: result, data: player });
      } catch (error) {
        result = 'Error on creation of the user';
        data = error.message;
        return res.status(400).json({ result: result, data: data });
      }
    } else if (req.body.action === ACTION_SET_USER && req.body.player) {
      const player = req.body.player;
      //console.log('data POST', req.body.walletAddress)
      //setUserByWallet(req.body.walletAddress, {twitterName: req.body.twitterName, maxScore:req.body.maxScore, airdropped:req.body.airdropped});
      //updatePlayerByWallet();
      try {
        result = 'Edited';
        updatePlayerByWallet(player);
        //return res.status(200).json('Edited');
        return res.status(200).json(player);
      } catch (error) {
        result = 'Error on edition of the user';
        data = error.message;
        return res.status(400).json(error.message);
      }

    }
    //console.log('method', req.method);
    //status = 'method post';
    //return res.status(200).json(status);
  } else if (req.method === METHOD_GET) {

    //console.log('player', JSON.parse(player))
    fs.readFile(metadataDir, (err, data) => {
      let userList = JSON.parse(data.toString());

      if (req.query.action === ACTION_GET_USER_LIST) {
        return res.status(200).json(userList);
      }
      
      if (req.query.action === ACTION_GET_USER_LIST_COUNT) {
        return res.status(200).json(userList.length);
      }

      if (req.query.action === ACTION_GET_USER) {
        const player = JSON.parse(req.query.player);
        let user = null;
        if (readPlayerByWallet(player.walletAddress, userList)) {
          user = readPlayerByWallet(player.walletAddress, userList);
          return res.status(200).json(user);
        }
        if (readPlayerByTwitter(player.twitterName, userList)) {
          user = readPlayerByTwitter(player.twitterName, userList);
          return res.status(200).json(user);
        }
      }

      if (req.query.action === ACTION_GET_USER_BY_WALLET) {
        const player = JSON.parse(req.query.player);
        const user = readPlayerByWallet(player.walletAddress, userList);
        //console.log('data GET one user WALLET', user)
        return res.status(200).json(user);
      }

      if (req.query.action === ACTION_GET_USER_BY_TWITTER) {
        const player = JSON.parse(req.query.player);
        const user = readPlayerByTwitter(player.twitterName, userList);
        //console.log('data GET one user WALLET', user)
        return res.status(200).json(user);
      }

      return res.status(405).json('METHOD DONT EXIST');
    });

    //console.log('method', req.method);
    //status = 200;
    //json = 'method get';
    //return res.status(200).json(json);
  } else {
    //console.log('method', 'NON PERMITTED');
    //status = 405;
    //json = 'merde';
    return res.status(405).json('METHOD NOT ALLOWED');
  }
}

const createPlayerDataJson = (dataPlayer) => {
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  let userList = [];
  if (fs.existsSync(metadataDir)) {
    //console.log('exist');
    fs.readFile(metadataDir, (err, list) => {
      userList = JSON.parse(list.toString());
      userList.push(dataPlayer);
      fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
    })
    //console.log('exist', ok);
  } else {
    console.log(' dont exist');
    userList.push(dataPlayer);
    fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
  }
}

const readPlayerByWallet = (walletAddress, userList) => {
  const user = userList.find(_user => {
    if (_user.walletAddress === walletAddress) {
      return _user;
    }
  });
  return user ? user : null;
}

const readPlayerByTwitter = (twitterName, userList) => {
  const user = userList.find(_user => {
    if (_user.twitterName === twitterName) {
      return _user;
    }
  });
  return user ? user : null;
}

const updatePlayerByWallet = async (data) => {
  if (fs.existsSync(metadataDir)) {

    fs.readFile(metadataDir, (err, list) => {
      let userList = JSON.parse(list.toString());
      userList.find((_user, index) => {
        if (_user.walletAddress === data.walletAddress) {
          userList[index] = data;
          return;
        }
      });
      //console.log('founded', userList[indexPlayer], indexPlayer)
      fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
    })
  } else {
    return false;
  }
}