import React from "react";
import { useTheme, } from '@mui/material/styles';
import Link from 'next/link';
import styleFAQ from "./FAQ.module.css";
const FAQ = ({links, contractInfo}) => {
  const theme = useTheme();

  const redirect = () => {
    window.location.href = "mailto:" + links.EMAIL_LINK;
  }

  const styleLi = {
    backgroundColor: 'transparent',
	  border: `2px solid ${theme.palette.background.border}`,
    color:theme.palette.text.primary,
  }

  const faqItems = [
    {
      title: 'What is NFT?',
      component:<p>A <strong>Non Fungible Token</strong> ( <strong>NFT</strong>) is a unique and non-interchangeable unit of data stored on a blockchain, a form of digital ledger. NFTs can be associated with reproducible digital files such as photos, videos, and audio. </p>,
    },
    {
      title: `What is ${contractInfo.network.name}?`,
      component:<><p>{contractInfo.network.name} is a decentralized, open-source blockchain with smart contract functionality. {contractInfo.network.symbol} is the native cryptocurrency of the platform.</p>
      <p>{contractInfo.network.name} bills itself as a layer-2 network of Ethereum.</p></>,
    },
    {
      title: 'What about the price?',
      component:<p>The minting price is {contractInfo.displayCost} {contractInfo.network.symbol}.</p>,
    },
    {
      title:'How can I get one WinnoBearz NFT? ',
      component:<ul>
      <li>Go to the <Link href="/mint">Mint Page</Link></li>
      <li style={{display:'none'}}>Go to Marketplace : <Link href={contractInfo.marketplaces.opensea.url}><a target="_blank">{contractInfo.marketplaces.opensea.name}</a></Link></li>

    </ul>,
    },
    {
      title:'WinnoBearz NFT smart contract address?',
      component:<><p><strong>Network :</strong> {contractInfo.network.name}</p>
      <p><strong>{contractInfo.scan.name} :</strong> <Link href={contractInfo.scan.link_code}><a target="_blank">{contractInfo.address}</a></Link>&nbsp; </p></>,
    },
    {
      title:'About Winno lottery?',
      component: <p>Each time the team will withwdraw funds, a random holder will be choosen to recieve 5% of the total amount.</p>,
    },
    {
      title:'Join us?',
      component:<><div>
      <a onClick={redirect} target="_blank" style={{cursor:"pointer", color: 'var(--text-primary)'}}>
        <img loading="lazy" className="social-buttons__icon" alt="discord icon" src={theme.palette.mode === 'light' ? links.EMAIL_IMAGE_PATH_BLACK : links.EMAIL_IMAGE_PATH_WHITE} style={{marginRight:"1vw"}} />
        Email : contact@bearzclub.io</a>
      </div>

        <div style={{display:'none'}}>
        <Link href={links.DISCORD_LINK}>
        <a target="_blank" style={{cursor:"pointer", color: 'var(--text-primary)'}}>
        <img loading="lazy" className="social-buttons__icon" alt="discord icon" src={theme.palette.mode === 'light' ? links.DISCORD_IMAGE_PATH_BLACK : links.DISCORD_IMAGE_PATH_WHITE} style={{marginRight:"1vw"}} />
        Discord : WinnoBearz NFT</a>
        </Link>
        </div>

        <div>
        <Link href={links.TWITTER_LINK}>
        <a target="_blank" style={{cursor:"pointer", color: 'var(--text-primary)'}}>
        <img loading="lazy" className="social-buttons__icon" alt="discord icon" src={theme.palette.mode === 'light' ? links.TWITTER_IMAGE_PATH_BLACK : links.TWITTER_IMAGE_PATH_WHITE} style={{marginRight:"1vw"}} />
        Twitter : WinnoBearzClub</a>
        </Link>
        </div></>,
    }
  ]


  
    return(
        <div className="page-component__bg_image_box" id="faq-01-175471">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 18,
            paddingTop:'50px',
            paddingBottom:'50px',
            color:theme.palette.text.primary
        }}>
    <div className="faq-01">
      <div className="container container--small">
        <div className="title-box title-box--center">
          
          <div className="title-box__text content_box " style={{color:theme.palette.text.primary}}>
            <p>You ask – we tell.</p>
          </div>
        </div>
      </div>
      <div className="container container--small">
        <ul className="faq-01__list" >
          {
            faqItems.map( (element, index) => {
                return(
                  <li key={index} className="faq-01__item">
            <button className={`${styleFAQ['faq-01__question']} js-open-faq color-main`} type="button" style={styleLi}>
              <div className="faq-01__question_text">{element.title}<div className="faq-01__arrow_icon">
                  <span className="icon">
                    <svg width="12px" height="7px" viewBox="0 0 12 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g id="styleguide" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                        <g id="Unicorn-Styleguide" transform="translate(-1182.000000, -2712.000000)" strokeWidth="2" stroke={"var(--primary)"} className="stroke-main">
                          <g id="Messages" transform="translate(81.000000, 2467.000000)">
                            <g id="toolstips" transform="translate(791.000000, 57.000000)">
                              <g id="Tooltip" transform="translate(1.000000, 98.000000)">
                                <polyline id="Line" points="310.5 95.5 315 91 319.5 95.5"></polyline>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="faq-01__answer js-faq-item" >
                <div className="content_box">
                  <div className="faq-01__answer_text" style={{color:theme.palette.text.primary}}>
                    {element.component}
                  </div>
                </div>
              </div>
            </button>
          </li>
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

export default FAQ;