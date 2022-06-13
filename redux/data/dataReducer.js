const initialState = {
  loading: false,
  name: "",
  symbol: "",
  totalSupply: 0,
  currentSupply: 0,
  maxPerTransaction: 0,
  maxPerWallet: 0,
  cost: 0,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
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
        totalSupply: action.payload.totalSupply,
        currentSupply: action.payload.currentSupply,
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

export default dataReducer;
