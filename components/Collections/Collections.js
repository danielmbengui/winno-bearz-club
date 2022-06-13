import React, { useState,useEffect, useRef, useContext } from 'react';
import { useTheme, } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { fetchContract } from '../../redux/contract/contractActions';
import styleTeam from "./Collections.module.css";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { parse } from 'date-fns';

const winno_s_path = "/assets/img/team/winno_s.png";

const winno_d_path = "/assets/img/others/one_winno.gif";
const winno_mod_path = "/assets/img/team/winno_mod.png";

const no_reveal = "/assets/img/others/one_winno.gif";

const Collections = () => {
  const theme = useTheme();
  const winno_e_path = `/assets/img/others/no_profile_${theme.palette.mode === 'light' ? 'black' : 'white'}.png`;
  const dispatch = useDispatch();
  const smartContract = useSelector((state) => state.smartContract);
  const user = useSelector((state) => state.user);
  const [tabLinks, setTabLinks] = useState([]);

  const [collection, setCollection] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    //getDataImages();
    dispatch(fetchContract());
    let _tabLinks = [];
    let _collection = [];
    for (let i = 0; i < smartContract.totalSupply; i++) {
      //const element = array[i];
      let link = i < smartContract.currentSupply ? `https://gateway.pinata.cloud/ipfs/QmQMm3QDhFVHWJbLjABpgytDqxnAkR4EYNnajHWThi5vYg/images/${(i + 1)}.png` : no_reveal;
      let revealed = i < smartContract.currentSupply ? true : false;
      _collection.push( {link:link, revealed:revealed});
      _tabLinks.push(link);
    }
    setTabLinks(_tabLinks);
    setCollection(_collection);
    console.log('collection', _collection)

    setFilter(_collection);
    
    //console.log({SAME: user.networkId + " / " + smartContract.networkId + " / " + (parseInt(user.networkId) === parseInt(smartContract.networkId) + " / ")})
  }, [smartContract.currentSupply]);
  
 
  const discordImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/discord.svg" : "/assets/img/icons/social/white/discord.svg";
  const twitterImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/twitter.svg" : "/assets/img/icons/social/white/twitter.svg";
  const instagramImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/instagram.svg" : "/assets/img/icons/social/white/instagram.svg";
  const telegramImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/telegram.svg" : "/assets/img/icons/social/white/telegram.svg";
  const linkedinImg = theme.palette.mode === 'light' ? "/assets/img/icons/social/black/linkedin.svg" : "/assets/img/icons/social/white/linkedin.svg";
  const team = [
    { name: "Winno E", image_path: winno_e_path, sex:"Man", role: "Artist", club:"WinnoBearz Club", socials:{discord:"", twitter:"",} },
    { name: "Winno D", image_path: winno_d_path, sex:"Man", role: "Developer", club:"WinnoBearz Club", socials:{linkedin:""} },
    { name: "Winno O", image_path: winno_mod_path, sex:"Man", role: "Discord Admin", club:"WinnoBearz Partner", socials:{discord:"https://discord.gg/AQMYhXPebC", twitter:"https://twitter.com/__Cryptodragon", instagram: "https://www.instagram.com/otori_isaac/"} },
    { name: "Winno S", image_path: winno_mod_path, sex:"Man", role: "Discord Moderator", club:"WinnoBearz Partner", socials:{telegram:"https://t.me/sparrow178"} },
    { name: "Winno K", image_path: winno_mod_path, sex:"Man", role: "Discord Moderator", club:"WinnoBearz Partner", socials:{discord:"", twitter:"",} },
  ]
  const styleBoxPerson = {
    backgroundColor: theme.palette.background.card,
    boxShadow: `0px 5px 15px 0 rgba(${theme.palette.background.shadow}, ${theme.palette.mode === 'light' ? 0.1 : 0.1})`,
  }
  const styleBoxImgPerson = {
    backgroundColor: theme.palette.background.badge,
    boxShadow: `0px 7px 25px 0 rgba(${theme.palette.background.shadow}, ${theme.palette.mode === 'light' ? 0.1 : 0.1})`,
  }

  const roleTeam = {
    backgroundColor: theme.palette.background.roleTeam,
    color: `var(--yellow-team)`,
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
      
      <div className="container container--xlarge">
      <ul className={`${styleTeam['collection-02__list']}`}>
        
        {
          /*
tabLinks.map( (link, key) => {
            return(
              
              <Card key={key} sx={{ maxWidth: 345, borderRadius: '0.5vw', margin:'1vw' }} elevation={10}>
      <CardMedia
        component="img"
        height="100%"
        image={`https://gateway.pinata.cloud/ipfs/QmQMm3QDhFVHWJbLjABpgytDqxnAkR4EYNnajHWThi5vYg/images/${(parseInt(key + 1))}.png`}
        alt={`WinnoBearz#${key + 1}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="text.primary">
          <strong>WinnoBearz NFT</strong> <br/>
          WinnoBearz#{key + 1}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {smartContract.currentSupply}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    
            )
          } )
          */
        }
        </ul>
      


        <div style={{display: 'flex', justifyContent:'center', alignContent:'center'}}>
        <ul className={`${styleTeam['team-02__list']}`}>
          {
            
            filter.map( (nft, index) => {
              let member;
              return(
                <li key={index} className={`${styleTeam['team-02__person']}`} style={styleBoxPerson}>
                  <div className="">
                    <div className={`${styleTeam['team-02__person_img_box']}`} style={styleBoxImgPerson}>
                      <img loading="lazy" className={`${styleTeam['team-02__person_img']}`} src={nft.link} alt="Pic team" />
                    </div>
                    <div className={`${styleTeam['team-02__person_name']}`}>{`WinnoBearz#${index + 1}`}</div>
                    <div className={`${styleTeam['team-02__person_tag']}`}>
                      <span className={`tag color-main bg-light`} style={roleTeam}>
                        <span className="">{'WinnoBearz NFT'}</span>
                      </span>
                    </div>
                    <div className={`${styleTeam['team-02__person_about']} content_box`}>
                      <p><strong>&nbsp;{'member.club'}&nbsp;</strong></p>
                    </div>
                    <div className={`${styleTeam['team-02__person_social']}`}>
                      <div className="social-buttons">
                        <ul className="social-buttons__list" style={{textAlign: 'center'}}>

                         {
                          /*
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
                          */
                         }

                          
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })

            
          }

        </ul>
        </div>

        {
          /*
<iframe src='https://opensea.io/collection/winnobearz-nft?embed=true'
        width='100%'
        height='1000px'
        frameborder='0'
        allowFullscreen></iframe>

<nft-card
    contractAddress="0x1301566b3cb584e550a02d09562041ddc4989b91"
    tokenId="28">
    </nft-card>

    <nft-card
    contractAddress="0x056C2A5Ec90A78CaD6F36925dDF4DE35cFc0DD57"
    tokenId="90"
    network="mainnet"
 // referrerAddress="YOUR_ADDRESS_HERE"
  >
    </nft-card>
          */
        }
        <div className="bottom_cta"></div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Collections;