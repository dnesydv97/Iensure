import {
  GET_CHECK_POLICY,
  GET_CHECK_POLICY_DETAILS_INIT,
  GET_CHECK_POLICY_DETAILS,
  GET_CHECK_POLICY_DETAILS_END,
  GET_MOTOR_DOCUMENT_LIST,
  GET_MOTOR_INFO,
} from '../actions/Types';

const initialState = {
  checkpolicy: [],
  checkpolicydetails: [],
  checkPolicyDetailsLoading: false,
  documentdata: [],
  motorinfo: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CHECK_POLICY:
      return {
        ...state,
        checkpolicy: action.payload,
      };
    case GET_CHECK_POLICY_DETAILS_INIT:
      return {
        ...state,
        checkpolicydetails: [],
        checkPolicyDetailsLoading: true,
      };

    case GET_CHECK_POLICY_DETAILS:
      return {
        ...state,
        checkPolicyDetailsLoading: false,
        checkpolicydetails: action.payload,
      };

    case GET_CHECK_POLICY_DETAILS_END:
      return {
        ...state,
        checkPolicyDetailsLoading: false,
        checkpolicydetails: [],
      };

    case GET_MOTOR_DOCUMENT_LIST:
      return {
        ...state,
        documentdata: action.payload,
      };
    case GET_MOTOR_INFO:
      return {
        ...state,
        motorinfo: action.payload,
      };

    default:
      return state;
  }
}
