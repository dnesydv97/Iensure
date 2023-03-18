import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import containerStyle from '../../style/container';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import InputStyle from '../../style/input';
import imageStyle from '../../style/image';
import {useNavigation} from '@react-navigation/native';
import {Provider, DefaultTheme} from 'react-native-paper';
import moment from 'moment';
import {MyKYCDetails} from '../../redux/actions/MyPolicyAction';
import {
  ClaimIntimationAction,
  claimintimationlist,
} from '../../redux/actions/ClaimIntimationAction';
import DocumentUpload from './DocumentUpload';
// import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {Picker} from '@react-native-picker/picker';
import {getCheckPolicy} from '../../redux/actions/CheckPolicyAction';
import accordionStyle from '../../style/paypremium';
const ClaimIntimation = () => {
  const user = useSelector(state => state.auth.user);
  const {checkpolicy} = useSelector(state => state.CheckPolicyReducer);
 
  const {claimLoading, claim} = useSelector(
    state => state.ClaimIntimationReducer,
  );
 
  const dispatch = useDispatch();
  // const [currentLongitude, setCurrentLongitude] = useState('...');
  const {details} = useSelector(state => state.MyPolicyReducer);
  // const [currentLatitude, setCurrentLatitude] = useState('...');
  // const [locationStatus, setLocationStatus] = useState('');
  const [singleFile, setsingleFile] = useState([]);
  const [dob, setDob] = useState(moment().format('YYYY/MM/DD'));
  const [remark, setRemark] = useState('');
  // const [storeData, setStoreData] = useState();
  const [filePath, setFilePath] = useState({});
  const [payload, setPayload] = useState({});
  const kyc = user[0]?.KycId;
  const Regd = user[0]?.Regd_ID;
  const name = user[0]?.FullName;
  const contact = user[0]?.MobileNo;
  const [photo, setPhoto] = useState(false);
  const [validRemark, setvalidRemark] = useState(false);
  const [dateloss, setDateLoss] = useState(false);
  const [validPolicy, setValidPolicy] = useState(false);
  useEffect(() => {
    dispatch(getCheckPolicy({KYCID: kyc}));
  }, [getCheckPolicy]);

 
  useEffect(() => {
    dispatch(
      MyKYCDetails({
        KYCID: kyc,
      }),
    );
  }, [MyKYCDetails,kyc]);

  useEffect(() => {
    if (details?.kycInformation?.DISTRICTID) {
      setPayload({
        KYCID: kyc,
        USERID: Regd,

        NAME: name,
        POLICYNO: '',

        CONTACTNO: contact,
        // VEHICLENO: 'bhe 69 pa 1234',
        // PROVINCEID: 7,
        DISTRICTID: details?.kycInformation?.DISTRICTID,
        MNUVDCID: !isEmpty(details) && details?.kycInformation?.MNUVDC,
        WARDNO: !isEmpty(details) && details?.kycInformation?.WARDNO,
        // ADDRESS: location,
      });
    }
  }, [details]);

  const navigation = useNavigation();
  useEffect(() => {
    if (!isEmpty(payload.POLICYNO)) {
      setValidPolicy(false);
    }
  }, [payload.POLICYNO]);
  useEffect(() => {
    if (!isEmpty(singleFile)) {
      setPhoto(false);
    }
  }, [singleFile]);
  useEffect(() => {
    if (!isEmpty(remark)) {
      setvalidRemark(false);
    }
  }, [remark]);
  useEffect(() => {
    if (!isEmpty(dob)) {
      setDateLoss(false);
    }
  }, [dob]);

  const handleSubmit = () => {
    if (isEmpty(payload.POLICYNO)) {
      setValidPolicy(true);
    }

    if (isEmpty(singleFile)) {
      setPhoto(true);
    }
    if (isEmpty(remark)) {
      setvalidRemark(true);
    }
    if (isEmpty(dob)) {
      setDateLoss(true);
    }
    if (
      isEmpty(singleFile) ||
      isEmpty(remark) ||
      isEmpty(dob) ||
      isEmpty(payload.POLICYNO)
    ) {
      return;
    }
    let body = {
      ...payload,
      DateOfLoss: dob,
      REMARK: remark,
    };
    const formdata = new FormData();
    formdata.append('ClaimDetails', JSON.stringify(body));
    singleFile.forEach((data, i) => {
      formdata.append('file', singleFile[i]);
    });

   
    dispatch(ClaimIntimationAction(formdata));
  };

  
// console.log("claim response", claim)
  useEffect(() => {
    if (!isEmpty(claim) && claim?.response_code == 0)
      navigation.navigate('ClaimIntimationList');
  }, [claim]);
  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           //To Check, If Permission is granted
  //           getOneTimeLocation();
  //           subscribeLocationLocation();
  //         } else {
  //           setLocationStatus('Permission Denied');
  //         }
  //       } catch (err) {
  //         // console.warn(err);
  //       }
  //     }
  //   };
  //   requestLocationPermission();
  //   return () => {
  //     // Geolocation.clearWatch(watchID);
  //   };
  // }, []);

  // const getOneTimeLocation = () => {
  //   setLocationStatus('Getting Location ...');
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setLocationStatus('You are Here');
  //       const currentLongitude = JSON.stringify(position.coords.longitude);
  //       const currentLatitude = JSON.stringify(position.coords.latitude);
  //       setCurrentLongitude(currentLongitude);
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     error => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 1000,
  //     },
  //   );
  // };

  // useEffect(() => {
  //   address(currentLatitude);
  // }, [currentLatitude]);
  // const address = currentLatitude => {
  //   var axios = require('axios');

  //   var config = {
  //     method: 'get',
  //     url:
  //       'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
  //       `${currentLatitude}` +
  //       ',' +
  //       `${currentLongitude}` +
  //       '&key=AIzaSyBqvqx9YLLWbsDVV--wuDCtHSKxVX6x51s',
  //     headers: {},
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       const data = response.data;
  //       setStoreData(data);
  //       // console.log( JSON.stringify(response.data.results[0].address_components[0].long_name + ' '+ response.data.results[0].address_components[2].long_name));
  //       console.log('location data', response.data);
  //     })
  //     .catch(function (error) {
  //       // console.log(error);
  //     });
  // };
  // const location =
  //   !isEmpty(storeData) &&
  //   storeData?.results[0].address_components[0]?.long_name +
  //     ' ' +
  //     !isEmpty(storeData) &&
  //   storeData?.results[0]?.address_components[2]?.long_name;

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const onOkviewList = () => {
    navigation.navigate('ClaimIntimationList');
    dispatch(claimintimationlist({KYCID: kyc}));
  };
 
  return (
    <Provider theme={theme}>
      <SafeAreaView style={containerStyle.loginContainer}>
        <KeyboardAwareScrollView>
          <View style={{padding: 15}}>
            <View>
              <View style={InputStyle.geoLocation}>
                {/* <Text style={textStyle.currentLatitude}>{location}</Text> */}
                <Text style={textStyle.currentLatitude}>Kathmandu</Text>

                <Image
                  style={imageStyle.location}
                  source={require('../../assets/location.png')}
                />
              </View>
              <View
                style={[validPolicy ? textStyle.redBorder : textStyle.picker]}>
                <Picker
                  selectedValue={payload.POLICYNO}
                  onValueChange={POLICYNO => setPayload({...payload, POLICYNO})}
                  mode="dialog"
                  numberOfLines={3}
                  style={{
                    height: 40,
                    width: '102%',
                    marginLeft: -15,
                  }}>
                  <Picker.Item
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      fontSize: 16,
                      fontFamily: 'Open Sans',
                      lineHeight: 16.06,
                      alignItems: 'center',
                      fontWeight: '600',
                    }}
                    // key={SN || Date.now()}
                    label={'Select Policy Number'}
                  />
                  {!isEmpty(checkpolicy) &&
                    checkpolicy?.data?.ActivePolicyList.map(
                      ({POLICYNO, SN, CLASSNAME,VEHICLENO}) => (
                        <Picker.Item
                          style={{
                            color: '#212121',
                            fontSize: 14,
                            fontFamily: 'Open Sans',
                            lineHeight: 16.06,
                            alignItems: 'center',
                            fontWeight: '400',
                          }}
                          key={SN || Date.now()}
                          label={POLICYNO + '   ' + CLASSNAME +' '+ VEHICLENO}
                          value={POLICYNO}

                        />
                      ),
                    )}
                </Picker>
              </View>
              <DocumentUpload
                payload={payload}
                setsingleFile={setsingleFile}
                singleFile={singleFile}
                filePath={filePath}
                photo={photo}
                setPhoto={setPhoto}
                validRemark={validRemark}
                setvalidRemark={setvalidRemark}
                setFilePath={setFilePath}
                remark={remark}
                setRemark={setRemark}
                setDob={setDob}
                dob={dob}
                dateloss={dateloss}
                setDateLoss={setDateLoss}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={buttonStyle.addMore}
                  onPress={() => {
                    dispatch(claimintimationlist({KYCID: kyc}));
                    !isEmpty(payload.POLICYNO) ||
                    !isEmpty(singleFile) ||
                    !isEmpty(remark)
                      ? // !isEmpty(dob)
                        Alert.alert(
                          'Information',
                          'Are you sure you want to switch to claim initimation list.',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                onOkviewList();
                              },
                            },
                          ],
                        )
                      : navigation.navigate('ClaimIntimationList');
                  }}>
                  <Text style={textStyle.previousText}>View List</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View>
                <TouchableOpacity
                  // style={buttonStyle.login}
                  style={
                    claimLoading
                      ? accordionStyle.bottondis
                      : accordionStyle.botton
                  }
                  onPress={handleSubmit}>
                  <Text style={textStyle.loginText}>Apply</Text>
                  <ActivityIndicator
                    animating={claimLoading}
                    style={{right: 26}}
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

export default ClaimIntimation;
