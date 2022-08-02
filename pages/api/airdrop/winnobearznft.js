import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import fs, { readFile } from 'fs';
import {database} from "../../../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore"; 

import { ACTION_GET_USER, ACTION_GET_USER_BY_WALLET, ACTION_GET_USER_BY_TWITTER, ACTION_ADD_USER, ACTION_SET_USER } from '../../../lib/constants';

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
const buildDir = `${process.cwd()}/public/lists/airdrop`;
const metadataDir = `${buildDir}/winnobearznft.json`;
//const metadataDirAbsolute = `/lists/airdrop/winnobearznft.json`;
const metadataDirAbsolute = '../../../redux/config/twitter/followers.json';


//const CONFIG = require(`${process.cwd()}/redux/config/config.json`);
//const CONFIG_FOLLOWERS = require(buildDir + '/followers.json');
//const { CONFIG_FOLLOWERS } = JSON.parse(fs.readFileSync(buildDir + '/followers.json'));


//1529618473873289221 eliass
//1468318316330725378 cryptodragon


export default async function handler(req, res) {
    // Run cors
    await cors(req, res);
    //const CONFIG = require('../../../redux/config/twitter/followers.json');
    /*
    let CONFIG = require('../../../redux/config/twitter/followers.json');
    readFile(configDir, (err, data) => {
        if (err) return {followers:[], count:0};
        CONFIG = JSON.parse(data.toString());
            console.log({IIIIIID:JSON.parse(data.toString())}) 
    });
    const followers = CONFIG.followers;
    const count = CONFIG ? CONFIG.count : 0;
    */
    

    
    //console.log({IIIIIID_2: req.body.encodePost + " / " + encodePost}) 
    //console.log({IIIIIID_3: req.body})    
    let nextToken = "";
    let _followers = [];
    let _count = 0;
    let _error = null;
    
    if( req.method === 'POST' ){
        if( req.body.action === ACTION_ADD_USER ){
            console.log('data POST', req.body.walletAddress)
            addUser({walletAddress:req.body.walletAddress, twitterName: req.body.twitterName, maxScore:0, airdropped:false});
            return res.status(200).json('Added');
        }else if( req.body.action === ACTION_SET_USER ){
            console.log('data POST', req.body.walletAddress)
            setUserByWallet(req.body.walletAddress, {twitterName: req.body.twitterName, maxScore:req.body.maxScore, airdropped:req.body.airdropped});
            return res.status(200).json('Added');
        }

        
    }else if( req.method === 'GET' ){
        //console.log('maqaaaart', req.query.walletAddress)
        fs.readFile(metadataDir, (err, data) => {
            let userList = JSON.parse(data.toString());
            //let listAirdrop = dataJson.listAirdrop;
            //let count = listAirdrop.length;

            if( req.query.action === 'get_list' ){
                return res.status(200).json(listAirdrop);
            }else if( req.query.action === 'get_count' ){
                return res.status(200).json(listAirdrop.length);
            }else if( req.query.action === ACTION_GET_USER_BY_WALLET ){
                let walletAddress = req.query.walletAddress;

                const user = userList.find(_user => {
                    if( _user.walletAddress === walletAddress ){
                        return _user;
                    }
                });
                console.log('data GET one user WALLET', userList, 'user', user)
                return res.status(200).json(user ? user : null);
            }else if( req.query.action === ACTION_GET_USER_BY_TWITTER ){
                let twitterName = req.query.twitterName;
                
                const user = userList.find(_user => {
                    if( _user.twitterName === twitterName ){
                        return _user;
                    }
                });
                console.log('data GET one user TWITTER', user.walletAddress.length, 'user', user)
                return res.status(200).json(user ? user : null);
            }else if( req.query.action === ACTION_GET_USER ){
                let walletAddress = '';
                let twitterName = '';
                
                if( req.query.walletAddress ){
                    walletAddress = req.query.walletAddress;
                }

                if( req.query.twitterName ){
                    twitterName = req.query.twitterName;
                }
                
                const user = userList.find(_user => {
                    if( _user.walletAddress === walletAddress || _user.twitterName === twitterName ){
                        //count++;
                        return _user;
                    }
                });
                
                //userTest = user;
                //console.log('data liiiiiiiist', user ? user : null, 'coooount', count)
                console.log('data GET one user', userList, 'user', user)
                return res.status(200).json(user ? user : null);
            }
        })        
    }else{
        _error = 'No GET or POST method';
        return res.status(405).json(_error);
    }
    
    //updateAirdrop({listAirdrop:_followers, count: _count});
    
    
/*
    _followers.map( async (follower,) => {
        //const ok = {username: follower.username, name: follower.name, profile_image_url: follower.profile_image_url, created_at:follower.created_at,};
        //await database.collection('followers').doc('list').collection('follower').doc(follower.id).set(follower)
    });
    */
    //await database.collection('followers').doc('list').collection('follower').doc('1529618473873289221').set({name:'Eliass'});
      //console.log({YES: followers.length})
    //await database.collection('followers').doc('count').set({count: 14,})
    //return res.status(200).json({ listAirdrop: _followers, count: _count /* includes: includes, meta: meta */ });
}

