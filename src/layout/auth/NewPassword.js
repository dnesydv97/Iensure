import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, BackHandler, Alert} from 'react-native';
import {isEmpty} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import inputStyle from '../../style/input';
import {TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getSavePassword} from '../../redux/actions/AuthAction';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import Logo from './Logo';
import { SystemMessage } from 'react-native-gifted-chat';
const ForgotPassword = ({route}) => {
  const {password} = useSelector(state => state.BranchesReducer);
  const [hidePass, setHidePass] = useState(true);
  const [confirmhidePass, setConfirmHidePass] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    Password: '',
    ConfirmPassword: '',
  });
  const [newpasswordValid, setNewPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
const [mismatch,setMissMatch]= useState(false)
  const handleSubmit = () => {
    let body = {
      Regd_ID: route?.params?.userData,
      ...payload,
    };

    // if (isEmpty(payload?.ConfirmPassword) || isEmpty(payload?.Password)) {
    //   setNewPasswordValid(true);
    //   setConfirmPasswordValid(true);
    //   return;
    // } else if (
    //   !payload?.ConfirmPassword.localeCompare(payload?.Password) == 0
    // ) {
    //   setConfirmPasswordValid(true);
    //   setMissMatch(true)
    //   return;
    // }
    if (isEmpty(payload?.Password)) {
      setNewPasswordValid(true);
    }
    if (isEmpty(payload?.ConfirmPassword) || isEmpty(payload?.Password)) {
      setConfirmPasswordValid(true);
    } else if (
      !payload?.ConfirmPassword.localeCompare(payload?.Password) == 0
    ) {
      setConfirmPasswordValid(true);
      setMissMatch(true)
    }
    if (
    
      isEmpty(payload?.ConfirmPassword) ||
     
      !payload?.Password ||
      !payload?.ConfirmPassword.localeCompare(payload?.Password) == 0
    ) {
      return;
    }

    dispatch(getSavePassword(body));
  };
  useEffect(() => {
    if (password?.response_code == 0) {
      Alert.alert('Information', 'Password has been successfully changed.', [
        {
          text: 'Okay',
          onPress: () => console.log('Okay Pressed'),
          style: 'Ok',
        },
      ]);
      navigation.navigate('Login');
    }
  }, [password]);

  useEffect(() => {
    if (!isEmpty(payload.Password)) {
      setNewPasswordValid(false);
    }
  }, [payload.Password]);
  useEffect(() => {
    if (!isEmpty(payload.ConfirmPassword)) {
      setConfirmPasswordValid(false);
    }
  }, [payload.ConfirmPassword]);

  function handleBackButtonClick() {
    navigation.navigate('NewPassword');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <View style={containerStyle.loginContainer}>
      <KeyboardAwareScrollView>
        <View style={{padding: 30, marginBottom: 10}}>
          <View style={{alignItems: 'center', marginBottom: 50}}>
            <Text
              style={{
                fontSize: 20,
                color: '#686868',
                marginBottom: 25,
                fontWeight: '600',
              }}>
              IEnsure
            </Text>
            <Logo />
          </View>
          <View>
            <View>
              <TextInput
                label="New Password"
                mode="outlined"
                textAlignVertical="top"
                style={inputStyle.textInput}
                value={payload.Password}
                onChangeText={Password =>{ setPayload({...payload, Password})
                setMissMatch(false)
              }}
                error={newpasswordValid ? true : false}
                secureTextEntry={hidePass ? true : false}
                right={
                  <TextInput.Icon
                    name={hidePass ? 'eye-off' : 'eye'}
                    color={'#AEAEB2'}
                    onPress={() => setHidePass(!hidePass)}
                  />
                }
              />
            </View>
          </View>

          <View>
            <TextInput
              label="Confirm Password"
              mode="outlined"
              textAlignVertical="top"
              style={inputStyle.textInput}
              value={payload.ConfirmPassword}
              onChangeText={ConfirmPassword =>{
                setPayload({...payload, ConfirmPassword})
                setMissMatch(false)
              }}
              error={confirmPasswordValid ? true : false}
              secureTextEntry={confirmhidePass ? true : false}
              right={
                <TextInput.Icon
                  name={confirmhidePass ? 'eye-off' : 'eye'}
                  color={'#AEAEB2'}
                  onPress={() => setConfirmHidePass(!confirmhidePass)}
                />
              }
            />
          </View>
          <Text style={{color: 'red', top: -10}}>
            {mismatch
              ? 'Password not matched'
              : null}
          </Text>

          <View>
            <TouchableOpacity
              style={buttonStyle.loginchange}
              onPress={handleSubmit}>
              <Text style={textStyle.loginText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgotPassword;
