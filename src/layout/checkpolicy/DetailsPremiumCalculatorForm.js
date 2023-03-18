import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import {isEmpty} from 'lodash';
import accordionStyle from '../../style/accordion';
import {PremiumCalculatorFormDetails} from '../../redux/actions/CheckPolicyAction';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import containerStyle from '../../style/container';
import {PremiumCalculatorAction} from '../../redux/actions/PremiumCalculatorFormAction';

const DetailsPremiumCalculatorForm = ({route}) => {
  const dispatch = useDispatch();
  const {motorinfo} = useSelector(state => state.CheckPolicyReducer);
  const {premeCalc} = useSelector(state => state.PremiumCalculatorFormReducer);

  const [loading, setLoading] = useState(true);
  const [motordata, setMotorData] = useState(true);
  const [premiumData, setPremiumData] = useState('');
  
  const [modalVisible, setModalVisible] = useState(false);

  const totalNetPremium =
    !isEmpty(premiumData) &&
    premiumData?.PremDetails?.NETPREMIUM + premiumData?.PremDetails?.STAMP;
  const calculateTax = totalNetPremium => {
    return (13 / 100) * totalNetPremium;
  };
  useEffect(() => {
    fetchMeta();
  }, []);

  const fetchMeta = async () => {
    let body = {
      DOCUMENTNO: route.params.data.data[0].DOCUMENTNO,
      DOCID: route.params.data.data[0].DOCID,
    };
    dispatch(PremiumCalculatorFormDetails(body));
  };
  useEffect(() => {
    if (!isEmpty(premeCalc)) {
      setPremiumData(premeCalc);
    }
  }, [premeCalc]);
  useEffect(() => {
    if (!isEmpty(motorinfo)) {
      setLoading(false);
      setMotorData(motorinfo);
    } else {
      setLoading(true);
    }
  }, [motorinfo]);

  const handleCalculationModalPress = async () => {
    let value = {
      CLASSID: '21',
      CATEGORYID: '1',
      TYPECOVER: 'CM',
      YEARMANUFACTURE: '2012',
      CCHP: '200',
      CARRYCAPACITY: '0',
      EXPUTILITIESAMT: '150000',
      EODAMT: 0,
      NCDYR: 1,
      NOOFPASSENGER: '1',
      compulsaryexcessamount: '500',
      EXCLUDE_POOL: 0,
      ISGOVERNMENT: '1',
      HASAGENT: '0',
    };
    dispatch(PremiumCalculatorAction(value));
    setModalVisible(true);
  };
  return (
    <View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#F57722"
            style={{marginTop: 250}}
          />
        ) : (
          <View style={{marginBottom: 100, backgroundColor: '#fff'}}>
            {!isEmpty(motordata) &&
              motordata?.data?.map((data, i) => (
                <View
                  style={{
                    padding: 15,
                    borderWidth: 0.4,
                    margin: 10,
                    borderRadius: 6,
                    elevation: 5,
                    backgroundColor: 'rgba(217, 217, 214, 0.5)',
                    borderColor: 'grey',
                  }}>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Kyc Id
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.KYCID}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Category Name
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '49%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.CATEGORYNAME}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Type Cover
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '49%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.TYPECOVER}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Occuption
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.OCCUPATION}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Mode Use
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.MODEUSE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Manufacture Company
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.MAKEVEHICLE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Model
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.MODEL}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Vehicle Name
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.NAMEOFVEHICLE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Manufacture Year
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.YEARMANUFACTURE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        CCHP
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.CCHP}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        No. Of Passanger
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.PASSCAPACITY}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Carry Capacity
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.CARRYCAPACITY}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Regd. Date
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.REGDATE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Vehicle No.
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.VEHICLENO}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Running Vehicle No.
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.RUNNINGVEHICLENO}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        EVehicle No.
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.EVEHICLENO}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Engine No.
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.ENGINENO}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Chasis No.
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.CHASISNO}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        EODAMT
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.EODAMT}
                      </Text>
                    </View>
                  </View>
                  {/* <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        NOOFPASSENGER
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.NOOFPASSENGER}
                      </Text>
                    </View>
                  </View> */}
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Vehicle Age
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.VEHICLEAGE}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        NCD Year
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.NCDYEAR}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            <View
              style={{
                marginTop: 10,
                padding: 6,
                flexDirection: 'column',
                alignSelf: 'center',
                width: '98%',
              }}>
              <TouchableOpacity
                style={buttonStyle.login}
                onPress={handleCalculationModalPress}>
                <Text style={textStyle.loginText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{height: '100%', backgroundColor: '#e0e2e559'}}>
          <View
            style={{
              backgroundColor: '#e0e2e559',
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
                  Premium Calculator
                </Text>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
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
                        !isEmpty(premiumData) &&
                          premiumData?.PremDetails?.NETPREMIUM,
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
                      {parseFloat(premiumData?.PremDetails?.STAMP)
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
                    <Text style={textStyle.calculateModalText}>VAT (13%)</Text>
                    <Text>: </Text>
                    <Text style={textStyle.calculateModalTextRight}>
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
                    //   onPress={SaveWizAData}

                    onPress={() => navigation.navigate('PaymentMethod')}>
                    <Text style={textStyle.loginText}>Renewal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DetailsPremiumCalculatorForm;
