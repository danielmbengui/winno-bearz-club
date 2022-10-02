import React from "react";
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container/ContainerComponent';
import Roadmap from '../components/Roadmap/Roadmap';

export default function RoadmapPage({contractInfo, links}) {

    return(
        <>
        <ContainerComponent roadmap={true} links={links}>
            <HeaderPage title={"Roadmap"} />
            <Roadmap contractInfo={contractInfo} links={links} />
        </ContainerComponent>
        </>
    )
}