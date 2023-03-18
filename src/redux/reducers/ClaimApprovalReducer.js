import {CLAIM_APPROVAL_DETAILS,APPROVE_CLAIM} from '../actions/Types';

const initialState = {
    checkDetails: [],
   approved:[]
};

export default function (state = initialState, action) {

  switch (action.type) {
    case CLAIM_APPROVAL_DETAILS:
      return {
        ...state,
        checkDetails: action.payload,
      };
   
    case APPROVE_CLAIM:
      return {
        ...state,
        approved: action.payload,
      };
   

    default:
      return state;
  }
}
