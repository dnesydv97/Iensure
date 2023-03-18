// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Pressable,
//   Text,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import {Col, Row, Grid} from 'react-native-easy-grid';
// import {Picker} from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/AntDesign';
// import {Searchbar} from 'react-native-paper';

// import {useNavigation} from '@react-navigation/native';
// import {TextInput, RadioButton, Provider} from 'react-native-paper';
// import buttonStyle from '../../../style/button';
// import textStyle from '../../../style/text';
// import {
//   branchList,
//   data,
//   ficsalYear,
// } from '../../../redux/actions/SalesAndMarketingAction';
// import propTypes from 'prop-types';
// import {connect, useDispatch, useSelector} from 'react-redux';
// import {isEmpty} from 'lodash';
// import Date from '../DateFrom';
// import Dateto from '../DateTo';
// const filterList = ({branchList, data, ficsalYear}) => {
//   const {folist, year} = useSelector(state => state.SalesAndMarketingReducer);

//   const [listdata, setListData] = useState();
//   const [loading, setLoading] = useState(true);
//   const [datefrom, setDob] = useState('');
//   const [dateto, setDobTO] = useState('');
//   const [selectedValue, setSelectedValue] = useState('FO');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [search, setSearch] = useState('');
//   const field = selectedValue == 'FO' ? 1 : 2;

//   useEffect(() => {
//     if (!isEmpty(folist?.data)) {
//       setLoading(false);
//       setFilteredDataSource(folist?.data);
//     } else {
//       setLoading(true);
//     }
//   }, [folist]);

//   const [filterModalVisible, setFilterModalVisible] = useState(false);
//   const handleFilterModalPress = () => setFilterModalVisible(true);
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [checked, setChecked] = useState('1');

//   const onChangeSearch = query => setSearchQuery(query);
//   const [fiscalYear, setFiscalYear] = useState('');
 
//   const [masterDataSource, setMasterDataSource] = useState([]);
//   var data =
//     !isEmpty(listdata) &&
//     listdata?.data?.map(
//       (data, i) =>
//         data.TodayPremium || data.ThisMonthPremium || data.ThisYearPremium,
//     );
//   var totaldata = 0;
//   for (var i = 0; i < data.length; i++) {
//     totaldata += data[i];
//   }

//   const dispatch = useDispatch();
//   const handleSubmit = async () => {
//     setFilterModalVisible(!filterModalVisible);

//     let body = {
//       DateFrom: datefrom,
//       fiscalid: fiscalYear,
//       DateTo: dateto,
//       Key: selectedValue,
//       BusinessType: checked,
//       PageNumber: 1,
//       PageSize: 10,
//     };

//     // dispatch(getFoList(body));
//   };
//   const searchFilterFunction = text => {
   
 

//     if (text && !isEmpty(folist?.data)) {
//       let newFilterData = folist?.data?.filter(data =>
//         data.EFLDOFFNAME.toLowerCase().includes(text?.toLowerCase()),
//       );
//       if (!isEmpty(newFilterData)) {
//         setFilteredDataSource(newFilterData);
//       } else {
//         setFilteredDataSource([]);
//       }
//     }else if(!isEmpty(folist?.data)) {
//       setFilteredDataSource(folist?.data)
//     }
//   };

  

//   useEffect(() => {
//     fetchfiscal();
//   }, []);

//   const fetchfiscal = async () => {
//     ficsalYear({});
//   };
//   return (
//     <View style={styles.container}>
//       <View style={{flexDirection: 'row'}}>
//         <Searchbar
//           placeholder="Search"
//           onChangeText={text => searchFilterFunction(text)}
//           // value={search}
//           style={{width: '90%', elevation: 0}}
//         />
//         <View>
//           <TouchableOpacity onPress={() => handleFilterModalPress()}>
//             <Image
//               source={require('../../../assets/fill.png')}
//               style={{
//                 height: 27,
//                 width: 27,
//                 justifyContent: 'space-evenly',
//                 marginTop: 11,
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.container}>
//         <ScrollView>
//           <View style={{paddingLeft: 4, paddingRight: 4}}>
//             <Grid>
//               <Col size={30} style={{height: 35}}>
//                 <Row style={styles.cells}>
//                   <TouchableOpacity>
//                     <Text>Rank</Text>
//                   </TouchableOpacity>
//                 </Row>
//               </Col>
//               <Col size={100} style={{height: 35}}>
//                 <Row style={styles.cells}>
//                   <TouchableOpacity>
//                     <Text style={{textAlign: 'left'}}>Customer Name</Text>
//                   </TouchableOpacity>
//                 </Row>
//               </Col>