const setUserByWallet = async(walletAddress, data) => {
    //let userList = [];

    if (fs.existsSync(metadataDir)) {
        //console.log('exist')
        //const CONFIG_FOLLOWERS = require(metadataDirAbsolute);
        
        fs.readFile(metadataDir, (err, list) => {
            let userList = JSON.parse(list.toString());
            userList.find(_user => {
                if( _user.walletAddress === walletAddress ){
                    _user.twitterName = data.twitterName ? data.twitterName : _user.twitterName;
                    _user.airdropped = data.airdropped ? data.airdropped : _user.airdropped;
                    _user.score = data.score ? data.score : _user.score;
                    return _user;
                }
            });
            fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
        })
    }else{
        return false;
    }
}

const addUser = async(dataUser) => {
    if ( !fs.existsSync(buildDir) ) {
        fs.mkdirSync(buildDir, { recursive: true });
    }

    let userList = [];
    //let count = 0;
    //console.log('count test au bol', count)
    if (fs.existsSync(metadataDir)) {
        //console.log('exist')
        //const CONFIG_FOLLOWERS = require(metadataDirAbsolute);
        
        fs.readFile(metadataDir, (err, data) => {
            userList = JSON.parse(data.toString());
            //console.log('data liiiiiiiist', dataJson)
            //console.log('list', listAirdrop);
            userList.push(dataUser);
            //count++;
            fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
            //return dataJson.listAirdrop;
        })
        //console.log('ooooook Add', ok)

        //count = getDataCount();
    }else{
        console.log(' dont exist');
        userList.push(dataUser);
        fs.writeFileSync(metadataDir, JSON.stringify(userList, null, 2));
    }
}

/*
const getAirdropUser = (user) => {
    if ( fs.existsSync(buildDir) && fs.existsSync(metadataDir) && getData() !== null ) {
        const array = getData();

        const greaterThanTen = array.filter(_user => {
            if( _user.walletAddress === user.walletAddress || _user.twitterName === user.twitterName ){
                return _user;
            }
        });

        console.log(greaterThanTen) //[11, 20]
        //if( )
        return null;
    }
    return null;
}
*/
/*
const updateAirdrop = (_data) => { 
    if ( !fs.existsSync(buildDir) ) {
        fs.mkdirSync(buildDir, { recursive: true });
    }

    let listAirdrop = [];
    let count = getDataCount();
    if (fs.existsSync(metadataDir)) {
        console.log('exist')
        //const CONFIG_FOLLOWERS = require(metadataDirAbsolute);
        
        listAirdrop = getData();
        count = getDataCount();
        //console.log('list', getData(), 'count', getDataCount());
    }else{
        console.log(' dont exist');
        fs.writeFileSync(metadataDir, JSON.stringify(_data, null, 2));
    }

    
    
    
    //fs.writeFileSync(metadataDir, JSON.stringify(_data, null, 2));
    console.log({ok:'FILE UPDATED'})
};

*/

