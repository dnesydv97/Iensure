import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import containerStyle from '../../style/container';
import imageStyle from '../../style/image';
import textStyle from '../../style/text';

import DashboardCarousel from '../../components/carousel/DashboardCarousel';
import Header from '../../components/header/HeaderComponent';

import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '../../components/NetInfo';
import {isEmpty} from 'lodash';
import {authRemover,clear} from '../../redux/actions/AuthAction';
import {ScrollView} from 'react-native-gesture-handler';

const Dashboard = ({goToClaimIntimation, userName}) => {
  const user = useSelector(state => state.auth.user);
  const staffid = !isEmpty(user) && user[0]?.StaffId;
  const kyc = !isEmpty(user) && user[0]?.KycId;

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  function handlePress() {
    setModalVisible(false);
  }

  useEffect(() => {
    const detectLogin = async () => {
      // if (Object.keys(user).length != 0) {
      //   if (kyc == 0) {
      //     setModalVisible(true);
      //   } else {
      //     setModalVisible(false);
      //   }
      // } else {
      //   setModalVisible(false);
      // }
      if (!isEmpty(user)) {
        if (user[0].KycId !== 0) {
          setModalVisible(false);
        } else {
          setModalVisible(true);
        }
      }
    };
    detectLogin();

    return () => {
     

      // dispatch(authRemover());
    };
  }, [kyc]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit?',

          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                dispatch(clear());

                BackHandler.exitApp();
              },
            },
          ],
        );

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <View style={{backgroundColor: '#FAFAfA', height: '100%'}}>
      <NetInfo />
      <Header name={userName} />

      <DashboardCarousel />

      {staffid == null ? (
        <View
          contentContainerStyle={containerStyle.dashboardMenuContainer}
          style={{flex: 1}}>
          <View style={{marginTop: 10}} />
          <View style={{height: '25%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
                paddingHorizontal: 15,
                height: '100%',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={imageStyle.bodynonstaff}
                onPress={() => {
                  !isEmpty(user)
                    ? navigation.navigate('PremiumCalculator')
                    : navigation.navigate('Login');
                }}>
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/insurance.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>
                    Buy Policy
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={imageStyle.bodynonstaff}
                onPress={() => navigation.navigate('PremiumCalculator')}>
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/calculator.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>
                    Calculator
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={imageStyle.bodynonstaff}
                onPress={() => navigation.navigate('PayPremiumone')}>
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/pay.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>
                    Pay Premium
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: '25%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
                paddingHorizontal: 15,
                marginTop: 5,
                height: '100%',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={imageStyle.bodynonstaff}
                // onPress={() => navigation.navigate('ClaimIntimation')}>
                onPress={() => {
                  !isEmpty(user)
                    ? navigation.navigate('ClaimIntimation')
                    : navigation.navigate('Login');
                }}>
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/claim-intimation.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>
                    Claim Intimation
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={imageStyle.bodynonstaff}
                // onPress={ClaimTracking}>
                // onPress={() => navigation.navigate('ClaimTrackingHome')}>
                onPress={() => {
                  !isEmpty(user)
                    ? navigation.navigate('ClaimTrackingHome')
                    : navigation.navigate('Login');
                }}>
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/claim-tracking.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>
                    Claim Tracking
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={imageStyle.bodynonstaff}
                onPress={() => {
                  !isEmpty(user)
                    ? navigation.navigate('InputCheckPolicy')
                    : navigation.navigate('Login');
                }}>
                {/* onPress={() =>{ navigation.navigate('premiumCalculator'),alert('Features not Enabled')}}> */}
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/check-policy.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>
                    Check Policy
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: '25%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
                paddingHorizontal: 15,
                marginTop: 10,
                height: '100%',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Branches')}
                style={imageStyle.bodynonstaff}>
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/branches.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>Branches</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('OurProduct')}
                style={imageStyle.bodynonstaff}>
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/our-products.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>
                    Our Products
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('NewsAndEvents')}
                style={imageStyle.bodynonstaff}>
                <View style={imageStyle.eachbody}>
                  <Image
                    style={imageStyle.dashboardCardMenunonstaff}
                    source={require('../../assets/dashboard/news-and-events.png')}
                  />
                  <Text style={textStyle.dashboardCardMenuText}>
                    News & Events
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View
          contentContainerStyle={containerStyle.dashboardMenuContainer}
          style={{flex: 1}}>
          <View style={{marginTop: 10}} />
          <ScrollView>
            <View style={{height: '25%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  height: '100%',
                }}>
                <TouchableOpacity
                  style={imageStyle.body}
                  activeOpacity={0.9}
                  onPress={() => {
                    !isEmpty(user)
                      ? navigation.navigate('PremiumCalculator')
                      : navigation.navigate('Login');
                  }}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/insurance.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Buy Policy
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={imageStyle.body}
                  onPress={() => navigation.navigate('PremiumCalculator')}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/calculator.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Calculator
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={imageStyle.body}
                  onPress={() => navigation.navigate('PayPremiumone')}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/pay.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Pay Premium
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height: '25%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  height: '100%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={imageStyle.body}
                  // onPress={() => navigation.navigate('ClaimIntimation')}>
                  onPress={() => {
                    !isEmpty(user)
                      ? navigation.navigate('ClaimIntimation')
                      : navigation.navigate('Login');
                  }}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/claim-intimation.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Claim Intimation
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={imageStyle.body}
                  // onPress={ClaimTracking}>
                  // onPress={() => navigation.navigate('ClaimTrackingHome')}>
                  onPress={() => {
                    !isEmpty(user)
                      ? navigation.navigate('ClaimTrackingHome')
                      : navigation.navigate('Login');
                  }}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/claim-tracking.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Claim Tracking
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={imageStyle.body}
                  onPress={() => {
                    !isEmpty(user)
                      ? navigation.navigate('InputCheckPolicy')
                      : navigation.navigate('Login');
                  }}>
                  {/* onPress={() =>{ navigation.navigate('premiumCalculator'),alert('Features not Enabled')}}> */}
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/check-policy.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Check Policy
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height: '25%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  height: '100%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Branches')}
                  style={imageStyle.body}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/branches.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Branches
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('OurProduct')}
                  style={imageStyle.body}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/our-products.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Our Products
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('NewsAndEvents')}
                  style={imageStyle.body}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/news-and-events.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      News & Events
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height: '25%', marginBottom: 200}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  height: '100%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('ClaimApprovalHome')}
                  style={imageStyle.body}>
                  <View style={imageStyle.eachbody}>
                    <Image
                      style={imageStyle.dashboardCardMenu}
                      source={require('../../assets/dashboard/claim.png')}
                    />
                    <Text style={textStyle.dashboardCardMenuText}>
                      Claim Approval
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalText}>Fill your</Text>
              <Text style={[styles.modalText, {color: '#F57722'}]}>
                &nbsp; KYC &nbsp;
              </Text>
              <Text style={styles.modalText}>to buy policy instantly</Text>
            </View>
            <Image source={require('../../assets/dashboard/kyc-modal.png')} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                navigation.navigate('KycIndividualStepOne');
                setModalVisible(false);
              }}>
              <Text style={styles.textStyle}>Fill Now</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handlePress();
                setModalVisible(false);
              }}>
              <Text style={{marginTop: 5}}>I will fill later</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
Dashboard.propTypes = {
  /** A function to change navigation helper */
  goToClaimIntimation: PropTypes.func.isRequired,

  userName: PropTypes.string,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
   
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
    height: 250,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#F57722',
    width: '80%',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Dashboard;
