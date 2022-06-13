import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContract } from "../redux/contract/contractActions";
import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import ContainerComponent from '../components/Container';
import Layers from '../components/Layers/Layers';
import Rarity from '../components/Rarity/Rarity';
import Collections from "../components/Collections/Collections";

export default function CollectionsPage({links, rarities, rarity}) {
    

    return(
        <>
        <ContainerComponent rarity={true} links={links}>
            <HeaderPage title={"Collections"} />
            <Collections />
            <Layers links={links} />
            <Rarity links={links} rarities={rarities} rarity={rarity} />
        </ContainerComponent>
        </>
    )
}

export async function getStaticProps() {
   
    //const allPostsData = getSortedPostsData();
    
    //let ethereum = window.localStorage.getItem('showAdvertise');
    //const encodePost = process.env.TWITTER_USER_ID;
    return {
      props: {
        //allPostsData,
        //_followers,
        //ethereum,
        //encodePost,
      }
    }
  }