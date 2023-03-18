import React, {useState, useEffect} from 'react';
import {SafeAreaView, Alert,BackHandler,} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  getVehicleList,
  getVehicleName,
  getOccuption,
  savemotorb,
} from '../../redux/actions/PremiumCalculatorTwoAction';
import {
  TextInput,
  DefaultTheme,
  Provider,
  ThemeProvider,Searchbar 
} from 'react-native-paper';
import Documents from './Documents';

import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import propTypes from 'prop-types';
import DropDown from '../../module/react-native-paper-dropdown';
import buttonStyle from '../../style/button';
import {useNavigation} from '@react-navigation/native';
import {getMakeModel} from '../../redux/actions/PremiumCalculatorTwoAction';
import containerStyle from '../../style/container';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {cloneDeep, groupBy, isEmpty} from 'lodash';

const PremiumCalculatorTwo = ({data, getVehicleList, getVehicleName}) => {
  useEffect(() => {
    fetchMetaData();
  }, []);

  const onChange = value => {
    const data1 = data.makeModel.filter(filtered => {
      return filtered.ID == value;
    });
  };
  const user = useSelector(state => state.auth.user);
  const id = !isEmpty(user) && user[0]?.Regd_ID;
  const {token} = useSelector(state => state.PremiumCalculatorFormReducer);

  const {makeModel,saveBData} = useSelector(state => state.PremiumCalculatorTwoReducer);
 
  const dispatch = useDispatch();
  const [showDropDownmanufacture, setShowDropDownManufacture] = useState(false);
  const [showDropDownmodel, setShowDropDownModel] = useState(false);
  const [showDropDownformation, setShowDropDownFormation] = useState(false);
  const [manufactureDate, setManufactureDate] = useState(null);
  const [formationData, setFormationData] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [manu, setManu] = useState([]);
  const [model, setModel] = useState([]);
  const [formation, setFormation] = useState([]);
  const [tokenId, setTokenId] = useState();
  const [dob, setDob] = useState('');
  const [validvehiclenum, setValidVehicleNum] = useState(false);
  const [validengine, setValidEngine] = useState(false);
  const [validchasis, setValidChasis] = useState(false);
  const [validmode, setValidMode] = useState(false);
  const [validmanufacture, setValidManufacture] = useState(false);
  const [validmodel, setValidModel] = useState(false);
  const [validformation, setValidFormation] = useState(false);
  const [validcubic, setvalidCubic] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  useEffect(() => {
    setTokenId(token);
  }, [token]);
  const [payload, setPayload] = useState({
    EVEHICLENO: '',
    ENGINENO: '',
    CHASISNO: '',
    MODEUSE: '',
  });



  useEffect(() => {
    if (!isEmpty(payload.EVEHICLENO)) {
      setValidVehicleNum(false);
    }
  }, [payload.EVEHICLENO]);
  useEffect(() => {
    if (!isEmpty(payload.ENGINENO)) {
      setValidEngine(false);
    }
  }, [payload.ENGINENO]);
  useEffect(() => {
    if (!isEmpty(payload.CHASISNO)) {
      setValidChasis(false);
    }
  }, [payload.CHASISNO]);
  useEffect(() => {
    if (!isEmpty(payload.MODEUSE)) {
      setValidMode(false);
    }
  }, [payload.MODEUSE]);

  useEffect(() => {
    if (manufactureDate) {
      setValidManufacture(false);
    }
  }, [manufactureDate]);
  useEffect(() => {
    if (formationData) {
      setValidFormation(false);
    }
  }, [formationData]);
  useEffect(() => {
    if (modelData) {
      setValidModel(false);
    }
  }, [modelData]);
  useEffect(() => {
    if (!isEmpty(dob)) {
      setvalidCubic(false);
    }
  }, [dob]);
  const SaveWizBData = async data => {
    if (isEmpty(payload.EVEHICLENO)) {
      setValidVehicleNum(true);
    }
    if (isEmpty(payload.ENGINENO)) {
      setValidEngine(true);
    }
    if (isEmpty(payload.CHASISNO)) {
      setValidChasis(true);
    }
    if (isEmpty(payload.MODEUSE)) {
      setValidMode(true);
    }
        
    if (!manufactureDate) {
      setValidManufacture(true);
    
    }
    if (!modelData) {
      setValidModel(true);
    
    }
    if (!formationData) {
      setValidFormation(true);
    
    }
    if (isEmpty(dob)) {
      setvalidCubic(true);
    
    }

    let body = {
      MAKEVEHICLEID: manufactureDate,
      MAKEMODELID: modelData,
      VEHICLENAMEID: formationData,
      // BUSSOCCPCODE:occuptionData,
      REGDATE: dob,
      TOKENID: tokenId.data,
      USERID: id,
      ...payload,
    };
   
    dispatch(savemotorb(body));

    if (isEmpty(dob)||isEmpty(payload.EVEHICLENO) || isEmpty(payload.ENGINENO) || isEmpty(payload.CHASISNO) || isEmpty(payload.MODEUSE)||(!manufactureDate)||(!modelData)||(!formationData)) {
      return;
    }
    navigation.navigate('VehicleDetails', {tokenKey: tokenId.data});

   
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      const getData = data;
      const manufactures = getData?.vehicleList;
      let manufactureLists = manufactures?.map((list, index) => ({
        label: list.ENGNAME,
        value: list.ID,
        // value: list.ENGNAME,
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
      // value:list.ENGNAME,
      value: list?.ID,
    }));
   
    setModel(modelLists);
  }, [makeModel]);
  const navigation = useNavigation();
  const onChange1 = value => {
    
    dispatch(getMakeModel(value));
  };

  const fetchMetaData = async () => {
    getVehicleList({
      CLASSID: 21,
    });
    getVehicleName({
      CLASSID: 21,
    });
    // getOccuption({
    //   NAMEOFVEHICLE:""
    // });
  };

  const fetchMakeModal = value => {
    dispatch(
      getMakeModel({
        MAKEVEHICLEID: value,
      }),
    );
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  function handleBackButtonClick() {
    navigation.navigate('TopButtonTabs');
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
      <ThemeProvider>
        <SafeAreaView style={containerStyle.loginContainer}>
          <KeyboardAwareScrollView>
            <View style={{padding: 15}}>
              <View styles={{margin: 10}} />
              <ScrollView>
                <TextInput
                  label="Vehicle No."
                  mode="outlined"
                  theme={{
                    colors: {primary: '#F57722', activeOutlineColor: 'red'},
                  }}
                  style={InputStyle.textInput}
                  keyboardType="numbers-and-punctuation"
                  value={payload.EVEHICLENO}
                  onChangeText={EVEHICLENO =>
                    setPayload({...payload, EVEHICLENO})
                  }
                  dense={true}
                  error={validvehiclenum ? true : false}
                />

                <TextInput
                  label="Engine No."
                  mode="outlined"
                  theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                  style={InputStyle.textInput}
                  keyboardType="numbers-and-punctuation"
                  value={payload.ENGINENO}
                  onChangeText={ENGINENO => setPayload({...payload, ENGINENO})}
                  dense={true}
                  error={validengine? true : false}
                />

                <View>
                  <TextInput
                    label="Chasis No."
                    mode="outlined"
                    theme={{
                      colors: {primary: '#F57722', underlineColor: 'red'},
                    }}
                    style={InputStyle.textInput}
                    keyboardType="numbers-and-punctuation"
                    value={payload.CHASISNO}
                    onChangeText={CHASISNO =>
                      setPayload({...payload, CHASISNO})
                    }
                    dense={true}
                    error={validchasis ? true : false}
                  />
                </View>

                <View style={InputStyle.dropdown}>
               
                  <DropDown
                   search={true}
                    searchAccessibilityLabel={true}
                    label={'Manufacture '}
                    mode={'outlined'}
                    visible={showDropDownmanufacture}
                    showDropDown={() => setShowDropDownManufacture(true)}
                    onDismiss={() => setShowDropDownManufacture(false)}
                    value={manufactureDate}
                    setValue={value => {
                      setManufactureDate(value);
                      fetchMakeModal(value);
                    }}
                    list={manu}
                    dropdownStyle={{color: '#f57722'}}
                    dropDownItemSelectedTextStyle={{color: '#F57722'}}
                    header={2}
                    theme={{
                      colors: {primary: '#F57722', underlineColor: 'red'},
                    }}
                    error={validmanufacture? true : false}
                    
                  />
                </View>
                <View
                
                  style={InputStyle.dropdown}
                  pointerEvents={manufactureDate ? undefined : 'none'}>
                  <DropDown
                   search={true}
                    label={'Model'}
                    mode={'outlined'}
                    visible={showDropDownmodel}
                    showDropDown={() => setShowDropDownModel(true)}
                    onDismiss={() => setShowDropDownModel(false)}
                    value={modelData}
                    setValue={setModelData}
                    list={model}
                    dropdownStyle={{color: '#f57722'}}
                    dropDownItemSelectedTextStyle={{color: '#F57722'}}
                    header={2}
                    theme={{
                      colors: {primary: '#F57722', underlineColor: 'red'},
                    }}
                    error={validmodel? true : false}
                  />
                </View>

                <View style={InputStyle.dropdown}>
                  <DropDown
                   search={true}
                    label={'Formation'}
                    mode={'outlined'}
                    visible={showDropDownformation}
                    showDropDown={() => setShowDropDownFormation(true)}
                    onDismiss={() => setShowDropDownFormation(false)}
                    value={formationData}
                    setValue={setFormationData}
                    list={formation}
                    dropdownStyle={{color: '#f57722'}}
                    dropDownItemSelectedTextStyle={{color: '#F57722'}}
                    header={2}
                    error={validformation? true : false}
                  />
                </View>

                <View>
                  <TextInput
                    label="Mode of use"
                    mode="outlined"
                    theme={{
                      colors: {primary: '#F57722', underlineColor: 'red'},
                    }}
                    style={InputStyle.textInput}
                    keyboardType="numbers-and-punctuation"
                    value={payload.MODEUSE}
                    onChangeText={MODEUSE => setPayload({...payload, MODEUSE})}
                    dense={true}
                    error={validmode ? true : false}
                  />
                </View>
                <View style={{marginBottom: 20}}>
                  <Documents setDob={setDob} dob={dob} validcubic={validcubic} setvalidCubic={setvalidCubic} />
                </View>

                <View
                  style={{
                    marginBottom: 50,
                  }}>
                  <TouchableOpacity
                    style={buttonStyle.login}
                    onPress={SaveWizBData}>
                    {/* {/ onPress={() => navigation.navigate('PaymentMethod')}> /} */}
                    <Text style={textStyle.loginText}>Proceed for underwritting approval</Text>
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
