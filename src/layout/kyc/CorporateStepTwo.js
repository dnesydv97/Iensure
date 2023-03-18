import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import {TextInput, Provider} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

const IndividualStepOne = () => {
  const [showGenderDropDown, setShowGenderDropDown] = useState(false);
  const [showMarriageDropDown, setShowMarriageDropDown] = useState(false);
  const [gender, setGender] = useState('');
  const [marriageStatus, setMarriageStatus] = useState('');
  const {kycDataByID} = useSelector(state => state.kyc);
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
            <View>
              <TextInput
                label="Work Tel. No."
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
              />
              <TextInput
                label="Mobile No."
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
              />
              <TextInput
                label="Email Address"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
              />
              <View style={InputStyle.dropdown}>
                <DropDown
                  label={'Province'}
                  mode={'outlined'}
                  visible={showGenderDropDown}
                  showDropDown={() => setShowGenderDropDown(true)}
                  onDismiss={() => setShowGenderDropDown(false)}
                  value={gender}
                  setValue={setGender}
                  list={genderList}
                />
              </View>
              <View style={InputStyle.dropdown}>
                <DropDown
                  label={'District'}
                  mode={'outlined'}
                  visible={showGenderDropDown}
                  showDropDown={() => setShowGenderDropDown(true)}
                  onDismiss={() => setShowGenderDropDown(false)}
                  value={gender}
                  setValue={setGender}
                  list={genderList}
                />
              </View>
              <View style={InputStyle.dropdown}>
                <DropDown
                  label={'Municipality/VDC'}
                  mode={'outlined'}
                  visible={showGenderDropDown}
                  showDropDown={() => setShowGenderDropDown(true)}
                  onDismiss={() => setShowGenderDropDown(false)}
                  value={gender}
                  setValue={setGender}
                  list={genderList}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
              <View style={{width: '45%'}}>
                <DropDown
                  label={'Ward No.'}
                  mode={'outlined'}
                  visible={showGenderDropDown}
                  showDropDown={() => setShowGenderDropDown(true)}
                  onDismiss={() => setShowGenderDropDown(false)}
                  value={gender}
                  setValue={setGender}
                  list={genderList}
                />
              </View>
              <View style={{width: '50%'}}>
                <DropDown
                  label={'House No.'}
                  mode={'outlined'}
                  visible={showMarriageDropDown}
                  showDropDown={() => setShowMarriageDropDown(true)}
                  onDismiss={() => setShowMarriageDropDown(false)}
                  value={marriageStatus}
                  setValue={setMarriageStatus}
                  list={marriageStatusList}
                />
              </View>
            </View>
            <View style={InputStyle.dropdown}>
              <DropDown
                label={'Area'}
                mode={'outlined'}
                visible={showGenderDropDown}
                showDropDown={() => setShowGenderDropDown(true)}
                onDismiss={() => setShowGenderDropDown(false)}
                value={gender}
                setValue={setGender}
                list={genderList}
              />
            </View>
            <View>
              <TextInput
                label="Father Name"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
              />
            </View>
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={buttonStyle.previous}>
                  <Text style={textStyle.previousText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttonStyle.next}>
                  <Text style={textStyle.loginText}>Submit</Text>
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
