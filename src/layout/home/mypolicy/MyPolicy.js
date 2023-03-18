import React, {useState, useEffect} from 'react';
import {List, Modal, Portal, Button, Provider,} from 'react-native-paper';
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator, PermissionsAndroid,
  Alert,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {getCheckPolicy, data} from '../../../redux/actions/CheckPolicyAction';
import accordionStyle from '../../../style/accordion';

// import textStyle from '../../style/text';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import PolicyDetails from '../../checkpolicy/PolicyDetails';
import {useNavigation} from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
const getPolicy = ({getCheckPolicy, data}) => {
  const [surveyorModalVisible, setSurveyorModalVisible] = useState(false);
  const navigation = useNavigation();
  const handleSurveyorModalPress = () => setSurveyorModalVisible(true);
  const user = useSelector(state => state.auth.user);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = React.useState(true);
  const [policy, setPolicy] = useState();
  const handlePress = () => setExpanded(!expanded);
  const {checkpolicy} = useSelector(state => state.CheckPolicyReducer);
  const [policynumber, setPolicyNumber] = useState('');
  const [docnumber, setDocNumber] = useState('');
 
  const [predata, setPreData] = useState([]);
  const filepathdata = predata.filePath;
 
  useEffect(() => {
    let i = 0;
    if (!isEmpty(checkpolicy)) {
      setLoading(false);
      setPolicy(checkpolicy);
    } else {
      setLoading(true);
    }
  }, [checkpolicy]);

  const kyc = user[0]?.KycId;

  useEffect(() => {
    if (isEmpty(user)) {
      navigation.navigate('Login');
    } else {
      fetchMetaData();
    }
  }, []);
  const fetchMetaData = async () => {
    getCheckPolicy({
        // KYCID: '786452',
      KYCID: kyc,
      // "KYCNO": "IGI/01/076/077/101000169838"
    });
  };

  useEffect(() => {
    PreView(docnumber);
  }, [docnumber]);
  const PreView = () => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: `http://203.78.165.19:9078/api/reports/PreviewDocument?docid=${docnumber}`,
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
  const REMOTE_IMAGE_PATH = `http://203.78.165.19:9078${filepathdata}`;

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
   const dataNumberActive =!isEmpty(policy) && policy?.data?.ActivePolicyList
   const dataNumberActiveExpired =!isEmpty(policy) && policy?.data?.ExpiredPolicyList
   const dataNumberActiveCollection =!isEmpty(policy) && policy?.data?.CollectionPendingList
  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: 10}}>
      <ScrollView>
        <List.Accordion
          title={'1.  Active Policy List' + '   ' +'('+ dataNumberActive?.length +')' }
          style={accordionStyle.header}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#F57722"
              style={{marginTop: 100}}
            />
          ) : (
            <View style={{padding: 5}}>
              {!isEmpty(policy) &&
                policy?.data?.ActivePolicyList.map((policydata, i) => (
                  <View style={{padding: 5}}>
                    <List.Accordion
                      title={policydata.SN + ')' + '  ' + policydata.POLICYNO}
                      style={{
                        borderRadius: 4,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                      }}>
                      <View
                        style={{
                          width: '100%',

                          borderRadius: 5,

                          backgroundColor: '#F5F7F9',
                          elevation: 5,
                        }}>
                        <View style={accordionStyle.accordionContentSectiones}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Policy No.
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {policydata.POLICYNO}
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Insured Name
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {policydata.INSUREDNAME}
                            </Text>
                          </View>
                        </View>
                        <View style={accordionStyle.accordionContentSectiones}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Class Name
                            </Text>

                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {policydata.CLASSNAME}
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Amount
                            </Text>

                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {policydata.AMOUNT}
                            </Text>
                          </View>
                        </View>
                        <View style={accordionStyle.accordionContentSectiones}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Created Date
                            </Text>

                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {policydata.CREATEDDATE}
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Expiry Date
                            </Text>

                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {policydata.EXPIRYDATE}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingStart: 15,
                            paddingEnd: 30,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#F57722',
                                borderRadius: 4,
                                paddingVertical: 10,

                                // flexDirection: 'row',
                                paddingLeft: 5,
                                paddingRight: 5,
                                // width: '30%',
                                marginBottom: 10,
                              }}
                              // onPress={() => handleSurveyorModalPress()}>
                              onPress={() => {
                                setDocNumber(policydata.DOCID);
                                checkPermission()
                              }}
                            
                              >
                              <Text>Download Pdf</Text>
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#F57722',
                                borderRadius: 4,
                                paddingVertical: 10,

                                // flexDirection: 'row',
                                paddingLeft: 5,
                                paddingRight: 5,
                                // width: '30%',
                                marginBottom: 10,
                              }}
                              // onPress={() => handleSurveyorModalPress()}>
                              onPress={() => {
                                setPolicyNumber(policydata.POLICYNO);
                                handleSurveyorModalPress({
                                  paramKey: policydata.POLICYNO,
                                });
                              }}>
                              <Text>View Details</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </List.Accordion>
                  </View>
                ))}
            </View>
          )}
        </List.Accordion>
        <View style={{marginTop: 10}} />
        <List.Accordion
          title={"2.  Expired Policy List" +'   '+ '('+dataNumberActiveExpired?.length + ')'}
          style={accordionStyle.header}>
          {!isEmpty(policy) &&
            policy?.data?.ExpiredPolicyList.map((policydata, i) => (
              <View style={{padding: 5, paddingLeft: 10, paddingRight: 10}}>
                <List.Accordion
                  title={
                    !isEmpty(policydata.POLICYNO)
                      ? policydata.POLICYNO
                      : 'Policy Number Empty'
                  }
                  style={{
                    borderRadius: 4,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                  }}>
                  <View
                    style={{
                      width: '100%',

                      borderRadius: 5,

                      backgroundColor: '#F5F7F9',
                      elevation: 5,
                    }}>
                    <View style={accordionStyle.accordionContentSectiones}>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Policy No.
                        </Text>
                        <Text style={accordionStyle.accordionContentHeaders}>
                          {!isEmpty(policydata.POLICYNO)
                            ? policydata.POLICYNO
                            : 'Policy Number Empty'}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Insured Name
                        </Text>
                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.INSUREDNAME}
                        </Text>
                      </View>
                    </View>
                    <View style={accordionStyle.accordionContentSectiones}>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Class Name
                        </Text>

                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.CLASSNAME}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Amount
                        </Text>

                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.AMOUNT}
                        </Text>
                      </View>
                    </View>
                    <View style={accordionStyle.accordionContentSectiones}>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Created Date
                        </Text>

                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.CREATEDDATE}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Expiry Date
                        </Text>

                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.EXPIRYDATE}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingStart: 15,
                        paddingEnd: 15,
                      }}>
                      <View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#F57722',
                            borderRadius: 4,
                            paddingVertical: 10,

                            paddingLeft: 5,
                            paddingRight: 5,
                            width: '100%',
                            marginBottom: 10,
                          }}
                          // onPress={() => handleSurveyorModalPress()}>
                          onPress={() => navigation.navigate('RenewalForm')}>
                          <Text>Renewal</Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#F57722',
                            borderRadius: 4,
                            paddingVertical: 10,

                            paddingLeft: 5,
                            paddingRight: 5,
                            width: '100%',
                            marginBottom: 10,
                          }}
                          // onPress={() => handleSurveyorModalPress()}>
                          onPress={() => {
                            setPolicyNumber(policydata.POLICYNO);
                            handleSurveyorModalPress({
                              paramKey: policydata.POLICYNO,
                            });
                          }}>
                          <Text>View Details</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </List.Accordion>
              </View>
            ))}
        </List.Accordion>
        <View style={{marginTop: 10}} />
        <List.Accordion
          title={"3.  Collection Pending List" +'   '+'(' +dataNumberActiveCollection?.length +')'}
          style={accordionStyle.header}>
          {!isEmpty(policy) &&
            policy?.data?.CollectionPendingList.map((policydata, i) => (
              <View style={{padding: 5, paddingLeft: 10, paddingRight: 10}}>
                <List.Accordion
                  title={
                    !isEmpty(policydata.POLICYNO)
                      ? policydata.POLICYNO
                      : 'Policy Number Empty'
                  }
                  style={{
                    borderRadius: 4,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                  }}>
                  <View
                    style={{
                      width: '100%',

                      borderRadius: 5,

                      backgroundColor: '#F5F7F9',
                      elevation: 5,
                    }}>
                    <View style={accordionStyle.accordionContentSectiones}>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Policy No.
                        </Text>
                        <Text style={accordionStyle.accordionContentHeaders}>
                          {!isEmpty(policydata.POLICYNO)
                            ? policydata.POLICYNO
                            : 'Policy Number Empty'}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Insured Name
                        </Text>
                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.INSUREDNAME}
                        </Text>
                      </View>
                    </View>
                    <View style={accordionStyle.accordionContentSectiones}>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Class Name
                        </Text>

                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.CLASSNAME}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Amount
                        </Text>

                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.AMOUNT}
                        </Text>
                      </View>
                    </View>
                    <View style={accordionStyle.accordionContentSectiones}>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Created Date
                        </Text>

                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.CREATEDDATE}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text style={accordionStyle.accordionContentHeader}>
                          Expiry Date
                        </Text>

                        <Text style={accordionStyle.accordionContentHeaders}>
                          {policydata.EXPIRYDATE}
                        </Text>
                      </View>
                    </View>
                    <View style={{alignSelf: 'flex-end', paddingEnd: 10}}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#F57722',
                          borderRadius: 4,
                          paddingVertical: 10,

                          flexDirection: 'row',
                          paddingLeft: 5,
                          paddingRight: 5,
                          width: '30%',
                          marginBottom: 10,
                        }}
                        // onPress={() => handleSurveyorModalPress()}>
                        onPress={() => {
                          setPolicyNumber(policydata.POLICYNO);
                          handleSurveyorModalPress({
                            paramKey: policydata.POLICYNO,
                          });
                        }}>
                        <Text>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </List.Accordion>
              </View>
            ))}
        </List.Accordion>
      </ScrollView>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={surveyorModalVisible}
        onRequestClose={() => {
          setSurveyorModalVisible(!surveyorModalVisible);
        }}>
        <View style={{height: '100%', width: '100%'}}>
          <View
            style={{
              marginTop: 20,
              backgroundColor: '#fff',
              height: '100%',
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#C7C7CC',
                paddingVertical: 10,
                // backgroundColor:'red'
              }}>
              <Text style={{fontWeight: '500', fontSize: 15}}>
                Policy Details
              </Text>
              <Pressable
                onPress={() => setSurveyorModalVisible(!surveyorModalVisible)}>
                <View
                  style={{
                    // backgroundColor: '#C7C7CC',
                    borderRadius: 1000,
                    padding: 5,
                  }}>
                  <Icon name="close" size={20} color="#9393AA" />
                </View>
              </Pressable>
            </View>

            <PolicyDetails policy={policynumber} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

getPolicy.propTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.CheckPolicyReducer,
});
export default connect(mapStatesToProps, {
  getCheckPolicy,
  data,
})(getPolicy);
