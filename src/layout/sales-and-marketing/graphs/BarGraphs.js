import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {isEmpty} from 'lodash';

import {connect, useDispatch, useSelector} from 'react-redux';
const GroupedBars = () => {
  const {filter} = useSelector(state => state.SalesAndMarketingReducer);

  const barmonth =
    !isEmpty(filter) && filter?.data?.Table1?.map((value, i) => value.Month);
  const barNet =
    !isEmpty(filter) &&
    filter?.data?.Table1?.map((value, i) => value.NetPremium);
  const barclaim =
    !isEmpty(filter) &&
    filter?.data?.Table1?.map((value, i) => value.ClaimSettled);
 

  const maxNetPre = Math.max({...barNet});

 

  // var i, max;
  // var arr = barclaim;
  // for (i = barclaim; i < barclaim; i++) {
  //   if (max < arr[i]) max = arr[i];
  // }
 

  let barData = !isEmpty(filter)
  && filter?.data?.Table1?.map((val, i) => (
    [
      {
        value: val.ClaimSettled,
        label: val.Month,
        spacing: 0,
        labelWidth: 75,
        labelTextStyle: { color: 'gray', fontSize: 8 },
        frontColor: '#193AD5',
       
      },
      {
        value: val.NetPremium,
        frontColor: '#13B883'
      }
 
    ]
  )).filter(d => d);

barData = [].concat.apply([], barData||[]); // flatten 2D array
 

 

  const renderTitle = () => {
    return (
      <View style={{marginVertical: 10}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            justifyContent: 'flex-start',
            marginTop: 24,
            backgroundColor: 'yellow',
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#193AD5',
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 85,
                height: 16,
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 14.06,
              }}>
              Claim Settled
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#13B883',
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 85,
                height: 16,
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 14.06,
              }}>
              Net Premium
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#F5F7F9 ',
        paddingBottom: 5,
        borderRadius: 5,
        marginBottom:35
      }}>
      {renderTitle()}
      <BarChart
      yAxisLabelSuffix={'Rs'}
        isAnimated={1}
        dashGap={15}
        initialSpacing={10}
        data={barData}
        barWidth={9}
        spacing={25}
        roundedTop
        //  roundedBottom
        hideRules={true}
        xAxisThickness={1}
        yAxisThickness={0.8}
        yAxisTextStyle={{color: 'gray'}}
        yAxisIndicesHeight={10}
        noOfSections={5}
        maxValue={maxNetPre}
    // width={100}

  // horizontal={true}
// isThreeD={true}
rotateLabel={true}
yAxisLabelWidth={40}



      />
    </View>
  );
};
export default GroupedBars;
