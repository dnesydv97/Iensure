import {
  AUTH_USER,
  LOGIN_FAILURE,
  LOGIN_FAILURE_END,
  NEW_USER_INIT,
  NEW_USER,
  NEW_USER_END,
  NEW_USER_END_EXISTING,
  EXISTING_NEW_USER_INIT,
  NEW_REGISER_UNSUCCESS,
  NEW_REGISER_UNSUCCESS_EXIST,
  NEW_USER_TYPE,
  NEW_USER_TYPE_EXISTING,
  USER_VERIFIED_INIT,
  USER_VERIFIED,
  USER_VERIFIED_UNSUCCESS,
  USER_VERIFIED_END,
  LOADING_RESOURCE,
  LOGOUT,
  NEW_USER_CREATED,
  NEW_USER_CREATED_END,
  FORGET_PASSWORD,
  AUTH_REMOVE,
  AUTH_ERROR,
  SAVE_PASSWORD,
  SAVE_OTP,
  LOGIN_END,
  FORGET_PASSWORD_END,
  SAVE_OTP_END,
  SAVE_PASSWORD_END,
  EXISTING_OLD_USER,
  OLD_USER,
} from './Types';
import {
  localAuth,
  signUpLocal,
  register,
  existing,
  verifyOtp,
  FORGET_PASSWORD_API,
  CHANGE_PASSWORD,
  USER_VERIFY,
} from '../api/Auth';
import {ActionSheetIOS, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export function loginSuccess(loginData) {
  return {type: AUTH_USER, payload: loginData};
}
export function loginRemove() {
  return {type: AUTH_REMOVE};
}
export function verifySuccess() {
  return {type: USER_VERIFIED};
}
export function loginError(error) {
  return {type: AUTH_ERROR, payload: error};
}

export function registerSuccess(userRespData, userEmail) {
  return {type: NEW_USER, payload: userRespData, email: userEmail};
}
export function existingSuccess(userRespData, userEmail) {
  

  return {type: OLD_USER, payload: userRespData, email: userEmail};
}

export function newUserType(userType) {
  return {type: NEW_USER_TYPE, payload: userType};
}
export function newUserTypeexist(userType) {
  return {type: NEW_USER_TYPE_EXISTING, payload: userType};
}

export function newUserSignUP(userData, resp) {
  return {type: NEW_USER_CREATED, payload: userData, signUpPayload: resp};
}

export function loading(running) {
  return {type: LOADING_RESOURCE, running};
}
export function logout() {
  return {type: LOGOUT};
}

const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};

export function localLogin(email, password) {
  return dispatch => {
    dispatch(loading(true));
    localAuth(email, password)
      .then(response => {
        dispatch(loading(false));
        console.log('#########  response login data', response.data);
        if (response?.data?.response_code == 1) {
          console.log('#########  response login data error', response.data);

          dispatch({
            type: LOGIN_FAILURE,
            payload: response?.data,
          });
        } else {
          // AsyncStorage.setItem('session', JSON.stringify(response.data.data));
          dispatch(loginSuccess(response.data.data));
          dispatch({
            type: LOGIN_END,
          });
        }

        dispatch({
          type: LOGIN_FAILURE_END,
        });
      })
      .catch(error => {
        console.log("firsterror",error)
        dispatch(loading(false));
        if (error.response_message) {
          dispatch(loginError('Email or Password Error'));
        } else {
          dispatch(loginError('Unable to connect to the server.'));
        }
      });
  };
}

export const authRemover = () => {
  return {
    type: AUTH_REMOVE,
  };
};

export function clear() {
  return dispatch => {
    AsyncStorage.clear();
    dispatch(logout());
  };
}

