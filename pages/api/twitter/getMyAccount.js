import fs from 'fs';

const Twitter = require('twitter-v2');
const userId = process.env.TWITTER_USER_ID;
const bearerToken = process.env.BEARER_TOKEN;

const client = new Twitter({
  bearer_token: bearerToken,
});

const buildDir = `${process.cwd()}/redux/config/twitter`;
const metadataDir = `${buildDir}/followers.json`;

const CONFIG = require(`${process.cwd()}/redux/config/config.json`);
const CONFIG_FOLLOWERS = require(buildDir + '/followers.json');
const followers = CONFIG_FOLLOWERS.followers;
const count = CONFIG_FOLLOWERS.count;

export default async function handler(req, res) {    
    let nextToken = "";
    let _followers = [];
    let _count = 0;
    let error = null;
    const {data, meta, _error} = await client.get(`users/${userId}`, { 
        //'pagination_token':'',
        //'max_results': 1_000,
        'user.fields':'profile_image_url',
        //'expansions':'pinned_tweet_id',
        //'tweet.fields':'created_at',
    }).then( (result) => {
        console.log({NEXT:result})
        return result;
    }).catch( (error) => {
        console.log({NEXT:error})
        return {data:[], meta:{result_count:0}, _error:error};
    });

    return res.status(200).json({ user:data, username:data.username, profile_image_url:data.profile_image_url /* includes: includes, meta: meta */ });
}


