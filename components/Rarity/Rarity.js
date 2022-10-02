import React, {useEffect, useState} from "react";
import { useTheme, } from '@mui/material/styles';
import Link from 'next/link';
import {GoToMintPageButton} from "../Buttons/Buttons";

import styleRarity from "./Rarity.module.css";
const imgPhone = "/assets/img/Rarity/phones/apple_iphone_11_pro_max_gold.png";

const Rarity = ({links, rarities}) => {
  const theme = useTheme();

  const backgroundLayer = theme.palette.mode === 'light' ? `rgb(${theme.palette.brownwinnodecimal.main}, 0.12)` : `rgb(${theme.palette.primarydecimal.main}, 0.3)`;
  const colorLayer = theme.palette.mode === 'light' ? 'var(--brown-winno)' : 'var(--primary)';

  const backgroundNft = theme.palette.mode === 'light' ? `rgb(${theme.palette.blackDecimal.main}, 0.12)` : `rgb(${theme.palette.whiteDecimal.main}, 0.3)`;
  const colorNft = theme.palette.text.primary;
  
  const stylePillLayer = {
    backgroundColor: backgroundLayer,
	  color:colorLayer,
  };
  const stylePillLayerHover = {
    backgroundColor: theme.palette.mode === 'light' ? `rgb(${theme.palette.brownwinnodecimal.main}, 0.185)` : `rgb(${theme.palette.primarydecimal.main}, 0.5)`,
	  color:colorLayer,
  };
  const [stylePillLayerBackground, setStylePillLayerBackground] = useState({
    backgroundColor: colorLayer,
    color:theme.palette.text.secondary,
  });


  const stylePillNft = {
    backgroundColor: backgroundNft,
	  color:colorNft,
  }
  const stylePillNftHover = {
    backgroundColor: theme.palette.mode === 'light' ? `rgb(${theme.palette.blackDecimal.main}, 0.2)` : `rgb(${theme.palette.whiteDecimal.main}, 0.5)`,
	  color:colorNft,
  }
  const [stylePillNftBackground, setStylePillNftBackground] = useState({
    backgroundColor: colorNft,
    color:theme.palette.text.secondary,
  });

  const [stylePillLayerSelected, setStylePillLayerSelected] = useState(stylePillLayer);
  const [stylePillNftSelected, setStylePillNftSelected] = useState(stylePillNft);

  useEffect( () => {
    setStylePillLayerSelected({
      backgroundColor: backgroundLayer,
      color:colorLayer,
    });
    setStylePillLayerBackground({
      backgroundColor: colorLayer,
    color:theme.palette.text.secondary,
    });
    setStylePillNftSelected({
      backgroundColor: backgroundNft,
      color:colorNft,
    });
    setStylePillNftBackground({
      backgroundColor: colorNft,
      color:theme.palette.text.secondary,
    });
  }, [theme.palette.mode])

    return(
        <div className="page-component__bg_image_box" id="tabs-10-555191">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 17,
            paddingTop:'50px',
            paddingBottom:'50px',
            color:theme.palette.text.primary
        }}>
    <div className="tabs-10">
      <div className="container container--small">
        <div className="title-box title-box--center">
          <h2 className="heading" style={{color:theme.palette.text.primary}}>RARITY</h2>
        </div>
      </div>
      <div className="container">
        <div className="tabs-10__box">
          <ul className="tabs-10__buttons_list">
            {
              rarities.map( (rarity, index) => {
                let activeState = "";
                if( rarity === rarities[0]){
                  activeState = "state-active-tab";
                }
                return(
                  <li className="tabs-10__button_item" key={index}>
                    <button className={`iconed-tab__button js-open-tab ${activeState} ${styleRarity['button-rarity']}`} focus="true" type="button" data-index={`tab-${index}`} data-group="my-images-group-tabs-10-555191">
                      <div className={`iconed-tab__button_icon`}>
                        <span className="icon">
                          <img loading="lazy" src={rarity.PNG} alt={rarity.NAME} className={`iconed-tab__button_image`} style={{height:'250px'}} />
                        </span>
                      </div>
                      <div className="iconed-tab__button_text" style={{color:theme.palette.text.primary}}>{rarity.NAME}</div>
                    </button>
                  </li>
                )
              })
            }
          </ul>
          <div className="tabs-10__item_container">
            <ul className="tabs-10__item_list js-tabs-item-list">
              {
                rarities.map( (rarity, index) => {
                  let activeState = "";
                if( rarity === rarities[0]){
                  activeState = "state-active-tab"
                }
                  let nameRarity = rarity.NAME;
                  return(
                    <li key={index} className={`tabs-10__item_box js-tab-content ${activeState} tabs-10__item_box--has_text`} data-index={`tab-${index}`} data-group="my-images-group-tabs-10-555191">
                      <div className="tabs-10__item js-tab-content-item" data-height="136">
                        <div className="tabs-10__visual_box">
                          <div className="mockup_v2 mockup_v2--iphone_13_pro">
                            <div className="mockup_v2__img_box">
                              <div className="mockup_v2__screenshot mockup_v2__area" style={{width: "80%"}}>
                                <img className="mockup_v2__screenshot_img" src={rarity.GIF} alt={rarity.NAME} />
                              </div>
                              <img className="mockup_v2__device_img js-tab-content-item" alt="Device frame" src={imgPhone} />
                            </div>
                          </div>
                        </div>
                        <div className="tabs-10__text_box">
                          <h2 style={{color:theme.palette.text.primary}}>{nameRarity}</h2>
                          <div className="content_box">
                            <p>A layer with the {nameRarity.toUpperCase()} rarity obtains <strong>{rarity.POINTS_LAYER} point{rarity.POINTS_LAYER > 1 ? 's' : ''}</strong>. </p>
                            <p>A WinnoBearz with {nameRarity.toUpperCase()} rarity has a <strong>minimum</strong> value of <strong>{rarity.POINTS_NFT} points</strong>. </p>
                          </div>
                          <div className="tabs-10__cta">
                            <div className="buttons-set">
                              <ul className="buttons-set__list">
                                <li className="buttons-set__item"
                                onMouseEnter={() => {setStylePillLayerSelected(stylePillLayerHover);}}
                                onMouseLeave={() => {setStylePillLayerSelected(stylePillLayer);}}
                                >

                                  <span className={`${styleRarity['pill-link']}`} style={stylePillLayerSelected}>
                                    <span className={`${styleRarity['pill-link__pill--layer']}`} style={stylePillLayerBackground}>Layer</span>
                                    <span className={`${styleRarity['pill-link__text']}`}>{rarity.POINTS_LAYER} point{rarity.POINTS_LAYER > 1 ? 's' : ''} </span>
                                  
                                  </span>
                                </li>
                                <li className="buttons-set__item"
                                onMouseEnter={() => {setStylePillNftSelected(stylePillNftHover);}}
                                onMouseLeave={() => {setStylePillNftSelected(stylePillNft);}}
                                >
                                  <span className={`${styleRarity['pill-link']} ${styleRarity['pill-link--nft']}`} style={stylePillNftSelected}>
                                    <span className={`${styleRarity['pill-link__pill--nft']}`} style={stylePillNftBackground}>NFT</span>
                                    <span className={`${styleRarity['pill-link__text']}`}>{rarity.POINTS_NFT} points </span>
                                  
                                  </span>
                                </li>
                                <li className="buttons-set__item">
                                  <a data-stripe-product-id="" data-stripe-mode="payment" data-successful-payment-url="" data-cancel-payment-url="" className={`${styleRarity['pill-link']} ${styleRarity['pill-link--opensea']}`} href={links.OPENSEA_LINK} target="_blank">
                                    <span className={`${styleRarity['pill-link__pill--opensea']}`}>OpenSea</span>
                                    <span className={`${styleRarity['pill-link__text']}`}> View Collection</span>
                                    <span className={`${styleRarity['pill-link__icon']}`}>
                                      <span className="icon">
                                        <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill="#00396B"></path>
                                        </svg>
                                      </span>
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="bottom_cta"></div> 
      </div>
    </div>
    <div className="container container--small">
        <div className="title-box title-box--center">
              <GoToMintPageButton />
        </div>
      </div>
  </div>
</div>
    )
}

export default Rarity;