import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import contractReducer from "./contract/contractReducer";
import userReducer from "./user/userReducer";
import blockchainReducer from "./blockchain/blockchainReducer";
import dataReducer from "./data/dataReducer";
import collectionReducer from "./collection/collectionReducer";

const rootReducer = combineReducers({
  smartContract: contractReducer,
  user: userReducer,
  blockchain: blockchainReducer,
  data: dataReducer,
  collection: collectionReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
