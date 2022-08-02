export default async function handler(req, res) {
    //const email = req.body.email
    // Then save email to your database, etc...
    const ok = await fetch('http://localhost:3000/connexion.php', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        body: JSON.stringify({token: 'ok' }),
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        responseType:'json',  
      })
      .then( async (response) => {  
       // console.log('RESPONSE', await response.json()) 
       //const resp = await response;
          return await response.json();
      }).then( async (data) => {  
        console.log('RESPONSE', data) 
          return data;
      }).catch( (error) => {
        console.log('ERROR', error)
        return {error:error.message};
      });
    return res.status(200).json({ result: ok })
  }
    