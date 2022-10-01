import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, connectUser } from "../redux/user/userActions";

import Menu from './Menu/Menu';
import Promo from './Promo/Promo';
import Footer from './Footer/Footer';
//const CONFIG = require('./config/config.json');

import {updateAdvertise, updateAdvertiseSession} from "../redux/user/userActions";
import DialogAdvertise from ".//Dialogs/DialogAdvertise";
//import {ColorModeContext} from '../ToggleColorMode';
import { useTheme, } from '@mui/material/styles';
import { Container } from "@mui/material";
//const CONFIG = require('../pages/config/config.json');

export default function ContainerComponent({ children, about, rarity, collections, roadmap, games, faq, mint, airdrop, config, links, isItemsLess, isMenuGame, extras, winnoandbees}) {
  const theme = useTheme();
    //const colorMode = useContext(ColorModeContext);
    const dispatch = useDispatch();
    //const blockchain = useSelector((state) => state.blockchain);
    const user = useSelector((state) => state.user);
    const [showAdvertise, setShowAdvertise] = useState(user.showAdvertise);
    const [showAdvertiseSession, setShowAdvertiseSession] = useState(user.showAdvertiseSession);
  //console.log({STYLE_THEME: theme})

  const updateUserInfo = () => {
    dispatch(updateUser());
  }
    useEffect(() => {
      updateUserInfo();
    }, [user.account]);

    const updateStorageAdvertise = (_showAdvertise) => {
        setShowAdvertise(_showAdvertise);
        dispatch(updateAdvertise(_showAdvertise));
    }

    const updateStorageAdvertiseSession = (_showAdvertiseSession) => {
      setShowAdvertiseSession(_showAdvertiseSession);
      dispatch(updateAdvertiseSession(_showAdvertiseSession));
  }

    useEffect(() => {
        setShowAdvertise(user.showAdvertise);
    }, [user.showAdvertise]);

    useEffect(() => {
      setShowAdvertiseSession(user.showAdvertiseSession);
  }, [user.showAdvertiseSession]);
      

    return(
        <>
          <DialogAdvertise showAdvertise={showAdvertise} updateStorageAdvertise={updateStorageAdvertise} showAdvertiseSession={showAdvertiseSession} updateStorageAdvertiseSession={updateStorageAdvertiseSession} />
          <Menu pages={{about: about, rarity: rarity, collections: collections, roadmap: roadmap, faq:faq, mint: mint, airdrop:airdrop, games: games, extras: extras, winnoandbees: winnoandbees}}
            isItemsLess={isItemsLess} isMenuGame={isMenuGame} dispatch={dispatch} user={user} connect={connectUser} />      
          <main style={{background:theme.palette.background.default,}}>{children}</main>
          <Promo links={links} />
          <Footer config={config} links={links} />  
        </>
    )
}