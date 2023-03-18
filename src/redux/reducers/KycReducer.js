import {
  KYC_DATA_INDIVIDUAL_ONE,
  KYC_DATA_INDIVIDUAL_TWO,
  KYC_DATA_INDIVIDUAL_THREE,
  KYC_DATA_INDIVIDUAL_FOUR,
  KYC_DATA_INDIVIDUAL_STATUS,
  KYC_PROVINCE,
  KYC_DATA_BY_ID
} from "../actions/Types";

/**
* Deals with all session related actions. Changes the state
* depending on the type called.
*/
export default function kycReducer(state = {
  isEmailVerified: '',
}, action) {
  switch (action.type) {
  case KYC_DATA_INDIVIDUAL_ONE:
      return {
          ...state,
          kycDataIndividualOne: action.payload,
      };
  case KYC_DATA_INDIVIDUAL_TWO:
      return {
          ...state,
          kycDataIndividualTwo: action.payload,
      };
  case KYC_DATA_INDIVIDUAL_THREE:
      return {
          ...state,
          kycDataIndividualThree: action.payload,
      };
  case KYC_DATA_INDIVIDUAL_FOUR:
      return {
          ...state,
          kycDataIndividualFour: action.payload,
      };
  case KYC_DATA_INDIVIDUAL_STATUS:
  
      return {
          ...state,
          kycDataIndividual: true,
      };
  case KYC_DATA_BY_ID:
 
      return {
          ...state,
          kycDataByID: action.payload,
      };
  default:
      return state;
  }
}



