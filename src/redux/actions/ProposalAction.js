import {
  PROPOSAL_LIST,
  ONLINE_PROPOSAL_COMMENTS,
  ONLINE_KYC_COMMENTS,
  WIZA_DETAILS,
  WIZB_DETAILS,
} from './Types';
import {
  PROPOSAL_LIST_API,
  ONLINE_PROPOSAL_COMMENTS_API,
  ONLINE_KYC_COMMENTS_API,
  WIZA_DETAILS_API,
  WIZB_DETAILS_API,
} from '../api/ProposalAPI';
import axios from 'axios';

const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};

export const onlinelist = data => async dispatch => {
  
  try {
    const res = await axios.post(PROPOSAL_LIST_API, data, {auth});
   
    if (res.status >= 200) {
    }
    dispatch({
      type: PROPOSAL_LIST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROPOSAL_LIST,
      payload: error,
    });
  }
};
export const onlineProposalComments = data => async dispatch => {
  try {
    const res = await axios.post(ONLINE_PROPOSAL_COMMENTS_API, data, {auth});
    if (res.status >= 200) {
    }
    dispatch({
      type: ONLINE_PROPOSAL_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ONLINE_PROPOSAL_COMMENTS,
      payload: error,
    });
  }
};
export const onlineKycComments = data => async dispatch => {
  try {
    const res = await axios.post(ONLINE_KYC_COMMENTS_API, data, {auth});
    if (res.status >= 200) {
    }
    dispatch({
      type: ONLINE_KYC_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ONLINE_KYC_COMMENTS,
      payload: error,
    });
  }
};
export const DetailsWizA = data => async dispatch => {
  try {
    const res = await axios.post(WIZA_DETAILS_API, data, {auth});
    if (res.status >= 200) {
    }
    dispatch({
      type: WIZA_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WIZA_DETAILS,
      payload: error,
    });
  }
};
export const DetailsWizB = data => async dispatch => {
  try {
    const res = await axios.post(WIZB_DETAILS_API, data, {auth});
    if (res.status >= 200) {
    }
    dispatch({
      type: WIZB_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WIZB_DETAILS,
      payload: error,
    });
  }
};
