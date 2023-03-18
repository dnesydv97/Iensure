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
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {List} from 'react-native-paper';
import accordionStyle from '../../style/accordion';
import textStyle from '../../style/text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import claimTrackingSurveyorModal from '../../components/modals/ClaimTrackingSurveyorModal';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import moment from 'moment';
import {getSurveyor, data} from '../../redux/actions/ClaimTrackingAction';
const claimTrackingSurveyor = ({getSurveyor, claimnumber}) => {
  const {surveyor} = useSelector(state => state.ClaimTrackingReducer);


  const [loading, setLoading] = useState(true);
  const [surveyorData, setSurveyorData] = useState();

  useEffect(() => {
    if (!isEmpty(surveyor)) {
      setLoading(false);
      setSurveyorData(surveyor);
    } else {
      setLoading(true);
    }
  }, [surveyor]);

  useEffect(() => {
    fetchMetaData(claimnumber);
  }, [claimnumber]);
  const fetchMetaData = async data => {
 
    getSurveyor({
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
        <ScrollView style={{padding: 10}}>
          {!isEmpty(surveyorData) &&
            surveyorData?.data?.map((surveyor, i) => (
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 10,
                  paddingTop: 0,
                }}>
                <View style={accordionStyle.accordionContainer}>
                  <Collapse>
                    <CollapseHeader style={accordionStyle.accordionModal}>
                      <Text style={textStyle.accordionHeader}>
                        {surveyor.SN}) {'  '}{surveyor.SURVEYORNAME}
                      </Text>
                     
                      <View style={{paddingEnd:6}}>
                        <Text style={accordionStyle.accordionHeaderBadgeText}>
                        <Icon name="check" size={20} color="#008000" />
                        </Text>
                      </View>
                    </CollapseHeader>
                    <CollapseBody style={accordionStyle.accordionContent}>
                      <View style={{width: '100%'}}>
                        <View style={accordionStyle.accordionContentSection}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Applied Date
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {moment(surveyor.APPOINTDT).format(
                                'YYYY-MM-DD',
                              )}
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Report Submitted Date
                            </Text>
                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {surveyor.REPORTDT? moment(surveyor.REPORTDT).format(
                                'YYYY-MM-DD',
                              ):'___'}
                            </Text>
                          </View>
                        </View>
                        <View style={accordionStyle.accordionContentSection}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Surveyor Address
                            </Text>

                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {surveyor.SURVEYORADDRESS}
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Report Submitted
                            </Text>

                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {surveyor.HASREPORTSUBMITTED==0?"Yes":"No"}
                            </Text>
                          </View>
                        </View>
                        <View style={accordionStyle.accordionContentSection}>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              Telephone
                            </Text>

                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {surveyor.TELNO}
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text style={accordionStyle.accordionContentHeader}>
                              ID
                            </Text>

                            <Text
                              style={accordionStyle.accordionContentHeaders}>
                              {surveyor.ID}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>
              </View>
            ))}
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <Text style={{color: 'red'}}>
              {surveyorData?.data[0]?.SURVEYORNAME == null
                ? 'Data not found'
                : null}
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

claimTrackingSurveyor.propTypes = {
  data: PropTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.ClaimTrackingReducer,
});
export default connect(mapStatesToProps, {
  getSurveyor,
  data,
})(claimTrackingSurveyor);