//               <Col size={40}>
//                 <Row style={styles.cell}>
//                   <Text>Branch </Text>
//                 </Row>
//               </Col>
//               <Col size={65}>
//                 <Row style={styles.cell}>
//                   <Text>Premium</Text>
//                 </Row>
//               </Col>
//             </Grid>
//           </View>
//           {loading ? (
//             <ActivityIndicator
//               size="large"
//               color="#F57722"
//               style={{marginTop: 100}}
//             />
//           ) : (
//             <View>
//               {!isEmpty(filteredDataSource) &&
//                 filteredDataSource.map((data, i) => (
//                   <TouchableOpacity
//                     onPress={event => {
//                       navigation.navigate('FieldOfficerHome', {
//                         fieldofficervalue: data,
//                         field,
//                       });
                    
//                     }}>
//                     <View style={{paddingLeft: 4, paddingRight: 4}}>
//                       <Grid>
//                         <Col size={30} style={{height: 35}}>
//                           <Row style={styles.cells}>
//                             <TouchableOpacity>
//                               <Text>
//                                 {data.TodayRank ||
//                                   data.MonthlyRank ||
//                                   data.YearlyRank}
//                               </Text>
//                             </TouchableOpacity>
//                           </Row>
//                         </Col>
//                         <Col size={100} style={{height: 35}}>
//                           <Row style={styles.cells}>
//                             {/* <TouchableOpacity
//                       onPress={event => {
//                         navigation.navigate('FieldOfficerHome',{
//                           fieldofficervalue:data
//                         });
                      
//                       }}> */}
//                             <Text>{data.EFLDOFFNAME}</Text>
//                             {/* </TouchableOpacity> */}
//                           </Row>
//                         </Col>

//                         <Col size={40}>
//                           <Row style={styles.cell}>
//                             <Text>{data.Brcode}</Text>
//                           </Row>
//                         </Col>
//                         <Col size={65}>
//                           <Row style={styles.cell}>
//                             <Text
//                               style={{
//                                 textAlign: 'right',
//                                 flex: 1,
//                                 paddingRight: 5,
//                               }}>
//                               {data.TodayPremium ||
//                               data.ThisMonthPremium ||
//                               data.ThisYearPremium == null ? (
//                                 <Text>-</Text>
//                               ) : (
//                                 parseFloat(
//                                   data.TodayPremium ||
//                                     data.ThisMonthPremium ||
//                                     data.ThisYearPremium,
//                                 )
//                                   .toFixed(2)
//                                   .toString()
//                                   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
//                               )}
//                             </Text>
//                           </Row>
//                         </Col>
//                       </Grid>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//             </View>
//           )}
//         </ScrollView>
//         <TouchableOpacity>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               paddingLeft: 10,
//               paddingRight: 10,
//               height: 30,
//               backgroundColor: '#F57722',
//             }}>
//             <Text style={{marginTop: 5}}>Month Total</Text>
//             <Text style={{marginTop: 5}}>
//               {parseFloat(totaldata)
//                 .toFixed(2)
//                 .toString()
//                 .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         animationType={'fade'}
//         transparent={true}
//         visible={filterModalVisible}
//         onRequestClose={() => {
         
//           setFilterModalVisible(!filterModalVisible);
//         }}>
//         <View style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'}}>
//           <View
//             style={{
//               backgroundColor: 'rgba(0,0,0,0)',
//               height: '55%',
//               width: '100%',
//               position: 'absolute',
//               bottom: 0,
//             }}>
//             <View
//               style={{
//                 marginTop: 20,
//                 backgroundColor: '#fff',
//                 height: '100%',
//                 borderRadius: 10,
//                 borderTopColor: '#C7C7CC',
//               }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   paddingHorizontal: 10,
//                   borderBottomWidth: 1,
//                   borderBottomColor: '#C7C7CC',
//                   paddingVertical: 10,
//                 }}>
//                 <Text
//                   style={{
//                     fontWeight: '500',
//                     fontSize: 16,
//                     lineHeight: 18,
//                     fontStyle: 'normal',
//                   }}>
//                   Filter
//                 </Text>
//                 <Pressable
//                   onPress={() => setFilterModalVisible(!filterModalVisible)}>
//                   <View
//                     style={{
//                       // backgroundColor: '#C7C7CC',
//                       borderRadius: 1000,
//                       padding: 5,
//                     }}>
//                     <Icon name="close" size={20} color="#9393AA" />
//                   </View>
//                 </Pressable>
//               </View>

