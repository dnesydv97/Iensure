import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {decode, encode} from 'base-64';

import ClaimTrackingClaimStatus from './src/layout/claim-tracking/ClaimTrackingClaimStatus';
import PayPremium from './src/layout/pay-premium/PayPremium';
import PayPremiumone from './src/layout/pay-premium/PayPremiumone';
import PremiumCalculatorFormCarTwo from './src/layout/premium-calculator-car/comprehensivecar/PremiumCalculatorFormCarTwo';
import Login from './src/containers/auth/LoginScreen';
import NewPassword from './src/layout/auth/NewPassword';
import AccountVerification from './src/containers/auth/AccountVerifyScreen';
import Register from './src/containers/auth/RegisterScreen';
import Signup from './src/containers/auth/SignUpScreen';
import ExistingUser from './src/containers/auth/ExistingUserScreen';
import ForgotPassword from './src/layout/auth/ForgotPassword';
import ForgetPasswordVerification from './src/layout/auth/ForgetPasswordVerification';
import Dashboard from './src/containers/home/DashBoardScreen';
import VehicleDetails from './src/layout/premium-calculator/VehicleDetails';
import VehicleDetailsWizA from './src/layout/premium-calculator/VehicleDetailsWizA';
import PremiumCalculator from './src/layout/premium-calculator/PremiumCalculator';
import BikeCalculator from './src/layout/premium-calculator/BikeCalculator';
import TopsTabsTruck from './src/layout/premium-calculator-commerical/Premium-truck/TopsTabsTruck';

import About from './src/layout/home/setting/About';
import CheckPolicyHome from './src/layout/checkpolicy/CheckPolicyHome';
import DetailsPremiumCalculatorForm from './src/layout/checkpolicy/DetailsPremiumCalculatorForm';
import RenewalForm from './src/layout/checkpolicy/RenewalForm';
import InputCheckPolicy from './src/layout/checkpolicy/InputCheckPolicy';
import IndividualProfileSetting from './src/layout/home/setting/IndividualProfileSetting';
import PaymentDetails from './src/layout/premium-calculator/PaymentDetails';
import ClaimFeedBack from './src/layout/claim-intimation/ClaimFeedBack';
import CarCalculator from './src/layout/premium-calculator/CarCalculator';
import CommercialMotorCalculator from './src/layout/premium-calculator/CommercialMotorCalculator';
import KycIndividualStepOne from './src/containers/kyc/KycIndividualOneScreen';
import KycIndividualStepTwo from './src/containers/kyc/KycIndividualTwoScreen';
import KycIndividualStepThree from './src/containers/kyc/KycIndividualThreeScreen';
import KycIndividualStepFour from './src/containers/kyc/KycIndividualFourScreen';
import IndividualStepOne from './src/layout/kyc/IndividualStepOne';
import IndividualStepTwo from './src/layout/kyc/IndividualStepTwo';
import IndividualStepThree from './src/layout/kyc/IndividualStepThree';
import IndividualStepFour from './src/layout/kyc/IndividualStepFour';
import KycCorporateStepOne from './src/layout/kyc/CorporateStepOne';
import KycCorporateStepTwo from './src/layout/kyc/CorporateStepTwo';
import ClaimTrackingHome from './src/layout/claim-tracking/ClaimTrackingHome';
import ClaimTrackingChat from './src/layout/claim-tracking/ClaimTrackingChat';
import ClaimIntimation from './src/layout/claim-intimation/ClaimIntimation';
import ClaimIntimationList from './src/layout/claim-intimation/ClaimIntimationList';
import SplashScreen from './src/layout/splash-screen/SplashScreen';
import Launching from './src/layout/splash-screen/Launching';
import Branches from './src/layout/branches/Branches';
import OurProduct from './src/layout/our-product/OurProduct';
import NewsAndEvents from './src/layout/news&events/NewsAndEvents';
import PaymentMethod from './src/layout/premium-calculator/PaymentMethod';
import PremiumCalculatorTwo from './src/layout/premium-calculator/PremiumCalculatorTwo';
import PolicyMaking from './src/layout/premium-calculator/PolicyMaking';
import Payment from './src/layout/premium-calculator/Payment';
import TopButtonTabs from './src/layout/premium-calculator/TopButtonTabs';
import TopTapsCar from './src/layout/premium-calculator-car/TopTapsCar';
import BottomTab from './src/components/BottomTabNavigation';
import Setting from './src/containers/home/SettingScreen';
import RootReducer from './src/redux/reducers/RootReducer';
import Khalti from './src/layout/payment/Khalti';
import Esewa from './src/layout/payment/Esewa';
import ClaimDetails from './src/layout/claimapproval/ClaimDetails';
import ClaimApprovalHome from './src/layout/claimapproval/ClaimApprovalHome';
import ConnectIPS from './src/layout/payment/ConnectIPS';
import ClaimOutStanding from './src/layout/sales-and-marketing/ClaimOutStanding';
import FilterScreen from './src/layout/sales-and-marketing/FilterScreen';
import SalesDashBoard from './src/layout/sales-and-marketing/SalesDashBoard';
import NetpremiumGrossClaim from './src/layout/sales-and-marketing/NetpremiumGrossClaim';
import PortfolioSummary from './src/layout/sales-and-marketing/PortfolioSummary';
import FieldOfficerHome from './src/layout/sales-and-marketing/fieldofficer/FieldOfficerHome';
import FieldOfficerList from './src/layout/sales-and-marketing/fieldofficer/FieldOfficerList';
import ClaimPaidHome from './src/layout/sales-and-marketing/claim_paid_summary/ClaimPaidHome';
import Proposal from './src/layout/home/Proposal/Proposal';
import DetailsWizA from './src/layout/home/Proposal/DetailsWizA';
import EsewaDetails from './src/layout/premium-calculator/EsewaDetails';
import Travel from './src/layout/travel-TMI/Travel';
import TravelSecond from './src/layout/travel-TMI/TravelSecond';
import Notification from './src/components/header/Notification';
import ThirdPartyDetails from './src/layout/premium-calculator/thirdparty/ThirdPartyDetails';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Light,
} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

