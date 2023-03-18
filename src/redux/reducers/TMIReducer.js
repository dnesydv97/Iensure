import {COVER_TYPES, PLANS_AND_AREA,PACKAGE_TYPE,TMI_PREMIUM_END,TMI_PREMIUM_INIT,TMI_PREMIUM,LOADING_UI,TMI_SAVE_DETAILS,DOLLAR_EXCHANGE,SAVE_TMI_END,SAVE_TMI_INIT} from '../actions/Types';

const initialState = {
  covers: [],
  plans:[],
  packages:[],
  premiumtmi:[],
  loadingUi: false,
  savetmi:[],
  rate:[]
};
export default function (state = initialState, action) {
  switch (action.type) {
    case COVER_TYPES:
      return {
        ...state,
        covers: action.payload,
      };
      case LOADING_UI:
        return {
          ...state,
          loadingUi: action.running,
        };
    case PLANS_AND_AREA:
      return {
        ...state,
        plans: action.payload,
      };
    case PACKAGE_TYPE:
      return {
        ...state,
        packages: action.payload,
      };



    case TMI_PREMIUM_INIT:
    
      return {
        ...state,
        loadingUi:true,
        premiumtmi: []
      };
    case TMI_PREMIUM:
    
      return {
        ...state,
        loadingUi:false,
        premiumtmi: action.payload,
      };
    case TMI_PREMIUM_END:
    
      return {
        ...state,
        
        loadingUi:false,
        // premiumtmi: []
      };





    case SAVE_TMI_INIT:
     
      return {
        ...state,
        savetmi: [],
      };
    case TMI_SAVE_DETAILS:
     
      return {
        ...state,
        savetmi: action.payload,
      };
    case SAVE_TMI_END:
     
      return {
        ...state,
        savetmi: [],
         premiumtmi: [],
      };
    case DOLLAR_EXCHANGE:
     
      return {
        ...state,
        rate: action.payload,
      };

    default:
      return state;
  }
}
