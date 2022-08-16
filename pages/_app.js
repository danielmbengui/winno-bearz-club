import React, { useEffect, useState, useRef } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { updateBlockchain, connect, connectAccount } from "./redux/blockchain/blockchainActions";
//import { fetchData } from "./redux/data/dataActions";

import '../styles/global.css';
import store from "../redux/store";
import { Provider } from "react-redux";
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import ToggleColorMode from '../components/ToggleColorMode';

import { useTheme, } from '@mui/material/styles';
//import {app, firestore} from "../lib/fireBaseConfig";
import {app, database} from "../firebase/firebase.config";
require('dotenv').config({path: "./vars/.env"});

/*
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
*/

/*const firebaseConfig = {
  apiKey: "AIzaSyD52vVRfDYZgLdp0x9ykT5RbAS55dC2j10",
  authDomain: "winnobearznft.firebaseapp.com",
  projectId: "winnobearznft",
  storageBucket: "winnobearznft.appspot.com",
  messagingSenderId: "462203420048",
  appId: "1:462203420048:web:2421178264238d2e018715",
  measurementId: "G-R0FZ8NJJ41"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
*/
/*
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
*/
//const app = initializeApp(firebaseConfig);


//dotenv.config({path: "./vars/.env"});
//import {ColorModeContext} from './ToggleColorMode';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


/*
const theme = createTheme({
  palette: {
    primary: {
      main: "#ebc908",
      contrastText: '#000000',
    },
    brownbear: {
      main: "#872222",
      contrastText: '#fff',
    },
    brownbeardark: {
      main: "#571616",
      contrastText: '#fff',
    },
    bluewinno: {
      main: "#0099DB",
      contrastText: '#fff',
    },
    bluetwitter: {
      //main: "#1D9BF0",
      main:'var(--blue-twitter)',
      contrastText: '#fff',
    }


    
  },
});

*/


//import Document from "./_document";

const CONFIG = require('../redux/config/config.json');
const LINKS = require('../redux/config/constants_links.json');

const RARITY = require('../redux/config/constants_rarity.json');

const IMAGES_PATH = require('../redux/config/constants_images.json');

const promoUrls = [
  CONFIG.LINKS.OPENSEA,
];

const contractInfo = {
  address: CONFIG.CONTRACT_ADDRESS,
  network: CONFIG.NETWORK,
  name: CONFIG.NFT_NAME,
  symbol: CONFIG.SYMBOL,
  mintDate: CONFIG.MINT_DATE,
  totalSupply: CONFIG.MAX_SUPPLY,
  maxPerWallet: CONFIG.MAX_PER_WALLET,
  maxPerTransaction: CONFIG.MAX_PER_TRANSACTION,
  displayCost: CONFIG.DISPLAY_COST,
  encodePost: CONFIG.ENCODE_POST,
  scan:{
    name: CONFIG.SCAN_NAME,
    link: CONFIG.SCAN_LINK,
    link_code: CONFIG.SCAN_LINK_CODE,
  },
  marketplaces :{
    opensea :{
      name: CONFIG.MARKETPLACES.OPENSEA.NAME,
      url: CONFIG.MARKETPLACES.OPENSEA.URL,
    }
  },
  links: {
    opensea: CONFIG.LINKS.OPENSEA,
  },
  network: {
    name: CONFIG.NETWORK.NAME,
    symbol: CONFIG.NETWORK.SYMBOL,
    id: CONFIG.NETWORK.ID
  }
}



const rarities = [
  RARITY.RASPBERRY,
  RARITY.PICNIC,
  RARITY.SALMON,
  RARITY.HONEY,
  RARITY.BEEHIVE
];




/*
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
*/

export default function App({ Component, pageProps }) {

  const theme = useTheme();
    //const colorMode = useContext(ColorModeContext);
    return (
      <ToggleColorMode _child={
        <Provider store={store}>
        <Head>
        <title>WinnoBearz Club – NFT funny pixelated bearz</title>
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/bearz_club192.png" rel="apple-touch-icon" />
        <script src="/static/js/main.js" defer></script>
        <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
        <script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>


        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WinnoBearz Club – NFT funny pixelated bearz" />
        <meta name="twitter:title" content="WinnoBearz Club – NFT funny pixelated bearz" />
        <meta name="description" content="WinnoBearz NFT is a collection of 5,555 randomly generated, funny, pixelated made, unique, colorful and creative bearz NFTs living on Polygon Network." />
        <meta property="og:description" content="WinnoBearz NFT is a collection of 5,555 randomly generated, funny, pixelated made, unique, colorful and creative bearz NFTs living on Polygon Network." />
        <meta name="twitter:description" content="WinnoBearz NFT is a collection of 5,555 randomly generated, funny, pixelated made, unique, colorful and creative bearz NFTs living on Polygon Network." />
        <meta property="og:image" content="/bearz_club192.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/bearz_club192.png" />
        <link href="https://bearzclub.io" rel="canonical" />
        <meta name="twitter:url" content="https://bearzclub.io" />
        <meta property="og:url" content="https://bearzclub.io" />
        </Head>
        <div className="font-source-code-pro comps">
        <Component {...pageProps} app={app} database={database} theme={theme} contractInfo={contractInfo} config={CONFIG} promoUrls={promoUrls} links={LINKS} images={IMAGES_PATH} rarity={RARITY} rarities={rarities} />
        <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="pswp__bg"></div>
      <div className="pswp__scroll-wrap">
        <div className="pswp__container">
          <div className="pswp__item"></div>
          <div className="pswp__item"></div>
          <div className="pswp__item"></div>
        </div>
        <div className="pswp__ui pswp__ui--hidden">
          <div className="pswp__top-bar">
            <div className="pswp__counter"></div>
            <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button className="pswp__button pswp__button--share" title="Share"></button>
            <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div className="pswp__preloader">
              <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                  <div className="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div className="pswp__share-tooltip"></div>
          </div>
          <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div className="pswp__caption">
            <div className="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </Provider>
      } >

      </ToggleColorMode>
    );
  }