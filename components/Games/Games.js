import React, { useState,useEffect, useRef, useContext } from 'react';
import { useTheme, } from '@mui/material/styles';
import styleTeam from "./Team.module.css";
import Link from 'next/link';

const winno_s_path = "/assets/img/team/winno_s.png";
const winno_e_path = "/assets/games/escape/preview-game.gif";
const winno_d_path = "/assets/img/team/winno_d.png";
const winno_mod_path = "/assets/img/team/winno_mod.png";


const Games = () => {
  const theme = useTheme();
  const discordImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/discord.svg" : "/assets/img/icons/social/white/discord.svg";
  const twitterImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/twitter.svg" : "/assets/img/icons/social/white/twitter.svg";
  const instagramImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/instagram.svg" : "/assets/img/icons/social/white/instagram.svg";
  const telegramImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/telegram.svg" : "/assets/img/icons/social/white/telegram.svg";
  const linkedinImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/linkedin.svg" : "/assets/img/icons/social/white/linkedin.svg";
  const team = [
    { name: "Collect the bees and help Winno to avoid the BelzeBearz !", image_path: winno_e_path, sex:"Man", role: "Winno&Bees", club:"WinnoBearz Club", socials:{discord:"", twitter:"",}, href: '/games/escape'},
    { name: "Winno D", image_path: winno_d_path, sex:"Man", role: "Developer", club:"WinnoBearz Club", socials:{linkedin:""}, href: '/games/escape' },
    { name: "Winno O", image_path: winno_mod_path, sex:"Man", role: "Discord Admin", club:"WinnoBearz Partner", socials:{discord:"https://discord.gg/AQMYhXPebC", twitter:"https://twitter.com/__Cryptodragon", instagram: "https://www.instagram.com/otori_isaac/"}, href: '/games/escape'},
    { name: "Winno S", image_path: winno_mod_path, sex:"Man", role: "Discord Moderator", club:"WinnoBearz Partner", socials:{telegram:"https://t.me/sparrow178"}, href: '/games/escape' },
    { name: "Winno K", image_path: winno_mod_path, sex:"Man", role: "Discord Moderator", club:"WinnoBearz Partner", socials:{discord:"", twitter:"",}, href: '/games/escape' },
  ]
  const styleBoxPerson = {
    backgroundColor: theme.palette.background.card,
    boxShadow: `0px 5px 15px 0 rgba(${theme.palette.background.shadow}, ${theme.palette.mode === 'light' ? 0.1 : 0.1})`,
  }
  const styleBoxImgPerson = {
    backgroundColor: theme.palette.background.badge,
    boxShadow: `0px 7px 25px 0 rgba(${theme.palette.background.shadow}, ${theme.palette.mode === 'light' ? 0.1 : 0.1})`,
    border: `3px black solid`,
  }

  const roleTeam = {
    //backgroundColor: theme.palette.background.default,
    //color: `var(--yellow-team)`,
  }
    return(
        <div className="page-component__bg_image_box bg-white-color" id="team-02-602551">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 12,
            paddingTop:'50px',
            paddingBottom:'70px',
            background: theme.palette.background.default,
            color:theme.palette.text.primary
        }}>
    <div className="team-02">
      <div className="container container--small">
        <div className="title-box title-box--center">
          <h2 className="heading" style={{color:theme.palette.text.primary}}>TEAM</h2>
        </div>
      </div>
      <div className="container container--xlarge">
        <ul className={`${styleTeam['team-02__list']}`}>
          {
            team.map( (member, index) => {
              return(
                <Link href={member.href}>
                <li key={index} className={`${styleTeam['team-02__person']}`} style={styleBoxPerson}>
                  <div className="">
                    <div className={`${styleTeam['team-02__person_img_box']}`} style={styleBoxImgPerson}>
                      <img loading="lazy" className={`${styleTeam['team-02__person_img']}`} src={member.image_path} alt="Pic team" />
                    </div>
                    <div className={`${styleTeam['team-02__person_tag']}`}>
                      <span className={`tag color-main bg-light ${styleTeam['team-role']}`} style={roleTeam}>
                        <span className="">{member.role}</span>
                      </span>
                    </div>
                    <div className={`${styleTeam['team-02__person_name']}`}>{member.name}</div>
                    
                    <div className={`${styleTeam['team-02__person_about']} content_box`}>
                      <p><strong>&nbsp;{member.club}&nbsp;</strong></p>
                    </div>
                    <div className={`${styleTeam['team-02__person_social']}`}>
                      <div className="social-buttons">
                        <ul className="social-buttons__list" style={{textAlign: 'center'}}>

                          {
                            !member.socials.linkedin && !member.socials.discord && !member.socials.twitter && !member.socials.instagram && !member.socials.telegram && <li style={{visibility:'hidden'}}>No socials</li>
                          }

                          {
                            member.socials.linkedin && <li className="social-buttons__item">
                            <a className="social-buttons__link social-buttons__link--t" href={member.socials.linkedin} target="_blank">
                              <img loading="lazy" className="social-buttons__icon" alt="t icon" src={linkedinImg} />
                            </a>
                          </li>
                          }

                          {
                            member.socials.discord && <li className="social-buttons__item">
                            <a className="social-buttons__link social-buttons__link--t" href={member.socials.discord} target="_blank">
                              <img loading="lazy" className="social-buttons__icon" alt="t icon" src={discordImg} />
                            </a>
                          </li>
                          }

                          {
                            member.socials.twitter && <li className="social-buttons__item">
                            <a className="social-buttons__link social-buttons__link--twitter" href={member.socials.twitter} target="_blank">
                              <img loading="lazy" className="social-buttons__icon" alt="twitter icon" src={twitterImg} />
                            </a>
                          </li>
                          }

                          {
                            member.socials.instagram && <li className="social-buttons__item">
                            <a className="social-buttons__link social-buttons__link--instagram" href={member.socials.instagram} target="_blank">
                              <img loading="lazy" className="social-buttons__icon" alt="instagram icon" src={instagramImg} />
                            </a>
                          </li>
                          }

                          {
                            member.socials.telegram && <li className="social-buttons__item">
                            <a className="social-buttons__link social-buttons__link--instagram" href={member.socials.telegram} target="_blank">
                              <img loading="lazy" className="social-buttons__icon" alt="instagram icon" src={telegramImg} />
                            </a>
                          </li>
                          }

                          
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                </Link>
              )
            })
          }
        </ul>
        <div className="bottom_cta"></div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Games;