import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import AvatarUpload from '../../components/kyc/AvatarUpload';
import {TextInput, Provider, RadioButton} from 'react-native-paper';
import DocumentUpload from '../../components/kyc/CorporateDocumentUpload';

const IndividualStepOne = () => {
  const [showGenderDropDown, setShowGenderDropDown] = useState(false);
  const [showMarriageDropDown, setShowMarriageDropDown] = useState(false);
  const [gender, setGender] = useState('');
  const [marriageStatus, setMarriageStatus] = useState('');
  const genderList = [
    {
      label: 'Male',
      value: '1',
    },
    {
      label: 'Female',
      value: '2',
    },
    {
      label: 'Others',
      value: '3',
    },
  ];
  const marriageStatusList = [
    {
      label: 'Married',
      value: 'married',
    },
    {
      label: 'Unmarried',
      value: 'unmarried',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];
  return (
    <Provider>
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 50,
              }}>
              <AvatarUpload />
            </View>
            <View>
              <TextInput
                label="Company Name"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
              />
              <TextInput
                label="Company Regd No."
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
              />
              <TextInput
                label="PAN/VAT No."
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
              />
              <DocumentUpload />
            </View>
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={buttonStyle.next}>
                  <Text style={textStyle.loginText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default IndividualStepOne;
