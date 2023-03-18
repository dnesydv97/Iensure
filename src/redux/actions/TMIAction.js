import {COVER_TYPES,PLANS_AND_AREA,PACKAGE_TYPE,TMI_PREMIUM,TMI_SAVE_DETAILS,DOLLAR_EXCHANGE,TMI_PREMIUM_END,TMI_PREMIUM_INIT,SAVE_TMI_INIT,SAVE_TMI_END} from './Types';
import {COVER_API,PLANS_AREA_API,PACKAGE_API,TMI_CALCULATE_API,TMI_SAVE_DETAILS_API,DOLLAR_EXCHANGE_API} from '../api/TMIAPI';
import axios from 'axios';

const auth = {
    username: 'PICL@BEEMA',
    password: 'PICL@BEEMA@123!@#',
  };


  export const CoverTypes = data => dispatch => {
    axios
      .get(COVER_API)        
      .then(res => {
        dispatch({
          type: COVER_TYPES,
          payload: res.data.data,
        });
      })
      .catch(err => {});
  };

  export const PlansAndArea = data => async dispatch => {
    try {
      const res = await axios.post(PLANS_AREA_API, data);
      if (res.status >= 200) {
       
        dispatch({
          type: PLANS_AND_AREA,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: PLANS_AND_AREA,
        payload: error,
      });
     
    }
  };
  export const PackagesTypes = data => async dispatch => {
    try {
      const res = await axios.post(PACKAGE_API, data);
      if (res.status >= 200) {
        
        dispatch({
          type: PACKAGE_TYPE,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: PACKAGE_TYPE,
        payload: error,
      });
      // dispatch(loading(false))
    }
  };
  export const TmiPremium = data => async dispatch => {
    dispatch({
      type: TMI_PREMIUM_INIT,
    });
    try {
      const res = await axios.post(TMI_CALCULATE_API, data);
      if (res.status >= 200) {
       
        dispatch({
          type: TMI_PREMIUM,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TMI_PREMIUM,
        payload: error,
      });
      // dispatch(loading(false))
    }
    dispatch({
      type: TMI_PREMIUM_END,
    });
  };
  export const SaveTmiDetails = data => async dispatch => {

   dispatch({
    type:SAVE_TMI_INIT
   })
    try {
      const res = await axios.post(TMI_SAVE_DETAILS_API, data,{auth});
      if (res.status >= 200) {
      
        dispatch({
          type: TMI_SAVE_DETAILS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TMI_SAVE_DETAILS,
        payload: error,
      });
      
    }
    dispatch({
      type:SAVE_TMI_END
    })
  };
  export const DollarRate = data => async dispatch => {
   
    try {
      const res = await axios.post(DOLLAR_EXCHANGE_API, data,{auth});
      if (res.status >= 200) {
      
        dispatch({
          type: DOLLAR_EXCHANGE,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: DOLLAR_EXCHANGE,
        payload: error,
      });
      // dispatch(loading(false))
    }
  };