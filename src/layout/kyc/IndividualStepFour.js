import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView,Alert,ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import {TextInput, Provider, DefaultTheme} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, connect} from 'react-redux';
import PopupErrorModal from '../../components/modals/PopupError';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';

import {
  data,
  getOccuption,
  getClassification,
  getIncome,
  getkycResult,saveDataKyc
} from '../../redux/actions/KycActions';
const individualStepFour = ({
 
  getOccuption,
  getClassification,
  data,
  getIncome,
}) => {
  const {kycDataByID} = useSelector(state => state.kyc);
  const {result,kycData,KYCLoading} = useSelector(state => state.KycFormReducer);

  const user = useSelector(state => state.auth.user);
  const [showClassificationDropDown, setShowClassificationDropDown] =
    useState(false);
  const [showIncomeDropDown, setShowIncomeDropDown] = useState(false);
  const [showOccuptionDropDown, setShowOccuptionDropDown] = useState(false);
  const [income, setIncome] = useState([]);
  const [incomedata, setIncomeData] = useState('');
  const [classification, setClassification] = useState([]);
  const [classificationdata, setClassificationData] = useState('');
  const [ModalVisible, setModalVisible] = useState(false);
  const [occuption, setOccuption] = useState('');
  const [occuptiondata, setOccuptionData] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const dataOneAll = route?.params?.dataOne;
  

  // const dataTwoAll = route?.params?.datatwo;
  // const dataThreeAll = route?.params?.datathree;



  const kyc = !isEmpty(user) && user[0]?.KycId;
  const kycnumber = !isEmpty(user) && user[0]?.KycNo;
  const regid = !isEmpty(user) && user[0]?.Regd_ID;
  const [occuptionValid, setOccuptionValid] = useState(false);
  const [incomesourceValid, setIncomeSOurceValid] = useState(false);
  const [classificationValid, setClassificationValid] = useState(false);


  useEffect(() => {
    if (occuptiondata) {
      setOccuptionValid(false);
    }
  }, [occuptiondata]);

  useEffect(() => {
    if (incomedata) {
      setIncomeSOurceValid(false);
    }
  }, [incomedata]);

  // useEffect(() => {
  //   if (classificationdata) {
  //     setClassificationValid(false);
  //   }
  // }, [classificationdata]);

  useEffect(() => {
    fetchoccuptionData();
  }, []);
  const fetchoccuptionData = async () => {
    getOccuption({});
  };
  useEffect(() => {
    fetchclassificationData();
  }, []);
  const fetchclassificationData = async () => {
    getClassification({});
  };
  useEffect(() => {
    fetchIncomeData();
  }, []);
  const fetchIncomeData = async () => {
    getIncome({});
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      const getData = data;

      const occuptdata = getData?.occup;

      let occupLists = occuptdata?.data?.map((list, index) => ({
        label: list?.DESCRIPTION,
        value: list?.BUSSOCCPCODE,
      }));
      setOccuption(occupLists);

      // const classdata = getData?.class;

      // let classLists = classdata?.data?.map((list, index) => ({
      //   label: list?.CLASSIFICATIONNAME,
      //   value: list?.ID,
      // }));
      // setClassification(classLists);

      const incomedata = getData?.incomesource;

      let incomeLists = incomedata?.data?.map((list, index) => ({
        label: list?.EDESC,
        value: list?.ID,
      }));
      setIncome(incomeLists);
    }
  }, [data]);

  const [payload, setPayload] = useState({
    TEMPORARYADDRESS: '',
    
    PANNO:''
  });
  useEffect(() => {
    if (!isEmpty(kycData?.kycFour)) {
      setPayload({
        TEMPORARYADDRESS: kycData?.kycFour?.TEMPORARYADDRESS,
      
        PANNO:  kycData?.kycFour?.PANNO
       
      })

      // setOccuption(kycData?.kycFour?.)
      // setIncomeData(kycData?.kycFour?.)
      // setClassificationData(kycData?.kycFour?.)
  
        
    }
  }, [kycData?.kycFour]);
 
  useEffect(() => {
    if (!isEmpty(kycDataByID)) {
      setPayload({
        PANNO: kycDataByID?.kycInformation?.PANNO,
        TEMPORARYADDRESS:kycDataByID?.kycInformation?.TEMPORARYADDRESS
      });
      setOccuptionData(kycDataByID?.kycInformation?.OCCUPATIONCODE);
      setIncomeData(kycDataByID?.kycInformation?.INCOMESOURCE);
      // setClassificationData(kycDataByID?.kycInformation?.CLASSIFICATIONID);
    }
  }, [kycDataByID]);
  const handleSubmit = async () => {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();

    let body = [
      {
        KYCID: kyc,
        KYCNO: kycnumber,
        USERID: regid,
        BRANCHCODE: '01',
        INSUREDTYPE: 2, // 1 means corporate 2 means indivdual
        ACCOUNTNAMECODE: '500',
        KYCRiskCategory: '1',

        INSUREDNAME_ENG:!isEmpty(kycData) && kycData?.kycOne?.INSUREDNAME_ENG,
        INSUREDNAME_NEP: !isEmpty(kycData) && kycData?.kycOne?.INSUREDNAME_NEP,
        DATEOFBIRTH: !isEmpty(kycData) && kycData?.kycOne?.DATEOFBIRTH,
        GENDER: !isEmpty(kycData) && kycData?.kycOne?.GENDER,
        MARITALSTATUS: !isEmpty(kycData) && kycData?.kycOne?.MARITALSTATUS,
        FATHERNAME: !isEmpty(kycData) && kycData?.kycOne?.FATHERNAME,
        WIFENAME: !isEmpty(kycData) && kycData?.kycOne?.WIFENAME,
        GRANDFATHERNAME: !isEmpty(kycData) && kycData?.kycOne?.GRANDFATHERNAME,
       
        HOMETELNO: !isEmpty(kycData) && kycData?.kycTwo?.TELEPHONENO,
        MOBILENO: !isEmpty(kycData) && kycData?.kycTwo?.MOBILENO,
        EMAIL: !isEmpty(kycData) && kycData?.kycTwo?.EMAIL,
        PROVINCEID: !isEmpty(kycData) && kycData?.kycTwo?.PROVINCEID,
        DISTRICTID: !isEmpty(kycData) && kycData?.kycTwo?.DISTRICTID,
        MUNICIPALITYCODE: !isEmpty(kycData) && kycData?.kycTwo?.MUNICIPALITYCODE,  
        WARDNO: !isEmpty(kycData) && kycData?.kycTwo?.WARDNO,
        HOUSENO: !isEmpty(kycData) && kycData?.kycTwo?.HOUSENO,
        ADDRESS: !isEmpty(kycData) && kycData?.kycTwo?.ADDRESS,
   
       
      
     
        CITIZENSHIPNO: !isEmpty(kycData) && kycData?.kycThree?.CITIZENSHIPNO,
          ISSUE_DISTRICT_ID: !isEmpty(kycData) && kycData?.kycThree?.ISSUE_DISTRICT_ID,
        ISSUEDATE: !isEmpty(kycData) && kycData?.kycThree?.ISSUEDATE,
      


        // kycclassification: classificationdata,
        OCCUPATION: occuptiondata,
        INCOMESOURCE: incomedata,
        ...payload
      },
    ];
   
  
   

    // if (!classificationdata) {
    //   setClassificationValid(true);
    // }
    if (!incomedata) {
      setIncomeSOurceValid(true);
    }
    if (!occuptiondata) {
      setOccuptionValid(true);
    }

    if (
      
      // !classificationdata ||
      !incomedata ||
      !occuptiondata
    ) {
      return;
    }
    data.append('KYCDetails', JSON.stringify(body));

    dispatch(getkycResult(data));
    
  };
  useEffect(()=>{
  if( !isEmpty(result) && result?.response_code==0){
    setModalVisible(true)
    navigation.navigate('Dash');
    
    // Alert.alert(
    //   'Information',
    //   'KYC has been successfully  registered',
    //   [
    //     {
    //       text: 'Okay',
    //       onPress: () => console.log('Okay Pressed'),
    //       style: 'cancel',
    //     },
        
    //   ],
    // )
  }
  },[result])

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const handleSubmitPrevious = () => {
    let bodyKYC = {
     
      // kycclassification: classificationdata,
      OCCUPATION: occuptiondata,
      INCOMESOURCE: incomedata,
      ...payload
    };
    dispatch(saveDataKyc(bodyKYC,4))

  navigation.navigate('KycIndividualStepThree')
   

  }
  return (
    <Provider theme={theme}>
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <TextInput
                label="Pan Number"
                mode="outlined"
                keyboardType="numeric"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.PANNO}
                onChangeText={PANNO =>
                  setPayload({...payload, PANNO})
                }
              />
              <View style={InputStyle.dropdown}>
                <DropDown
                  label={'Occupation'}
                  mode={'outlined'}
                  visible={showOccuptionDropDown}
                  showDropDown={() => setShowOccuptionDropDown(true)}
                  onDismiss={() => setShowOccuptionDropDown(false)}
                  value={occuptiondata}
                  setValue={value => {
                    setOccuptionData(value);
                  }}
                  list={occuption}
                  header={2}
                  error={occuptionValid ? true : false}
                />
              </View>
              <View style={InputStyle.dropdown}>
                <DropDown
                  label={'Income source'}
                  mode={'outlined'}
                  visible={showIncomeDropDown}
                  showDropDown={() => setShowIncomeDropDown(true)}
                  onDismiss={() => setShowIncomeDropDown(false)}
                  value={incomedata}
                  setValue={value => {
                    setIncomeData(value);
                  }}
                  list={income}
                  header={2}
                  error={incomesourceValid ? true : false}
                />
              </View>
              <PopupErrorModal ModalVisible={ModalVisible} setModalVisible={setModalVisible} error={result?.response_description}/>
              {/* <View style={InputStyle.dropdown}>
                <DropDown
                  label={'Classification'}
                  mode={'outlined'}
                  visible={showClassificationDropDown}
                  showDropDown={() => setShowClassificationDropDown(true)}
                  onDismiss={() => setShowClassificationDropDown(false)}
                  value={classificationdata}
                  setValue={value => {
                    setClassificationData(value);
                  }}
                  list={classification}
                  header={2}
                  error={classificationValid ? true : false}
                />
              </View> */}
              <TextInput
                label="Temporary Address"
                mode="outlined"
                theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                style={InputStyle.textInput}
                value={payload?.TEMPORARYADDRESS}
                onChangeText={TEMPORARYADDRESS =>
                  setPayload({...payload, TEMPORARYADDRESS})
                }
              />
              
            </View>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={buttonStyle.previous}
                  onPress={ handleSubmitPrevious}>
                  <Text style={textStyle.previousText}>Previous</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={buttonStyle.next} onPress={onSubmit}> */}
                <TouchableOpacity
                  style={buttonStyle.next}
                  onPress={handleSubmit}>
                  <Text style={textStyle.loginText}>Submit</Text>

                  <ActivityIndicator
                    animating={KYCLoading}
                    style={{alignSelf:'center',position:'absolute',marginTop:10}}
                    size={22}
                    color="#42A5F6"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Provider>
  );
};

