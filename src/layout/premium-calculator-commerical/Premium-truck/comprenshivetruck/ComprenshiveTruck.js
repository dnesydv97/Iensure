import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,ActivityIndicator
} from 'react-native';

import {useNavigation, useNavigationState} from '@react-navigation/native';
import Checkbox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../../../style/container';
import buttonStyle from '../../../../style/button';
import textStyle from '../../../../style/text';
import PremiumCalculatorFormCommercial from '../../../../components/PremiumCalculatorFormCommercial';
import { Provider,DefaultTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  PremiumCalculatorAction,
  wizaAction,
  referanceId,
} from '../../../../redux/actions/PremiumCalculatorFormAction';
import {useDispatch, useSelector} from 'react-redux';
import {DetailsWizA} from '../../../../redux/actions/ProposalAction';
import {isEmpty} from 'lodash';
import Loader from 'react-native-modal-loader';
const CarCalculator = () => {

  const user = useSelector(state => state.auth.user);
  const kyc = !isEmpty(user) && user[0]?.KycId;
  const id = !isEmpty(user) && user[0]?.Regd_ID;
  const navigation = useNavigation();
  const [vehicleCategory, setvehicleCategory] = useState('');
  const [manufacturedYear, setmanufacturedYear] = useState('');
  const [volunteerExcess, setVolunteerExcess] = useState('');


  const [tokenId, setTokenId] = useState();
  const [isSelected, setSelection] = useState('');
  const [excludepool, setExcludePool] = useState('');
  // const [hasagent, setHasAgent] = useState('');
  const [checked, setChecked] = useState('0');
  const checkvalue = isSelected ? 1 : 0;
  const excludevalue = excludepool ? 1 : 0;
  // const agentvalue = hasagent ? 1 : 0;

  const {premeCalc, token,savewizA, savewizALoading} = useSelector(
    state => state.PremiumCalculatorFormReducer,
  );
  const {premeCalcLoading} = useSelector(state => state.PremiumCalculatorFormReducer);
  useEffect(() => {
    dispatch(referanceId({}));
  }, []);

  useEffect(() => {
    if (!isEmpty(token)) {
      setTokenId(token);
    }
  }, [token]);

  const dispatch = useDispatch();
  const [test, setTest] = useState();
  const [calculationModalVisible, setCalculationModalVisible] = useState(false);
   const [validcubic, setvalidCubic] = useState(false);
  const [validcost, setValidCost] = useState(false);
  const [validvehiclecategory, setValidVehicleCategory] = useState(false);
  const [validmanuyear, setValidManuYear] = useState(false);
  const [validVoluntary, setValidVoluntary] = useState(false);
 
  const [payload, setPayload] = useState({
    CLASSID: 22,
    TYPECOVER: 'CM',
    CCHP: '',
    CARRYCAPACITY: 0,
    EXPUTILITIESAMT: '',

    NOOFPASSENGER: '',
    // POOLPREMIUM: '1',

    // PRIVATE_USE: '',
    // INCLUDE_TOWING: '',

    COD: '0',
  });
  useEffect(() => {
    if (vehicleCategory) {
      setValidVehicleCategory(false);
    }
  }, [vehicleCategory]);
  useEffect(() => {
    if (manufacturedYear) {
      setValidManuYear(false);
    }
  }, [manufacturedYear]);
  useEffect(() => {
    if (volunteerExcess) {
      setValidVoluntary(false);
    }
  }, [volunteerExcess]);
  useEffect(() => {
    if (!isEmpty(payload.CCHP)) {
      setvalidCubic(false);
    }
  }, [payload.CCHP]);
  useEffect(() => {
    if (!isEmpty(payload.EXPUTILITIESAMT)) {
      setValidCost(false);
    }
  }, [payload.EXPUTILITIESAMT]);
  const handleCalculationModalPress = async () => {
    let body = {
      ...payload,
      EXCLUDE_POOL: excludevalue,
      HASAGENT: '0',
      ISGOVERNMENT: checkvalue,
      EODAMT: volunteerExcess,
      YEARMANUFACTURE: manufacturedYear,
      CATEGORYID: vehicleCategory,
      NCDYR: checked,
    };

    dispatch(PremiumCalculatorAction(body));

  };
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   if (!loading) {
  //     setCalculationModalVisible(true);
  //   }
  // }, [loading]);

  const SaveWizAData = async () => {
 
    let body = {
      TOKENID: tokenId.data,
      ...payload,
      USERID: id,
      KYCID: kyc,
      EODAMT: volunteerExcess,
      YEARMANUFACTURE: manufacturedYear,
     

      CATEGORYID: vehicleCategory,
      STAMP: test.PremDetails.STAMP,
      ACTUALNETPREMIUM: test.PremDetails.ACTUALNETPREMIUM,

      TOTALVATABLEPREMIUM: test.PremDetails.VATABLEPREMIUM,
      ACTNETPREMIUM: test.PremDetails.ACTUALNETPREMIUM,
      VAT: test.PremDetails.VATAMOUNT,
      VATRATE: 13.0,
      BASICPREMIUM: test.PremDetails.BASICPREMIUM,
      DRIVERPREMIUM: test.PremDetails.DRIVERPREMIUM,
      HELPERPREMIUM: test.PremDetails.HELPERPREMIUM,
      PASSENGERPREMIUM: test.PremDetails.PASSENGERPREMIUM,
      POOLPREMIUM: test.PremDetails.POOLPREMIUM,
      THIRDPARTYPREMIUM_B: test.PremDetails.THIRDPARTYPREMIUM,
      OTHERPREMIUM: test.PremDetails.OTHERPREMIUM,
      NETPREMIUM: test.PremDetails.NETPREMIUM,
      VEHICLECOST: '0',
      POOLPREMIUM: test.PremDetails.POOLPREMIUM,
      UTILITIESAMT: '0',
      OTHERSI: '0',
      HASAGENT: '0',
    };
    dispatch(wizaAction(body));
   
  };

  useEffect(() => {
    if (!isEmpty(savewizA) && savewizA?.response_message == 'SUCCESS') {
      dispatch(DetailsWizA({TOKENID: token?.data}));
      setCalculationModalVisible(false);
      !isEmpty(user)
        ? navigation.navigate('VehicleDetailsWizA')
        : navigation.navigate('Login');
    }
  }, [savewizA]);

  useEffect(() => {
    if (!isEmpty(premeCalc)) {
      setTest(premeCalc);
      setCalculationModalVisible(true);
    }
  }, [premeCalc]);

 
 
  const totalNetPremium =
    !isEmpty(test) && test?.PremDetails?.NETPREMIUM + test?.PremDetails?.STAMP;
  
  const calculateTax = totalNetPremium => {
   
    return (13 / 100) * totalNetPremium;
  };
  
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <Provider theme={theme}>
      <Loader loading={premeCalcLoading} color="#F57722" />
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <PremiumCalculatorFormCommercial
                payload={payload}
                setPayload={setPayload}
                vehicleType="Commercial Vehicle"
                vehicleCategory={vehicleCategory}
                setvehicleCategory={setvehicleCategory}
                manufacturedYear={manufacturedYear}
                setmanufacturedYear={setmanufacturedYear}
                volunteerExcess={volunteerExcess}
                setVolunteerExcess={setVolunteerExcess}
                checked={checked}
                setChecked={setChecked}
                validcubic={validcubic}
                setvalidCubic={setvalidCubic}
                validcost={validcost}
                setValidCost={setValidCost}
                validvehiclecategory={validvehiclecategory}
                setValidVehicleCategory={setValidVehicleCategory}
                validmanuyear={validmanuyear}
                setValidManuYear={setValidManuYear}
                validVoluntary={validVoluntary}
                setValidVoluntary={setValidVoluntary}
              />
            </View>
            <View style={{marginBottom: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  // value={payload.EXCLUDE_POOL}
                  // onValueChange={EXCLUDE_POOL =>
                  //   setPayload({...payload, EXCLUDE_POOL})
                  // }
                  value={excludepool}
                  onValueChange={setExcludePool}
                  tintColors={{true: '#F57722', false: '#C7C7CC'}}
                />
                <Text>Exclude RST/MD Pool</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  value={isSelected}
                  onValueChange={setSelection}
                  tintColors={{true: '#F57722', false: '#C7C7CC'}}
                  disabled={false}
                />
                <Text>Is government Vehicle!</Text>
              </View>
              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  value={hasagent}
                  onValueChange={setHasAgent}
                  tintColors={{true: '#F57722', false: '#C7C7CC'}}
                />
                <Text>Has Agent</Text>
              </View> */}
            </View>
            <View>
              <TouchableOpacity
                style={buttonStyle.login}
                onPress={() => {
                  if (!manufacturedYear) {
                    setValidManuYear(true);
                  }
                  if (!vehicleCategory) {
                    setValidVehicleCategory(true);
                  }
                  if (!volunteerExcess) {
                    setValidVoluntary(true);
                  }
                  if (isEmpty(payload.CCHP)) {
                    setvalidCubic(true);
                  }
                  if (isEmpty(payload.EXPUTILITIESAMT)) {
                    setValidCost(true);
                  }
                  if (
                    isEmpty(payload.CCHP) ||
                    isEmpty(payload.EXPUTILITIESAMT) ||
                    !vehicleCategory ||
                    !manufacturedYear ||
                    !volunteerExcess
                  ) {
                    return;
                  }
                  handleCalculationModalPress();

                  {
                    Keyboard.dismiss;
                  }
                }}
                // delayPressOut={10000}
              >
                <Text style={textStyle.loginText}>Calculate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={calculationModalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setCalculationModalVisible(!calculationModalVisible);
          }}>
          <View style={{height: '100%', backgroundColor: '#e0e2e559'}}>
            <View
              style={{
                // backgroundColor: '#e0e2e559',
                height: '55%',
                width: '100%',
                position: 'absolute',
                bottom: 0,
              }}>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#fff',
                  height: '100%',
                  borderRadius: 10,
                  borderTopColor: '#C7C7CC',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C7C7CC',
                    paddingVertical: 10,
                    margin: 6,
                  }}>
                  <Text style={{fontWeight: '500', fontSize: 15}}>
                  Commerical Vehicle Calculator
                  </Text>
                  <Pressable
                    onPress={() =>
                      setCalculationModalVisible(!calculationModalVisible)
                    }>
                    <View
                      style={{
                        // backgroundColor: '#C7C7CC',
                        borderRadius: 1000,
                        padding: 5,
                      }}>
                      <Icon name="close" size={20} color="#9393AA" />
                    </View>
                  </Pressable>
                </View>

                <View>
                  <View
                    style={{
                      padding: 20,
                      borderBottomColor: '#C7C7CC',
                      borderBottomWidth: 2,
                    }}>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>
                        Net Premium
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        {/* {!isEmpty(category) && category.PremDetails.NETPREMIUM} */}
                        NPR.{' '}
                        {parseFloat(
                          !isEmpty(test) && test?.PremDetails?.NETPREMIUM,
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>Stamp</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        NPR.{' '}
                        {parseFloat(test?.PremDetails?.STAMP)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>
                        Total VATable Premium
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        NPR.{' '}
                        {parseFloat(totalNetPremium)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>
                        VAT (13%)
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        NPR.{' '}
                        {parseFloat(calculateTax(totalNetPremium))
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>Total</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        NPR.{' '}
                        {parseFloat(
                          calculateTax(totalNetPremium) + totalNetPremium,
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        {/* {parseFloat(currentLatitude).toFixed(4)}{' '} */}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      padding: 20,
                      flexDirection: 'column',
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      style={buttonStyle.login}
                      onPress={SaveWizAData}
                      disabled={savewizALoading}>
                      {/* onPress={() => navigation.navigate('PremiumCalculatorTwo')}> */}
                      <Text style={textStyle.loginText}>
                        {' '}
                        Add More Detail for Policy
                      </Text>
                      <ActivityIndicator
                        animating={savewizALoading}
                        style={{marginTop: -15}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Provider>
  );
};

export default CarCalculator;
