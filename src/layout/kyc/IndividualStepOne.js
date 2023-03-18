import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import {saveDataKyc} from '../../redux/actions/KycActions';
import AvatarUpload from '../../components/kyc/AvatarUpload';
import {TextInput, Provider, DefaultTheme} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {useNavigation} from '@react-navigation/native';
import DateFrom from './Date/DateofBirth';
import {useDispatch, useSelector} from 'react-redux';

import {isEmpty} from 'lodash';
const IndividualStepOne = ({}) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const name = user[0]?.FullName;
   console.log("name",name)
  const autoGender = user[0]?.Gender;
  const {kycDataByID} = useSelector(state => state.kyc);
  const {kycData,} = useSelector(state => state.KycFormReducer);

  const [showGenderDropDown, setShowGenderDropDown] = useState(false);
  const [showMarriageDropDown, setShowMarriageDropDown] = useState(false);
  const [gender, setGender] = useState(autoGender);
  const [marriageStatus, setMarriageStatus] = useState('');
  const navigation = useNavigation();
  const [datefrom, setDob] = useState('');

  const [birthdateValid, setBirthDateValid] = useState(false);
  const [marriageValid, setMarriageValid] = useState(false);
  const [fathernameValid, setFatherNameValid] = useState(false);
  // const [mothernameValid, setMotherNameValid] = useState(false);
  const [grandfathernameValid, setGrandFatherNameValid] = useState(false);
  const [nepalinameValid, setNepaliNameValid] = useState(false);
  const [englishnameValid, setEnglishNameValid] = useState(false);

  const [payload, setPayload] = useState({
    INSUREDNAME_ENG:'',
    INSUREDNAME_NEP: '',
    FATHERNAME: '',
    GRANDFATHERNAME: '',
    WIFENAME: '',
  });

  useEffect(() => {
    if (!isEmpty(kycDataByID)) {
      setPayload({
        INSUREDNAME_ENG:
          !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.INSUREDNAME||name,
        INSUREDNAME_NEP:
          !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.INSUREDNAME_NEP,
        FATHERNAME:
          !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.FATHERNAME,
        GRANDFATHERNAME:
          !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.GRANDFATHERNAME,
        WIFENAME:
          !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.WIFENAME,
      });
      setGender(!isEmpty(kycDataByID) && kycDataByID?.kycInformation?.GENDER);
      setMarriageStatus(
        !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.MaritalStatusCode,
      );
      setDob(!isEmpty(kycDataByID) && kycDataByID?.kycInformation?.DATEOFBIRTH);
    } else {
      setPayload(null);
    }
  }, [kycDataByID]);



  useEffect(() => {
    if (payload?.INSUREDNAME_NEP) {
      setNepaliNameValid(false);
    }
  }, [payload?.INSUREDNAME_NEP]);
  useEffect(() => {
    if (payload?.INSUREDNAME_ENG) {
      setEnglishNameValid(false);
    }
  }, [payload?.INSUREDNAME_ENG]);
  useEffect(() => {
    if (!isEmpty(datefrom)) {
      setBirthDateValid(false);
    }
  }, [datefrom]);

  useEffect(() => {
    if (!isEmpty(marriageStatus)) {
      setMarriageValid(false);
    }
  }, [marriageStatus]);

  useEffect(() => {
    if (!isEmpty(payload?.FATHERNAME)) {
      setFatherNameValid(false);
    }
  }, [payload?.FATHERNAME]);

  // useEffect(() => {
  //   if (!isEmpty(payload?.WIFENAME)) {
  //     setMotherNameValid(false);
  //   }
  // }, [payload?.WIFENAME]);

  useEffect(() => {
    if (!isEmpty(payload?.GRANDFATHERNAME)) {
      setGrandFatherNameValid(false);
    }
  }, [payload?.GRANDFATHERNAME]);

  const handleSubmit = async () => {
    let body = {
      DATEOFBIRTH: datefrom,
      MARITALSTATUS: marriageStatus,
      GENDER: gender,

      ...payload,
    };
console.log("kycone",body)
    if (!datefrom) {
      setBirthDateValid(true);
    }
    if (!payload?.INSUREDNAME_NEP) {
      setNepaliNameValid(true);
    }
    if (!payload?.INSUREDNAME_ENG) {
      setEnglishNameValid(true);
    }
    if (!marriageStatus) {
      setMarriageValid(true);
    }
    if (!payload?.FATHERNAME) {
      setFatherNameValid(true);
    }
    // if (!payload?.WIFENAME) {
    //   setMotherNameValid(true);
    // }
    if (!payload?.GRANDFATHERNAME) {
      setGrandFatherNameValid(true);
    }
    if (
      !datefrom ||
      !marriageStatus ||
      !payload.FATHERNAME ||
      // !payload.WIFENAME ||
      !payload.GRANDFATHERNAME ||
      !payload.INSUREDNAME_NEP ||
      !payload.INSUREDNAME_ENG
    ) {
      return;
    }

    dispatch(saveDataKyc(body, 1));

    navigation.navigate('IndividualStepTwo');
  };

  const genderList = [
    {
      label: 'Male',
      value: 'Male',
      // value: '1',
    },
    {
      label: 'Female',
      value: 'Female',
      // value: '2',
    },
    {
      label: 'Others',
      value: 'Others',
      // value: '3',
    },
  ];
  const marriageStatusList = [
    {
      label: 'UnMarried',
      value: '0',
    },
    {
      label: 'Married',
      value: '1',
    },
    {
      label: 'Divorced',
      value: '2',
    },
    {
      label: 'Widow',
      value: '3',
    },
  ];
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  useEffect(() => {
    setPayload({ INSUREDNAME_ENG:name})
  }, [name]);
  return (
    <Provider theme={theme}>
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                // marginVertical: 50,
                marginBottom: 40,
                marginTop: 10,
              }}>
              <AvatarUpload imageHeight={styles.Imageheig} imageHeightContainer={styles.imageHeightContainer}size={100} camera={true}/>
            </View>
            <View>
              <TextInput
                label="Full Name *"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.INSUREDNAME_ENG}
                onChangeText={INSUREDNAME_ENG =>
                  setPayload({ INSUREDNAME_ENG})
                  // mobile: text.replace(/[^0-9]/g, ''),
                }
                
                error={englishnameValid ? true : false}
              />
              <TextInput
                label="पुरा नाम नेपालीमा *"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={{
                  marginBottom: 10,
                  backgroundColor: '#FAFAFA',
                  height: 44,
                  paddingHorizontal: 0,
                  fontFamily: 'KrutiDev010',
                }}
                value={payload?.INSUREDNAME_NEP}
                onChangeText={INSUREDNAME_NEP =>
                  setPayload({...payload, INSUREDNAME_NEP})
                }
                error={nepalinameValid ? true : false}
              />
              <View style={{marginBottom: 10}}>
                <DateFrom
                  setDob={setDob}
                  datefrom={datefrom}
                  birthdateValid={birthdateValid}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <View style={{width: '47%'}}>
                <DropDown
                  label={'Gender *'}
                  mode={'outlined'}
                  visible={showGenderDropDown}
                  showDropDown={() => setShowGenderDropDown(true)}
                  onDismiss={() => setShowGenderDropDown(false)}
                  value={gender}
                  setValue={setGender}
                  list={genderList}
                  header={2}
                />
              </View>
              <View style={{width: '50%'}}>
                <DropDown
                  label={'Marriage Status *'}
                  mode={'outlined'}
                  visible={showMarriageDropDown}
                  showDropDown={() => setShowMarriageDropDown(true)}
                  onDismiss={() => setShowMarriageDropDown(false)}
                  value={marriageStatus}
                  setValue={setMarriageStatus}
                  list={marriageStatusList}
                  header={2}
                  error={marriageValid ? true : false}
                />
              </View>
            </View>
            <View>
              <TextInput
                label="Father Name *"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.FATHERNAME}
                onChangeText={FATHERNAME =>
                  setPayload({...payload, FATHERNAME: FATHERNAME})
                }
                error={fathernameValid ? true : false}
              />
              {marriageStatus==1?
              <TextInput
                label="Husband/Wife Name *"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.WIFENAME}
                onChangeText={WIFENAME =>
                  setPayload({...payload, WIFENAME: WIFENAME})
                }
                // error={mothernameValid ? true : false}
              />:null}
              <TextInput
                label="Grand Father Name *"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.GRANDFATHERNAME}
                onChangeText={GRANDFATHERNAME =>
                  setPayload({...payload, GRANDFATHERNAME: GRANDFATHERNAME})
                }
                error={grandfathernameValid ? true : false}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={buttonStyle.next} onPress={handleSubmit}>
                <Text style={textStyle.loginText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default IndividualStepOne;
const styles = StyleSheet.create({
  container: {
    elevation: 5,
    height: 100,
    width: 100,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  Imageheig:{
    height:100,
    width:'100%'
  },
  imageHeightContainer:{
    width:100,
    height:100
  },
})


















// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';

// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import containerStyle from '../../style/container';
// import buttonStyle from '../../style/button';
// import textStyle from '../../style/text';
// import InputStyle from '../../style/input';
// import {saveDataKyc} from '../../redux/actions/KycActions';
// import AvatarUpload from '../../components/kyc/AvatarUpload';
// import {TextInput, Provider, DefaultTheme} from 'react-native-paper';
// import DropDown from 'react-native-paper-dropdown';
// import {useNavigation} from '@react-navigation/native';
// import DateFrom from './Date/DateofBirth';
// import {useDispatch, useSelector} from 'react-redux';

// import {isEmpty} from 'lodash';
// const IndividualStepOne = ({}) => {
//   const user = useSelector(state => state.auth.user);
//   const dispatch = useDispatch();
//   const name = user[0]?.FullName;
//   console.log("name",name)
//   const autoGender = user[0]?.Gender;
//   const {kycDataByID} = useSelector(state => state.kyc);
//   const {kycData} = useSelector(state => state.KycFormReducer);

//   const [showGenderDropDown, setShowGenderDropDown] = useState(false);
//   const [showMarriageDropDown, setShowMarriageDropDown] = useState(false);
//   const [gender, setGender] = useState(autoGender);
//   const [marriageStatus, setMarriageStatus] = useState('');
//   const navigation = useNavigation();
//   const [datefrom, setDob] = useState('');

//   const [birthdateValid, setBirthDateValid] = useState(false);
//   const [marriageValid, setMarriageValid] = useState(false);
//   const [fathernameValid, setFatherNameValid] = useState(false);
//   // const [mothernameValid, setMotherNameValid] = useState(false);
//   const [grandfathernameValid, setGrandFatherNameValid] = useState(false);
//   const [nepalinameValid, setNepaliNameValid] = useState(false);
//   const [englishnameValid, setEnglishNameValid] = useState(false);
  
//   const [payload, setPayload] = useState({
//     INSUREDNAME_ENG:'',
//     INSUREDNAME_NEP: '',
//     FATHERNAME: '',
//     GRANDFATHERNAME: '',
//     WIFENAME: '',
//   });

//   useEffect(() => {
//     if (!isEmpty(kycDataByID)) {
//       setPayload({
//         INSUREDNAME_ENG:
//           !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.INSUREDNAME,
//         INSUREDNAME_NEP:
//           !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.INSUREDNAME_NEP,
//         FATHERNAME:
//           !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.FATHERNAME,
//         GRANDFATHERNAME:
//           !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.GRANDFATHERNAME,
//         WIFENAME:
//           !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.WIFENAME,
//       });
//       setGender(!isEmpty(kycDataByID) && kycDataByID?.kycInformation?.GENDER);
//       setMarriageStatus(
//         !isEmpty(kycDataByID) && kycDataByID?.kycInformation?.MaritalStatusCode,
//       );
//       setDob(!isEmpty(kycDataByID) && kycDataByID?.kycInformation?.DATEOFBIRTH);
//     } else {
//       setPayload(null);
//     }
//   }, [kycDataByID]);

//   useEffect(() => {
//     setPayload({ INSUREDNAME_ENG:name})
//   }, [name]);

//   useEffect(() => {
//     if (payload?.INSUREDNAME_NEP) {
//       setNepaliNameValid(false);
//     }
//   }, [payload?.INSUREDNAME_NEP]);
//   useEffect(() => {
//     if (payload?.INSUREDNAME_ENG) {
//       setEnglishNameValid(false);
//     }
//   }, [payload?.INSUREDNAME_ENG]);
//   useEffect(() => {
//     if (!isEmpty(datefrom)) {
//       setBirthDateValid(false);
//     }
//   }, [datefrom]);

//   useEffect(() => {
//     if (!isEmpty(marriageStatus)) {
//       setMarriageValid(false);
//     }
//   }, [marriageStatus]);

//   useEffect(() => {
//     if (!isEmpty(payload?.FATHERNAME)) {
//       setFatherNameValid(false);
//     }
//   }, [payload?.FATHERNAME]);

//   // useEffect(() => {
//   //   if (!isEmpty(payload?.WIFENAME)) {
//   //     setMotherNameValid(false);
//   //   }
//   // }, [payload?.WIFENAME]);

//   useEffect(() => {
//     if (!isEmpty(payload?.GRANDFATHERNAME)) {
//       setGrandFatherNameValid(false);
//     }
//   }, [payload?.GRANDFATHERNAME]);

//   const handleSubmit = async () => {
//     let body = {
//       DATEOFBIRTH: datefrom,
//       MARITALSTATUS: marriageStatus,
//       GENDER: gender,

//       ...payload,
//     };

//     if (!datefrom) {
//       setBirthDateValid(true);
//     }
//     if (!payload?.INSUREDNAME_NEP) {
//       setNepaliNameValid(true);
//     }
//     if (!payload?.INSUREDNAME_ENG) {
//       setEnglishNameValid(true);
//     }
//     if (!marriageStatus) {
//       setMarriageValid(true);
//     }
//     if (!payload?.FATHERNAME) {
//       setFatherNameValid(true);
//     }
//     // if (!payload?.WIFENAME) {
//     //   setMotherNameValid(true);
//     // }
//     if (!payload?.GRANDFATHERNAME) {
//       setGrandFatherNameValid(true);
//     }
//     if (
//       !datefrom ||
//       !marriageStatus ||
//       !payload.FATHERNAME ||
//       // !payload.WIFENAME ||
//       !payload.GRANDFATHERNAME ||
//       !payload.INSUREDNAME_NEP ||
//       !payload.INSUREDNAME_ENG
//     ) {
//       return;
//     }

//     dispatch(saveDataKyc(body, 1));

//     navigation.navigate('IndividualStepTwo', {paramKey: body});
//   };

//   const genderList = [
//     {
//       label: 'Male',
//       value: 'Male',
//       // value: '1',
//     },
//     {
//       label: 'Female',
//       value: 'Female',
//       // value: '2',
//     },
//     {
//       label: 'Others',
//       value: 'Others',
//       // value: '3',
//     },
//   ];
//   const marriageStatusList = [
//     {
//       label: 'UnMarried',
//       value: '0',
//     },
//     {
//       label: 'Married',
//       value: '1',
//     },
//     {
//       label: 'Divorced',
//       value: '2',
//     },
//     {
//       label: 'Widow',
//       value: '3',
//     },
//   ];
//   const theme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       background: 'white',
//     },
//   };
//   return (
//     <Provider theme={theme}>
//       <SafeAreaView style={containerStyle.loginContainer}>
//         <KeyboardAwareScrollView>
//           <View style={{padding: 15}}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 // marginVertical: 50,
//                 marginBottom: 40,
//                 marginTop: 10,
//               }}>
//               <AvatarUpload imageHeight={styles.Imageheig} imageHeightContainer={styles.imageHeightContainer}size={100} camera={true}/>
//             </View>
//             <View>
//               <TextInput
//                 label="Full Name *"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.INSUREDNAME_ENG}
//                 onChangeText={INSUREDNAME_ENG =>
//                   setPayload({...payload, INSUREDNAME_ENG})
//                 }
//                 error={englishnameValid ? true : false}
//               />
//               <TextInput
//                 label="पुरा नाम नेपालीमा *"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={{
//                   marginBottom: 10,
//                   backgroundColor: '#FAFAFA',
//                   height: 44,
//                   paddingHorizontal: 0,
//                   fontFamily: 'KrutiDev010',
//                 }}
//                 value={payload?.INSUREDNAME_NEP}
//                 onChangeText={INSUREDNAME_NEP =>
//                   setPayload({...payload, INSUREDNAME_NEP})
//                 }
//                 error={nepalinameValid ? true : false}
//               />
//               <View style={{marginBottom: 10}}>
//                 <DateFrom
//                   setDob={setDob}
//                   datefrom={datefrom}
//                   birthdateValid={birthdateValid}
//                 />
//               </View>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginBottom: 8,
//               }}>
//               <View style={{width: '47%'}}>
//                 <DropDown
//                   label={'Gender *'}
//                   mode={'outlined'}
//                   visible={showGenderDropDown}
//                   showDropDown={() => setShowGenderDropDown(true)}
//                   onDismiss={() => setShowGenderDropDown(false)}
//                   value={gender}
//                   setValue={setGender}
//                   list={genderList}
//                   header={2}
//                 />
//               </View>
//               <View style={{width: '50%'}}>
//                 <DropDown
//                   label={'Marriage Status *'}
//                   mode={'outlined'}
//                   visible={showMarriageDropDown}
//                   showDropDown={() => setShowMarriageDropDown(true)}
//                   onDismiss={() => setShowMarriageDropDown(false)}
//                   value={marriageStatus}
//                   setValue={setMarriageStatus}
//                   list={marriageStatusList}
//                   header={2}
//                   error={marriageValid ? true : false}
//                 />
//               </View>
//             </View>
//             <View>
//               <TextInput
//                 label="Father Name *"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.FATHERNAME}
//                 onChangeText={FATHERNAME =>
//                   setPayload({...payload, FATHERNAME: FATHERNAME})
//                 }
//                 error={fathernameValid ? true : false}
//               />
//               {marriageStatus==1?
//               <TextInput
//                 label="Husband/Wife Name *"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.WIFENAME}
//                 onChangeText={WIFENAME =>
//                   setPayload({...payload, WIFENAME: WIFENAME})
//                 }
//                 // error={mothernameValid ? true : false}
//               />:null}
//               <TextInput
//                 label="Grand Father Name *"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.GRANDFATHERNAME}
//                 onChangeText={GRANDFATHERNAME =>
//                   setPayload({...payload, GRANDFATHERNAME: GRANDFATHERNAME})
//                 }
//                 error={grandfathernameValid ? true : false}
//               />
//             </View>
//             <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
//               <TouchableOpacity style={buttonStyle.next} onPress={handleSubmit}>
//                 <Text style={textStyle.loginText}>Next</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </KeyboardAwareScrollView>
//       </SafeAreaView>
//     </Provider>
//   );
// };

// export default IndividualStepOne;
// const styles = StyleSheet.create({
//   container: {
//     elevation: 5,
//     height: 100,
//     width: 100,
//     backgroundColor: '#efefef',
//     position: 'relative',
//     borderRadius: 999,
//     overflow: 'hidden',
//   },
//   Imageheig:{
//     height:100,
//     width:'100%'
//   },
//   imageHeightContainer:{
//     width:100,
//     height:100
//   },
// })