import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import accordionStyle from '../../style/accordion';
import textStyle from '../../style/text';

import Icon from 'react-native-vector-icons/AntDesign';
import ClaimTrackingSurveyor from './ClaimTrackingSurveyor';
import ClaimTrackingDocument from './ClaimTrackingDocument';
import ClaimTrackingClaimStatus from './ClaimTrackingClaimStatus';

import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import PropTypes from 'prop-types';
import {claimTrackingHomeList} from '../../redux/actions/ClaimTrackingAction';
import {useDispatch, useSelector, connect} from 'react-redux';
import {isEmpty} from 'lodash';
const claimTrackingHome = ({claimTrackingHomeList}) => {
  const user = useSelector(state => state.auth.user);
  const kyc = user[0]?.KycId;
 
  const navigation = useNavigation();
  const [expanded, setExpanded] = React.useState(true);
  const [loading, setLoading] = useState(true);
  const [surveyorModalVisible, setSurveyorModalVisible] = useState(false);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [claimModalVisible, setClaimModalVisible] = useState(false);

  const handleSurveyorModalPress = () => setSurveyorModalVisible(true);
  const handleDocumentModalPress = () => setDocumentModalVisible(true);
  const handleClaimModalPress = () => setClaimModalVisible(true);


  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    fetchMetaData();
  }, []);
  const fetchMetaData = async () => {
    claimTrackingHomeList({
      // KYCID: '221122',
      // KYCID: "15124",
      KYCID: kyc,
    });
  };

  const {home} = useSelector(state => state.ClaimTrackingReducer);
  // const {userID} = useSelector(state => state.AuthReducer);
  const [claimDetails, setClaimDetails] = useState();
  // const[kycID, setKycId] = useState();
  useEffect(() => {
    let i = 0;
    if (!isEmpty(home)) {
      setLoading(false);
      setClaimDetails(home);
    } else {
      setLoading(true);
    }
  }, [home]);
 
  
  const data = (ROWNUMBER, CLAIMNO) => {
    let snNumber = ROWNUMBER;
    let claimID = CLAIMNO;

    return (
      <View style={{flexDirection: 'row'}}>
        <Text>{snNumber}</Text>
        <Text style={{marginLeft: 10}}>{claimID}</Text>
      </View>
    );
  };
  const [claimnumber, setClaimNumber] = useState('');
  const [claimId, setClaimID] = useState('');

  return (
    <SafeAreaView style={{backgroundColor: '#F5F7F9', height: '100%'}}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#F57722"
          style={{marginTop: 250}}
        />
      ) : (
        <ScrollView style={{padding: 15}}>
          {!isEmpty(claimDetails) &&
            claimDetails?.data.map((premium, i) => (
              <View style={accordionStyle.accordionContainer}>
                <Collapse>
                  <CollapseHeader style={accordionStyle.accordion}>
                    <Text style={textStyle.accordionHeader}>
                      {data(premium.SN +')', premium.CLAIMNO)}
                    </Text>
                    <Icon name="down" size={16} color="#9393AA" />
                  </CollapseHeader>
                  <CollapseBody style={accordionStyle.accordionContent}>
                    <View style={{width: '100%'}}>
                      <View style={accordionStyle.accordionContentSection}>
                        <View style={{width: '50%'}}>
                          <Text style={accordionStyle.accordionContentHeader}>
                            Own Vehicle No.
                          </Text>
                          <Text
                            style={accordionStyle.accordionContentHeaderText}>
                            {premium.OWNVEHICLENO}
                          </Text>
                        </View>
                        <View style={{width: '42%'}}>
                          <Text style={accordionStyle.accordionContentHeader}>
                            Regd. Date
                          </Text>
                          <Text
                            style={accordionStyle.accordionContentHeaderText}>
                            {moment(premium.REGD_DATE).format(
                              'YYYY-MM-DD, h:mm',
                            )}
                          </Text>
                        </View>
                      </View>
                      <View style={accordionStyle.accordionContentSection}>
                        <View>
                          <Text style={accordionStyle.accordionContentHeader}>
                            Doc Id.
                          </Text>
                          <Text
                            style={accordionStyle.accordionContentHeaderText}>
                            {premium.DOCID}
                          </Text>
                        </View>

                        <View style={{width: '42%'}}>
                          <Text style={accordionStyle.accordionContentHeader}>
                            Claim Status
                          </Text>
                          <Text
                            style={accordionStyle.accordionContentHeaderText}>
                            {premium.CLAIMSTATUS}
                          </Text>
                        </View>
                      </View>
                      <View style={accordionStyle.accordionContentSection}>
                        <View>
                          <Text style={accordionStyle.accordionContentHeader}>
                            Document No.
                          </Text>
                          <Text
                            style={accordionStyle.accordionContentHeaderText}>
                            {premium.DOCUMENTNO}
                          </Text>
                        </View>

                        <View style={{width: '42%'}}>
                          <Text style={accordionStyle.accordionContentHeader}>
                            Claim Id
                          </Text>
                          <Text
                            style={accordionStyle.accordionContentHeaderText}>
                            {premium.CLAIMID}
                          </Text>
                        </View>
                      </View>
                     
                      <View style={accordionStyle.accordionContentSection}>
                        <TouchableOpacity
                          style={accordionStyle.accordionButton}
                          onPress={() => {
                            setClaimNumber(premium.CLAIMNO);
                            handleSurveyorModalPress();
                          }}>
                          <Text>Surveyor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={accordionStyle.accordionButton}
                          onPress={() => {
                            setClaimNumber(premium.CLAIMNO);
                            setClaimID(premium.CLAIMID)
                          handleDocumentModalPress()}}>
                          <Text>Document</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={accordionStyle.accordionButton}
                          onPress={() =>{
                            setClaimNumber(premium.CLAIMNO);
                          handleClaimModalPress()}}>
                          <Text>Claim Status</Text>
                        </TouchableOpacity>
                      
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('ClaimTrackingChat',{ID:premium.CLAIMID})
                          }>
                          {/* <Icon name="wechat" size={30} color="#DADADA" /> */}
                          <Image
                            style={{width: 25, height: 25}}
                            source={require('../../assets/claim-tracking/chat.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </CollapseBody>
                </Collapse>
              </View>
            ))}
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <Text style={{color: 'red'}}>
              {claimDetails?.data[0]?.CLAIMNO == null ? 'Data not found' : null}
            </Text>
          </View>
        </ScrollView>
      )}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={surveyorModalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
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
              <Text style={{fontWeight: '500', fontSize: 15}}>Surveyor</Text>
              <Pressable
                onPress={() => {
                  setSurveyorModalVisible(!surveyorModalVisible);
                }}>
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
            <ClaimTrackingSurveyor claimnumber={claimnumber} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType={'fade'}
        transparent={true}
        visible={documentModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setDocumentModalVisible(!documentModalVisible);
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
                Document Requested To Submit
              </Text>
              <Pressable
                onPress={() => setDocumentModalVisible(!documentModalVisible)}>
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
            <ClaimTrackingDocument claimnumber={claimnumber} claimId={claimId}/>
          </View>
        </View>
      </Modal>

     

      <Modal
        animationType={'fade'}
        transparent={true}
        visible={claimModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setClaimModalVisible(!claimModalVisible);
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
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: '500', fontSize: 15, marginRight: 5}}>
                  Claim Status
                </Text>
                {/* <Text style={{fontWeight: '500', fontSize: 15, color: 'red'}}>
                  Surveyor Deputed
                </Text> */}
              </View>
              <Pressable
                onPress={() => setClaimModalVisible(!claimModalVisible)}>
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
            <ClaimTrackingClaimStatus claimnumber={claimnumber}/>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

claimTrackingHome.propTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ClaimTrackingReducer,
});
export default connect(mapStatesToProps, {
  claimTrackingHomeList,
  data,
})(claimTrackingHome);

