import {
  KYC_DATA_INDIVIDUAL_FOUR,
  KYC_DATA_INDIVIDUAL_ONE,
  KYC_DATA_INDIVIDUAL_THREE,
  KYC_DATA_INDIVIDUAL_TWO,
  KYC_DATA_INDIVIDUAL_STATUS,
  KYC_PROVINCE,
  KYC_DISTRICT,
  KYC_MUNCIPALITY,
  KYC_OCCUPTION,
  KYC_CLASSIFICATION,
  KYC_INCOME_SOURCE,
  KYC_RESULT,
  KYC_DATA_BY_ID,
  IMAGE_UPLOAD_PROFILE,
  GET_IMAGE_UPLOAD_PROFILE,
  AUTH_USER,
  KYC_RESULT_END,
  KYC_DATA_SAVE,
  KYC_DATA_REMOVE,
  KYC_LOADING_INIT
} from './Types';
import {
  localKyc,
  PROVINCE_API,
  DISTRICT_API,
  MUNCIPALITY_API,
  OCCUPTION_API,
  CLASSIFICATION_API,
  INCOME_SOURCE_API,
  KYC_RESULT_API,
  IMAGE_UPLOAD_API,
  GET_IMAGE_UPLOAD_API,
} from '../api/kyc';
import axios from 'axios';
/*
 * Small wrapper functions that dispatch different action types.
 */
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};
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

export const getKycById = data => async dispatch => {
 
  try {
    const res = await axios.post(
      'http://203.78.165.19:9078/Api/OnlineKYC/GetKycInfoById',
      data,
      {auth},
    );

    dispatch({
      type: KYC_DATA_BY_ID,
      payload: res.data,
    });
  } catch (error) {}
};
export const getProvince = data => async dispatch => {

  try {
    const res = await axios.post(PROVINCE_API, data, {auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: KYC_PROVINCE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: KYC_PROVINCE,
      payload: error,
    });
  }
};
export const getdistrict = data => async dispatch => {
  
  try {
    const res = await axios.post(DISTRICT_API, data, {auth});
    if (res.status >= 200) {
    
    }
    dispatch({
      type: KYC_DISTRICT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: KYC_DISTRICT,
      payload: error,
    });
  }
};
export const getmuncipality = data => async dispatch => {

  try {
    const res = await axios.post(MUNCIPALITY_API, data, {auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: KYC_MUNCIPALITY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: KYC_MUNCIPALITY,
      payload: error,
    });
  }
};
export const getOccuption = data => async dispatch => {
 
  try {
    const res = await axios.post(OCCUPTION_API, data, {auth});
    if (res.status >= 200) {
      
    }
    dispatch({
      type: KYC_OCCUPTION,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: KYC_OCCUPTION,
      payload: error,
    });
  }
};
export const getClassification = data => async dispatch => {

  try {
    const res = await axios.post(CLASSIFICATION_API, data, {auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: KYC_CLASSIFICATION,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: KYC_CLASSIFICATION,
      payload: error,
    });
  }
};
export const getIncome = data => async dispatch => {
 
  try {
    const res = await axios.post(INCOME_SOURCE_API, data, {auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: KYC_INCOME_SOURCE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: KYC_INCOME_SOURCE,
      payload: error,
    });
  }
};

export const getkycResult = data => async (dispatch, getState) => {
 
  dispatch({
    type: KYC_LOADING_INIT,
  });
  try {
    const res = await axios.post(KYC_RESULT_API, data, {auth});
   
    if (res.status >= 200) {
    }
    dispatch({
      type: KYC_RESULT,
      payload: res.data,
    });
    dispatch({
      type: KYC_RESULT_END,
    });
  } catch (error) {
    dispatch({
      type: KYC_RESULT,
      payload: error,
    });
  }
};
export const ProfileUpload = data => async dispatch => {

  try {
    const res = await axios.post(
      IMAGE_UPLOAD_API,
      data,
      {auth},
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
   
    if (res.status >= 200) {
   
   
    }
    dispatch({
      type: IMAGE_UPLOAD_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_PROFILE,
      payload: error,
    });
  }
};
export const getProfileUpload = data => async dispatch => {
 

  try {
    const res = await axios.post(GET_IMAGE_UPLOAD_API, data, {auth});
   
    if (res.status >= 200) {
    }
    dispatch({
      type: GET_IMAGE_UPLOAD_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_IMAGE_UPLOAD_PROFILE,
      payload: error,
    });
  }
};
export const saveDataKyc = (data, num) => async dispatch => {
  dispatch({
    type: KYC_DATA_SAVE,
    payload: data,
    number: num,
  });
};
export const removeDataKyc = () => async dispatch => {
  dispatch({
    type: KYC_DATA_REMOVE,

  });
};
