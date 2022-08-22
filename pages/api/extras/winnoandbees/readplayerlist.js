import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';
import { ACTION_DONT_EXIST, ACTION_READ_PLAYER_LIST, ACTION_READ_PLAYER_LIST_COUNT, METHOD_GET } from './constants';
import { getPlayerList } from './functions';

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
    if (req.query.action === ACTION_READ_PLAYER_LIST) {
      return res.status(200).json(getPlayerList());
    }

    if (req.query.action === ACTION_READ_PLAYER_LIST_COUNT) {
      return res.status(200).json(getPlayerList().length);
    }
    return res.status(400).json(ACTION_DONT_EXIST);
  }
  return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);
}
