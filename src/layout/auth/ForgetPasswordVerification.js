import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';

import {useNavigation} from '@react-navigation/native';
import { useSelector, useDispatch} from 'react-redux';
import {getForgetOtp} from '../../redux/actions/AuthAction';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {isEmpty} from 'lodash';


const CELL_COUNT = 4;

const AccountVerification = ({ route}) => {

  const [validation, setValidation] =useState(null)
 
  const dispatch = useDispatch();
  const { saveotp} = useSelector(state => state.BranchesReducer);
 
  const {loadingResource} = useSelector(state => state.auth);


 
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [seconds, setSeconds] = React.useState(300);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleCalculationModalPress = async () => {
    let body = {
      Regd_ID: route?.params?.UserData,
      OTPCode: value,
    };

    dispatch(getForgetOtp(body));
   
  };
  useEffect(() => {
    if (!isEmpty(saveotp) && saveotp?.response_code == 0) {
      navigation.navigate('NewPassword',{userData:route?.params?.UserData});
    }
  }, [saveotp]);

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds('failed!!');
    }
  });
  useEffect(() => {
 
    if (!isEmpty(saveotp)) {
      setValidation(saveotp);
    }
  }, [saveotp]);
  return (
    <SafeAreaView style={styles.root}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.push('ForgotPassword')}>
          <Image
            source={require('../../assets/backarrow.png')}
            style={{height: 24, width: 24, marginTop: 2}}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Account validation Code </Text>
      </View>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
      

        onChangeText={(num)=>{
          setValidation(null)
          setValue(num)}}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoFocus={true}
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
             style={[styles.cell, isFocused && styles.focusCell]}
            //  style={[!isEmpty(validation)?styles.cellerror:styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {!isEmpty(validation) && (
        <View>
          {!isEmpty(validation) && validation?.response_code==1 &&
          <Text style={{alignSelf: 'center', color: 'red', top: -10}}>
            {validation?.response_message=="FAIL"?"Please Enter the correct OTP":validation?.response_message}
          </Text>}
        </View>
      )}

    
    <View style={{marginTop: 10}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          Please enter the code sent on this email
        </Text>
        <Text style={{fontSize: 14, alignSelf: 'center'}}>
          {route?.params?.userid}
        </Text>

        <Text style={{color: '#686868', marginTop: 50, alignSelf: 'center'}}>
          {' '}
          Valid Till: {seconds} sec
        </Text>
      </View>
      <View style={{marginTop: 60}}>
        {/* <TouchableOpacity style={loading? buttonStyle.loading : buttonStyle.login} onPress={onSubmit} disabled={loading}> */}
        <TouchableOpacity
         
          style={value.length==4 ? buttonStyle.loginchange : buttonStyle.loading}
          onPress={handleCalculationModalPress}
          disabled={value.length==4?false:true}>
          <Text style={textStyle.loginText}>Activate</Text>
          <ActivityIndicator animating={loadingResource} style={{marginTop: -17}} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

AccountVerification.defaultProps = {
  loading: false,
  errorMessage: '',
};
AccountVerification.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  onChange: PropTypes.func.isRequired,

  errorMessage: PropTypes.string,

  loading: PropTypes.bool,
};

export default AccountVerification;
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: '#212121',
    marginLeft: 10,
  },
  codeFieldRoot: {marginTop: 20, padding: 40},
  cellerror: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'red',
    textAlign: 'center',
    borderRadius: 4,
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: 4,
  },
  focusCell: {
    borderColor: '#000',
  },
});