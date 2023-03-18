import {Alert,ToastAndroid,Text,View} from 'react-native'
import {
  EXCESS_OWN_DAMAGE,
  MANUFACTURE_YEAR,
  GET_CATEGORY_LIST,
  CALC_BIKE_RESET_DATA,
  GET_COMPULSORY_EXCESS,
  GET_MAKE_VEHICLE_LIST,
  GET_MAKE_MODEL,
  VEHICLE_NAME_LIST,
  PREMIUM_CALC_INIT,
  PREMIUM_CALC_INIT_THIRD_PARTY,
  PREMIUM_CALC,
  PREMIUM_CALC_THIRD_PARTY,
  PREMIUM_CALC_END,
  PREMIUM_CALC_END_THIRD_PARTY,
  LOADING_UI,
  SAVE_MOTOR_WIZA,
  MASTER_REFERANCE_ID,
  SAVE_WIZA_INIT,
  SAVE_WIZA_END,
} from './Types.js';
import {
  EXCESS_URL,
  YEAR_MANU,
  COMPULSORY_EXCESS,
  CATEGORY_LIST,
  VEHICLE_LIST,
  MAKE_MODEL,
  VEHICLE_NAME,
  PREMIUM_CALC_POST,
  SAVE_MOTOR_WIZA_API,
  REFERENCE_API,
} from '../api/PremiumCalculatorFormApi.js';

import axios from 'axios';
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};

export function loading(running) {
  return {type: LOADING_UI, running};
}


export const getExcessOwnDamage = data => async dispatch => {

  try {
    const res = await axios.post(EXCESS_URL, data);
    if (res.status >= 200) {
    }
    dispatch({
      type: EXCESS_OWN_DAMAGE,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: EXCESS_OWN_DAMAGE,
      payload: error,
    });
  }
};

export const yearManufactureData = data => async dispatch => {
  try {
    const res = await axios.post(YEAR_MANU, data);
    if (res.status >= 200) {
    }
    dispatch({
      type: MANUFACTURE_YEAR,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: MANUFACTURE_YEAR,
      payload: error,
    });
  }
};


export const getCategoryList = data => async dispatch => {
  try {
    const res = await axios.post(CATEGORY_LIST, data);
    if (res.status >= 200) {
    }
    dispatch({
      type: GET_CATEGORY_LIST,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_LIST,
      payload: error,
    });
  }
};

export const getCompulsoryExcess = data => async dispatch => {
 
  try {
    const res = await axios.post(COMPULSORY_EXCESS, data);
    if (res.status >= 200) {
    }
    dispatch({
      type: GET_COMPULSORY_EXCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMPULSORY_EXCESS,
      payload: error,
    });
  }
};
export const getVehicleList = data => dispatch => {
  axios
    .post(VEHICLE_LIST, data)
    .then(res => {
      dispatch({
        type: GET_MAKE_VEHICLE_LIST,
        payload: res.data.data,
      });
    })
    .catch(err => {});
};
export const getMakeModel = data => dispatch => {
  axios
    .post(MAKE_MODEL, data)
    .then(res => {
      dispatch({
        type: GET_MAKE_MODEL,
        payload: res.data.data,
      });
    })
    .catch(err => {});
};
export const getVehicleName = data => dispatch => {
  axios
    .post(VEHICLE_NAME, data)
    .then(res => {
      dispatch({
        type: VEHICLE_NAME_LIST,
        payload: res.data.data,
      });
    })
    .catch(err => {});
};

export const clearCalculatorData = () => dispatch => {
  dispatch({
    type: CALC_BIKE_RESET_DATA,
  });
};

export const PremiumCalculatorAction = data => async dispatch => {


  dispatch({type: PREMIUM_CALC_INIT});
  try {
    const res = await axios.post(PREMIUM_CALC_POST, data);
    if (res.status >= 200) {
      dispatch({
        type: PREMIUM_CALC,
        payload: res.data,
      });
    }

    dispatch(loading(false));
  } catch (error) {
    dispatch(loading(false));
    dispatch({
      type: PREMIUM_CALC,
      payload: error,
    });
  }
  dispatch({type: PREMIUM_CALC_END});
};
export const PremiumCalculatorActionThirdParty = data => async dispatch => {


   dispatch({type: PREMIUM_CALC_INIT_THIRD_PARTY});
  try {
    const res = await axios.post(PREMIUM_CALC_POST, data);
    if (res.status >= 200) {
      dispatch({
        type: PREMIUM_CALC_THIRD_PARTY,
        payload: res.data,
      });
    }

     dispatch(loading(false));
  } catch (error) {
     dispatch(loading(false));
    dispatch({
      type: PREMIUM_CALC_THIRD_PARTY,
      payload: error,
    });
  }
   dispatch({type: PREMIUM_CALC_END_THIRD_PARTY});
};

export const wizaAction = data => async dispatch => {
  dispatch({type: SAVE_WIZA_INIT});
  try {
    const res = await axios.post(SAVE_MOTOR_WIZA_API, data, {auth});
   
    if (res.status >= 200) {
      if (res?.data?.response_message !== 'SUCCESS') {
      
        Alert.alert(
          'Information',
          res?.data?.response_message,
          [
            
            {
              text: 'OK',
              onPress: () => {
                console.log('Cancel Pressed')
              },
            },
          ],
        )
        // ToastAndroid.show(res?.data?.response_message, ToastAndroid.SHORT);
      }
      dispatch({
        type: SAVE_MOTOR_WIZA,
        payload: res.data,
      });
    }

    dispatch(loading(false));
  } catch (error) {
    dispatch({
      type: SAVE_MOTOR_WIZA,
      payload: error,
    });
  }
  dispatch({type: SAVE_WIZA_END});
};

export const referanceId = data => dispatch => {
 
  axios
    .get(REFERENCE_API, {auth})
    .then(res => {
     
      dispatch({
        type: MASTER_REFERANCE_ID,
        payload: res.data,
      });
    })
    .catch(err => {});
};

