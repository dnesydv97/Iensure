import {
   
    GET_MAKE_VEHICLE_LIST,
    GET_MAKE_MODEL,
    VEHICLE_NAME_LIST,
    GET_OCCUPTION_LIST,SAVE_MOTOR_WIZ_B
  } from './Types.js';
 
  import {VEHICLE_LIST,SAVE_WIZB_API, OCCUPTION_LIST} from '../api/PremiumCalculatorFormApi.js';
  import {MAKE_MODEL} from '../api/PremiumCalculatorFormApi.js';
  import {VEHICLE_NAME} from '../api/PremiumCalculatorFormApi.js';
  import {OCCUPTION} from '../api/PremiumCalculatorFormApi.js'
  import axios from 'axios';


  const auth = {
    username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
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
  
  export const getOccuption = (data) => dispatch =>{
    axios
  .post(OCCUPTION_LIST, data)
    .then(res => {
      dispatch({
        type: GET_OCCUPTION_LIST,
        payload: res.data.data
      });     
    })
    .catch(err => {  
    });    
 }
  
 export const savemotorb = data => async dispatch => {

  
  try {
    const res = await axios.post(SAVE_WIZB_API, data,{auth});
    if (res.status >= 200) {
    //  alert('Data Successfully Saved');
     dispatch({
      type: SAVE_MOTOR_WIZ_B,
      payload: res.data,
    });
    }
   
  } catch (error) {
    dispatch({
      type: SAVE_MOTOR_WIZ_B,
      payload: error,
    });
  }
};