//               <View style={{padding: 20}}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       lineHeight: 16.41,
//                       fontWeight: '400',
//                       color: '#000000',
//                       marginTop: 5,
//                     }}>
//                     {' '}
//                     Filter
//                   </Text>

//                   <View
//                     style={{
//                       backgroundColor: '#FAFAFA',
//                       width: '65%',
//                       borderRadius: 4,

//                       height: 30,
//                       alignItems: 'flex-end',
//                       paddingVertical: 0.1,
//                       borderWidth: 1,
//                       borderColor: '#DADADA',
//                     }}>
//                     <Picker
//                       selectedValue={selectedValue}
//                       style={{
//                         height: 40,
//                         width: 210,
//                         borderRadius: 20,
//                         alignSelf: 'center',
//                         marginTop: -13,
//                       }}
//                       mode={'dropdown'}
//                       onValueChange={(itemValue, itemIndex) =>
//                         setSelectedValue(itemValue)
//                       }>
//                       <Picker.Item label="Field Officer" value="FO" />
//                       <Picker.Item label="Branch" value="BRANCH" />
//                     </Picker>
//                     <Text
//                       style={{
//                         width: '100%',
//                         height: 60,
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                       }}>
//                       {' '}
//                     </Text>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     marginTop: 10,
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       lineHeight: 16.41,
//                       fontWeight: '400',
//                       color: '#000000',
//                       marginTop: 5,
//                     }}>
//                     {' '}
//                     FIscal Year
//                   </Text>

//                   <View
//                     style={{
//                       backgroundColor: '#FAFAFA',
//                       width: '65%',
//                       borderRadius: 4,

//                       height: 30,
//                       alignItems: 'flex-end',
//                       paddingVertical: 0.1,
//                       borderWidth: 1,
//                       borderColor: '#DADADA',
//                     }}>
//                     <Picker
//                       selectedValue={fiscalYear}
//                       onValueChange={setFiscalYear}
//                       mode={'dropdown'}
//                       style={{
//                         height: 40,
//                         width: 210,
//                         borderRadius: 20,
//                         alignSelf: 'center',
//                         marginTop: -13,
//                       }}>
//                       {!isEmpty(year) &&
//                         year?.map(({Year, ID}) => (
//                           <Picker.Item
//                             style={{color: 'black'}}
//                             key={ID || Date.now()}
//                             label={Year + ''}
//                             value={ID || Date.now()}
//                           />
//                         ))}
//                     </Picker>
//                     <Text
//                       style={{
//                         width: '100%',
//                         height: 60,
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                       }}>
//                       {' '}
//                     </Text>
//                   </View>
//                 </View>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginTop: 10,
//                     justifyContent: 'space-between',
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       backgroundColor: '#FAFAFA',
//                       borderRadius: 4,
//                       paddingVertical: 1,
//                       paddingHorizontal: 10,
//                       borderWidth: 1,
//                       borderColor: '#DADADA',
//                     }}>
//                     <RadioButton
//                       // value={payload.NCDYR}
//                       // onChangeText={NCDYR => setPayload({...payload, NCDYR})}
//                       status={checked === '1' ? 'checked' : 'unchecked'}
//                       onPress={() => setChecked('1')}
//                       color={'#F57722'}
//                     />
//                     <Text style={{fontWeight: '400', fontSize: 14}}>Today</Text>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       backgroundColor: '#FAFAFA',
//                       borderRadius: 4,
//                       paddingHorizontal: 10,
//                       borderWidth: 1,
//                       borderColor: '#DADADA',
//                     }}>
//                     <RadioButton
//                       // value={payload.NCDYR}
//                       // onChangeText={NCDYR => setPayload({...payload, NCDYR})}
//                       status={checked === '2' ? 'checked' : 'unchecked'}
//                       onPress={() => setChecked('2')}
//                       color={'#F57722'}
//                     />
//                     <Text style={{fontWeight: '400', fontSize: 14}}>
//                       Monthly
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       backgroundColor: '#FAFAFA',
//                       borderRadius: 4,
//                       paddingHorizontal: 10,
//                       borderWidth: 1,
//                       borderColor: '#DADADA',
//                     }}>
//                     <RadioButton
//                       // value={payload.NCDYR}
//                       // onChangeText={NCDYR => setPayload({...payload, NCDYR})}
//                       status={checked === '3' ? 'checked' : 'unchecked'}
//                       onPress={() => setChecked('3')}
//                       color={'#F57722'}
//                     />
//                     <Text style={{fontWeight: '400', fontSize: 14}}>
//                       Yearly
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={{margin: 1, maxWidth: '100%'}}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       marginTop: 5,
//                       borderRadius: 4,
//                       //  maxWidth:'30%',
//                       // margin:50,
//                       // paddingRight:20,
//                       // paddingLeft:20

