import {
  GET_BRANCHES,
  CLAIM_OUTSTANDING_SUMMARY_POST,
  GET_CLAIM_OUTSTANDING_SUMMARY,
  GET_CLAIM_PAID_SUMMARY,
  GET_FISCAL_YEAR,
  GET_FISCAL_DATE,
  BUSINESS_TODAY,
  FIELD_OFFICER_LIST,
  FIELD_OFFICER_PORTFOLIO,CLAIM_PENDING,CLAIM_APPROVAL
} from './Types.js';

import {
  BRANCH_POST,
  FILTER_POST,
  CLAIM_SUMMARY,
  FISCAL_YEAR,
  fISCAL_YEAR_DATE,
  GET_BUSINESS_TODAY,
  CLAIM_PAID,
  GET_FO_BUSINESS,
  GET_FO_PORTFOLIO,CLAIM_PENDING_API,CLAIM_APPROVAL_API
} from '../api/SalesAndMarketing';
import axios from 'axios';
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};


export const PendingList = data => async dispatch => {
  try {
    const res = await axios.post(CLAIM_PENDING_API, data, {auth});
    if (res.status >= 200) {
      
      dispatch({
        type: CLAIM_PENDING,
        payload: res.data,
      });
    }

    
  } catch (error) {
    dispatch({
      type: CLAIM_PENDING,
      payload: error,
    });
  
  }
};
export const ApproveList = data => async dispatch => {
  try {
    const res = await axios.post(CLAIM_APPROVAL_API, data, {auth});
    if (res.status >= 200) {
     
      dispatch({
        type: CLAIM_APPROVAL,
        payload: res.data,
      });
    }

  
  } catch (error) {
    dispatch({
      type: CLAIM_APPROVAL,
      payload: error,
    });
   
  }
};
export const branchList = data => dispatch => {
  axios
    .get(BRANCH_POST, {auth})
    .then(res => {
      dispatch({
        type: GET_BRANCHES,
        payload: res.data.data,
      });
    })
    .catch(err => {});
};
export const ficsalYear = data => dispatch => {
  axios
    .get(FISCAL_YEAR, {auth})
    .then(res => {
      dispatch({
        type: GET_FISCAL_YEAR,
        payload: res.data.data,
      });
    })
    .catch(err => {});
};

export const filterPost = data => async dispatch => {
  try {
    const res = await axios.post(FILTER_POST, data, {auth});
    if (res.status >= 200) {
      
      dispatch({
        type: CLAIM_OUTSTANDING_SUMMARY_POST,
        payload: res.data,
      });
    }

   
  } catch (error) {
    dispatch({
      type: CLAIM_OUTSTANDING_SUMMARY_POST,
      payload: error,
    });
   
  }
};
export const claimOutstandingSummary = data => async dispatch => {
  try {
    const res = await axios.post(CLAIM_SUMMARY, data, {auth});
    if (res.status >= 200) {
     
      dispatch({
        type: GET_CLAIM_OUTSTANDING_SUMMARY,
        payload: res.data,
      });
    }

   
  } catch (error) {
    dispatch({
      type: GET_CLAIM_OUTSTANDING_SUMMARY,
      payload: error,
    });
    // dispatch(loading(false))
  }
};
export const claimPaidSummary = data => async dispatch => {
  try {
    const res = await axios.post(CLAIM_PAID, data, {auth});
    if (res.status >= 200) {
     
      dispatch({
        type: GET_CLAIM_PAID_SUMMARY,
        payload: res.data,
      });
    }

   
  } catch (error) {
    dispatch({
      type: GET_PAID_SUMMARY,
      payload: error,
    });
    // dispatch(loading(false))
  }
};
export const getFiscalDate = data => async dispatch => {
  try {
    const res = await axios.post(fISCAL_YEAR_DATE, data, {auth});
    if (res.status >= 200) {
     
      dispatch({
        type: GET_FISCAL_DATE,
        payload: res.data,
      });
    }

 
  } catch (error) {
    dispatch({
      type: GET_FISCAL_DATE,
      payload: error,
    });
    // dispatch(loading(false))
  }
};
export const getFoList = data => async dispatch => {
  
  try {
    const res = await axios.post(GET_FO_BUSINESS, data, {auth});
    if (res.status >= 200) {
    
      dispatch({
        type: FIELD_OFFICER_LIST,
        payload: res.data,
      });
    }

   
  } catch (error) {
    dispatch({
      type: FIELD_OFFICER_LIST,
      payload: error,
    });
    // dispatch(loading(false))
  }
};
export const getFOPortfolio = data => async dispatch => {
  try {
    const res = await axios.post(GET_FO_PORTFOLIO, data, {auth});
    if (res.status >= 200) {
     
      dispatch({
        type: FIELD_OFFICER_PORTFOLIO,
        payload: res.data,
      });
    }

  
  } catch (error) {
    dispatch({
      type: FIELD_OFFICER_PORTFOLIO,
      payload: error,
    });
    // dispatch(loading(false))
  }
};


export const businessToday = data => dispatch => {
  axios
    .get(GET_BUSINESS_TODAY, {auth})
    .then(res => {
      dispatch({
        type: BUSINESS_TODAY,
        payload: res.data.data,
      });
    })
    .catch(err => {});
};

