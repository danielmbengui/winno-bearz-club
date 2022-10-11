import React from 'react';
import styleDescription from "./Description.module.css";

const Description = ({ scoreToWhitelist, scoreToAirdrop }) => {
    return (
        <ol className={`${styleDescription['description']}`}>
            <li>Eat {scoreToWhitelist} BEES to be whitelisted for the next collection.</li>
            <li>Eat {scoreToAirdrop} BEES to be whitelisted + recieve a free WinnoBearzNFT.</li>
        </ol>
    )
}

export default Description;