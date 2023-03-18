import React, {useState, useEffect} from 'react';
import {
  View,

  Text,
  TouchableOpacity,
  ActivityIndicator,

} from 'react-native';

import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import {TextInput, Button, Provider, DefaultTheme} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import Logo from './Logo';
import { useSelector} from 'react-redux';

const Register = ({
  onRegister,
  onChange,
  errorMessage,
  user,
  skipRegister,
  goToLogin,
  gotoExisting
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [userTypeId, setUserType] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const {userID, newUserLoading, registerFailResp} = useSelector(
    state => state.auth,
  );
  const [validation, setValidation] =useState(null)


  const userTypeList = [
    {
      label: 'Individual',
      value: '2',
    },
    {
      label: 'Corporate',
      value: '1',
    },
  ];
  user.userType = userTypeId;

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };


  useEffect(() => {
 
    if (!isEmpty(user.UserId)) {
      setEmailValid(false);
    }
  }, [user.UserId]);
  useEffect(() => {
 
    if (!isEmpty(registerFailResp)) {
      setValidation(registerFailResp);
    }
  }, [registerFailResp]);

  return (
    <Provider theme={theme}>
      <View style={containerStyle.RegisterContainer}>
        <View style={{padding: 30}}>
          <Text
            style={{
              fontSize: 20,
              color: '#686868',
              marginBottom: 10,
              fontWeight: '600',
              alignSelf: 'center',
            }}>
            IEnsure
          </Text>
          <Logo />
          <View style={{marginTop: 20}} />
          <TextInput
            label="Email/Phone Number"
            // multiline={true}
            mode="outlined"
            theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
            style={InputStyle.textInput}
            onChangeText={text => { 
              setValidation(null)
              onChange(text, 'UserId')}}
            keyboardType="email-address"
            value={user.UserId}
            // error={!isEmpty(registerFailResp)}
            error={emailValid?true:false}
          />
          {!isEmpty(validation) && (
            <Text style={{color:'red',marginTop:-5,marginLeft:5}}>
              {validation?.response_code == 1
                ? 'invalid user input'
                : 'Email already exists'}
            </Text>
          )}
          <View>
            <DropDown
              // label={'User Type'}
              label={'Individual'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={userTypeId}
              setValue={setUserType}
              list={userTypeList}
            />
          </View>
          <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text>
          <View style={{marginTop: 15}}>
            <TouchableOpacity
              style={
                newUserLoading ? buttonStyle.loading : buttonStyle.loginchange
              }
              onPress={() =>{
                if (isEmpty(user.UserId)) {
                  setEmailValid(true);
                  return;
                }
                onRegister()}}
              disabled={newUserLoading}>
              <Text style={textStyle.loginText}>Register</Text>
              <ActivityIndicator
                animating={newUserLoading}
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            <TouchableOpacity onPress={skipRegister}>
              <Text style={textStyle.secondaryText}>Skip Register</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <View style={{flex: 1, height: 2, backgroundColor: '#C4C4C4'}} />
            <View>
              <Text style={{width: 50, textAlign: 'center', color: '#C4C4C4'}}>
                OR
              </Text>
            </View>
            <View style={{flex: 1, height: 2, backgroundColor: '#C4C4C4'}} />
          </View>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>Already Registered?</Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text
                style={{
                  color: '#42A5F6',
                }}>
                &nbsp; Login Now
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={gotoExisting}>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>Existing Client?</Text>
           
              <Text
                style={{
                  color: '#42A5F6',
                }}>
                &nbsp; Yes
              </Text>
           
          </View>
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
};
Register.defaultProps = {
  loading: false,
  errorMessage: '',
};
Register.propTypes = {
  /** A function that calls the Login API to login the user. */
  onRegister: PropTypes.func.isRequired,
  skipRegister: PropTypes.func.isRequired,
  goToLogin: PropTypes.func.isRequired,
  gotoExisting:PropTypes.func.isRequired,
  /** A function to handle the changes of the user object. */
  onChange: PropTypes.func.isRequired,

  /** A error message from someone attempting to login. */
  errorMessage: PropTypes.string,

  /** If the page is loading show the loading modal */
  loading: PropTypes.bool,

  /** A function to redirect the user to the sign up page */
  signUp: PropTypes.func.isRequired,
};

export default Register;