export function localSignup(userData, userID) {
  console.log("signupdata",userData,userID.data)
  return dispatch => {
    dispatch(loading(true));
    // signUpLocal(userData, userID.data)
    signUpLocal(userData, userID)
      .then(response => {
        console.log('responsesignUp', response);
        dispatch(loading(false));

        dispatch(newUserSignUP(userData, response?.data));

        dispatch(localLogin(userData?.EmailID, userData?.password));

        dispatch({
          type: NEW_USER_CREATED_END,
        });
      })

      .catch(error => {
        dispatch(loading(false));
        dispatch({
          type: NEW_USER_CREATED_END,
        });
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error.response);
        }
      });
  };
}

export function localRegister(userEmail, userTypeId) {
  return dispatch => {
    dispatch({
      type: NEW_USER_INIT,
    });
    register(userEmail, userTypeId)
      .then(response => {
        // console.log('################## Register', response.data);
        dispatch({
          type: NEW_USER_END,
        });
        if (
          response.data.response_code == 1 ||
          response.data.response_code == 2
        ) {
          dispatch({
            type: NEW_REGISER_UNSUCCESS,
            payload: response.data,
          });
          dispatch({
            type: NEW_USER_END,
          });
        } else {
          dispatch(registerSuccess(response.data, userEmail));
          dispatch(newUserType(userTypeId));
        }
      })

      .catch(error => {
        if (error.response) {
          dispatch({
            type: NEW_USER_END,
          });
        } else {
          console.log('############# else', error);
        }
      });
  };
}
export function ExistingUser(userEmail) {
  console.log("userEmail",userEmail)
  return dispatch => {
    dispatch({
      type: EXISTING_NEW_USER_INIT,
    });
    existing(userEmail)
      .then(response => {
        console.log('################## Existing userRegister', response.data);

        if (
          response.data.response_code == 1 ||
          response.data.response_code == 2
        ) {
          dispatch({
            type: NEW_REGISER_UNSUCCESS_EXIST,
            payload: response.data,
          });
        } else {
        dispatch(existingSuccess(response.data, userEmail));
        }
        dispatch({
          type: NEW_USER_END_EXISTING,
        });
      })

      .catch(error => {
        console.log('############# else', error);
      });
  };
}

export function localVerify(code, userId) {
  console.log('otpdetails', code, userId);
  return dispatch => {
    // dispatch(loading(true));
    dispatch({
      type: USER_VERIFIED_INIT,
    });
    verifyOtp(code, userId)
      .then(response => {
        console.log('####### Response OTP', response);
        dispatch({
          type: USER_VERIFIED_END,
        });
        if (response.data.response_code == 1) {
          dispatch({
            type: USER_VERIFIED_UNSUCCESS,
            payload: response.data,
          });
        } else {
          dispatch(verifySuccess());
        }
      })
      .catch(error => {
        // dispatch(loading(false));
        dispatch({
          type: USER_VERIFIED_END,
        });
        if (error.response) {
          console.log('#############', error.response);
        } else {
          console.log('#############', error);
        }
      });
  };
}

export const getNewPassword = data => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.post(FORGET_PASSWORD_API, data, {auth});
    if (res.status >= 200) {
      dispatch(loading(false));
    }
    dispatch({
      type: FORGET_PASSWORD,
      payload: res.data,
    });
    dispatch({
      type: FORGET_PASSWORD_END,
    });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD,
      payload: error,
    });
  }
};

export const getSavePassword = data => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.post(CHANGE_PASSWORD, data, {auth});
    if (res.status >= 200) {
      dispatch(loading(false));
    }
    dispatch({
      type: SAVE_PASSWORD,
      payload: res.data,
    });
    dispatch({
      type: SAVE_PASSWORD_END,
    });
  } catch (error) {
    dispatch({
      type: SAVE_PASSWORD,
      payload: error,
    });
  }
};

export const getForgetOtp = data => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.post(USER_VERIFY, data, {auth});
    if (res.status >= 200) {
      dispatch(loading(false));
    }
    dispatch({
      type: SAVE_OTP,
      payload: res.data,
    });
    dispatch({
      type: SAVE_OTP_END,
    });
  } catch (error) {
    dispatch({
      type: SAVE_OTP,
      payload: error,
    });
  }
};
