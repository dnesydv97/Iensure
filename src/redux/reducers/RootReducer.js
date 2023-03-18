import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import PremiumCalculatorFormReducer from './PremiumCalculatorFormReducer';
import PremiumCalculatorTwoReducer from './PremiumCalculatorTwoReducer';
import authReducer from './AuthReducer';
import KycReducer from './KycReducer';
import MyPolicyReducer from './MyPolicyReducer';
import ClaimTrackingReducer from './ClaimTrackingReducer'
import PayPremiumReducer from './PayPremiumReducer';
import ClaimIntimationReducer from './ClaimIntimationReducer'
import SalesAndMarketingReducer from './SalesAndMarketingReducer';
import CheckPolicyReducer from './CheckPolicyReducer';
import NewEventsReducer from './NewEventsReducer'
import BranchesReducer from './BranchesReducer';
import OurProductReducer from './OurProductReducer';
import KycFormReducer from './KycFormReducer';
import ProposalReducer from './ProposalReducer'
import ClaimApprovalReducer from './ClaimApprovalReducer';
import TMIReducer from './TMIReducer'
/**
 * The main reducer that combines all the sub reducers.
 */
const initialState = {};
const middleware = [thunk];
const appReducer = combineReducers({
  auth: authReducer,
  PremiumCalculatorFormReducer: PremiumCalculatorFormReducer,
  PremiumCalculatorTwoReducer: PremiumCalculatorTwoReducer,
  kyc: KycReducer,
  MyPolicyReducer:MyPolicyReducer,
  ClaimTrackingReducer:ClaimTrackingReducer,
  PayPremiumReducer:PayPremiumReducer,
  ClaimIntimationReducer:ClaimIntimationReducer,
  SalesAndMarketingReducer:SalesAndMarketingReducer,
  CheckPolicyReducer:CheckPolicyReducer,
  NewEventsReducer:NewEventsReducer,
  BranchesReducer:BranchesReducer,
  OurProductReducer:OurProductReducer,
  KycFormReducer:KycFormReducer,
  ProposalReducer:ProposalReducer,
  ClaimApprovalReducer:ClaimApprovalReducer,
  TMIReducer:TMIReducer
 
});

const RootReducer = (state, action) => {
  return appReducer(state, action);
};
const enhancer = applyMiddleware(...middleware);
// const RootReducer = createStore(appReducer, initialState, enhancer);

export default RootReducer;






// import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';

// import PremiumCalculatorFormReducer from './PremiumCalculatorFormReducer';
// import PremiumCalculatorTwoReducer from './PremiumCalculatorTwoReducer';
// import authReducer from './AuthReducer';
// import KycReducer from './KycReducer';
// import MyPolicyReducer from './MyPolicyReducer';
// import ClaimTrackingReducer from './ClaimTrackingReducer';
// import PayPremiumReducer from './PayPremiumReducer';
// import ClaimIntimationReducer from './ClaimIntimationReducer';
// import SalesAndMarketingReducer from './SalesAndMarketingReducer';
// import CheckPolicyReducer from './CheckPolicyReducer';
// import NewEventsReducer from './NewEventsReducer';
// import BranchesReducer from './BranchesReducer';
// import OurProductReducer from './OurProductReducer';
// import KycFormReducer from './KycFormReducer';
// import ProposalReducer from './ProposalReducer';
// import ClaimApprovalReducer from './ClaimApprovalReducer';
// import TMIReducer from './TMIReducer';
// /**
//  * The main reducer that combines all the sub reducers.
//  */
// const initialState = {};
// const middleware = [thunk];
// const appReducer = combineReducers({
//   auth: authReducer,
//   PremiumCalculatorFormReducer: PremiumCalculatorFormReducer,
//   PremiumCalculatorTwoReducer: PremiumCalculatorTwoReducer,
//   kyc: KycReducer,
//   MyPolicyReducer: MyPolicyReducer,
//   ClaimTrackingReducer: ClaimTrackingReducer,
//   PayPremiumReducer: PayPremiumReducer,
//   ClaimIntimationReducer: ClaimIntimationReducer,
//   SalesAndMarketingReducer: SalesAndMarketingReducer,
//   CheckPolicyReducer: CheckPolicyReducer,
//   NewEventsReducer: NewEventsReducer,
//   BranchesReducer: BranchesReducer,
//   OurProductReducer: OurProductReducer,
//   KycFormReducer: KycFormReducer,
//   ProposalReducer: ProposalReducer,
//   ClaimApprovalReducer: ClaimApprovalReducer,
//   TMIReducer: TMIReducer,
// });
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const MainReducer = (state, action) => {
//   return appReducer(state, action);
// };
// const enhancer = composeEnhancers(applyMiddleware(...middleware));

 


//  const RootReducer = createStore(MainReducer, enhancer);

// export default RootReducer;
