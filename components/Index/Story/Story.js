import React from 'react';
import Link from "next/link";
import styleStory from "./Story.module.css";
import Parchment from '../../Surfaces/Parchment';
const advertise = "/assets/img/Story/advertise.gif";

const Story = () => {
  return (
    <Parchment
      title={'WINNOBEARZ CLUB'}
      content={
        <div className="content_box" style={{ display: "flex", justifyItems: "center", alignItems: "center", flexDirection: "column" }}>
          <div>
            <p>Long ago, the WinnoBearz Club lived together in harmony on the Bearz Coast. Then everything changed when the evil nation attacked.</p>
            <p></p>
            <p>The bearz wizard named BelzeBearz has casted a malicious spell that separated pixelated WinnoBearz heads from their bodies and scattered them around the globe.</p>
            <p>The time has come for vigilant heroes to collect the heads and stop the evil fire bearz.</p>
            <p>The only question is – will you be one of the HolyBearz ?</p>
          </div>
          <div style={{ marginTop: "3vh" }} className={`${styleStory['div-advertise']}`}>
            <Link href="/mint"><a style={{ cursor: "pointer" }}><img src={advertise} alt="advertise" style={{ width: "100%" }} /></a></Link>
          </div>
        </div>
      }
    />
  )
}

export default Story;