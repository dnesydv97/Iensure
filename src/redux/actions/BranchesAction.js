import {GET_BRANCHES_DATA} from './Types.js';
import {BRANCHES_API} from '../api/BranchesAPI';
import axios from 'axios';

const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
  };


  export const getBranch = data => dispatch => {
    axios
      .get(BRANCHES_API, {auth})        
      .then(res => {
        dispatch({
          type: GET_BRANCHES_DATA,
          payload: res.data.data,
        });
      })
      .catch(err => {});
  };