const Stack = createStackNavigator();

// const store = RootReducer;

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(RootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  RootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk)),
);

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
const Auth = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 3,
          borderBottomColor: '#C7C7CC',
          borderBottomWidth: 1,
        },
        headerTintColor: '#686868',
        fontWeight: '400',

        headerTitleStyle: {
          fontWeight: '400',
          alignSelf: 'center',
          marginRight: 40,
        },
      }}
      initialRouteName="Launching">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Launching"
        component={Launching}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ClaimFeedBack"
        component={ClaimFeedBack}
        options={{
          headerShown: true,
          title: 'FeedBack',
          marginLeft: 90,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: true,
          title: 'Notification',
          marginLeft: 90,
        }}
      />
      <Stack.Screen
        name="PayPremium"
        component={PayPremium}
        options={{
          headerShown: true,
          title: 'Pay Premium',
          marginLeft: 90,
        }}
      />

      <Stack.Screen
        name="Proposal"
        component={Proposal}
        options={{
          headerShown: true,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              // style={styles.custom}
              onPress={() => navigation.navigate('Dash')}
            />
          ),
          title: 'UnderWriting',
          marginLeft: 90,
        }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          headerShown: true,
          title: 'show more',
          marginLeft: 90,
        }}
      />
      <Stack.Screen
        name="Travel"
        component={Travel}
        options={{
          headerShown: true,
          title: 'Travel',
          marginLeft: 90,
        }}
      />
      <Stack.Screen
        name="TravelSecond"
        component={TravelSecond}
        options={{
          headerShown: true,
          title: 'Travel Medical Insurance',
          marginLeft: 10,
        }}
      />
      <Stack.Screen
        name="ThirdPartyDetails"
        component={ThirdPartyDetails}
        options={{
          headerShown: true,
          title: 'Third party Details',
          marginLeft: 10,
        }}
      />
      <Stack.Screen
        name="PayPremiumone"
        component={PayPremiumone}
        options={{
          headerShown: true,
          title: 'Pay Premium',
          marginLeft: 90,
        }}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        options={{
          headerShown: true,
          title: 'Transcation Details',
          marginLeft: 90,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              // style={styles.custom}
              onPress={() => navigation.navigate('Dash')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="IndividualProfileSetting"
        component={IndividualProfileSetting}
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleStyle: {
            fontWeight: '800',
            alignSelf: 'center',
            marginRight: 80,
          },
        }}
      />

      <Stack.Screen
        name="ClaimTrackingClaimStatus"
        component={ClaimTrackingClaimStatus}
        options={{
          headerShown: true,
          title: 'ClaimTrackingClaimStatus',
          marginLeft: 90,
        }}
      />
      <Stack.Screen
        name="EsewaDetails"
        component={EsewaDetails}
        options={{
          headerShown: true,
          title: 'Esewa Transcation Details',
          marginLeft: 90,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ExistingUser"
        component={ExistingUser}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountVerification"
        component={AccountVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgetPasswordVerification"
        component={ForgetPasswordVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CheckPolicyHome"
        component={CheckPolicyHome}
        options={{
          headerShown: true,
          title: 'Check Policy',
        }}
      />
      <Stack.Screen
        name="RenewalForm"
        component={RenewalForm}
        options={{
          headerShown: true,
          title: 'Renewal Form',
        }}
      />
      <Stack.Screen
        name="DetailsPremiumCalculatorForm"
        component={DetailsPremiumCalculatorForm}
        options={{
          headerShown: true,
          title: 'Details',
        }}
      />
      <Stack.Screen
        name="ClaimDetails"
        component={ClaimDetails}
        options={{
          headerShown: true,
          title: 'Details',
        }}
      />
      <Stack.Screen
        name="ClaimApprovalHome"
        component={ClaimApprovalHome}
        options={{
          headerShown: true,
          title: 'Claim Approval List',
        }}
      />
      <Stack.Screen
        name="InputCheckPolicy"
        component={InputCheckPolicy}
        options={{
          headerShown: true,
          title: 'Check Policy',
        }}
      />

      <Stack.Screen
        name="Khalti"
        component={Khalti}
        options={{
          title: 'Khalti Payment',
        }}
      />
      <Stack.Screen
        name="Esewa"
        component={Esewa}
        options={{
          title: 'Esewa Payment',
        }}
      />
      <Stack.Screen
        name="ConnectIPS"
        component={ConnectIPS}
        options={{
          title: ' ConnectIPS Payment',
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PremiumCalculator"
        component={PremiumCalculator}
        options={{
          title: 'Premium Calculator',
        }}
      />
      <Stack.Screen
        name="TopsTabsTruck"
        component={TopsTabsTruck}
        options={{
          title: 'Commerical Vehicle Calculation',
        }}
      />

      <Stack.Screen
        name="PremiumCalculatorFormCarTwo"
        component={PremiumCalculatorFormCarTwo}
        options={{
          title: ' Premium Calculator Car',
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{
          title: 'Payment Method',
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: 'Payment ',
        }}
      />
      <Stack.Screen
        name="DetailsWizA"
        component={DetailsWizA}
        options={{
          title: 'Details',
        }}
      />
      <Stack.Screen
        name="Branches"
        component={Branches}
        options={{
          title: 'Branches ',
        }}
      />
      <Stack.Screen
        name="OurProduct"
        component={OurProduct}
        options={{
          title: 'Our Product',
        }}
      />
      <Stack.Screen
        name="NewsAndEvents"
        component={NewsAndEvents}
        options={{
          title: 'News and Events ',
        }}
      />
      <Stack.Screen
        name="PremiumCalculatorTwo"
        component={PremiumCalculatorTwo}
        options={{
          title: 'Premium Calculator',
          // headerLeft: props => (
          //   <HeaderBackButton
          //     {...props}
          //     // style={styles.custom}
          //     onPress={() => navigation.navigate('TopButtonTabs')}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="TopButtonTabs"
        component={TopButtonTabs}
        options={{
          title: 'Motor Cycle Premium',
        }}
      />
      <Stack.Screen
        name="TopTapsCar"
        component={TopTapsCar}
        options={{
          title: 'Private Vehicle Calculation',
        }}
      />
      <Stack.Screen
        name="PolicyMaking"
        component={PolicyMaking}
        options={{
          title: 'Policy Making ',
          headerLeft: false,
          marginLeft: 120,
        }}
      />
      <Stack.Screen
        name="BikeCalculator"
        component={BikeCalculator}
        options={{
          title: 'Bike Calculator',
        }}
      />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{
          // headerLeft: true,
          headerShown: true,
          title: 'Vehicle Details',
        }}
      />
      <Stack.Screen
        name="VehicleDetailsWizA"
        component={VehicleDetailsWizA}
        options={{
          // headerLeft: true,
          title: 'Vehicle Details',

          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CarCalculator"
        component={CarCalculator}
        options={{
          title: 'Car Calculator',
        }}
      />
      <Stack.Screen
        name="CommercialMotorCalculator"
        component={CommercialMotorCalculator}
        options={{
          title: 'Commercial Motor Calculator',
        }}
      />
      <Stack.Screen
        name="KycIndividualStepOne"
        component={KycIndividualStepOne}
        options={{
          title: 'KYC (1/4)',
        }}
      />
      <Stack.Screen
        name="KycIndividualStepTwo"
        component={KycIndividualStepTwo}
        options={{
          title: 'KYC (2/4)',
        }}
      />
      <Stack.Screen
        name="KycIndividualStepThree"
        component={KycIndividualStepThree}
        options={{
          title: 'KYC (3/4)',
        }}
      />
      <Stack.Screen
        name="KycIndividualStepFour"
        component={KycIndividualStepFour}
        options={{
          title: 'KYC (4/4)',
        }}
      />
      <Stack.Screen
        name="KycCorporateStepOne"
        component={KycCorporateStepOne}
        options={{
          title: 'KYC (1/2)',
        }}
      />
      <Stack.Screen
        name="KycCorporateStepTwo"
        component={KycCorporateStepTwo}
        options={{
          title: 'KYC (2/2)',
        }}
      />
      <Stack.Screen
        name="IndividualStepOne"
        component={IndividualStepOne}
        options={{
          title: 'KYC (1/4)',
        }}
      />
      <Stack.Screen
        name="IndividualStepTwo"
        component={IndividualStepTwo}
        options={{
          title: 'KYC (2/4)',
        }}
      />
      <Stack.Screen
        name="IndividualStepThree"
        component={IndividualStepThree}
        options={{
          title: 'KYC (3/4)',
        }}
      />
      <Stack.Screen
        name="IndividualStepFour"
        component={IndividualStepFour}
        options={{
          title: 'KYC (4/4)',
        }}
      />
      <Stack.Screen
        name="ClaimTrackingHome"
        component={ClaimTrackingHome}
        options={{
          title: 'Claim Tracking',
        }}
      />
      <Stack.Screen
        name="ClaimTrackingChat"
        component={ClaimTrackingChat}
        options={{
          title: 'Feedback',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ClaimIntimation"
        component={ClaimIntimation}
        options={{
          title: 'Claim Intimation',
        }}
      />
      <Stack.Screen
        name="ClaimIntimationList"
        component={ClaimIntimationList}
        options={{
          title: 'Claim Intimation List',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              // style={styles.custom}
              onPress={() => navigation.navigate('Dash')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="ClaimOutStanding"
        component={ClaimOutStanding}
        options={{
          title: 'Claim Outstanding Summary',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 16,
            // alignSelf:'center',
            marginRight: 10,
          },
        }}
      />

      <Stack.Screen
        name="FieldOfficerHome"
        component={FieldOfficerHome}
        options={{
          title: ' Field Officer',
        }}
      />
      <Stack.Screen
        name="FieldOfficerList"
        component={FieldOfficerList}
        options={{
          title: ' Field Officer List',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 16,
            // alignSelf:'center',
            marginRight: 10,
          },
        }}
      />
      <Stack.Screen
        name="PortfolioSummary"
        component={PortfolioSummary}
        options={{
          headerShown: true,
          title: 'Portfolio Summary',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 16,
            // alignSelf:'center',
            marginRight: 10,
          },
        }}
      />
      <Stack.Screen
        name="ClaimPaidHome"
        component={ClaimPaidHome}
        options={{
          headerShown: true,
          title: 'Claim Paid Summary',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 16,
            // alignSelf:'center',
            marginRight: 10,
          },
        }}
      />
      <Stack.Screen
        name="NetpremiumGrossClaim"
        component={NetpremiumGrossClaim}
        options={{
          headerShown: true,
          title: 'Net premium And GrossClaim',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 16,
            // alignSelf:'center',
            marginRight: 10,
          },
        }}
      />
      <Stack.Screen
        name="SalesDashBoard"
        component={SalesDashBoard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        component={BottomTab}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: true,
          title: 'KYC Details',
        }}
      />
      <Stack.Screen
        name="Dash"
        component={BottomTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const scheme = useColorScheme();
  LogBox.ignoreLogs(['Remote debugger']);
  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? Light : DefaultTheme}>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
