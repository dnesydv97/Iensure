import {SAVE_PASSWORD_END ,SAVE_OTP_END,GET_BRANCHES_DATA,FORGET_PASSWORD,SAVE_OTP,SAVE_PASSWORD,FORGET_PASSWORD_END} from '../actions/Types';

const initialState = {branch: [],forgetPass:'',saveotp:'',password:''};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BRANCHES_DATA:
      return {
        ...state,
        branch: action.payload,
      };
    case FORGET_PASSWORD_END:
      return {
        ...state,
        forgetPass:null,
      };

      case FORGET_PASSWORD:
        return {
          ...state,
          forgetPass: action.payload,
        };
      case SAVE_OTP:
        return {
          ...state,
          saveotp: action.payload,
        };
      case SAVE_OTP_END:
        return {
          ...state,
          saveotp: null,
        };
      case SAVE_PASSWORD:
        return {
          ...state,
          password: action.payload,
        };
  
      case SAVE_PASSWORD_END:
        return {
          ...state,
          password: null,
        };
  
    default:
      return state;
  }
}
 