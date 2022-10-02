import React, { useState,useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import { useTheme, } from '@mui/material/styles';
import {GoToMintPageButton} from "../Buttons/Buttons";
import styleRoadmap from "./Roadmap.module.css";

import {addressesJSON} from "../../redux/config/constants_addresses";

const Roadmap = ({contractInfo, links}) => {
  const theme = useTheme();
  const listings = theme.palette.mode === 'light' ? '/assets/img/others/listings.gif' : '/assets/img/others/listings_black.gif';

  const styleLink = {
    color:theme.palette.mode === 'light' ? '' : theme.palette.primary.main,
    //textDecoration: 'none',
  }

  const styleBubble = {
    //border: '1px solid green',
	  backgroundColor: theme.palette.background.default,
    color:theme.palette.text.primary
  }
  //const ok = JSON.parse(addresses);
  //console.log({OK: addressesJSON})
  for(var i in addressesJSON){
    var key = i;
    var val = addressesJSON[i];
    for(var j in val){
        var sub_key = j;
        var sub_val = val[j];
        //console.log({KEY: sub_key + " / " + sub_val});
        //console.log({VALUE: sub_val});
    }
  }
  //console.log({LENGTH: addressesJSON.length});

    return(
        <div className="page-component__bg_image_box" id="steps-01-71881">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 13,
            paddingTop:'50px',
            paddingBottom:'50px',
            color:theme.palette.text.primary
        }}>
          <p></p>
    <div className="steps-01">
      <div className="container container--small">
        <div className="title-box title-box--center">
        </div>
      </div>
      <div className="container">
        <ul className="steps-01__list">
        <li className="steps-01__item">
            <div className="steps-01__number" style={styleBubble}>1</div>
            <div className="steps-01__content">
              <div className="steps-01__text_box">
                <h2 className="steps-01__heading" style={{color:theme.palette.text.primary}}>🔥 WinnoListings 🔥</h2>
                <div className="content_box ">
                  <div className="">
                    <p><strong>Drop listings coming soon !</strong></p>
                    <ul>
                      <li style={{display:'none'}}>Rarity Tools</li>
                      <Link href={links.NFT_CALENDAR_LINK} ><a target="_blank" style={styleLink}><li>NFT Calendar ✅</li></a></Link>
                      <Link href={links.RARITY_SNIPER_LINK}><a target="_blank" style={styleLink}><li>Rarity Sniper ✅</li></a></Link>
                      <Link href={links.NFT_DESIRE_LINK}><a target="_blank" style={styleLink}><li>NFT Desire ✅</li></a></Link>
                      <Link href={links.NFT_DROPS_CALENDAR_LINK}><a target="_blank" style={styleLink}><li>NFT Drops Calendar ✅</li></a></Link>
                      <Link href={links.NEXT_NFT_DROP_LINK}><a target="_blank" style={styleLink}><li>Next NftDrop ✅</li></a></Link>
                      <Link href={links.NFT_EVENING_LINK}><a target="_blank" style={styleLink}><li>NFT Evening ✅</li></a></Link>
                      <Link href={links.NEW_NEXT_NFT_DROP_LINK}><a target="_blank" style={styleLink}><li>Next NFT Drop ✅</li></a></Link>
                      <Link href={links.EARLY_COINS_LINK}><a target="_blank" style={styleLink}><li>Earlycoins ✅</li></a></Link>
                      <Link href={links.NFT_UNICORN_LINK}><a target="_blank" style={styleLink}><li>The Nft Unicorn ✅</li></a></Link>
                      <Link href={links.ICO_HOLDER_LINK}><a target="_blank" style={styleLink}><li>Ico Holder ✅</li></a></Link>
                      <Link href={links.NFT_LIST_LINK}><a target="_blank" style={styleLink}><li>NFT List ✅</li></a></Link>
                      <Link href={links.NFT_DROP_LINK}><a target="_blank" style={styleLink}><li>Next Drop ✅</li></a></Link>
                      <li>Upcoming NFT</li>
                      <li>NFT Hypedrops</li>
                      
                      <li style={{display:'none'}}>NFT Droops</li>
                    </ul>
                    <p></p>
                    <p>Secondaries sales on Opensea and others platforms.</p>
                  </div>
                </div>
              </div>
              <div className="steps-01__img_box">
                <img loading="lazy" src={listings} alt="Hometwo" data-width="1500" data-height="1024" className="steps-01__img  js-lightbox-single-image " />              
              </div>
            </div>
          </li>

          <li className="steps-01__item">
            <div className="steps-01__number" style={styleBubble}>2</div>
            <div className="steps-01__content">
              <div className="steps-01__text_box">
                <h2 className="steps-01__heading " style={{color:theme.palette.text.primary}}>🏅 Polygon Validation 🏅</h2>
                <div className="content_box ">
                  <div className="steps-01__text ">
                    <p>Smart contract verified on <a href={contractInfo.scan.link} target="_blank">{contractInfo.scan.name}</a> ✅ :</p>
                    <ol style={{listStyle:'none'}}>
                      <li> - The code</li>
                      <li> - The website</li>
                      <li> - The socials networks</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="steps-01__img_box">
                <a href={contractInfo.scan.link_code} target="_blank">
                <img loading="lazy" src="/assets/polygonscanVerif.png" alt="Image code random winner" data-width="256" data-height="256" className="steps-01__img " />
                </a>
              </div>
            </div>
          </li>

          <li className="steps-01__item">
            <div className="steps-01__number" style={styleBubble}>3</div>
            <div className="steps-01__content">
              <div className="steps-01__text_box">
                <h2 className="steps-01__heading " style={{color:theme.palette.text.primary}}>🪙 WinnoLottery 🪙</h2>
                <div className="content_box ">
                  <div className="steps-01__text ">
                    <p>Each NFT is a ticket for the lottery. Each time the team withdraw the fund, a randomly holder will automatically be choosen to recieve 5% of the amount.</p>
                  </div>
                </div>
              </div>
              <div className="steps-01__img_box">
                <a href={contractInfo.scan.link_code} target="_blank">
                <img loading="lazy" src="/assets/img/others/code_random_winner.png" alt="Image code random winner" data-width="1500" data-height="1024" className="steps-01__img js-lightbox-single-image " />
                </a>
              </div>
            </div>
          </li>

          <li className="steps-01__item">
            <div className="steps-01__number" style={styleBubble}>4</div>
            <div className="steps-01__content">
              <div className="steps-01__text_box">
                <h2 className="steps-01__heading " style={{color:theme.palette.text.primary}}>🐻 SocialWinno 🐻</h2>
                <div className="content_box ">
                  <div className="steps-01__text ">
                    <p>Be ready for the arrival of NFTs on instagram, twitter and certainly all the mainstream socials network. We don't promise anything except sell you a funny bearz.</p>
                    <p>You will be able to use your WinnoBearz NFT on {contractInfo.network.name} and bridge it on Ethereum 😇!</p>
                  </div>
                </div>
              </div>
              <div className="steps-01__img_box">
                <img loading="lazy" src="/assets/img/others/three_winno.gif" alt="Homeone" data-width="1500" data-height="1024" className="steps-01__img" />
              </div>
            </div>
          </li>
          <li className="steps-01__item">
            <div className="steps-01__number" style={styleBubble}>5</div>
            <div className="steps-01__content">
              <div className="steps-01__text_box">
                <h2 className="steps-01__heading " style={{color:theme.palette.text.primary}}>🎮 Winno&Bees 🎮</h2>
                <div className="content_box ">
                  <div className="steps-01__text ">
                    <p>Help Winno to eat some bees and avoid the BelzeBearz & his friends.</p>
                    <p>Best players will be whitelisted for the next collection of the club and maybe will recieve a free WinnoBearzNFT !</p>
                    <p>The only question is – will you be one of the HolyBearz ?</p>
                  </div>
                </div>
              </div>
              <div className="steps-01__img_box">
                
                <a href="https://footmercato.net" target={"_blank"}>
                <img loading="lazy" src="/extras/winnoandbees/img/game-preview.gif" alt="Homeone" data-width="1500" data-height="1024" className="steps-01__img" />
                </a>
                
              </div>
            </div>
          </li>
        </ul>
        <div className="steps-01__last_bubble">
          <img loading="lazy" src="/assets/logo.png" alt="Bearz club512" className="steps-01__last_bubble_img" height="100" />
        </div>
        <div className="bottom_cta">
          <div className="buttons-set">
            <ul className="buttons-set__list">
              <li className="buttons-set__item">
                <GoToMintPageButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Roadmap;