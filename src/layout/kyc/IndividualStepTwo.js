import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import {TextInput, Provider, DefaultTheme} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {useNavigation} from '@react-navigation/native';
import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import {isEmpty} from 'lodash';
import { saveDataKyc } from '../../redux/actions/KycActions';
import {
  getProvince,
  data,
  getdistrict,
  getmuncipality,
} from '../../redux/actions/KycActions';
const individualStepTwo = ({
  getProvince,
  data,
  getdistrict,
  getmuncipality,
  route,
}) => {
  const {kycDataByID} = useSelector(state => state.kyc);
  const user = useSelector(state => state.auth.user);
  const {kycData,kycOne} = useSelector(state => state.KycFormReducer);

 console.log("kycDataByID",kycDataByID)
 
  const autoselectGmail = user[0]?.EmailID;
  const autoselectMobile = user[0]?.MobileNo;
  const [showProvinceDropDown, setShowProvinceDropDown] = useState(false);
  const [showDistrictDropDown, setShowDistrictDropDown] = useState(false);
  const [showMunicipalityDropDown, setShowMunicipalityDropDown] =
    useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [Municipality, setMuncipality] = useState([]);
  const [provincedata, setProvinceData] = useState('');

  const [districtdata, setDistrictData] = useState('');
  const [muncipalitydata, setMuncipalityData] = useState('');
  const [value, setValue] = useState();

  const [mobileValid, setMobileValid] = useState(false);
  const [provinceValid, setProvinceValid] = useState(false);
  const [districtValid, setDistrictValid] = useState(false);
  const [muncipalityValid, setMuncipalityValid] = useState(false);
  const [wardValid, setWardValid] = useState(false);
  const [housenoValid, setHouseNoValid] = useState(false);
  const [areaValid, setAreaValid] = useState(false);

  // const IndividualStepOnedata = !isEmpty(route) && route?.params?.paramKey;

  useEffect(() => {
    if (!isEmpty(kycData?.kycTwo)) {
      setPayload({
        TELEPHONENO: kycData?.kycTwo?.TELEPHONENO,
        MOBILENO: kycData?.kycTwo?.MOBILENO,
        EMAIL:  kycData?.kycTwo?.EMAIL,
        WARDNO: kycData?.kycTwo?.WARDNO,
        HOUSENO: kycData?.kycTwo?.HOUSENO,
        ADDRESS: kycData?.kycTwo?.ADDRESS,
      })
      setProvinceData(kycData?.kycTwo?.PROVINCEID);
      setDistrictData(kycData?.kycTwo?.DISTRICTID);
      setMuncipalityData(kycData?.kycTwo?.MUNICIPALITYCODE
        );
    }
  }, [kycData?.kycTwo]);
  
  useEffect(() => {
    if (!isEmpty(data)) {
      setValue(data);
    }
  }, [data]);

  useEffect(() => {
    fetchMetaData();
  }, []);
  const fetchMetaData = async () => {
    getProvince({});
  };

  useEffect(() => {
    fetchDistrictData(provincedata);
  }, [provincedata]);
  const fetchDistrictData = async provincedata => {
    getdistrict({provinceID: provincedata});
  };

  useEffect(() => {
    fetchMunciData(districtdata);
  }, [districtdata]);
  const fetchMunciData = async districtdata => {
    getmuncipality({
      MNUVDCID: '0', // note 0 means municipality and 1 means Vdc Send as default
      DistrictID: districtdata,
    });
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      const getData = data;

      const newDatas = getData?.province;

      let provinceLists = newDatas?.data?.map((list, index) => ({
        label: list?.EPROVINCE,
        value: list?.PROVINCECODE,
      }));
      setProvinces(provinceLists);

      const dist = getData?.district;

      let disLists = dist?.data?.map((list, index) => ({
        label: list?.EDESCRIPTION,
        value: list?.ID,
      }));
      setDistrict(disLists);

      const mundata = getData?.mnu;

      let mnuLists = mundata?.data?.map((list, index) => ({
        label: list?.MNU,
        value: list?.MNUCODE,
      }));
      setMuncipality(mnuLists);
    }
  }, [data]);
  const [payload, setPayload] = useState({
    TELEPHONENO: '',
    MOBILENO: '',
    EMAIL: autoselectGmail,
    WARDNO: '',
    HOUSENO: '',
    ADDRESS: '',
  });
  useEffect(() => {
    if (!isEmpty(kycDataByID)) {
      setPayload({
        TELEPHONENO: kycDataByID?.kycInformation?.HOMETELNO,
        MOBILENO: kycDataByID?.kycInformation?.MOBILENO||autoselectMobile,
        EMAIL: kycDataByID?.kycInformation?.EMAIL,
        WARDNO: kycDataByID?.kycInformation?.WARDNO,
        HOUSENO: kycDataByID?.kycInformation?.HOUSENO,
        ADDRESS: kycDataByID?.kycInformation?.ADDRESS,
      });

      setProvinceData(kycDataByID?.kycInformation?.PROVINCECODE);
      setDistrictData(kycDataByID?.kycInformation?.DISTRICTID);
      setMuncipalityData(kycDataByID?.kycInformation?.MNUCODE);
    } else {
    }
  }, [kycDataByID]);
  useEffect(() => {
    
    setPayload({MOBILENO:autoselectMobile});
  
}, [autoselectMobile]);
  const handleSubmit = async () => {
    let bodyTwo = {
      ...payload,
      PROVINCEID: provincedata,
      DISTRICTID: districtdata,
      MUNICIPALITYCODE: muncipalitydata,
    };


    if (!payload.MOBILENO) {
      setMobileValid(true);
    }
    if (!provincedata) {
      setProvinceValid(true);
    }
    if (!districtdata) {
      setDistrictValid(true);
    }
    if (!muncipalitydata) {
      setMuncipalityValid(true);
    }
    if (!payload.WARDNO) {
      setWardValid(true);
    }
    if (!payload.HOUSENO) {
      setHouseNoValid(true);
    }
    if (!payload.ADDRESS) {
      setAreaValid(true);
    }
    if (
      !payload.MOBILENO ||
      !provincedata ||
      !districtdata ||
      !muncipalitydata ||
      !payload.WARDNO ||
      !payload.HOUSENO ||
      !payload.ADDRESS
    ) {
      return;
    }
    dispatch(saveDataKyc(bodyTwo,2))
    navigation.navigate('IndividualStepThree');
  };

