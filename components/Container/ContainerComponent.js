import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, connectUser } from "../../redux/user/userActions";

import Menu from './Menu/Menu';
import Promo from './Promo/Promo';
import Footer from './Footer/Footer';
import { updateAdvertise, updateAdvertiseSession } from "../../redux/user/userActions";
import DialogAdvertise from "./Dialogs/DialogAdvertise";
import { useTheme, } from '@mui/material/styles';

export default function ContainerComponent({ children, about, rarity, roadmap, faq, mint, links, isMenuGame, extras,}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showAdvertise, setShowAdvertise] = useState(user.showAdvertise);
  const [showAdvertiseSession, setShowAdvertiseSession] = useState(user.showAdvertiseSession);

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

  return (
    <>
      <DialogAdvertise showAdvertise={showAdvertise} updateStorageAdvertise={updateStorageAdvertise} showAdvertiseSession={showAdvertiseSession} updateStorageAdvertiseSession={updateStorageAdvertiseSession} />
      <Menu pages={{ about: about, rarity: rarity, roadmap: roadmap, faq: faq, mint: mint, extras: extras, }}
        isMenuGame={isMenuGame} dispatch={dispatch} user={user} connect={connectUser} />
      <main style={{ background: theme.palette.background.default, }}>{children}</main>
      <Promo links={links} />
      <Footer links={links} />
    </>
  )
}