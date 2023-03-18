import {AUTH_USER, NEW_USER,OLD_USER} from '../../redux/actions/Types';
import {
  localAuth,
  signUpLocal,
  register,
  verifyOtp,
  existing
} from '../../redux/api/Auth';
import {ActionSheetIOS} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

/*
 * Small wrapper functions that dispatch different action types.
 */

const navigation = useNavigation();

export function loginSuccess(loginData) {
  return {type: AUTH_USER, payload: loginData};
}
export function registerSuccess(loginData) {
  return {type: NEW_USER, payload: loginData};
}
export function existingSuccess(loginData) {
  return {type: OLD_USER, payload: loginData};
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
export function localLogin() {
 
  return dispatch => {
    localAuth(email, password)
      .then(response => {
        if (response.data.response_code == 0) {
          AsyncStorage.setItem('auth', JSON.stringify(response.data));
          dispatch(loginSuccess(response.data.data));
          navigation.navigate('Dash');
        }
      })
      .catch(error => {
        if (error.response) {
         
        } else {
     
        }
      });
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
export function localSignup(email, password) {
  return dispatch => {
    signUpLocal(email, password)
      .then(response => {
       
      })
      .catch(error => {
        if (error.response) {
        
        } else {
         
        }
      });
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
export function localRegister(userId, userType) {

  return dispatch => {
    register(userId, userType)
      .then(response => {
      
        dispatch(registerSuccess(response.data.data));
      })
      .catch(error => {
        if (error.response) {
        
        } else {
        
        }
      });
  };
}
export function localExisting(userId) {

  return dispatch => {
    existing(userId)
      .then(response => {
      
        dispatch(existingSuccess(response.data.data));
      })
      .catch(error => {
        if (error.response) {
        
        } else {
        
        }
      });
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
export function verify(email, password) {
  return dispatch => {
    verifyOtp(email, password)
      .then(response => {
     
      })
      .catch(error => {
        if (error.response) {
        
        } else {
        
        }
      });
  };
}
