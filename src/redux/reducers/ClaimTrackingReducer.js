import {
  CLAIM_TRACKING_STATUS,
  GET_CLAIM_ASSESSEMENT_SUMMARY,
  GET_SURVEYOR,GET_DOCUMENT,CLAIM_TRACKING_HOME,GET_FEEDBACK,SAVED_CHAT,CLAIM_TRACKING_DOCUMENTATION_UPLOAD,CLAIM_TRACKING_DOCUMENTATION_PHOTO_VIEW
  } from '../actions/Types';
  
  const initialState = {
home:[],
  claimstatus:[],
  cas:[],
  surveyor:[],
  document:[],
  chat:[],
saved:'',
     documentUpload: '',
     photoview:[]
    // premeCalc: '',
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case CLAIM_TRACKING_HOME:
        return {
          ...state,
          home: action.payload,
         
        };
      case CLAIM_TRACKING_STATUS:
        return {
          ...state,
          claimstatus: action.payload,
         
        };

        case GET_CLAIM_ASSESSEMENT_SUMMARY:
          return {
            ...state,
            cas: action.payload,
           
          };
        case GET_SURVEYOR:
          return {
            ...state,
            surveyor: action.payload,
           
          };
        case GET_DOCUMENT:
          return {
            ...state,
            document: action.payload,
           
          };
        case GET_FEEDBACK:
          return {
            ...state,
            chat: action.payload,
           
          };
        case SAVED_CHAT:
          return {
            ...state,
            saved: action.payload,
           
          };
        case CLAIM_TRACKING_DOCUMENTATION_UPLOAD:
         
          return {
            ...state,
            documentUpload: action.payload,
           
          };
        case CLAIM_TRACKING_DOCUMENTATION_PHOTO_VIEW:
         
          return {
            ...state,
            photoview: action.payload,
           
          };
      default:
        return state;
    }
  }
  