import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, connectUser } from "../../redux/user/userActions";
import Menu from './Menu/Menu';
import Promo from './Promo/Promo';
import Footer from './Footer/Footer';
import { useTheme, } from '@mui/material/styles';

export default function ContainerComponent({ children, about, rarity, roadmap, faq, mint, links, isMenuGame, extras,}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const updateUserInfo = () => {
    dispatch(updateUser());
  }
  useEffect(() => {
    updateUserInfo();
  }, [user.account]);

  return (
    <>
    <Menu pages={{ about: about, rarity: rarity, roadmap: roadmap, faq: faq, mint: mint, extras: extras, }}
        isMenuGame={isMenuGame} dispatch={dispatch} user={user} connect={connectUser} />
      <main style={{ background: theme.palette.background.default, }}>{children}</main>
      <Promo links={links} />
      <Footer links={links} />
    </>
  )
}