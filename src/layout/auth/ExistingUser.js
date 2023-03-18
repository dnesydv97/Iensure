import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';


import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import {TextInput, Button, Provider, DefaultTheme} from 'react-native-paper';

import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import Logo from './Logo';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ExistingUser = ({
    onExistingRegister,
  onChange,
  errorMessage,
  user, 

}) => {
  const [emailValid, setEmailValid] = useState(false);
  const {newUserLoadingExist, registerFailRespexist,oldUserResp} = useSelector(state => state.auth);
  const [validation, setValidation] = useState(null);
  const navigation = useNavigation()




    useEffect(() => {

      if (!isEmpty(user.MobileNo)) {
        setEmailValid(false);
      }
    }, [user.MobileNo]);
  useEffect(() => {
    if (!isEmpty(registerFailRespexist)) {
      setValidation(registerFailRespexist);
    }
  }, [registerFailRespexist]);

  useEffect(() => {
    if(!isEmpty(oldUserResp)){

      if(oldUserResp?.response_code == 0){
        navigation.navigate('AccountVerification')
      }
    }
   
  },[oldUserResp])

  return (
    <View>
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
        <View style={{marginTop: 50}} />
        <TextInput
          label="Phone Number"
          mode="outlined"
          theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
          style={InputStyle.textInput}
          onChangeText={text => {
             setValidation(null)
            onChange(text, 'MobileNo')}}
          keyboardType="phone-pad"
            value={user?.MobileNo}

          error={emailValid ? true : false}
        />
        {!isEmpty(validation) && (
          <Text style={{color: 'red', marginTop: -5, marginLeft: 5}}>
            {validation?.response_code == 1
              ? validation?.response_description
              : null}
          </Text>
        )}

        {/* <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text> */}
        <View style={{marginTop: 15}}>
          <TouchableOpacity
            style={
              newUserLoadingExist ? buttonStyle.loading : buttonStyle.loginchange
            }
              onPress={
                () =>{
                if (isEmpty(user.MobileNo)) {
                  setEmailValid(true);
                 
                }
                if(isEmpty(user.MobileNo)){
                  return;
                }
                onExistingRegister()}
               }
            disabled={newUserLoadingExist}>
            <Text style={textStyle.loginText}>Register</Text>
            <ActivityIndicator
              animating={newUserLoadingExist}
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
ExistingUser.defaultProps = {
  loading: false,
  errorMessage: '',
};
ExistingUser.propTypes = {
  /** A function that calls the Login API to login the user. */
  onExistingRegister: PropTypes.func.isRequired,
 


  onChange: PropTypes.func.isRequired,

  errorMessage: PropTypes.string,

  loading: PropTypes.bool,

 
};

export default ExistingUser;
