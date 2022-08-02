import React, { useEffect, useState, useRef } from "react";

import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container';
import Roadmap from '../components/Roadmap/Roadmap';
const mysql = require('mysql');
//import mysql from 'mysql';
/*
const db = mysql({
    config: {
      host: process.env.NEXT_PUBLIC_MYSQL_HOST,
      //port: process.env.NEXT_PUBLIC_MYSQL_PORT,
      database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
      user: process.env.NEXT_PUBLIC_MYSQL_USER,
      password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD
    }
  });
  */

export default function Test({test, contractInfo, links}) {

    useEffect( async () => {
        
        
/*
        var con = mysql.createConnection({
        host: "bearzcéub.io",
        user: "bearzclub_admin",
        password: "2cdw1inifqj7",
        database: "bearzclub_data"
        });
        */
/*
        con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM customers", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
        });
        */
        
        
       console.log('RESPONSE', test);
    })
    return(
        <>
            OOOOOK
        </>
    )
}

export async function getStaticProps() {
    // Instead of fetching your `/api` route you can call the same
    // function directly in `getStaticProps`
    const test = await fetch('http://localhost:3000/connexion.php', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        //body: JSON.stringify({token:_token, secret:_secret, connectedUserId: _userFirestore.providerData[0].uid, targetIdTweet: targetIdTweet }),
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //ids: ['1528427591333462016','1529570709386809345', '1528500148111826947'],
        //'Content-Type': 'application/x-www-form-urlencoded',
        },
        //responseType:'json',  
      })
      .then( async (response) => {  
       // console.log('RESPONSE', await response.json()) 
       //const resp = await response;
          return JSON.stringify(response.text());
      }).then( async (data) => {  
        console.log('RESPONSE', data) 
          return data;
      }).catch( (error) => {
        //console.log('ERROR', error)
        return {error: error.message};
      });
  
    // Props returned will be passed to the page component
    return { props: { test } }
  }