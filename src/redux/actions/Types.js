// Auth types
export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_END = 'LOGIN_END';
export const LOGIN_FAILURE_END = 'LOGIN_FAILURE_END';
export const NEW_USER_INIT = 'new_user_init';
export const NEW_USER = 'new_user';

export const NEW_USER_END = 'new_user_end';
export const NEW_USER_END_EXISTING = 'NEW_USER_END_EXISTING';
export const NEW_REGISER_UNSUCCESS = 'NEW_REGISER_UNSUCCESS';
export const NEW_REGISER_UNSUCCESS_EXIST = 'NEW_REGISER_UNSUCCESS_EXIST';
export const CLEAR_DATA_FORGETPASSWORD = 'CLEAR_DATA_FORGETPASSWORD';
export const EXISTING_OLD_USER = 'EXISTING_OLD_USER';
export const OLD_USER = 'OLD_USER';
export const EXISTING_NEW_USER_INIT = 'EXISTING_NEW_USER_INIT';


export const NEW_USER_TYPE = 'new_user_type';
export const NEW_USER_TYPE_EXISTING = 'NEW_USER_TYPE_EXISTING';
export const USER_VERIFIED_INIT = 'user_verified_init';
export const USER_VERIFIED = 'user_verified';
export const USER_VERIFIED_UNSUCCESS = 'user_verified_unsuccess';
export const USER_VERIFIED_END = 'user_verified_end';

export const LOADING_RESOURCE = 'loading_resource';
export const LOGOUT = 'logout';
export const NEW_USER_CREATED = 'new_user_created';
export const NEW_USER_CREATED_END = 'new_user_created_END';
export const FORGET_PASSWORD_END = 'FORGET_PASSWORD_END';

export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const SAVE_OTP = 'SAVE_OTP';
export const AUTH_REMOVE = 'AUTH_REMOVE';
export const SAVE_OTP_END = 'SAVE_OTP_END';
export const SAVE_PASSWORD_END = 'SAVE_PASSWORD_END';

// KYC Types
export const KYC_DATA_INDIVIDUAL_ONE = 'kyc_data_individual_one';
export const KYC_DATA_INDIVIDUAL_TWO = 'kyc_data_individual_two';
export const KYC_DATA_INDIVIDUAL_THREE = 'kyc_data_individual_three';
export const KYC_DATA_INDIVIDUAL_FOUR = 'kyc_data_individual_four';
export const KYC_DATA_INDIVIDUAL_STATUS = 'kyc_data_individual_status';
export const KYC_DATA_BY_ID = 'kyc_data_by_id';
export const KYC_LOADING_INIT = 'KYC_LOADING_INIT';

export const KYC_PROVINCE = 'KYC_PROVINCE';
export const KYC_DISTRICT = 'KYC_DISTRICT';
export const KYC_MUNCIPALITY = 'KYC_MUNCIPALITY';
export const KYC_OCCUPTION = 'KYC_OCCUPTION';
export const KYC_CLASSIFICATION = 'KYC_CLASSIFICATION';
export const KYC_INCOME_SOURCE = 'KYC_INCOME_SOURCE';
export const KYC_RESULT = 'KYC_RESULT';
export const KYC_RESULT_END = 'KYC_RESULT_END';

export const KYC_DATA_SAVE ='KYC_DATA_SAVE'
export const KYC_DATA_REMOVE ='KYC_DATA_REMOVE'

//PremiumCalculatorForm  bikes
export const EXCESS_OWN_DAMAGE = 'EXCESS_OWN_DAMAGE';
export const MANUFACTURE_YEAR = 'YEAR_MANUFACTURE';
export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';

export const CALC_BIKE_GET_PICKER_DATA = 'CALC_BIKE_GET_PICKER_DATA';
export const GET_COMPULSORY_EXCESS = 'GET_COMPULSORY_EXCESS';
export const GET_MAKE_VEHICLE_LIST = 'GET_MAKE_VEHICLE_LIST';
export const GET_MAKE_MODEL = 'GET_MAKE_MODEL';
export const VEHICLE_NAME_LIST = 'VEHICLE_NAME_LIST';

export const PREMIUM_CALC_INIT = 'PREMIUM_CALC_INIT';
export const PREMIUM_CALC = 'PREMIUM_CALC';
export const PREMIUM_CALC_THIRD_PARTY = 'PREMIUM_CALC_THIRD_PARTY';
export const PREMIUM_CALC_END = 'PREMIUM_CALC_END';
export const PREMIUM_CALC_END_THIRD_PARTY = 'PREMIUM_CALC_END_THIRD_PARTY';
export const PREMIUM_CALC_INIT_THIRD_PARTY = 'PREMIUM_CALC_INIT_THIRD_PARTY';

export const LOADING_UI = 'loading_ui';
export const MASTER_REFERANCE_ID = 'MASTER_REFERANCE_ID';
export const SAVE_MOTOR_WIZA = 'SAVE_MOTOR_WIZA';
export const SAVE_WIZA_INIT = 'SAVE_WIZA_INIT';
export const SAVE_WIZA_END = 'SAVE_WIZA_END';
export const SAVE_MOTOR_WIZ_B = 'SAVE_MOTOR_WIZ_B';
export const GET_OCCUPTION_LIST = 'GET_OCCUPTION_LIST';

//claimintimation
export const CLAIM_INTIMATIONS_INIT = 'CLAIM_INTIMATIONS_INIT';
export const CLAIM_INTIMATIONS = 'CLAIM_INTIMATIONS';
export const CLAIM_INTIMATIONS_END = 'CLAIM_INTIMATIONS_END';

