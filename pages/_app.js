import React, { useEffect } from "react";
import '../styles/global.css';
import store from "../redux/store";
import { Provider } from "react-redux";
import Head from 'next/head';
import { initializeApp } from "firebase/app";
import ToggleColorMode from '../components/ToggleColorMode';
import { useTheme, } from '@mui/material/styles';
require('dotenv').config({ path: "./vars/.env" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
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
  scan: {
    name: CONFIG.SCAN_NAME,
    link: CONFIG.SCAN_LINK,
    link_code: CONFIG.SCAN_LINK_CODE,
  },
  marketplaces: {
    opensea: {
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

export default function App({ Component, pageProps }) {

  const theme = useTheme();
  //const colorMode = useContext(ColorModeContext);
  useEffect(() => {
    function adjustIframeLayout(isOpen) {
      const widgetIframe = document.getElementById("xeko-ai-widget");
      if (!widgetIframe) return;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        if (isOpen) {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.top = 0;
          widgetIframe.style.bottom = 0;
          widgetIframe.style.left = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.width = "100%";
          widgetIframe.style.height = "100%";
          //widgetIframe.style.transform = "";
        } else {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.bottom = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.top = "auto";
          widgetIframe.style.left = "auto";
          widgetIframe.style.width = "200px";
          widgetIframe.style.height = "160px";
          //widgetIframe.style.transform = "";
        }
      } else {
        if (isOpen) {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.bottom = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.top = 0;
          //widgetIframe.style.left = "auto";
          widgetIframe.style.width = "450px";
          widgetIframe.style.height = "100%";
          //widgetIframe.style.transform = "";
        } else {
          widgetIframe.style.position = "fixed";
          //widgetIframe.style.right = "0";
          widgetIframe.style.top = "auto";
          //widgetIframe.style.bottom = "0";
          widgetIframe.style.left = "auto";
          widgetIframe.style.width = "210px";
          widgetIframe.style.height = "160px";
          //widgetIframe.style.transform = "translateY(-50%)";

          widgetIframe.style.right = 0;
          widgetIframe.style.bottom = 0;
          //widgetIframe.style.border= '5px solid cyan';
          //widgetIframe.style.width= '210px';
          //widgetIframe.style.maxWidth: '250px';
        }
      }
    }

    const handleResize = () => {
      const currentState = window.xekoWidgetState !== undefined ? window.xekoWidgetState : false;
      adjustIframeLayout(currentState);
    };

    const handleMessage = (event) => {
      if (event.data?.type === "resize_widget") {
        window.xekoWidgetState = event.data.isOpen;
        adjustIframeLayout(event.data.isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("message", handleMessage);

    adjustIframeLayout(false);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return (
    <>
      <iframe
        id="xeko-ai-widget"
        src="https://assistant.xeko.ai?assistant_id=67ec4e922476a6aa277db871"
        style={{
          position: 'fixed',
          right: 0, bottom: 0,
          border: 'none',
          //margin: 0, padding: 0, 
          zIndex: 9999
        }}
        scrolling="no"></iframe>
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
            <link href="https://winno.bearzclub.io" rel="canonical" />
            <meta name="twitter:url" content="https://winno.bearzclub.io" />
            <meta property="og:url" content="https://winno.bearzclub.io" />
          </Head>
          <div className="font-source-code-pro comps">
            <Component {...pageProps} app={app} theme={theme} contractInfo={contractInfo} config={CONFIG} promoUrls={promoUrls} links={LINKS} images={IMAGES_PATH} rarity={RARITY} rarities={rarities} />
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
    </>
  );
}