individualStepFour.propTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.KycFormReducer,
});
export default connect(mapStatesToProps, {
  data,
  getOccuption,
  getClassification,
  getIncome,
  getkycResult,
})(individualStepFour);






















// import React, {useState, useEffect} from 'react';
// import {View, Text, TouchableOpacity, SafeAreaView,Alert,ActivityIndicator} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import containerStyle from '../../style/container';
// import buttonStyle from '../../style/button';
// import textStyle from '../../style/text';
// import InputStyle from '../../style/input';
// import {TextInput, Provider, DefaultTheme} from 'react-native-paper';
// import DropDown from 'react-native-paper-dropdown';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch, useSelector, connect} from 'react-redux';

// import PropTypes from 'prop-types';
// import {isEmpty} from 'lodash';

// import {
//   data,
//   getOccuption,
//   getClassification,
//   getIncome,
//   getkycResult,saveDataKyc
// } from '../../redux/actions/KycActions';
// const individualStepOne = ({
//   route,
//   getOccuption,
//   getClassification,
//   data,
//   getIncome,
// }) => {
//   const {kycDataByID} = useSelector(state => state.kyc);
//   const {result,kycData,KYCLoading} = useSelector(state => state.KycFormReducer);

//   const user = useSelector(state => state.auth.user);
//   const [showClassificationDropDown, setShowClassificationDropDown] =
//     useState(false);
//   const [showIncomeDropDown, setShowIncomeDropDown] = useState(false);
//   const [showOccuptionDropDown, setShowOccuptionDropDown] = useState(false);
//   const [income, setIncome] = useState([]);
//   const [incomedata, setIncomeData] = useState('');
//   const [classification, setClassification] = useState([]);
//   const [classificationdata, setClassificationData] = useState('');

