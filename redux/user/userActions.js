import React, {useEffect} from "react";
import Web3 from "web3";

// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

const CONFIG = require('../config/config.json');
const ABI = require('../config/abi.json');

const STORAGE_SCREEN_MODE = 'screenMode';
const STORAGE_ADVERTISE = 'showAdvertise';
const STORAGE_ADVERTISE_SESSION = 'showAdvertiseSession';

import { useDispatch, useSelector } from "react-redux";
//const dispatch = useDispatch();

export function isMobile() {
  return window.screen.width < 640;
}

export function isTablet() {
  return window.screen.width >= 640;
}

export function isLaptop() {
  return window.screen.width >= 1024;
}

export function isDesktop() {
  let check = false;
    (function(a){
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
      
    })(navigator.userAgent||navigator.vendor||window.opera);
    return !check;
}



const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateUserRequest = (payload) => {
  return {
    type: "UPDATE_USER",
    payload: payload,
  };
};

const updateAdvertiseAccount = (payload) => {
  return {
    type: "UPDATE_ADVERTISE_ACCOUNT",
    payload: payload,
  };
};
const updateScreenModeUser = (payload) => {
  return {
    type: "UPDATE_SCREEN_MODE",
    payload: payload,
  };
};


const updateAdvertiseSessionAccount = (payload) => {
  return {
    type: "UPDATE_ADVERTISE_SESSION_ACCOUNT",
    payload: payload,
  };
};

const updateUserAccount = (payload) => {
  return {
    type: "UPDATE_USER_ACCOUNT",
    payload: payload,
  };
};

const updateNetworkRequest = (payload) => {
  return {
    type: "UPDATE_NETWORK",
    payload: payload,
  };
}

export const updateUser = () => {
    return async (dispatch) => {
        dispatch(connectRequest());

        const ethereum = await detectEthereumProvider().then((eth)=>{
          return eth;
        }).catch( () => {
          return null;
        });

        let _screenMode = 'light';
        if( typeof(Storage) !== "undefined" ){
          if( window.localStorage.getItem(STORAGE_SCREEN_MODE) === null ){
            window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
          }
          _screenMode = window.localStorage.getItem(STORAGE_SCREEN_MODE);
          //window.localStorage.clear();
        }

        let _showAdvertise = true;
        if( typeof(Storage) !== "undefined" ){
          if( window.localStorage.getItem(STORAGE_ADVERTISE) === null ){
            window.localStorage.setItem(STORAGE_ADVERTISE, _showAdvertise);
          }
          _showAdvertise = window.localStorage.getItem(STORAGE_ADVERTISE) === 'true';
          //window.localStorage.clear();
        }

        let _showAdvertiseSession = true;
        if( typeof(Storage) !== "undefined" ){
          if( window.sessionStorage.getItem(STORAGE_ADVERTISE_SESSION) === null ){
            window.sessionStorage.setItem(STORAGE_ADVERTISE_SESSION, _showAdvertiseSession);
          }
          _showAdvertiseSession = window.sessionStorage.getItem(STORAGE_ADVERTISE_SESSION) === 'true';
          //window.sessionStorage.clear();
        }

        if( ethereum ){
            const web3 = new Web3(ethereum);
            const contract = new (web3).eth.Contract(ABI, CONFIG.CONTRACT_ADDRESS);
            let networkId = await ethereum.request({
                method: "eth_chainId",
            });
            let accounts = await ethereum.request({
                method: "eth_accounts",
            });

            dispatch(
                updateUserRequest({
                    isMetaMaskInstalled: true,
                    web3: web3,
                    account: accounts.length ? accounts[0] : null,
                    isConnected: accounts.length ? true : false,
                    isDesktop: isDesktop(),
                    isMobile: isMobile(),
                    networkId: parseInt(networkId, 16),
                    smartContract: contract,
                    screenMode:_screenMode,
                    showAdvertise: _showAdvertise,
                    showAdvertiseSession: _showAdvertiseSession,
                })
            );

            ethereum.on("accountsChanged", (_accounts) => {
                let account = _accounts.length ? _accounts[0] : null;
                dispatch(updateAccount(account));
            });

            ethereum.on("chainChanged", (_networkId) => {
                let network = parseInt(_networkId, 16);
                dispatch(updateNetwork(network));
            });
        }else{
          dispatch(
            updateUserRequest({
                isMetaMaskInstalled: false,
                web3: null,
                account: null,
                isConnected: false,
                isMobile: false,
                networkId: null,
                smartContract: null,
                showAdvertise: _showAdvertise,
                showAdvertiseSession: _showAdvertiseSession,
            })
          );
          //dispatch(connectFailed("Install Metamask."));
        }
    }
}

