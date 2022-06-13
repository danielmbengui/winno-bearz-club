//const CONFIG_FOLLOWERS = require('../../redux/config/twitter/followers.json');
import fs from 'fs';
import path from 'path'
//const fetch = require("node-fetch");


export const updateAllFollowers = async () => {
    //const userId = process.env.TWITTER_USER_ID;
    
    return await fetch('/api/twitter/updateFollowers', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        //body: JSON.stringify({encodePost:encodePost,}),
        headers: {
        'Content-Type': 'application/json',
        //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },  
    })
    .then((response) => {
        return response.json();
    }).catch( (error) => {
        console.log({SOURCE_ID: error})
        return error;
    });
}

export const getAllFollowers = async () => {
    return await fetch('/api/twitter/gettwitterfollowers', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        //body: JSON.stringify({encodePost:encodePost,}),
        headers: {
        'Content-Type': 'application/json',
        //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },  
    })
    .then((response) => {
        return response.json();
    }).catch( (error) => {
        console.log({SOURCE_ID: error})
        return error;
    });   
}

//1447700831915155461 kadhafi
//1468318316330725378 cryptodragon
//1468318316330725568 null
export const getFollowerById = (followerId) => {
    const allData = getAllFollowers();
    const followers = allData.followers;
    if( !followers)
        return null;

    let i = 0;
    while( i < followers.length ){
        let follower = followers[i];
        if( follower.id === followerId ){
            return follower;
        }
        i++;
    }
    return null;
}

export const getFollowerByUsername = (followerUsername) => {
    const allData = getAllFollowers();
    const followers = allData.followers;
    if( !followers)
        return null;

    let i = 0;
    while( i < followers.length ){
        let follower = followers[i];
        if( follower.username === followerUsername ){
            return follower;
        }
        i++;
    }
    return null;
}

export const isFollower = async () => {
    let followers = getAllFollowers();
    return followers;
}

