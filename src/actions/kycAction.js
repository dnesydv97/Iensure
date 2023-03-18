import {
  KYC_DATA,
  KYC_DATA_INDIVIDUAL_FOUR,
  KYC_DATA_INDIVIDUAL_ONE,
  KYC_DATA_INDIVIDUAL_THREE,
  KYC_DATA_INDIVIDUAL_TWO,
  KYC_DATA_INDIVIDUAL_STATUS,
} from './AuthTypes';
import {localKyc} from '../api/kyc';

/*
 * Small wrapper functions that dispatch different action types.
 */

export function kycStepOne(kycData) {
  return {type: KYC_DATA_INDIVIDUAL_ONE, payload: kycData};
}
export function kycStepTwo(kycData) {
  return {type: KYC_DATA_INDIVIDUAL_TWO, payload: kycData};
}
export function kycStepThree(kycData) {
  return {type: KYC_DATA_INDIVIDUAL_THREE, payload: kycData};
}
export function kycStepFour(kycData) {
  return {type: KYC_DATA_INDIVIDUAL_FOUR, payload: kycData};
}
export function kycIndividual() {
  return {type: KYC_DATA_INDIVIDUAL_STATUS};
}

/**
 * Logs in the user via calling the authenticate API and then dispatching
 * it to the reducer.
 * s
 * @param {String} email username of the user account.
 * @param {String} password password of the user account.
 *
 * @return dispatches object either AUTH type or AUTH_ERROR action type.
 */
export function localKycSave(kycData, kycStep) {
  return dispatch => {
    if (kycStep == 1) {
      dispatch(kycStepOne(kycData));
    }
    if (kycStep == 2) {
      dispatch(kycStepTwo(kycData));
    }
    if (kycStep == 3) {
      dispatch(kycStepThree(kycData));
    }
    if (kycStep == 4) {
      dispatch(kycStepFour(kycData));
    }
  };
}
/**
 * Logs in the user via calling the authenticate API and then dispatching
 * it to the reducer.
 * s
 * @param {String} email username of the user account.
 * @param {String} password password of the user account.
 *
 * @return dispatches object either AUTH type or AUTH_ERROR action type.
 */
export function localKycPost(
  kycDataOne,
  kycDataTwo,
  kycDataThree,
  kycDataFour,
) {
  return dispatch => {
    const kycData = {
      ...kycDataOne,
      ...kycDataTwo,
      ...kycDataThree,
      ...kycDataFour,
    };
    localKyc(kycData)
      .then(response => {
        if (response.data.response_code == 1) {
          dispatch(kycIndividual());
        }
      })
      .catch(error => {
        if (error.response) {
         
        } else {
          
        }
      });
  };
}