//   const [occuption, setOccuption] = useState('');
//   const [occuptiondata, setOccuptionData] = useState('');
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const dataOneAll = route?.params?.dataOne;
  

//   const dataTwoAll = route?.params?.datatwo;
//   const dataThreeAll = route?.params?.datathree;



//   const kyc = !isEmpty(user) && user[0]?.KycId;
//   const kycnumber = !isEmpty(user) && user[0]?.KycNo;
//   const regid = !isEmpty(user) && user[0]?.Regd_ID;
//   const [occuptionValid, setOccuptionValid] = useState(false);
//   const [incomesourceValid, setIncomeSOurceValid] = useState(false);
//   const [classificationValid, setClassificationValid] = useState(false);


//   useEffect(() => {
//     if (occuptiondata) {
//       setOccuptionValid(false);
//     }
//   }, [occuptiondata]);

//   useEffect(() => {
//     if (incomedata) {
//       setIncomeSOurceValid(false);
//     }
//   }, [incomedata]);

//   useEffect(() => {
//     if (classificationdata) {
//       setClassificationValid(false);
//     }
//   }, [classificationdata]);

//   useEffect(() => {
//     fetchoccuptionData();
//   }, []);
//   const fetchoccuptionData = async () => {
//     getOccuption({});
//   };
//   useEffect(() => {
//     fetchclassificationData();
//   }, []);
//   const fetchclassificationData = async () => {
//     getClassification({});
//   };
//   useEffect(() => {
//     fetchIncomeData();
//   }, []);
//   const fetchIncomeData = async () => {
//     getIncome({});
//   };

