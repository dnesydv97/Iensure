import {GET_MY_POLICY,GET_DETAILS} from './Types.js';
import {MY_POLICY,MY_DETAILS} from '../api/MyPolicy';
import axios from 'axios';

// export const Mypolicy = data =>  dispatch => {
 
//   axios
//     .post(MY_POLICY, data)
//     .then(res => {
//       dispatch({
//         type: GET_MY_POLICY,
//         payload: res.data,
//       });
//     })
//     .catch(err => {});
// };
// const auth = {
//   username: 'LMTRADING',
//   password: 'lmtrading!@#123()',
// };
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};
export const Mypolicy = (data) => async dispatch => {
   
    try {
      const res = await axios.post(MY_POLICY, data,{auth});
      if (res.status >= 200) {
      
      }
      dispatch({
        type: GET_MY_POLICY,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_MY_POLICY,
        payload: error,
      });
    }
  };

export const MyKYCDetails = (data) => async dispatch => {
  
    try {
      const res = await axios.post(MY_DETAILS, data,{auth});
      if (res.status >= 200) {
      
      }
      dispatch({
        type: GET_DETAILS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DETAILS,
        payload: error,
      });
    }
  };