//                       // maxHeight:'60%'
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           lineHeight: 14.06,
//                           fontWeight: '400',
//                           color: '#000000',
//                           marginTop: 5,
//                         }}>
//                         From
//                       </Text>
//                       <Date setDob={setDob} datefrom={datefrom} />
//                     </View>
//                     <View style={{paddingLeft: 10, paddingRight: 10}}>
//                       <Image
//                         source={require('../../../assets/shape.png')}
//                         style={{height: 7.99, width: 12.8, marginTop: 35}}
//                       />
//                     </View>
//                     <View>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           lineHeight: 14.06,
//                           fontWeight: '400',
//                           color: '#000000',
//                           marginTop: 5,
//                         }}>
//                         To
//                       </Text>
//                       <Dateto setDobTO={setDobTO} dateto={dateto} />
//                     </View>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     marginTop: 25,

//                     alignSelf: 'center',
//                     width: '100%',
//                     marginBottom: 70,
//                   }}>
//                   <TouchableOpacity
//                     style={buttonStyle.login}
//                     onPress={handleSubmit}>
//                     {/* onPress={() => setFilterModalVisible(!filterModalVisible)}> */}
//                     <Text style={textStyle.loginText}> Filter</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',

//     // paddingTop: 10,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   cell: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     flex: 1,
//     // justifyContent: 'space-around',
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cells: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     flex: 1,
//     paddingLeft: 10,
//     alignContent: 'center',
//     alignItems: 'center',
//     textAlign: 'right',
//   },
// });

// filterList.propTypes = {
//   data: propTypes.object.isRequired,
// };
// const mapStatesToProps = state => ({
//   data: state.SalesAndMarketingReducer,
// });
// export default connect(mapStatesToProps, {
//   data,
//   branchList,
//   // getFoList,
//   ficsalYear,
// })(filterList);



