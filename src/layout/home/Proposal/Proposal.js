import React, {useState, useEffect} from 'react';
import {List} from 'react-native-paper';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  RefreshControl,
  Image,
} from 'react-native';
import propTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEdit from 'react-native-vector-icons/FontAwesome';
import {
  onlinelist,
  data,
  onlineKycComments,
} from '../../../redux/actions/ProposalAction';
import accordionStyle from '../../../style/accordion';
import moment from 'moment';
import OnlineProposalComments from './OnlineProposalComments';
import DetailsWizA from './DetailsWizA';

const MyComponent = ({onlinelist, data, onlineKycComments}) => {
 
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

 const [expandedList,setExpandedList] = useState({
  'Moter Cycle' : false,
  'Commercial Vehicle' : false,
  'Private Vehicle' : false,
  'Travel Medical Insurance Mediclaim':false
 })


  const [surveyorModalVisible, setSurveyorModalVisible] = useState(false);
  const handleSurveyorModalPress = () => setSurveyorModalVisible(true);
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);
  const handleDetailsModalPress = () => setDetailsModalVisible(true);
  const [largestDep,setLargestDep] = useState(null)
  const [id, setId] = useState('');
  const [docid, setDocID] = useState('');
 
  const {list, kyccomment} = useSelector(state => state.ProposalReducer);
  console.log('onlinelist',list)
  const user = useSelector(state => state.auth.user);

  const kyc = !isEmpty(user) && user[0]?.KycId;

  const navigation = useNavigation();

  useEffect(() => {
    if (isEmpty(user)) {
      navigation.navigate('Login');
    } else {
      listData();
    }
  }, []);

  useEffect(() => {
    listData();
  }, []);

  const listData = async () => {
    onlinelist({KYCID: kyc});
  };

  useEffect(() => {
    kycCommentData();
  }, []);

  const kycCommentData = async () => {
    onlineKycComments({KYCID: kyc});
    //77087
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    listData(list);
    wait(1000).then(() => setRefreshing(false));
  }, [list]);

  const filterProposal = (value) =>{
      return list?.data?.filter(item=>item?.DEPARTMENT === value)
  }


  let refNoMoter =  list?.data?.filter( filter => filter.DEPARTMENT === 'Motor Cycle')
  let refNoCommercial  = list?.data?.filter(filter=>filter.DEPARTMENT === 'Commercial Vehicle')
  let refNoPrivate =list?.data?.filter(filter=>filter.DEPARTMENT === 'Private Vehicle')
  let refNoTMI =list?.data?.filter(filter=>filter.DEPARTMENT === 'Travel Medical Insurance Mediclaim')
  const handlePressChild = (key) =>{
    let status = !expandedList[key]
        setExpandedList({...expandedList,[key]:status})
  }

  useEffect(()=>{
    let  largestMoter={}
    refNoMoter?.length > 0 && refNoMoter?.map((item,i)=>{
      if(isEmpty(largestMoter)){
        if(isEmpty(largestMoter)){
          largestMoter = item
        }else{
           if(largestMoter?.REFERENCEID > item?.REFERENCEID ){
            largestMoter = item
           }
        }
      }
    })

    let largestCommercial={};

    refNoCommercial?.length > 0 && refNoCommercial?.map(function(item,i) {
        if(isEmpty(largestCommercial)){
          largestCommercial = item
        }else{
          if(item?.REFERENCEID  > largestCommercial?.REFERENCEID){
            largestCommercial = item
          }
        }
    })  

    let largestPrivate={};
    refNoPrivate?.length > 0 && refNoPrivate?.map(function(item,i) {
        if(isEmpty(largestPrivate)){
          largestPrivate = item
        }else{
          if(item?.REFERENCEID > largestPrivate?.REFERENCEID  ){
            largestPrivate = item
          }
        }
    })  
    let largestTMI={};
    refNoTMI?.length > 0 && refNoTMI?.map(function(item,i) {
        if(isEmpty(largestTMI)){
          largestTMI = item
        }else{
          if(item?.REFERENCEID > largestTMI?.REFERENCEID  ){
            largestTMI = item
          }
        }
    })  

   
    let merge =[...[largestMoter],...[largestCommercial],...[largestPrivate],...[largestTMI]]
    
    let largest= {}
    merge?.length > 0 && merge?.map(function(item,i) {
      if(isEmpty(largest) && !isEmpty(item)){
        largest = item
      }else{
        if(!isEmpty(item) &&  item?.REFERENCEID > largest?.REFERENCEID ){
          // console.log(item?.REFERENCEID,largest?.REFERENCEID)
          largest = item
        }
      }
    }) 
   
    if(!isEmpty(largest)){
      setLargestDep(largest?.DEPARTMENT)
    }

   
  },[refNoPrivate])

  useEffect(()=>{
    setExpandedList({...expandedList,[largestDep]:true})
  },[largestDep])
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{margin: 10, borderRadius: 10, backgroundColor: '#fff'}}>
          <List.Accordion
         expanded={expanded}
         onPress={handlePress}
            style={{
              borderRadius: 10,
              padding: 10,
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
            title="1.  Online Proposal List">
            <View style={{marginTop: 10}}>

              {!isEmpty(list) &&
              filterProposal('Motor Cycle')?.length > 0 ? (
                <List.Accordion
                 expanded = {expandedList['Motor Cycle']}
                onPress ={()=>{
                  handlePressChild('Motor Cycle')
                }}
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'rgba(245, 119, 34, 0.5)',
                  }}
                  title="Motor Cycle">
                  {!isEmpty(list) ? (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#F57722',
                        borderRadius: 6,

                        elevation: 200,
                        padding: 10,
                        margin: 6,
                      }}>
                      {!isEmpty(list) &&
                        list?.data
                          ?.filter(
                            filter => filter.DEPARTMENT === 'Motor Cycle',
                          )
                          .map((data, i) => (
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 1,
                                padding: 10,
                                borderColor: 'rgba(0, 0, 0, 0.15)',
                                borderWidth: 1,
                                borderRadius: 8,
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 10,
                                elevation: 5,
                                shadowColor: '#F57722',
                              }}>
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  marginTop: 5,
                                }}>
                                <Text>Serial Number</Text>
                                <Text style={{paddingEnd: 10}}> {data.SN}</Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  marginTop: 5,
                                }}>
                                <Text>Reference Id</Text>
                                <Text style={{paddingEnd: 10}}>
                                  {' '}
                                  {data.REFERENCEID}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  marginTop: 5,
                                }}>
                                <Text>Department</Text>
                                <Text style={{paddingEnd: 10}}>
                                  {data.DEPARTMENT}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  marginTop: 5,
                                }}>
                                <Text>Amount</Text>
                                <Text style={{paddingEnd: 10}}>
                                  {' '}
                                  {data.AMOUNT == null
                                    ? 'No Amount'
                                    : data.AMOUNT}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  marginTop: 5,
                                }}>
                                <Text>Insured Name</Text>
                                <Text style={{paddingEnd: 10}}>
                                  {data.INSUREDNAME}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  marginTop: 5,
                                }}>
                                <Text>Status</Text>
                                <Text style={{paddingEnd: 10}}>
                                  {' '}
                                  {data.STATUS}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  marginTop: 5,
                                }}>
                                <Text>Created Date</Text>
                                <Text style={{paddingEnd: 10}}>
                                  {data.CREATEDDATE}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginRight: 10,
                                }}>
                                <View
                                  style={
                                    accordionStyle.accordionContentSection
                                  }>
                                  <TouchableOpacity
                                    style={{
                                      backgroundColor: '#F57722',
                                      paddingHorizontal: 11,
                                      marginTop: 10,
                                      borderRadius: 4,
                                      paddingVertical: 5,
                                    }}
                                    onPress={() => {
                                      setDocID(data.Docid)
                                      handleSurveyorModalPress()}}>
                                    {/* <Text>Online Proposal Comments</Text> */}
                                    <Text>Comments</Text>
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={
                                    accordionStyle.accordionContentSection
                                  }>
                                  <TouchableOpacity
                                    style={{
                                      backgroundColor: '#F57722',
                                      paddingHorizontal: 11,
                                      marginTop: 10,
                                      borderRadius: 4,
                                      paddingVertical: 5,
                                    }}
                                    onPress={() => {
                                      setId(data.REFERENCEID);
                                      handleDetailsModalPress({
                                        paramKey: data.REFERENCEID,
                                      });
                                    }}>
                                    {/* <Text>Online Proposal Comments</Text> */}
                                    <Text>Details</Text>
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={
                                    accordionStyle.accordionContentSection
                                  }>
                                  {data.STATUS == 'ACCEPTED' ? (
                                    <TouchableOpacity
                                      style={{
                                        backgroundColor: '#F57722',
                                        paddingHorizontal: 11,
                                        marginTop: 10,
                                        borderRadius: 4,
                                        paddingVertical: 5,
                                      }}
                                      onPress={() =>
                                        navigation.navigate('PaymentMethod', {
                                          paramKey: data.REFERENCEID,
                                        })
                                      }>
                                      <Text>Pay</Text>
                                    </TouchableOpacity>
                                  ) : null}
                                </View>
                              </View>
                            </View>
                          ))}
                    </View>
                  ) : (
                    <Image
                      style={{height: 200, width: 300, alignSelf: 'center'}}
                      source={require('../../../assets/nulldata.jpg')}
                    />
                  )}
                </List.Accordion>
              ) : null}
              <View style={{marginTop: 10}} />


              {!isEmpty(list) &&
              filterProposal('Commercial Vehicle')?.length > 0 ? (
              <List.Accordion
              expanded = {expandedList['Commercial Vehicle']}
              onPress ={()=>{
                handlePressChild('Commercial Vehicle')
              }}
                style={{
                  borderRadius: 10,
                  backgroundColor: 'rgba(245, 119, 34, 0.5)',
                }}
                title="Commercial Vehicle">
                {!isEmpty(list) ? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#F57722',
                      borderRadius: 6,

                      elevation: 200,
                      padding: 10,
                      margin: 6,
                    }}>
                    {!isEmpty(list) &&
                      list?.data
                        ?.filter(
                          filter => filter.DEPARTMENT === 'Commercial Vehicle',
                        )
                        .map((data, i) => (
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderRadius: 1,
                              padding: 10,
                              borderColor: 'rgba(0, 0, 0, 0.15)',
                              borderWidth: 1,
                              borderRadius: 8,
                              marginLeft: 5,
                              marginRight: 5,
                              marginTop: 10,
                              elevation: 5,
                              shadowColor: '#F57722',
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Serial Number</Text>
                              <Text style={{paddingEnd: 10}}> {data.SN}</Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Reference Id</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.REFERENCEID}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Department</Text>
                              <Text style={{paddingEnd: 10}}>
                                {data.DEPARTMENT}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Amount</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.AMOUNT == null
                                  ? 'No Amount'
                                  : data.AMOUNT}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Insured Name</Text>
                              <Text style={{paddingEnd: 10}}>
                                {data.INSUREDNAME}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Status</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.STATUS}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Created Date</Text>
                              <Text style={{paddingEnd: 10}}>
                                {data.CREATEDDATE}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginRight: 10,
                              }}>
                              <View
                                style={accordionStyle.accordionContentSection}>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#F57722',
                                    paddingHorizontal: 11,
                                    marginTop: 10,
                                    borderRadius: 4,
                                    paddingVertical: 5,
                                  }}
                                  onPress={() => handleSurveyorModalPress()}>
                                  {/* <Text>Online Proposal Comments</Text> */}
                                  <Text>Comments</Text>
                                </TouchableOpacity>
                              </View>
                              <View
                                style={accordionStyle.accordionContentSection}>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#F57722',
                                    paddingHorizontal: 11,
                                    marginTop: 10,
                                    borderRadius: 4,
                                    paddingVertical: 5,
                                  }}
                                  onPress={() => {
                                    setId(data.REFERENCEID);
                                    handleDetailsModalPress({
                                      paramKey: data.REFERENCEID,
                                    });
                                  }}>
                                  {/* <Text>Online Proposal Comments</Text> */}
                                  <Text>Details</Text>
                                </TouchableOpacity>
                              </View>
                              <View
                                style={accordionStyle.accordionContentSection}>
                                {data.STATUS == 'ACCEPTED' ? (
                                  <TouchableOpacity
                                    style={{
                                      backgroundColor: '#F57722',
                                      paddingHorizontal: 11,
                                      marginTop: 10,
                                      borderRadius: 4,
                                      paddingVertical: 5,
                                    }}
                                    onPress={() =>
                                      navigation.navigate('PaymentMethod', {
                                        paramKey: data.REFERENCEID,
                                      })
                                    }>
                                    <Text>Pay</Text>
                                  </TouchableOpacity>
                                ) : null}
                              </View>
                            </View>
                          </View>
                        ))}
                  </View>
                ) : (
                  <Image
                    style={{height: 200, width: 300, alignSelf: 'center'}}
                    source={require('../../../assets/nulldata.jpg')}
                  />
                )}
              </List.Accordion>
               ) : null}

              <View style={{marginTop: 10}} />
              {!isEmpty(list) &&
              filterProposal('Private Vehicle')?.length > 0 ? (
              <List.Accordion
                expanded = {expandedList['Private Vehicle']}
                onPress ={()=>{
                  handlePressChild('Private Vehicle')
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: 'rgba(245, 119, 34, 0.5)',
                }}
                title="Private Vehicle">
                {!isEmpty(list) ? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#F57722',
                      borderRadius: 6,

                      elevation: 200,
                      padding: 10,
                      margin: 6,
                    }}>
                    {!isEmpty(list) &&
                      list?.data
                        ?.filter(
                          filter => filter.DEPARTMENT === 'Private Vehicle',
                        )
                        .map((data, i) => (
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderRadius: 1,
                              padding: 10,
                              borderColor: 'rgba(0, 0, 0, 0.15)',
                              borderWidth: 1,
                              borderRadius: 8,
                              marginLeft: 5,
                              marginRight: 5,
                              marginTop: 10,
                              elevation: 5,
                              shadowColor: '#F57722',
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Serial Number</Text>
                              <Text style={{paddingEnd: 10}}> {data.SN}</Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Reference Id</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.REFERENCEID}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Department</Text>
                              <Text style={{paddingEnd: 10}}>
                                {data.DEPARTMENT}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Amount</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.AMOUNT == null
                                  ? 'No Amount'
                                  : data.AMOUNT}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Insured Name</Text>
                              <Text style={{paddingEnd: 10}}>
                                {data.INSUREDNAME}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Status</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.STATUS}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Created Date</Text>
                              <Text style={{paddingEnd: 10}}>
                                {data.CREATEDDATE}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginRight: 10,
                              }}>
                              <View
                                style={accordionStyle.accordionContentSection}>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#F57722',
                                    paddingHorizontal: 11,
                                    marginTop: 10,
                                    borderRadius: 4,
                                    paddingVertical: 5,
                                  }}
                                  onPress={() => handleSurveyorModalPress()}>
                                  {/* <Text>Online Proposal Comments</Text> */}
                                  <Text>Comments</Text>
                                </TouchableOpacity>
                              </View>
                              <View
                                style={accordionStyle.accordionContentSection}>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#F57722',
                                    paddingHorizontal: 11,
                                    marginTop: 10,
                                    borderRadius: 4,
                                    paddingVertical: 5,
                                  }}
                                  onPress={() => {
                                    setId(data.REFERENCEID);
                                    handleDetailsModalPress({
                                      paramKey: data.REFERENCEID,
                                    });
                                  }}>
                                  {/* <Text>Online Proposal Comments</Text> */}
                                  <Text>Details</Text>
                                </TouchableOpacity>
                              </View>
                              <View
                                style={accordionStyle.accordionContentSection}>
                                {data.STATUS == 'ACCEPTED' ? (
                                  <TouchableOpacity
                                    style={{
                                      backgroundColor: '#F57722',
                                      paddingHorizontal: 11,
                                      marginTop: 10,
                                      borderRadius: 4,
                                      paddingVertical: 5,
                                    }}
                                    onPress={() =>
                                      navigation.navigate('PaymentMethod', {
                                        paramKey: data.REFERENCEID,
                                      })
                                    }>
                                    <Text>Pay</Text>
                                  </TouchableOpacity>
                                ) : null}
                              </View>
                            </View>
                          </View>
                        ))}
                  </View>
                ) : (
                  <Image
                    style={{height: 200, width: 300, alignSelf: 'center'}}
                    source={require('../../../assets/nulldata.jpg')}
                  />
                )}
              </List.Accordion>
              ) : null}
              {/* <View style={{marginTop: 10}} />
              <List.Accordion
                //  expanded
                style={{
                  borderRadius: 10,
                  backgroundColor: 'rgba(245, 119, 34, 0.5)',
                }}
                title="Passenger Carrying">
                {
                 
             
                  <Image
                    style={{height: 200, width: 300, alignSelf: 'center'}}
                    source={require('../../../assets/nulldata.jpg')}
                  />
                }
              </List.Accordion>
              <View style={{marginTop: 10}} />
              <List.Accordion
                //  expanded
                style={{
                  borderRadius: 10,
                  backgroundColor: 'rgba(245, 119, 34, 0.5)',
                }}
                title="Tractor">
                {
                 
             
                  <Image
                    style={{height: 200, width: 300, alignSelf: 'center'}}
                    source={require('../../../assets/nulldata.jpg')}
                  />
                }
              </List.Accordion>
              <View style={{marginTop: 10}} />
              <List.Accordion
                //  expanded
                style={{
                  borderRadius: 10,
                  backgroundColor: 'rgba(245, 119, 34, 0.5)',
                }}
                title="Taxi">
                {
                 
             
                  <Image
                    style={{height: 200, width: 300, alignSelf: 'center'}}
                    source={require('../../../assets/nulldata.jpg')}
                  />
                }
              </List.Accordion> */}

              <View style={{marginTop: 10}} />
              {!isEmpty(list) && filterProposal('Travel Medical Insurance Mediclaim')?.length > 0? (
                <List.Accordion
                expanded = {expandedList['Travel Medical Insurance Mediclaim']}
                onPress ={()=>{
                  handlePressChild('Travel Medical Insurance Mediclaim')
                }}
                  style={{
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: 'rgba(245, 119, 34, 0.5)',
                  }}
                  title="Travel Medical Insurance">
                    {!isEmpty(list)? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#F57722',
                      borderRadius: 6,

                      elevation: 200,
                      padding: 10,
                      margin: 6,
                    }}>
                    {!isEmpty(list) &&
                      list?.data
                        ?.filter(
                          filter =>
                            filter.DEPARTMENT === 'Travel Medical Insurance Mediclaim',
                        )
                        .map((data, i) => (
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',

                              padding: 10,
                              borderColor: 'rgba(0, 0, 0, 0.15)',
                              borderWidth: 1,
                              borderRadius: 8,
                              marginLeft: 5,
                              marginRight: 5,
                              marginTop: 10,
                              elevation: 5,
                              shadowColor: '#F57722',
                            }}>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Reference Id</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.REFERENCEID}
                              </Text>
                            </View>
                            <View
                              style={{
                                 justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                                flex:1
                               
                              }}>
                                <View style={{width:'40%'}}>
                              <Text >Department</Text>
                              </View>
                              <View style={{width:'60%',alignSelf:'flex-end'}}>
                              <Text style={{alignSelf:'flex-end',padding:5}}>
                                {data.DEPARTMENT}
                              </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Amount</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.AMOUNT == null
                                  ? 'No Amount'
                                  : data.AMOUNT}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Insured Name</Text>
                              <Text style={{paddingEnd: 10}}>
                                {data.INSUREDNAME}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Status</Text>
                              <Text style={{paddingEnd: 10}}>
                                {' '}
                                {data.STATUS}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 5,
                              }}>
                              <Text>Created Date</Text>
                              <Text style={{paddingEnd: 10}}>
                                {data.CREATEDDATE}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginRight: 10,
                              }}>
                              <View
                                style={accordionStyle.accordionContentSection}>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#F57722',
                                    paddingHorizontal: 11,
                                    marginTop: 10,
                                    borderRadius: 4,
                                    paddingVertical: 5,
                                  }}
                                  onPress={() => handleSurveyorModalPress()}>
                                  {/* <Text>Online Proposal Comments</Text> */}
                                  <Text>Comments</Text>
                                </TouchableOpacity>
                              </View>
                            
                              <View
                                style={accordionStyle.accordionContentSection}>
                                {data.STATUS == 'ACCEPTED' ? (
                                  <TouchableOpacity
                                    style={{
                                      backgroundColor: '#F57722',
                                      paddingHorizontal: 11,
                                      marginTop: 10,
                                      borderRadius: 4,
                                      paddingVertical: 5,
                                    }}
                                    onPress={() =>
                                      navigation.navigate('PaymentMethod', {
                                        paramKey: data.REFERENCEID,
                                      })
                                    }>
                                    <Text>Pay</Text>
                                  </TouchableOpacity>
                                ) : null}
                              </View>
                            </View>
                          </View>
                        ))}
                  </View>
                   ) : (
                    <Image
                      style={{height: 200, width: 300, alignSelf: 'center'}}
                      source={require('../../../assets/nulldata.jpg')}
                    />
                  )}
                </List.Accordion>
              ) : null}



            </View>
          </List.Accordion>
        </View>

        <View style={{margin: 10, borderRadius: 10}}>
          <List.Accordion
            title="2.  Online KYC Comments"
            style={{
              borderRadius: 10,
              padding: 10,
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
            {!isEmpty(kyccomment) &&
              kyccomment?.data?.map((data, i) => (
                <View
                  style={{
                    backgroundColor: '#fff',

                    padding: 10,
                    borderColor: 'rgba(0, 0, 0, 0.15)',
                    borderWidth: 1,
                    borderRadius: 8,
                    marginLeft: 2,
                    marginRight: 2,
                    marginTop: 6,
                    elevation: 5,
                    shadowColor: 'rgba(245, 119, 34, 0.5)',

                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Title</Text>
                    <Text style={{paddingEnd: 10}}> {data.Title}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Data</Text>
                    <Text style={{paddingEnd: 10}}> {data.Data}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Comments</Text>
                    <Text style={{paddingEnd: 10}}>{data.Comments}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Status</Text>
                    <Text style={{paddingEnd: 10}}>
                      {' '}
                      {data.Status == 1 ? 'Correct' : 'Mistake'}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Log Date</Text>
                    <Text style={{paddingEnd: 10}}>
                      {moment(data.LogDate).format('LL')}
                    </Text>
                  </View>
                  <View style={accordionStyle.kycEdit}>
                    {data.Status == 0 ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'rgba(245, 119, 34, 0.8)',
                          paddingHorizontal: 11,
                          marginTop: 10,
                          borderRadius: 4,
                          paddingVertical: 5,
                        }}
                        onPress={() =>
                          navigation.navigate('KycIndividualStepOne')
                        }>
                        <View style={{flexDirection: 'row'}}>
                          <IconEdit
                            name="edit"
                            size={17}
                            color="#fff"
                            style={{marginTop: 1}}
                          />
                          <Text style={{marginLeft: 5, color: '#fff'}}>
                            Edit
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              ))}
          </List.Accordion>
        </View>
      </ScrollView>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={surveyorModalVisible}
        onRequestClose={() => {
          setSurveyorModalVisible(!surveyorModalVisible);
        }}>
        <View style={{backgroundColor: '#0006', height: '100%', width: '100%'}}>
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
              }}>
              <Text style={{fontWeight: '500', fontSize: 15}}>
                Online Proposal Comments
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
            <OnlineProposalComments ProposalDocId={docid}/>
          </View>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={DetailsModalVisible}
        onRequestClose={() => {
          setDetailsModalVisible(!DetailsModalVisible);
        }}>
        <View style={{backgroundColor: '#0006', height: '100%', width: '100%'}}>
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
              }}>
              <Text style={{fontWeight: '500', fontSize: 15}}>
                Details of Online Proposal
              </Text>
              <Pressable
                onPress={() => setDetailsModalVisible(!DetailsModalVisible)}>
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
            <DetailsWizA referencId={id} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

MyComponent.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ProposalReducer,
});
export default connect(mapStatesToProps, {
  onlinelist,
  data,
  onlineKycComments,
})(MyComponent);
