import React from "react";
import WinnoAndBees from "../../components/Airdrop/WinnoAndBees/WinnoAndBees";
import ContainerComponent from "../../components/Container";
import HeaderPage from "../../components/HeaderPage/HeaderPage";

//const needle = require('needle');
//const Twitter = require('twitter-v2');
//const tweetJsonToHtml = require('tweet-json-to-html');


// this is the ID for @TwitterDev
//const userId = process.env.USER_ID;
//const url = `https://api.twitter.com/2/users/${userId}/followers`;
//const bearerToken = process.env.BEARER_TOKEN;

export default function WinnoAndBeesPage({contractInfo, links, config, rarity, images, rarities,}) {
    
    return(
        <>
        <ContainerComponent about={true} config={config} links={links} isItemsLess={true}>
        <HeaderPage title={"Winno&Bees"} />
        <WinnoAndBees />
        </ContainerComponent>


        { /* <Escape database={database} contractInfo={contractInfo} appCheck={appCheck} app={app} /> */}
        </>
    )
}


/*
Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”
*/





