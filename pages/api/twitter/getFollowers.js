import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import fs, { readFile } from 'fs';
import {database} from "../../../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore"; 
require('dotenv').config({path: "./vars/.env.local"});
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )

const Twitter = require('twitter-v2');

const userId = process.env.NEXT_PUBLIC_TWITTER_USER_ID;
const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;

const client = new Twitter({
  bearer_token: bearerToken,
});

//const configDir = `${process.cwd()}/redux/config/twitter/followers.json`;
//const buildDir = `${process.cwd()}/redux/config/twitter`;
//const metadataDir = `${buildDir}/followers.json`;

export default async function handler(req, res) {
    // Run cors
    //await cors(req, res);
    
    let nextToken = "";
    let _followers = [];
    let _count = 0;
    let _error = null;
    if( req.method === 'POST' ){
        do{                
            const {data, meta, error} = await client.get(`users/${userId}/followers`, { 
                'max_results': 1_000,
                'user.fields':'profile_image_url,created_at',
            }).then( (result) => {
                return result;
            }).catch( (error) => {
                console.log({ERROR____:error})
                return {data:[], meta:{result_count:0}, error:error};
            });
            
            _followers = _followers.concat(data);
            _count += meta.result_count;
            _error = error;
            nextToken = meta.next_token ? '?pagination_token='+meta.next_token : '';
        }while( nextToken !== '' );
    }else{
        _error = 'No POST method';
        return res.status(405).json({ followers: [], count: -1, error:_error  });
    }

    return res.status(200).json({ followers: _followers, count: _count });
}

