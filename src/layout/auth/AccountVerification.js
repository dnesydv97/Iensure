import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,Alert
} from 'react-native';
import propTypes from 'prop-types';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import CountDown from 'react-native-countdown-component';
import {useNavigation} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useSelector} from 'react-redux';
import { isEmpty} from 'lodash';

const CELL_COUNT = 4;

const AccountVerification = ({ onSubmit, code}) => {
  const userData = useSelector(state => state.auth);

  const {verificationLoading, unsucessVerifiedData} = useSelector(
    state => state.auth,
  );

  const navigation = useNavigation();
  const [value, setValue] = useState('');


  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [validation, setValidation] = useState(null);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  code.code = value;


 
  useEffect(() => {
    if (!isEmpty(unsucessVerifiedData)) {
      setValidation(unsucessVerifiedData);
    }
  }, [unsucessVerifiedData]);
 
 
  return (
    <SafeAreaView style={styles.root}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.push('Register')}>
          <Image
            source={require('../../assets/backarrow.png')}
            style={{height: 24, width: 24, marginTop: 2}}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Account Activation</Text>
      </View>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={num => {
          setValidation(null);
          setValue(num);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoFocus={true}
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[
              !isEmpty(validation) ? styles.cellerror : styles.cell,
              isFocused && styles.focusCell,
            ]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {!isEmpty(validation) && (
        <View>
          <Text style={{alignSelf: 'center', color: 'red', top: -10}}>
            Please Enter the correct OTP
          </Text>
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
          {userData.userEmail}
        </Text>

        <Text style={{color: '#686868', marginTop: 50, alignSelf: 'center',marginBottom:15}}>
          {' '}
          Valid Till: 5 minutes
        </Text>
         <CountDown
          until={300}
         
          timeToShow={['M', 'S']}
          timeLabels={{m: 'MM', s: 'SS'}}
         
          // onFinish={() => {
          //   Alert.alert('Information', 'Sorry! OTP request time has been finished', [
             
          //     // {text: 'cancle', onPress: () => console.log('OK Pressed')},
          //     {
          //       text: 'OK',
          //       onPress: () => {
          //        navigation.navigate('Register')
          //       },
          //     },
          //   ]);
          // }}
          
     
          
          size={20}
        />
      </View>
      <View style={{marginTop: 60}}>
        <TouchableOpacity
          style={
            value.length == 4 ? buttonStyle.loginchange : buttonStyle.loading
          }
          onPress={onSubmit}
          disabled={value.length == 4 ? verificationLoading : true}>
          {/* <TouchableOpacity style={loading? buttonStyle.loading : buttonStyle.login} onPress={onSubmit} disabled={loading}> */}

          <Text style={textStyle.loginText}>Activate</Text>
          <ActivityIndicator
            animating={verificationLoading}
            style={{top: -15}}
          />
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
  /** A function that calls the Login API to login the user. */
  onSubmit: propTypes.func.isRequired,

  /** A function to handle the changes of the user object. */
  onChange: propTypes.func.isRequired,

  /** A error message from someone attempting to login. */
  errorMessage: propTypes.string,

  /** If the page is loading show the loading modal */
  loading: propTypes.bool,
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
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'red',
    textAlign: 'center',
    borderRadius: 4,
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
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
