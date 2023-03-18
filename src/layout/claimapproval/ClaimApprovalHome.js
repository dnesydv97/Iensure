import React, {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {List} from 'react-native-paper';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Date from '../sales-and-marketing/DateFrom';
import Dateto from '../sales-and-marketing/DateTo';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  branchList,
  data,
  ficsalYear,
  claimPaidSummary,
  PendingList,
  ApproveList,
  claimOutstandingSummary,
} from '../../redux/actions/SalesAndMarketingAction';

import PropTypes from 'prop-types';
import {Picker} from '@react-native-picker/picker';
import buttonStyle from '../../style/button';
import textStyle from '../../style/text';
import {isEmpty} from 'lodash';
import accordionStyle from '../../style/accordion';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
const ClaimApprovalHome = ({
  branchList,
  data,
  ficsalYear,
  PendingList,
  ApproveList,
}) => {
  const {year, pending, claimSummary, approved} = useSelector(
    state => state.SalesAndMarketingReducer,
  );

  const [expanded, setExpanded] = React.useState(true);
  const [claim, setClaim] = useState();
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState();

  const [datefrom, setDob] = useState('');
  const [dateto, setDobTO] = useState('');
  const handlePress = () => setExpanded(!expanded);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    fiscalId: '',
    branchID: '',
    productId: '5',
  });
 
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const handleFilterModalPress = () => setFilterModalVisible(true);
  useEffect(() => {
    fetchMetaData();
  }, []);

  const fetchMetaData = async () => {
    branchList({});
  };
  useEffect(() => {
    fetchMetaData1();
  }, []);

  const fetchMetaData1 = async () => {
    ficsalYear({});
  };
  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    PendingList({
      fiscalId: 6,
      branchID: 1,
      productId: 2,
      pageNumber: 1,
      pageSize: 10,
    });
  };
  useEffect(() => {
    fetchApproved();
  }, []);

  useEffect(() => {
    dispatch(claimOutstandingSummary(payload));
  }, []);

  const fetchApproved = async () => {
    ApproveList({
      fiscalId: 8,
      branchID: 12,
      productId: 2,
      pageNumber: 1,
      pageSize: 10,
    });
  };
  const filter = async () => {
    setFilterModalVisible(false);

    let body = {
      // ...payload,
      // "pageNumber":1,
      // "pageSize":10
      fiscalId: 8,
      branchID: 1,
      productId: 2,
      pageNumber: 1,
      pageSize: 10,
    };
    dispatch(ApproveList(body)) && dispatch(ApproveList(body));
   
  };
  useEffect(() => {
    let i = 0;
    if (!isEmpty(year)) {
      setYears(year);
    }
  }, [year]);
  return (
    <View style={{padding: 10, marginTop: 0, backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}>
        <Text>Claim Approval </Text>
        <TouchableOpacity onPress={() => handleFilterModalPress()}>
          <Image
            source={require('../../assets/fill.png')}
            style={{height: 20, width: 25}}
          />
        </TouchableOpacity>
      </View>
      <List.Accordion
        title="Pending"
        // expanded={expanded}
        titleStyle={{color: 'rgba(221, 144, 28, 1)'}}
        // left={props => <List.Icon {...props} icon="folder" />}
        style={{backgroundColor: '#F5F7F9'}}>
        <ScrollView>
          <View style={{marginBottom: 100}}>
            {!isEmpty(pending) &&
              pending?.data?.map((data, i) => (
                <View
                  style={{
                    width: '100%',

                    borderRadius: 5,
                    marginTop: 10,
                    backgroundColor: '#F5F7F9',
                    elevation: 5,
                    marginBottom: 10,
                    padding: 10,
                  }}>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '40%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Claim Id
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.ClaimId}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '40%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Claim No.
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.ClaimNumber}
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
                        {data.InsuredName}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '40%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Total Amount
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.TotalAmount}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      maxWidth: '100%',
                    }}>
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#F57722',
                          borderRadius: 5,
                          borderColor: '#F57722',
                          padding: 10,
                          borderWidth: 1,
                          // alignSelf: 'stretch',
                          alignItems: 'center',
                          justifyContent: 'center',

                          marginTop: 10,
                          marginBottom: 30,
                          width: '100%',
                          // marginLeft: 40,
                        }}
                        onPress={() =>
                          navigation.navigate('CheckPolicyHome', {
                            paramKey: data.ClaimNumber,
                          })
                        }>
                        <Text
                          style={{
                            color: '#fff',
                            lineHeight: 19.5,
                            fontSize: 16,
                            fontWeight: '400',
                            fontFamily: 'Montserrat',
                          }}>
                          View Policy
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#F57722',
                          borderRadius: 5,
                          borderColor: 'rgba(0, 0, 0, 0.25)',
                          padding: 10,
                          borderWidth: 1,
                          // alignSelf: 'stretch',
                          alignItems: 'center',
                          justifyContent: 'center',

                          marginTop: 10,
                          marginBottom: 30,
                          width: '100%',
                          // marginLeft: 40,
                        }}
                        onPress={() =>
                          navigation.navigate('ClaimDetails', {
                            paramKey: data.ClaimNumber,
                            claim: data.ClaimId,
                          })
                        }>
                        <Text
                          style={{
                            color: '#fff',
                            lineHeight: 19.5,
                            fontSize: 16,
                            fontWeight: '400',
                            fontFamily: 'Montserrat',
                          }}>
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </List.Accordion>

      <View style={{marginTop: 6}} />

      <List.Accordion
        title="Approved"
        titleStyle={{color: 'rgba(221, 144, 28, 1)'}}
        style={{backgroundColor: '#F5F7F9'}}
        expanded={expanded}
        onPress={handlePress}>
        <ScrollView>
          <View style={{marginBottom: 200}}>
            {!isEmpty(approved) &&
              approved?.data?.map((data, i) => (
                <View
                  style={{
                    width: '100%',

                    borderRadius: 5,

                    backgroundColor: '#F5F7F9',
                    elevation: 5,
                    marginBottom: 10,
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '40%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Claim Id
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.ClaimId}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '40%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Claim No.
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.ClaimNumber}
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
                        {data.InsuredName}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '40%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Total Amount
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {data.TotalAmount}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      maxWidth: '100%',
                    }}>
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#F57722',
                          borderRadius: 5,
                          borderColor: '#F57722',
                          padding: 10,
                          borderWidth: 1,
                          // alignSelf: 'stretch',
                          alignItems: 'center',
                          justifyContent: 'center',

                          marginTop: 10,
                          marginBottom: 30,
                          width: '100%',
                          // marginLeft: 40,
                        }}
                        onPress={() =>
                          navigation.navigate('CheckPolicyHome', {
                            paramKey: data.ClaimNumber,
                          })
                        }>
                        <Text
                          style={{
                            color: '#fff',
                            lineHeight: 19.5,
                            fontSize: 16,
                            fontWeight: '400',
                            fontFamily: 'Montserrat',
                          }}>
                          View Policy
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#F57722',
                          borderRadius: 5,
                          borderColor: 'rgba(0, 0, 0, 0.25)',
                          padding: 10,
                          borderWidth: 1,
                          // alignSelf: 'stretch',
                          alignItems: 'center',
                          justifyContent: 'center',

                          marginTop: 10,
                          marginBottom: 30,
                          width: '100%',
                          // marginLeft: 40,
                        }}
                        onPress={() =>
                          navigation.navigate('ClaimDetails', {
                            paramKey: data.ClaimNumber,
                            claim: data.ClaimId,
                          })
                        }>
                        <Text
                          style={{
                            color: '#fff',
                            lineHeight: 19.5,
                            fontSize: 16,
                            fontWeight: '400',
                            fontFamily: 'Montserrat',
                          }}>
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </List.Accordion>
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setFilterModalVisible(!filterModalVisible);
        }}>
        <View style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              height: '55%',
              width: '100%',
              position: 'absolute',
              bottom: 0,
            }}>
            <View
              style={{
                marginTop: 20,
                backgroundColor: '#fff',
                height: '100%',
                borderRadius: 10,
                borderTopColor: '#C7C7CC',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#C7C7CC',
                  paddingVertical: 8,
                  padding: 20,
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    lineHeight: 18,
                    fontStyle: 'normal',
                  }}>
                  Filter
                </Text>
                <Pressable
                  onPress={() => setFilterModalVisible(!filterModalVisible)}>
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
              <View
                style={{
                  padding: 20,
                  // borderBottomColor: 'red',

                  maxWidth: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 16.41,
                      fontWeight: '400',
                      color: '#000000',
                      marginTop: 5,
                    }}>
                    {' '}
                    Fiscal Year
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#FAFAFA',
                      width: '75%',
                      borderRadius: 4,

                      alignItems: 'flex-end',
                      paddingVertical: 2,
                      borderWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    }}>
                    <Picker
                      selectedValue={payload.fiscalId}
                      onValueChange={fiscalId =>
                        setPayload({...payload, fiscalId})
                      }
                      mode={'dialog'}
                      style={{
                        height: 40,
                        width: 250,

                        alignSelf: 'flex-end',
                        marginTop: -13,
                      }}>
                      {!isEmpty(years) &&
                        years.map(({Year, ID}) => (
                          <Picker.Item
                            style={{
                              color: '#212121',
                              fontSize: 14,
                              fontFamily: 'Open Sans',
                              lineHeight: 16.06,
                              alignItems: 'center',
                              fontWeight: '400',
                            }}
                            key={ID || Date.now()}
                            label={Year + ''}
                            value={ID || Date.now()}
                          />
                        ))}
                    </Picker>
                    <Text
                      style={{
                        width: '100%',
                        height: 60,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}>
                      {' '}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 16.41,
                      fontWeight: '400',
                      color: '#000000',
                      marginTop: 5,
                    }}>
                    {' '}
                    Branches
                  </Text>

                  <View
                    style={{
                      backgroundColor: '#FAFAFA',
                      width: '75%',
                      borderRadius: 4,

                      paddingVertical: 2,
                      alignItems: 'flex-end',

                      borderWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    }}>
                    <Picker
                      selectedValue={payload.branchID}
                      onValueChange={branchID =>
                        setPayload({...payload, branchID})
                      }
                      mode={'dialog'}
                      style={{
                        height: 40,
                        width: 250,

                        alignSelf: 'flex-end',
                        marginTop: -13,
                      }}>
                      {!isEmpty(data) &&
                        data?.branche?.Table?.map(({branch, BRanchid}) => (
                          <Picker.Item
                            style={{
                              color: '#212121',
                              fontSize: 14,
                              fontFamily: 'Open Sans',
                              lineHeight: 16.06,
                              alignItems: 'center',
                              fontWeight: '400',
                            }}
                            key={BRanchid || Date.now()}
                            label={branch + ''}
                            value={BRanchid || Date.now()}
                          />
                        ))}
                    </Picker>
                    <Text
                      style={{
                        width: '100%',
                        height: 60,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}>
                      {' '}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 16.41,
                      fontWeight: '400',
                      color: '#000000',
                      marginTop: 5,
                    }}>
                    {' '}
                    Product
                  </Text>

                  <View
                    style={{
                      backgroundColor: '#FAFAFA',
                      width: '75%',
                      borderRadius: 4,

                      paddingVertical: 2,
                      alignItems: 'flex-end',

                      borderWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    }}>
                    <Picker
                      selectedValue={payload.productId}
                      onValueChange={productId =>
                        setPayload({...payload, productId})
                      }
                      mode={'dialog'}
                      style={{
                        height: 40,
                        width: 250,

                        alignSelf: 'flex-end',
                        marginTop: -13,
                      }}>
                      {!isEmpty(claimSummary) &&
                        claimSummary?.data?.map(
                          ({Department, Nos_of_claims}) => (
                            <Picker.Item
                              style={{
                                color: '#212121',
                                fontSize: 14,
                                fontFamily: 'Open Sans',
                                lineHeight: 16.06,
                                alignItems: 'center',
                                fontWeight: '400',
                              }}
                              key={Nos_of_claims || Date.now()}
                              label={Department + ''}
                              value={Department || Date.now()}
                            />
                          ),
                        )}
                    </Picker>
                    <Text
                      style={{
                        width: '100%',
                        height: 60,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}>
                      {' '}
                    </Text>
                  </View>
                </View>
                <View style={{margin: 1, maxWidth: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                      borderRadius: 4,
                      //  maxWidth:'30%',
                      // margin:50,
                      // paddingRight:20,
                      // paddingLeft:20

                      // maxHeight:'60%'
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 14.06,
                          fontWeight: '400',
                          color: '#000000',
                          marginTop: 5,
                        }}>
                        From
                      </Text>
                      <Date setDob={setDob} datefrom={datefrom} />
                    </View>
                    <View style={{paddingLeft: 10, paddingRight: 10}}>
                      <Image
                        source={require('../../assets/shape.png')}
                        style={{height: 7.99, width: 12.8, marginTop: 35}}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 14.06,
                          fontWeight: '400',
                          color: '#000000',
                          marginTop: 5,
                        }}>
                        To
                      </Text>
                      <Dateto setDobTO={setDobTO} dateto={dateto} />
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 30,

                      flexDirection: 'column',
                      // width: '100%',
                      marginBottom: 90,
                    }}>
                    <Pressable style={buttonStyle.login} onPress={filter}>
                      {/* 
onPress={() =>
                        setFilterModalVisible(!filterModalVisible)
                      }>     */}
                      <Text style={textStyle.loginText}> Filter</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

ClaimApprovalHome.PropTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.SalesAndMarketingReducer,
});
export default connect(mapStatesToProps, {
  data,
  branchList,
  ficsalYear,
  claimPaidSummary,
  PendingList,
  ApproveList,
})(ClaimApprovalHome);
