import {GET_MY_POLICY, GET_DETAILS} from '../actions/Types';

const initialState = {getmypolicy: [], details:''};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MY_POLICY:
      return {
        ...state,
        getmypolicy: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
   
    default:
      return state;
  }
}
