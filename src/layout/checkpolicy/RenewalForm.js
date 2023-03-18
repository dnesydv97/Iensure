import {View, Text, TouchableOpacity, Modal, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, RadioButton, Provider} from 'react-native-paper';
import {getMotorDocument} from '../../redux/actions/CheckPolicyAction';
import {useDispatch, useSelector, connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {isEmpty} from 'lodash';
import InputStyle from '../../style/input';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import containerStyle from '../../style/container';
import {useNavigation, useNavigationState} from '@react-navigation/native';
const RenewalForm = () => {
  const {documentdata} = useSelector(state => state.CheckPolicyReducer);


  const navigation = useNavigation();
  const [calculationModalVisible, setCalculationModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    PROVINCECODE: 'BA',
    VEHICLELOTNO: '7',
    VEHICLERUNNINGNO: '2217',
    POLICYNO: 'KTM/PC/00001/071/072',
    pageNumber: 1,
    pageSize: 10,
  });
  const handleSubmit = async () => {
    let body = {
      ...payload,
    };

    dispatch(getMotorDocument(body));
    setCalculationModalVisible(true);
  
  };

  return (
    <Provider>
      <View style={{padding: 15}}>
        <View>
          <TextInput
            label="Province Code"
            mode="outlined"
            theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
            style={InputStyle.textInput}
            keyboardType="numeric"
            value={payload.PROVINCECODE}
            onChangeText={PROVINCECODE =>
              setPayload({...payload, PROVINCECODE})
            }
          />
        </View>
        <View>
          <TextInput
            label="Vehicle Lot No."
            mode="outlined"
            theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
            style={InputStyle.textInput}
            keyboardType="numeric"
            value={payload.VEHICLELOTNO}
            onChangeText={VEHICLELOTNO =>
              setPayload({...payload, VEHICLELOTNO})
            }
          />
        </View>
        <View>
          <TextInput
            label="Vehicle Running No."
            mode="outlined"
            theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
            style={InputStyle.textInput}
            keyboardType="numeric"
            value={payload.VEHICLERUNNINGNO}
            onChangeText={VEHICLERUNNINGNO =>
              setPayload({...payload, VEHICLERUNNINGNO})
            }
          />
        </View>
        <View>
          <TouchableOpacity
            style={buttonStyle.login}
            onPress={handleSubmit}
            // delayPressOut={10000}
          >
            <Text style={textStyle.loginText}>Calculate</Text>
          </TouchableOpacity>
        </View>
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
                backgroundColor: '#e0e2e559',
                height: '75%',
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
                    Renewal Calculate
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
                {!isEmpty(documentdata) &&
              documentdata?.data?.map((data, i) => (
                <View>
                  <View
                    style={{
                      padding: 20,
                      borderBottomColor: '#C7C7CC',
                      borderBottomWidth: 2,
                    }}>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>
                        Insured Name
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                      {data.INSUREDNAME}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>
                        Document No.
                      </Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                       {data.DOCUMENTNO}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>Address</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                       {data.ADDRESS}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>Mobile No.</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                       {data.MOBILENO}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>EVehicle No.</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                 {data.EVEHICLENO}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>Issued Date</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                      {data.ISSUEDDATE}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>Effective Date</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                      {data.EFFECTIVE_DATE}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>Expiry Date</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                      {data.EXPIRYDATE}
                      </Text>
                    </View>
                    <View style={containerStyle.calculateModalTextContainer}>
                      <Text style={textStyle.calculateModalTexts}>Remaining Days</Text>
                      <Text>: </Text>
                      <Text style={textStyle.calculateModalTextRights}>
                      {data.REMAININGDAYS}
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
                    
                     onPress={() => navigation.navigate('DetailsPremiumCalculatorForm',{data:documentdata})}>
                      <Text style={textStyle.loginText}>
                      
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Provider>
  );
};
export default RenewalForm;
