import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';
import { ACTION_UPDATE_PLAYER, METHOD_POST } from './constants';
import { updatePlayerByWallet } from './functions';

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
        if (req.body.action === ACTION_UPDATE_PLAYER && req.body.player) {
            const player = req.body.player;
            const edited = updatePlayerByWallet(player);
            return res.status(200).json({ player: player, edited: edited });
        }
        return res.status(400).json("THE ACTION DON'T EXIST");
    }
    return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);
}
