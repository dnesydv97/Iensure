import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import {TextInput, Provider, DefaultTheme} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import DocumentUpload from '../../components/kyc/DocumentUpload';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, connect} from 'react-redux';
import DateFrom from './Date/DateofIssue';
import propTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {data, getdistrict} from '../../redux/actions/KycActions';
import { saveDataKyc } from '../../redux/actions/KycActions';
import moment from 'moment/moment';
const individualStepThree = ({getdistrict, data, route}) => {
  const {kycDataByID} = useSelector(state => state.kyc);
  const {kycData} = useSelector(state => state.KycFormReducer);
  const [showDistrictDropDown, setShowDistrictDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [district, setDistrict] = useState([]);
  const [districtdata, setDistrictData] = useState('');
  const [datefrom, setDob] = useState('');
  const [payload, setPayload] = useState({CITIZENSHIPNO: ''});
  // const IndividualStepOne = !isEmpty(route) && route?.params?.dataOne;
  // const IndividualStepTwo = !isEmpty(route) && route?.params?.datatwo;

  const [citizenshipValid, setCitizenShipValid] = useState(false);
  const [districtissueValid, setDistrictIssueValid] = useState(false);
  const [issueDateValid, setIssueDateValid] = useState(false);

  useEffect(() => {
    fetchDistrictData();
  }, []);
  const fetchDistrictData = async () => {
    getdistrict({provinceID: ''});
  };
  useEffect(() => {
    if (!isEmpty(kycData?.kycThree)) {
      setPayload({
        CITIZENSHIPNO: kycData?.kycThree?.CITIZENSHIPNO,
       
      })
    
      setDistrictData(kycData?.kycThree?.ISSUE_DISTRICT_ID);
      setDob(kycData?.kycThree?.ISSUEDATE);
    }
  }, [kycData?.kycThree]);
  useEffect(() => {
    if (!isEmpty(data)) {
      const getData = data;
      const dist = getData?.district;

      let disLists = dist?.data?.map((list, index) => ({
        label: list.EDESCRIPTION,
        value: list?.ID,
      }));
      setDistrict(disLists);
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(kycDataByID)) {
      setPayload({
        CITIZENSHIPNO: kycDataByID?.kycInformation?.CITIZENSHIPNO,
      });
      setDistrictData(kycDataByID?.kycInformation?.ISSUEDDISTRICTID);
      setDob(moment(!isEmpty(kycDataByID) && kycDataByID?.kycInformation?.ISSUEDATE).format('YYYY-MM-DD'));
    } else {
    }
  }, [kycDataByID]);

  const handleSubmit = async () => {
    let body = {
      ...payload,
      ISSUE_DISTRICT_ID: districtdata,
      ISSUEDATE: datefrom,
    };
   

    if (!payload.CITIZENSHIPNO) {
      setCitizenShipValid(true);
    }
    if (!districtdata) {
      setDistrictIssueValid(true);
    }
    if (!datefrom) {
      setIssueDateValid(true);
    }

    if (!payload.CITIZENSHIPNO || !districtdata || !datefrom) {
      return;
    }
    dispatch(saveDataKyc(body,3))
    navigation.navigate('IndividualStepFour');
  };
  const handleSubmitPrevious =()=>{
    let body = {
      ...payload,
      ISSUE_DISTRICT_ID: districtdata,
      ISSUEDATE: datefrom,
    };
    dispatch(saveDataKyc(body,3))


 navigation.navigate('KycIndividualStepTwo')
  }
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  useEffect(() => {
    if (payload?.CITIZENSHIPNO) {
      setCitizenShipValid(false);
    }
  }, [payload?.CITIZENSHIPNO]);

  useEffect(() => {
    if (districtdata) {
      setDistrictIssueValid(false);
    }
  }, [districtdata]);

  useEffect(() => {
    if (!isEmpty(datefrom)) {
      setIssueDateValid(false);
    }
  }, [datefrom]);

  return (
    <Provider theme={theme}>
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <TextInput
                label="Citizenship Number *"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                keyboardType="visible-password"
                value={payload?.CITIZENSHIPNO}
                onChangeText={CITIZENSHIPNO =>
                  setPayload({...payload, CITIZENSHIPNO})
                }
                error={citizenshipValid ? true : false}
              />
              <View>
                <DropDown
                  label={'Citizenship Issue District'}
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
                  error={districtissueValid ? true : false}
                />
              </View>

              <View style={{marginTop: 10, marginBottom: 8}}>
                <DateFrom
                  setDob={setDob}
                  datefrom={datefrom}
                  issueDateValid={issueDateValid}
                />
              </View>
            </View>
            <View>
              <DocumentUpload />
            </View>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom:40}}>
                <TouchableOpacity
                  style={buttonStyle.previous}
                  // onPress={() => navigation.navigate('KycIndividualStepTwo')}>
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

individualStepThree.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.KycFormReducer,
});
export default connect(mapStatesToProps, {
  data,
  getdistrict,
})(individualStepThree);














