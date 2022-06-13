import Web3 from "web3";
const CONFIG = require("../config/config.json");
const CONTRACT_ADDRESS = CONFIG.CONTRACT_ADDRESS;
const web3 = new Web3(CONFIG.RPC_URL);

const initialState = {
    loading: false,
    address: CONTRACT_ADDRESS,
    web3: web3,
    network:{
      name: CONFIG.NETWORK.NAME,
      symbol: CONFIG.NETWORK.SYMBOL,
      networkId: CONFIG.NETWORK.ID,
    },
    networkId: CONFIG.NETWORK.ID,
    name: "",
    symbol: "",
    currentGiveAway: 0,
    maxGiveAway: 0,
    mintDate: 0,
    currentSupply: 0,
    totalSupply: 0,
    maxPerTransaction: 0,
    maxPerWallet: 0,
    cost: 0,
    error: false,
    errorMsg: "",
  };
  
  const contractReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_DATA_REQUEST":
        return {
          ...state,
          loading: true,
          error: false,
          errorMsg: "",
        };
        
      case "CHECK_DATA_SUCCESS":
        return {
          ...state,
          loading: false,
          name: action.payload.name,
          symbol: action.payload.symbol,
          currentGiveAway: action.payload.currentGiveAway,
          maxGiveAway: action.payload.maxGiveAway,
          mintDate: action.payload.mintDate,
          currentSupply: action.payload.currentSupply,
          totalSupply: action.payload.totalSupply,
          maxPerTransaction: action.payload.maxPerTransaction,
          maxPerWallet: action.payload.maxPerWallet,
          cost: action.payload.cost,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_FAILED":
        return {
          ...initialState,
          loading: false,
          error: true,
          errorMsg: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default contractReducer;
  