//   useEffect(() => {
//     if (!isEmpty(data)) {
//       const getData = data;

//       const occuptdata = getData?.occup;

//       let occupLists = occuptdata?.data?.map((list, index) => ({
//         label: list?.DESCRIPTION,
//         value: list?.BUSSOCCPCODE,
//       }));
//       setOccuption(occupLists);

//       const classdata = getData?.class;

//       let classLists = classdata?.data?.map((list, index) => ({
//         label: list?.CLASSIFICATIONNAME,
//         value: list?.ID,
//       }));
//       setClassification(classLists);

//       const incomedata = getData?.incomesource;

//       let incomeLists = incomedata?.data?.map((list, index) => ({
//         label: list?.EDESC,
//         value: list?.ID,
//       }));
//       setIncome(incomeLists);
//     }
//   }, [data]);

//   const [payload, setPayload] = useState({
//     TEMPORARYADDRESS: '',
    
//     PANNO:''
//   });
//   useEffect(() => {
//     if (!isEmpty(kycData?.kycFour)) {
//       setPayload({
//         TEMPORARYADDRESS: kycData?.kycFour?.TEMPORARYADDRESS,
      
//         PANNO:  kycData?.kycFour?.PANNO
       
//       })

//       // setOccuption(kycData?.kycFour?.)
//       // setIncomeData(kycData?.kycFour?.)
//       // setClassificationData(kycData?.kycFour?.)
  
        
//     }
//   }, [kycData?.kycFour]);
 
