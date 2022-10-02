import React from "react";
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container/ContainerComponent';
import Layers from '../components/Layers/Layers';
import Rarity from '../components/Rarity/Rarity';

export default function RarityPage({links, rarities, rarity}) {

    return(
        <>
        <ContainerComponent rarity={true} links={links}>
            <HeaderPage title={"Rarity"} />
            <Layers links={links} />
            <Rarity links={links} rarities={rarities} rarity={rarity} />
        </ContainerComponent>
        </>
    )
}