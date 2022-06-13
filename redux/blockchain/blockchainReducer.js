import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
const CONFIG = require('../config/config.json');
const ABI = require('../config/abi.json');
const web3_Rinkeby = new Web3('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
const contract = new (web3_Rinkeby).eth.Contract(ABI, CONFIG.CONTRACT_ADDRESS);


const web3 = new Web3('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

const initialState = {
  loading: false,
  web3Main: null,
  account: null,
  isConnected: false,
  networkId: null,
  smartContract: contract,
  web3: null,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_BLOCKCHAIN":
    return {
      ...state,
      //loading: false,
      
      web3Main: action.payload.web3Main,
      web3: action.payload.web3,
      //smartContract: action.payload.smartContract,
      networkId: action.payload.networkId,
      account: action.payload.account,
      isConnected: action.payload.isConnected,
      
    };
    case "UPDATE_NETWORK":
    return {
      ...state,
      //loading: false,
      networkId: action.payload.networkId,
    };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        //loading: false,
        account: action.payload.account,
        isConnected: action.payload.isConnected,
      };
    case "CONNECTION_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        isConnected: action.payload.isConnected,
        networkId: action.payload.networkId,
        //ssmartContract: action.payload.smartContract,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAILED":
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
