import React, { useEffect, useState, useRef } from "react";

import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container';
import FAQ from '../components/FAQ/FAQ';


export default function FaqPage({contractInfo, links}) {

    return(
        <>
        <ContainerComponent faq={true} links={links}>
            <HeaderPage title={"FAQ"} />
            <FAQ links={links} contractInfo={contractInfo} />
        </ContainerComponent>
        </>
    )
}