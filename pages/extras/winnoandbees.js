import React from "react";
import WinnoAndBees from "../../components/Extras/WinnoAndBees/WinnoAndBees";
import ContainerComponent from "../../components/Container/ContainerComponent";
import HeaderPage from "../../components/HeaderPage/HeaderPage";

export default function WinnoAndBeesPage({links, }) {

    return (
        <ContainerComponent winnoandbees={true} isItemsLess={true} isMenuGame={true} links={links}   >
            <HeaderPage title={"Winno&Bees"} />
            <WinnoAndBees />
        </ContainerComponent>
    )
}






