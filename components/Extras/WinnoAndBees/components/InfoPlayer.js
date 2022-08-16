import React, { useEffect, useRef, useState } from 'react';

const InfoPlayer = ({player}) => {

//walletAddress: '', twitterName: '', bestScore: 0, whitelisted: false, airdropped: false, nGame: 0
    return(
        <>
            <p>Wallet address : {player.walletAddress}</p>
            <p>Twitter name : {player.twitterName}</p>
            <p>Best score : {player.bestScore}</p>
            <p>Whitelisted : {player.whitelisted ? 'true' : 'false'}</p>
            <p>Airdropped : {player.airdropped ? 'true' : 'false'}</p>
            <p>Nb games : {player.nGame}</p>
        </>
    )
}

export default InfoPlayer;