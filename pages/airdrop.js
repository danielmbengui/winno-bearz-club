import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateAdvertise} from "../redux/user/userActions";
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container';
import Mint from '../components/Mint/Mint';

import {connectUser} from "../redux/user/userActions";

import DialogAdvertise from "../components/Dialogs/DialogAdvertise";

import Airdrop from "../components/Airdrop/Aidrop";
//const needle = require('needle');
//const Twitter = require('twitter-v2');
//const tweetJsonToHtml = require('tweet-json-to-html');


// this is the ID for @TwitterDev
//const userId = process.env.USER_ID;
//const url = `https://api.twitter.com/2/users/${userId}/followers`;
//const bearerToken = process.env.BEARER_TOKEN;

export default function AirdropPage({database, contractInfo, promoUrls, links, rarities, app, appCheck,}) {
    
    return(
        <>
        <ContainerComponent airdrop={true} links={links}>
            {/* <DialogAdvertise showAdvertise={showAdvertise} updateStorageAdvertise={updateStorageAdvertise} /> */}
            <HeaderPage title={"Airdrop"} />
            <Airdrop database={database} contractInfo={contractInfo} appCheck={appCheck} app={app} />
        </ContainerComponent>
        </>
    )
}


