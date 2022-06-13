// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_COLLECTION_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_COLLECTION_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_COLLECTION_FAILED",
    payload: payload,
  };
};

export const getCollection = (nLinks) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    const promises = [];
    let links = [];
    try {
      
      if( nLinks > 0 ){
        for(let i=0; i < 2020; i++ ){
            let tokenU = store
            .getState()
            .blockchain.smartContract.methods.tokenURI(i+1)
                .call()
                .then( (uri) => {
                  
                  return uri;
                })
                .catch( (error) => {
                  console.log(error)
                  return false;
                });
                
                
            if( tokenU ){
              promises.push(tokenU);
            }
          }
            links = await Promise.all(promises).then((values) => {
            console.log({YAAAAA: values});
            //links = values;
            return values;
            });
      }

      console.log({NOOOOOO: links});

      dispatch(
        fetchDataSuccess({
          links,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
}