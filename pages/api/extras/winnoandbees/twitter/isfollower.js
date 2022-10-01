import Cors from 'cors';
import initMiddleware from '../../../../../lib/init-middleware';
import { METHOD_GET, TEXT_ACTION_DONT_EXIST } from '../constants';

const { TwitterApi } = require('twitter-api-v2');
//const Twitter = require('twitter-v2');
require('dotenv').config({ path: "./vars/.env.local" });

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: [METHOD_GET],
    })
)

const WINNOBEARZ_TWITTER_ID = process.env.NEXT_PUBLIC_TWITTER_USER_ID;

export default async function handler(req, res) {
    await cors(req, res);
    if ( req.method === METHOD_GET && req.query.uid && req.query.token && req.query.secret  ) {
        //const player = JSON.parse(req.query.player);
        const uid = req.query.uid;
        const token = req.query.token;
        const secret = req.query.secret;
        const userClient = new TwitterApi({
            appKey: process.env.NEXT_PUBLIC_API_KEY,
            appSecret: process.env.NEXT_PUBLIC_API_KEY_SECRET,
            // Following access tokens are not required if you are
            // at part 1 of user-auth process (ask for a request token)
            // or if you want a app-only client (see below)
            accessToken: token,
            accessSecret: secret,
            //accessToken: process.env.NEXT_PUBLIC_API_CLIENT_ID,
            //accessSecret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
            
        });
        const v1Client = userClient.v1;
        const v2Client = userClient.v2;
        const { relationship } = await v1Client.friendship({ source_id: uid, target_id: WINNOBEARZ_TWITTER_ID });
        const isFollower = relationship.source.following;
        console.log('relation twitter', relationship);
        //return res.status(400).json(TEXT_ACTION_DONT_EXIST);
        return res.status(200).json(isFollower);
    }
    return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);

}