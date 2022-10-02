import React from "react";
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container/ContainerComponent';
import Mint from '../components/Mint/Mint';

export default function MintPage({contractInfo, links}) {
    
    return(
        <>
        <ContainerComponent mint={true} links={links}>
            <HeaderPage title={"Mint"} />
            <Mint contractInfo={contractInfo} /> 
        </ContainerComponent>
        </>
    )
}

