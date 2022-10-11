import React from "react";
import { useTheme, } from '@mui/material/styles';
import Link from 'next/link';
import styleHeader from './Header.module.css';


const Header = ({contractInfo}) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const advertise = "/assets/img/Header/advertise.png";
  const advertise_dark = "/assets/img/Header/advertiseBlack.png";

    return(
        <div className={`page-component__bg_image_box page-component__bg_image_box--dark-bg bg-${theme.palette.mode === 'light' ? 'white' : 'black'}-color page-component__bg_image_box--has-image`} id="header-29-306531" 
        style={{backgroundImage: `url("${theme.palette.mode === 'dark' ? advertise : advertise_dark}")`, paddingBottom:'50px'}}>
  <div className="page-component__bg_overlay_box " style={{opacity: 0.9}}></div>
  <div className="page-component__wrapper" style={{
      zIndex: 110,
      paddingTop:'130px',
      paddingBottom:'30px',
  }}>
    <header className="header-29" >
      <div className="header-29__box" >
        <div className="container container--mid header-29__container">
          <div className="header-29__text_box">

            <h1 className={`heading heading--accent header-29__heading ${styleHeader["divTitle"]}`} style={{color:textColor}}>
              HELP SOME WINNOBEARZ
              </h1>
            <div className="header-29__text content_box" style={{color:textColor}}>
              <p className="divSubtitle">WinnoBearz NFT is a collection of {contractInfo.totalSupply.toLocaleString('en-US')} randomly generated, funny, pixelated made, unique, colorful and creative bearz NFTs living on {contractInfo.network.name}.</p>
            </div>
            <div className="header-29__buttons" style={{marginTop: '3vh'}}>            
              <div className="buttons-set">
              
                <ul className="buttons-set__list">
                  <li className="buttons-set__item">
                    <Link href="/mint" >
                    <a className="button button-mint" href="#" target="_self">
                      <span className="button__text">Mint WinnoBearz</span>
                    </a>
                  </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</div>
    )
}

export default Header;