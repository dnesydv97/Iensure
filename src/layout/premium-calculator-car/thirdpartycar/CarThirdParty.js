
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Loader from 'react-native-modal-loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../../style/container';
import buttonStyle from '../../../style/button';
import textStyle from '../../../style/text';
import {TextInput, Provider, RadioButton,DefaultTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {PremiumCalculatorActionThirdParty,wizaAction} from '../../../redux/actions/PremiumCalculatorFormAction';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import PremiumCalculatorThirdPartyFormCar from '../../../components/PremiumCalculatorThirdPartyFormCar';
import {DetailsWizA} from '../../../redux/actions/ProposalAction';
const BikeCalculator = () => {
  const {premeCalcLoadingthirdparty,premeCalcthirdparty,token,savewizALoading,savewizA} = useSelector(state => state.PremiumCalculatorFormReducer);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const kyc = !isEmpty(user) && user[0]?.KycId;
  const id = !isEmpty(user) && user[0]?.Regd_ID;
  const [test, setTest] = useState();
  const [vehicleCategory, setvehicleCategory] = useState('');
  const [manufacturedYear, setmanufacturedYear] = useState('');
  const [animating, setAnimating] = useState(false);
  const [validcubic, setvalidCubic] = useState(false);
  const [validvehiclecategory, setValidVehicleCategory] = useState(false);
  const [validmanuyear, setValidManuYear] = useState(false);
  const [calculationModalVisible, setCalculationModalVisible] = useState(false);
  const [tokenId, setTokenId] = useState('');
  const navigation = useNavigation();
  const [payload, setPayload] = useState({
    CLASSID: '23',
   
    TYPECOVER: 'TP',
 
    CCHP: '',
   
   
  
  });
  const handleCalculationModalPress = async () => {
    // setAnimating(!animating);
    // dispatch(PremiumCalculatorAction(payload));
    // setCalculationModalVisible(true);
    let body = {
      ...payload,
      YEARMANUFACTURE: manufacturedYear,
      CATEGORYID: vehicleCategory, 
      TOKENID: tokenId.data
    };

    dispatch(PremiumCalculatorActionThirdParty(body));
  
  };

  useEffect(() => {
    if (!isEmpty(token)) {
      setTokenId(token);
    }
  }, [token]);
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
    if (!isEmpty(payload.CCHP)) {
      setvalidCubic(false);
    }
  }, [payload.CCHP]);

  useEffect(() => {
    if (!isEmpty(premeCalcthirdparty)) {
      setTest(premeCalcthirdparty);
      setCalculationModalVisible(true);
    }
  }, [premeCalcthirdparty]);

  const SaveWizAData =()=>{
    let body = {
      TOKENID: tokenId.data,
      ...payload,
      USERID: id,
      KYCID: kyc,
      YEARMANUFACTURE: manufacturedYear,
      CATEGORYID: vehicleCategory,
      STAMP: test.PremDetails.STAMP, 
      ACTUALNETPREMIUM: test.PremDetails.ACTUALNETPREMIUM,    
      TOTALVATABLEPREMIUM: test.PremDetails.VATABLEPREMIUM,
      BASICPREMIUM: test.PremDetails.BASICPREMIUM,
      DRIVERPREMIUM: test.PremDetails.DRIVERPREMIUM,
      HELPERPREMIUM: test.PremDetails.HELPERPREMIUM,
      NETPREMIUM: test.PremDetails.NETPREMIUM,
      OTHERPREMIUM: test.PremDetails.OTHERPREMIUM,
      PASSENGERPREMIUM: test.PremDetails.PASSENGERPREMIUM,
      POOLPREMIUM: test.PremDetails.POOLPREMIUM,
      THIRDPARTYPREMIUM_B: test.PremDetails.THIRDPARTYPREMIUM,
       ACTNETPREMIUM: test.PremDetails.ACTUALNETPREMIUM,
      VAT: test.PremDetails.VATAMOUNT,
      VATRATE: 13.0,
  
  
    };
    dispatch(wizaAction(body));
     
  
  
    // setCalculationModalVisible(false);
    // navigation.navigate('ThirdPartyDetails',{ThirdpartyValue:payload,Thirdpartycalc:test})
  
  }

  useEffect(() => {
    if (!isEmpty(savewizA) && savewizA?.response_message == 'SUCCESS') {
      dispatch(DetailsWizA({TOKENID: token?.data}));
      setCalculationModalVisible(false);
      !isEmpty(user)
        ? navigation.navigate('VehicleDetailsWizA')
        : navigation.navigate('Login');
    }
  }, [savewizA]);



 
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <Provider theme={theme}>
       <Loader loading={premeCalcLoadingthirdparty} color="#F57722" />
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <PremiumCalculatorThirdPartyFormCar
                payload={payload}
                setPayload={setPayload}
                vehicleType="bike"
                vehicleCategory={vehicleCategory}
                setvehicleCategory={setvehicleCategory}
                manufacturedYear={manufacturedYear}
                setmanufacturedYear={setmanufacturedYear}
                validvehiclecategory={validvehiclecategory}
                validcubic={validcubic}
                validmanuyear={validmanuyear}
               
              />
            </View>

            <View>
              <TouchableOpacity
                style={buttonStyle.login}
                onPress={() =>{
                  if (!manufacturedYear) {
                    setValidManuYear(true);
                  }
                  if (!vehicleCategory) {
                    setValidVehicleCategory(true);
                  }
                 
                  if (isEmpty(payload.CCHP)) {
                    setvalidCubic(true);
                  }
                
                  if (
                    isEmpty(payload.CCHP) ||
                
                    !vehicleCategory ||
                    !manufacturedYear 
                  
                  ) {
                    return;
                  }
                 

                
                  handleCalculationModalPress()}}
                // onPress={handleSubmit}
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
                    Private Vehicle ThirdParty Calculator
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
                        {parseFloat(test?.PremDetails?.VATABLEPREMIUM)
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
                        {parseFloat(test?.PremDetails?.VATAMOUNT)
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
                        {parseFloat(test?.PremDetails?.ACTUALNETPREMIUM)
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
                       disabled={savewizALoading}
                      >
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
