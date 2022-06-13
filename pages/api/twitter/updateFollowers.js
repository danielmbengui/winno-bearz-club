import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import fs, { readFile } from 'fs';
import {database} from "../../../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore"; 
const needle = require("needle");
//const fetch = require("node-fetch");
//import { readFile } from 'fs';
//import CONFIG_FOLLOWERS from '../../../redux/config/twitter/followers.json';
// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )
//require('dotenv').config({path: "./vars/.env.local"});
const Twitter = require('twitter-v2');

const userId = process.env.NEXT_PUBLIC_TWITTER_USER_ID;
const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;

const client = new Twitter({
  bearer_token: bearerToken,
});

const configDir = `${process.cwd()}/redux/config/twitter/followers.json`;
const buildDir = `${process.cwd()}/redux/config/twitter`;
const metadataDir = `${buildDir}/followers.json`;


//const CONFIG = require(`${process.cwd()}/redux/config/config.json`);
//const CONFIG_FOLLOWERS = require(buildDir + '/followers.json');
//const { CONFIG_FOLLOWERS } = JSON.parse(fs.readFileSync(buildDir + '/followers.json'));


//1529618473873289221 eliass
//1468318316330725378 cryptodragon


export default async function handler(req, res) {
    // Run cors
    await cors(req, res);
    //const CONFIG = require('../../../redux/config/twitter/followers.json');
    let CONFIG = require('../../../redux/config/twitter/followers.json');;
    readFile(configDir, (err, data) => {
        if (err) return {followers:[], count:0};
        CONFIG = JSON.parse(data.toString());
            console.log({IIIIIID:JSON.parse(data.toString())}) 
    });
    const followers = CONFIG.followers;
    const count = CONFIG ? CONFIG.count : 0;
    

    
    //console.log({IIIIIID_2: req.body.encodePost + " / " + encodePost}) 
    //console.log({IIIIIID_3: req.body})    
    let nextToken = "";
    let _followers = [];
    let _count = 0;
    let _error = null;
    if( req.method === 'POST'/* && req.body.encodePost === encodePost*/ ){
        do{                
            const {data, meta, error} = await client.get(`users/${userId}/followers`, { 
                'max_results': 1_000,
                'user.fields':'profile_image_url,created_at',
            }).then( (result) => {
                //console.log({NEXT:result.meta.next_token})
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
        return res.status(405).json({ followers: followers, count: count, error:_error  });
    }

    updateFollowers({followers:_followers, count: _count});

/*
    _followers.map( async (follower,) => {
        //const ok = {username: follower.username, name: follower.name, profile_image_url: follower.profile_image_url, created_at:follower.created_at,};
        //await database.collection('followers').doc('list').collection('follower').doc(follower.id).set(follower)
    });
    */
    //await database.collection('followers').doc('list').collection('follower').doc('1529618473873289221').set({name:'Eliass'});
      //console.log({YES: followers.length})
    //await database.collection('followers').doc('count').set({count: 14,})
    return res.status(200).json({ followers: _followers, count: _count /* includes: includes, meta: meta */ });
}

const updateFollowers = (_data) => { 
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }

    if (fs.existsSync(metadataDir)) {
        fs.rmSync(metadataDir, { recursive: true });
    }
    fs.writeFileSync(metadataDir, JSON.stringify(_data, null, 2));
    console.log({ok:'FILE UPDATED'})
};