const  handleSubmitPrevious =()=>{
  let bodyTwo = {
    ...payload,
    PROVINCEID: provincedata,
    DISTRICTID: districtdata,
    MUNICIPALITYCODE: muncipalitydata,
  };
  dispatch(saveDataKyc(bodyTwo,2))
  navigation.navigate('KycIndividualStepOne')
}
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  useEffect(() => {
    if (!isEmpty(payload?.MOBILENO)) {
      setMobileValid(false);
    }
  }, [payload?.MOBILENO]);

  useEffect(() => {
    if (provincedata) {
      setProvinceValid(false);
    }
  }, [provincedata]);

  useEffect(() => {
    if (districtdata) {
      setDistrictValid(false);
    }
  }, [districtdata]);
  useEffect(() => {
    if (muncipalitydata) {
      setMuncipalityValid(false);
    }
  }, [muncipalitydata]);

  useEffect(() => {
    if (!isEmpty(payload?.WARDNO)) {
      setWardValid(false);
    }
  }, [payload?.WARDNO]);
  useEffect(() => {
    if (!isEmpty(payload?.HOUSENO)) {
      setHouseNoValid(false);
    }
  }, [payload?.HOUSENO]);
  useEffect(() => {
    if (!isEmpty(payload?.ADDRESS)) {
      setAreaValid(false);
    }
  }, [payload?.ADDRESS]);

  return (
    <Provider theme={theme}>
      
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <TextInput
                label="Home Tel. No."
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.TELEPHONENO}
                keyboardType="numeric"
                onChangeText={TELEPHONENO =>
                  setPayload({...payload, TELEPHONENO})
                }
              />
              <TextInput
                label="Mobile No. *"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.MOBILENO}
                keyboardType="phone-pad"
                onChangeText={MOBILENO => setPayload({...payload, MOBILENO})}
                maxLength={10}
                error={mobileValid ? true : false}
              />
              <TextInput
                label="Email Address *"
                mode="outlined"
                editable={false}
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.EMAIL}
                keyboardType="email-address"
                onChangeText={EMAIL => setPayload({...payload, EMAIL})}
              />
              <View style={InputStyle.dropdown}>
                <DropDown
                  label={'Province *'}
                  mode={'outlined'}
                  visible={showProvinceDropDown}
                  showDropDown={() => setShowProvinceDropDown(true)}
                  onDismiss={() => setShowProvinceDropDown(false)}
                  value={provincedata}
                  setValue={value => {
                    setProvinceData(value);
                  }}
                  list={provinces}
                  header={2}
                  error={provinceValid ? true : false}
                />
              </View>
              <View style={InputStyle.dropdown}>
                <DropDown
                  label={'District *'}
                  mode={'outlined'}
                  visible={showDistrictDropDown}
                  showDropDown={() => setShowDistrictDropDown(true)}
                  onDismiss={() => setShowDistrictDropDown(false)}
                  value={districtdata}
                  setValue={value => {
                    setDistrictData(value);
                  }}
                  list={district}
                  header={2}
                  error={districtValid ? true : false}
                />
              </View>
              <View style={InputStyle.dropdown}>
                <DropDown
                  label={'Municipality/VDC *'}
                  mode={'outlined'}
                  visible={showMunicipalityDropDown}
                  showDropDown={() => setShowMunicipalityDropDown(true)}
                  onDismiss={() => setShowMunicipalityDropDown(false)}
                  value={muncipalitydata}
                  setValue={value => {
                    setMuncipalityData(value);
                  }}
                  list={Municipality}
                  header={2}
                  error={muncipalityValid ? true : false}
                />
              </View>
            </View>
            <View
              style={
                (InputStyle.dropdown,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                })
              }>
              <View style={{width: '45%'}}>
                <TextInput
                  label="Ward No. *"
                  mode="outlined"
                  theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                  style={InputStyle.textInput}
                  keyboardType="numeric"
                  maxLength={2}
                  value={payload?.WARDNO}
                  onChangeText={WARDNO => setPayload({...payload, WARDNO})}
                  error={wardValid ? true : false}
                />
              </View>
              <View style={{width: '50%'}}>
                <TextInput
                  label="House No."
                  mode="outlined"
                  theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                  style={InputStyle.textInput}
                  keyboardType="default"
                  value={payload?.HOUSENO}
                  onChangeText={HOUSENO => setPayload({...payload, HOUSENO})}
                  error={housenoValid ? true : false}
                />
              </View>
            </View>
            <View style={InputStyle.dropdown}>
              <TextInput
                label="Address*"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                keyboardType="ascii-capable"
                value={payload?.ADDRESS}
                onChangeText={ADDRESS => setPayload({...payload, ADDRESS})}
                error={areaValid ? true : false}
              />
            </View>

            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={buttonStyle.previous}
                  // onPress={() => navigation.navigate('KycIndividualStepOne')}>
                  onPress={handleSubmitPrevious}>
                  <Text style={textStyle.previousText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonStyle.next}
                  onPress={handleSubmit}>
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

