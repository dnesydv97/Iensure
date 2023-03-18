import {CLAIM_TRACKING_HOME, CLAIM_TRACKING_STATUS,GET_CLAIM_ASSESSEMENT_SUMMARY,CLAIM_TRACKING_DOCUMENTATION_PHOTO_VIEW,GET_SURVEYOR,GET_DOCUMENT,GET_FEEDBACK,SAVED_CHAT,CLAIM_TRACKING_DOCUMENTATION_UPLOAD} from './Types.js';
import {CLAIM_TRACKING_CLAIM_STATUS,CLAIM_ASSESSEMENT_SUMMARY,SURVEYOR_DATA,TRACKING_DOCUMENT,CLAIM_TRACKING,GET_CHAT,SAVED_CHAT_API,CLAIM_TRACKING_DOCUMENTATION_UPLOAD_API,CLAIM_TRACKING_VIEW_PHOTO} from '../api/ClaimTracking';

import axios from 'axios';
import { Alert } from 'react-native';
const auth = {
  username: 'PICL@BEEMA',
  password: 'PICL@BEEMA@123!@#',
};

export const ClaimTrackingClaimStatus = data => async dispatch => {
  try {
   
    const res = await axios.post(CLAIM_TRACKING_CLAIM_STATUS, data,{auth});
    if (res.status >= 200) {
    
    }
    dispatch({
      type: CLAIM_TRACKING_STATUS,
      payload: res.data,
      
    });
  } catch (error) {
    dispatch({
      type: CLAIM_TRACKING_STATUS,
      payload: error,
    });
  }
};
export const GetClaimAssessmentSummary = data => async dispatch => {
  try {
   
    const res = await axios.post(CLAIM_ASSESSEMENT_SUMMARY, data,{auth});
    if (res.status >= 200) {
  
    }
    dispatch({
      type: GET_CLAIM_ASSESSEMENT_SUMMARY,
      payload: res.data,
      
    });
  } catch (error) {
    dispatch({
      type: GET_CLAIM_ASSESSEMENT_SUMMARY,
      payload: error,
    });
  }
};
export const getSurveyor = data => async dispatch => {
  try {
   
    const res = await axios.post(SURVEYOR_DATA, data,{auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: GET_SURVEYOR,
      payload: res.data,
      
    });
  } catch (error) {
    dispatch({
      type: GET_SURVEYOR,
      payload: error,
    });
  }
};
export const getDocuments = data => async dispatch => {
  try {
   
    const res = await axios.post(TRACKING_DOCUMENT, data,{auth});
    if (res.status >= 200) {
     
    }
    dispatch({
      type: GET_DOCUMENT ,
      payload: res.data,
      
    });
  } catch (error) {
    dispatch({
      type: GET_DOCUMENT,
      payload: error,
    });
  }
};


export const claimTrackingHomeList = data => async dispatch => {
 

    try {
   
      const res = await axios.post(CLAIM_TRACKING, data,{auth});
      if (res.status >= 200) {
       
      }
      dispatch({
        type: CLAIM_TRACKING_HOME ,
        payload: res.data,
        
      });
    } catch (error) {
      dispatch({
        type: CLAIM_TRACKING_HOME,
        payload: error,
      });
    }
};

export const FeedbackChat = data => async dispatch => {
    try {
      const res = await axios.post(GET_CHAT, data,{auth});
      if (res.status >= 200) { 
      }
      dispatch({
        type: GET_FEEDBACK ,
        payload: res.data,
        
      });
    } catch (error) {
      dispatch({
        type: GET_FEEDBACK,
        payload: error,
      });
    }
};
export const FeedbackSavedChat = data => async dispatch => {
    try {
      const res = await axios.post(SAVED_CHAT_API, data,{auth});
      if (res.status >= 200) { 
      }
      dispatch({
        type: SAVED_CHAT ,
        payload: res.data,
        
      });
    } catch (error) {
      dispatch({
        type: SAVED_CHAT,
        payload: error,
      });
    }
};
export const TrackingDocumentUpload = data => async dispatch => {
  
    try {
      const res = await axios.post(CLAIM_TRACKING_DOCUMENTATION_UPLOAD_API, data,{auth},{
          headers: {
            'content-type': 'multipart/form-data'
          }
        });
       
      if (res.data.response_code==0) { 
        Alert.alert('Information',res.data.response_description , [
          {
            text: 'Okay',
            onPress: () => console.log('Okay Pressed'),
            style: 'Ok',
          },
        ]);
      }

   
      dispatch({
        type: CLAIM_TRACKING_DOCUMENTATION_UPLOAD ,
        payload: res.data,
        
      });
    } catch (error) {
      dispatch({
        type: CLAIM_TRACKING_DOCUMENTATION_UPLOAD,
        payload: error,
      });
    }
};
export const TrackingDocumentView = data => async dispatch => {

    try {
      const res = await axios.post(CLAIM_TRACKING_VIEW_PHOTO, data,{auth});
       
      if (res.status >= 200) { 
      }
      dispatch({
        type: CLAIM_TRACKING_DOCUMENTATION_PHOTO_VIEW,
        payload: res.data,
        
      });
    } catch (error) {
      dispatch({
        type: CLAIM_TRACKING_DOCUMENTATION_PHOTO_VIEW,
        payload: error,
      });
    }
};
