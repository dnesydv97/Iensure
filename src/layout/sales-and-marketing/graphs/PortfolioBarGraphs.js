

import React, {useState, useEffect} from 'react';

import {SafeAreaView, Text, View, StyleSheet, Dimensions} from 'react-native';

import {BarChart} from 'react-native-chart-kit';
import {connect, useDispatch, useSelector} from 'react-redux';
import propTypes from 'prop-types';
import {isEmpty} from 'lodash';


const MyBarChart = () => {
  const {business} = useSelector(state => state.SalesAndMarketingReducer);
  const [today, setToday] = useState();
  const [pieData, setPieData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isEmpty(business)) {
      setToday(business);
    }
  }, [business]);

  useEffect(() => {
    if (!isEmpty(today)) {
      setPieData(
        !isEmpty(today) &&
          today?.map((data, i) => data?.Claim).map(Number),
      );
    }
  }, [today]);
  useEffect(() => {
 
    if (!isEmpty(DataNum)) {
      setData(DataNum);
    }
  }, [DataNum]);
 
  function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);
    // Enumerate number abbreviations
    var abbrev = ['k', 'm', 'b', 't'];
    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);
      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces;
        // Handle special case where we round up to the next abbreviation
        if (number == 1000000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }
        // Add the letter for the abbreviation
        number += abbrev[i];
        // We are done... stop
        break;
      }
    }
    return number;
  }
  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };
 
  const DataNum = (!isEmpty(pieData) && pieData.map(data => abbrNum(data, 2)));
  
 
 
 
 

function divide(x){
  return x/10000000
}
const output = pieData.map(divide)




  return (
    <View>
      <Text style={styles.header}>Business Today</Text>
      <Text style={{fontSize:10,color:'grey'}}>Value divided by 1 crores </Text>
      <BarChart
        data={{
          labels: ['Engineering', 'Motor', 'Agriculture', 'Fire', 'Aviation'],

          datasets: [
            {
              // colors:(opacity = 1) => `rgba(233, 30, 99 ,${opacity})`,
              data: output,
            },
          ],
        }}

        marginLeft={200}
        width={Dimensions.get('window').width - 16}
        height={220}
         yAxisLabel={'Rs'}
        yLabelsOffset={0}
     
        fromZero={true}
          // verticalLabelRotation={10}
         
       
        //  horizontalLabelRotation={20}
        chartConfig={{
          backgroundColor: 'red',
          backgroundGradientFrom: '#FDE1DF',
          backgroundGradientTo: '#E6F6E2',
          // paddingLeft: 20,
          decimalPlaces: 0,
          fillShadowGradient:'green',
     
      fillShadowGradientFromOpacity:'red',
      // labelColor:(opacity = 1) => `rgba(233, 30, 99 ,${opacity})`,
          color: (opacity = 1) => `rgba(0,0,0 ,${opacity})`,

          style: {
            borderRadius: 16,
            paddingLeft: 20,
          },
        }}
        style={{
          marginVertical: 8,

          borderRadius: 16,
        }}
     
      />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <MyBarChart />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eff3',
    padding: 10,
  },
  header: {
    fontSize: 18,
    marginTop: 5,
    color: '#000',
  },
});
