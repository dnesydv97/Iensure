import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,

  ScrollView,
 
} from 'react-native';
import accordionStyle from '../../style/accordion';
import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {GetClaimAssessmentSummary,data} from '../../redux/actions/ClaimTrackingAction';

const claimTrackingClaim = ({GetClaimAssessmentSummary}) => {
  const {cas} = useSelector(state => state.ClaimTrackingReducer);
  const [test, setTest] = useState();
  useEffect(() => {
    let i = 0;
    if (!isEmpty(cas)) {
      setTest(cas);
    }
  }, [cas]);

  useEffect(() => {
    fetchMetaData();
  }, []);
  const fetchMetaData = async () => {
    GetClaimAssessmentSummary({
      CLAIMNO:"BKT/GPA/00764/077/078"
    });
  };
  
  return (
    <SafeAreaView>
      <ScrollView style={{padding: 15}}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
            paddingTop: 0,
          }}>
          <View style={{borderWidth: 0.5, borderColor: '#C7C7CC'}}>
            <View style={{padding: 10}}>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '50%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Loss Type
                  </Text>
                  <Text style={{}}>{!isEmpty(test) && test?.data[0]?.LOSSTYPE_NAME}</Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Sub Loss type
                  </Text>
                  <Text>{!isEmpty(test) && test?.data[0]?.SUBLOSSTYPE}</Text>
                </View>
              </View>
              <View style={accordionStyle.accordionContentSection}>
                <View style={{width: '33%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Claimed Amount
                  </Text>
                  <Text style={{}}>{!isEmpty(test) && test?.data[0]?.AMTCLAIMED}</Text>
                </View>
                <View style={{width: '33%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Estd. Amount
                  </Text>
                  <Text>{!isEmpty(test) && test?.data[0]?.DEATHSUMINSURED}</Text>
                </View>
                <View style={{width: '33%'}}>
                  <Text style={accordionStyle.accordionContentHeader}>
                    Act. Amount
                  </Text>
                  <Text>{!isEmpty(test) && test?.data[0]?.AMTASSESS}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


claimTrackingClaim.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ClaimTrackingReducer,
});
export default connect(mapStatesToProps, {
  GetClaimAssessmentSummary,
  data,
})(claimTrackingClaim);
