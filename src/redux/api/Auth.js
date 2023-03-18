import axios from 'axios';
import Config from '../../config';

export const FORGET_PASSWORD_API =  `${Config.API_URL}User/ForgetPassword`;
export const CHANGE_PASSWORD =  `${Config.API_URL}User/ChangePasssword`;
export const USER_VERIFY =  `${Config.API_URL}User/VerifyOTP`;

const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};

export function localAuth(userId, password) {
  const URL = `${Config.API_URL}user/login`;
 
  return axios.post(
    URL,
    {
      UserId: userId,
      Password: password,
    },
    {auth},
  );
}


export function signUpLocal(userData, userID) {
 
  let gender = 0
  if (userData.gender == "female") {
    gender = 2
  }
  else if (userData.gender == "male") {
    gender = 1
  }
  else {
    gender = 3
  }
  const URL = `${Config.API_URL}User/SaveUserInfo`;
 
  return axios.post(
    URL,
    {
      Regd_ID: userID,
      FullName: userData.FullName,
      Gender: gender, //1 – male, 2 – female, 3 - others
      Password: userData.password,
      emailid: userData.EmailID,
      MobileNo: userData.MobileNo
    },
    {auth},
  );
}

export function register(userId, userType) {
  const URL = `${Config.API_URL}User/Registration`;

  return axios.post(
    URL,
    {
      UserId: userId,
      UserType: userType,
    },
    {auth},
  );
}
export function existing(userId) {
  const URL = `${Config.API_URL}User/VerifyExistingClient`;

  return axios.post(
    URL,
    {
      MobileNo: userId,
      
    },
    {auth},
  );
}

export function verifyOtp(code, userId) {

  const URL = `${Config.API_URL}user/verifyotp`;
  return axios.post(
    URL,
    {
      Regd_ID: userId, //registered id
      OTPCode: code,
    },
    {auth},
  );
}


