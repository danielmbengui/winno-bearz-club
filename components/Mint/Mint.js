//import "./Mint.css";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { updateBlockchain, connect, connectAccount } from "../../redux/blockchain/blockchainActions";
import { fetchContract  } from "../../redux/contract/contractActions";
import { useTheme, } from '@mui/material/styles';
import { fetchData } from "../../redux/data/dataActions";

import Stack from '@mui/material/Stack';
import Link from 'next/link';
import styleMint from "./Mint.module.css";

import Gallery from "../Gallery/Gallery";

//import {InstallMetamaskButton} from "../Buttons/InstallMetamaskButton";
import {InstallMetamaskButton, ConnectToWebsiteButton, SwitchNetworkButton, MintButton} from "../Buttons/Buttons";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Parchment from "../Surfaces/Parchment";

const advertise = "/assets/advertise.gif";

const Mint = ({contractInfo, promoUrls, rarities, connect}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const smartContract = useSelector((state) => state.smartContract);
  const user = useSelector((state) => state.user);
  
  const web3 = user.web3;

  //const dispatch = useDispatch();
  //const now = Date.now();
  const [mintAmount, setMintAmount] = useState(1);
  const [totalCost, setTotalCost] = useState(contractInfo.displayCost);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(<div></div>);
  const [buttonError, setButtonError] = useState(<div></div>);

  const [name, setName] = useState(contractInfo.name);
  const [symbol, setSymbol] = useState(contractInfo.symbol);
  const [currentSupply, setCurrentSupply] = useState(parseInt(0).toLocaleString('en-US'));
  const [totalSupply, setTotalSupply] = useState(parseInt(contractInfo.totalSupply).toLocaleString('en-US'));
  const [maxPerTransaction, setMaxPerTransaction] = useState(contractInfo.maxPerTransaction);
  const [maxPerWallet, setMaxPerWallet] = useState(contractInfo.maxPerWallet);


  useEffect(() => {
    //getDataImages();
    dispatch(fetchContract());
    //console.log({SAME: user.networkId + " / " + smartContract.networkId + " / " + (parseInt(user.networkId) === parseInt(smartContract.networkId) + " / ")})
  }, []);
  
  useEffect(() => {
    //setTotalCost(smartContract.cost * mintAmount);
    setName(smartContract.name);
    setSymbol(smartContract.symbol);
    //setMintDate(smartContract.mintDate);
    setCurrentSupply(parseInt(smartContract.currentSupply).toLocaleString('en-US'));
    setTotalSupply(parseInt(smartContract.totalSupply).toLocaleString('en-US'));
    setMaxPerTransaction(smartContract.maxPerTransaction);
    setMaxPerWallet(smartContract.maxPerWallet);
    setTotalCost(smartContract.cost * mintAmount);
    //console.log({SUPPLY: parseInt(smartContract.totalSupply).toLocaleString('en-US')})
  }, [smartContract]);



  useEffect(() => {
    if( user.isMetaMaskInstalled === null ){
      setFeedback(<div></div>);
    }else if( !user.isMetaMaskInstalled ){
      setButtonError(<InstallMetamaskButton />);
      setFeedback("Please Install Metamask before.");
      setFeedback(<Alert severity="error">
                  <AlertTitle>Provider not found</AlertTitle>
                  Metamask is not available — <strong>click on Install Metamask !</strong>
                </Alert>);
    }else if( !user.isConnected ){
      setButtonError(<ConnectToWebsiteButton  />);
      setFeedback("Click connect to mint your NFT.");
      setFeedback(<Alert severity="warning">
      <AlertTitle>You are not connected</AlertTitle>
      You must be connected to mint — <strong>click on Connect !</strong>
    </Alert>);
    }else if( user.networkId !== smartContract.network.networkId ){
      setButtonError(<SwitchNetworkButton />);
      setFeedback("Switch to the " + smartContract.network.name + " Network.");
      setFeedback(<Alert severity="info">
      <AlertTitle>You are on the <strong>wrong network</strong> !</AlertTitle>
      You must be connected to {smartContract.network.name} Network — <strong>click on Switch/Add !</strong>
    </Alert>);
    }else{
      setButtonError(<></>);
      setFeedback("Click mint to buy your NFT.");
      setFeedback(<Alert severity="success" style={{border:`1px ${theme.palette.background.border} solid`}}>
      <AlertTitle>You are ready to mint !</AlertTitle>
      <strong>click on Mint !</strong>
    </Alert>);
    }
  }, [user]);

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setTotalCost(smartContract.cost * newMintAmount);
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > smartContract.maxPerTransaction) {
      newMintAmount = smartContract.maxPerTransaction;
    }
    setTotalCost(smartContract.cost * newMintAmount);
    setMintAmount(newMintAmount);
  };

  const claimNFTs = () => {
    let cost = smartContract.cost;
    let totalCostWei = String(cost * mintAmount);
    setFeedback(`Minting your ${smartContract.name}...`);
    setClaimingNft(true);
    user.smartContract.methods
      .mint(mintAmount)
      .send({
        //gasLimit: String(totalGasLimit),
        to: smartContract.address,
        from: user.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${smartContract.name} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        setMintAmount(1);
        dispatch(fetchData(user.account));
      });
  };






    return(
      <>
      
        <div className="page-component__bg_image_box" id="text-06-567221">
          
  <div className="page-component__bg_overlay_box"></div>
  <div className="page-component__wrapper" style={{
            zIndex: 15,
            paddingTop:'50px',
            paddingBottom:'50px',
        }}>
    <section>
      <div className="text--06">

 
               {/*
        <a href="https://twitter.com/intent/tweet?in_reply_to=1528430275583217665">Reply</a><br />
<a href="https://twitter.com/intent/retweet?tweet_id=1528430275583217665">Retweet</a><br />
<a href="https://twitter.com/intent/like?tweet_id=1528430275583217665">Like</a><br />
<a href="https://twitter.com/intent/follow?user_id=1528402934538584064">Follow</a><br />

<a className="twitter-share-button"
  href="https://twitter.com/intent/tweet?in_reply_to=1528430275583217665" data-size="large">
Reply</a><br/>

<a className="twitter-follow-button" href="https://twitter.com/WinnoBearz" data-size="large" data-show-count="false">
Follow @WinnoBearz</a><br />


        <div
        dangerouslySetInnerHTML={{
        __html: html}}
        />

                <MintCard connect={connect} smartContract={smartContract} web3={web3} user={user} contractInfo={contractInfo} dispatch={dispatch} rarities={rarities} />

      */}
      <Parchment 
        title={''}
        style={{textAlign: "center",}}
        content={
          <>
          <div >
              {/* <h1 className={`heading heading--accent header-29__heading text-white ${styleMint["divTitle"]}`}>{data.name}</h1> */}
              <p>You can mint <strong>only {maxPerTransaction}</strong> {name} ({symbol}) on one time.</p>
              <p>You can hold <strong>only {maxPerWallet}</strong> {name} ({symbol}) on your wallet.</p>
          </div>
          <div id="saleOpen">
            <h2 style={{color:theme.palette.text.primary}}><u>Already minted</u></h2>
            <h2 style={{color:theme.palette.text.primary}}>{currentSupply} / {totalSupply}</h2><br/>
            <Stack direction="row"alignItems="center" justifyContent="center" mb={2} spacing={10} >
            {/* <img src="/assets/img/others/bees.gif" sx={{display: {xs:'none'}}} width="100vh" /> */}
                  <div style={{opacity:100}}>
                  <button className={`${styleMint['button-decrement-increment']}`} onClick={decrementMintAmount}>-</button>
                    <input  className={`${styleMint['input-mint']}`}  type="number" value={mintAmount} readOnly style={{color:theme.palette.text.primary, borderColor:theme.palette.background.border}} />
                  <button className={`${styleMint['button-decrement-increment']}`} onClick={incrementMintAmount}>+</button>
                  </div>
              </Stack>
              <p style={{marginBottom: "5vh"}}>Total cost : {smartContract.web3 ? smartContract.web3.utils.fromWei(BigInt(totalCost).toString(), "ether") : 0} {contractInfo.network.symbol}
              <br/>
              (Excluding gas fees)
              </p>

              
              {buttonError}
              <MintButton className={`${styleMint["loading-button-mint"]}`} claimingNft={claimingNft} onClickAction={claimNFTs} />
              <div className={`${styleMint["style-alert"]}`}>
              {feedback}
              </div>

              
              <div>
                <p style={{textAlign: "justify"}}>We have set the gas limit to meet the <Link href="https://www.azuki.com/erc721a"><a target="_blank"><strong>Azuki efficiency smart contract gas limit</strong></a></Link> (ERC721A)  for the contract to successfully mint your NFT, with the best price.</p>

                <p style={{textAlign: "justify"}}><strong>PLEASE NOTE : once you make the purchase, you cannot undo this action.</strong></p>
              </div>
          </div>
          </>
        }
      />
        <div className="container container--small">
        <Gallery links={contractInfo.links} />
        </div>

      </div>
    </section>
  </div>
</div>
      </>
    )
}


export default Mint;