
// constants
import React from "react";
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

// log
import { fetchData } from "../data/dataActions";

const CONFIG = require('../config/config.json');
const ABI = require('../config/abi.json');
const web3_Rinkeby = new Web3('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');



const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

const updateBlockchainRequest = (payload) => {
  return {
    type: "UPDATE_BLOCKCHAIN",
    payload: payload,
  };
}

const updatetNetworkRequest = (payload) => {
  return {
    type: "UPDATE_NETWORK",
    payload: payload,
  };
}

export const updateBlockchain = () => {
  return async (dispatch) => {

    const contract = new (web3_Rinkeby).eth.Contract(ABI, CONFIG.CONTRACT_ADDRESS);
    
    const ethereum = await detectEthereumProvider();
    if (ethereum) {
      
      //const { ethereum } = window;
      //Web3EthContract.setProvider(ethereum);
      const web3 = new Web3(ethereum);
      
      
      let networkId = await ethereum.request({
        method: "eth_chainId",
      });
      let accounts = await ethereum.request({
        method: "eth_accounts",
      });
      //console.log({ACTIONS: contract})
      dispatch(
        updateBlockchainRequest({
          web3Main: web3_Rinkeby,
          web3: web3,
          //smartContract: contract,
          account: accounts.length ? accounts[0] : null,
          isConnected: accounts.length ? true : false,
          networkId: parseInt(networkId, 16),
        })
      );

      ethereum.on("accountsChanged", (_accounts) => {
        let account = _accounts.length ? _accounts[0] : null;
        console.log({accountsChanged: account});
        dispatch(updateAccount(account));
        
      });
      ethereum.on("chainChanged", (_networkId) => {
        let network = parseInt(_networkId, 16);
        console.log({chainChanged: network});
        dispatch(updateNetwork(network));
      });
    }else{
      dispatch(connectFailed("Install Metamask."));
    }
  }
}

export const connectAccount = () => {
  return async (dispatch) => {
    const ethereum = await detectEthereumProvider();
    if (ethereum) {
      let accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      //console.log({ACTIONS: contract})
      updateAccount(accounts.length ? accounts[0] : null);
    }else{
      dispatch(connectFailed("Install Metamask."));
    }
  }
}

export const disconnect = () => {
  web3_Rinkeby.eth.accounts.wallet.clear();
  const { ethereum } = window;
  ethereum.removeListener('accountsChanged', ()=>{});
}

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    
    const { ethereum } = window;
    //const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    const provider = await detectEthereumProvider();
    if (provider) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "eth_chainId",
        });
        if (parseInt(networkId, 16) === CONFIG.NETWORK.ID) {
          //console.log({network: parseInt(networkId, 16)});
          const SmartContractObj = new Web3EthContract(
            ABI,
            CONFIG.CONTRACT_ADDRESS
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              networkId: parseInt(networkId, 16),
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", (_networkId) => {
            //window.location.reload();
            dispatch(updateNetwork(parseInt(_networkId, 16)));
          });

          ethereum.on('disconnect', () => {
            dispatch(updateAccount(null));
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (_account) => {
  return async (dispatch) => {
    let _isConnected = _account !== null ? true: false;
    dispatch(updateAccountRequest({ account: _account, isConnected: _isConnected }));
    //dispatch(fetchData(account));
  };
};

export const updateNetwork = (_networkId) => {
  return async (dispatch) => {
    dispatch(updatetNetworkRequest({ networkId: _networkId }));
    //dispatch(fetchData(account));
  };
};
