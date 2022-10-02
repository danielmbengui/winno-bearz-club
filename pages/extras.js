import React from "react";
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container/ContainerComponent';
import Extras from "../components/Extras/Extras";

export default function ExtrasPage({links}) {
    
    
    return(
        <>
        <ContainerComponent extras={true} links={links}>
            {/* <DialogAdvertise showAdvertise={showAdvertise} updateStorageAdvertise={updateStorageAdvertise} /> */}
            <HeaderPage title={"Extras"} />
            <Extras />
        </ContainerComponent>
        </>
    )
}

