import React, {useState, useEffect} from 'react';
import {List, Avatar} from 'react-native-paper';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import style from '../../../style/SalesAndMarketing';
import accordionStyle from '../../../style/accordion';
import TopNavBotton from './TopNavBotton';
import propTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import buttonStyle from '../../../style/button';
import textStyle from '../../../style/text';
import Date from '../DateFrom';
import Dateto from '../DateTo';
import {
  data,
  ficsalYear,
  getFOPortfolio,
} from '../../../redux/actions/SalesAndMarketingAction';

const MyComponent = ({getFOPortfolio, route, ficsalYear}) => {
  const {portfolio, year} = useSelector(
    state => state.SalesAndMarketingReducer,
  );
  const [loading, setLoading] = useState(true);
  const [portfoliodata, setPortFolioData] = useState();
  const [datefrom, setDob] = useState('');
  const [dateto, setDobTO] = useState('');
  const [years, setYears] = useState();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const handleFilterModalPress = () => setFilterModalVisible(true);
  const [payload, setPayload] = useState({
    fiscalyears: '',
  });

  useEffect(() => {
    if (!isEmpty(portfolio)) {
      setPortFolioData(portfolio);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [portfolio]);

  const listvalue = route.params.fieldofficervalue;
  const iddata = route.params.fieldofficervalue.fldofficerid;

  useEffect(() => {
    fetchfoList();
  }, []);

  const fetchfoList = async () => {
    getFOPortfolio({
      DateFrom: '2020-05-18',
      DateTo: '2021-11-18',
      BusinessById: route.params.field,
      FieldOfficerId: iddata,
      BranchId: route.params.fieldofficervalue.BranchId,
      BranchGroupId: 0,
    });
  };

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setFilterModalVisible(!filterModalVisible);
    let body = {
      DateFrom: datefrom,
      DateTo: dateto,

      BusinessById: 1,
      FieldOfficerId: route.params.fieldofficervalue.fldofficerid,
      BranchId: 0,
      BranchGroupId: 0,
    };

    dispatch(getFOPortfolio(body));
  };

  useEffect(() => {
    fetchMetaData1();
  }, []);

  const fetchMetaData1 = async () => {
    ficsalYear({});
  };
  useEffect(() => {
    let i = 0;
    if (!isEmpty(year)) {
      setYears(year);
    }
  }, [year]);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <View>
          <Text>Fis.Year</Text>
          <View style={style.boxfield}>
            <Text style={style.boxtext}>
              {' '}
              {!isEmpty(payload.fiscalyears) && payload.fiscalyears
                ? payload.fiscalyears
                : '70/71'}
            </Text>
          </View>
        </View>
        <View>
          <Text>From</Text>
          <View style={style.boxfield}>
            <Text style={style.boxtext}>
              {' '}
              {!isEmpty(datefrom) && datefrom ? datefrom : '2020/05/18'}
            </Text>
          </View>
        </View>
        <View>
          <Text>To</Text>
          <View style={style.boxfield}>
            <Text style={style.boxtext}>
              {!isEmpty(dateto) && dateto ? dateto : '2021/11/18'}
            </Text>
          </View>
        </View>
        <View>
          <Text></Text>
          <View>
            <TouchableOpacity onPress={() => handleFilterModalPress()}>
              <Image
                source={require('../../../assets/filter.png')}
                style={{height: 28, width: 40}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'rgba(196, 196, 196, 0.25)',
          marginTop: 10,
          borderBottomWidth: 3,
        }}
      />
      <Avatar.Image
        size={100}
        style={{
          alignSelf: 'center',
          backgroundColor: '#fff',
          borderWidth: 1,
          marginTop: 10,
          borderColor: '#B9C4E1',
        }}
        source={require('../../../assets/prachanda.png')}
      />
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          fontSize: 16,
          fontWeight: '500',
          lineHeight: 18,
        }}>
        {/* {!isEmpty(portfoliodata) && portfoliodata?.data?.Table4[3]?.InsuredName} */}
        {listvalue.EFLDOFFNAME}
      </Text>

      {/* <Text
        style={{
          marginTop: 5,
          alignSelf: 'center',
          fontSize: 12,
          fontWeight: '400',
          lineHeight: 14,
          color: '#F57722',
        }}>
        {' '}
        Sr.React Developer
      </Text> */}

      <View style={{marginTop: 10, marginLeft: 5}}>
        <View style={accordionStyle.accordionContentSections}>
          <View style={{width: '30%'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 16.41,
                color: 'rgba(0, 0, 0,0.8)',
                fontStyle: 'normal',
              }}>
              Phone No.
            </Text>
          </View>

          <View>
            <Text>:</Text>
          </View>
          <View style={{width: '65%'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 16.41,
                color: '#000000',
                fontStyle: 'normal',
              }}>
              {!isEmpty(portfoliodata) &&
                portfoliodata?.data?.Table5[0]?.MobileNo}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            borderBottomWidth: 1,
            marginTop: 5,
          }}
        />
        <View style={accordionStyle.accordionContentSections}>
          <View style={{width: '30%'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 16.41,
                color: 'rgba(0, 0, 0,0.8)',
                fontStyle: 'normal',
              }}>
              Email
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={{width: '65%'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 16.41,
                color: '#000000',
                fontStyle: 'normal',
              }}>
              {!isEmpty(portfoliodata) && portfoliodata?.data?.Table5[0]?.EMAIL}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            borderBottomWidth: 1,
            marginTop: 5,
          }}
        />
        <View style={accordionStyle.accordionContentSections}>
          <View style={{width: '30%'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 16.41,
                color: 'rgba(0, 0, 0,0.8)',
                fontStyle: 'normal',
              }}>
              {/* Employee Status */}
              Post
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={{width: '65%'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 16.41,
                color: '#000000',
                fontStyle: 'normal',
              }}>
              {!isEmpty(portfoliodata)
                ? portfoliodata?.data?.Table5[0]?.post
                : 'jdfhw'}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          borderBottomWidth: 1,
          marginTop: 5,
          width: '100%',
        }}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#F57722"
          style={{marginTop: 100}}
        />
      ) : (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 20,
            width: '100%',
          }}>
          <View>
            <View
              style={{
                borderRadius: 4,
                paddingVertical: 5,
                borderWidth: 0.5,

                alignContent: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                padding: 3,
                backgroundColor: '#F1F7F9',
              }}>
              <Text style={style.boxtextfield}>
                {!isEmpty(portfoliodata) &&
                  portfoliodata?.data?.Table6[0]?.TodayRank}
              </Text>
              <Text style={style.boxtextfields}>Marketing Rank</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                borderRadius: 4,
                paddingVertical: 5,
                borderWidth: 0.5,

                alignContent: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                padding: 3,
                backgroundColor: '#F1F7F9',
              }}>
              <Text style={style.boxtextfield}>
                {!isEmpty(portfoliodata) &&
                  portfoliodata?.data?.Table1[0]?.TotalPremium}
              </Text>

              <Text style={style.boxtextfields}>Total Premium</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                borderRadius: 4,
                paddingVertical: 5,
                borderWidth: 0.5,

                alignContent: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                padding: 3,
                backgroundColor: '#F1F7F9',
              }}>
              <Text style={style.boxtextfield}>
                {!isEmpty(portfoliodata) &&
                  portfoliodata?.data?.Table6[0]?.CurrentWorkingDays}
              </Text>
              <Text style={style.boxtextfields}>Working Days</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                borderRadius: 4,
                paddingVertical: 5,
                borderWidth: 0.5,

                alignContent: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                padding: 3,
                backgroundColor: '#F1F7F9',
              }}>
              <Text style={style.boxtextfield}>
                {!isEmpty(portfoliodata) &&
                  portfoliodata?.data?.Table6[0]?.ThisYearClaim}
              </Text>
              <Text style={style.boxtextfields}>Claim</Text>
            </View>
          </View>
        </View>
      )}
      <View
        style={{
          borderBottomColor: 'rgba(240, 240, 240, 1)',
          marginTop: 10,
          borderBottomWidth: 3,
        }}
      />
      <TopNavBotton />
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setFilterModalVisible(!filterModalVisible);
        }}>
        <View style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'}}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              height: '45%',
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
                  paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#C7C7CC',
                  paddingVertical: 10,
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
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
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

                      height: 30,
                      alignItems: 'flex-end',
                      paddingVertical: 0.1,
                      borderWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    }}>
                    <Picker
                      selectedValue={payload.fiscalyears}
                      onValueChange={fiscalyears =>
                        setPayload({...payload, fiscalyears})
                      }
                      mode={'dropdown'}
                      style={{
                        height: 40,
                        width: 250,
                        borderRadius: 20,
                        alignSelf: 'flex-end',
                        marginTop: -13,
                      }}>
                      {!isEmpty(years) &&
                        years.map(({Year, ID}) => (
                          <Picker.Item
                            style={{color: 'black'}}
                            key={Year || Date.now()}
                            label={Year + ''}
                            value={Year || Date.now()}
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

                <View style={{margin: 4, marginTop: 20}}>
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
                        source={require('../../../assets/shape.png')}
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
                      marginBottom: 20,
                      flexDirection: 'column',
                      width: '100%',
                      marginBottom: 90,
                    }}>
                    <Pressable
                      style={buttonStyle.login}
                      // onPress={() =>
                      //   setFilterModalVisible(!filterModalVisible)
                      // }>
                      onPress={handleSubmit}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
});
MyComponent.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.SalesAndMarketingReducer,
});
export default connect(mapStatesToProps, {
  data,
  getFOPortfolio,
  ficsalYear,
})(MyComponent);