// return (
//   <>
//   {(props.route.params && props.route.params.data).map((premium, i) => (
//   <View
//     style={{
//       borderWidth: 0.5,

//       backgroundColor: '#FAFAFA',
//       margin: 7,
//       borderRadius: 2,
//     }}>

//       <List.Accordion title={data(premium.ROWNUMBER, premium.CLAIMNO)}>
//         <View style={styles.container}>
//           <View style={styles.Vehiclerow}>
//             <Text>Vehicle No.</Text>
//             <Text style={{left: 118}}>Regd. Date</Text>
//           </View>
//           <View style={styles.number}>
//             <Text>BA.81.PA. 781</Text>
//             <Text style={{left: 100}}>{premium.REGD_DATE}</Text>
//           </View>
//           <View style={styles.policy}>
//             <Text>Policy No</Text>
//             <Text>{premium.DOCID}</Text>
//           </View>
//           <View style={styles.upload}>
//             <Image
//               style={styles.image1}
//               source={require('../../assets/Icon.png')}
//             />
//             <Text style={{color: '#00A3FF', marginLeft: 5, marginTop: 5}}>
//               upload
//             </Text>

//             <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
//               <Image
//                 style={styles.image}
//                 source={require('../../assets/Chat.png')}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.downbottom}>
//             <View>
//               <TouchableOpacity
//                 style={styles.button1}
//                // onPress={() => navigation.push('Surveryor')}
//                 onPress={handleSubmit}
//                 >
//                 <Text style={styles.surveryor}>Surveryor</Text>
//               </TouchableOpacity>
//             </View>
//             <View>
//               <TouchableOpacity
//                 style={styles.button2}
//                 onPress={() => navigation.push('Documents')}>
//                 <Text style={styles.Document}>Document</Text>
//               </TouchableOpacity>
//             </View>
//             <View>
//               <TouchableOpacity
//                 style={styles.button3}
//                 onPress={handleSubmit2}>
//                 <Text style={styles.Claim}>Claim status</Text>
//               </TouchableOpacity>
//             </View>
//             <View>
//               <TouchableOpacity
//                 style={styles.button4}
//                 onPress={handleSubmit1}>
//                 <Text style={styles.CAS}>CAS</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </List.Accordion>

//   </View>
//       ))}

//       </>
// );
