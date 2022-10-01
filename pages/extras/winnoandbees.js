import React from "react";
import WinnoAndBees from "../../components/Extras/WinnoAndBees/WinnoAndBees";
import ContainerComponent from "../../components/Container";
import HeaderPage from "../../components/HeaderPage/HeaderPage";
import { readPLayerJsonList } from "../../components/Extras/WinnoAndBees/lib/functions";
import axios from "axios";
import { LINK_API_READ_PLAYER_LIST } from "../../components/Extras/WinnoAndBees/lib/constants";
import { ACTION_READ_PLAYER_LIST } from "../api/extras/winnoandbees/constants";

//const needle = require('needle');
//const Twitter = require('twitter-v2');
//const tweetJsonToHtml = require('tweet-json-to-html');


// this is the ID for @TwitterDev
//const userId = process.env.USER_ID;
//const url = `https://api.twitter.com/2/users/${userId}/followers`;
//const bearerToken = process.env.BEARER_TOKEN;

export default function WinnoAndBeesPage({ contractInfo, links, config, rarity, images, rarities, database, app, playerList }) {

    return (
        <ContainerComponent winnoandbees={true} isItemsLess={true} isMenuGame={true} links={links}   >
            <HeaderPage title={"Winno&Bees"} />
            <WinnoAndBees database={database} app={app} playerList={playerList}  />
        </ContainerComponent>
    )
}

/*

const playerList = await readPLayerJsonList();
                                const playerListCount = await readPLayerJsonListCount();

                                */
export async function getServerSideProps(context) {
    const playerList = await axios.get(`${LINK_API_READ_PLAYER_LIST}?action=${ACTION_READ_PLAYER_LIST}`).then(response => {
        console.log('LIIIIIIIIST response', response.data);
        return response.data;
    }).catch( error => {
        return null;
    });
    //const playerList = await readPLayerJsonList();
    return {
        props: {
            playerList
        }, // will be passed to the page component as props
    }
}





