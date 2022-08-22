import React, {useEffect, useState} from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Badge, Button } from '@mui/material';

//import {Follow, Tweet, Hashtag, Mention} from "./TweetMethod";

////import TwitterLogin from "react-twitter-login";

import { getAuth, onAuthStateChanged, signOut, signInWithPopup, TwitterAuthProvider, unlink, linkWithRedirect, reauthenticateWithRedirect, linkWithPopup, reauthenticateWithPopup, getRedirectResult, signInWithRedirect} from "firebase/auth";
//import { initializeAppCheck, getToken, ReCaptchaV3Provider } from 'firebase/app-check';

import {getAllFollowers, /*isFollower,, getFollowerById, getFollowerByUsername,*/} from "../../lib/twitter/followers"
import TwitterStepper from './TwitterStepper';
import { useTheme, } from '@mui/material/styles';
import Parchment from '../Surfaces/Parchment';
//import { initializeApp } from "firebase/app";

//import {firebaseConfig} from "../../lib/fireBaseConfig";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs, doc, setDoc, getDoc} from "firebase/firestore";

//import firebase from 'firebase/compat/app';
//import * as firebaseui from 'firebaseui';
//import 'firebaseui/dist/firebaseui.css'
//import { User } from '../../classes/UserClass';
//import { TwitterApi } from 'twitter-api-v2';


const userId = process.env.TWITTER_USER_ID;

const COLLECTION_USERS = 'users';
const targetIdTweet = '1536357854579412992';

//const database = getFirestore(app);
//console.log({ENV:JSON.parse(process.env.FIREBASE)})
//const providerReCaptcha = new ReCaptchaV3Provider('6LfE1CIgAAAAAAf25pUV5JLlLz1SPfE6fYDx5eAY');
//const analytics = getAnalytics(app);
//const analytics = getAnalytics(app);

//const Twitter = require('twitter-v2');
export async function getServerSideProps(context) {
  return {
    props: {
      
    }, // will be passed to the page component as props
  }
}

