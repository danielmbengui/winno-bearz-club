import React, { useState,useEffect, useRef, useContext } from 'react';

import { useTheme, } from '@mui/material/styles';
import { Chip, Divider } from '@mui/material';
const Footer = ({links}) => {
  const theme = useTheme();
  const [email, setEmail] = useState(theme.palette.mode === 'light' ? links.EMAIL_IMAGE_PATH_BLACK : links.EMAIL_IMAGE_PATH_WHITE);
  const [discord, setDiscord] = useState(theme.palette.mode === 'light' ? links.DISCORD_IMAGE_PATH_BLACK : links.DISCORD_IMAGE_PATH_WHITE);
  const [twitter, setTwitter] = useState(theme.palette.mode === 'light' ? links.TWITTER_IMAGE_PATH_BLACK : links.TWITTER_IMAGE_PATH_WHITE);

  useEffect( () => {
    setEmail(theme.palette.mode === 'light' ? links.EMAIL_IMAGE_PATH_BLACK : links.EMAIL_IMAGE_PATH_WHITE);
    setDiscord(theme.palette.mode === 'light' ? links.DISCORD_IMAGE_PATH_BLACK : links.DISCORD_IMAGE_PATH_WHITE);
    setTwitter(theme.palette.mode === 'light' ? links.TWITTER_IMAGE_PATH_BLACK : links.TWITTER_IMAGE_PATH_WHITE);
  }, [theme.palette.mode])

  const redirect = () => {
    window.location.href = "mailto:" + links.EMAIL_LINK;
  }
    return(
        <div className="text-white" style={{backgroundColor:theme.palette.background.footer}}>
          <Divider>
            <Chip label='Contact' color='colorChip' />
          </Divider>

  <footer className="footer-02" id="footer">
    <div className="container">
      <div className="footer-02__wrapper">
        <div className="footer-02__text content_box" style={{color:theme.palette.text.primary}}>&copy; 2022&nbsp; <p>WinnoBearz Club</p>
        </div>
        <div className="social-buttons  ">
          <ul className="social-buttons__list">
            <li className="social-buttons__item">
              <button className="social-buttons__link social-buttons__link--discord" onClick={redirect} target="_blank" style={{cursor:"pointer"}}>
                <img loading="lazy" className="social-buttons__icon" alt="email icon" src={email} />
              </button>
            </li>
            <li className="social-buttons__item" style={{display:'none'}}>
              <a className="social-buttons__link social-buttons__link--twitter" href={links.DISCORD_LINK} target="_blank">
                <img loading="lazy" className="social-buttons__icon" alt="discord icon" src={discord} />
              </a>
            </li>
            <li className="social-buttons__item">
              <a className="social-buttons__link social-buttons__link--twitter" href={links.TWITTER_LINK} target="_blank">
                <img loading="lazy" className="social-buttons__icon" alt="twitter icon" src={twitter} />
              </a>
            </li>
            <li className="social-buttons__item" style={{display: 'none'}}>
              <a className="social-buttons__link social-buttons__link--github" href={links.GITHUB_LINK} target="_blank">
                <img loading="lazy" className="social-buttons__icon" alt="github icon" src={links.GITHUB_IMAGE_PATH_WHITE} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>
    )
}

export default Footer;