individualStepTwo.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.KycFormReducer,
});
export default connect(mapStatesToProps, {
  getProvince,
  data,
  getdistrict,
  getmuncipality,
})(individualStepTwo);




























// import React, {useState, useEffect} from 'react';
// import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import containerStyle from '../../style/container';
// import buttonStyle from '../../style/button';
// import textStyle from '../../style/text';
// import InputStyle from '../../style/input';
// import {TextInput, Provider, DefaultTheme} from 'react-native-paper';
// import DropDown from 'react-native-paper-dropdown';
// import {useNavigation} from '@react-navigation/native';
// import {connect, useDispatch, useSelector} from 'react-redux';
// import propTypes from 'prop-types';
// import {isEmpty} from 'lodash';
// import { saveDataKyc } from '../../redux/actions/KycActions';
// import {
//   getProvince,
//   data,
//   getdistrict,
//   getmuncipality,
// } from '../../redux/actions/KycActions';
// const individualStepOne = ({
//   getProvince,
//   data,
//   getdistrict,
//   getmuncipality,
//   route,
// }) => {
//   const {kycDataByID} = useSelector(state => state.kyc);
//   const user = useSelector(state => state.auth.user);
//   const {kycData,kycOne} = useSelector(state => state.KycFormReducer);

// console.log("kycone",kycData)
 
