const initialState = {
  loading: false,
  isMetaMaskInstalled: null,
  web3: null,
  account: null,
  isConnected: null,
  isDesktop:false,
  isMobile: false,
  networkId: null,
  smartContract: null,
  screenMode: '',
  showAdvertise: false,
  showAdvertiseSession: false,
  errorMsg: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NETWORK":
    return {
      ...state,
      networkId: action.payload.networkId,
    };

    case "UPDATE_SCREEN_MODE":
    return {
      ...state,
      screenMode: action.payload.screenMode,
    };
    case "UPDATE_ADVERTISE_ACCOUNT":
    return {
      ...state,
      showAdvertise: action.payload.showAdvertise,
    };
    case "UPDATE_ADVERTISE_SESSION_ACCOUNT":
    return {
      ...state,
      showAdvertiseSession: action.payload.showAdvertiseSession,
    };
    case "UPDATE_USER_ACCOUNT":
    return {
      ...state,
      account: action.payload.account,
      isConnected: action.payload.isConnected,
    };
    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        isMetaMaskInstalled: action.payload.isMetaMaskInstalled,
        web3: action.payload.web3,
        account: action.payload.account,
        isConnected: action.payload.isConnected,
        isDesktop:action.payload.isDesktop,
        isMobile: action.payload.isMobile,
        networkId: action.payload.networkId,
        smartContract: action.payload.smartContract,
        screenMode: action.payload.screenMode,
        showAdvertise: action.payload.showAdvertise,
        showAdvertiseSession: action.payload.showAdvertiseSession,
      };
    case "CONNECTION_REQUEST":
      return {
        ...state,
        loading: true,
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

export default userReducer;
