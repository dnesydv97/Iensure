import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import accordionStyle from '../../style/paypremium';
import {TextInput} from 'react-native-paper';
import InputStyle from '../../style/input';
import {isEmpty} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import crypto from 'crypto-js';
import {paypremiums} from '../../redux/actions/PayPremiumAction';
const Pay = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [paypremimumResp, setPayPremiumResp] = useState([]);
  const [disableViewDetails, setDisableViewDetails] = useState(true);
  const [reqCount, setReqCount] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {premium, premiumloading} = useSelector(
    state => state.PayPremiumReducer,
  );
  useEffect(() => {
    if (!isEmpty(premium)) {
      setPayPremiumResp(premium);
    }
  }, [premium]);

  useEffect(() => {
    if (!isEmpty(paypremimumResp) && paypremimumResp?.response_code == 0) {
      setReqCount(0);
      navigation.navigate('PayPremium', {
        paypremimumResp: paypremimumResp,
        promocode: code,
      });
    }
  }, [paypremimumResp]);

  const handleSubmit = () => {
    if (!code) {
      setError('Please insert Proforma code !');
      return;
    }
    if (!!code) {
      setError('');
      let obj = {
        request_id: code,
        u_id: 'PICL@BEEMA',
        u_pw: 'PICL@BEEMA@123!@#',

      };
    
      let key = '490ea249-c31b-4fd0-9900-b27e34bf6cf5';
      let jsonString = JSON.stringify(obj);

      let hashingkey = crypto.HmacSHA512(jsonString, key).toString();

      dispatch(paypremiums(code, hashingkey));
      setReqCount(req => req + 1);
    }
  };

  useEffect(() => {
    if (reqCount > 4) {
      setError('Requested timeout Please try again later !');

      setTimeout(() => {
        setDisableViewDetails(false);
      }, 60000);
    }
  }, [reqCount]);

  return (
    <View style={{padding: 20}}>
      <View style={{marginTop: 20}}>
        <TextInput
          label="Proforma code"
          Text="Proforma Code"
          mode="outlined"
          // theme={{colors: {primary: error?'red':'grey', underlineColor: 'red'}}}
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={InputStyle.textInput}
          keyboardType="numeric"
          value={code}
          onChangeText={code => setCode(code)}
          // autoFocus={true}
          error={error ? true : false}
        />
      </View>

      {error ? (
        <Text style={{color: 'red', marginTop: -5}}> {error}</Text>
      ) : (
        !isEmpty(paypremimumResp) &&
        paypremimumResp?.response_code == 1 && (
          <Text style={{color: 'red', marginTop: -5}}>
            {paypremimumResp?.response_message}
          </Text>
        )
      )}

      <View
        style={{
          marginTop: 100,
          alignSelf: 'flex-end',
          width: '100%',
        }}>
        <TouchableOpacity
          style={
            premiumloading || (disableViewDetails && reqCount > 4)
              ? accordionStyle.bottondis
              : accordionStyle.botton
          }
          onPress={handleSubmit}
          disabled={premiumloading || (disableViewDetails && reqCount > 4)}>
          <Text style={accordionStyle.bottontext}>View Details</Text>
          <ActivityIndicator
            animating={premiumloading}
            style={{right: 50}}
            size={22}
            color="#42A5F6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pay;