//   const autoselectGmail = user[0]?.EmailID;
//   const autoselectMobile = user[0]?.MobileNo;
//   const [showProvinceDropDown, setShowProvinceDropDown] = useState(false);
//   const [showDistrictDropDown, setShowDistrictDropDown] = useState(false);
//   const [showMunicipalityDropDown, setShowMunicipalityDropDown] =
//     useState(false);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [provinces, setProvinces] = useState([]);
//   const [district, setDistrict] = useState([]);
//   const [Municipality, setMuncipality] = useState([]);
//   const [provincedata, setProvinceData] = useState('');

//   const [districtdata, setDistrictData] = useState('');
//   const [muncipalitydata, setMuncipalityData] = useState('');
//   const [value, setValue] = useState();

//   const [mobileValid, setMobileValid] = useState(false);
//   const [provinceValid, setProvinceValid] = useState(false);
//   const [districtValid, setDistrictValid] = useState(false);
//   const [muncipalityValid, setMuncipalityValid] = useState(false);
//   const [wardValid, setWardValid] = useState(false);
//   const [housenoValid, setHouseNoValid] = useState(false);
//   const [areaValid, setAreaValid] = useState(false);

//   const IndividualStepOnedata = !isEmpty(route) && route?.params?.paramKey;

//   useEffect(() => {
//     if (!isEmpty(kycData?.kycTwo)) {
//       setPayload({
//         TELEPHONENO: kycData?.kycTwo?.TELEPHONENO,
//         MOBILENO: kycData?.kycTwo?.MOBILENO,
//         EMAIL:  kycData?.kycTwo?.EMAIL,
//         WARDNO: kycData?.kycTwo?.WARDNO,
//         HOUSENO: kycData?.kycTwo?.HOUSENO,
//         ADDRESS: kycData?.kycTwo?.ADDRESS,
//       })
//       setProvinceData(kycData?.kycTwo?.PROVINCEID);
//       setDistrictData(kycData?.kycTwo?.DISTRICTID);
//       setMuncipalityData(kycData?.kycTwo?.MUNICIPALITYCODE
//         );
//     }
//   }, [kycData?.kycTwo]);
//   useEffect(() => {
//     if (!isEmpty(data)) {
//       setValue(data);
//     }
//   }, [data]);

//   useEffect(() => {
//     fetchMetaData();
//   }, []);
//   const fetchMetaData = async () => {
//     getProvince({});
//   };

//   useEffect(() => {
//     fetchDistrictData(provincedata);
//   }, [provincedata]);
//   const fetchDistrictData = async provincedata => {
//     getdistrict({provinceID: provincedata});
//   };

//   useEffect(() => {
//     fetchMunciData(districtdata);
//   }, [districtdata]);
//   const fetchMunciData = async districtdata => {
//     getmuncipality({
//       MNUVDCID: '0', // note 0 means municipality and 1 means Vdc Send as default
//       DistrictID: districtdata,
//     });
//   };

//   useEffect(() => {
//     if (!isEmpty(data)) {
//       const getData = data;

//       const newDatas = getData?.province;

//       let provinceLists = newDatas?.data?.map((list, index) => ({
//         label: list?.EPROVINCE,
//         value: list?.PROVINCECODE,
//       }));
//       setProvinces(provinceLists);

//       const dist = getData?.district;

//       let disLists = dist?.data?.map((list, index) => ({
//         label: list?.EDESCRIPTION,
//         value: list?.ID,
//       }));
//       setDistrict(disLists);

//       const mundata = getData?.mnu;

//       let mnuLists = mundata?.data?.map((list, index) => ({
//         label: list?.MNU,
//         value: list?.MNUCODE,
//       }));
//       setMuncipality(mnuLists);
//     }
//   }, [data]);
//   const [payload, setPayload] = useState({
//     TELEPHONENO: '',
//     MOBILENO: autoselectMobile,
//     EMAIL: autoselectGmail,
//     WARDNO: '',
//     HOUSENO: '',
//     ADDRESS: '',
//   });
//   useEffect(() => {
//     if (!isEmpty(kycDataByID)) {
//       setPayload({
//         TELEPHONENO: kycDataByID?.kycInformation?.HOMETELNO,
//         MOBILENO: kycDataByID?.kycInformation?.MOBILENO,
//         EMAIL: kycDataByID?.kycInformation?.EMAIL,
//         WARDNO: kycDataByID?.kycInformation?.WARDNO,
//         HOUSENO: kycDataByID?.kycInformation?.HOUSENO,
//         ADDRESS: kycDataByID?.kycInformation?.ADDRESS,
//       });

