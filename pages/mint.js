import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateAdvertise} from "../redux/user/userActions";
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container/ContainerComponent';
import Mint from '../components/Mint/Mint';

import {connectUser} from "../redux/user/userActions";

import DialogAdvertise from "../components/Dialogs/DialogAdvertise";
import Gallery from "../components/Gallery/Gallery";

//const needle = require('needle');
//const Twitter = require('twitter-v2');
//const tweetJsonToHtml = require('tweet-json-to-html');

// this is the ID for @TwitterDev
//const userId = process.env.USER_ID;
//const url = `https://api.twitter.com/2/users/${userId}/followers`;
//const bearerToken = process.env.BEARER_TOKEN;

export default function MintPage({contractInfo, promoUrls, links, rarities}) {
    
    return(
        <>
        <ContainerComponent mint={true} links={links}>
            {/* <DialogAdvertise showAdvertise={showAdvertise} updateStorageAdvertise={updateStorageAdvertise} /> */}
            <HeaderPage title={"Mint"} />
            <Mint connect={connectUser} contractInfo={contractInfo} promoUrls={promoUrls} rarities={rarities} /> 
        </ContainerComponent>
        </>
    )
}

