//import honey_bee from "../../assets/honey_bee.gif";
//import honey_bee from "../../assets/honey_bee.gif";
import React, { useEffect, useState, useRef } from "react";
import { useTheme, } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { fetchContract  } from "../../redux/contract/contractActions";
import Link from 'next/link';
import styleHeaderPage from './HeaderPage.module.css';
import { ThemeProvider } from "styled-components";
const honey_bee = "/assets/img/others/honey_bee.gif";
const honey_bearz = "/assets/img/others/honey_bearz.gif";


const HeaderPage = ({title}) => {
  const theme = useTheme();
    return(
        <div className={`page-component__bg_image_box page-component__bg_image_box--dark-bg  bg-${theme.palette.mode === 'light' ? 'white' : 'black'}-color page-component__bg_image_box--has-image`} id="header-29-306531" 
        style={{backgroundImage: `url("${theme.palette.mode === 'light' ? honey_bearz : honey_bee}")`, paddingBottom:'50px'}}>
  <div className="page-component__bg_overlay_box " style={{opacity: 0.9}}></div>
  <div className="page-component__wrapper" style={{
      zIndex: 110,
      paddingTop:'130px',
      paddingBottom:'30px',
  }}>
    <header className="header-29">
      <div className="header-29__box">
        <div className="container container--mid header-29__container">
          <div className="header-29__text_box">
            <h1 className={`heading heading--accent header-29__heading ${styleHeaderPage["divTitle"]}`} style={{color:theme.palette.text.primary}}>{title.toString().toUpperCase()}</h1>

          </div>
        </div>
      </div>
    </header>
  </div>
</div>
    )
}

export default HeaderPage;