import React, { useState,useEffect, useRef, useContext } from 'react';
import { useTheme, } from '@mui/material/styles';


const Parchment = ({title, content, style}) => {
    const theme = useTheme();
    const styleContentBox = {
        //backgroundColor: theme.palette.background.card,
        boxShadow: `0px 2px 4px 0 rgba(${theme.palette.background.shadowParchment}, ${theme.palette.mode === 'light' ? 0.1 : 0.1}),
        0px 5px 15px 0 rgba(${theme.palette.background.shadow}, ${theme.palette.mode === 'light' ? 0.1 : 0.1})`,
        background:theme.palette.background.parchment,
      }

      const styleContentBoxBottom = {
        //backgroundColor: theme.palette.background.card,
        boxShadow: `0px 2px 4px 0 rgba(${theme.palette.background.shadowParchment}, ${theme.palette.mode === 'light' ? 0.1 : 0.1}),
        0px 5px 15px 0 rgba(${theme.palette.background.shadow}, ${theme.palette.mode === 'light' ? 0.1 : 0.1})`,
        background:theme.palette.background.card,
      }

    //box-shadow: 0 2px 4px 0 rgba(136, 144, 195, 0.2), 0 5px 15px 0 rgba(37, 44, 97, 0.15);
    return(
        <div className="page-component__bg_image_box" id="text-02-853101" style={style}>
        <div className="page-component__bg_overlay_box"></div>
        <div className="page-component__wrapper" style={{
            zIndex: 19,
            paddingTop:'50px',
            paddingBottom:'50px',
            color:theme.palette.text.primary,
        }}>
          <section>
            <div className="text--02">
              <div className="container container--mid">
                <div className="text--02__box">
                  <div className="text--02__content_box text--02__content_box--bottom" style={styleContentBox}></div>
                  <div className="text--02__content_box text--02__content_box--top" style={styleContentBox}>
                    <div className="text--02__img">
                      <img loading="lazy" src="/assets/logo.png" alt="Bearz club" className="" height="100" />
                    </div>
                    
                    <h3 style={{color:theme.palette.text.primary}}>{title}</h3>
                    {content}
                  </div>
                </div>
              </div>
            </div>

            

          </section>
        </div>
      </div>
    )
}

export default Parchment;