const Airdrop = ({database, contractInfo,}) => {


  const provider = new TwitterAuthProvider();
  const auth = getAuth();
  const user = auth.currentUser;
    //const [userApp, setUserApp] = useState(new User());

    const theme = useTheme();
    const noProfilePic = theme.palette.mode === 'light' ? '/assets/img/others/no_profile_fill_black.png' : '/assets/img/others/no_profile_fill_white.png';
    //const [connected, setConnected] = useState(auth.currentUser ? true : false);
    const [userFirestore, setUserFirestore] = useState(null);
    const [userTwitter, setUserTwitter] = useState(null);
    const [uid, setUid] = useState(null);
    const [idTwitter, setIdTwitter] = useState(null);
    const [displayNameTwitter, setDisplayNameTwitter] = useState('');
    const [isFollowerTwitter, setIsFollowerTwitter] = useState(false);

    //const [token, setToken] = useState(null);
    //const [secret, setSecret] = useState(null);
    
    
    //console.log({AUTH: auth});
    //console.log({FOLLOER_USERNAME: getFollowerByUsername('wNFT_NFT')});
    //console.log({TWITTER_tokenS: process.env.TWITTER_tokenS ? JSON.parse(process.env.TWITTER_tokenS) : null})
    /*
    useEffect( () => {
      return async () => {
        console.log('page airdrop', 'exit');
        
        let token = window.sessionStorage.getItem('token');
        let secret = window.sessionStorage.getItem('secret');
        if( window.sessionStorage.getItem('token') !== null && window.sessionStorage.getItem('secret') !== null ){
          window.sessionStorage.removeItem('token');
          window.sessionStorage.removeItem('secret');
        }
        

        if( userFirestore && userTwitter ){
          await updateUserFirestore(userFirestore, userTwitter.token, userTwitter.secret);
          console.log('page airdrop', 'update user', userTwitter,);
        }else{
          console.log('page airdrop', 'update userFire', auth.currentUser, 'twitter', userTwitter);
        }
        //console.log('page airdrop', 'token', token, 'secret', secret);
      }
    }, []);
    */

    useEffect( async() => {
      let currentUser = auth.currentUser;
      let _user = null;
      if( userFirestore ){
        const docRef = doc(database, COLLECTION_USERS, userFirestore.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          _user = docSnap.data().twitter;
          //let _token = _user.twitter.token;
          //let _secret = _user.twitter.secret;
          console.log("Document data:", docSnap.data().twitter);
          //setUserTwitter(_user.twitter);
        }else{
          console.log("Document data:", 'no document');
          let token = window.sessionStorage.getItem('token');
          let secret = window.sessionStorage.getItem('secret');
          _user = await updateUserFirestore(userFirestore, token, secret);
          //setUserTwitter(_user);
        }
        
        console.log('users', _user)
        setUserTwitter(_user);
      }else{
        setUserTwitter(null);
        console.log('users', 'meeerde')
      }
    
      console.log('auth', userFirestore, 'twitter', _user)
    }, [userFirestore]);

    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //ok();        
        console.log('state', 'ooooook')
        setUid(user.uid);
        setUserFirestore(user);
      } else {
        console.log('state', 'meeerde')
        setUid(null);
        setUserFirestore(null);
      }
      //console.log({USEEEEEEER: user ? user.providerData[0].displayName : 'not connected'})

    });
    

  
    const updateUserFirestore = async (_userFirestore, _token, _secret) => {
      
      return await fetch('/api/twitter/gettwitteruser', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        body: JSON.stringify({token:_token, secret:_secret, connectedUserId: _userFirestore.providerData[0].uid, targetIdTweet: targetIdTweet }),
        headers: {
        'Content-Type': 'application/json',
        //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },  
      })
      .then( (response) => {   
          return response.json();
      }).then( async (follower) => {
          //console.log({SOURCE_ID: error})
          const userInfo = _userFirestore.reloadUserInfo;
          const usersRef = collection(database, COLLECTION_USERS);
          const isFollower = follower ? follower.isFollower : false;
          const isLikedTargetTweet = follower ? follower.isLikedTargetTweet : false;
          const isRetweetedTargetTweet = follower ? follower.isRetweetedTargetTweet : false;
          const isQuotedTargetTweet = follower ? follower.isQuotedTargetTweet : false;
          const userFirestore = {lastLoginAt: userInfo.lastLoginAt,
            twitter:{
            username: userInfo.screenName, photoUrl: userInfo.photoUrl, createdAt: userInfo.createdAt,
            name: userInfo.displayName, id: userInfo.providerUserInfo[0].federatedId, token: _token, secret: _secret,
            isFollower: isFollower, isLikedTargetTweet: isLikedTargetTweet, isRetweetedTargetTweet: isRetweetedTargetTweet, isQuotedTargetTweet: isQuotedTargetTweet }};
          await setDoc(doc(usersRef, _userFirestore.uid), userFirestore);
          setUserTwitter(userFirestore.twitter);
          //setConnected(true);
          //return null;
          return userFirestore.twitter;
      }).catch( (error) => {
        console.log({SOURCE_ID: error})
        return null;
      });
    }


    const signInTwitter = () => {
        signInWithPopup(auth, provider)
      .then( async (result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const _token = credential.accessToken;
        const _secret = credential.secret;
        const user = result.user;  
        if( window.sessionStorage.getItem('token') === null ){
          window.sessionStorage.setItem('token', _token);
        }

        if( window.sessionStorage.getItem('secret') === null ){
          window.sessionStorage.setItem('secret', _secret);
        }
        //const twitterId = result.user.providerData[0].uid;
        //await updateUserFirestore(user, _token, _secret);
       // setUser(user);
        setUserFirestore(user);
        setUid(user.uid);
        setIdTwitter(user.providerData[0].uid);
        //setToken(_token);
        //setSecret(_secret);
        //console.log({USEEERNOW:token + " / " + secret + " / " + result.user.providerData[0].uid})
        // The signed-in user info.
        
        
        {
          /*
<a href="https://twitter.com/intent/tweet?in_reply_to=463440424141459456">Reply</a>
<a href="https://twitter.com/intent/retweet?tweet_id=463440424141459456">Retweet</a>
<a href="https://twitter.com/intent/like?tweet_id=463440424141459456">Like</a>
          */
        }
        
        //setDisplayNameTwitter(user.providerData[0].displayName);

        
        //console.log({RESULT_FETCH: follower})
       //setUserApp(new User(user.uid));
        console.log({followers: user});
        // ...
      }).catch((error) => {
        // Handle Errors here.
        //setUser(null);
        setUserFirestore(null);
        setUid(null);
        setIdTwitter(null);
        //setToken(null);
        //setSecret(null);
        //setUserTwitter(null);
        
        setDisplayNameTwitter(null);
        //setIsFollowerTwitter(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        console.log({ERROR: errorMessage})
        // ...
      });
    }

    const signOutTwitter = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
       // setUser(null);
       setUserFirestore(null);
        setUid(null);
        setUserTwitter(null);
        //setConnected(false);
      }).catch((error) => {
        // An error happened.
      });
    }
    

    const authHandler = (err, data) => {
        console.log(err, data);
      };


    return(
       <>
       <Parchment
        title={'TWITTER CHALLENGE'}
        style={{textAlign: "center",}}
        content={
          <>


<div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', padding:'1vw'}}>
    <Badge
    overlap="circular"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    badgeContent={
      <Avatar sx={{ width: 24, height: 24, background:theme.palette.bluetwitter.main, display:userTwitter ? 'block' : 'none' }}><TwitterIcon fontSize='small' /></Avatar>
    }
    >
      <Avatar src={userTwitter ? userTwitter.photoUrl : noProfilePic} alt="pic profile user" sx={{ width: 56, height: 56, padding:'0.4vw',background:userTwitter ? theme.palette.white.main : 'transparent', border:`1px solid ${theme.palette.bluetwitter.main}` }} />
    </Badge>

    <p>{userTwitter ? `@${userTwitter.username}` : 'Not connected'}</p>
    <div>
    
    {
      userTwitter ? (
    <Button
      //startIcon={<TwitterIcon />}
      color="bluetwitter"
      sx={{fontWeight:'bold'}}
      //href={`https://twitter.com/intent/follow?user_id=${'1528402934538584064'}`}
      onClick={signOutTwitter}
    >
           Log out
    </Button>
      ) : (
    <Button
      startIcon={<TwitterIcon />}
      variant="outlined"
      color="bluetwitter"
      sx={{borderRadius:"2vw",margin: '0.3vw', fontWeight:'bold'}}
      //href={`https://twitter.com/intent/follow?user_id=${'1528402934538584064'}`}
      onClick={signInTwitter}
    >
           Login with Twitter
    </Button>
      )
    }
    </div>
</div>

{
  userTwitter && <div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', }}>
  <TwitterStepper userFirestore={userFirestore} updateUserFirestore={updateUserFirestore} signInTwitter={signInTwitter} signOutTwitter={signOutTwitter} userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter}   />
</div>
}

<Button variant='contained' onClick={async ()=>{
  //const encode = process.env.ENCODE_POST;
 //console.log({ENCODE: encode});
  //console.log({UPDATE: await updateAllFollowers()});
  //console.log({UPDATE: await getAllFollowers()});
  
}}>Update followers</Button>

<Button variant='contained' onClick={async ()=>{
  

}}>Follow somebody Eliass</Button>

{
  /*
<a href="https://twitter.com/intent/tweet?in_reply_to=463440424141459456">Reply</a>
<a href="https://twitter.com/intent/retweet?tweet_id=463440424141459456">Retweet</a>
<a href="https://twitter.com/intent/like?tweet_id=463440424141459456">Like</a>

<div>
  <button href={`https://twitter.com/intent/follow?user_id=1528402934538584064`}>Follow</button>
</div> 

<div style={{margin: '1vh'}}>
            <Button
              startIcon={<TwitterIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/follow?user_id=${'1528402934538584064'}`}
            >
                   Follow @WinnoBearz
            </Button>
            </div>

            <div style={{margin: '1vh'}}>
            <Button
              startIcon={<SendIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/tweet?in_reply_to=1529570709386809345`}
            >
                   Reply to the pinned tweet
            </Button>
            </div>

            <div style={{margin: '1vh'}}>
            <Button
              startIcon={<ReplyAllIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/retweet?tweet_id=1529570709386809345`}
            >
                   Retweet the pinned tweet
            </Button>
            </div>

            <div style={{margin: '1vh'}}>
            <Button
              startIcon={<FavoriteIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/like?tweet_id=1529570709386809345`}
            >
                   Like the pinned tweet
            </Button>
            </div>
  */
}

          </>
        }
       />
        
        {
/*
<div className="page-component__bg_image_box" id="text-06-567221">
            <div className="page-component__bg_overlay_box"></div>
            <div className="page-component__wrapper" style={{
                        zIndex: 15,
                        paddingTop:'50px',
                        paddingBottom:'50px',
                    }}>
                <section>
                <div className="text--06"></div>

                <div className="container container--mid" style={{textAlign: "center", marginTop:40,}}>
                <div className="text--02__box" >
                    <div className="text--02__content_box text--02__content_box--bottom" style={{background:'blue'}}></div>
                    <div className="text--02__content_box text--02__content_box--top" style={{background:theme.palette.backgroundStory.default}}>
                    <div className="text--02__img">
             <img loading="lazy" src={"/assets/logo.png"} alt={"logo"} className="" style={{height: "300vh"}}  />
          </div>

          <div className="title-box title-box--center">
          <h2 className="heading ">TWITTER CHALLENGE</h2>
<div>
  <p>User id twitter : {userTwitter ? userTwitter.providerData[0].uid : 'none'}</p>
  <p>Display name twitter : {userTwitter ? userTwitter.providerData[0].displayName : 'none'}</p>
  <p>Follow us : {userTwitter ? (getFollowerById(userTwitter.providerData[0].uid) ? 'yes' : 'no follower') : 'dont know'}</p>


  <div>
    <img src={userTwitter ? userTwitter.providerData[0].photoURL : ''} alt="pic profile user" />
  </div>
  <Button onClick={signInTwitter}>
      Sign twitter
  </Button>

  <Button onClick={signOutTwitter}>
      Sign Out twitter
  </Button>
</div>

<div style={{display:'flex', direction:'row', justifyContent:'center', alignContent:'center', }}>
  <TwitterStepper userTwitter={userTwitter} isFollowerTwitter={isFollowerTwitter}   />
</div>

<a href="https://twitter.com/intent/tweet?in_reply_to=463440424141459456">Reply</a>
<a href="https://twitter.com/intent/retweet?tweet_id=463440424141459456">Retweet</a>
<a href="https://twitter.com/intent/like?tweet_id=463440424141459456">Like</a>

<div>
  <button href={`https://twitter.com/intent/follow?user_id=1528402934538584064`}>Follow</button>
</div> 


            <div style={{margin: '1vh'}}>
            <Button
              startIcon={<TwitterIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/follow?user_id=${'1528402934538584064'}`}
            >
                   Follow @WinnoBearz
            </Button>
            </div>

            <div style={{margin: '1vh'}}>
            <Button
              startIcon={<SendIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/tweet?in_reply_to=1529570709386809345`}
            >
                   Reply to the pinned tweet
            </Button>
            </div>

            <div style={{margin: '1vh'}}>
            <Button
              startIcon={<ReplyAllIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/retweet?tweet_id=1529570709386809345`}
            >
                   Retweet the pinned tweet
            </Button>
            </div>

            <div style={{margin: '1vh'}}>
            <Button
              startIcon={<FavoriteIcon />}
              variant="contained"
              color="bluetwitter"
              sx={{borderRadius:"20px"}}
              href={`https://twitter.com/intent/like?tweet_id=1529570709386809345`}
            >
                   Like the pinned tweet
            </Button>
            </div>
                   
  </div>
                  

</div>
</div>
</div>
</section>
</div>
</div>
          */
        }
       </>
    )
}

export async function getStaticProps() {
  
    //const allPostsData = getSortedPostsData();
    //let ethereum = window.localStorage.getItem('showAdvertise');
    //const urlFlollow = `https://twitter.com/intent/follow?user_id=${userId}`;
    
    
    /*
    const client = new Twitter({
        bearer_token: bearerToken,
    });
    */
    return {
      props: {
        //allPostsData,
        //client,
        urlFlollow,
        followers
      }
    }
}

export default Airdrop;