export const CLAIM_INTIMATIONS_LIST_INIT = 'CLAIM_INTIMATIONS_LIST_INIT';
export const CLAIM_INTIMATIONS_LIST = 'CLAIM_INTIMATIONS_LIST';
export const CLAIM_INTIMATIONS_LIST_END = 'CLAIM_INTIMATIONS_LIST_END';
export const CLAIM_INTIMATION_FEEDBACK = 'CLAIM_INTIMATION_FEEDBACK';
export const CLAIM_INTIMATIONS_FEEDBACK_SEND =
  'CLAIM_INTIMATIONS_FEEDBACK_SEND';

//Claim Tracking
export const CLAIM_TRACKING_HOME = 'CLAIM_TRACKING_HOME';
export const CLAIM_TRACKING_STATUS = 'CLAIM_TRACKING_STATUS';
export const GET_CLAIM_ASSESSEMENT_SUMMARY = 'GET_CLAIM_ASSESSEMENT_SUMMARY';
export const GET_SURVEYOR = 'GET_SURVEYOR';
export const GET_DOCUMENT = 'GET_DOCUMENT';
export const GET_FEEDBACK = 'GET_FEEDBACK';
export const SAVED_CHAT = 'SAVED_CHAT';
export const CLAIM_TRACKING_DOCUMENTATION_UPLOAD =
  'CLAIM_TRACKING_DOCUMENTATION_UPLOAD';
export const CLAIM_TRACKING_DOCUMENTATION_PHOTO_VIEW =
  'CLAIM_TRACKING_DOCUMENTATION_PHOTO_VIEW';

//MyPolicy
export const GET_MY_POLICY = 'GET_MY_POLICY';
export const GET_DETAILS = 'GET_DETAILS';

//PayPremium
export const GET_PAY_PREMIUM = 'GET_PAY_PREMIUM';
export const PAY_PREMIUM_INIT = 'PAY_PREMIUM_INIT';
export const PAY_PREMIUM_END = 'PAY_PREMIUM_END';

//sales and Marketing
export const GET_BRANCHES = 'GET_BRANCHES';
export const CLAIM_OUTSTANDING_SUMMARY_POST = 'CLAIM_OUTSTANDING_SUMMARY_POST';
export const GET_CLAIM_OUTSTANDING_SUMMARY = 'GET_CLAIM_OUTSTANDING_SUMMARY';
export const GET_CLAIM_PAID_SUMMARY = 'GET_CLAIM_PAID_SUMMARY';
export const GET_FISCAL_YEAR = 'GET_FISCAL_YEAR';
export const GET_FISCAL_DATE = 'GET_FISCAL_DATE';
export const BUSINESS_TODAY = 'BUSINESS_TODAY';
export const FIELD_OFFICER_LIST = 'FIELD_OFFICER_LIST';
export const FIELD_OFFICER_PORTFOLIO = 'FIELD_OFFICER_PORTFOLIO';

//checkPolicy
export const GET_CHECK_POLICY = 'GET_CHECK_POLICY';

export const GET_CHECK_POLICY_DETAILS_INIT = 'GET_CHECK_POLICY_DETAILS_INIT';
export const GET_CHECK_POLICY_DETAILS = 'GET_CHECK_POLICY_DETAILS';
export const GET_CHECK_POLICY_DETAILS_END = 'GET_CHECK_POLICY_DETAILS_END';

export const GET_MOTOR_DOCUMENT_LIST = 'GET_MOTOR_DOCUMENT_LIST';
export const GET_MOTOR_INFO = 'GET_MOTOR_INFO';

//News and Events

export const GET_NEWS_EVENTS = 'GET_NEWS_EVENTS';

//Branches
export const GET_BRANCHES_DATA = 'GET_BRANCHES_DATA';

//Our product
export const GET_PRODUCT_DATA = 'GET_PRODUCT_DATA';

//proposal data
export const PROPOSAL_LIST = 'PROPOSAL_LIST';
export const ONLINE_PROPOSAL_COMMENTS = 'ONLINE_PROPOSAL_COMMENTS';
export const ONLINE_KYC_COMMENTS = 'ONLINE_KYC_COMMENTS';
export const WIZA_DETAILS = 'WIZA_DETAILS';
export const WIZB_DETAILS = 'WIZB_DETAILS';

//image Upload
export const IMAGE_UPLOAD_PROFILE = 'IMAGE_UPLOAD_PROFILE';
export const GET_IMAGE_UPLOAD_PROFILE = 'GET_IMAGE_UPLOAD_PROFILE';

//claim Approval
export const CLAIM_PENDING = 'CLAIM_PENDING';
export const CLAIM_APPROVAL = 'CLAIM_APPROVAL';
export const CLAIM_APPROVAL_DETAILS = 'CLAIM_APPROVAL_DETAILS';
export const APPROVE_CLAIM = 'APPROVE_CLAIM';

//TMI
export const COVER_TYPES = 'COVER_TYPES';
export const PLANS_AND_AREA = 'PLANS_AND_AREA';
export const PACKAGE_TYPE = 'PACKAGE_TYPE';
export const TMI_PREMIUM = 'TMI_PREMIUM';
export const TMI_SAVE_DETAILS = 'TMI_SAVE_DETAILS';
export const DOLLAR_EXCHANGE = 'DOLLAR_EXCHANGE';
export const TMI_PREMIUM_INIT='TMI_PREMIUM_INIT'
export const TMI_PREMIUM_END='TMI_PREMIUM_END'
export const SAVE_TMI_INIT='SAVE_TMI_INIT'
export const SAVE_TMI_END='SAVE_TMI_END'