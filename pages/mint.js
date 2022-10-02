import React from "react";
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container/ContainerComponent';
import Mint from '../components/Mint/Mint';
import {connectUser} from "../redux/user/userActions";

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