//   useEffect(() => {
//     if (!isEmpty(kycDataByID)) {
//       setPayload({
//         PANNO: kycDataByID?.kycInformation?.PANNO,
//         TEMPORARYADDRESS:kycDataByID?.kycInformation?.TEMPORARYADDRESS
//       });
//       setOccuptionData(kycDataByID?.kycInformation?.OCCUPATIONCODE);
//       setIncomeData(kycDataByID?.kycInformation?.INCOMESOURCE);
//       setClassificationData(kycDataByID?.kycInformation?.CLASSIFICATIONID);
//     }
//   }, [kycDataByID]);
//   const handleSubmit = async () => {
//     var axios = require('axios');
//     var FormData = require('form-data');
//     var data = new FormData();

//     let body = [
//       {
//         KYCID: kyc,
//         KYCNO: kycnumber,
//         USERID: regid,
//         BRANCHCODE: '01',
//         INSUREDTYPE: 2, // 1 means corporate 2 means indivdual
//         ACCOUNTNAMECODE: '500',
//         KYCRiskCategory: '1',

//         INSUREDNAME_ENG: dataOneAll?.INSUREDNAME_ENG,
//         INSUREDNAME_NEP: dataOneAll?.INSUREDNAME_NEP,
//         DATEOFBIRTH: dataOneAll?.DATEOFBIRTH,
//         GENDER: dataOneAll?.GENDER,
//         MARITALSTATUS: dataOneAll?.MARITALSTATUS,
//         FATHERNAME: dataOneAll?.FATHERNAME,
//         WIFENAME: dataOneAll?.WIFENAME,
//         GRANDFATHERNAME: dataOneAll?.GRANDFATHERNAME,
       
//         HOMETELNO: dataTwoAll?.TELEPHONENO,
//         MOBILENO: dataTwoAll?.MOBILENO,
//         EMAIL: dataTwoAll?.EMAIL,
//         PROVINCEID: dataTwoAll?.PROVINCEID,
//         DISTRICTID: dataTwoAll?.DISTRICTID,
//         MUNICIPALITYCODE: dataTwoAll?.MUNICIPALITYCODE,  
//         WARDNO: dataTwoAll?.WARDNO,
//         HOUSENO: dataTwoAll?.HOUSENO,
//         ADDRESS: dataTwoAll?.ADDRESS,
   
       
      
     
//         CITIZENSHIPNO: dataThreeAll?.CITIZENSHIPNO,
//           ISSUE_DISTRICT_ID: dataThreeAll?.ISSUE_DISTRICT_ID,
//         ISSUEDATE: dataThreeAll?.ISSUEDATE,
      


//         kycclassification: classificationdata,
//         OCCUPATION: occuptiondata,
//         INCOMESOURCE: incomedata,
//         ...payload
//       },
//     ];
//     console.log("bodyKYC",body)
  
   

//     if (!classificationdata) {
//       setClassificationValid(true);
//     }
//     if (!incomedata) {
//       setIncomeSOurceValid(true);
//     }
//     if (!occuptiondata) {
//       setOccuptionValid(true);
//     }

//     if (
      
//       !classificationdata ||
//       !incomedata ||
//       !occuptiondata
//     ) {
//       return;
//     }
//     data.append('KYCDetails', JSON.stringify(body));

//     dispatch(getkycResult(data));
    
//   };
//   useEffect(()=>{
//   if(result?.response_code==0){
//     navigation.navigate('Dash');
//     Alert.alert(
//       'Information',
//       'KYC has been successfully  registered',
//       [
//         {
//           text: 'Okay',
//           onPress: () => console.log('Okay Pressed'),
//           style: 'cancel',
//         },
        
