import {
  GET_PAY_PREMIUM,
  PAY_PREMIUM_INIT,
  PAY_PREMIUM_END,
} from '../actions/Types';

const initialState = {
  premium: [],
  premiumloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PAY_PREMIUM_INIT:
      return {
        ...state,
        premium: [],
        premiumloading: true,
      };

    case GET_PAY_PREMIUM:
      return {
        ...state,
        premium: action.payload,
        premiumloading: false,
      };

    case PAY_PREMIUM_END:
      return {
        ...state,
        premium: [],
        premiumloading: false,
      };
    default:
      return state;
  }
}
