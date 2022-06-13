const initialState = {
    loading: false,
    links:[],
    error: false,
    errorMsg: "",
  };

const collectionReducer = (state = initialState, action) => {
switch (action.type) {
    case "CHECK_COLLECTION_REQUEST":
    return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
    };
    
    case "CHECK_COLLECTION_SUCCESS":
    return {
        ...state,
        loading: false,
        links: action.payload.links,
        error: false,
        errorMsg: "",
    };
    case "CHECK_COLLECTION_FAILED":
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

export default collectionReducer;
