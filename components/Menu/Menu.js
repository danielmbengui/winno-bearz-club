import React, { useState,useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {ColorModeContext} from '../ToggleColorMode';
import { useTheme, } from '@mui/material/styles';
import Image from 'next/image';
import styleMenu from "./Menu.module.css";
import Link from 'next/link';
import Script from 'next/script';
import {ConnectToWebsiteButton, InstallMetamaskButton, ShowUserAddressButton} from "../Buttons/Buttons";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import LightModeIcon from '@mui/icons-material/LightMode';

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import {updateScreenMode,} from "../../redux/user/userActions";
import userReducer from '../../redux/user/userReducer';
const logoPath = "/assets/logo.png";






/*
background-color: rgba(var(--primary-decimal), 0.95) !important;
	color: var(--primary-text);
  */
const Menu = ({ pages, isItemsLess }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const colorMode = useContext(ColorModeContext);
    const [mode, setMode] = useState(theme.palette.mode);
    const [checked, setChecked] = useState(theme.palette.mode !== 'light' ? true : false);

    const styleItem = {
      backgroundColor: 'transparent',
	    color: theme.palette.text.primary,
    }

    const styleItemActive = {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "5px",
      color:'black'
    }
    
    const styleTextActive = {
      color: theme.palette.black.main,
    }

    const [styleItemSelected, setStyleItemSelected] = useState(styleItem);

 


    useEffect( () => {
      let _mode = theme.palette.mode;
      setMode(_mode.toUpperCase().charAt(0) + _mode.slice(1));
      //colorMode.toggleColorMode();
      setChecked(_mode !== 'light' ? true : false);
      
      //console.log({USSSER__MODE:user.})
    }, [theme.palette.mode]);

    const onChangeMode = (event) => {
        //setMode(prevMode === 'light' ? 'dark' : 'light');
        colorMode.toggleColorMode();
        //setChecked(event.target.checked);
        dispatch(updateScreenMode(event.target.checked ? 'dark' : 'light'));
        //console.log({VALUE_LOG: event.target.checked})
    }
    //const { blockchain, connect, connectAccount } = props;
    const menuItems = [
      {name: "About",link: "/", 
        styleBackground: pages.about!==undefined && pages.about ? styleItemActive : styleItem, 
        //styleHover: pages.about!==undefined && pages.about ? styleItemActive : styleItem, 
        styleText: pages.about!==undefined && pages.about ? styleTextActive : styleItem, 

      },
      
      {name: "Rarity",link: "/rarity", 
        styleBackground: pages.rarity!==undefined && pages.rarity ? styleItemActive : styleItem, 
        styleText: pages.rarity!==undefined && pages.rarity ? styleTextActive : styleItem, 
      },
      /*
      {name: "Collections",link: "/collections", 
        styleBackground: pages.collections!==undefined && pages.collections ? styleBackgroundActive : null, 
        styleText: pages.collections!==undefined && pages.collections ? styleTextActive : null, 
      },
      */
      {name: "Roadmap",link: "/roadmap", 
        styleBackground: pages.roadmap!==undefined && pages.roadmap ? styleItemActive : styleItem, 
        styleText: pages.roadmap!==undefined && pages.roadmap ? styleTextActive : styleItem, 
      },
      /*
      {name: "Games",link: "/games", 
        styleBackground: pages.games!==undefined && pages.games ? styleItemActive : styleItem, 
        styleText: pages.games!==undefined && pages.games ? styleTextActive : styleItem, 
      },
      */
      {name: "Mint",link: "/mint", 
        styleBackground: pages.mint!==undefined && pages.mint ? styleItemActive : styleItem, 
        styleText: pages.mint!==undefined && pages.mint ? styleTextActive : styleItem, 
      },
      {name: "FAQ",link: "/faq", 
        styleBackground: pages.faq!==undefined && pages.faq ? styleItemActive : styleItem, 
        styleText: pages.faq!==undefined && pages.faq ? styleTextActive : styleItem, 
      },
    ]

    return(
        <nav 
      className="js-nav nav-02  nav-02--sticky  nav-02--sticky--white" 
      //    className={`${styles["js-nav"]} ${styles["nav-02"]} ${styles["nav-02--sticky"]} ${styles["nav-02--sticky--black"]}`}
          
          style={{
            position:'fixed', left:0, top:0, right:0,
            backgroundColor:theme.palette.background.menu,
            marginBottom:0
            }}>
  <div className="container container--large">
    <div className="nav-02__box">
      <div className="nav-02__logo">
        <a className="nav-02__link" href="/" target="_self">
          <Image
              priority
              src={logoPath}
              className="nav-02__logo_img"
              height="42"
              width="42"
              alt="logo-winno-bearz-club"
            />
          <span className={`nav-02__logo_text ${styleMenu["text-logo-winno"]}`} style={{color:theme.palette.text.primary}}>WinnoBearz Club</span>
        </a>
      </div>
      <div className="nav-02__links js-menu">
        <div className="nav-02__list_wrapper" style={{background:theme.palette.background.menu}}>
          <ul className="nav-02__list nav-02__list--desktop">

            { !isItemsLess ? 
              menuItems.map( (element, index) => {
                return (
                  <li key={index} className={`nav-02__item`} style={element.styleBackground} 
                  >
                  <Link href={element.link} >
                  <a className={`button button--white-outline button--empty ${styleMenu['button--menu']}`} >
                    <span className="button__text" style={element.styleText}>{element.name}</span>
                  </a>
                  </Link>
                </li>
                )
              }) : <></>
            }

              <li className="nav-02__item">
              <div className="buttons-set">
                <ul className="buttons-set__list" >
                <li className="buttons-set__item" style={{display:'flex', direction:'row', alignItems:'center', justifyContent:'center'}}>
                <Switch onChange={onChangeMode} checked={checked} color="primary" />
                {theme.palette.mode === 'light' ? <LightModeIcon style={{color:theme.palette.text.primary}} /> : <Brightness2Icon style={{color:theme.palette.text.primary}} />}
                <button style={{marginLeft:'0.2vw'}}>
                    <span className="button__text" style={{color:theme.palette.text.primary}}>{mode} mode</span>
                </button>
                
                </li>
                
                  <li className="buttons-set__item">
                  {/*
                    <>
                  <InstallMetamaskButton />
                  <ConnectToWebsiteButton />
                  </>
                  */
                  }
                  <ShowUserAddressButton />
                  </li>
                  <li className="buttons-set__item" style={{display:'none'}}>
                  <Link href={"/airdrop"} >
                  <button className={`button button-airdrop`}>
                    <span className="button__text">Airdrop</span>
                  </button>
                  </Link>
                </li>
                
                {
                  /*
                  <li>
                <ListItem button  key='theme-mode' onClick={colorMode.toggleColorMode}>
                <ListItemIcon >
                {theme.palette.mode === 'light' ? <Brightness7Icon fontSize={"large"} style={{color:'red'}} /> : <Brightness4Icon fontSize={"large"} color='text.primary' />}
                </ListItemIcon>
                <ListItemText primary={<Typography sx={{fontSize:{xs:"2.3vmax",sm:"1.8vmax", md:"1.3vmax"},}} style={{color:'red'}}>
                            Theme {theme.palette.mode}
                        </Typography>} />
                </ListItem>
                </li>
                */
                }
                
                </ul>
              </div>
            </li>
  
          </ul>
          <ul className="nav-02__list nav-02__list--mobile" style={{backgroundColor:theme.palette.background.menu,}}>
          { !isItemsLess ?
              menuItems.map( (element, index) => {
                return (
                  <li key={index} className="nav-02__item" style={element.styleBackground}>
                  <Link href={element.link} >
                  <a className="button button--white-outline button--empty" style={{color:theme.palette.text.primary}}>
                    <span className="button__text" style={element.styleText}>{element.name}</span>
                    </a>
                  </Link>
                </li>
                )
              }) : <></>
            }
          
            <li className="nav-02__item">
              <div className="buttons-set">
                <ul className="buttons-set__list">
                <li className="buttons-set__item" style={{display:'flex', direction:'row', alignItems:'center', justifyContent:'center'}}>
                <Switch onChange={onChangeMode} checked={checked} color="primary" />
                {theme.palette.mode === 'light' ? <LightModeIcon style={{color:theme.palette.text.primary}} /> : <Brightness2Icon style={{color:theme.palette.text.primary}} />}
                <button style={{marginLeft:'0.2vw'}}>
                    <span className="button__text" style={{color:theme.palette.text.primary}}>{mode} mode</span>
                </button>
                </li>
                  <li className="buttons-set__item">
                  {
                    /*
                  <>
                  <InstallMetamaskButton />
                  <ConnectToWebsiteButton />
                  </>
                    */
                  }
                  <ShowUserAddressButton />
                  </li>
                  <li className="buttons-set__item" style={{display:'none'}} >
                  <Link href={"/airdrop"} >
                  <button className={`button button-airdrop`}>
                    <span className="button__text">Airdrop</span>
                  </button>
                  </Link>
                </li>
                </ul>
              </div>
            </li>
            
          </ul>
        </div>
        <div className="nav-02__burger js-menu">
          <button className="burger burger--black js-open-menu" type="button">
            <div className="burger__box">
              <div className="burger__inner"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
    )
}

export default Menu;