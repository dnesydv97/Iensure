import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import accordionStyle from '../../../style/accordion';
import {MyKYCDetails, data} from '../../../redux/actions/MyPolicyAction';
import moment from 'moment';
const Detail = ({MyKYCDetails}) => {
 
  const user = useSelector(state => state.auth.user);
  const result = useSelector(state => state.KycFormReducer);

  const {details} = useSelector(state => state.MyPolicyReducer);
  const [test, setTest] = useState();
  const [loading, setLoading] = useState(true);
  const kyc = !isEmpty(user) && user[0]?.KycId;
  //  const kyc = !isEmpty(user) && user?.map(data => data.KycId);
  useEffect(() => {
    if (!isEmpty(details)) {
      setLoading(false);
      setTest(details);
    } else {
      setLoading(true);
    }
  }, [details]);

 
  useEffect(() => {
    if (!isEmpty(details)) {
      setLoading(false);
      setTest(details);
    } else {
      setLoading(true);
    }
  }, [details]);

  useEffect(() => {
    fetchMetaData();
  }, []);
  const fetchMetaData = async () => {
    MyKYCDetails({
      KYCID: kyc,
    });
  };
 
  return (
    <SafeAreaView>
      <ScrollView style={{padding: 15}}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#F57722"
            style={{marginTop: 100}}
          />
        ) : (
          <View
            style={{
              alignSelf: 'center',
            }}>
            <View style={{marginBottom: 50}}>
              <View>
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
                      {!isEmpty(test) && test?.kycInformation?.INSUREDNAME}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Insured Name Nepali
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.INSUREDNAME_NEP}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Kyc Id
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '49%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.KYCID}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      KYC No.
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '49%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.KYCNO}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                     Province
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.EPROVINCE}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      District
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.District}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Municipality
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.Municipality}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Address
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.ADDRESS}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Ward No.
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.WARDNO}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      House No.
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.HOUSENO}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Temporary Address
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.TEMPORARYADDRESS}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Mobile No.
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.MOBILENO}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Home Tele No.
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.HOMETELNO}
                    </Text>
                  </View>
                </View>

                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Email
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.EMAIL}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Pan No.
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.PANNO}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      OCCUPATION
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.OCCUPATION}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Income Source
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.incomesource_eng}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Father Name
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.FATHERNAME}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      GrandFather Name
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.GRANDFATHERNAME}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Marital Status
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.Marital_Status}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Date of Birth
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                  
                      { !isEmpty(test?.kycInformation?.DATEOFBIRTH)? moment(!isEmpty(test) && test?.kycInformation?.DATEOFBIRTH).format(
                                'YYYY-MM-DD',
                              ):null}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Citizenship No.
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.CITIZENSHIPNO}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Citizenship Issue Date
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test?.kycInformation?.ISSUEDATE)?
                      moment(!isEmpty(test) && test?.kycInformation?.ISSUEDATE).format('YYYY/MM/DD'):null}
                      
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Citizenship Issue District
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.Issued_District}
                    </Text>
                  </View>
                </View>
                <View style={accordionStyle.accordionContentSection}>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      Gender
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={accordionStyle.accordionContentHeader}>
                      {!isEmpty(test) && test?.kycInformation?.GENDER}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

Detail.propTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.MyPolicyReducer,
});
export default connect(mapStatesToProps, {
  MyKYCDetails,
  data,
})(Detail);
