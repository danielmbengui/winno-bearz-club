// log
//import { nl } from "date-fns/locale";
import store from "../store";

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

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
        let name = await store
        .getState()
        .blockchain.smartContract.methods.name()
        .call();

        let symbol =await store
        .getState()
        .blockchain.smartContract.methods.symbol()
        .call();


        let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.maxSupply()
        .call();
        let currentSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();

        let maxPerTransaction = await store
        .getState()
        .blockchain.smartContract.methods.maxPerTransaction()
        .call();

        let maxPerWallet = await store
        .getState()
        .blockchain.smartContract.methods.maxPerWallet()
        .call();
        
        let cost = await store
        .getState()
        .blockchain.smartContract.methods.mintPrice()
        .call();

        
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          name,
          symbol,
          totalSupply,
          currentSupply,
          maxPerTransaction,
          maxPerWallet,
          cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
