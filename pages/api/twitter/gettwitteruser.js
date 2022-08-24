import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import fs, { readFile } from 'fs';
import {database} from "../../../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore"; 

import {User} from "../../../classes/UserClass";

const { TwitterApi } = require('twitter-api-v2');
//const Twitter = require('twitter-v2');
require('dotenv').config({path: "./vars/.env.local"});


const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )

const userId = process.env.NEXT_PUBLIC_TWITTER_USER_ID;

//const configDir = `${process.cwd()}/redux/config/twitter/followers.json`;
//const buildDir = `${process.cwd()}/redux/config/twitter`;
//const metadataDir = `${buildDir}/followers.json`;

//FULLINES
export default async function handler(req, res) {
    // Run cors
    //await cors(req, res);
    var token = '';
  var secret = '';
  var connectedUserId = '';
  var targetIdTweet = '';
    if( req.method === 'POST' ){
      token = req.body.token;
    secret = req.body.secret;
   connectedUserId = req.body.connectedUserId;
   targetIdTweet = req.body.targetIdTweet;
    }else  if( req.method === 'GET' ){
       token = req.query.token;
      secret = req.query.secret;
      connectedUserId = req.query.connectedUserId;
      targetIdTweet = req.query.targetIdTweet;
  }
  console.log('User matching search:', {token:token, secret:secret, connectedUserId:connectedUserId, targetIdTweet:targetIdTweet});

    if( req.method === 'POST' || req.method === 'GET' ){
        const userClient = new TwitterApi({
            appKey: process.env.NEXT_PUBLIC_API_KEY,
            appSecret: process.env.NEXT_PUBLIC_API_KEY_SECRET,
            // Following access tokens are not required if you are
            // at part 1 of user-auth process (ask for a request token)
            // or if you want a app-only client (see below)
            accessToken: token,
            accessSecret: secret,
          });
          const v1Client = userClient.v1;
        const v2Client = userClient.v2;
        /*
        const foundUsers = await userClient.v1.searchUsers('Fullines', {
          "screen_name": 'FullinesApp'
        });

        */
        const limit = v1Client._requestMaker.rateLimits;
        //const tweet = await userClient.v1.singleTweet('1529570709386809345');
        //const friendships = await v1Client.friendships({ user_id: [userId] });
        const { relationship } = await v1Client.friendship({ source_id: connectedUserId, target_id: userId });
        const users = await v2Client.tweetLikedBy(targetIdTweet);
        const isLikedTargetTweet = await likedTargetTweet(v2Client, targetIdTweet, connectedUserId);
        const isRetweetedTargetTweet = await retweetedTargetTweet(v2Client, targetIdTweet, connectedUserId);
        const isQuotedTargetTweet = await quotedTargetTweet(v2Client, targetIdTweet, connectedUserId);
        const tweets = await v2Client.tweets(targetIdTweet);
        //const users = await client.v2.tweetRetweetedBy('20');
        
        //console.log(users.data[0].id);
        // use an async for-of to iterate over the multiple result pages!
        /*
        for await (const user of foundUsers) {
          console.log('User matching search:', user.screen_name);
        }
        fdsjhdsfjihgfdkj
        dsu9juuuuf7fdzgdjndhjf{
          nfjiiruuufufhnmfjfj
          hgf
          fdfgjhjldsjvjhh vhguoklddfzskukkbéjhkfsshghjfdsjkldshjfjehgezgdvjfzfv
          hfhsgfgsgfhsj
          edhdghf
          svsfabajsdm
        }
        
        */
        //const appOnlyClientFromConsumer = await userClient.appLogin();
        //console.log('searched', foundUsers)
        //console.log('relationship', relationship);
        let quotes = await v2Client.quotes(targetIdTweet, { expansions: ['author_id']});
        console.log('Limit', limit);
       // const user = new User(relationship.source.id_str, relationship.source.following);
        //console.log(v1Client._requestMaker.rateLimits, v2Client._requestMaker.rateLimits)
       // "username": "__Cryptodragon",
      //"profile_image_url": "https://pbs.twimg.com/profile_images/1526190175776391169/9QLe-ZVV_normal.jpg",
     // "created_at": "2021-12-07T20:38:10.000Z",
      //"name": "Isaac Otori",
      //"id": "1468318316330725378"
        //console.log({CLIENT_USER_TWITTER: v1Client});
        //console.log({CLIENT_USER_TWITTER_: v2Client});
        //User
        //return res.status(200).json({ user: new User(connectedUserId, relationship.source.following)});
        

        const tweetOfId20 = await v2Client.singleTweet(targetIdTweet, {
          expansions: [
            'entities.mentions.username',
            'author_id',
          ],
        });
        return res.status(200).json({tweet: tweetOfId20})
        //return res.status(200).json({ isFollower:relationship.source.following, isLikedTargetTweet:isLikedTargetTweet, isRetweetedTargetTweet:isRetweetedTargetTweet, isQuotedTargetTweet:isQuotedTargetTweet});
    }else{
        return res.status(400).json({ error:'no method post' });
    }  
}


const likedTargetTweet = async (_v2Client, _targetIdTweet, _idUser) => {
  let _found = false;
  let _tabLiked = await _v2Client.tweetLikedBy(_targetIdTweet);
  let _tabLikedFinal = _tabLiked.data;
  _tabLikedFinal.map( (user) => {
    if( user.id === _idUser ){
      //console.log({TRUUUUUE: user})
      _found = true;
    }
    //console.log({EEEEEL: user})
  });
  return _found;
}

const retweetedTargetTweet = async (_v2Client, _targetIdTweet, _idUser) => {
  let _found = false;
  let _tabLiked = await _v2Client.tweetRetweetedBy(_targetIdTweet);
  let _tabLikedFinal = _tabLiked.data ? _tabLiked.data : [];
  _tabLikedFinal.map( (user) => {
    if( user.id === _idUser ){
      //console.log({TRUUUUUE: user})
      _found = true;
    }
    //console.log({EEEEEL: user})
  });
  return _found;
}

const quotedTargetTweet = async (_v2Client, _targetIdTweet, _idUser) => {
  let _found = false;
  let _tabLiked = await _v2Client.quotes(_targetIdTweet, { expansions: ['author_id']});
  let _tabLikedFinal = _tabLiked._realData.data ? _tabLiked._realData.data : [];
  _tabLikedFinal.map( (user) => {
    if( user.author_id === _idUser ){
      _found = true;
    }
  });
  return _found;
}