//       ],
//     )
//   }
//   },[result])

//   const theme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       background: 'white',
//     },
//   };

//   const handleSubmitPrevious = () => {
//     let bodyKYC = {
     
//       kycclassification: classificationdata,
//       OCCUPATION: occuptiondata,
//       INCOMESOURCE: incomedata,
//       ...payload
//     };
//     dispatch(saveDataKyc(bodyKYC,4))

//   navigation.navigate('KycIndividualStepThree')
   

//   }
//   return (
//     <Provider theme={theme}>
//       <SafeAreaView style={containerStyle.loginContainer}>
//         <KeyboardAwareScrollView>
//           <View style={{padding: 15}}>
//             <View>
//               <TextInput
//                 label="Pan Number"
//                 mode="outlined"
//                 keyboardType="numeric"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.PANNO}
//                 onChangeText={PANNO =>
//                   setPayload({...payload, PANNO})
//                 }
//               />
//               <View style={InputStyle.dropdown}>
//                 <DropDown
//                   label={'Occupation'}
//                   mode={'outlined'}
//                   visible={showOccuptionDropDown}
//                   showDropDown={() => setShowOccuptionDropDown(true)}
//                   onDismiss={() => setShowOccuptionDropDown(false)}
//                   value={occuptiondata}
//                   setValue={value => {
//                     setOccuptionData(value);
//                   }}
//                   list={occuption}
//                   header={2}
//                   error={occuptionValid ? true : false}
//                 />
//               </View>
//               <View style={InputStyle.dropdown}>
//                 <DropDown
//                   label={'Income source'}
//                   mode={'outlined'}
//                   visible={showIncomeDropDown}
//                   showDropDown={() => setShowIncomeDropDown(true)}
//                   onDismiss={() => setShowIncomeDropDown(false)}
//                   value={incomedata}
//                   setValue={value => {
//                     setIncomeData(value);
//                   }}
//                   list={income}
//                   header={2}
//                   error={incomesourceValid ? true : false}
//                 />
//               </View>

//               <View style={InputStyle.dropdown}>
//                 <DropDown
//                   label={'Classification'}
//                   mode={'outlined'}
//                   visible={showClassificationDropDown}
//                   showDropDown={() => setShowClassificationDropDown(true)}
//                   onDismiss={() => setShowClassificationDropDown(false)}
//                   value={classificationdata}
//                   setValue={value => {
//                     setClassificationData(value);
//                   }}
//                   list={classification}
//                   header={2}
//                   error={classificationValid ? true : false}
//                 />
//               </View>
//               <TextInput
//                 label="Temporary Address"
//                 mode="outlined"
//                 theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
//                 style={InputStyle.textInput}
//                 value={payload?.TEMPORARYADDRESS}
//                 onChangeText={TEMPORARYADDRESS =>
//                   setPayload({...payload, TEMPORARYADDRESS})
//                 }
//               />
              
//             </View>
//             <View>
//               <View
//                 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//                 <TouchableOpacity
//                   style={buttonStyle.previous}
//                   onPress={ handleSubmitPrevious}>
//                   <Text style={textStyle.previousText}>Previous</Text>
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity style={buttonStyle.next} onPress={onSubmit}> */}
//                 <TouchableOpacity
//                   style={buttonStyle.next}
//                   onPress={handleSubmit}>
//                   <Text style={textStyle.loginText}>Submit</Text>

//                   <ActivityIndicator
//                     animating={KYCLoading}
//                     style={{alignSelf:'center',position:'absolute',marginTop:10}}
//                     size={22}
//                     color="#42A5F6"
//                   />
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
//   data: PropTypes.object.isRequired,
// };
// const mapStatesToProps = state => ({
//   data: state.KycFormReducer,
// });
// export default connect(mapStatesToProps, {
//   data,
//   getOccuption,
//   getClassification,
//   getIncome,
//   getkycResult,
// })(individualStepOne);
