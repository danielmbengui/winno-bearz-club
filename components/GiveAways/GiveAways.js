

import React, {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import styleGiveAways from "./GiveAways.module.css";
import { useDispatch, useSelector } from "react-redux";
//import { updateBlockchain, connect, connectAccount } from "../../redux/blockchain/blockchainActions";
import { fetchContract  } from "../../redux/contract/contractActions";

//import { fetchData } from "../../redux/data/dataActions";
import {GiveAwayButton} from "../Buttons/Buttons";
//import {} from "./ReadFile";
//import fs from 'fs';
const fs = require("fs");
//const fs = require("fs");
//const console = require("console");
//const extensionFile = ".json";
//const buildDir = `${process.env.PWD}`;
//const nftDir = `${buildDir}/NFT_IMG/images`;
const metadataDir = "../../../redux/config/constants_links.json";




const CONFIG = require('../../redux/config/config.json');



const GiveAways = ({}) => {
    const dispatch = useDispatch();
  const smartContract = useSelector((state) => state.smartContract);
  const user = useSelector((state) => state.user);
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [feedback, setFeedback] = useState('');
    const [givingNft, setGivingNft] = useState(false);

    useEffect(() => {
      //getDataImages();
      dispatch(fetchContract());
      //console.log({SAME: user.networkId + " / " + smartContract.networkId + " / " + (parseInt(user.networkId) === parseInt(smartContract.networkId) + " / ")})
    }, []);

    

    

    const giveAwaysNFT = () => {
        //let cost = smartContract.cost;
        //let totalCostWei = String(cost * mintAmount);
        setFeedback(`Minting your ${smartContract.name}...`);
        setGivingNft(true);
        user.smartContract.methods
          .giveAway(address, quantity)
          .send({
            //gasLimit: String(135154 * quantity),
            to: smartContract.address,
            from: user.account,
            //value: totalCostWei,
            gasPrice: 35_000_000_000,
          })
          .once("error", (err) => {
            console.log(err);
            setFeedback("Sorry, something went wrong please try again later.");
            setGivingNft(false);
          })
          .then((receipt) => {
            console.log(receipt);
            setFeedback(
              `WOW, the ${smartContract.name} is yours! go visit Opensea.io to view it.`
            );
            setGivingNft(false);
            setQuantity(1);
            setAddress('');
            //dispatch(fetchData(user.account));
          });
      };

      const decrementMintAmount = () => {
        let newMintAmount = quantity - 1;
        if (newMintAmount < 1) {
          newMintAmount = 1;
        }
        //setTotalCost(smartContract.cost * newMintAmount);
        setQuantity(newMintAmount);
      };
    
      const incrementMintAmount = () => {
        let newMintAmount = quantity + 1;
        if (newMintAmount > smartContract.maxPerTransaction) {
          newMintAmount = smartContract.maxPerTransaction;
        }
        //setTotalCost(smartContract.cost * newMintAmount);
        setQuantity(newMintAmount);
      };

      const onChangeAddress = (e) => {
        console.log({OK: e.target.value});
        setAddress(e.target.value);
      }

    return(
        <div className="page-component__bg_image_box bg-white-color" id="text-06-567221">
            <div className="page-component__bg_overlay_box"></div>
            <div className="page-component__wrapper" style={{
                        zIndex: 15,
                        paddingTop:'50px',
                        paddingBottom:'50px',
                    }}>
                <section>
                <div className="text--06"></div>

                <div className="container container--mid" style={{textAlign: "center", marginTop:40,}}>
                <div className="text--02__box" >
                    <div className="text--02__content_box text--02__content_box--bottom" ></div>
                    <div className="text--02__content_box text--02__content_box--top">
                    <div className="text--02__img">
             <img loading="lazy" src={"/assets/logo.png"} alt={"logo"} className="" style={{height: "300vh"}}  />
          </div>
                    <div>

                    <input  className={`${styleGiveAways['input-address']}`} style={{width:'50%', margin:"1.5vh"}} type="text" value={address}  onChange={onChangeAddress} placeholder="Address like 0x....BBa2" />
                    <Stack direction="row"alignItems="center" justifyContent="center" mb={2} spacing={10} >
                    {/* <img src="/assets/img/others/bees.gif" sx={{display: {xs:'none'}}} width="100vh" /> */}
                        <div style={{opacity:100}}>
                        <button className={`${styleGiveAways['button-decrement-increment']}`} onClick={decrementMintAmount}>-</button>
                            <input  className={`${styleGiveAways['input-mint']}`}  type="number" value={quantity} readOnly placeholder={'Mint between 1 and 30 NFT CONTRACT'} />
                        <button className={`${styleGiveAways['button-decrement-increment']}`} onClick={incrementMintAmount}>+</button>
                        </div>
                    </Stack>
                        <GiveAwayButton _text={"Give away"} _loading={givingNft} _onClickAction={giveAwaysNFT} _className={`${styleGiveAways["loading-button-mint"]}`} />
                    </div>
                </div>
                </div>
                </div>
                </section>
                </div>
                </div>
    )
}



export default GiveAways;