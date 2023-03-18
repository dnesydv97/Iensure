import React, {useState, useEffect,useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import {concat, isEmpty} from 'lodash';
import Date from './DateFrom';
import Dateto from './DateTo';
import {
  data,
  branchList,
  filterPost,
  ficsalYear,
} from '../../redux/actions/SalesAndMarketingAction';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import BarGraphs from './graphs/BarGraphs';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../../style/sales&marketing/NetPremium&CrossStyle';
import {BorderlessButton} from 'react-native-gesture-handler';
const StackedBarChartScreen = ({filterPost, branchList, ficsalYear}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const handleFilterModalPress = () => setFilterModalVisible(true);
  const [datefrom, setDob] = useState('');
  const [dateto, setDobTO] = useState('');
  const [branchlist, setBranchList] = useState();
 
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');

  const {filter, year, branche} = useSelector( state => state.SalesAndMarketingReducer);

  
  const [claim, setClaim] = useState();
  const [payload, setPayload] = useState('');


  useEffect(() => {
    let i = 0;
    if (!isEmpty(branche)) {
      setBranchList(branche);
    }
  }, [branche]);


  useEffect(() => {
    if (!isEmpty(filter)) {
      setLoading(false);
      setClaim(filter);
    } else {
      setLoading(true);
    }
  }, [filter]);

  useEffect(() => {
    fetchMetaData();
  }, []);

  const fetchMetaData = async () => {
    filterPost({
      DateFrom: '2019/07/17',
      DateTo: '2021/02/12',
      fiscalid: 10,
      branchId: 1,
    });
  };
  useEffect(() => {
    fetchMetaData1();
  }, []);

  const fetchMetaData1 = async () => {
    branchList({});
  };

  useEffect(() => {
    fetchfiscal();
  }, []);

  const fetchfiscal = async () => {
    ficsalYear({});
  };

  const handleSubmit = async () => {
    setFilterModalVisible(!filterModalVisible);
    // navigation.navigate('NetpremiumGrossClaim');
    let body = {
      dateFrom: datefrom,
      fiscalid: date.ID,
      //  DateFrom: '2019-09-01',
      // DateTo: '2022-11-18',
      dateTo: dateto,
      branchId: payload.BRanchid,
    };
  
    dispatch(filterPost(body));
  };
 
  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: 4}}>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <View>
          <Text>Branches</Text>
          <TouchableOpacity onPress={() => handleFilterModalPress()}>
          <View style={styles.box}>
            <Text style={styles.boxtext}>
              {!isEmpty(payload.branch) && payload.branch
                ? payload.branch
                : 'All'}
            </Text>
          </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Fis.Yr</Text>
          <TouchableOpacity onPress={() => handleFilterModalPress()}>
          <View style={styles.box}>
            <Text style={styles.boxtext}>
              {' '}
              {!isEmpty(date.Year) && date.Year ? date.Year : '078/079'}
            </Text>
          </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text>From</Text>
          <TouchableOpacity onPress={() => handleFilterModalPress()}>
          <View style={styles.box}>
            <Text style={styles.boxtext}>
              {!isEmpty(datefrom) && datefrom ? datefrom : '2019/07/17'}
            </Text>
          </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text>To</Text>
          <TouchableOpacity onPress={() => handleFilterModalPress()}>
          <View style={styles.box}>
            <Text style={styles.boxtext}>
              {!isEmpty(dateto) && dateto ? dateto : '2021/02/12'}
            </Text>
          </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text></Text>
          <View>
            <TouchableOpacity onPress={() => handleFilterModalPress()}>
              <Image
                source={require('../../assets/fill.png')}
                style={{height: 25, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BarGraphs />
     
        <View style={styles.Headerdata}>
          <Text>Month</Text>
          <Text style={{left: 20}}>Claim Settled</Text>
          <Text>Net Premium</Text>
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
              claim?.data?.Table1?.map((value, i) => (
            
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 15,
                    flex: 1,
                    backgroundColor: '#F8F8FC',
                    width: '100%',
                    borderRadius: 5,
                    marginTop: 8,
                  }}>
                  <View style={{flexDirection: 'row', width: '30%'}}>
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 50,
                        marginTop: 6,
                        backgroundColor: '#9C27B0',
                      }}
                    />
                    <Text style={{marginLeft: 8}}>
                      {/* {moment(value.Date).format('YYYY-MM-DD')} */}
                      {value.Month}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '35%',
                    }}>
                    <Text
                      style={{
                        textAlign: 'right',
                      }}>
                      {value.ClaimSettled == 0 ? (
                        <Text>-</Text>
                      ) : (
                        value.ClaimSettled.toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '35%',
                    }}>
                    <Text
                      style={{
                        textAlign: 'right',
                      }}>
                      {value.NetPremium == 0 ? (
                        <Text>-</Text>
                      ) : (
                        value.NetPremium.toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      )}
                    </Text>
                  </View>
                
                </View>
             
              ))}
               <View>
         
            {claim?.data.Table1[0] == null ? <Image style={{width:200,resizeMode:'cover',alignSelf:'center'}} source={require('../../assets/datanotfound.jpg')} /> : null}
         
        </View>
          </ScrollView>
        )}
       
    
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!filterModalVisible);
        }}>
        <View style={styles.modalbackground}>
          <View style={styles.modalbody}>
            <View style={styles.modalbodyinner}>
              <View style={styles.modalheader}>
                <Text style={styles.filtertext}>Filter</Text>
                <Pressable
                  onPress={() => setFilterModalVisible(!filterModalVisible)}>
                  <View style={styles.crossicon}>
                    <Icon name="close" size={20} color="#9393AA" />
                  </View>
                </Pressable>
              </View>
              <View style={styles.innermodel}>
                {/* <View style={styles.picker}>
                  <Text style={styles.branchtext}>Branches</Text>

                  <View style={styles.pickerbox}>
                    <Picker
                      selectedValue={payload.BranchId}
                      onValueChange={BranchId =>
                        setPayload({...payload, BranchId})
                      }
                  
                      mode={'dialog'}
                      style={styles.pickericon}>
                      {!isEmpty(branchlist) &&
                        branchlist?.Table?.map(({branch, BRanchid}) => (
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
                            value={BRanchid }
                        
                          />
                         
                          )  )}
                    </Picker>
                    <Text style={styles.pickererror}></Text>
                  </View>
                </View> */}
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.picker}>
                  <Text style={styles.branchtext}>Branches</Text>

                  <View style={styles.pickerbox}>
                    <Picker
                    dropdownIconColor="grey" dropdownIconRippleColor="purple"
                      selectedValue={payload}
                      onValueChange={(value, index) => setPayload(value)}
                      mode={'dialog'}
                    
                   
                      prompt="List of Branches"
                     
                      style={styles.pickericon}>
                         <Picker.Item   label="All" value="0" />  
                      {!isEmpty(branchlist) &&
                        branchlist?.Table?.map(data => {
                          return (
                            
                            <Picker.Item
                           
                              style={{
                                color: '#212121',
                                fontSize: 14,
                                fontFamily: 'Open Sans',
                                 lineHeight: 5.06,
                                //  alignItems: 'center',
                                fontWeight: '400',
                                  // backgroundColor:'red',
                        maxHeight:10
                                
                              }}
                              
                              key={data}
                              label={data.branch }
                              value={data}
                             
                            />
                          );
                        })}
                    </Picker>
                    <Text style={styles.pickererror}></Text>
                  </View>
                </View>
                <View style={styles.picker}>
                  <Text style={styles.branchtext}>Fiscal Year</Text>

                  <View style={styles.pickerbox}>
                    <Picker
                      selectedValue={date}
                      onValueChange={(value, index) => setDate(value)}
                      mode={'dialog'}
                      prompt="List of Years"
                      style={styles.pickericon}>
                         
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
                    <Text style={styles.pickererror}></Text>
                  </View>
                </View>

                <View style={styles.timebox}>
                  <View>
                    <Text style={styles.fromtext}>From</Text>
                    <Date setDob={setDob} datefrom={datefrom} />
                  </View>

                  <Image
                    source={require('../../assets/shape.png')}
                    style={styles.forwardicon}
                  />

                  <View>
                    <Text style={styles.fromtext}>To</Text>
                    <Dateto setDobTO={setDobTO} dateto={dateto} />
                  </View>
                </View>

                <Pressable
                  style={styles.login}
                  onPress={handleSubmit}
                  
                  // onPress={() => setFilterModalVisible(!filterModalVisible)}
                >
                  
                  <Text style={styles.loginText}> Filter</Text>
                </Pressable>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
  // }
};

StackedBarChartScreen.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.SalesAndMarketingReducer,
});
export default connect(mapStatesToProps, {
  data,
  filterPost,
  branchList,
  ficsalYear,
})(StackedBarChartScreen);
