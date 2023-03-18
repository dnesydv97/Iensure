import {CLAIM_APPROVAL_DETAILS,APPROVE_CLAIM} from './Types.js';
import {CLAIM_DETAILS_API,APPROVE_CLAIM_API} from '../api/ClaimApprovalAPI';

 import axios from 'axios';
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};

export const DetailsClaimApproval = data => async dispatch => {
   
   try {
   
    const res = await axios.post(CLAIM_DETAILS_API, data,{auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: CLAIM_APPROVAL_DETAILS,
      payload: res.data,
      
    });
  } catch (error) {
    dispatch({
      type: CLAIM_APPROVAL_DETAILS,
      payload: error,
    });
  }
  };
export const ApproveClaim = data => async dispatch => {
   
   try {
   
    const res = await axios.post(APPROVE_CLAIM_API, data,{auth});
    if (res.status >= 200) {
      
    }
    dispatch({
      type: APPROVE_CLAIM,
      payload: res.data,
      
    });
  } catch (error) {
    dispatch({
      type: APPROVE_CLAIM,
      payload: error,
    });
  }
  };
