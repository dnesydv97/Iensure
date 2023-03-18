import {GET_NEWS_EVENTS} from './Types.js';
import {NEWS_EVENTS} from '../api/NewsandEvents';
import axios from 'axios';
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};
export const NewsandEvents = data => async dispatch => {
  
    try {
      const res = await axios.post(NEWS_EVENTS, data,{auth});
      if (res.status >= 200) {
      
      }
      dispatch({
        type: GET_NEWS_EVENTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_NEWS_EVENTS,
        payload: error,
      });
    }
  };
