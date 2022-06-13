import React, { useEffect, useState, useRef } from "react";

import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container';
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