const Twitter = require('twitter-v2');
const bearerToken = process.env.BEARER_TOKEN;

const client = new Twitter({
  bearer_token: bearerToken,
});
// ['1528427591333462016','1529570709386809345', '1528500148111826947']
export default async function handler(req, res) {
  let ids = null;

  if ( req.method === 'GET')
    ids = req.headers.ids ? req.headers.ids : null;

  if ( req.method === 'POST')
    ids = req.body.ids ? req.body.ids : null;

  if( ids === null || !ids.length )
    return res.status(500).json('no tweet ids found');
  //console.log({ID: idTweet})
  console.log({IDS: ids});
  const { data } = await client.get('tweets', { 
    'ids': ids,
    'tweet.fields':'created_at',
    'expansions':'author_id',
    'user.fields':'created_at',
  }).then( (result) => {
      return result;
  }).catch( (error) => {
     return error.messages;
  });
  return res.status(200).json({ tweets: data });
}