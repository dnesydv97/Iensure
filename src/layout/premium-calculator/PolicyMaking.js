import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {POLICY_MAKING_API} from '../../redux/api/PremiumCalculatorFormApi';
import {isEmpty} from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';
import accordionStyle from '../../style/accordion';
import {useNavigation} from '@react-navigation/native';
import crypto from 'crypto-js';
import {useSelector} from 'react-redux';
import { element } from 'prop-types';

const PolicyCalculator = ({route}) => {
  const [storeData, setStoreData] = useState([]);
  
  const [predata, setPreData] = useState([]);
  const filepathdata = predata.filePath;
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const kyc = user[0]?.KycId;
  const RegdId = user[0]?.Regd_ID;
  const AcceptanceNumber =
    !isEmpty(storeData.data) && storeData?.data[0]?.AcceptanceNo;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    PreView(AcceptanceNumber);
  }, [AcceptanceNumber]);
  const PreView = AcceptanceNumber => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: `http://203.78.165.19:9078/api/reports/PreviewDocument?docid=${AcceptanceNumber}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        if (response.data) {
          const view = response.data;
          setPreData(view);
        }
      })
      .catch(function (error) {});
  };

  const REMOTE_IMAGE_PATH =
    // 'http://203.78.160.19:9198/api/Reports/PreviewDocument?docid=781463.pdf'
    `http://203.78.165.19:9078/${filepathdata}`;
  //  const n =parseFloat(1700).toFixed(2)

  const Test = () => {
    let obj = {
      A_USERID: 'PICL@BEEMA',
      B_PASSWORD: 'PICL@BEEMA@123!@#',
      C_KYCID: kyc,
      D_CLASSID: 21,
      E_AMOUNT: 10.23,
    };
  
    let key = '490ea249-c31b-4fd0-9900-b27e34bf6cf5';
    //obj.E_AMOUNT=2000.10;

    let string = JSON.stringify(obj);

    return crypto.HmacSHA512(string, key).toString();
  };

  function handleBackButtonClick() {
    navigation.navigate('Dash');
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

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage();
        } else {
          Alert.alert('Information', 'Storage Permission Not Granted.', [
            {
              text: 'Okay',
              onPress: () => console.log('Cancel Pressed'),
              style: 'Okay',
            },
          ]);
        }
      } catch (err) {}
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = REMOTE_IMAGE_PATH;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        Alert.alert('Information', 'Image Downloaded Successfully.', [
          {
            text: 'Okay',
            onPress: () => console.log('Cancel Pressed'),
            style: 'Okay',
          },
        ]);
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const imeData = !isEmpty(route) && route?.params?.paramKey;
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {

    var axios = require('axios');
    var data = JSON.stringify({
      
      transactionDetail: {
        RefId: imeData.referenceid,
        UserId: RegdId,
        KycId: kyc,
        ResponseCode: imeData.responsecode,
        MerchantCode: 'PICL@BEEMA',
        ResponseDescription: imeData.responsedescription,
        Msisdn: imeData.msisdn,
        TokenId: imeData.tokenid,
        TransactionId: imeData.transcationid,
        Amount: imeData.transcationamount,
      },
    
    });
   

    var config = {
      method: 'post',
      url: POLICY_MAKING_API,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic UElDTEBCRUVNQTpQSUNMQEJFRU1BQDEyMyFAIw==',
      },
      data: data,
     
    };

    axios(config)
      .then(function (response) {
        const data1 = response.data;
        setStoreData(data1);
      })
      .catch(function (error) {});
  };
  useEffect(() => {
    if (!isEmpty(storeData)) {
      setLoading(false);
      setStoreData(storeData);
    } else {
      setLoading(true);
    }
  }, [storeData]);
 
  const list = () => {
    return (
      !isEmpty(storeData.data) &&
      storeData.data.map(element => {
        return (
          <View>
            <View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Receipt Date
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.receiptDate}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Receipt No.
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.receiptNo}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Status
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.FLAG}
                  </Text>
                </View>
              </View>

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Insured Name
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.insured}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                 Class
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.ClassName}
                  </Text>
                </View>
              </View>

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Sum Insured
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Rs.{' '}
                    {parseFloat(element.Suminsured)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Policy No.
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.policyNo}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Acceptance No.
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.AcceptanceNo}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Proforma No.
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.proformano}
                  </Text>
                </View>
              </View>

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Effective Date
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.effectiveDate}
                  </Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Expiry Date
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    {element.expiryDate}
                  </Text>
                </View>
              </View>

              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '40%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Premium Amount
                  </Text>
                </View>
                <View>
                  <Text>:</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Rs.{' '}
                    {parseFloat(element.tpPremium)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#F57722"
          style={{marginTop: 200}}
        />
      ) : (
        <View
          style={{
            paddingTop: 15,
            borderRadius: 8,
            padding: 5,
            backgroundColor: 'rgba(243, 243, 243, 1)',
            marginTop: 10,
            elevation: 5,
          }}>
          <Text
            style={{
              color: '#02D724',
              fontSize: 14,
              lineHeight: 22,
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: 16,
            }}>
            PAYMENT SUCCESSFUL
          </Text>
          {list()}
        </View>
      )}
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#F57722',
            borderRadius: 5,
            padding: 10,
            // alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 10,
            width: '100%',
            // marginLeft: 40,
          }}
          onPress={checkPermission}>
          <Text style={{color: 'white', fontSize: 15}}>Download Policy</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            padding: 10,
            borderWidth: 1,
            // alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',

            marginBottom: 30,
            width: '100%',
            // marginLeft: 40,
          }}
          onPress={() => navigation.navigate('Dash')}>
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.6)',
              lineHeight: 19.5,
              fontSize: 16,
              fontWeight: '400',
              fontFamily: 'Montserrat',
            }}>
            Go to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
PolicyCalculator['navigationOptions'] = screenProps => ({
  headerRight: () => (
    <Button
      onPress={() => alert('This is a button!')}
      title="Info"
      color="#fff"
    />
  ),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
export default PolicyCalculator;
