import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import accordionStyle from '../../style/claimintimation';
import textStyle from '../../style/text';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const ClaimLists = () => {
  const navigation = useNavigation();

  const [calimIntimationList, setClaimIntimationList] = useState([]);
console.log("calimIntimationList",calimIntimationList)
  const {claimlist, claimListLoading} = useSelector(
    state => state.ClaimIntimationReducer,
  );

  useEffect(() => {
    if (!isEmpty(claimlist)) {
      setClaimIntimationList(claimlist?.data);
    }
  }, [claimlist]);

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
  return (
    <SafeAreaView style={{backgroundColor: '#F5F7F9', height: '100%'}}>
      {claimListLoading ? (
        <ActivityIndicator
          size="large"
          color="#F57722"
          style={{marginTop: 100}}
        />
      ) : (
        <ScrollView style={{padding: 15}}>
          <View style={{marginBottom: 50}}>
            {!isEmpty(calimIntimationList) &&
              calimIntimationList.map((claim, i) => (
                <View style={accordionStyle.accordionContainer}>
                  <Collapse isExpanded={claim.SN == 1 ? true : false}>
                    <CollapseHeader style={accordionStyle.accordion}>
                      <Text style={textStyle.accordionHeader}>
                        {claim.SN}) Policy No. {claim.POLICYNO}
                      </Text>
                    </CollapseHeader>
                    <CollapseBody style={accordionStyle.accordionContent}>
                      <View style={{width: '100%'}}>
                        <View style={accordionStyle.accordionContentSection}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Name
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {claim.NAME}
                            </Text>
                          </View>
                          <View style={{width: '42%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Date of Loss
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {moment(claim.DATEOFLOSS).format(
                                'YYYY-MM-DD',
                              )}
                            </Text>
                            {/* {moment().format('DD-MM-YYYY')} */}
                          </View>
                        </View>
                        <View style={accordionStyle.accordionContentSection}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Address
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {claim.ADDRESS ? (
                                claim.ADDRESS
                              ) : (
                                <Text style={{fontSize: 12}}>Not Found</Text>
                              )}
                            </Text>
                          </View>
                          <View style={{width: '42%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Intimation Date
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {moment(claim.INTIMATIONDATE).format(
                                'YYYY-MM-DD, h:mm',
                              )}
                            </Text>
                          </View>
                        </View>

                        <View style={accordionStyle.accordionContentSection}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              District
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {claim.DISTRICTNAME}
                            </Text>
                          </View>
                          <View style={{width: '42%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Ward No.
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {' '}
                              {claim.WARDNO}
                            </Text>
                          </View>
                        </View>
                        <View style={accordionStyle.accordionContentSection}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              MNU/VDC
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {claim.MNUVDC}
                            </Text>
                          </View>
                          <View style={{width: '42%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Remarks
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {' '}
                              {claim.REMARKS}
                            </Text>
                          </View>
                        </View>

                        <View style={accordionStyle.accordionContentSection}>
                          <View style={{width: '50%'}}>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('ClaimFeedBack', {
                                  paramKey: claim.ID,
                                })
                              }>
                              <Text
                                style={accordionStyle.accordionContentHeader}>
                               Contact Support Team
                              </Text>

                              <Image
                                style={{width: 25, height: 25, marginLeft: 10}}
                                source={require('../../assets/claim-tracking/chat.png')}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={{width: '42%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Status
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {' '}
                              {claim.Status}
                            </Text>
                          </View>
                        </View>
                        {claim.ClaimStatus != null ? (
                            <View style={{width: '100%',padding:20}}>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('ClaimTrackingHome')
                                }
                                style={{
                                  backgroundColor: '#F57722',
                                  paddingHorizontal: 11,
                                  marginTop: 10,
                                  borderRadius: 4,
                                  paddingVertical: 10,
                                  paddingRight: 20,
                                }}>
                                <Text
                                  style={
                                    accordionStyle.accordionclaimlistbutton
                                  }>
                                  Go To ClaimTracking
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>
              ))}
          </View>
        </ScrollView>
      )}

      {claimlist.response_code == 1 ? (
        <Image
          style={{height: 500, width: 400, alignSelf: 'center', top: -120}}
          source={require('../../assets/nulldata.jpg')}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default ClaimLists;
