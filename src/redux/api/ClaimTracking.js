
import Config from '../../config';
export const CLAIM_TRACKING = `${Config.API_URL}Reports/GetKYCClaimList`;
export const CLAIM_TRACKING_CLAIM_STATUS = `${Config.API_URL}Reports/GetClaimStatus`;
export const CLAIM_ASSESSEMENT_SUMMARY =`${Config.API_URL}Reports/GetClaimAssessmentSummary`;
export const SURVEYOR_DATA =`${Config.API_URL}Reports/GetClaimSurveyorData`;
export const TRACKING_DOCUMENT = `${Config.API_URL}Reports/GetClaimDocumentList`;
export const GET_CHAT =`${Config.API_URL}Claim/GetFeedBackList`;
export const SAVED_CHAT_API = `${Config.API_URL}Claim/SaveFeedBack`;
export const CLAIM_TRACKING_DOCUMENTATION_UPLOAD_API =`${Config.API_URL}Claim/UploadClaimSurveyorDocument`;
export const CLAIM_TRACKING_VIEW_PHOTO =`${Config.API_URL}Claim/GetClaimDocumentImages`;



