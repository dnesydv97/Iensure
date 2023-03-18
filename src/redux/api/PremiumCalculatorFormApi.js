import Config from '../../config';

export const CATEGORY_LIST = `${Config.API_URL}MotorSetup/GetCategoryList`;

export const EXCESS_URL = `${Config.API_URL}MotorSetup/GetExcessOwnDamage`;
export const YEAR_MANU = `${Config.API_URL}MotorSetup/GetMakeyearList`;
export const COMPULSORY_EXCESS = `${Config.API_URL}MotorSetup/GetCompulsoryExcess`;
// export const COMPULSORY_EXCESS = `${Config.API_URL}MotorSetup/GetExcessOwnDamage`;
export const VEHICLE_LIST = `${Config.API_URL}MotorSetup/GetMakeVehicleList`;
export const MAKE_MODEL = `${Config.API_URL}MotorSetup/GetMakeModel`;
export const VEHICLE_NAME = `${Config.API_URL}MotorSetup/GetVehicleNameList`;

export const PREMIUM_CALC_POST = `${Config.API_URL}Calculator/CalculateMotorPremium`;
export const SAVE_MOTOR_WIZA_API = `${Config.API_URL}MotorDetails/SaveMotorWizA`;
export const REFERENCE_API = `${Config.API_URL}OPWEB/GetMasterReferenceId`;
export const SAVE_WIZB_API = `${Config.API_URL}MotorDetails/SaveMotorWizB`;
export const OCCUPTION_LIST = `${Config.API_URL}MotorSetup/GetOccupationList`;
export const POLICY_MAKING_API = `${Config.API_URL}Policy/CpOnlinePolicy`;
