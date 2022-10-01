import React, { useState,useEffect, useRef, useContext } from 'react';
import { useTheme, } from '@mui/material/styles';
import Link from 'next/link';

const Features = ({contractInfo, links}) => {
    const theme = useTheme();
    return(
        <div className="page-component__bg_image_box" id="text-06-567221">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 15,
            paddingTop:'50px',
            paddingBottom:'50px',
            color:theme.palette.text.primary
        }}>
    <section>
      <div className="text--06">
        <div className="container container--small">
          <div className="title-box title-box--center">
            <h2 className="heading" style={{color:theme.palette.text.primary}}>FEATURES</h2>
          </div>
        </div>
        <div className="container container--small">
          <ul className="text--06__list">
            <li className="text--06__item">
              <div className="text--06__box">
                <div className="text--06__img">
                  <img loading="lazy" src="assets/img/others/right.png" width="100%" className="" />
                </div>
                <div className="text--06__text">
                  <h2 className="" style={{color:theme.palette.text.primary}}>{contractInfo.totalSupply.toLocaleString('en-US')} unique WinnoBearz</h2>
                  <div className="content_box ">
                    <div className="content_box" >Each WinnoBearz NFT is generated automatically by combining 194 traits.</div>
                  </div>
                </div>
              </div>
            </li>
            <li className="text--06__item">
              <div className="text--06__box">
                <div className="text--06__img">
                  <img loading="lazy" src="assets/img/others/winno_community.png" width="100%" className="" />
                </div>
                <div className="text--06__text">
                  <h2 className="" style={{color:theme.palette.text.primary}}>Be the luckiest each withdraw</h2>
                  <div className="content_box ">
                    <div className="content_box ">Each time the team will withdraw funds, a randomly user will be choosen to recieve 5% of the amount.</div>
                  </div>
                </div>
              </div>
            </li>
            <li className="text--06__item">
              <div className="text--06__box">
                <div className="text--06__img">
                  <img loading="lazy" src="assets/img/others/hand.png" width="100%" className="" />
                </div>
                <div className="text--06__text">
                  <h2 className="" style={{color:theme.palette.text.primary}}>Truly yours</h2>
                  <div className="content_box ">
                    <div className="content_box ">You can do everything you want with your WinnoBearz NFT. Keep, give or even resell them!</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="bottom_cta">
            <div className="buttons-set">
              <ul className="buttons-set__list">

              <li className="buttons-set__item">
                  <Link href={links.OPENSEA_LINK}>
                    <a data-stripe-product-id="" data-stripe-mode="payment" data-successful-payment-url="" data-cancel-payment-url="" className="pill-link pill-link--opensea" target="_blank">
                      <span className="pill-link__pill">Opensea</span>
                      <span className="pill-link__text">Buy</span>
                      <span className="pill-link__icon">
                        <span className="icon">
                          <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill="#00396B"></path>
                          </svg>
                        </span>
                      </span>
                    </a>
                  </Link>
                </li>

              <li className="buttons-set__item">
                    <Link href={links.TWITTER_LINK}>
                      <a data-stripe-product-id="" data-stripe-mode="payment" data-successful-payment-url="" data-cancel-payment-url="" className="pill-link pill-link--twitter" target="_blank">
                        <span className="pill-link__pill">Twitter</span>
                        <span className="pill-link__text">Follow</span>
                        <span className="pill-link__icon">
                          <span className="icon">
                            <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill="#00396B"></path>
                            </svg>
                          </span>
                        </span>
                      </a>
                    </Link>
                </li>

                

                <li className="buttons-set__item" style={{display:'none'}}>
                  <Link href={links.DISCORD_LINK}>
                    <a data-stripe-product-id="" data-stripe-mode="payment" data-successful-payment-url="" data-cancel-payment-url="" className="pill-link   pill-link--discord" target="_blank">
                      <span className="pill-link__pill">Discord</span>
                      <span className="pill-link__text">Join</span>
                      <span className="pill-link__icon">
                        <span className="icon">
                          <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill="#00396B"></path>
                          </svg>
                        </span>
                      </span>
                    </a>
                  </Link>
                </li>

                <li className="buttons-set__item" style={{display: 'none'}}>
                  <Link href={links.GITHUB_LINK}>
                    <a data-stripe-product-id="" data-stripe-mode="payment" data-successful-payment-url="" data-cancel-payment-url="" className="pill-link   pill-link--github" target="_blank">
                      <span className="pill-link__pill">GitHub</span>
                      <span className="pill-link__text"> Pull us </span>
                      <span className="pill-link__icon">
                        <span className="icon">
                          <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill="#00396B"></path>
                          </svg>
                        </span>
                      </span>
                    </a>
                  </Link>
                </li>

                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
    )
}

export default Features;