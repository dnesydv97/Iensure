import {GET_NEWS_EVENTS} from '../actions/Types';

const initialState = {events: []};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEWS_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

   
    default:
      return state;
  }
}
