// const baseURL = 'http://203.78.165.19:9078/';
import Config from '../../config';

// export const BRANCHES_API = baseURL + '/Api/General/GetBranchDetail';
 export const BRANCHES_API =  `${Config.API_URL}General/GetBranchDetail?PageNumber=1&&PageSize=10`;


