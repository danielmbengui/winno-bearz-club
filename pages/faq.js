import React from "react";
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container/ContainerComponent';
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