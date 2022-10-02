import React from 'react';
import { useTheme, } from '@mui/material/styles';
import {GoToMintPageButton} from "../../Buttons/Buttons";

const About = ({contractInfo, rarities}) => {
  const theme = useTheme();
    return(
        <div className="page-component__bg_image_box" id="steps-03-731751">
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 18,
            paddingTop:'50px',
            paddingBottom:'50px',
            color:theme.palette.text.primary
        }}>
    <div className="steps-03">
      <div className="container container--small">
        <div className="title-box title-box--center">
          <h2 className="heading" style={{color:theme.palette.text.primary}}>WinnoBearz NFT</h2>
          <div className="title-box__text content_box ">
            <p>Each WinnoBearz NFT is unique and some others are more difficult to catch.</p>
            <p>Find the rarest ones among more than <strong>{contractInfo.totalSupply.toLocaleString('en-US')}</strong> possible combinations. </p>
            <p>The total value of each NFT is defined by <strong>the addition</strong> of each layer's point. </p>
          </div>
        </div>
      </div>
      <div className="container">
        <ul className="steps-03__list">
          {
            rarities.map( (rarity, index) => {
              return(
                <li key={index} className="steps-03__item steps-03__item--1-5">
                  <div className="steps-03__img_box">
                    <img loading="lazy" src={rarity.GIF} alt={rarity.NAME} data-width="120" data-height="136" className="steps-03__img " />
                    {
                      index !== rarities.length -1 ? (
                        <div className="steps-03__icon">
                      <span className="icon">
                        <svg viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.823 4.164L8.954.182a.592.592 0 0 0-.854 0 .635.635 0 0 0 0 .88l2.836 2.92H.604A.614.614 0 0 0 0 4.604c0 .344.27.622.604.622h10.332L8.1 8.146a.635.635 0 0 0 0 .88.594.594 0 0 0 .854 0l3.869-3.982a.635.635 0 0 0 0-.88z" fillRule="nonzero" fill={theme.palette.text.primary} className="fill-main"></path>
                        </svg>
                      </span>
                    </div>
                      ) : ( <div></div> )
                    }
                  </div>
                  <div className="steps-03__text ">{rarity.NAME} - {rarity.PERCENTAGE} %</div>
                </li>
              )
            })
          }
        </ul>
        <div className="bottom_cta">
          <div className="buttons-set">
            <ul className="buttons-set__list">
              <li className="buttons-set__item">
                <GoToMintPageButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default About;