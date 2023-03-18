import axios from 'axios';
import Config from '../config';


const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
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

  const data = {
    BRANCHCODE: '01',
    KYCNO: '0',
    INSUREDTYPE: 1,
    ACCOUNTNAMECODE: '500',
    INSUREDNAME_ENG: 'Test',
    INSUREDNAME_NEP: 'टेस्ट ',
    KYCCLASSIFICATION: '1',
    KYCRiskCategory: '1',
    OCCUPATION: '2',
    INCOMESOURCE: '5',
    email: 'abc@gmail.com',
    PANNO: '12445',
    TELEPHONENO: '9809876541',
    MOBILENO: '9809876541',
    PROVINCEID: '14',
    DISTRICTID: '63',
    MNUVDC: '7',
    WARDNO: '10',
    EADDRESS: 'Test',
    ADDRESSNEPALI: 'टेस्ट ',
    HOUSENO: '122',
    TEMPORARYADDRESS: 'test',
    ADDRESS: 'nepalgunj',
    FATHERNAME: 'test',
    NFATHERNAME: 'टेस्ट ',
    GRANDFATHERNAME: 'test',
    NGRANDFATHERNAME: 'टेस्ट ',
    HUSBANDNAME: 'test',
    NHUSBANDNAME: 'टेस्ट ',
    WIFENAME: 'test',
    NWIFENAME: 'टेस्ट ',
    DATEOFBIRTH: '2003-07-17',
    NDATEOFBIRTH: '2060-04-01',
    MARITALSTATUS: '2',
    GENDER: '1',
    CITIZENSHIPNO: '2243423423',
    ISSUEDATE: '2021-07-25',
    NISSUEDATE: '2078-04-10',
    ISSUE_DISTRICT_ID: 12,
  };
  const formData= new FormData()
      // formData.append('KYCDetails',JSON.stringify(payload))
      formData.append(
        'KYCDetails',
        "[\n{\n             BRANCHCODE:1,\n\nKYCRiskCategory : 1,\n             INSUREDNAME_ENG: 'Test',\n             INSUREDNAME_NEP: 'टेस्ट ',\n             ADDRESS: 'kathmandu',\n             ADDRESSNEPALI: 'टेस्ट  ',\n             DISTRICTID: 63, \n             MUNICIPALITYCODE: 33,\n             WARDNO: 10,\n             MOBILENO: '9823542893',\n             EMAIL: 'abc@gmail.com',\n             PANNO: '11445',\n             FATHERNAME: 'test',\n             NFATHERNAME: 'टेस्ट',\n             GRANDFATHERNAME: 'test',\n             NGRANDFATHERNAME: 'टेस्ट',\n             CITIZENSHIPNO: '2243423423',\n             ISSUEDATE: '2021-07-25 ',\n             ISSUE_DISTRICT_ID: 12\n        }\n]\n",
      );
  return axios.post(URL, formData);
}
