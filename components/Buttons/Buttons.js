import React, {useState} from "react";
import { useSelector } from "react-redux";
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';
import PlumbingIcon from '@mui/icons-material/Plumbing';

import { connectUser, switchToWinnoNetwork } from "../../redux/user/userActions";
import { useTheme, } from '@mui/material/styles';
import styleButtons from "./Buttons.module.css";

export const InstallMetamaskButton = () => {
    const user = useSelector((state) => state.user);
    let content = <div></div>;
    if( !user.isMetaMaskInstalled ){
      content = <button className={`button button-install-metamask`} onClick={()=>{
        window.open("https://metamask.app.link/dapp/bearzclub.io");
      }} >
      <span className="button__text">Install Metamask</span>
    </button>;
    }
    return(
        user.isMetaMaskInstalled !== null ? !user.isMetaMaskInstalled && (
            <button className={`button button-install-metamask`} onClick={()=>{
                window.open("https://metamask.app.link/dapp/bearzclub.io");
              }} >
              <span className="button__text">Install Metamask</span>
            </button>
        ) : ( <div></div>)
    )
  }

  export const ConnectToWebsiteButton = () => {
    const user = useSelector((state) => state.user);
    let content = <div></div>;
    if( user.isMetaMaskInstalled !== null && user.isMetaMaskInstalled && !user.isConnected ){
      content = <button className="button button-connect" onClick={connectUser()}>
      <span className="button__text">Connect</span>
    </button>;
    }

    const [loading, setLoading] = useState(false);

    return(
      <div>
        {content}
      </div>
    )
  }

  export const ShowUserAddressButton = () => {
    const theme = useTheme();

  
    
    const user = useSelector((state) => state.user);
    let content = <div></div>;
    if( user.isMetaMaskInstalled !== null && user.isMetaMaskInstalled && user.isConnected ){
      content = <a className={`button button--empty ${styleButtons['button-address-connected']}`} >
      <span className="button__text">{user.account.slice(0,4) + "..." + user.account.slice(-4)}</span>
    </a>;
    }
    return(
      <div>
        {content}
      </div>
    )
  }

  export const GoToMintPageButton = () => {
    return(
      <div>
        <Link href="/mint" >
            <a className="button button-mint">
                <span className="button__text">Mint</span>
            </a>
        </Link>
      </div>
    )
  }

  export const SwitchNetworkButton = () => {
    const user = useSelector((state) => state.user);
    const smartContract = useSelector((state) => state.smartContract);
    let content = <div></div>;
    if( user.isMetaMaskInstalled !== null && user.isMetaMaskInstalled && user.isConnected && (user.networkId !== smartContract.network.networkId) ){
      content = <button className={`button button-switch-network`} onClick={switchToWinnoNetwork()}>
      <span className="button__text">Switch/Add {smartContract.network.name} Network</span>
    </button>;
    }
    return(
      <div>
        {content}
      </div>
    )
  }

  export const MintButton = ({claimingNft, onClickAction, className}) => {
    const user = useSelector((state) => state.user);
    const smartContract = useSelector((state) => state.smartContract);
    let disabled = true;
    const now = Date.now();

    if( (user.isMetaMaskInstalled !== null && user.isMetaMaskInstalled && user.isConnected && (user.networkId === smartContract.networkId)) && 
    parseInt(smartContract.currentSupply) < parseInt(smartContract.totalSupply)){
      disabled = false;
    }
    //console.log({OKKK: parseInt(now / 1000)});
    //console.log({SMART: parseInt(now / 1000) < parseInt(smartContract.mintDate)});
    return(
      <div style={{marginTop: "3vh"}}>
        <LoadingButton
              className={className}
              loading={claimingNft}
              loadingPosition="start"
              startIcon={<PlumbingIcon />}
              onClick={onClickAction}
              variant="contained"
              disabled={disabled}
            >
              Mint
            </LoadingButton>
      </div>
    )
  }

  export const GiveAwayButton = ({_text, _loading, _onClickAction, _className}) => {
    const user = useSelector((state) => state.user);
    const smartContract = useSelector((state) => state.smartContract);
    let disabled = true;
    //const now = Date.now();

    if(parseInt(smartContract.currentGiveAway) < parseInt(smartContract.maxGiveAway)){
      disabled = false;
    }
    console.log({YEEES: smartContract.currentGiveAway + " / " + smartContract.maxGiveAway + " / "})
    //console.log({OKKK: parseInt(now / 1000)});
    //console.log({SMART: parseInt(now / 1000) < parseInt(smartContract.mintDate)});
    return(
      <div style={{marginTop: "3vh"}}>
        <LoadingButton
              className={_className}
              loading={_loading}
              loadingPosition="start"
              startIcon={<PlumbingIcon />}
              onClick={_onClickAction}
              variant="contained"
              disabled={disabled}
            >
              {_text}
            </LoadingButton>
      </div>
    )
  }

  export const StandardButton = ({_text, _loading, _onClickAction, _className}) => {
    const user = useSelector((state) => state.user);
    const smartContract = useSelector((state) => state.smartContract);
    let disabled = true;
    const now = Date.now();

    if( ( smartContract.maxGiveAway ) && 
    parseInt(now / 1000) >= parseInt(smartContract.mintDate)){
      disabled = false;
    }
    //console.log({OKKK: parseInt(now / 1000)});
    //console.log({SMART: parseInt(now / 1000) < parseInt(smartContract.mintDate)});
    return(
      <div style={{marginTop: "3vh"}}>
        <LoadingButton
              className={_className}
              loading={_loading}
              loadingPosition="start"
              startIcon={<PlumbingIcon />}
              onClick={_onClickAction}
              variant="outlined"
              disabled={disabled}
            >
              {_text}
            </LoadingButton>
      </div>
    )
  }