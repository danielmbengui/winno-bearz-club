import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from "react-redux";
import { ColorModeContext } from '../../ToggleColorMode';
import { useTheme, } from '@mui/material/styles';
import Image from 'next/image';
import styleMenu from "./Menu.module.css";
import Link from 'next/link';
import { ShowUserAddressButton } from "../../Buttons/Buttons";
import Brightness2Icon from '@mui/icons-material/Brightness2';
import LightModeIcon from '@mui/icons-material/LightMode';
import Switch from '@mui/material/Switch';
import { updateScreenMode, } from "../../../redux/user/userActions";
import { useLocalStorage } from '../../Storage/LocalStorage';

const logoPath = "/assets/logo.png";
const STORAGE_SCREEN_MODE = 'screenMode';
const STORAGE_ADVERTISE = 'showAdvertise';
const STORAGE_ADVERTISE_SESSION = 'showAdvertiseSession';

const Menu = ({ pages, isMenuGame }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colorMode = useContext(ColorModeContext);
  const [mode, setMode] = useState(theme.palette.mode);
  //const [mode, setMode] = useLocalStorage(STORAGE_SCREEN_MODE, 'dark');
  const [checked, setChecked] = useState(theme.palette.mode !== 'light' ? true : false);

  const styleItem = {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
  }

  const styleItemActive = {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px",
    color: 'black'
  }

  const styleTextActive = {
    color: theme.palette.black.main,
  }

  useEffect(() => {
    console.log('MOOODE', theme.palette.mode)
    let _mode = theme.palette.mode;
    setMode(_mode);
    setChecked(_mode !== 'light' ? true : false);
  }, [theme.palette.mode]);

  const onChangeMode = (event) => {
    colorMode.toggleColorMode();
    setMode(event.target.checked ? 'dark' : 'light');
    dispatch(updateScreenMode(event.target.checked ? 'dark' : 'light'));
  }

  const menuWinnoAndBees = [
    /*
    {
      name: "Game", link: "/extras/winnoandbees",
      styleBackground: pages.winnoandbees !== undefined && pages.winnoandbees ? styleItemActive : styleItem,
      //styleHover: pages.about!==undefined && pages.about ? styleItemActive : styleItem, 
      styleText: pages.winnoandbees !== undefined && pages.winnoandbees ? styleTextActive : styleItem,

    },
    {
      name: "Player", link: "/extras/winnoandbees",
      styleBackground: pages.winnoandbees !== undefined && pages.winnoandbees ? styleItemActive : styleItem,
      //styleHover: pages.about!==undefined && pages.about ? styleItemActive : styleItem, 
      styleText: pages.winnoandbees !== undefined && pages.winnoandbees ? styleTextActive : styleItem,

    },
    {
      name: "Scores", link: "/extras/winnoandbees",
      styleBackground: pages.winnoandbees !== undefined && pages.winnoandbees ? styleItemActive : styleItem,
      //styleHover: pages.about!==undefined && pages.about ? styleItemActive : styleItem, 
      styleText: pages.winnoandbees !== undefined && pages.winnoandbees ? styleTextActive : styleItem,

    },
    */
  ]

  const menuItems = [
    {
      name: "About", link: "/",
      styleBackground: pages.about !== undefined && pages.about ? styleItemActive : styleItem,
      styleText: pages.about !== undefined && pages.about ? styleTextActive : styleItem,

    },
    {
      name: "Rarity", link: "/rarity",
      styleBackground: pages.rarity !== undefined && pages.rarity ? styleItemActive : styleItem,
      styleText: pages.rarity !== undefined && pages.rarity ? styleTextActive : styleItem,
    },
    {
      name: "Roadmap", link: "/roadmap",
      styleBackground: pages.roadmap !== undefined && pages.roadmap ? styleItemActive : styleItem,
      styleText: pages.roadmap !== undefined && pages.roadmap ? styleTextActive : styleItem,
    },
    {
      name: "Extras", link: "/extras",
      styleBackground: pages.extras !== undefined && pages.extras ? styleItemActive : styleItem,
      styleText: pages.extras !== undefined && pages.extras ? styleTextActive : styleItem,
    },
    {
      name: "Mint", link: "/mint",
      styleBackground: pages.mint !== undefined && pages.mint ? styleItemActive : styleItem,
      styleText: pages.mint !== undefined && pages.mint ? styleTextActive : styleItem,
    },
    {
      name: "FAQ", link: "/faq",
      styleBackground: pages.faq !== undefined && pages.faq ? styleItemActive : styleItem,
      styleText: pages.faq !== undefined && pages.faq ? styleTextActive : styleItem,
    },
  ]

  return (
    <nav
      className="js-nav nav-02  nav-02--sticky  nav-02--sticky--white"
      style={{
        position: 'fixed', left: 0, top: 0, right: 0,
        backgroundColor: theme.palette.background.menu,
        marginBottom: 0
      }}>
      <div className="container container--large">
        <div className="nav-02__box">
          <div className="nav-02__logo">
            <Link href="/">
              <a className="nav-02__link" target="_self">
                <Image
                  priority
                  src={logoPath}
                  className="nav-02__logo_img"
                  height="42"
                  width="42"
                  alt="logo-winno-bearz-club"
                />
                <span className={`nav-02__logo_text ${styleMenu["text-logo-winno"]}`} style={{ color: theme.palette.text.primary }}>WinnoBearz Club</span>
              </a>
            </Link>
          </div>
          <div className="nav-02__links js-menu">
            <div className="nav-02__list_wrapper" style={{ background: theme.palette.background.menu }}>
              <ul className="nav-02__list nav-02__list--desktop">

                {!isMenuGame ?
                  menuItems.map((element, index) => {
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

                {
                  pages.winnoandbees ?
                    menuWinnoAndBees.map((element, index) => {
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
                      <li className="buttons-set__item" style={{ display: 'flex', direction: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Switch onChange={onChangeMode} checked={checked} color="primary" />
                        {theme.palette.mode === 'light' ? <LightModeIcon style={{ color: theme.palette.text.primary }} /> : <Brightness2Icon style={{ color: theme.palette.text.primary }} />}
                        <button style={{ marginLeft: '0.2vw' }}>
                          <span className="button__text" style={{ color: theme.palette.text.primary }}>{mode} mode</span>
                        </button>

                      </li>

                      <li className="buttons-set__item">
                        <ShowUserAddressButton />
                      </li>
                      <li className="buttons-set__item" style={{ display: 'none' }}>
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
              <ul className="nav-02__list nav-02__list--mobile" style={{ backgroundColor: theme.palette.background.menu, }}>
                {!isMenuGame ?
                  menuItems.map((element, index) => {
                    return (
                      <li key={index} className="nav-02__item" style={element.styleBackground}>
                        <Link href={element.link} >
                          <a className="button button--white-outline button--empty" style={{ color: theme.palette.text.primary }}>
                            <span className="button__text" style={element.styleText}>{element.name}</span>
                          </a>
                        </Link>
                      </li>
                    )
                  }) : <></>
                }

                {
                  pages.winnoandbees ?
                    menuWinnoAndBees.map((element, index) => {
                      return (
                        <li key={index} className="nav-02__item" style={element.styleBackground}>
                          <Link href={element.link} >
                            <a className="button button--white-outline button--empty" style={{ color: theme.palette.text.primary }}>
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
                      <li className="buttons-set__item" style={{ display: 'flex', direction: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Switch onChange={onChangeMode} checked={checked} color="primary" />
                        {theme.palette.mode === 'light' ? <LightModeIcon style={{ color: theme.palette.text.primary }} /> : <Brightness2Icon style={{ color: theme.palette.text.primary }} />}
                        <button style={{ marginLeft: '0.2vw' }}>
                          <span className="button__text" style={{ color: theme.palette.text.primary }}>{mode} mode</span>
                        </button>
                      </li>
                      <li className="buttons-set__item">
                        <ShowUserAddressButton />
                      </li>
                      <li className="buttons-set__item" style={{ display: 'none' }} >
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