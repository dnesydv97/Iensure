import React, {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import accordionStyle from '../../style/accordion';
import {useNavigation} from '@react-navigation/native';
import {
  DetailsClaimApproval,
  data,
  ApproveClaim,
} from '../../redux/actions/ClaimApprovalAction';
import InputStyle from '../../style/input';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import moment from 'moment';
import {TextInput} from 'react-native-paper';
const ClaimDetails = ({DetailsClaimApproval, route}) => {
  const [isSelected, setSelection] = useState(false);
  const user = useSelector(state => state.auth.user);
  // const RegdId = user[0]?.Regd_ID;
  const RegdId = !isEmpty(user) && user?.map(data => data.Regd_ID);
 
  const [text, onChangeText] = useState('');

  const {checkDetails, approved} = useSelector(
    state => state.ClaimApprovalReducer,
  );
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    fetchClaim();
  }, []);

  const fetchClaim = async () => {
    DetailsClaimApproval({CLAIMNO: route.params.paramKey});
  };

  const Approve = () => {
    let body = {
      claimId: route.params.claim,
      userId: RegdId,
      ApprovedStatus: 1,
      remarks: text,
    };
    dispatch(ApproveClaim(body));
    navigation.navigate('Dash');
  };
  const UnApprove = () => {
    let body = {
      claimId: route.params.claim,
      userId: RegdId,
      ApprovedStatus: 0,
      remarks: text,
    };
    dispatch(ApproveClaim(body));
    navigation.navigate('Dash');
  };
  return (
    <View style={{padding: 10, backgroundColor: '#fff', flex: 1}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'rgba(243, 243, 243, 1)',
            padding: 10,
            elevation: 5,
            borderRadius: 6,
          }}>
          {!isEmpty(checkDetails) &&
            checkDetails?.data.map((data, i) => (
              <View>
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
                      Policy No
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.PolicyNumber}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '40%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Intimation Date
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {moment(data.IntimationDate).format('DD-MMMM-YYYY')}
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
                      Surveyor Name
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.SurveyorName}
                    </Text>
                  </View>
                </View>

                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '40%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Surveyor Fee
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {parseFloat(data.SurveyorFee).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '40%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Assessed Amount
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {parseFloat(data.AssessedAmt).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '40%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Slavage Recovery
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {parseFloat(data.salvagerecovery).toFixed(2)}
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
                      {parseFloat(data.TotalAmount).toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '40%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Endt. no.
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.endorseNumber}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '40%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Approved By
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {data.approvedbyName}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      lineHeight: 24,
                      fontFamily: 'Montserrat',
                      marginLeft: 10,
                    }}>
                    Claim Paid Advance
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    marginLeft: 7,
                  }}>
                  <View style={{marginLeft: 5}}>
                    <Text>Include Surveyor Fee</Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Checkbox
                      value={isSelected}
                      onValueChange={setSelection}
                      tintColors={{true: '#F57722', false: '#C7C7CC'}}
                      disabled={false}
                    />
                  </View>
                </View>
                {/* <View>
          <Text style={accordionStyle.accordionContentHeader}>
            Include Surveyor Fee
          </Text>
        </View> */}
                <TextInput
                  label="Review"
                  mode="outlined"
                  // style={{
                  //   height: 20,
                  //   margin: 12,
                  //   borderWidth: 1,
                  //   padding: 10,
                  //   borderRadius: 4,
                  //   borderColor: 'grey',
                  //   borderWidth: 1,
                  //   backgroundColor:'#fff'
                  // }}
                  theme={{colors: {primary: '#F57722', underlineColor: 'red'}}}
                  style={{width: '100%', height: 44, backgroundColor: '#fff'}}
                  onChangeText={onChangeText}
                  value={text}
                />
              </View>
            ))}
        </View>

        <View style={{marginTop: 10}}>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#F57722',
                borderRadius: 5,
                padding: 10,
                // alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 10,
                width: '100%',
                // marginLeft: 40,
              }}
              onPress={Approve}>
              <Text style={{color: 'white', fontSize: 15}}>Approve</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                borderColor: 'rgba(0, 0, 0, 0.25)',
                padding: 10,
                borderWidth: 1,
                // alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
                width: '100%',
                // marginLeft: 40,
              }}
              onPress={UnApprove}>
              <Text
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  lineHeight: 19.5,
                  fontSize: 16,
                  fontWeight: '400',
                  fontFamily: 'Montserrat',
                }}>
                Unapprove
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFFFFF',
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
              onPress={() => navigation.navigate('Dash')}>
              <Text
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  lineHeight: 19.5,
                  fontSize: 16,
                  fontWeight: '400',
                  fontFamily: 'Montserrat',
                }}>
                Go to Homepage
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

ClaimDetails.PropTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ClaimApprovalReducer,
});
export default connect(mapStatesToProps, {
  data,
  DetailsClaimApproval,
})(ClaimDetails);
