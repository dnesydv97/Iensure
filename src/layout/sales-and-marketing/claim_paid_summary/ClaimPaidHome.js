import React, {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {isEmpty} from 'lodash';
// import Date from '../DateFrom';
import Date from '../DateFrom';
import Dateto from '../DateTo';
import {Switch} from 'react-native-paper';

import PieChart from 'react-native-pie-chart';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  branchList,
  data,
  ficsalYear,
  claimPaidSummary,
} from '../../../redux/actions/SalesAndMarketingAction';
import propTypes from 'prop-types';
import {Picker} from '@react-native-picker/picker';
import buttonStyle from '../../../style/button';
import textStyle from '../../../style/text';
import style from '../../../style/SalesAndMarketing';

const Sales = ({branchList, data, ficsalYear, claimPaidSummary}) => {
  const {claimPaid, year} = useSelector(
    state => state.SalesAndMarketingReducer,
  );
  const [claim, setClaim] = useState();
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState();
  const [datefrom, setDob] = useState('');
  const [dateto, setDobTO] = useState('');
  const [date, setDate] = useState('');
  const [payload, setPayload] = useState('');
  useEffect(() => {
    let i = 0;
    if (!isEmpty(claimPaid)) {
      setLoading(false);
      setClaim(claimPaid);
    } else {
      setLoading(true);
    }
  }, [claimPaid]);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setFilterModalVisible(!filterModalVisible);
    let body = {
      dateFrom: datefrom,
      fiscalid: date.ID,

      dateTo: dateto,
      branchId: payload.BRanchid,
    };
  
    dispatch(claimPaidSummary(body));
  };

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const handleFilterModalPress = () => setFilterModalVisible(true);
  const navigation = useNavigation();
  const widthAndHeight = 250;
  const series = [];

  const PieValue =
    !isEmpty(claim) && claim?.data?.Table?.map((data, i) => data.Amount);
  const Name =
    !isEmpty(claim) && claim?.data?.Table?.map((data, i) => data.Department);
  const lastvalue = PieValue[PieValue.length - 1];

  // PieValue.pop();
  const test =
    !isEmpty(claim) &&
    claim?.data?.Table?.map((data, i) => {
      let value = (data.Amount / lastvalue) * 360;

      series.push(value);
    });
  series.pop();




  //  series.push(PieValue);
  // let sum = PieValue.reduce((a, b) => a + b, 0);

 

  const sliceColor =
    !isEmpty(claim) &&
    claim?.data?.Table?.map((data, i) =>
      data.Department == 'Fire'
        ? '#673AB6'
        : data.Department == 'Marine'
        ? '#9C27B0'
        : data.Department == 'Motor'
        ? '#3F51B5'
        : data.Department == 'Miscellaneous'
        ? '#009688'
        : data.Department == 'Engineering'
        ? '#00BCD4'
        : data.Department == 'Aviation'
        ? '#B052C0'
        : data.Department == 'Agriculture'
        ? '#57DB7A'
        : data.Department == 'Micro'
        ? '#C4C4C4'
        : data.Department == 'Property Insurance'
        ? '#d1d100'
        : data.Department == 'Total'
        ? '#E91E63'
        : '#dec8ab',
    );


  useEffect(() => {
    fetchMetaData();
  }, []);

  const fetchMetaData = async () => {
    branchList({});
  };
  useEffect(() => {
    fetchPaid();
  }, []);

  const fetchPaid = async () => {
    claimPaidSummary({
      DateFrom: '2021-01-01',
      DateTo: '2021-11-18',
      fiscalid: 10,
      branchId: 1,
    });
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
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View>
          <Text>Branches</Text>
          <View style={style.box}>
            <Text style={style.boxtext}>
              {!isEmpty(payload.branch) && payload.branch
                ? payload.branch
                : 'All'}
            </Text>
          </View>
        </View>
        <View>
          <Text>Fis.Yr</Text>
          <View style={style.box}>
            <Text style={style.boxtext}>
              {' '}
              {!isEmpty(date.Year) && date.Year ? date.Year : '078/079'}
            </Text>
          </View>
        </View>
        <View>
          <Text>From</Text>
          <View style={style.box}>
            <Text style={style.boxtext}>
              {!isEmpty(datefrom) && datefrom ? datefrom : '2021-01-01'}
            </Text>
          </View>
        </View>
        <View>
          <Text>To</Text>
          <View style={style.box}>
            <Text style={style.boxtext}>
              {!isEmpty(dateto) && dateto ? dateto : '2021-11-18'}
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
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.45}
          coverFill={'#FFF'}
          chart_wh={210}
        />
        {/* <View
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
         
          <Text style={{fontSize: 18, lineHeight: 23, color: 'red'}}>
         
            {lastvalue }
          </Text>
          
        </View> */}
      </View>

      <View>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            alignSelf: 'center',
            color: 'rgba(0, 0, 0,0.5)',
            marginTop: 10,
          }}>
          Claim Outstanding Amount
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: '#DBDEE3',
          borderRadius: 5,
          width: '100%',
        }}>
        <View style={{width: '40%'}}>
          <Text>Department</Text>
        </View>
        <View style={{width: '35%'}}>
          <Text>NOS</Text>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <Text>Amount</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#F57722"
          style={{marginTop: 100}}
        />
      ) : (
        <ScrollView>
          {!isEmpty(claim) &&
            claim?.data?.Table?.map((data, i) => (
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',

                  padding: 10,
                  width: '100%',
                  backgroundColor:
                    data.Department == 'Fire'
                      ? '#FFFDF5'
                      : data.Department == 'Marine'
                      ? '#F8F8FC'
                      : data.Department == 'Motor'
                      ? '#F6FCFA'
                      : data.Department == 'Miscellaneous'
                      ? '#FFFDF5'
                      : data.Department == 'Engineering'
                      ? '#F8F8FC'
                      : data.Department == 'Aviation'
                      ? '#F4E9F4'
                      : data.Department == 'Agriculture'
                      ? '#FEFAF5'
                      : data.Department == 'Micro'
                      ? '#FEF6F9'
                      : data.Department == 'Property Insurance'
                      ? '#FCF5FF'
                      : data.Department == 'Total'
                      ? 'pink'
                      : '',
                  borderRadius: 5,
                }}>
                <View style={{flexDirection: 'row', width: '35%'}}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor:
                        data.Department == 'Fire'
                          ? '#673AB6'
                          : data.Department == 'Marine'
                          ? '#9C27B0'
                          : data.Department == 'Motor'
                          ? '#3F51B5'
                          : data.Department == 'Miscellaneous'
                          ? '#009688'
                          : data.Department == 'Engineering'
                          ? '#00BCD4'
                          : data.Department == 'Aviation'
                          ? '#B052C0'
                          : data.Department == 'Agriculture'
                          ? '#57DB7A'
                          : data.Department == 'Micro'
                          ? '#C4C4C4'
                          : data.Department == 'Property Insurance'
                          ? '#d1d100'
                          : data.Department == 'Total'
                          ? '#E91E63'
                          : '#dec8ab',
                      borderRadius: 2,
                      marginTop: 4,
                    }}
                  />

                  <Text style={{marginLeft: 5}}>{data.Department}</Text>
                </View>
                <View style={{width: '30%'}}>
                  <Text style={{textAlign: 'center'}}>
                    {data.Nos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
                <View style={{width: '35%'}}>
                  <Text style={{textAlign: 'right'}}>
                    {parseFloat(data.Amount)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              </View>
            ))}
          <View style={{alignSelf: 'center', marginTop: 20}}>
          
              {claim.data.Table[0].Amount == null ? <Image style={{width:200,resizeMode:'cover',borderRadius:10}} source={require('../../../assets/datanotfound.jpg')} /> : null}
          
          </View>
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
         
          setFilterModalVisible(!filterModalVisible);
        }}>
        <View style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'}}>
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
                  marginBottom: 50,
                  maxWidth: '100%',
                }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                 

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
                        selectedValue={payload}
                        onValueChange={(value, index) => setPayload(value)}
                        mode={'dialog'}
                        style={{
                          height: 40,
                          width: 250,

                          alignSelf: 'flex-end',
                          marginTop: -13,
                        }}>
                        <Picker.Item label="All" value="0" />
                        {/* {!isEmpty(data) &&
                        data?.branche?.Table?.map(({branch, BRanchid}) => (
                          <Picker.Item */}
                        {!isEmpty(data) &&
                          data?.branche?.Table?.map(data => {
                            return (
                              <Picker.Item
                                style={{
                                  color: '#212121',
                                  fontSize: 14,
                                  fontFamily: 'Open Sans',
                                  lineHeight: 16.06,
                                  alignItems: 'center',
                                  fontWeight: '400',
                                }}
                                key={data}
                                label={data.branch}
                                value={data}
                              />
                            );
                          })}
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
                      marginTop:15
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
                        selectedValue={date}
                        onValueChange={(value, index) => setDate(value)}
                        mode={'dialog'}
                        style={{
                          height: 40,
                          width: 250,

                          alignSelf: 'flex-end',
                          marginTop: -13,
                        }}>
                        {!isEmpty(year) &&
                          year.map(data => {
                            return (
                              <Picker.Item
                                style={{
                                  color: '#212121',
                                  fontSize: 14,
                                  fontFamily: 'Open Sans',
                                  lineHeight: 16.06,
                                  alignItems: 'center',
                                  fontWeight: '400',
                                }}
                                key={data}
                                label={data.Year}
                                value={data}
                              />
                            );
                          })}
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

                        flexDirection: 'column',
                        // width: '100%',
                        marginBottom: 90,
                      }}>
                      <Pressable
                        style={buttonStyle.login}
                        onPress={handleSubmit}>
                        {/* 
onPress={() =>
                        setFilterModalVisible(!filterModalVisible)
                      }>     */}
                        <Text style={textStyle.loginText}> Filter</Text>
                      </Pressable>
                    </View>
                  </View>
                </ScrollView>
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
  },
});

Sales.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.SalesAndMarketingReducer,
});
export default connect(mapStatesToProps, {
  data,
  branchList,
  ficsalYear,
  claimPaidSummary,
})(Sales);
