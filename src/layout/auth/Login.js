import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  Image,
  Text,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';

import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import inputStyle from '../../style/input';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import SocialButton from '../SocialButton';
import {isEmpty} from 'lodash';
import Logo from './Logo';
const Login = ({
  onLogin,
  onChange,
  errorMessage,
  loading,
  signUp,
  user,
  forgotPassword,
  skipLogin,
  goToRegister,
}) => {
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [loginFailedData, setLoginFailedData] = useState(null);

  const {loginFailureResp, loginResp} = useSelector(state => state.auth);

  useEffect(() => {
    if (!isEmpty(user.email)) {
      setEmailValid(false);
    }
  }, [user.email]);

  useEffect(() => {
    if (!isEmpty(user.password)) {
    }
  }, [user.password]);

  useEffect(() => {
    if (!isEmpty(loginFailureResp)) {
      setLoginFailedData(loginFailureResp);
    }
  }, [loginFailureResp]);



  useEffect(() => {
    if (!isEmpty(loginResp)) {
      navigation.navigate('Dash');
    }
  }, [loginResp]);
  return (
    <View style={containerStyle.loginContainer}>
      <ScrollView>
        <View style={{padding: 30, marginBottom: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: '#686868',
              marginBottom: 5,
              fontWeight: '600',
              alignSelf: 'center',
            }}>
            IEnsure
          </Text>
          <Logo />

          <View style={{marginTop: 30}} />
          <TextInput
            label="Email/Phone Number"
            mode="outlined"
            textAlignVertical="top"
            theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
            style={inputStyle.textInput}
            onChangeText={text => {
              setLoginFailedData(null);
              onChange(text, 'email');
            }}
            keyboardType="email-address"
            value={user.email}
            error={emailValid ? true : false}
          />

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={hidePass ? true : false}
            right={
              <TextInput.Icon
                name={hidePass ? 'eye-off' : 'eye'}
                color={'#AEAEB2'}
                onPress={() => setHidePass(!hidePass)}
              />
            }
            theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
            style={inputStyle.textInput}
            onChangeText={text => {
              onChange(text, 'password');
              setPasswordValid(false);
            }}
            value={user.password}
            error={passwordValid ? true : false}
          />
          {!isEmpty(errorMessage) ? (
            <Text style={{color: 'red', marginTop: -5, marginBottom: 10}}>
              {errorMessage}
            </Text>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 2,
              alignItems: 'center',
              marginTop: 0,
              marginBottom:20
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                tintColors={{true: '#42A5F6', false: '#C7C7CC'}}
              />
              <Text>Remember me</Text>
            </View> */}
            <TouchableOpacity onPress={forgotPassword}>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {!isEmpty(loginFailedData) && (
            <View style={{marginBottom: 10, marginLeft: 7}}>
              {/* <Text style={{color: 'red'}}>Invalid Email or Password</Text> */}
              <Text style={{color: 'red'}}> {loginFailedData?.response_description}</Text>
            
            </View>
          )}
          <View>
            <TouchableOpacity
              style={loading ? buttonStyle.loading : buttonStyle.loginchange}
              // onPress={onLogin}
              onPress={() => {
                if (isEmpty(user.email)) {
                  setEmailValid(true);
                }
                if (isEmpty(user.password)) {
                  setPasswordValid(true);
                }
                if (isEmpty(user.email) || isEmpty(user.password)) {
                  return;
                }
                onLogin();

                {
                  Keyboard.dismiss;
                }
              }}
              disabled={loading}>
              <Text style={textStyle.loginText}>Login</Text>
              <ActivityIndicator animating={loading} style={{marginLeft: 5}} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={skipLogin}
              // onPress={() => navigation.navigate('PremiumCalculatorTwo')}
            >
              <Text style={textStyle.secondaryText}>Skip Login</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <View style={{flex: 1, height: 2, backgroundColor: '#C4C4C4'}} />
            <View>
              <Text style={{width: 50, textAlign: 'center', color: '#C4C4C4'}}>
                OR
              </Text>
            </View>
            <View style={{flex: 1, height: 2, backgroundColor: '#C4C4C4'}} />
          </View>

          {Platform.OS === 'android' ? (
            <View>
              <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                //  onPress={() => fbLogin()}
                onPress={() => {
                  Alert.alert('Information', 'Sorry! Features not Enabled', [
                   
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                }}
              />

              <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {
                  Alert.alert('Information', ' Sorry! Features not Enabled', [
                   
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                }}
                //  onPress={() => googleLogin()}
              />
            </View>
          ) : null}
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: '#FAFAFA',
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
            }}>
            <Text>New to iEnsure?</Text>
            <TouchableOpacity onPress={goToRegister}>
              <Text
                style={{
                  color: '#F57722',
                }}>
                &nbsp; Register Now
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 2,
              color: 'rgba(0,0,0,0.3)',
            }}>
            Version: 1.4
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

Login.defaultProps = {
  loading: false,
  errorMessage: '',
};

Login.propTypes = {
  /** A function to pop-up the forgotten password helper */
  forgotPassword: PropTypes.func.isRequired,
  /** A function that calls the Login API to login the user. */
  onLogin: PropTypes.func.isRequired,
  skipLogin: PropTypes.func.isRequired,
  goToRegister: PropTypes.func.isRequired,

  /** A function to handle the changes of the user object. */
  onChange: PropTypes.func.isRequired,

  /** A error message from someone attempting to login. */
  errorMessage: PropTypes.string,

  /** If the page is loading show the loading modal */
  loading: PropTypes.bool,

  /** A function to redirect the user to the sign up page */
  signUp: PropTypes.func.isRequired,
};
export default Login;
