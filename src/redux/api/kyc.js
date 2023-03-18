import axios from 'axios';
import Config from '../../config';




const auth = {
  username: 'Arhant',
  password: '123456',
};
/**
 * Logs in the user via calling the authenticate API using
 * the axios POST call
 *
 * @param {String} userId username of the user account.
 * @param {String} password password of the user account.
 *
 * @return a promise object of the POST user/authenticate call.
 */
export function localKyc(kycData) {
  const URL = `${Config.API_URL}KYC/InsertKYC`;


  const formData= new FormData()
      // formData.append('KYCDetails',JSON.stringify(payload))
      formData.append(
        'KYCDetails',
        "[\n{\n             BRANCHCODE:1,\n\nKYCRiskCategory : 1,\n             INSUREDNAME_ENG: 'Test',\n             INSUREDNAME_NEP: 'टेस्ट ',\n             ADDRESS: 'kathmandu',\n             ADDRESSNEPALI: 'टेस्ट  ',\n             DISTRICTID: 63, \n             MUNICIPALITYCODE: 33,\n             WARDNO: 10,\n             MOBILENO: '9823542893',\n             EMAIL: 'abc@gmail.com',\n             PANNO: '11445',\n             FATHERNAME: 'test',\n             NFATHERNAME: 'टेस्ट',\n             GRANDFATHERNAME: 'test',\n             NGRANDFATHERNAME: 'टेस्ट',\n             CITIZENSHIPNO: '2243423423',\n             ISSUEDATE: '2021-07-25 ',\n             ISSUE_DISTRICT_ID: 12\n        }\n]\n",
      );
  return axios.post(URL, formData);
}


export const PROVINCE_API = `${Config.API_URL}Area/GetProvince`;
export const DISTRICT_API =`${Config.API_URL}Area/GetDistrict`;
export const MUNCIPALITY_API = `${Config.API_URL}Area/GetMNUVDC`;
export const OCCUPTION_API =`${Config.API_URL}KYC/GetKYCOccupation`;
export const CLASSIFICATION_API =`${Config.API_URL}KYC/getkycclassification`;
export const INCOME_SOURCE_API = `${Config.API_URL}KYC/GetIncomeSource`;
export const KYC_RESULT_API =`${Config.API_URL}OnlineKYC/InsertKYC`;
export const IMAGE_UPLOAD_API = `${Config.API_URL}User/SaveUserProfileImage`;
export const GET_IMAGE_UPLOAD_API =`${Config.API_URL}User/GetUserProfileImage`;