//       setProvinceData(kycDataByID?.kycInformation?.PROVINCECODE);
//       setDistrictData(kycDataByID?.kycInformation?.DISTRICTID);
//       setMuncipalityData(kycDataByID?.kycInformation?.MNUCODE);
//     } else {
//     }
//   }, [kycDataByID]);
//   const handleSubmit = async () => {
//     let bodyTwo = {
//       ...payload,
//       PROVINCEID: provincedata,
//       DISTRICTID: districtdata,
//       MUNICIPALITYCODE: muncipalitydata,
//     };


//     if (!payload.MOBILENO) {
//       setMobileValid(true);
//     }
//     if (!provincedata) {
//       setProvinceValid(true);
//     }
//     if (!districtdata) {
//       setDistrictValid(true);
//     }
//     if (!muncipalitydata) {
//       setMuncipalityValid(true);
//     }
//     if (!payload.WARDNO) {
//       setWardValid(true);
//     }
//     if (!payload.HOUSENO) {
//       setHouseNoValid(true);
//     }
//     if (!payload.ADDRESS) {
//       setAreaValid(true);
//     }
//     if (
//       !payload.MOBILENO ||
//       !provincedata ||
//       !districtdata ||
//       !muncipalitydata ||
//       !payload.WARDNO ||
//       !payload.HOUSENO ||
//       !payload.ADDRESS
//     ) {
//       return;
//     }
//     dispatch(saveDataKyc(bodyTwo,2))
//     navigation.navigate('IndividualStepThree', {
//       datatwo: bodyTwo,
//       dataOne: IndividualStepOnedata,
//     });
//   };

// const  handleSubmitPrevious =()=>{
//   let bodyTwo = {
//     ...payload,
//     PROVINCEID: provincedata,
//     DISTRICTID: districtdata,
//     MUNICIPALITYCODE: muncipalitydata,
//   };
//   dispatch(saveDataKyc(bodyTwo,2))
//   navigation.navigate('KycIndividualStepOne')
// }
//   const theme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       background: 'white',
//     },
//   };
//   useEffect(() => {
//     if (!isEmpty(payload?.MOBILENO)) {
//       setMobileValid(false);
//     }
//   }, [payload?.MOBILENO]);

//   useEffect(() => {
//     if (provincedata) {
//       setProvinceValid(false);
//     }
//   }, [provincedata]);

//   useEffect(() => {
//     if (districtdata) {
//       setDistrictValid(false);
//     }
//   }, [districtdata]);
//   useEffect(() => {
//     if (muncipalitydata) {
//       setMuncipalityValid(false);
//     }
//   }, [muncipalitydata]);

//   useEffect(() => {
//     if (!isEmpty(payload?.WARDNO)) {
//       setWardValid(false);
//     }
//   }, [payload?.WARDNO]);
//   useEffect(() => {
//     if (!isEmpty(payload?.HOUSENO)) {
//       setHouseNoValid(false);
//     }
//   }, [payload?.HOUSENO]);
//   useEffect(() => {
//     if (!isEmpty(payload?.ADDRESS)) {
//       setAreaValid(false);
//     }
//   }, [payload?.ADDRESS]);

