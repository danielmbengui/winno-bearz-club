import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';
import { ACTION_READ_PLAYER, ACTION_READ_PLAYER_TWITTER, ACTION_READ_PLAYER_WALLET, METHOD_GET } from './constants';
import { getPlayerByTwitter, getPlayerByWallet } from './functions';

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET and POST
    methods: [METHOD_GET],
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  if (req.method === METHOD_GET) {
    if (req.query.action === ACTION_READ_PLAYER) {
      const player = JSON.parse(req.query.player);
      let playerJson = getPlayerByWallet(player.walletAddress);
      playerJson = !playerJson ? getPlayerByTwitter(player.twitter.displayName) : playerJson;
      console.log('GET_USER', playerJson)
      return res.status(200).json(playerJson);
    }

    if (req.query.action === ACTION_READ_PLAYER_WALLET) {
      const player = JSON.parse(req.query.player);
      const playerJson = getPlayerByWallet(player.walletAddress);
      return res.status(200).json(playerJson);
    }

    if (req.query.action === ACTION_READ_PLAYER_TWITTER) {
      const player = JSON.parse(req.query.player);
      const playerJson = getPlayerByTwitter(player.twitter.displayName);
      return res.status(200).json(playerJson);
    }
    return res.status(400).json("THE ACTION DON'T EXIST");

  }
  return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);
}
