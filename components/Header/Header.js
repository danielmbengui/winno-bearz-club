//import honey_bee from "../../assets/honey_bee.gif";
import React, { useEffect, useState, useRef } from "react";
import { useTheme, } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { fetchContract  } from "../../redux/contract/contractActions";
import Link from 'next/link';
import styleHeader from './Header.module.css';
const honey_bee = "/assets/img/others/honey_bee.gif";
const honey_bearz = "/assets/img/others/honey_bearz.gif";
const advertise = "/assets/img/others/advertise.png";
const advertise_dark = "/assets/img/others/advertiseBlack.png";

function getTimeRemaining(timeMilli) {
   let days = Math.floor(timeMilli / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeMilli % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeMilli % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeMilli % (1000 * 60)) / 1000);

  return{
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

const Header = ({contractInfo}) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const textColor = theme.palette.text.primary;
  //const dispatch = useDispatch();
  //const smartContract = useSelector((state) => state.smartContract);
  //const [mintDate, setMintDate] = useState(contractInfo.mintDate);

  //const mintDate = contractInfo.mintDate;
  //const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(contractInfo.mintDate - new Date().getTime()));

  
  //var countDownDate = new Date(smartContract.mintDate).getTime(); 
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const mintDateString = new Date(contractInfo.mintDate).toLocaleString("en-US");
  const [result, setResult] = useState(""); // timeRemaining.days + "d " + timeRemaining.hours + "h " + timeRemaining.minutes + "m " + timeRemaining.seconds + "s "

  useEffect( () => {
    let timeRemaining = getTimeRemaining(contractInfo.mintDate - Date.now());
    setDaysRemaining(timeRemaining.days);
    setHoursRemaining(timeRemaining.hours);
    setMinutesRemaining(timeRemaining.minutes);
    setSecondsRemaining(timeRemaining.seconds);
    setResult(timeRemaining.days + "d " + timeRemaining.hours + "h " + timeRemaining.minutes + "m " + timeRemaining.seconds + "s ");
    var enableDate = setInterval(function() {
      // Get today's date and time
      //var now = new Date().getTime();
  
      // Find the distance between now and the count down date
      //var distance = mintDate - now;
      var distance = getTimeRemaining(contractInfo.mintDate - Date.now());

      setDaysRemaining(distance.days);
      setHoursRemaining(distance.hours);
      setMinutesRemaining(distance.minutes);
      setSecondsRemaining(distance.seconds);

      setResult(distance.days + "d " + distance.hours + "h "
      + distance.minutes + "m " + distance.seconds + "s ");
  
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(enableDate);
        setDaysRemaining(0);
        setHoursRemaining(0);
        setMinutesRemaining(0);
        setSecondsRemaining(0);
        setResult("EXPIRED");
      }
    }, 1000);

    return () => clearInterval(enableDate);
  }, [Date.now()])

  


  


  

    return(
        <div className={`page-component__bg_image_box page-component__bg_image_box--dark-bg bg-${theme.palette.mode === 'light' ? 'white' : 'black'}-color page-component__bg_image_box--has-image`} id="header-29-306531" 
        style={{backgroundImage: `url("${theme.palette.mode === 'light' ? advertise_dark : advertise}")`, paddingBottom:'50px'}}>
  <div className="page-component__bg_overlay_box " style={{opacity: 0.9}}></div>
  <div className="page-component__wrapper" style={{
      zIndex: 110,
      paddingTop:'130px',
      paddingBottom:'30px',
  }}>
    <header className="header-29" >
      <div className="header-29__box" >
        <div className="container container--mid header-29__container">
          <div className="header-29__text_box">

            <h1 className={`heading heading--accent header-29__heading ${styleHeader["divTitle"]}`} style={{color:textColor}}>
              HELP SOME WINNOBEARZ
              </h1>
            <div className="header-29__text content_box" style={{color:textColor}}>
              <p className="divSubtitle">WinnoBearz NFT is a collection of {contractInfo.totalSupply.toLocaleString('en-US')} randomly generated, funny, pixelated made, unique, colorful and creative bearz NFTs living on {contractInfo.network.name}.</p>
            </div>
            <div className="header-29__buttons" style={{marginTop: '3vh'}}>

            {/*
            <p className={`heading heading--accent header-29__heading text-white ${styleHeader["mintDate"]}`}>Mint Date <br/>
            {mintDateString}
            </p>
            */}
            <div style={{display: 'none', direction: 'row', justifyContent:'center', width: '100%', marginBottom: '3vh'}} className={`heading heading--accent header-29__heading text-white ${styleHeader["countdown"]}`}>
              <div className={`heading heading--accent header-29__heading text-white ${styleHeader["countdown-item"]}`}>
                {daysRemaining < 10 ? "0" + daysRemaining : daysRemaining}<br/>
                Days
              </div>

              <div className={`heading heading--accent header-29__heading text-white ${styleHeader["countdown-item"]}`}>
                {hoursRemaining < 10 ? "0" + hoursRemaining : hoursRemaining}<br/>
                Hours
              </div>

              <div className={`heading heading--accent header-29__heading text-white ${styleHeader["countdown-item"]}`}>
                {minutesRemaining < 10 ? "0" + minutesRemaining : minutesRemaining}<br/>
                Minutes
              </div>

              <div className={`heading heading--accent header-29__heading text-white ${styleHeader["countdown-item"]}`}>
                {secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining}<br/>
                Seconds
              </div>
            </div>
            
              <div className="buttons-set">
              
                <ul className="buttons-set__list">
                  <li className="buttons-set__item">
                    <Link href="/mint" >
                    <a className="button button-mint" href="#" target="_self">
                      <span className="button__text">Mint WinnoBearz</span>
                    </a>
                  </Link>
                  </li>
                </ul>
                {/* <div className="content_box cta_bottom_info text-white">Mint price is 0.01 ETH</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</div>
    )
}

export default Header;