export const connectUser = () => {
  return async (dispatch) => {
    //dispatch(connectRequest({}));
    const ethereum = await detectEthereumProvider().then((eth)=>{
      return eth;
    }).catch( () => {
      return null;
    });
    if (ethereum) {
      //dispatch(connectRequest());
      let accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })/*.then( (_accounts) => {
        updateAccount(_accounts[0]);
      }).catch( () => {
        updateAccount(null);
      })*/;

      
      //console.log({ACTIONS: contract})
      updateAccount(accounts.length ? accounts[0] : null);
    }else{
      dispatch(connectFailed("Install Metamask."));
      //window.open("https://metamask.app.link/dapp/bearzclub.io");
    }
  }
}

export const updateScreenMode = (_screenMode) => {
  return async (dispatch) => {
    //let _isConnected = _account !== null ? true: false;
    if( typeof(Storage) !== "undefined" ){
      window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
    }
    dispatch(updateScreenModeUser({ screenMode: _screenMode }));
  };
};

export const updateAdvertise = (_showAdvertise) => {
  return async (dispatch) => {
    //let _isConnected = _account !== null ? true: false;
    if( typeof(Storage) !== "undefined" ){
      window.localStorage.setItem(STORAGE_ADVERTISE, _showAdvertise);
    }
    dispatch(updateAdvertiseAccount({ showAdvertise: _showAdvertise }));
  };
};



export const updateAdvertiseSession = (_showAdvertiseSession) => {
  return async (dispatch) => {
    //let _isConnected = _account !== null ? true: false;
    if( typeof(Storage) !== "undefined" ){
      window.sessionStorage.setItem(STORAGE_ADVERTISE_SESSION, _showAdvertiseSession);
    }
    dispatch(updateAdvertiseSessionAccount({ showAdvertiseSession: _showAdvertiseSession }));
  };
};

export const updateAccount = (_account) => {
  return async (dispatch) => {
    let _isConnected = _account !== null ? true: false;
    dispatch(updateUserAccount({ account: _account, isConnected: _isConnected }));
  };
};

export const updateNetwork = (_networkId) => {
  return async (dispatch) => {
    dispatch(updateNetworkRequest({ networkId: _networkId }));
  };
};

export const switchToWinnoNetwork = () => {
  const dispatch = useDispatch();
  return async () => {
    
    const ethereum = await detectEthereumProvider().then((eth)=>{
      return eth;
    }).catch( () => {
      return null;
    });
    if( ethereum ){
      let network = CONFIG.NETWORK.ID;
      
      try{
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: "0x" + network.toString(16) }],
        });
        dispatch(updateNetworkRequest({ networkId: network }));
      } catch(switchError){
        // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: "0x" + network.toString(16),
                    chainName: CONFIG.NAME,
                    rpcUrls: [CONFIG.RPC_URL] /* ... */,
                  },
                ],
              });
              dispatch(updateNetworkRequest({ networkId: network }));
            } catch (addError) {
              // handle "add" error
            }
          }
      }
      
    }else{
      dispatch(connectFailed("Install Metamask."));
    }
  };
};
