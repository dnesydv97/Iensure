import {
    
   PROPOSAL_LIST,ONLINE_PROPOSAL_COMMENTS,ONLINE_KYC_COMMENTS,WIZA_DETAILS, WIZB_DETAILS
    } from '../actions/Types';
    
    const initialState = {
list:[],
proposalcomment:[],
kyccomment:[],
wizA:[],
wizB:[],
wizLoader:true,

    };
    export default function (state = initialState, action) {
      switch (action.type) {
        case PROPOSAL_LIST:
          return {
            ...state,
            list: action.payload,
           
          };
     
        case ONLINE_PROPOSAL_COMMENTS:
          return {
            ...state,
            proposalcomment: action.payload,
           
          };
     
        case ONLINE_KYC_COMMENTS:
          return {
            ...state,
            kyccomment: action.payload,
           
          };
        case WIZA_DETAILS:
          return {
            ...state,
            wizA: action.payload,
            wizLoader:false
           
          };
        case WIZB_DETAILS:
          return {
            ...state,
            wizB: action.payload,
           
          };
     
        default:
          return state;
      }
    }
    