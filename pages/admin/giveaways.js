import React, { useEffect, useState, useRef } from "react";

//import Menu from '../components/Menu/Menu';
//import Header from '../components/Header/Header';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import Container from '../../components/Container';
import Mint from '../../components/Mint/Mint';

//import {connectUser} from "../../redux/user/userActions";

import GiveAways from "../../components/GiveAways/GiveAways";
import {addressesJSON} from "../../redux/config/constants_addresses";

if (!process.env.PWD) {
    process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}`;
//const nftDir = `${buildDir}/NFT_IMG/images`;
const metadataDir = `${buildDir}/redux/config/constants_links.json`;
const CONFIG = require(`../../redux/config/config.json`);

export default function GiveAwaysPage({contractInfo, promoUrls, links, rarities, tab}) {
    
    let _index = 0;
    addressesJSON
    
    .map((i, index) => {
        let val = i;
        for(var j in val){
            var sub_key = j;
            var sub_val = val[j];
            //console.log(sub_key);
            //console.log(sub_val);
        }
        _index++;
    })
    .filter((item) => item !== "" );

    //console.log({LENGTH: _index});
    //console.log({CONFIG: addressesJSON.length})
    return(
        <>
        <Container mint={true} links={links}>
            <HeaderPage title={"Give Aways"} />
            <GiveAways />
        </Container>
        </>
    )
}

export async function getStaticProps(context) {
    const fs = require('fs');
    const tab = ['yaaaaa'];
    
    fs
    .readFileSync(metadataDir)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
    tab.push(i);
    });
    

    return {
        props: {
            tab
        }, // will be passed to the page component as props
    }
}