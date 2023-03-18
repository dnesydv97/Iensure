import {GET_PRODUCT_DATA} from './Types.js';
import {PRODUCT_API} from '../api/OurProduct';
import axios from 'axios';

const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};

export const getProduct = data => dispatch => {
  axios
    .get(PRODUCT_API, {auth})
    .then(res => {
     
      dispatch({
        type: GET_PRODUCT_DATA,
        payload: res.data.data,
      });
    })
    .catch(err => {});
};