// import React, {useState, useEffect} from 'react';
// import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import containerStyle from '../../style/container';
// import buttonStyle from '../../style/button';
// import textStyle from '../../style/text';
// import InputStyle from '../../style/input';
// import {TextInput, Provider, DefaultTheme} from 'react-native-paper';
// import DropDown from 'react-native-paper-dropdown';
// import DocumentUpload from '../../components/kyc/DocumentUpload';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector, connect} from 'react-redux';
// import DateFrom from './Date/DateofIssue';
// import propTypes from 'prop-types';
// import {isEmpty} from 'lodash';
// import {data, getdistrict} from '../../redux/actions/KycActions';
// import { saveDataKyc } from '../../redux/actions/KycActions';
// import moment from 'moment/moment';
// const individualStepOne = ({getdistrict, data, route}) => {
//   const {kycDataByID} = useSelector(state => state.kyc);
//   const {kycData} = useSelector(state => state.KycFormReducer);
//   const [showDistrictDropDown, setShowDistrictDropDown] = useState(false);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [district, setDistrict] = useState([]);
//   const [districtdata, setDistrictData] = useState('');
//   const [datefrom, setDob] = useState('');
//   const [payload, setPayload] = useState({CITIZENSHIPNO: ''});
//   const IndividualStepOne = !isEmpty(route) && route?.params?.dataOne;
//   const IndividualStepTwo = !isEmpty(route) && route?.params?.datatwo;

//   const [citizenshipValid, setCitizenShipValid] = useState(false);
//   const [districtissueValid, setDistrictIssueValid] = useState(false);
//   const [issueDateValid, setIssueDateValid] = useState(false);

//   useEffect(() => {
//     fetchDistrictData();
//   }, []);
//   const fetchDistrictData = async () => {
//     getdistrict({provinceID: ''});
//   };
//   useEffect(() => {
//     if (!isEmpty(kycData?.kycThree)) {
//       setPayload({
//         CITIZENSHIPNO: kycData?.kycThree?.CITIZENSHIPNO,
       
//       })
    
//       setDistrictData(kycData?.kycThree?.ISSUE_DISTRICT_ID);
//       setDob(kycData?.kycThree?.ISSUEDATE);
//     }
//   }, [kycData?.kycThree]);
//   useEffect(() => {
//     if (!isEmpty(data)) {
//       const getData = data;
//       const dist = getData?.district;

//       let disLists = dist?.data?.map((list, index) => ({
//         label: list.EDESCRIPTION,
//         value: list?.ID,
//       }));
//       setDistrict(disLists);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (!isEmpty(kycDataByID)) {
//       setPayload({
//         CITIZENSHIPNO: kycDataByID?.kycInformation?.CITIZENSHIPNO,
//       });
//       setDistrictData(kycDataByID?.kycInformation?.ISSUEDDISTRICTID);
//       setDob(moment(!isEmpty(kycDataByID) && kycDataByID?.kycInformation?.ISSUEDATE).format('YYYY-MM-DD'));
//     } else {
//     }
//   }, [kycDataByID]);

//   const handleSubmit = async () => {
//     let body = {
//       ...payload,
//       ISSUE_DISTRICT_ID: districtdata,
//       ISSUEDATE: datefrom,
//     };
   

//     if (!payload.CITIZENSHIPNO) {
//       setCitizenShipValid(true);
//     }
//     if (!districtdata) {
//       setDistrictIssueValid(true);
//     }
//     if (!datefrom) {
//       setIssueDateValid(true);
//     }

//     if (!payload.CITIZENSHIPNO || !districtdata || !datefrom) {
//       return;
//     }
//     dispatch(saveDataKyc(body,3))
//     navigation.navigate('IndividualStepFour', {
//       datatwo: IndividualStepTwo,
//       dataOne: IndividualStepOne,
//       datathree: body,
//     });
//   };
//   const handleSubmitPrevious =()=>{
//     let body = {
//       ...payload,
//       ISSUE_DISTRICT_ID: districtdata,
//       ISSUEDATE: datefrom,
//     };
//     dispatch(saveDataKyc(body,3))


//  navigation.navigate('KycIndividualStepTwo')
//   }
//   const theme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       background: 'white',
//     },
//   };

//   useEffect(() => {
//     if (payload?.CITIZENSHIPNO) {
//       setCitizenShipValid(false);
//     }
//   }, [payload?.CITIZENSHIPNO]);

//   useEffect(() => {
//     if (districtdata) {
//       setDistrictIssueValid(false);
//     }
//   }, [districtdata]);

//   useEffect(() => {
//     if (!isEmpty(datefrom)) {
//       setIssueDateValid(false);
//     }
//   }, [datefrom]);

//   return (
//     <Provider theme={theme}>
//       <SafeAreaView style={containerStyle.loginContainer}>
//         <KeyboardAwareScrollView>
//           <View style={{padding: 15}}>
//             <View>
//               <TextInput
//                 label="Citizenship Number *"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 keyboardType="visible-password"
//                 value={payload?.CITIZENSHIPNO}
//                 onChangeText={CITIZENSHIPNO =>
//                   setPayload({...payload, CITIZENSHIPNO})
//                 }
//                 error={citizenshipValid ? true : false}
//               />
//               <View>
//                 <DropDown
//                   label={'Citizenship Issue District'}
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
//                   error={districtissueValid ? true : false}
//                 />
//               </View>

//               <View style={{marginTop: 10, marginBottom: 8}}>
//                 <DateFrom
//                   setDob={setDob}
//                   datefrom={datefrom}
//                   issueDateValid={issueDateValid}
//                 />
//               </View>
//             </View>
//             <View>
//               <DocumentUpload />
//             </View>
//             <View>
//               <View
//                 style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom:40}}>
//                 <TouchableOpacity
//                   style={buttonStyle.previous}
//                   // onPress={() => navigation.navigate('KycIndividualStepTwo')}>
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
//   data,
//   getdistrict,
// })(individualStepOne);
