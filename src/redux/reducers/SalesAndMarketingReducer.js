import {
  CLAIM_PENDING,CLAIM_APPROVAL, GET_BRANCHES,CLAIM_OUTSTANDING_SUMMARY_POST,GET_CLAIM_OUTSTANDING_SUMMARY,GET_CLAIM_PAID_SUMMARY,GET_FISCAL_YEAR,GET_FISCAL_DATE,BUSINESS_TODAY,FIELD_OFFICER_LIST,FIELD_OFFICER_PORTFOLIO
  } from '../actions/Types';
  
  const initialState = {
  
  branche:[],
    loadingUi: false,
    filter:[],
    claimSummary:[],
    claimPaid:[],
    year:'',
    date1:[],
    business:[],
    folist:[],
    portfolio:[],
    pending:[],
    approved:[],
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case CLAIM_PENDING:
        return {
          ...state,
  
          pending: action.payload,
        };
      case CLAIM_APPROVAL:
        return {
          ...state,
  
          approved: action.payload,
        };
      case GET_BRANCHES:
        return {
          ...state,
  
          branche: action.payload,
        };
      case CLAIM_OUTSTANDING_SUMMARY_POST:
        
        return {
          ...state,
  
          filter: action.payload,
         
        };
     
      case GET_CLAIM_OUTSTANDING_SUMMARY:
        return {
          ...state,
  
          claimSummary: action.payload,
        };
      case GET_CLAIM_PAID_SUMMARY:
        return {
          ...state,
  
          claimPaid: action.payload,
        };
     
      case GET_FISCAL_YEAR:
        return {
          ...state,
  
          year: action.payload,
        };
      case GET_FISCAL_DATE:
        return {
          ...state,
  
          date1: action.payload,
        };
     
      case BUSINESS_TODAY:
        return {
          ...state,
  
          business: action.payload,
        };
      case FIELD_OFFICER_LIST:
        return {
          ...state,
  
          folist: action.payload,
        };
     
      case FIELD_OFFICER_PORTFOLIO:
        return {
          ...state,
  
          portfolio: action.payload,
        };
     
  
      default:
        return state;
    }
  }
  