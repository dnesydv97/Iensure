import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Checkbox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import PremiumCalculatorForm from '../../components/PremiumCalculatorForm';
import {Provider, DefaultTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';
import Loader from 'react-native-modal-loader';
import {
  PremiumCalculatorAction,
  wizaAction,
  referanceId,
} from '../../redux/actions/PremiumCalculatorFormAction';
import {useDispatch, useSelector} from 'react-redux';
import {DetailsWizA} from '../../redux/actions/ProposalAction';
import {isEmpty} from 'lodash';

const BikeCalculator = () => {
  const user = useSelector(state => state.auth.user);
  const kyc = !isEmpty(user) && user[0]?.KycId;
  const id = !isEmpty(user) && user[0]?.Regd_ID;
  const navigation = useNavigation();
  const [vehicleCategory, setvehicleCategory] = useState(null);
  const [manufacturedYear, setmanufacturedYear] = useState(null);
  const [volunteerExcess, setVolunteerExcess] = useState(null);

  const [tokenId, setTokenId] = useState('');
  const [isSelected, setSelection] = useState('');
  const [excludepool, setExcludePool] = useState('');

  const [checked, setChecked] = useState('0');
  const checkvalue = isSelected ? 1 : 0;
  const excludevalue = excludepool ? 1 : 0;

  const {premeCalc, token} = useSelector(
    state => state.PremiumCalculatorFormReducer,
  );

  const {savewizA, savewizALoading,premeCalcLoading} = useSelector(
    state => state.PremiumCalculatorFormReducer,
  );

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
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [validcubic, setvalidCubic] = useState(false);
  const [validcost, setValidCost] = useState(false);
  const [validvehiclecategory, setValidVehicleCategory] = useState(false);
  const [validmanuyear, setValidManuYear] = useState(false);
  const [validVoluntary, setValidVoluntary] = useState(false);

  const [payload, setPayload] = useState({
    CLASSID: 21,
    TYPECOVER: 'CM',
    CCHP: '',
    CARRYCAPACITY: 0,
    EXPUTILITIESAMT: '',
    PADRIVER: '500000.00',
    NOOFPASSENGER: '1',
    PAPASSENGER: '500000.00',

    PASSCAPACITY: '0',
     COD: '0',// compulsaryexcessamount
    NOOFEMPLOYEE: '0',
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
      EXCLUDE_POOL: excludevalue,

      HASAGENT: '0',
      NCDYR: checked,
      ISGOVERNMENT: checkvalue,
      DEPTID: 2,
     
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
 const detailsData =()=>{
  setDetailsModalVisible(true)
 }
  return (
    <Provider theme={theme}>
        <Loader loading={premeCalcLoading} color="#F57722" />
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <PremiumCalculatorForm
                payload={payload}
                setPayload={setPayload}
                vehicleType="bike"
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
              <TouchableOpacity onPress={detailsData}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name='information-circle-outline' size={25} style={{marginLeft:4,marginRight:3}}/>
                <Text>View the functionality of the fileds(सोधपुछ)</Text>
              </View>
              </TouchableOpacity>
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
          // animationType={'fade'}
          transparent={true}
          visible={detailsModalVisible}
          onRequestClose={() => {
            setDetailsModalVisible(!detailsModalVisible);
          }}>
          <View style={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)',  justifyContent: "center",
                alignItems: "center",}}>
            <View
              style={{
                height: '35%',
                width: '93.2%',
                // position: 'absolute',
                // bottom: 0,
              
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
                    paddingVertical: 6,
                    margin: 6,
                  }}>
                  <Text style={{fontWeight: '500', fontSize: 15}}>
                    Details Information
                  </Text>
                  <Pressable
                    onPress={() =>
                      setDetailsModalVisible(!detailsModalVisible)
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

                <View style={{padding:20}}>
                 
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>
                      Voluntary Excess
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                        
                      उल्लेखित रकम सम्म दाबी नगर्ने 
                       
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>Compulsary Excess</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                      प्रत्येक दाबीमा घटाईने  
                       
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>
                      No claim Discount
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                      दाबी नगरे बपातको छुट
                        
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>
                      RST/MD Pool
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                      हुलदङ्गा हड्ताल  समाबेश नगर्ने 
                      
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainerIcon}>
                      <Text style={textStyle.calculateModalTextIcon}>
                      Government Vehicle
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRightIcon}>
                      सरकारी सवारी  साधन 
                      
                      </Text>
                    </View>
                 
                  
                
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={calculationModalVisible}
          onRequestClose={() => {
            setCalculationModalVisible(!calculationModalVisible);
          }}>
          <View style={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <View
              style={{
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
                    Motor Vehicles Calculator
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
                        NPR{'  '}
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
                        NPR{'  '}
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
                        NPR{'  '}
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
                        NPR{'  '}
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
                        NPR{'  '}
                        {parseFloat(
                          calculateTax(totalNetPremium) + totalNetPremium,
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                      <Text style={textStyle.loginText}>
                        {' '}
                        Add More Details for Policy
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

export default BikeCalculator;
