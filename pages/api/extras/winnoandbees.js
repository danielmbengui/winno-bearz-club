import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import fs from 'fs';

import { ACTION_GET_USER, ACTION_GET_USER_BY_WALLET, ACTION_GET_USER_BY_TWITTER, ACTION_ADD_USER, ACTION_SET_USER, METHOD_POST, METHOD_GET, ACTION_GET_USER_LIST, ACTION_GET_USER_LIST_COUNT } from '../../../lib/constants';
import { PATH_AIRDROP_LISTS } from '../../../components/Extras/WinnoAndBees/lib/constants';

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

  if (req.method === METHOD_POST) {
    let result = '';
    
    if (req.body.action === ACTION_ADD_USER && req.body.player) {
      const player = req.body.player;
      console.log('playerRAD', req.body.player)
      result = 'Created';
        createPlayerDataJson(player);
        return res.status(200).json({ result: result, data: player });
    }
    if (req.body.action === ACTION_SET_USER && req.body.player) {
      const player = req.body.player;
      result = 'Edited';
        updatePlayerByWallet(player);
        return res.status(200).json(player);
    }
  } else if (req.method === METHOD_GET) {
    fs.readFile(metadataDir, (err, data) => {
      let userList = JSON.parse(data.toString());

      if (req.query.action === ACTION_GET_USER_LIST) {
        return res.status(200).json({userList});
      }
      
      if (req.query.action === ACTION_GET_USER_LIST_COUNT) {
        return res.status(200).json(userList.length);
      }

      if (req.query.action === ACTION_GET_USER) {
        userList.find(_user => {
          if (_user.walletAddress === walletAddress) {
            return res.status(200).json(_user);
          }
        });
        userList.find(_user => {
          if (_user.twitterName === twitterName) {
            return res.status(200).json(_user);
          }
        });
      }

      if (req.query.action === ACTION_GET_USER_BY_WALLET) {
        userList.find(_user => {
          if (_user.walletAddress === walletAddress) {
            return res.status(200).json(_user);
          }
        });
        return res.status(200).json(user);
      }

      if (req.query.action === ACTION_GET_USER_BY_TWITTER) {
        userList.find(_user => {
          if (_user.twitterName === twitterName) {
            return res.status(200).json(_user);
          }
        });
        //console.log('data GET one user WALLET', user)
        return res.status(200).json(user);
      }

      return res.status(405).json('METHOD DONT EXIST');
    });
  } else {
    return res.status(405).json('METHOD NOT ALLOWED');
  }
}

const createPlayerDataJson = (dataPlayer) => {
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  let userList = [];
  if (fs.existsSync(metadataDir)) {
    fs.readFile(metadataDir, (err, list) => {
      userList = JSON.parse(list.toString());
      userList.push(dataPlayer);
      fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
    })
  } else {
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
      fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
    })
  } else {
    return false;
  }
}