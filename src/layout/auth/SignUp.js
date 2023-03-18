import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  BackHandler,Alert
} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import {TextInput, Button, Provider, DefaultTheme} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {isEmpty} from 'lodash';
import Logo from './Logo';
const SignUp = ({onSubmit, onChange, newUser, loading}) => {
  const [showGenderDropDown, setShowGenderDropDown] = useState(false);
  const [gender, setGender] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [confirmhidePass, setConfirmHidePass] = useState(true);
  const [confirmpassword, setConfirmPassword] = useState('');
  const [fullNameValid, setFullNameValid] = useState(false);
  const [genderValid, setGenderValid] = useState(false);
  const [mobileValid, setMobileValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setpasswordConfirmValid] = useState(false);
  const [signUpResp, setSignUpResp] = useState(null);
  const navigation = useNavigation();
  const [mismatch,setMissMatch]= useState(false)
  const {newUserCreated, newUserResponse, user} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (!isEmpty(newUserResponse)) {
      setSignUpResp(newUserResponse);
    }
  }, [newUserResponse]);

  useEffect(() => {
    if (!isEmpty(signUpResp) && signUpResp.response_code == 0) {
    }
 
  }, [signUpResp]);

  useEffect(() => {
    if (!isEmpty(user)) {
      navigation.navigate('Dash');
    }
  }, [user]);

  const genderList = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];
  useEffect(() => {
    if (!isEmpty(newUser.FullName)) {
      setFullNameValid(false);
    }
  }, [newUser.FullName]);

  useEffect(() => {
    if (!isEmpty(gender)) {
      setGenderValid(false);
    }
  }, [gender]);

  useEffect(() => {
    if (!isEmpty(newUser.MobileNo)) {
      setMobileValid(false);
    }
  }, [newUser.MobileNo]);

  useEffect(() => {
    if (!isEmpty(newUser.password)) {
      setPasswordValid(false);
    }
  }, [newUser.password]);

  useEffect(() => {
    if (!isEmpty(confirmpassword)) {
      setpasswordConfirmValid(false);
    }
  }, [confirmpassword]);

  newUser.gender = gender;
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  function handleBackButtonClick() {
    

    !isEmpty(newUser.FullName) ||
    !isEmpty(newUser.MobileNo) ||
    !isEmpty(newUser.password)||
    !isEmpty(confirmpassword)
      ? 
        Alert.alert(
          'Information',
          'Are you sure you want to switch to back.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Register')
              },
            },
          ],
        )
      : navigation.navigate('Register');

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
    <Provider theme={theme}>
      <View
        style={{
          height: '100%',
          flex: 1,
          backgroundColor: '#fff',
          paddingTop: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <ScrollView>
          <View style={{padding: 30, marginBottom: 10}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#686868',
                  marginBottom: 2,
                  fontWeight: '600',
                }}>
                Register Page
              </Text>
              <Logo />
            </View>
            <View style={{marginTop: 10}} />
            <TextInput
              label="Full Name"
              mode="outlined"
              theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
              style={InputStyle.textInput}
              value={newUser.FullName}
              onChangeText={text => onChange(text, 'FullName')}
              error={fullNameValid ? true : false}
            />

            <View style={{marginBottom: 8}}>
              <DropDown
                label={'Gender'}
                mode={'outlined'}
                visible={showGenderDropDown}
                showDropDown={() => setShowGenderDropDown(true)}
                onDismiss={() => setShowGenderDropDown(false)}
                value={gender}
                setValue={setGender}
                list={genderList}
                error={genderValid ? true : false}
              />
            </View>
            <View>
              <TextInput
                label="Email"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={newUser.EmailID}
                onChangeText={text => onChange(text, 'EmailID')}
                // editable={false}
              />
              <TextInput
                label="Mobile Number"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={newUser.MobileNo}
                onChangeText={text => onChange(text, 'MobileNo')}
                keyboardType={'phone-pad'}
                maxLength={10}
                error={mobileValid ? true : false}
              />
              <TextInput
                label="New Password"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                secureTextEntry={hidePass ? true : false}
                right={
                  <TextInput.Icon
                    name={hidePass ? 'eye-off' : 'eye'}
                    color={'#AEAEB2'}
                    onPress={() => setHidePass(!hidePass)}
                  />
                }
                value={newUser.password}
                onChangeText={text =>{ onChange(text, 'password')
                setMissMatch(false)
              }}
                keyboardType={'default'}
                error={passwordValid ? true : false}
              />
              <TextInput
                label="Confirm Password"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                secureTextEntry={confirmhidePass ? true : false}
                right={
                  <TextInput.Icon
                    name={confirmhidePass ? 'eye-off' : 'eye'}
                    color={'#AEAEB2'}
                    onPress={() => setConfirmHidePass(!confirmhidePass)}
                  />
                }
                value={confirmpassword}
                onChangeText={confirmpassword =>{
                  setConfirmPassword(confirmpassword)
                  setMissMatch(false)
                }}
                keyboardType={'default'}
                error={passwordConfirmValid ? true : false}
              />
            </View>
            {!isEmpty(signUpResp) && signUpResp?.response_code == 1 && (
              <View>
                <Text>{signUpResp?.response_description}</Text>
              </View>
            )}
              <Text style={{color: 'red', top: -10}}>
            {mismatch
              ? 'Password not matched'
              : null}
          </Text>
            <View style={{marginTop: 15}}>
              <TouchableOpacity
                style={loading ? buttonStyle.loading : buttonStyle.loginchange}
                //  onPress={onSubmit}
                onPress={() => {
                  if (isEmpty(newUser.FullName)) {
                    setFullNameValid(true);
                  }
                  if (isEmpty(gender)) {
                    setGenderValid(true);
                  }
                  if (
                    isEmpty(newUser.MobileNo) ||
                    newUser.MobileNo.length < 10
                  ) {
                    setMobileValid(true);
                  }
                  if (isEmpty(newUser.password)) {
                    setPasswordValid(true);
                  }
                  if (isEmpty(confirmpassword) || isEmpty(newUser.password)) {
                    setpasswordConfirmValid(true);
                  } else if (
                    !confirmpassword.localeCompare(newUser.password) == 0
                  ) {
                    setpasswordConfirmValid(true);
                    setMissMatch(true)
                  }
                  if (
                    isEmpty(newUser.FullName) ||
                    isEmpty(gender) ||
                    isEmpty(confirmpassword) ||
                    newUser.MobileNo.length < 10 ||
                    !newUser.password ||
                    !confirmpassword.localeCompare(newUser.password) == 0
                  ) {
                    return;
                  }
                  onSubmit();
                 
                }}>
                  
                <Text style={textStyle.loginText}>Submit</Text>
                <ActivityIndicator
                  animating={loading}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};
SignUp.defaultProps = {
  loading: false,
  errorMessage: '',
};
SignUp.propTypes = {
  /** A function to pop-up the forgotten password helper */
  onSubmit: PropTypes.func.isRequired,
};

export default SignUp;
