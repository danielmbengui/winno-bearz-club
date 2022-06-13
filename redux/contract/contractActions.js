import store from "../store";
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

const CONFIG = require('../config/config.json');
const ABI = require('../config/abi.json');
const web3 = new Web3(CONFIG.RPC_URL);
const smartContract = new (web3).eth.Contract(ABI, CONFIG.CONTRACT_ADDRESS);

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchContract = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
       
        const promises = [];        

        promises.push(smartContract.methods.name().call());
        promises.push(smartContract.methods.symbol()
        .call());
        promises.push(smartContract.methods.totalSupply()
        .call());
        promises.push(smartContract.methods.maxSupply()
        .call());
        promises.push(smartContract.methods.maxPerTransaction()
        .call());
        promises.push(smartContract.methods.maxPerWallet()
        .call());
        promises.push(smartContract.methods.mintPrice()
        .call());
        promises.push(smartContract.methods.mintDate()
        .call());
        promises.push(smartContract.methods.currentGiveAway()
        .call());
        promises.push(smartContract.methods.maxGiveAway()
        .call());

        

        
        await Promise.all(promises).then((values) => {
            //console.log({YAAAAA: values});
            let name = values[0];
            let symbol = values[1];
            let currentSupply = values[2];
            let totalSupply = values[3];
            let maxPerTransaction = values[4];
            let maxPerWallet = values[5];
            let cost = values[6];
            let mintDate = values[7] * 1000;
            let currentGiveAway = values[8];
            let maxGiveAway = values[9];
            dispatch(
                fetchDataSuccess({
                  currentGiveAway,
                  maxGiveAway,
                  mintDate,
                  name,
                  symbol,
                  currentSupply,
                  totalSupply,
                  maxPerTransaction,
                  maxPerWallet,
                  cost,
                })
              );
            //links = values;
            //return values;
        });

        
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
