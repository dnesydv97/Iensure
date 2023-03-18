import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
  Linking,
  ScrollView,
  Alert,
  Platform,BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import VersionIcon from 'react-native-vector-icons/Octicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import textStyle from '../../../style/text';
import {Avatar} from 'react-native-paper';
import AvatarUpload from '../../../components/kyc/AvatarUpload';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import {Card, Modal, ApplicationProvider} from '@ui-kitten/components';
import {getKycById, getProfileUpload} from '../../../redux/actions/KycActions';
import * as eva from '@eva-design/eva';
import {isEmpty} from 'lodash';


const Setting = ({logout, getKycById}) => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth);


  const user = useSelector(state => state.auth.user);
  const Regd = !isEmpty(user) && user[0]?.Regd_ID;
  const kyc = !isEmpty(user) && user[0]?.KycId;

  const {getprofile, profile} = useSelector(state => state.KycFormReducer);
  const dispatch = useDispatch();
  
  const updateKYC = async () => {
    getKycById({
      KYCID: kyc,
    });
    navigation.navigate('KycIndividualStepOne');
  };

  useEffect(() => {
    dispatch(getProfileUpload({Regd_ID: Regd}));
  }, [profile]);
  const editProfile = () => {
    return (
      <TouchableOpacity onPress={updateKYC}>
        <Text style={{textAlign: 'center', color: '#F57722', marginTop: 3}}>
          Update KYC &nbsp;
          <FeatherIcon
            name="edit"
            color={'#F57722'}
            size={13}
            style={{marginRight: 5}}
          />
        </Text>
      </TouchableOpacity>
    );
  };
  const login = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{textAlign: 'center', color: '#F57722', marginTop: 3}}>
          logIn &nbsp;
          <FeatherIcon
            name="log-in"
            color={'#F57722'}
            size={13}
            style={{marginRight: 5}}
          />
        </Text>
      </TouchableOpacity>
    );
  };
  const LoggedInUser = () => {
    const [visible, setVisible] = React.useState(false);
const [visiblePrivacy, setVisiblePrivacy] = React.useState(false)
useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      setVisiblePrivacy(false)
setVisible(false)
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []),
);
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView
          style={{
            backgroundColor: '#FAFAfA',
            height: '100%',
            paddingTop: 15,
          }}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <AvatarUpload imageHeight={styles.Imageheig} imageHeightContainer={styles.imageHeightContainer}size={100} camera={true}/>
            <View>
              <Text
                style={{fontWeight: '600', fontSize: 16, textAlign: 'center'}}>
                {userData.authenticated
                  ? userData.user[0].FullName
                  : 'User Not Logged in'}
              </Text>
              {userData.authenticated ? editProfile() : login()}
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 5,
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => userData.authenticated? navigation.navigate('About'):login()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/settings/about.png')}
                    size={10}
                  />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '400'}}>
                    Kyc Details
                  </Text>
                </View>
                <FeatherIcon
                  name="chevron-right"
                  color={'#9C9C9C'}
                  size={20}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            visible={visible}
            style={{
              padding: 10,
              maxHeight: '100%',
              marginTop: -20,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            ScrollView={true}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginTop: -10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                }}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                  Terms and Condition
                </Text>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <AntIcon name="close" size={20} color="#9393AA" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#C4C4C4',
                  marginBottom: 10,
                }}
              />

              <Text
                style={{
                  justifyContent: 'center',
                  textAlign: 'justify',
                  marginBottom: 10,
                }}>
                Where we are making a personal recommendation based on a fair
                and personal analysis, we will examine sufficient insurance
                contracts, based upon cover, premiums and service. In all other
                cases for example, when we conduct a limited search, or offer no
                advice or personal recommendation, or where we are contractually
                bound to offer a particular insurer, we may offer a contract
                from a single insurer. A list of the insurers we deal with is
                available on our website. Where a sale is completed online, we
                do not give advice or make a personal recommendation. We may use
                another insurance intermediary to help place your business offer
                a contract from a single insurer. A list of the insurers we deal
                with is available on our website. Where a sale is completed
                online, we do not give advice or make a personal recommendation.
                We may use another insurance intermediary to help place your
                business
              </Text>

              <TouchableOpacity onPress={() => setVisible(false)}>
                <View
                  style={{
                    backgroundColor: '#F57722',
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderRadius: 10,
                  }}>
                  <Text style={{alignSelf: 'center', color: '#FFFF'}}>
                    DISMISS
                  </Text>
                </View>
              </TouchableOpacity>
            </Card>
          </Modal>

          <View
            style={{
              marginBottom: 20,
              backgroundColor: 'white',
              paddingVertical: 5,
              paddingHorizontal: 15,
              justifyContent: 'space-between',
            }}>
           

            <TouchableOpacity onPress={() => setVisible(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/settings/terms-condition.png')}
                    size={10}
                  />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '400'}}>
                    Terms & Condition
                  </Text>
                </View>
                <FeatherIcon
                  name="chevron-right"
                  color={'#9C9C9C'}
                  size={20}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>
            <Modal
            visible={visiblePrivacy}
            style={{
              padding: 10,
              maxHeight: '100%',
              marginTop: -20,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            ScrollView={true}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisiblePrivacy(false)}>
            <Card disabled={true}>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginTop: -10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                }}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                 Privacy Policy
                </Text>
                <TouchableOpacity onPress={() => setVisiblePrivacy(false)}>
                  <AntIcon name="close" size={20} color="#9393AA" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#C4C4C4',
                  marginBottom: 10,
                }}
              />

              <Text
                style={{
                  justifyContent: 'center',
                  textAlign: 'justify',
                  marginBottom: 10,
                }}>
              Easily generate and manage a Privacy and Cookie Policy that is professional, self-updating and customizable from 1700+ clauses, available in 10 languages, drafted by an international legal team and up to date with the main international legislations.
              </Text>

              <TouchableOpacity onPress={() => setVisiblePrivacy(false)}>
                <View
                  style={{
                    backgroundColor: '#F57722',
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderRadius: 10,
                  }}>
                  <Text style={{alignSelf: 'center', color: '#FFFF'}}>
                    DISMISS
                  </Text>
                </View>
              </TouchableOpacity>
            </Card>
          </Modal>

            <TouchableOpacity
             onPress={() => setVisiblePrivacy(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/settings/privacy-policy.png')}
                    size={10}
                  />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '400'}}>
                    Privacy Policy
                  </Text>
                </View>
                <FeatherIcon
                  name="chevron-right"
                  color={'#9C9C9C'}
                  size={20}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS != 'ios') {
                  Linking.openURL(
                    `https://play.google.com/store/apps/details?id=com.ensure`,
                  ).catch(err => alert('Please check for Google Play Store'));
                } else {
                  Linking.openURL(
                    `itms://itunes.apple.com/in/app/apple-store/`,
                  ).catch(err => alert('Please check for the App Store'));
                }
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    name="system-update"
                    size={20}
                    color="#9393AA"
                    style={{
                      backgroundColor: 'red',
                      padding: 7,
                      borderRadius: 4,
                    }}
                  />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '400'}}>
                    Check for Update
                  </Text>
                </View>
                <FeatherIcon
                  name="chevron-right"
                  color={'#9C9C9C'}
                  size={20}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>
           
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <VersionIcon
                    name="versions"
                    size={22}
                    color="#9393AA"
                    style={{
                      backgroundColor: '#4169e1',
                      padding: 7,
                      borderRadius: 4,
                    }}
                  />
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '400'}}>
                    Version
                  </Text>
                </View>
               <Text>1.4</Text>
              </View>
           
          </View>
          {userData.authenticated ? (
            <TouchableOpacity
              onPress={logout}
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
              }}>
              <Icon name="logout" color={'#F57722'} size={26} />
              <Text style={textStyle.logoutText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </SafeAreaView>
      </ApplicationProvider>
    );
  };
  return <LoggedInUser />;
};
// Setting.defaultProps = {
//   kyc: false,
// };
// Setting.propTypes = {
//   /** A function to change navigation helper */
//   logout: PropTypes.func.isRequired,

//   getKyc: PropTypes.func.isRequired,
// };
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
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '35%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
const mapStatesToProps = state => ({
  data: state.KycFormReducer,
});
export default connect(mapStatesToProps, {
  getKycById,
})(Setting);
