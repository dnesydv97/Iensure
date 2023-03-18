import {
  CLAIM_INTIMATIONS,
  CLAIM_INTIMATIONS_LIST_INIT,
  CLAIM_INTIMATIONS_LIST,
  CLAIM_INTIMATIONS_LIST_END,
  CLAIM_INTIMATION_FEEDBACK,
  CLAIM_INTIMATIONS_FEEDBACK_SEND,
  CLAIM_INTIMATIONS_INIT,
  CLAIM_INTIMATIONS_END,
} from './Types.js';

import {
  CLAIM_INTIMATION_POST,
  CLAIM_INTIMATION_LIST_POST,
  CLAIM_INTIMATION_FEEDBACK_LIST,
  CLAIM_INTIMATION_FEEDBACK_POST,
} from '../api/ClaimIntimation';
import axios from 'axios';
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};

export const ClaimIntimationAction = data => async (dispatch, getState) => {
  dispatch({
    type: CLAIM_INTIMATIONS_INIT,
  });
  try {
    const res = await axios.post(
      CLAIM_INTIMATION_POST,
      data,
      {auth},
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );

    if (res.status == 200) {
    }
    dispatch({
      type: CLAIM_INTIMATIONS,
      payload: res.data,
    });
    dispatch(claimintimationlist({KYCID: getState().auth?.user[0].KycId}));
  } catch (error) {
    dispatch({
      type: CLAIM_INTIMATIONS,
      payload: error,
    });
  }
  dispatch({
    type: CLAIM_INTIMATIONS_END,
  });
};

export const claimintimationlist = data => async dispatch => {
  dispatch({
    type: CLAIM_INTIMATIONS_LIST_INIT,
  });
  try {
    const res = await axios.post(CLAIM_INTIMATION_LIST_POST, data, {auth});
    if (res.status >= 200) {
    }

    dispatch({
      type: CLAIM_INTIMATIONS_LIST,
      payload: res.data,
    });
    dispatch({
      type: CLAIM_INTIMATIONS_LIST_END,
    });
  } catch (error) {
    dispatch({
      type: CLAIM_INTIMATIONS_LIST_END,
    });
    dispatch({
      type: CLAIM_INTIMATIONS_LIST,
      payload: error,
    });
  }
};

export const claimintimationFeedbackList = data => async dispatch => {
  try {
    const res = await axios.post(CLAIM_INTIMATION_FEEDBACK_LIST, data, {auth});
    if (res.status >= 200) {
      
    }
    dispatch({
      type: CLAIM_INTIMATION_FEEDBACK,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CLAIM_INTIMATION_FEEDBACK,
      payload: error,
    });
  }
};
export const claimintimationFeedback = data => async dispatch => {
  try {
    const res = await axios.post(CLAIM_INTIMATION_FEEDBACK_POST, data, {auth});
    if (res.status >= 200) {
      
    }
    dispatch({
      type: CLAIM_INTIMATIONS_FEEDBACK_SEND,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CLAIM_INTIMATIONS_FEEDBACK_SEND,
      payload: error,
    });
  }
};
