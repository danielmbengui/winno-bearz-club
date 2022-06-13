import React, { useState,useEffect, useRef, useContext } from 'react';
import { useTheme, } from '@mui/material/styles';
import Link from 'next/link';
import stylePromo from "./Promo.module.css";
import { Chip, Divider } from '@mui/material';

const Promo = ({links}) => {
  const theme = useTheme();
  const [opensea, setOpensea] = useState(theme.palette.mode === 'light' ? links.OPENSEA_IMAGE_PATH_BLACK : links.OPENSEA_IMAGE_PATH_WHITE);
  const [skurpy, setSkurpy] = useState(theme.palette.mode === 'light' ? links.SKURPY_IMAGE_PATH_BLACK : links.SKURPY_IMAGE_PATH_WHITE);

  const [disboard, setDisboard] = useState(theme.palette.mode === 'light' ? links.DISBOARD_IMAGE_PATH_BLACK : links.DISBOARD_IMAGE_PATH_WHITE);

  const [nftCalendar, setNftCalendar] = useState(theme.palette.mode === 'light' ? links.NFT_CALENDAR_IMAGE_PATH_BLACK : links.NFT_CALENDAR_IMAGE_PATH_WHITE);
  const [raritySniper, setRaritySniper] = useState(theme.palette.mode === 'light' ? links.RARITY_SNIPER_IMAGE_PATH_BLACK : links.RARITY_SNIPER_IMAGE_PATH_WHITE);

  const [nftDesire, setNftDesire] = useState(theme.palette.mode === 'light' ? links.NFT_DESIRE_IMAGE_PATH_BLACK : links.NFT_DESIRE_IMAGE_PATH_WHITE);
  const [nextNftDrop, setNextNftDrop] = useState(theme.palette.mode === 'light' ? links.NEXT_NFT_DROP_IMAGE_PATH_BLACK : links.NEXT_NFT_DROP_IMAGE_PATH_WHITE);
  const [nftEvening, setNftEvening] = useState(theme.palette.mode === 'light' ? links.NFT_EVENING_IMAGE_PATH_BLACK : links.NFT_EVENING_IMAGE_PATH_WHITE);
  const [earlyCoins, setEarlyCoins] = useState(theme.palette.mode === 'light' ? links.EARLY_COINS_IMAGE_PATH_BLACK : links.EARLY_COINS_IMAGE_PATH_WHITE);
  const [newNextNftDrop, setNewNextNftDrop] = useState(theme.palette.mode === 'light' ? links.NEW_NEXT_NFT_DROP_IMAGE_PATH_BLACK : links.NEW_NEXT_NFT_DROP_IMAGE_PATH_WHITE);
  const [nftUnicorn, setNftUnicorn] = useState(theme.palette.mode === 'light' ? links.NFT_UNICORN_IMAGE_PATH_BLACK : links.NFT_UNICORN_IMAGE_PATH_WHITE);
  const [icoHolder, setIcoHolder] = useState(theme.palette.mode === 'light' ? links.ICO_HOLDER_IMAGE_PATH_BLACK : links.ICO_HOLDER_IMAGE_PATH_WHITE);
  const [nftList, setNftList] = useState(theme.palette.mode === 'light' ? links.NFT_LIST_IMAGE_PATH_BLACK : links.NFT_LIST_IMAGE_PATH_WHITE);
  
  const [nextDrop, setNextDrop] = useState(theme.palette.mode === 'light' ? links.NFT_DROP_IMAGE_PATH_BLACK : links.NFT_DROP_IMAGE_PATH_WHITE);

  const [nftDropsCalendar, setNftDropsCalendar] = useState(theme.palette.mode === 'light' ? links.NFT_DROPS_CALENDAR_IMAGE_PATH_BLACK : links.NFT_DROPS_CALENDAR_IMAGE_PATH_WHITE);
  const [upcomingNft, setUpcomingNft] = useState(theme.palette.mode === 'light' ? links.UPCOMING_IMAGE_PATH_BLACK : links.UPCOMING_IMAGE_PATH_WHITE);
  const [nftHypeDrops, setNftHypeDrops] = useState(theme.palette.mode === 'light' ? links.NFT_HYPERDROPS_IMAGE_PATH_BLACK : links.NFT_HYPERDROPS_IMAGE_PATH_WHITE);

  useEffect( () => {
    setOpensea(theme.palette.mode === 'light' ? links.OPENSEA_IMAGE_PATH_BLACK : links.OPENSEA_IMAGE_PATH_WHITE);
    setSkurpy(theme.palette.mode === 'light' ? links.SKURPY_IMAGE_PATH_BLACK : links.SKURPY_IMAGE_PATH_WHITE);
    setDisboard(theme.palette.mode === 'light' ? links.DISBOARD_IMAGE_PATH_BLACK : links.DISBOARD_IMAGE_PATH_WHITE);
    setNftCalendar(theme.palette.mode === 'light' ? links.NFT_CALENDAR_IMAGE_PATH_BLACK : links.NFT_CALENDAR_IMAGE_PATH_WHITE);
    setRaritySniper(theme.palette.mode === 'light' ? links.RARITY_SNIPER_IMAGE_PATH_BLACK : links.RARITY_SNIPER_IMAGE_PATH_WHITE);

    setNftDesire(theme.palette.mode === 'light' ? links.NFT_DESIRE_IMAGE_PATH_BLACK : links.NFT_DESIRE_IMAGE_PATH_WHITE);
    setNextNftDrop(theme.palette.mode === 'light' ? links.NEXT_NFT_DROP_IMAGE_PATH_BLACK : links.NEXT_NFT_DROP_IMAGE_PATH_WHITE);
    setNftEvening(theme.palette.mode === 'light' ? links.NFT_EVENING_IMAGE_PATH_BLACK : links.NFT_EVENING_IMAGE_PATH_WHITE);
    setEarlyCoins(theme.palette.mode === 'light' ? links.EARLY_COINS_IMAGE_PATH_BLACK : links.EARLY_COINS_IMAGE_PATH_WHITE);
    setNewNextNftDrop(theme.palette.mode === 'light' ? links.NEW_NEXT_NFT_DROP_IMAGE_PATH_BLACK : links.NEW_NEXT_NFT_DROP_IMAGE_PATH_WHITE);
    setNftUnicorn(theme.palette.mode === 'light' ? links.NFT_UNICORN_IMAGE_PATH_BLACK : links.NFT_UNICORN_IMAGE_PATH_WHITE);
    setIcoHolder(theme.palette.mode === 'light' ? links.ICO_HOLDER_IMAGE_PATH_BLACK : links.ICO_HOLDER_IMAGE_PATH_WHITE);
    setNftList(theme.palette.mode === 'light' ? links.NFT_LIST_IMAGE_PATH_BLACK : links.NFT_LIST_IMAGE_PATH_WHITE);
    setNextDrop(theme.palette.mode === 'light' ? links.NFT_DROP_IMAGE_PATH_BLACK : links.NFT_DROP_IMAGE_PATH_WHITE);

    setNftDropsCalendar(theme.palette.mode === 'light' ? links.NFT_DROPS_CALENDAR_IMAGE_PATH_BLACK : links.NFT_DROPS_CALENDAR_IMAGE_PATH_WHITE);
    setUpcomingNft(theme.palette.mode === 'light' ? links.UPCOMING_IMAGE_PATH_BLACK : links.UPCOMING_IMAGE_PATH_WHITE);
    setNftHypeDrops(theme.palette.mode === 'light' ? links.NFT_HYPERDROPS_IMAGE_PATH_BLACK : links.NFT_HYPERDROPS_IMAGE_PATH_WHITE);
  }, [theme.palette.mode]);
    return(
        <div style={{backgroundColor:theme.palette.background.footer}} className="page-component__bg_image_box page-component__bg_image_box--dark-bg" id="clients-03-535761">
          <Divider>
            <Chip label='Promo' color='colorChip' />
          </Divider>
  <div className="page-component__bg_overlay_box "></div>
  <div className="page-component__wrapper" style={{
            zIndex: 10,
            paddingTop:'50px',
            paddingBottom:'50px',
        }}>
    <div className="clients-03">
      <div className="container container--small">
        <div className="title-box title-box--center">
          {/* <h2 className="heading  text-white">PROMO</h2> */}
        </div>
      </div>
      <div className="container container--mid">
        <ul className="clients-03__list">
          <li className="clients-03__item">
            <Link href={links.OPENSEA_LINK}>
              <a className={`clients-03__img_box ${stylePromo["link"]}`} target="_blank">
                <img loading="lazy" alt="Opensea" className="clients-03__logo" src={opensea} height="40" />
              </a>
            </Link>
          </li>

          <li className="clients-03__item">
            <Link href={links.SKURPY_LINK}>
              <a className={`clients-03__img_box ${stylePromo["link"]}`} target="_blank">
                <img loading="lazy" alt="Skurpy" className="clients-03__logo" src={skurpy} height="40" />
              </a>
            </Link>
          </li>

         

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_CALENDAR_LINK} target="_blank" style={{display: 'flex', direction: 'row', alignItems:'center', justifyItems:'center', textDecoration:'none'}}>
              <span style={{color:theme.palette.text.primary, fontWeight:'bold'}}>As seen on</span>
              <img loading="lazy" alt="NftCalendar" className="clients-03__logo" src={nftCalendar} height="90" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.RARITY_SNIPER_LINK} target="_blank">
              <img loading="lazy" alt="RaritySniper" className="clients-03__logo" src={raritySniper} height="50" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_DESIRE_LINK} target="_blank">
              <img loading="lazy" alt="NftDesire" className="clients-03__logo" src={nftDesire} height="40" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_DROPS_CALENDAR_LINK} target="_blank">
              <img loading="lazy" alt="NftDropsCalendar" className="clients-03__logo" src={nftDropsCalendar} height="40" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NEXT_NFT_DROP_LINK} target="_blank">
              <img loading="lazy" alt="NextNftDrop" className="clients-03__logo" src={nextNftDrop} height="60" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_EVENING_LINK} target="_blank">
              <img loading="lazy" alt="NftEvening" className="clients-03__logo" src={nftEvening} height="40" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.EARLY_COINS_LINK} target="_blank">
              <img loading="lazy" alt="Earlycoins" className="clients-03__logo" src={earlyCoins} height="40" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NEW_NEXT_NFT_DROP_LINK} target="_blank">
              <img loading="lazy" alt="NextNFTDrop" className="clients-03__logo" src={newNextNftDrop} height="40" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_UNICORN_LINK} target="_blank">
              <img loading="lazy" alt="Unicorn" className="clients-03__logo" src={nftUnicorn} height="40" />
            </a>
          </li>

          <li className="clients-03__item">
            <Link href={links.DISBOARD_LINK}>
              <a className={`clients-03__img_box ${stylePromo["link"]}`} target="_blank">
                <img loading="lazy" alt="Opensea" className="clients-03__logo" src={disboard} height="40" />
              </a>
            </Link>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.ICO_HOLDER_LINK} target="_blank">
              <img loading="lazy" alt="Ico Holder" className="clients-03__logo" src={icoHolder} height="40" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_LIST_LINK} target="_blank">
              <img loading="lazy" alt="Nft List" className="clients-03__logo" src={nftList} height="40" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_DROP_LINK} target="_blank">
              <img loading="lazy" alt="Nextdrop" className="clients-03__logo" src={nextDrop} height="40" />
            </a>
          </li>




          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.UPCOMING_LINK} target="_blank">
              <img loading="lazy" alt="Upcoming" className="clients-03__logo" src={upcomingNft} height="50" />
            </a>
          </li>

          <li className="clients-03__item">
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_HYPERDROPS_LINK} target="_blank">
              <img loading="lazy" alt="Upcoming" className="clients-03__logo" src={nftHypeDrops} height="50" />
            </a>
          </li>

          

          <li className="clients-03__item" style={{display: 'none'}}>
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.RARITY_TOOLS_LINK} target="_blank">
              <img loading="lazy" alt="NftDesire" className="clients-03__logo" src={links.RARITY_TOOLS_IMAGE_PATH_WHITE} height="40" />
            </a>
          </li>

          <li className="clients-03__item" style={{display:'none'}}>
            <a className={`clients-03__img_box ${stylePromo["link"]}`} href={links.NFT_DROOPS_LINK} target="_blank">
              <img loading="lazy" alt="NftDroops" className="clients-03__logo" src={links.NFT_DROOPS_IMAGE_PATH_WHITE} height="40" />
            </a>
          </li>          
        </ul>
        <div className="bottom_cta"></div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Promo;