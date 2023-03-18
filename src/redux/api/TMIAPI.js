import Config from '../../config';

export const COVER_API =`${Config.API_URL}TMICalculator/TMICoverType`;
export const PLANS_AREA_API =`${Config.API_URL}TMICalculator/GetPlanType`;
export const PACKAGE_API =`${Config.API_URL}TMICalculator/GetPackageType`;
export const TMI_CALCULATE_API =`${Config.API_URL}TMICalculator/CalculateTMIPremium`;
export const TMI_SAVE_DETAILS_API =`${Config.API_URL}TMICalculator/SaveTMIDetail`;
export const DOLLAR_EXCHANGE_API =`${Config.API_URL}NRB/GetForeignExchangeRates`;