import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {Searchbar} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {TextInput, RadioButton, Provider} from 'react-native-paper';
import buttonStyle from '../../../style/button';
import textStyle from '../../../style/text';
import {
  branchList,
  data,
  ficsalYear,
  getFoList,
} from '../../../redux/actions/SalesAndMarketingAction';
import PropTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import Date from '../DateFrom';
import Dateto from '../DateTo';
const filterList = ({branchList, getFoList, data, ficsalYear}) => {
  const {folist, year} = useSelector(state => state.SalesAndMarketingReducer);

  const [listdata, setListData] = useState();
  const [loading, setLoading] = useState(true);
  const [datefrom, setDob] = useState('');
  const [dateto, setDobTO] = useState('');
  const [selectedValue, setSelectedValue] = useState('FO');
  const [search, setSearch] = useState('');
const field = selectedValue=="FO"?1:2

  useEffect(() => {
    if (!isEmpty(folist)) {
      setListData(folist);
      setLoading(false);
      setFilteredDataSource(folist);
      setMasterDataSource(folist);
    } else {
      setLoading(true);
    }
  }, [folist]);


  useEffect(() => {
    fetchfoList();
  }, []);

  const fetchfoList = async () => {
    getFoList({
      // DateFrom: '2001/11/23',
      // DateTo: '2021/11/23',
      // Key: 'FO',
      // PageNumber: 1,
      // PageSize: 50,
      DateFrom: '2021-01-01',
      DateTo: '2022-01-31',
      Key: 'FO',
      BusinessType: 1,
      fiscalid: 10,
      PageNumber: 1,
      PageSize: 10,
    });
  };

  // console.log('skaldhjksad',branchlist)
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const handleFilterModalPress = () => setFilterModalVisible(true);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [checked, setChecked] = useState('1');

  const onChangeSearch = query => setSearchQuery(query);
  const [fiscalYear, setFiscalYear] = useState('');
 
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  var data =
    !isEmpty(listdata) &&
    listdata?.data?.map(
      (data, i) =>
        data.TodayPremium || data.ThisMonthPremium || data.ThisYearPremium,
    );
  var totaldata = 0;
  for (var i = 0; i < data?.length; i++) {
    totaldata += data[i];
  }

  const dispatch = useDispatch();
  const handleSubmit = async () => {
   
    setFilterModalVisible(!filterModalVisible)
  
    let body = {
      DateFrom: datefrom,
      fiscalid: fiscalYear,
      DateTo: dateto,
      Key: selectedValue,
      BusinessType: checked,
      PageNumber: 1,
      PageSize: 10,
    };
    console.log('body of filedlist', body);
    dispatch(getFoList(body));
  };
  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.data.filter(function (item) {
        const itemData = item.EFLDOFFNAME
          ? item.EFLDOFFNAME.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  //   function bubbleSort(array) {
  //     var done = false;
  //     while (!done) {
  //       done = true;
  //       for (var i = 1; i < array.length; i += 1) {
  //         if (array[i - 1] > array[i]) {
  //           done = false;
  //           var tmp = array[i - 1];
  //           array[i - 1] = array[i];
  //           array[i] = tmp;
  //       }
  //   }
  // }

  // return array;
  // }
  // var number = [3,2,9,5,7,0]
  // console.log("ascending",bubbleSort(number))
  // const people = [
  //    {"id":1, "name":"Andrew", "age":30, "gender":"m", "category":"G"},
  //    {"id":2, "name":"Brandon", "age":25, "gender":"m", "category":"G"},
  //    {"id":3, "name":"Christine", "age":20, "gender":"m", "category":"G"},
  //    {"id":4, "name":"Elena", "age":29, "gender":"W", "category":"M"}
  // ];
  // const sorter =  !isEmpty(listdata) &&
  // listdata?.data?.sort((a, b) => {
  //    return a.YearlyRank - b.YearlyRank;
  // });
  // const sortByAge = arr => {
  //    arr.sort(sorter);
  // };
  // sortByAge(listdata);
  // console.log("sorter", sorter);

  useEffect(() => {
    fetchfiscal();
  }, []);

  const fetchfiscal = async () => {
    ficsalYear({});
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Searchbar
          placeholder="Search"
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          style={{width: '90%', elevation: 0}}
        />
        <View>
          <TouchableOpacity onPress={() => handleFilterModalPress()}>
            <Image
              source={require('../../../assets/fill.png')}
              style={{
                height: 27,
                width: 27,
                justifyContent: 'space-evenly',
                marginTop: 11,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView>
          <View style={{paddingLeft: 4, paddingRight: 4}}>
            <Grid>
              <Col size={30} style={{height: 35}}>
                <Row style={styles.cells}>
                  <TouchableOpacity>
                    <Text>Rank</Text>
                  </TouchableOpacity>
                </Row>
              </Col>
              <Col size={100} style={{height: 35}}>
                <Row style={styles.cells}>
                  <TouchableOpacity>
                    <Text style={{textAlign: 'left'}}>Customer Name</Text>
                  </TouchableOpacity>
                </Row>
              </Col>

              <Col size={40}>
                <Row style={styles.cell}>
                  <Text>Branch </Text>
                </Row>
              </Col>
              <Col size={65}>
                <Row style={styles.cell}>
                  <Text>Premium</Text>
                </Row>
              </Col>
            </Grid>
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#F57722"
              style={{marginTop: 100}}
            />
            
          ) : (
            <View>
              {!isEmpty(filteredDataSource) &&
                filteredDataSource?.data?.map((data, i) => (
                  <TouchableOpacity
                    onPress={event => {
                      navigation.navigate('FieldOfficerHome', {
                        fieldofficervalue: data,field
                      });
                      // console.log('dataselcted', data);
                    }}>
                    <View style={{paddingLeft: 4, paddingRight: 4}}>
                      <Grid>
                        <Col size={30} style={{height: 35}}>
                          <Row style={styles.cells}>
                            <TouchableOpacity>
                              <Text>
                                {data.TodayRank ||
                                  data.MonthlyRank ||
                                  data.YearlyRank}
                              </Text>
                            </TouchableOpacity>
                          </Row>
                        </Col>
                        <Col size={100} style={{height: 35}}>
                          <Row style={styles.cells}>
                            {/* <TouchableOpacity
                      onPress={event => {
                        navigation.navigate('FieldOfficerHome',{
                          fieldofficervalue:data
                        });
                        console.log('dataselcted', data);
                      }}> */}
                            <Text>{data.EFLDOFFNAME}</Text>
                            {/* </TouchableOpacity> */}
                          </Row>
                        </Col>

                        <Col size={40}>
                          <Row style={styles.cell}>
                            <Text>{data.Brcode}</Text>
                          </Row>
                        </Col>
                        <Col size={65}>
                          <Row style={styles.cell}>
                            <Text
                              style={{
                                textAlign: 'right',
                                flex: 1,
                                paddingRight: 5,
                              }}>
                              {data.TodayPremium||data.ThisMonthPremium||data.ThisYearPremium == null ? 
                                <Text>-</Text> : 
                                parseFloat(
                                  data.TodayPremium ||
                                    data.ThisMonthPremium ||
                                    data.ThisYearPremium,
                                )
                                  .toFixed(2)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              }
                            </Text>
                          </Row>
                        </Col>
                      </Grid>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </ScrollView>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              height: 30,
              backgroundColor: '#F57722',
            }}>
            <Text style={{marginTop: 5}}>Month Total</Text>
            <Text style={{marginTop: 5}}>
              {parseFloat(totaldata)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

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

              <View style={{padding: 20}}>
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
                    Filter
                  </Text>

                  <View
                    style={{
                      backgroundColor: '#FAFAFA',
                      width: '65%',
                      borderRadius: 4,

                      height: 30,
                      alignItems: 'flex-end',
                      paddingVertical: 0.1,
                      borderWidth: 1,
                      borderColor: '#DADADA',
                    }}>
                    <Picker
                      selectedValue={selectedValue}
                      style={{
                        height: 40,
                        width: 210,
                        borderRadius: 20,
                        alignSelf: 'center',
                        marginTop: -13,
                      }}
                      mode={'dropdown'}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                      }>
                      <Picker.Item label="Field Officer" value="FO" />
                      <Picker.Item label="Branch" value="BRANCH" />
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
                    marginTop: 10,
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
                    FIscal Year
                  </Text>

                  <View
                    style={{
                      backgroundColor: '#FAFAFA',
                      width: '65%',
                      borderRadius: 4,

                      height: 30,
                      alignItems: 'flex-end',
                      paddingVertical: 0.1,
                      borderWidth: 1,
                      borderColor: '#DADADA',
                    }}>
                    <Picker
                      selectedValue={fiscalYear}
                      onValueChange={setFiscalYear}
                      mode={'dropdown'}
                      style={{
                        height: 40,
                        width: 210,
                        borderRadius: 20,
                        alignSelf: 'center',
                        marginTop: -13,
                      }}>
                      {!isEmpty(year) &&
                        year?.map(({Year, ID}) => (
                          <Picker.Item
                            style={{color: 'black'}}
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
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#FAFAFA',
                      borderRadius: 4,
                      paddingVertical: 1,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#DADADA',
                    }}>
                    <RadioButton
                      // value={payload.NCDYR}
                      // onChangeText={NCDYR => setPayload({...payload, NCDYR})}
                      status={checked === '1' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('1')}
                      color={'#F57722'}
                    />
                    <Text style={{fontWeight: '400', fontSize: 14}}>Today</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#FAFAFA',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#DADADA',
                    }}>
                    <RadioButton
                      // value={payload.NCDYR}
                      // onChangeText={NCDYR => setPayload({...payload, NCDYR})}
                      status={checked === '2' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('2')}
                      color={'#F57722'}
                    />
                    <Text style={{fontWeight: '400', fontSize: 14}}>
                      Monthly
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#FAFAFA',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#DADADA',
                    }}>
                    <RadioButton
                      // value={payload.NCDYR}
                      // onChangeText={NCDYR => setPayload({...payload, NCDYR})}
                      status={checked === '3' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('3')}
                      color={'#F57722'}
                    />
                    <Text style={{fontWeight: '400', fontSize: 14}}>
                      Yearly
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
                </View>
                <View
                  style={{
                    marginTop: 25,

                    alignSelf: 'center',
                    width: '100%',
                    marginBottom: 70,
                  }}>
                  <TouchableOpacity
                    style={buttonStyle.login}
                    onPress={handleSubmit}>
                    {/* onPress={() => setFilterModalVisible(!filterModalVisible)}> */}
                    <Text style={textStyle.loginText}> Filter</Text>
                  </TouchableOpacity>
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
    width: '100%',
    height: '100%',

    // paddingTop: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    // justifyContent: 'space-around',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cells: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    paddingLeft: 10,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
  },
});

filterList.PropTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.SalesAndMarketingReducer,
});
export default connect(mapStatesToProps, {
  data,
  branchList,
  getFoList,
  ficsalYear,
})(filterList);
