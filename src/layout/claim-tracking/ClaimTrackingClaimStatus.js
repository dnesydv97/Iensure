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
  ActivityIndicator,
} from 'react-native';

import accordionStyle from '../../style/accordion';

import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {
  ClaimTrackingClaimStatus,
  data,
} from '../../redux/actions/ClaimTrackingAction';
import moment from 'moment';
const claimTracking = ({ClaimTrackingClaimStatus, claimnumber}) => {
  const {claimstatus} = useSelector(state => state.ClaimTrackingReducer);
  const [test, setTest] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let i = 0;
    if (!isEmpty(claimstatus)) {
      setLoading(false);
      setTest(claimstatus);
    } else {
      setLoading(true);
    }
  }, [claimstatus]);

  useEffect(() => {
    fetchMetaData(claimnumber);
  }, [claimnumber]);
  const fetchMetaData = async data => {
    ClaimTrackingClaimStatus({
      CLAIMNO: data,
    });
  };
 

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#F57722"
          style={{marginTop: 250}}
        />
      ) : (
        <ScrollView style={{padding: 15}}>
          {!isEmpty(test) &&
            test?.data?.map((claimData, i) => (
              <View>
                <View style={{marginBottom: 80}}>
                <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Insured Name
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {claimData.INSUREDNAME}
                      </Text>
                    </View>
                  </View>

                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Claim No.
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {claimData.CLAIMNO}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Place of occur
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {claimData.PLCOFOCCUR}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Date of Occur
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                       
                        {moment(claimData.DATEOFOCCUR).format(
                                'YYYY-MM-DD, h:mm',
                              )}
                      </Text>
                    </View>
                  </View>

                 
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        User Name
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {claimData.USERNAME}
                      </Text>
                    </View>
                  </View>

                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Claim Status
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {claimData.ClaimStatus1}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Reg. Date
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                   
                      
                        {moment(claimData.REGDATE).format(
                                'YYYY-MM-DD, h:mm',
                              )}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                         Amount
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {claimData.ESTAMOUNT}
                      </Text>
                    </View>
                  </View>
                  <View style={accordionStyle.accordionContentSection}>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        Claim Causes
                      </Text>
                    </View>
                    <View>
                      <Text>:</Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={accordionStyle.accordionContentHeader}>
                        {claimData.CLAIMCAUSES}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
// export default claimTracking;

claimTracking.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ClaimTrackingReducer,
});
export default connect(mapStatesToProps, {
  ClaimTrackingClaimStatus,
  data,
})(claimTracking);