//   return (
//     <Provider theme={theme}>
//       <SafeAreaView style={containerStyle.loginContainer}>
//         <KeyboardAwareScrollView>
//           <View style={{padding: 15}}>
//             <View>
//               <TextInput
//                 label="Home Tel. No."
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.TELEPHONENO}
//                 keyboardType="numeric"
//                 onChangeText={TELEPHONENO =>
//                   setPayload({...payload, TELEPHONENO})
//                 }
//               />
//               <TextInput
//                 label="Mobile No. *"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.MOBILENO}
//                 keyboardType="phone-pad"
//                 onChangeText={MOBILENO => setPayload({...payload, MOBILENO})}
//                 maxLength={10}
//                 error={mobileValid ? true : false}
//               />
//               <TextInput
//                 label="Email Address *"
//                 mode="outlined"
//                 editable={false}
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.EMAIL}
//                 keyboardType="email-address"
//                 onChangeText={EMAIL => setPayload({...payload, EMAIL})}
//               />
//               <View style={InputStyle.dropdown}>
//                 <DropDown
//                   label={'Province *'}
//                   mode={'outlined'}
//                   visible={showProvinceDropDown}
//                   showDropDown={() => setShowProvinceDropDown(true)}
//                   onDismiss={() => setShowProvinceDropDown(false)}
//                   value={provincedata}
//                   setValue={value => {
//                     setProvinceData(value);
//                   }}
//                   list={provinces}
//                   header={2}
//                   error={provinceValid ? true : false}
//                 />
//               </View>
//               <View style={InputStyle.dropdown}>
//                 <DropDown
//                   label={'District *'}
//                   mode={'outlined'}
//                   visible={showDistrictDropDown}
//                   showDropDown={() => setShowDistrictDropDown(true)}
//                   onDismiss={() => setShowDistrictDropDown(false)}
//                   value={districtdata}
//                   setValue={value => {
//                     setDistrictData(value);
//                   }}
//                   list={district}
//                   header={2}
//                   error={districtValid ? true : false}
//                 />
//               </View>
//               <View style={InputStyle.dropdown}>
//                 <DropDown
//                   label={'Municipality/VDC *'}
//                   mode={'outlined'}
//                   visible={showMunicipalityDropDown}
//                   showDropDown={() => setShowMunicipalityDropDown(true)}
//                   onDismiss={() => setShowMunicipalityDropDown(false)}
//                   value={muncipalitydata}
//                   setValue={value => {
//                     setMuncipalityData(value);
//                   }}
//                   list={Municipality}
//                   header={2}
//                   error={muncipalityValid ? true : false}
//                 />
//               </View>
//             </View>
//             <View
//               style={
//                 (InputStyle.dropdown,
//                 {
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   marginBottom: 8,
//                 })
//               }>
//               <View style={{width: '45%'}}>
//                 <TextInput
//                   label="Ward No. *"
//                   mode="outlined"
//                   theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                   style={InputStyle.textInput}
//                   keyboardType="numeric"
//                   maxLength={2}
//                   value={payload?.WARDNO}
//                   onChangeText={WARDNO => setPayload({...payload, WARDNO})}
//                   error={wardValid ? true : false}
//                 />
//               </View>
//               <View style={{width: '50%'}}>
//                 <TextInput
//                   label="House No."
//                   mode="outlined"
//                   theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                   style={InputStyle.textInput}
//                   keyboardType="default"
//                   value={payload?.HOUSENO}
//                   onChangeText={HOUSENO => setPayload({...payload, HOUSENO})}
//                   error={housenoValid ? true : false}
//                 />
//               </View>
//             </View>
//             <View style={InputStyle.dropdown}>
//               <TextInput
//                 label="Address*"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 keyboardType="ascii-capable"
//                 value={payload?.ADDRESS}
//                 onChangeText={ADDRESS => setPayload({...payload, ADDRESS})}
//                 error={areaValid ? true : false}
//               />
//             </View>

//             <View>
//               <View
//                 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//                 <TouchableOpacity
//                   style={buttonStyle.previous}
//                   // onPress={() => navigation.navigate('KycIndividualStepOne')}>
//                   onPress={handleSubmitPrevious}>
//                   <Text style={textStyle.previousText}>Previous</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={buttonStyle.next}
//                   onPress={handleSubmit}>
//                   <Text style={textStyle.loginText}>Next</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </KeyboardAwareScrollView>
//       </SafeAreaView>
//     </Provider>
//   );
// };

// individualStepOne.propTypes = {
//   data: propTypes.object.isRequired,
// };
// const mapStatesToProps = state => ({
//   data: state.KycFormReducer,
// });
// export default connect(mapStatesToProps, {
//   getProvince,
//   data,
//   getdistrict,
//   getmuncipality,
// })(individualStepOne);
