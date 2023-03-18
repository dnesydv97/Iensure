import {State} from 'react-native-gesture-handler';
import {act} from 'react-test-renderer';
import {
  AUTH_USER,
  LOGIN_FAILURE,
  LOGIN_FAILURE_END,
  NEW_USER_INIT,
  EXISTING_NEW_USER_INIT,
  NEW_USER,
  NEW_USER_END,
  NEW_USER_END_EXISTING,
  NEW_REGISER_UNSUCCESS,
  NEW_REGISER_UNSUCCESS_EXIST,
  NEW_USER_TYPE,
  USER_VERIFIED_INIT,
  USER_VERIFIED,
  USER_VERIFIED_UNSUCCESS,
  USER_VERIFIED_END,
  LOADING_RESOURCE,
  LOGOUT,
  NEW_USER_CREATED,
  NEW_USER_CREATED_END,
  AUTH_ERROR,
  AUTH_REMOVE,
  KYC_RESULT,
  LOGIN_END,
  OLD_USER,
  NEW_USER_TYPE_EXISTING,
} from '../actions/Types';

/**
 * Deals with all session related actions. Changes the state
 * depending on the type called.
 */
export default function sessionReducer(
  state = {
    isEmailVerified: '',
    authenticated: false,
    userID: {},
    user: null,
    loginFailureResp: null,
    newUserLoading: false,
    newUserLoadingExist: false,
    registerFailResp: {},
    registerFailRespexist: {},
    verificationLoading: false,
    unsucessVerifiedData: null,
    newUserCreated: false,
    newUserResponse: [],
    loginResp: null,
    loadingResource: false,
    oldUserResp: null,
  },
  action,
) {
  // console.log("actionsdfsd",action)

  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authError: '',
        authenticated: true,
        user: action.payload,
        loginResp: action.payload,
      };
    case LOGIN_END:
      return {
        ...state,
        loginResp: null,
      };

    case KYC_RESULT:
      return {
        ...state,
        user: [
          {
            ...state.user[0],
            KycId: action.payload.data.KYCID,
            kycNo: action.payload.data.KYCNO,
          },
        ],
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loginFailureResp: action.payload,
      };
    case AUTH_REMOVE:
      return {
        ...state,
        authenticated: false,
      };

    case LOGIN_FAILURE_END:
      return {
        ...state,
        loginFailureResp: null,
      };
    case NEW_USER_INIT:
      return {
        ...state,
        newUserLoading: true,
      };
    case EXISTING_NEW_USER_INIT:
      return {
        ...state,
        oldUserResp: null,
        newUserLoadingExist: true,
      };
    case NEW_REGISER_UNSUCCESS:
      return {
        ...state,
        newUserLoading: false,
        registerFailResp: action.payload,
      };
    case NEW_REGISER_UNSUCCESS_EXIST:
      return {
        ...state,
        newUserLoadingExist: false,
        registerFailRespexist: action.payload,
      };

    case NEW_USER:
      return {
        ...state,
        newUserLoading: false,
        authError: '',
        userID: action.payload?.data,
        userEmail: action.email,
        registerFailResp: {},
      };
    case OLD_USER:
      return {
        ...state,
        oldUserResp: action.payload,
        userEmail: action.email,
        userID: action.payload.Regd_ID,
        newUserLoadingExist: false,
      };
    case NEW_USER_END:
      return {
        ...state,
        newUserLoading: false,
        newUserRegistered: false,
        registerFailResp: null,
      };
    //existing user
    case NEW_USER_END_EXISTING:
      return {
        ...state,
        oldUserResp: null,
        newUserLoadingExist: false,
        newUserRegisteredexisting: false,
        registerFailRespexist: null,
      };
    case NEW_USER_TYPE:
      return {
        ...state,
        authError: '',
        newUserRegistered: true,
        userType: action.payload,
      };
    case NEW_USER_TYPE_EXISTING:
      return {
        ...state,
        authError: '',
        newUserRegisteredexisting: true,
      };
    case NEW_USER_CREATED:
      return {
        ...state,
        authError: '',
        newUserCreated: true,
        newUserResponse: action.signUpPayload,
      };
    case NEW_USER_CREATED_END:
      return {
        ...state,
        newUserCreated: false,
        newUserResponse: null,
      };
    case USER_VERIFIED_INIT:
      return {
        ...state,
        user: null,
        verificationLoading: true,
        unsucessVerifiedData: null,
      };
    case USER_VERIFIED:
      return {
        ...state,
        verified: true,
      };
    case USER_VERIFIED_UNSUCCESS:
      return {
        ...state,
        verified: false,
        unsucessVerifiedData: action.payload,
      };
    case USER_VERIFIED_END:
      return {
        ...state,
        verified: false,
        verificationLoading: false,
        unsucessVerifiedData: null,
      };
    case LOADING_RESOURCE:
      return {...state, loadingResource: action.running};
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: {},
        userEmail: '',
        userType: '',
        verified: undefined,
      };
    case AUTH_ERROR:
      return {...state, authError: action.payload};

    default:
      return state;
  }
}
