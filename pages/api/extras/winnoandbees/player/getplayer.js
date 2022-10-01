import Cors from 'cors';
import initMiddleware from '../../../../../lib/init-middleware';
import { ACTION_READ_PLAYER, ACTION_READ_PLAYER_TWITTER, ACTION_READ_PLAYER_WALLET, METHOD_GET, TEXT_ACTION_DONT_EXIST } from '../constants';
import { getPlayerByTwitter, getPlayerByWallet } from '../functions';

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

  if (req.method === METHOD_GET ) {
    if (req.query.action === ACTION_READ_PLAYER_WALLET && req.query.walletAddress) {
      //const player = JSON.parse(req.query.player);
      const walletAddress = req.query.walletAddress;
      const playerJson = getPlayerByWallet(walletAddress);
      return res.status(200).json(playerJson);
    }

    if (req.query.action === ACTION_READ_PLAYER_TWITTER && req.query.displayName) {
      //const player = JSON.parse(req.query.player);
      const displayName = req.query.displayName;
      const playerJson = getPlayerByTwitter(displayName);
      return res.status(200).json(playerJson);
    }
    return res.status(400).json(TEXT_ACTION_DONT_EXIST);

  }
  return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);
}
