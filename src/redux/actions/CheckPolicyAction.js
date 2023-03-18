import {
  GET_CHECK_POLICY,
  GET_CHECK_POLICY_DETAILS,
  GET_CHECK_POLICY_DETAILS_INIT,
  GET_CHECK_POLICY_DETAILS_END,
  GET_MOTOR_DOCUMENT_LIST,
  GET_MOTOR_INFO,
} from './Types';
import {
  CHECK_POLICY,
  CHECK_POLICY_DETAILS,
  GET_MOTOR_LIST_API,
  PREMIUM_FORM_DETAILS_API,
} from '../api/CheckPolicy';
import axios from 'axios';

const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};
export const getCheckPolicy = data => async dispatch => {
  
  try {
    const res = await axios.post(CHECK_POLICY, data, {auth});
    if (res.status >= 200) {
    
    }
    dispatch({
      type: GET_CHECK_POLICY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHECK_POLICY,
      payload: error,
    });
  }
};
export const getCheckPolicyDetails = data => async dispatch => {

  dispatch({
    type: GET_CHECK_POLICY_DETAILS_INIT,
  });

  try {
    const res = await axios.post(CHECK_POLICY_DETAILS, data, {auth});
    if (res.status >= 200) {
      dispatch({
        type: GET_CHECK_POLICY_DETAILS,
        payload: res.data,
      });
      dispatch({
        type: GET_CHECK_POLICY_DETAILS_END,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CHECK_POLICY_DETAILS_END,
    });

    dispatch({
      type: GET_CHECK_POLICY_DETAILS,
      payload: error,
    });
  }
};
export const showPolicyDetails = data => async dispatch => {
  try {
    const res = await axios.post(CHECK_POLICY_DETAILS, data, {auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: GET_CHECK_POLICY_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHECK_POLICY_DETAILS,
      payload: error,
    });
  }
};
export const getMotorDocument = data => async dispatch => {
  try {
    const res = await axios.post(GET_MOTOR_LIST_API, data, {auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: GET_MOTOR_DOCUMENT_LIST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MOTOR_DOCUMENT_LIST,
      payload: error,
    });
  }
};

export const PremiumCalculatorFormDetails = data => async dispatch => {

  try {
    const res = await axios.post(PREMIUM_FORM_DETAILS_API, data, {auth});
    if (res.status >= 200) {
      
    }
    dispatch({
      type: GET_MOTOR_INFO,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MOTOR_INFO,
      payload: error,
    });
  }
};
