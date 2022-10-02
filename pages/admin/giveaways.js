import React from "react";
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import ContainerComponent from '../../components/Container/ContainerComponent';
import GiveAways from "../../components/GiveAways/GiveAways";
import {addressesJSON} from "../../redux/config/constants_addresses";

if (!process.env.PWD) {
    process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}`;
const metadataDir = `${buildDir}/redux/config/constants_links.json`;

export default function GiveAwaysPage({links}) {
    
    let _index = 0;
    addressesJSON.map((i, index) => {
        let val = i;
        for(var j in val){
            var sub_key = j;
            var sub_val = val[j];
            //console.log(sub_key);
            //console.log(sub_val);
        }
        _index++;
    })
    .filter((item) => item !== "" );

    //console.log({LENGTH: _index});
    //console.log({CONFIG: addressesJSON.length})
    return(
        <>
        <ContainerComponent mint={true} links={links}>
            <HeaderPage title={"Give Aways"} />
            <GiveAways />
        </ContainerComponent>
        </>
    )
}

export async function getStaticProps(context) {
    const fs = require('fs');
    const tab = ['yaaaaa'];
    
    fs
    .readFileSync(metadataDir)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
    tab.push(i);
    });
    

    return {
        props: {
            tab
        }, // will be passed to the page component as props
    }
}