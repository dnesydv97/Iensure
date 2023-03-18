import React, {useState, useEffect} from 'react';
import {List} from 'react-native-paper';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import propTypes from 'prop-types';
import {connect, useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
const MyComponent = () => {
  const {portfolio} = useSelector(state => state.SalesAndMarketingReducer);
  const [portfoliodata, setPortFolioData] = useState();

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    if (!isEmpty(portfolio)) {
      setPortFolioData(portfolio);
    }
  }, [portfolio]);
 
  return (
    <View style={styles.container}>
      <ScrollView>
        <View >
          <List.Accordion
            style={{backgroundColor: '#F9F5F1',  borderRadius: 1,
            padding: 10,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderWidth: 0.5,
            borderRadius: 4,
          
            marginTop:0,
            elevation: 5,
            shadowColor: '#F57722',}}
            title="Portfolio Summary">
            {!isEmpty(portfoliodata) &&
              portfoliodata?.data?.Table?.map((data, i) => (
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 1,
                    padding: 10,
                    borderColor: 'rgba(0, 0, 0, 0.15)',
                    borderWidth: 1,
                    borderRadius: 3,
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 10,
                    elevation: 5,
                    shadowColor: '#F57722',
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 14,

                      fontWeight: '500',

                      lineHeight: 16.41,
                    }}>
                    {data.Deptname}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Target Amount</Text>
                    <Text style={{paddingEnd: 10}}> {data.TargetAmount==0?<Text>-</Text>:data.TargetAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Efldoff Name</Text>
                    <Text style={{paddingEnd: 10}}> {data.EFLDOFFNAME}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Today Premium</Text>
                    <Text style={{paddingEnd: 10}}> {data.TodayPremium==0?<Text>-</Text>:data.TodayPremium.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Today Rank</Text>
                    <Text style={{paddingEnd: 10}}>{data.TodayRank==0?<Text>-</Text>:data.TodayRank.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>This Month Premium</Text>
                    <Text style={{paddingEnd: 10}}>
                      {' '}
                      {data.ThisMonthPremium==0?<Text>-</Text>:data.ThisMonthPremium.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Monthly Rank</Text>
                    <Text style={{paddingEnd: 10}}>{data.MonthlyRank==0?<Text>-</Text>:data.MonthlyRank.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>This Year Premium</Text>
                    <Text style={{paddingEnd: 10}}>{data.ThisYearPremium==0?<Text>-</Text>:data.ThisYearPremium.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Yearly Rank</Text>
                    <Text style={{paddingEnd: 10}}>{data.YearlyRank==0?<Text>-</Text>:data.YearlyRank.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Today Claim</Text>
                    <Text style={{paddingEnd: 10}}>{data.TodayClaim==0?<Text>-</Text>:data.TodayClaim.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>This Month Claim</Text>
                    <Text style={{paddingEnd: 10}}>{data.ThisMonthClaim==0?<Text>-</Text>:data.ThisMonthClaim.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>This Year Claim</Text>
                    <Text style={{paddingEnd: 10}}>{data.ThisYearClaim==0?<Text>-</Text>:data.ThisYearClaim.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View>
                  {/* <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Total Days</Text>
                    <Text style={{paddingEnd: 10}}>{data.totalDays==0?<Text>-</Text>:data.totalDays.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                  </View> */}
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text>Current Working Days</Text>
                    <Text style={{paddingEnd: 10}}>
                      {data.CurrentWorkingDays==0?<Text>-</Text>:data.CurrentWorkingDays.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                  </View>
                </View>
              ))}
          </List.Accordion>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
