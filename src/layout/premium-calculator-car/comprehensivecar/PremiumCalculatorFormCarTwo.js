import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  getVehicleList,
  getVehicleName,
  getOccuption,
} from '../../../redux/actions/PremiumCalculatorTwoAction';
import {
  TextInput,
  RadioButton,
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import textStyle from '../../../style/text';
import InputStyle from '../../../style/input';
import propTypes from 'prop-types';
import DropDown from '../../../module/react-native-paper-dropdown';
import buttonStyle from '../../../style/button';
import {useNavigation} from '@react-navigation/native';
import Documents from '../../premium-calculator/Documents';
import {getMakeModel} from '../../../redux/actions/PremiumCalculatorTwoAction';
import containerStyle from '../../../style/container';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import {cloneDeep, groupBy, isEmpty} from 'lodash';

const PremiumCalculatorTwo = ({
  data,
  getVehicleList,
  getVehicleName,
  getOccuption,
}) => {
  useEffect(() => {
    fetchMetaData();
  }, []);

  // const {categoryid} = props.route.params;
  const onChange = value => {
    const data1 = data.makeModel.filter(filtered => {
      return filtered.ID == value;
    });
  };
  const {makeModel} = useSelector(state => state.PremiumCalculatorTwoReducer);
  const dispatch = useDispatch();
  const [showDropDownmanufacture, setShowDropDownManufacture] = useState(false);
  const [showDropDownmodel, setShowDropDownModel] = useState(false);
  const [showDropDownformation, setShowDropDownFormation] = useState(false);
  const [manufactureDate, setManufactureDate] = useState('');
  const [formationData, setFormationData] = useState('');
  const [modelData, setModelData] = useState('');
  const [nightMode, setNightmode] = useState(false);
  const [manu, setManu] = useState([]);
  const [model, setModel] = useState([]);
  const [formation, setFormation] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [payload, setPayload] = useState();
  const [data1, setData1] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [getValue, setGetValue] = useState('');

  const saveValueFunction = () => {
    // Function to save the value in AsyncStorage
    if (textInputValue) {
      // To check the input not empty
      AsyncStorage.setItem('any_key_here', textInputValue);
      // Setting a data to a AsyncStorage with respect to a key
      setTextInputValue('');
      // Resetting the TextInput
      alert('Data Saved');
      // Alert to confirm
    } else {
      alert('Please fill data');
    }
  };

  const getValueFunction = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('any_key_here').then(
      value =>
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        setGetValue(value),
      // Setting the value in Text
    );
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      const getData = data;

      const manufactures = getData?.vehicleList;

      let manufactureLists = manufactures?.map((list, index) => ({
        label: list.ENGNAME,
        value: list.ID,
      }));
      setManu(manufactureLists);

      const formations = getData?.vehicleNameList;

      let formationLists = formations?.map((list, index) => ({
        label: list.ENGNAME,
        value: list?.ID,
      }));
      setFormation(formationLists);
    }
  }, [data]);

  useEffect(() => {
    const models = makeModel;

    let modelLists = models?.map((list, index) => ({
      label: list.ENGNAME,
      value: list?.ID,
    }));
    setModel(modelLists);
  }, [makeModel]);
  const navigation = useNavigation();
  const onChange1 = value => {
    dispatch(getMakeModel(value));
  };

  const handleSubmit = async () => {
    try {
      const response = payload;

      navigation.navigate('PremiumCalculatorForm', {...response.data, payload});
    } catch (error) {}
  };

  const fetchMetaData = async () => {
    getVehicleList({
      // NAMEOFVEHICLE: 'hundai',
      CLASSID: 21,
    });
    // getMakeModel({
    //   MAKEVEHICLEID: 4235
    // })
    getVehicleName({
      CLASSID: 21,
    });
    getOccuption({});
  };

  const fetchMakeModal = value => {
    dispatch(
      getMakeModel({
        MAKEVEHICLEID: value,
      }),
    );
  };

  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={containerStyle.loginContainer}>
          <KeyboardAwareScrollView>
            <View style={{padding: 15}}>
              <View styles={{margin: 10}} />
              <ScrollView>
                <TextInput
                  label="Vehicle No."
                  mode="outlined"
                  theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                  style={InputStyle.textInput}
                  keyboardType="numeric"
                  value={textInputValue}
                  onChangeText={data => setTextInputValue(data)}
                />

                <TextInput
                  label="Engine No."
                  mode="outlined"
                  theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                  style={InputStyle.textInput}
                  keyboardType="numeric"
                />

                <View>
                  <TextInput
                    label="Chasis No."
                    mode="outlined"
                    theme={{
                      colors: {primary: '#F57722', underlineColor: 'red'},
                    }}
                    style={InputStyle.textInput}
                    keyboardType="numeric"
                  />
                </View>

                <View style={InputStyle.dropdown}>
                  <DropDown
                    label={'manufacture company'}
                    mode={'outlined'}
                    visible={showDropDownmanufacture}
                    showDropDown={() => setShowDropDownManufacture(true)}
                    onDismiss={() => setShowDropDownManufacture(false)}
                    value={manufactureDate}
                    // value={data1}
                    // onChange={value => onChange1(value)}
                    setValue={value => {
                      setManufactureDate(value);
                      fetchMakeModal(value);
                    }}
                    // setValue={value => {onChange1(value)}}
                    list={manu}
                    dropdownStyle={{color: '#f57722'}}
                    dropDownItemSelectedTextStyle={{color: '#F57722'}}
                  />
                </View>

                <View style={InputStyle.dropdown}>
                  <DropDown
                    label={'model'}
                    mode={'outlined'}
                    visible={showDropDownmodel}
                    showDropDown={() => setShowDropDownModel(true)}
                    onDismiss={() => setShowDropDownModel(false)}
                    value={modelData}
                    // selectedValue={payload.CATEGORYID}
                    // onValueChange={CATEGORYID => setPayload({...payload, CATEGORYID})}
                    // setValue={value => {
                    //   setvehicleCategory(value);
                    //   setPayload({...payload, CATEGORYID: value});
                    //}}
                    setValue={setModelData}
                    list={model}
                    dropdownStyle={{color: '#f57722'}}
                    dropDownItemSelectedTextStyle={{color: '#F57722'}}
                  />
                </View>

                <View style={InputStyle.dropdown}>
                  <DropDown
                    label={'Formation'}
                    mode={'outlined'}
                    visible={showDropDownformation}
                    showDropDown={() => setShowDropDownFormation(true)}
                    onDismiss={() => setShowDropDownFormation(false)}
                    value={formationData}
                    setValue={setFormationData}
                    // selectedValue={payload.CATEGORYID}
                    // onValueChange={CATEGORYID => setPayload({...payload, CATEGORYID})}
                    // setValue={value => {
                    //   setFormation(value);
                    //   setPayload({...payload, CATEGORYID: value});
                    // }}
                    list={formation}
                    dropdownStyle={{color: '#f57722'}}
                    dropDownItemSelectedTextStyle={{color: '#F57722'}}
                  />
                </View>
                <View>
                  <TextInput
                    label="Model of use"
                    mode="outlined"
                    theme={{
                      colors: {primary: '#F57722', underlineColor: 'red'},
                    }}
                    style={InputStyle.textInput}
                    keyboardType="numeric"
                  />
                </View>

                <Documents />
                <View
                  style={{
                    marginBottom: 50,
                  }}>
                  <TouchableOpacity
                    style={buttonStyle.login}
                    //onPress={handleSubmit}
                    onPress={() => navigation.navigate('PaymentMethod')}>
                    <Text style={textStyle.loginText}>Proceed to Customer</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginBottom: 50,
                  }}>
                  <TouchableOpacity
                    style={buttonStyle.login}
                    onPress={saveValueFunction}>
                    <Text style={textStyle.loginText}>save value</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginBottom: 50,
                  }}>
                  <TouchableOpacity
                    style={buttonStyle.login}
                    onPress={getValueFunction}>
                    <Text style={textStyle.loginText}>get value</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
};

PremiumCalculatorTwo.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.PremiumCalculatorTwoReducer,
});
export default connect(mapStatesToProps, {
  getVehicleList,
  getMakeModel,
  getVehicleName,
  getOccuption,
})(PremiumCalculatorTwo);
