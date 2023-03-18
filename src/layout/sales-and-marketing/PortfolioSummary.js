import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PortfolioBarGraphs from './graphs/PortfolioBarGraphs';
import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {businessToday, data} from '../../redux/actions/SalesAndMarketingAction';

const PortfolioSummary = ({businessToday}) => {
  const [loading, setLoading] = useState(true);
  const {business} = useSelector(state => state.SalesAndMarketingReducer);
  const [today, setToday] = useState();

  useEffect(() => {
    if (!isEmpty(business)) {
      setLoading(false);
      setToday(business);
    } else {
      setLoading(true);
    }
  }, [business]);

  useEffect(() => {
    fetchMetaData();
  }, []);
  const fetchMetaData = async () => {
    businessToday({});
  };

  return (
    <>
      <PortfolioBarGraphs />

      <View style={styles.container}>
        <ScrollView>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#F57722"
              style={{marginTop: 100}}
            />
          ) : (
            <View>
              {!isEmpty(today) && today && (
                <ScrollView>
                  {!isEmpty(today) &&
                    today?.map((data, i) => (
                      <View
                        style={{
                          borderWidth: 1,
                          overflow: 'hidden',
                          backgroundColor:
                            data.Deptname == 'Engineering'
                              ? '#FDE1DF'
                              : data.Deptname == 'Motor'
                              ? '#FEF5E8'
                              : data.Deptname == 'Agriculture'
                              ? '#E6F6E2'
                              : data.Deptname == 'Fire'
                              ? '#E8F4FE'
                              : data.Deptname == 'Aviation'
                              ? '#FEE8ED'
                              : data.Deptname == 'Marine'
                              ? '#f7e8fd'
                              : data.Deptname == 'Micro'
                              ? '#eceee4'
                              : data.Deptname == 'Property Insurance'
                              ? '#fae8e5'
                              : data.Deptname == 'Miscellaneous'
                              ? '#e9eeee'
                              : '',
                          margin: 10,
                          borderRadius: 4,
                          padding: 10,
                          borderColor: 'rgba(0, 122, 255, 0.1)',
                          height: 96,
                        }}>
                        <Text style={styles.deptText}>{data.Deptname}</Text>
                        <View
                          style={{
                            marginTop: 6,
                            marginBottom: 6,
                            width: 2000,
                            marginLeft: -100,
                            height: 1,

                            backgroundColor:
                              data.Deptname == 'Engineering'
                                ? '#F6685E'
                                : data.Deptname == 'Motor'
                                ? '#F6B95E'
                                : data.Deptname == 'Agriculture'
                                ? '#4ABF2D'
                                : data.Deptname == 'Fire'
                                ? '#5EADF6'
                                : data.Deptname == 'Aviation'
                                ? '#F65E82'
                                : data.Deptname == 'Marine'
                                ? '#c770fb'
                                : data.Deptname == 'Micro'
                                ? '#454004'
                                : data.Deptname == 'Property Insurance'
                                ? '#d4301d'
                                : data.Deptname == 'Miscellaneous'
                                ? '#3b6668'
                                : '',
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.net}>Claim</Text>
                            <Text style={{paddingLeft: 60, paddingRight: 9}}>
                              :
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.net}>
                              {/* Rs{' '} */}
                              {!isEmpty(data)
                                ? parseFloat(data.Claim)
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : '__'}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.net}>Premium</Text>
                            <Text style={{paddingLeft: 39, paddingRight: 10}}>
                              :
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.net}>
                              {/* Rs{' '} */}
                              {!isEmpty(data)
                                ? parseFloat(data.Premium)
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : '__'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                </ScrollView>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 6,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  deptText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21.79,
    fontStyle: 'normal',

    // fontFamily:['Open Sans']['900']
  },
  net: {
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19.07,
    color: '#524C4C',
    //  alignSelf:'flex-end'
  },
});

PortfolioSummary.propTypes = {
  data: propTypes.object.isRequired,
};
const mapStatesToProps = state => ({
  data: state.SalesAndMarketingReducer,
});
export default connect(mapStatesToProps, {
  businessToday,
  data,
})(PortfolioSummary);
