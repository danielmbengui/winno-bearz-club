import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';
import { ACTION_CREATE_PLAYER, METHOD_PUT, } from './constants';
import { createPlayer } from './functions';

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET and POST
    methods: [METHOD_PUT],
  })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);
  
    if (req.method === METHOD_PUT) {
      console.log('METHOD POST enter', req.body.player)
      if (req.body.action === ACTION_CREATE_PLAYER && req.body.player) {
        const player = req.body.player;
        const created = createPlayer(player);
        //const created = createPlayerDataJson(player);
        return res.status(200).json({ player: player, created: created }); //201: created
      }
    }
    return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);
}
