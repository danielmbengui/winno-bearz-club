import React, { useState,useEffect, useRef, useContext } from 'react';
import { useTheme, } from '@mui/material/styles';
import Link from "next/link";
import styleStory from "./Story.module.css";
import Parchment from '../Surfaces/Parchment';
const advertise = "/assets/advertise.gif";

const Story = () => {
  const theme = useTheme();
    return(
        <>
        <Parchment 
          title={'WINNOBEARZ CLUB'} 
          content={
            <div className="content_box" style={{display:"flex", justifyItems:"center", alignItems:"center", flexDirection:"column"}}>
            <div>
              <p>Long ago, the WinnoBearz Club lived together in harmony on the Bearz Coast. Then everything changed when the evil nation attacked.</p>
              <p></p>
              <p>The bearz wizard named BelzeBearz has casted a malicious spell that separated pixelated WinnoBearz heads from their bodies and scattered them around the globe.</p>
              <p>The time has come for vigilant heroes to collect the heads and stop the evil fire bearz.</p>
              <p>The only question is – will you be one of the HolyBearz ?</p>
            </div>
            <div style={{marginTop:"3vh"}} className={`${styleStory['div-advertise']}`}>
              <Link href="/mint"><a style={{cursor:"pointer"}}><img src={advertise} alt="advertise" style={{width:"100%"}} /></a></Link>
            </div>
            </div>
          }
          />
{
  /*
          <div className="page-component__bg_image_box    bg-white-color   " id="text-02-853101">
        <div className="page-component__bg_overlay_box"></div>
        <div className="page-component__wrapper" style={{
            zIndex: 19,
            paddingTop:'50px',
            paddingBottom:'50px',
        }}>
          <section>
            <div className="text--02">
              <div className="container container--mid">
                <div className="text--02__box">
                  <div className="text--02__content_box text--02__content_box--bottom"></div>
                  <div className="text--02__content_box text--02__content_box--top">
                    <div className="text--02__img">
                      <img loading="lazy" src="/assets/logo.png" alt="Bearz club" className="" height="100" />
                    </div>
                    <h3>WINNOBEARZ CLUB</h3>
                    <div className="content_box" style={{display:"flex", justifyItems:"center", alignItems:"center", flexDirection:"column"}}>
                      <div>
                        <p>Long ago, the WinnoBearz Club lived together in harmony on the Bearz Coast. Then everything changed when the evil nation attacked.</p>
                        <p></p>
                        <p>The bearz wizard named BelzeBearz has casted a malicious spell that separated pixelated WinnoBearz heads from their bodies and scattered them around the globe.</p>
                        <p>The time has come for vigilant heroes to collect the heads and stop the evil fire bearz.</p>
                        <p>The only question is – will you be one of the HolyBearz ?</p>
                      </div>
                      <div style={{marginTop:"3vh"}} className={`${styleStory['div-advertise']}`}>
                        <Link href="/mint"><a style={{cursor:"pointer"}}><img src={advertise} alt="advertise" style={{width:"100%"}} /></a></Link>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            

          </section>
        </div>
      </div>
      */
}
        </>
    )
}

export default Story;