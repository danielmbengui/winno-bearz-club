import React from "react";
import Escape from "../../components/Games/Escape/Escape";
import WinnoAndBees from "../../components/Games/WinnoAndBees/WinnoAndBees";
import Promo from "../../components/Promo/Promo";

//const needle = require('needle');
//const Twitter = require('twitter-v2');
//const tweetJsonToHtml = require('tweet-json-to-html');


// this is the ID for @TwitterDev
//const userId = process.env.USER_ID;
//const url = `https://api.twitter.com/2/users/${userId}/followers`;
//const bearerToken = process.env.BEARER_TOKEN;

export default function WinnoAndBeesPage({database, contractInfo, promoUrls, links, rarities, app, appCheck,}) {
    
    return(
        <>
        <WinnoAndBees />
        { /* <Escape database={database} contractInfo={contractInfo} appCheck={appCheck} app={app} /> */}
        <Promo links={links} />
        </>
    )
}


