import {GET_PRODUCT_DATA} from '../actions/Types';

const initialState = {
  productdata: [],
 
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_DATA:
      return {
        ...state,
        productdata: action.payload,
      };

    
    default:
      return state;
  }
}
