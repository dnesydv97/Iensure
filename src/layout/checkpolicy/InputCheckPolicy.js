import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import accordionStyle from '../../style/paypremium';
import {TextInput} from 'react-native-paper';
import InputStyle from '../../style/input';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

import {getCheckPolicyDetails} from '../../redux/actions/CheckPolicyAction';

const CheckPolicy = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [checkPolicyData, setCheckPolicyData] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {checkpolicydetails, checkPolicyDetailsLoading} = useSelector(
    state => state.CheckPolicyReducer,
  );

  useEffect(() => {
    if (!isEmpty(checkpolicydetails)) {
      setCheckPolicyData(checkpolicydetails);
    }
  }, [checkpolicydetails]);

  useEffect(() => {
    if (!isEmpty(checkPolicyData) && checkPolicyData?.response_code == 0) {
      navigation.navigate('CheckPolicyHome', {
        checkPolicyData: checkPolicyData,
      });
    }
  }, [checkPolicyData]);

  const handleSubmit = () => {
    if (!code) {
      setError('Please insert policy number !');
      return;
    }
    if (!!code) {
      setError('');
      dispatch(
        getCheckPolicyDetails({
          policyNo: code,
        }),
      );
    }
  };

 

  return (
    <View style={{padding: 20}}>
      <View style={{marginTop: 20}}>
        <TextInput
          label="Policy Number"
          Text="Policy Number"
          mode="outlined"
          // theme={{colors: {primary: error?'red':'grey', underlineColor: 'red'}}}
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={InputStyle.textInput}
          keyboardType="default"
          value={code}
          onChangeText={code => setCode(code)}
          // autoFocus={true}
          error={error ? true : false}
        />
      </View>

      {error ? (
        <Text style={{color: 'red', marginTop: -5}}> {error}</Text>
      ) : (
        !isEmpty(checkPolicyData) &&
        checkPolicyData?.response_code == 1 && (
          <Text style={{color: 'red', marginTop: -5}}>
            {checkPolicyData?.response_description}
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
            checkPolicyDetailsLoading
              ? accordionStyle.bottondis
              : accordionStyle.botton
          }
          onPress={handleSubmit}
          disabled={checkPolicyDetailsLoading}>
          <Text style={accordionStyle.bottontext}>View Details</Text>
          <ActivityIndicator
            animating={checkPolicyDetailsLoading}
            style={{right: 50}}
            size={22}
            color="#42A5F6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// KTM/MC/F/00005/079/080

export default CheckPolicy;
