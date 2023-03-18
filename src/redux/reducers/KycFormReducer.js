import {
  KYC_DISTRICT,
  KYC_PROVINCE,
  KYC_MUNCIPALITY,
  KYC_OCCUPTION,
  KYC_CLASSIFICATION,
  KYC_INCOME_SOURCE,
  KYC_RESULT,
  IMAGE_UPLOAD_PROFILE,
  GET_IMAGE_UPLOAD_PROFILE,
  KYC_RESULT_END,
  KYC_DATA_SAVE,
  KYC_DATA_REMOVE,
  KYC_LOADING_INIT
} from '../actions/Types';

const initialState = {
  province: [],
  district: [],
  mun: [],
  occup: [],
  class: '',
  incomesource: [],
  result: [],
  profile: '',
  getprofile: [],
  kycData: {
    kycOne: null,
    kycTwo: null,
    kycThree: null,
    kycFour: null,
  },
  KYCLoading:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case KYC_PROVINCE:
      return {
        ...state,
        province: action.payload,
      };
    case KYC_DISTRICT:
      return {
        ...state,
        district: action.payload,
      };
    case KYC_MUNCIPALITY:
      return {
        ...state,
        mnu: action.payload,
      };
    case KYC_OCCUPTION:
      return {
        ...state,
        occup: action.payload,
      };
    case KYC_CLASSIFICATION:
      return {
        ...state,
        class: action.payload,
      };
    case KYC_INCOME_SOURCE:
      return {
        ...state,
        incomesource: action.payload,
      };

      case KYC_LOADING_INIT:
      return {
        ...state,
        KYCLoading: true,
      };
    case KYC_RESULT:
      return {
        ...state,
        KYCLoading: false,
        result: action.payload,
      };
    case KYC_RESULT_END:
      return {
        ...state,
        result: null,
        kycData: {
          kycOne: null,
          kycTwo: null,
          kycThree: null,
          kycFour: null,
        },
      };
    case IMAGE_UPLOAD_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_IMAGE_UPLOAD_PROFILE:
      return {
        ...state,
        getprofile: action.payload,
      };
    case KYC_DATA_SAVE:
      let data = {};
      if (action.number == 1) {
        data = {
          ...state.kycData,
          kycOne: action.payload,
        };
      }
      if (action.number == 2) {
        data = {
          ...state.kycData,
          kycTwo: action.payload,
        };
      }
      if (action.number == 3) {
        data = {
          ...state.kycData,
          kycThree: action.payload,
        };
      }
      if (action.number == 4) {
        data = {
          ...state.kycData,
          kycFour: action.payload,
        };
      }
      return {
        ...state,
        kycData: data,
      };
    // case KYC_DATA_REMOVE: {
    //   return {
    //     ...state,
    //     kycData: {
    //       kycOne: null,
    //       kycTwo: null,
    //       kycThree: null,
    //       kycFour: null,
    //     },
    //   };
    // }

    default:
      return state;
  }
}
