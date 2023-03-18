import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import {Provider, DefaultTheme} from 'react-native-paper';
import TravelIndividual from '../../components/TravelIndividual';
import TravelFamily from '../../components/TravelFamily';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {TmiPremium, SaveTmiDetails} from '../../redux/actions/TMIAction';
import {useDispatch, useSelector, connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {referanceId} from '../../redux/actions/PremiumCalculatorFormAction';
import PopupErrorModal from '../../components/modals/PopupError';
import Loader from 'react-native-modal-loader';
const TravelSecond = ({route}) => {
  const isFirstRender = React.useRef(true);

  const data = !isEmpty(route) && route?.params?.body;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [premium, setPremium] = useState('');
  // const [annualtrip, setAnnualTrip] = useState('');
  // const Annual = annualtrip ? 1 : 0;
  const [dateto, setDobTO] = useState('');
  const age = moment().diff(dateto, 'years');

  const {token} = useSelector(state => state.PremiumCalculatorFormReducer);

  const user = useSelector(state => state.auth.user);

  const kyc = !isEmpty(user) && user[0]?.KycId;
  const userid = !isEmpty(user) && user[0]?.Regd_ID;
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const loading = useSelector(state => state.TMIReducer.loadingUi);
  const {premiumtmi, rate,savetmi,loadingUi} = useSelector(state => state.TMIReducer);
  console.log('premiumtmi', premiumtmi);
  console.log('calculate save', savetmi);
  const [validBirthDate, setValidBirthDate] = useState(false);
  const [payload, setPayload] = useState({
    DAYS: '',
    AMOUNT: '',
    REMARK: '',
    NAME: '',
    USDRATE: '',
    PHONE: '',
    PASSPORT: '',
    REMARK: '',
    RELATION: '',
  });
  useEffect(() => {
    if (dateto) {
      setValidBirthDate(false);
    }
  }, [dateto]);
  const HandleIndividual = async () => {
   
    let value = {
      COVERTYPE: data?.COVERTYPE,
      PLAN: data?.PLAN,
      PACKAGE: data?.PACKAGE,
      Day: data?.DAYS,
      Age: age,
      // ISANNUALTRIP: Annual,

      USDRATE: rate.data[0].Buy,
      Stamp: 20,
      // ISVATABLE: data?.ISVATABLE,
      ISVATABLE: '1',
    };

    dispatch(TmiPremium(value));
  
  };

  useEffect(() => {
    if (!isEmpty(premiumtmi) && premiumtmi?.response_code == 0)
    { setFilterModalVisible(true);
    }  if (!isEmpty(premiumtmi) && premiumtmi?.response_code == 1) {
        // console.log("error message", premiumtmi?.response_message )
      setModalVisible(true)
    //   console.log(premiumtmi?.response_message) 
    //   Alert.alert('Information', premiumtmi?.response_message, [
    //    {
    //      text: 'Okay',
    //      onPress: () => console.log('Cancel Pressed'),
    //      style: 'Okay',
    //    },
    //  ]);
    } 
   
  }, [premiumtmi]);
  const handleFamily = async () => {
   
    let value = {
    
      COVERTYPE: data?.COVERTYPE,
      PLAN: data?.PLAN,
      PACKAGE: data?.PACKAGE,
      Day: data?.DAYS,
      Age: age,
      // ISANNUALTRIP: Annual,
      ISVATABLE: '1',
      Stamp: 20,
    };

    // navigation.navigate('TravelSecond', {value});
    dispatch(TmiPremium(value));
   
   
  };
  useEffect(() => {
    dispatch(referanceId({}));
  }, [referanceId]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!loading) {
      setFilterModalVisible(true);
    }
  }, [loading]);

  const totalvatPremium =
    !isEmpty(premiumtmi) && premiumtmi?.PremDetails?.PremiumInNRS + 20;

  const SaveData = async () => {
   
    // setFilterModalVisible(true);
    let valueData = {
      premiumDetail: {
        KYCID: kyc,
        USERID: userid,
        CLASSID: 62,
        DEPTID: 4,
        TOKENID: token.data,
        FLAG: 0,
        NETPREMIUM: premiumtmi.PremDetails.PremiumInNRS,

        // STAMP: premiumtmi.PremDetails.PremiumInNRS >= 100000 ? '20' : '10',
        STAMP: 20.0,
        VAT: premiumtmi.PremDetails.vatamt,
        VATRATE: 13.0,
  
        TOTALVATABLEPREMIUM: totalvatPremium,
        TOTALPREMIUM: premiumtmi.PremDetails.totalamount,
      },
      tmiList: [
        {
          COVERTYPE: data?.COVERTYPE,

          PLAN: data?.PLAN,

          PACKAGE: data?.PACKAGE,
          DOB: dateto,
          // ISANNUALTRIP: Annual,
          PLACEOFVISIT: data.PLACE,
          CONTACTNO: payload.PHONE,
          OCCUPATION: 'service',
          REMARKS: payload.REMARK,
          AGE: age,
          PASSPORTNO: payload.PASSPORT,
          DEPENDENT: 0,
          RELATION: payload.RELATION,
          DateFrom: data?.DateFrom,
          DateTo: data?.DateTo,
          PERIODOFINSURANCE: data?.DAYS,
          TOTALDOLLARPREMIUM: premiumtmi.PremDetails.premiuminUSD,
          USDRATE: rate.data[0].Buy,
          CHARGE: 0,
          TOTALRS: premiumtmi.PremDetails.PremiumInNRS,
          DAY: data?.DAYS,
          PREMIUM: premiumtmi.PremDetails.premiuminUSD,
          CURRENCY: 'USD',
        },
      ],
    };

   
    dispatch(SaveTmiDetails(valueData));

    Alert.alert('Information', 'Your data successfully saved', [
      {
        text: 'Okay',
        onPress: () => console.log('Cancel Pressed'),
        style: 'Okay',
      },
    ]);
  };
  useEffect(()=>{
    if(!isEmpty(savetmi) && savetmi?.response_code==0)
    navigation.navigate('Proposal');
  },[savetmi])

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <Provider theme={theme}>
      <Loader loading={loadingUi} color="#F57722" />
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          {data.COVERTYPE == 2 ? (
            <View style={{flex: 1}}>
              <TravelFamily
                payload={payload}
                setPayload={setPayload}
                setDobTO={setDobTO}
                dateto={dateto}
                // annualtrip={annualtrip}
                // setAnnualTrip={setAnnualTrip}
              />
              <View style={{margin: 8, padding: 10, marginTop: 100}}>
                <TouchableOpacity
                  style={buttonStyle.login}
                  onPress={() => handleFamily()}>
                  <Text style={textStyle.loginText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{padding: 15}}>
              <View>
                <TravelIndividual
                  payload={payload}
                  setPayload={setPayload}
                  premium={premium}
                  setPremium={setPremium}
                  dateto={dateto}
                  setDobTO={setDobTO}
                  // annualtrip={annualtrip}
                  // setAnnualTrip={setAnnualTrip}
                  validBirthDate={validBirthDate}
                />
              </View>

              <View>
                <TouchableOpacity
                  style={buttonStyle.login}
                  onPress={() => {
                    if (!dateto) {
                      setValidBirthDate(true);
                    }
                    if (!dateto) {
                      return;
                    }
                    HandleIndividual();
                  }}>
                  <Text style={textStyle.loginText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </KeyboardAwareScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => {
            setFilterModalVisible(!filterModalVisible);
          }}>
          <View style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0)',
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
                    // paddingHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C7C7CC',
                    paddingVertical: 8,
                    padding: 20,
                  }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                      lineHeight: 18,
                      fontStyle: 'normal',
                    }}>
                    Travel Calculator
                  </Text>
                  <Pressable
                    onPress={() => setFilterModalVisible(!filterModalVisible)}>
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
                        Premium in USD
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        ${' '}
                        {parseFloat(
                          !isEmpty(premiumtmi) &&
                            premiumtmi?.PremDetails?.premiuminUSD,
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>
                        Premium in NRS
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        {/* {!isEmpty(category) && category.PremDetails.NETPREMIUM} */}
                        NPR{' '}
                        {parseFloat(
                          !isEmpty(premiumtmi) &&
                            premiumtmi?.PremDetails?.PremiumInNRS,
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>

                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>
                        Sub Total
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        NPR{' '}
                        {parseFloat(
                          !isEmpty(premiumtmi) &&
                            premiumtmi?.PremDetails?.subtotal,
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>
                        Vat Amount
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        NPR{' '}
                        {parseFloat(
                          !isEmpty(premiumtmi) &&
                            premiumtmi?.PremDetails?.vatamt,
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                  </View>
                  <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalText}>
                        Total Amount
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRight}>
                        NPR{' '}
                        {parseFloat(
                          !isEmpty(premiumtmi) &&
                            premiumtmi?.PremDetails?.totalamount,
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
                      onPress={SaveData}>
                      <Text style={textStyle.loginText}> Proceed</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <PopupErrorModal ModalVisible={ModalVisible} setModalVisible={setModalVisible} error={premiumtmi?.response_message}/>
       
      </SafeAreaView>
    </Provider>
  );
};
export default TravelSecond;
