import {
  GET_PAY_PREMIUM,
  LOADING_UI,
  PAY_PREMIUM_INIT,
  PAY_PREMIUM_END,
} from './Types';
import {PAY_PREMIUM} from '../api/PayPremium';

import axios from 'axios';

export function loading(running) {
  return {type: LOADING_UI, running};
}
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};
export const paypremiums = (data, sign) => async dispatch => {
  console.log("Dataof premium",data)
  dispatch({
    type: PAY_PREMIUM_INIT,
  });

  try {
    const res = await axios.get(`${PAY_PREMIUM}/${data}`, {
      headers: {
        'Content-Type': 'application/json',
        Signature: sign,
        Authorization: 'Basic UElDTEBCRUVNQTpQSUNMQEJFRU1BQDEyMyFAIw==',
      },
    });

    if (res.status >= 200) {
      dispatch({
        type: GET_PAY_PREMIUM,
        payload: res.data,
      });
    }
    dispatch({
      type: PAY_PREMIUM_END,
    });
  } catch (error) {
    dispatch({
      type: PAY_PREMIUM_END,
    });

    dispatch({
      type: GET_PAY_PREMIUM,
      payload: error,
    });
  }
};
