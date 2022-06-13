//import {getAllFollowers, isFollower, updateAllFollowers,getFollowerById} from "../lib/twitter/followers"
//const fetch = require('cross-fetch');
//import updateAllFollowers from "../pages/api/twitter/getFollowers";

const fetch = require("node-fetch");
const https = require('https')
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

/*
const updateAllFollowers = async () => {
  //const userId = process.env.TWITTER_USER_ID;
  
  return await fetch('https://bearzclub.io/api/twitter/updateFollowers', {
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
*/

const getAllFollowers = async () => {
  //const userId = process.env.TWITTER_USER_ID;
  
  return await fetch('https://bearzclub.io/api/twitter/gettwitterfollowers', {
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


const update = async() => {
  //let followers = await updateAllFollowers("010120245555WinnoBearzNFT20240101");
}
/*
// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

async function quickstart(
  projectId = 'your-project-id', // Your Google Cloud Platform project ID
  topicNameOrId = 'my-topic', // Name for the new topic to create
  subscriptionName = 'my-sub' // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({projectId});

  // Creates a new topic
  const [topic] = await pubsub.createTopic(topicNameOrId);
  console.log(`Topic ${topic.name} created.`);

  // Creates a subscription on that new topic
  const [subscription] = await topic.createSubscription(subscriptionName);

  // Receive callbacks for new messages on the subscription
  subscription.on('message', message => {
    console.log('Received message:', message.data.toString());
    process.exit(0);
  });

  // Receive callbacks for errors on the subscription
  subscription.on('error', error => {
    console.error('Received error:', error);
    process.exit(1);
  });

  // Send a message to the topic
  topic.publishMessage(Buffer.from('Test message!'));
}
quickstart();
*/


exports.scheduledUpdateFollowers = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
  console.log('This will be run every 5 minutes!');
  // 1 MAJ LES FOLLOWERS
  // 2 MAJ LES LIKES
  // 3 MAJ LES MENTIONS
  // 4 MAJ LES REPLY
  // 5 MAJ LES RETWEETS
  //await updateAllFollowers(process.env.ENCODE_POST);
  //update();
  let getFollowers = await getAllFollowers();
    let followers = getFollowers.followers;
    let count = getFollowers.count;
    followers.map( async (follower,) => {
      follower.connected = false;
      //const ok = {username: follower.username, name: follower.name, profile_image_url: follower.profile_image_url, created_at:follower.created_at,};
      await admin.firestore().collection('followers').doc(follower.id).set(follower)
    });
    //console.log({YES: followers.length})
    await admin.firestore().collection('followers').doc('count').set({count: count,});
    //res.status(200).send({result: "The followers tab has a length of : " + count + " / " + process.env.NEXT_PUBLIC_BEARER_TOKEN});
  return null;
});


/*
class TwitterUser {
  constructor (id, username, name, profile_image_url, created_at, ) {
      this.id = id;
      this.username = username;
      this.name = name;
      this.profile_image_url = profile_image_url;
      this.created_at = created_at;
      //this.country = country;
  }
  toString() {
      return this.id + ', ' + this.username + ', ' + this.name;
  }
}
*/


exports.updateAllFollowers = functions.https.onRequest(async (req, res) => {
  //encodeURIComponent();
  //let bearerToken = '';
  if( req.method === 'POST' && req.body.bearerToken === process.env.NEXT_PUBLIC_BEARER_TOKEN ){
    let getFollowers = await getAllFollowers();
    let followers = getFollowers.followers;
    let count = getFollowers.count;
    followers.map( async (follower,) => {
      follower.connected = false;
      //const ok = {username: follower.username, name: follower.name, profile_image_url: follower.profile_image_url, created_at:follower.created_at,};
      await admin.firestore().collection('followers').doc(follower.id).set(follower)
    });
    console.log({YES: followers.length})
    await admin.firestore().collection('followers').doc('count').set({count: count,});
    res.status(200).send({result: "The followers tab has a length of : " + count + " / " + process.env.NEXT_PUBLIC_BEARER_TOKEN});
  }else{
    res.status(400).send({result: 'FUUUUUUCKIN ERROR :'});
  }
}, );
/*
exports.createStatusFollower = functions.firestore.document('/followers/{documentId}')
.onCreate( (snap, context) => {
  const original = snap.data();

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log('Uppercasing', context.params.documentId, original);
    
    const connected = false;
    
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({connected}, {merge: true});
});
*/

/*
  exports.updateStatusFollower = functions.firestore.document('/followers/{documentId}')
  .onUpdate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data();

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log('Uppercasing', context.params.documentId, original);
    
    const connected = false;
    
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({connected}, {merge: true});
  });
  */

exports.addMessage = functions.https.onRequest(async (req, res) => {
  //updateAllFollowers
  /*
  let getFollowers = await getAllFollowers();
  let followers = getFollowers.followers;
  let count = getFollowers.count;
  
  followers.map( async (follower,) => {
    //const ok = {username: follower.username, name: follower.name, profile_image_url: follower.profile_image_url, created_at:follower.created_at,};
    await admin.firestore().collection('followers').doc(follower.id).set(follower.concat({connected:false}))
  });
  console.log({YES: followers.length})
  await admin.firestore().collection('followers').doc('count').set({count: count,})
  */
  

  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  //var collection = await admin.firestore().collection('messages').doc('aaaaaiee').set({original: original}); 
  //const writeResult = admin.firestore().collection('messages');
  //await collection.set('gdsgsdgds', {original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult} added.`});
  //res.json({result: "The followers tab has a length of : " + count})
}, );


// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
/*
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  //await admin.firestore().collection('messages').set({writeResult, original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});
*/
// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data(   ).original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log('Uppercasing', context.params.documentId, original);
    
    const uppercase = {upprecase:original.toUpperCase(), yes:'yes'};
    
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({uppercase}, {merge: true});
  });